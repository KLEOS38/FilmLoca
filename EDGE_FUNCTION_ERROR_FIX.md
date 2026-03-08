# Edge Function Error Fix — "Edge Function returned a non-2xx status code"

## Problem
When attempting to book a property, users receive the error:
```
Edge Function returned a non-2xx status code
```

This error comes from the `create-payment` Edge Function and prevents bookings from being created.

---

## Root Causes (In Order of Likelihood)

### 1. **RLS Policies Blocking Booking Insert** (Most Common)
The database has Row Level Security (RLS) policies that prevent the Edge Function from inserting bookings.

**Symptoms:**
- Booking fails silently
- Server logs show "Permission denied" or RLS policy errors
- Error message in Supabase logs: "new row violates row level security policy"

**Solution:** Run the RLS fix SQL file
```sql
-- Go to Supabase Dashboard
-- SQL Editor → New Query → Copy paste from SIMPLE_RLS_FIX.sql
-- Click "Run"
```

See `SIMPLE_RLS_FIX.sql` in the project root.

---

### 2. **Missing or Incorrect PAYSTACK_SECRET_KEY**
The Paystack API key is not configured in Supabase Edge Function secrets.

**Symptoms:**
- Error message: "Paystack secret key not configured"
- Booking is created but payment initialization fails
- Console logs show missing env variable

**Solution:**
1. Go to **Supabase Dashboard** → **Project Settings** → **Functions** → **Secrets**
2. Add/verify `PAYSTACK_SECRET_KEY` environment variable:
   - Key: `PAYSTACK_SECRET_KEY`
   - Value: Your Paystack secret key from https://dashboard.paystack.com/settings/developer
3. Deploy Edge Functions again (or restart them)

**To verify it's set:**
```bash
# In Supabase CLI (if installed)
supabase secrets list
```

---

### 3. **User Authentication Not Being Passed Correctly**
The Authorization header with the user token is missing or malformed.

**Symptoms:**
- Error message: "No authorization header" or "No token provided"
- User is logged in but still gets error
- Console shows "User not authenticated"

**Solution:**
Check that the user is properly authenticated before calling booking:

```typescript
// In BookingCard.tsx or PricingBar.tsx
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  toast.error("Please sign in to book");
  navigate("/auth");
  return;
}
```

The token is automatically attached by `supabase.functions.invoke()`.

---

### 4. **Invalid Booking Data Being Sent**
The booking data doesn't meet validation requirements.

**Symptoms:**
- Error message includes: "Missing required fields" or "Invalid total price"
- Different error for each field

**Solution:** Verify the booking data before sending:

```typescript
// Check in BookingCard.tsx handleBooking()
if (!propertyId) {
  toast.error("Property ID missing");
  return;
}
if (totalPrice <= 0 || totalPrice > 10000000) {
  toast.error("Invalid booking price");
  return;
}
if (!checkIn || !checkOut || new Date(checkIn) >= new Date(checkOut)) {
  toast.error("Invalid booking dates");
  return;
}
if (teamSize < 1 || teamSize > 100) {
  toast.error("Team size must be between 1 and 100");
  return;
}
```

---

### 5. **Property Not Found in Database**
The `propertyId` being sent doesn't exist in the properties table.

**Symptoms:**
- Error message: "Property not found"
- Property ID is valid UUID format but doesn't exist

**Solution:**
1. Verify the property exists:
```sql
-- In Supabase SQL Editor
SELECT id, title FROM properties WHERE id = 'your-property-id';
```

2. Check if property is published:
```sql
SELECT id, title, is_published FROM properties WHERE id = 'your-property-id';
```

3. If not published, publish it:
```sql
UPDATE properties SET is_published = true WHERE id = 'your-property-id';
```

---

### 6. **Edge Function Not Deployed**
The Edge Function code hasn't been deployed to Supabase.

**Symptoms:**
- Edge Function not appearing in Supabase Dashboard
- "Function not found" errors
- Functions tab shows empty

