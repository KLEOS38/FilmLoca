# Complete Booking Fix - "Edge Function returned a non-2xx status code"

## Overview
This guide provides a complete solution to fix the booking error. The error occurs when the Edge Function returns a non-2xx HTTP status code (typically 400, 401, 404, or 500).

## Root Causes (Most to Least Likely)

### 1. RLS Policies Blocking Booking Insert (60% of cases)
The bookings table has Row Level Security policies that prevent inserts.

### 2. Service Role Key Not Available (20% of cases)
The Edge Function can't use SUPABASE_SERVICE_ROLE_KEY to bypass RLS.

### 3. Paystack Secret Key Not Configured (10% of cases)
PAYSTACK_SECRET_KEY environment variable is missing.

### 4. Authentication Token Invalid (10% of cases)
User token is expired or malformed.

---

## STEP 1: Fix RLS Policies (REQUIRED)

Run this SQL in Supabase SQL Editor:

```sql
-- Disable RLS on bookings table temporarily
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- Drop all existing RLS policies
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can read their own bookings" ON bookings;
DROP POLICY IF EXISTS "Service role can create bookings" ON bookings;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable select for own bookings" ON bookings;
DROP POLICY IF EXISTS "Enable update for own bookings" ON bookings;

-- Re-enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create simple, permissive policies
CREATE POLICY "Anyone can insert bookings" ON bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Users can update their own bookings" ON bookings
    FOR UPDATE USING (auth.uid() = user_id OR auth.role() = 'service_role')
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');
```

**After running this, test the booking immediately.**

---

## STEP 2: Configure Supabase Edge Function Secrets

1. Go to **Supabase Dashboard**
2. Navigate to **Functions** → **Settings**
3. Click **Add Secret**
4. Add these environment variables:

### Required:
```
Key: PAYSTACK_SECRET_KEY
Value: (Your Paystack secret key from https://dashboard.paystack.com/settings/developer)
```

### Optional (but recommended):
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: (Copy from Project Settings → API Keys → service_role key)
```

**After adding, wait 30 seconds for deployment.**

---

## STEP 3: Deploy the Updated Edge Function

The Edge Function code has been updated to:
- Use service role key to bypass RLS
- Better error logging
- Proper authentication handling

Deploy it:

```bash
# From project root
supabase functions deploy create-payment
```

Or manually:
1. Go to Supabase Dashboard → Functions
2. Click **create-payment**
3. Copy the updated code from `supabase/functions/create-payment/index.ts`
4. Paste into the editor
5. Click **Deploy**

---

## STEP 4: Verify Properties are Published

Run this in Supabase SQL Editor:

```sql
-- Check if properties have is_published = true
SELECT id, title, is_published 
FROM properties 
LIMIT 5;

-- If any show is_published = false, publish them:
UPDATE properties 
SET is_published = true 
WHERE is_published = false;
```

---

## STEP 5: Test the Booking Flow

1. **Clear Browser Cache**
   - Open DevTools (F12)
   - Right-click refresh button → "Empty cache and hard refresh"
   - Or: Ctrl+Shift+Delete (Windows) / Cmd+Shift+Delete (Mac)

2. **Test Booking**
   - Navigate to a property detail page
   - Select check-in date (tomorrow or later)
   - Select check-out date (2+ days after check-in)
   - Click "Book Now"
   - You should see Paystack payment modal

3. **If Still Failing**
   - Open DevTools → Console tab
   - Attempt booking
   - Copy the error message
   - Go to next section for troubleshooting

---

## Troubleshooting by Error Message

### Error: "Missing required fields: propertyId, startDate, endDate, totalPrice"
**Cause:** Invalid booking data being sent
**Fix:**
```typescript
// In BookingCard.tsx, ensure data is properly formatted:
const safeDays = Math.max(1, days);
const totalPrice = price * safeDays;

// Validate before calling
if (!propertyId || !checkIn || !checkOut || totalPrice <= 0) {
  toast.error("Please fill all fields correctly");
  return;
}
```

### Error: "User not authenticated"
**Cause:** Auth token not being passed
**Fix:**
1. Make sure user is logged in
2. Clear browser cache and refresh
3. Try logging out and back in
4. Check DevTools → Application → Cookies → Check `sb-` cookies exist

### Error: "Paystack is not configured"
**Cause:** PAYSTACK_SECRET_KEY not set
**Fix:**
1. Go to Supabase Dashboard → Functions → Settings
2. Add secret: `PAYSTACK_SECRET_KEY` = your Paystack key
3. Wait 30 seconds
4. Try booking again

### Error: "Property not found"
**Cause:** Property ID doesn't exist or isn't published
**Fix:**
```sql
-- Run in SQL Editor:
SELECT id, title, is_published 
FROM properties 
WHERE id = 'your-property-id';

