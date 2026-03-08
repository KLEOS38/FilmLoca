# Quick Booking Fix — 5 Minutes to Working Bookings

## The Error
```
Edge Function returned a non-2xx status code
```

## The Fastest Fix (99% of cases)

### Step 1: Open Supabase Dashboard
Go to: https://app.supabase.com → Select your project

### Step 2: Run the RLS Fix
1. Click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy everything from `SIMPLE_RLS_FIX.sql` in your project root
4. Paste it into the SQL editor
5. Click **Run** (blue button)
6. Wait for "SIMPLE RLS FIX COMPLETED!" message

### Step 3: Test Booking
1. Go back to your app
2. Select a property
3. Pick check-in and check-out dates
4. Click "Book Now"
5. **Should see Paystack payment modal** ✅

---

## Still Not Working?

### Check Paystack Configuration
1. In Supabase Dashboard: **Settings** → **Functions** → **Secrets**
2. Look for `PAYSTACK_SECRET_KEY`
3. If missing:
   - Get your key from: https://dashboard.paystack.com/settings/developer
   - Click **+ New Secret**
   - Name: `PAYSTACK_SECRET_KEY`
   - Value: Your actual secret key
   - Click **Save**
4. Wait 30 seconds
5. Try booking again

### Check Function Logs
1. Go to **Functions** → **create-payment** → **Logs** tab
2. Look for your most recent error
3. Note the exact error message
4. Find it in the table below:

| Error | Fix |
|-------|-----|
| "permission denied" | Run SIMPLE_RLS_FIX.sql again |
| "not authenticated" | Log out and log back in |
| "not configured" | Add PAYSTACK_SECRET_KEY to secrets |
| "Property not found" | Try a different property |

### Last Resort: Disable All RLS
```sql
-- Run in SQL Editor if SIMPLE_RLS_FIX.sql didn't work

ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
```

---

## What This Does

The RLS fix creates database functions that allow the Edge Function to:
1. ✅ Create bookings (was blocked by RLS)
2. ✅ Read property details
3. ✅ Initialize Paystack payment
4. ✅ Return success to the frontend

---

## Expected Result

After fixing:
1. Click "Book Now"
2. See Paystack modal appear
3. Complete payment
4. Redirected to success page
5. Booking appears in "My Slates"

---

## Need Help?

**Error persists?**
1. Check function logs (see above)
2. Verify Paystack key is set
3. Make sure you're logged in
4. Try in incognito window (clear cache)

**Still broken?**
See `EDGE_FUNCTION_ERROR_FIX.md` for detailed troubleshooting.