**Solution:**
1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Deploy the function:
```bash
# In project root
supabase functions deploy create-payment
```

3. Verify it's deployed:
```bash
supabase functions list
```

---

## Diagnostic Steps

### Step 1: Check Browser Console
1. Open DevTools (F12)
2. Go to **Console** tab
3. Attempt booking
4. Look for error messages that include:
   - "Missing required fields"
   - "not authenticated"
   - "not configured"
   - "not found"

Take note of the exact error message.

### Step 2: Check Supabase Logs
1. Go to **Supabase Dashboard**
2. Go to **Functions** → **create-payment**
3. Click **Logs** tab
4. Look for recent error entries
5. Find the request that matches your booking attempt timestamp

**Common error patterns in logs:**
```
ERROR: permission denied for relation bookings
→ Fix: Run SIMPLE_RLS_FIX.sql

ERROR: Failed to create booking
→ Fix: Check RLS policies or Edge Function code

ERROR: Paystack secret key not found
→ Fix: Add PAYSTACK_SECRET_KEY to secrets

ERROR: User not authenticated
→ Fix: Verify auth header is being sent
```

### Step 3: Test with curl (Developer Only)
```bash
# Get your user's token (check localStorage in browser console)
TOKEN="your-user-token-here"
PROPERTY_ID="your-property-id-here"

curl -X POST \
  https://your-project.supabase.co/functions/v1/create-payment \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId": "'$PROPERTY_ID'",
    "startDate": "2024-03-01",
    "endDate": "2024-03-05",
    "totalPrice": 50000,
    "teamSize": 2,
    "notes": "Test booking"
  }'
```

---

## Quick Fix Checklist

- [ ] **RLS Policies Fixed**
  - Run: `SIMPLE_RLS_FIX.sql` in Supabase SQL Editor
  - Verify: Try booking again

- [ ] **Paystack Secret Key Set**
  - Go to Supabase → Settings → Functions → Secrets
  - Add `PAYSTACK_SECRET_KEY`
  - Value from: https://dashboard.paystack.com/settings/developer
  - Click "Save"

- [ ] **User Authentication Working**
  - Verify user is logged in before booking
  - Check browser console for auth errors
  - Token should be passed automatically

- [ ] **Valid Booking Data**
  - Price: > 0 and < 10,000,000
  - Team size: >= 1 and <= 100
  - Dates: Check-out must be after check-in
  - Property ID: Valid UUID format

- [ ] **Property Exists and Published**
  - Check Supabase: `SELECT * FROM properties WHERE id = 'your-id'`
  - Set `is_published = true` if needed

- [ ] **Edge Function Deployed**
  - Run: `supabase functions deploy create-payment`
  - Verify in Supabase Dashboard → Functions

---

## Step-by-Step Resolution

### If Error Says "Missing required fields"
1. Check DevTools → Application → localStorage
2. Verify these are set in booking request:
   - `propertyId`
   - `startDate` (YYYY-MM-DD format)
   - `endDate` (YYYY-MM-DD format)
   - `totalPrice` (number > 0)
   - `teamSize` (number >= 1)

### If Error Says "not authenticated"
1. Click sign in/out button (refresh auth)
2. Clear browser cache
3. Try booking again
4. Check browser console for auth errors

### If Error Says "not configured"
1. Go to Supabase Dashboard
2. Project Settings → Functions → Secrets
3. Add `PAYSTACK_SECRET_KEY` if missing
4. Wait 30 seconds for deployment
5. Try booking again

### If Error Says "Permission denied"
1. Go to Supabase Dashboard
2. SQL Editor → New Query
3. Copy entire contents of `SIMPLE_RLS_FIX.sql`
4. Click "Run"
5. Try booking again

### If Error Says "Property not found"
1. Go to Supabase Dashboard
2. SQL Editor → New Query
3. Run:
```sql
SELECT id, title, is_published 
FROM properties 
LIMIT 5;
```
4. Copy a valid property ID
5. Try booking that property instead
6. If property shows `is_published = false`, run:
```sql
UPDATE properties 
SET is_published = true 
WHERE id = 'the-property-id';
```