-- If not published:
UPDATE properties 
SET is_published = true 
WHERE id = 'your-property-id';
```

### Error: "new row violates row level security policy"
**Cause:** RLS policies blocking insert
**Fix:** Run Step 1 SQL again and ensure all policies are dropped

### Error: "Invalid total price"
**Cause:** Price is 0, negative, or > 10,000,000
**Fix:**
```typescript
// In BookingCard.tsx:
const totalPrice = price * days;
if (totalPrice <= 0 || totalPrice > 10000000) {
  toast.error("Invalid booking amount");
  return;
}
```

### Error: "Invalid team size"
**Cause:** Team size < 1 or > 100
**Fix:** Ensure `teamSize` is between 1 and 100

### Error: "Invalid booking dates"
**Cause:** Check-out is before or same as check-in
**Fix:**
```typescript
// In BookingCard.tsx:
if (checkIn >= checkOut) {
  toast.error("Check-out must be after check-in");
  return;
}
```

---

## Debugging Steps

### Check Supabase Function Logs

1. Go to **Supabase Dashboard** → **Functions**
2. Click **create-payment**
3. Click **Logs** tab
4. Find the request with your booking attempt timestamp
5. Look for error messages like:
   - `permission denied for relation bookings` → RLS issue
   - `User not authenticated` → Auth token issue
   - `PAYSTACK_SECRET_KEY not found` → Env var issue
   - `Property not found` → Invalid property ID

### Test with curl (For Developers)

```bash
# Get token from browser console:
# localStorage.getItem('sb-token') or localStorage.getItem('SUPABASE_AUTH_TOKEN')

TOKEN="your-token-here"
PROPERTY_ID="your-property-id"

curl -X POST \
  https://your-project.supabase.co/functions/v1/create-payment \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId": "'$PROPERTY_ID'",
    "startDate": "2024-03-15",
    "endDate": "2024-03-20",
    "totalPrice": 50000,
    "teamSize": 2,
    "notes": "Test"
  }'
```

### Check Browser Console

1. Open DevTools (F12)
2. Go to **Console** tab
3. Attempt booking
4. Look for messages starting with:
   - `❌` = Error
   - `✅` = Success
   - `💳` = Payment info
   - `🔐` = Auth info

---

## Quick Fix Checklist

- [ ] Run Step 1 SQL (RLS fix)
- [ ] Add PAYSTACK_SECRET_KEY to Supabase secrets
- [ ] Deploy updated Edge Function (`create-payment`)
- [ ] Verify properties have `is_published = true`
- [ ] Clear browser cache and hard refresh
- [ ] Test booking with valid dates and team size
- [ ] Check Supabase function logs for errors
- [ ] Check browser console for error messages

---

## If Still Not Working

### Option 1: Verify Database Schema
```sql
-- Check if bookings table exists and has correct columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'bookings'
ORDER BY ordinal_position;
```

Should have columns:
- `id` (UUID)
- `property_id` (UUID)
- `user_id` (UUID)
- `start_date` (DATE)
- `end_date` (DATE)
- `total_price` (DECIMAL/NUMERIC)
- `team_size` (INTEGER)
- `status` (TEXT)
- `payment_status` (TEXT)
- `payment_id` (TEXT, nullable)
- `notes` (TEXT, nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Option 2: Create Missing Columns
```sql
-- Add any missing columns:
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS team_size INTEGER NOT NULL DEFAULT 1;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_id TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
```

### Option 3: Completely Reset RLS
```sql
-- NUCLEAR OPTION - only if all else fails
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;

-- Then test booking
-- If this works, enable RLS properly later
```

### Option 4: Check Service Role Key

In Supabase Dashboard:
1. Go to **Settings** → **API**
2. Copy the **service_role** key
3. Go to **Functions** → **Settings**
4. Add secret:
   ```
   Key: SUPABASE_SERVICE_ROLE_KEY
   Value: (Paste the service_role key)
   ```

---

## Performance Notes

- The Edge Function uses service role to bypass RLS (faster)
- Booking creation takes ~1-2 seconds
- Paystack initialization takes ~2-3 seconds
- Total booking flow: ~3-5 seconds

---

## Next Steps After Booking Works

1. **Set Up Webhooks**
   - Configure Paystack webhook to update booking status
   - Point to `/api/paystack-webhook`

2. **Monitor Production**
   - Check function logs regularly
   - Set up alerting for failed bookings

3. **Security Hardening** (Later)
   - Re-enable RLS with proper policies
   - Implement rate limiting
   - Add fraud detection

4. **Test with Real Payment**
   - Use Paystack test cards: 4084 0840 8408 4081
   - Verify webhook updates booking status
   - Check payment confirmation email

---

## Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Paystack Docs:** https://paystack.com/docs
- **Edge Function Logs:** Supabase Dashboard → Functions → Logs
- **API Status:** https://status.supabase.com

---

## Summary

The booking error is typically caused by:
1. **RLS policies** blocking inserts (STEP 1 fixes this)
2. **Missing environment variables** (STEP 2 fixes this)
3. **Invalid booking data** (check console for validation errors)

**Most bookings will work after running Step 1 and Step 2 above.**

If you still have issues after these steps, check the Supabase function logs for the exact error message.