---

## Detailed RLS Fix

The most common cause is RLS policies. Here's how to fix it:

### Option 1: Simple Fix (Recommended)
```sql
-- Run in Supabase → SQL Editor
-- File: SIMPLE_RLS_FIX.sql

ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
```

**Warning:** This disables all RLS protection. Use in development only.

### Option 2: Proper Fix (Production)
```sql
-- File: PRODUCTION_RLS_FIX.sql
-- More granular, preserves some security

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can read their own bookings" ON bookings;
DROP POLICY IF EXISTS "Service role can create bookings" ON bookings;

-- Allow Edge Function (service role) to create bookings
CREATE POLICY "Service role can create bookings"
  ON bookings FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow users to read their own bookings
CREATE POLICY "Users can read their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Allow users to update their own bookings
CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Properties are readable by everyone
CREATE POLICY "Anyone can read published properties"
  ON properties FOR SELECT
  USING (is_published = true);
```

---

## Testing the Fix

### Manual Test
1. Log in as a test user
2. Navigate to a property detail page
3. Select dates:
   - Check-in: Tomorrow
   - Check-out: 3 days from now
4. Click "Book Now"
5. You should see Paystack payment modal
6. Complete payment
7. You should be redirected to success page

### Expected Flow
```
Click Book Now
    ↓
Verify user authenticated
    ↓
Send data to create-payment Edge Function
    ↓
Edge Function creates booking
    ↓
Edge Function initializes Paystack payment
    ↓
User redirected to Paystack payment page
    ↓
User completes payment
    ↓
Redirected to /booking-success page
```

### If Still Failing
1. Check Supabase function logs:
   - Supabase Dashboard → Functions → create-payment → Logs
2. Look for the request matching your attempt time
3. Copy the full error message
4. Check against "Root Causes" section above

---

## Common Error Messages & Fixes

| Error Message | Cause | Fix |
|---------------|-------|-----|
| "Missing required fields: propertyId, startDate, endDate, totalPrice" | Invalid booking data | Verify all fields are passed correctly |
| "User not authenticated" | No auth token | Log in again, clear cache |
| "Paystack secret key not configured" | Missing env var | Add PAYSTACK_SECRET_KEY to secrets |
| "Property not found" | Invalid property ID | Verify property exists and is_published = true |
| "new row violates row level security policy" | RLS blocking insert | Run SIMPLE_RLS_FIX.sql |
| "Invalid total price" | Price out of range | Ensure 0 < price < 10,000,000 |
| "Invalid team size" | Team size invalid | Ensure 1 <= teamSize <= 100 |
| "Invalid booking dates" | Dates invalid | Ensure endDate > startDate |

---

## Prevention

### Before Deploying
1. ✅ Verify RLS policies allow Edge Function to insert
2. ✅ Set all required environment variables
3. ✅ Test with valid property ID
4. ✅ Test as authenticated user
5. ✅ Check Edge Function is deployed

### In Production
1. ✅ Monitor Supabase function logs regularly
2. ✅ Set up alerting for function errors
3. ✅ Keep RLS policies up to date
4. ✅ Document any custom RLS changes
5. ✅ Test booking flow weekly

---

## Support Resources

- **Supabase Docs**: https://supabase.com/docs/guides/functions
- **Paystack Docs**: https://paystack.com/docs/api/
- **Edge Function Logs**: Supabase Dashboard → Functions → Logs
- **RLS Guide**: Supabase Dashboard → Authentication → Row Level Security

---

## Next Steps

1. Try one of the Quick Fix Checklist items
2. Test booking again
3. If still failing, check Supabase function logs
4. Compare error message with "Common Error Messages" table
5. Apply corresponding fix

**Most bookings fail due to RLS policies — run `SIMPLE_RLS_FIX.sql` first!**