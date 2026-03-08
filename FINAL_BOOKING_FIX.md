# FINAL BOOKING FIX — Complete Solution

## Problem
You're getting: `Edge Function returned a non-2xx status code`

## Root Cause
1. Edge Function code was calling RPC functions that don't exist or crash
2. RLS policies were blocking booking inserts

## Solution (Two Parts)

### Part 1: Deploy Updated Edge Function

The Edge Function has been rewritten to:
- ✅ Directly insert bookings (no RPC calls)
- ✅ Better error handling
- ✅ Simpler, more reliable code

**File Updated:** `supabase/functions/create-payment/index.ts`

To deploy the new version:

**Option A: Using Supabase CLI**
```bash
supabase functions deploy create-payment
```

**Option B: Manual deployment**
1. Go to Supabase Dashboard
2. Functions → create-payment → Edit
3. Replace the code with the updated version from `supabase/functions/create-payment/index.ts`
4. Click Save

### Part 2: Fix RLS Policies

1. Go to: https://app.supabase.com
2. Select your project
3. Click: **SQL Editor** → **New Query**
4. Open file in your project: **RLS_FIX_SIMPLE.sql**
5. Copy ALL the SQL code
6. Paste into SQL editor
7. Click: **Run**
8. Wait for: **"RLS FIX COMPLETED!"** message

## Step-by-Step Complete Fix

### Step 1: Deploy Edge Function (Choose One)

**If you have Supabase CLI installed:**
```bash
cd FILM-LOCA-APP
supabase functions deploy create-payment
```

**If you don't have CLI:**
1. Supabase Dashboard → Functions → create-payment
2. Click the "Edit" button
3. Replace entire code with updated `supabase/functions/create-payment/index.ts`
4. Click Save
5. Wait for deployment to complete

### Step 2: Run RLS Fix SQL

1. Go to Supabase Dashboard
2. SQL Editor → New Query
3. Copy from: **RLS_FIX_SIMPLE.sql** (in project root)
4. Paste into SQL editor
5. Click Run
6. Confirm: "RLS FIX COMPLETED!" message

### Step 3: Test Booking

1. Refresh your app (Ctrl+R or Cmd+R)
2. Select a property
3. Pick check-in and check-out dates
4. Click "Book Now"
5. **Should see Paystack payment modal** ✅

## What Changed

### Edge Function Updates
- ❌ Removed RPC function calls (were crashing)
- ✅ Direct database inserts
- ✅ Better error handling with try/catch
- ✅ Improved logging
- ✅ Type validation for all inputs
- ✅ Better JSON parsing error handling

### RLS Policy Updates
- ✅ service_role (Edge Functions) can INSERT bookings
- ✅ service_role can READ and UPDATE bookings (for webhooks)
- ✅ authenticated users can read their own bookings
- ✅ authenticated users can update their own bookings

## Expected Flow After Fix

```
User clicks "Book Now"
    ↓
Edge Function receives request
    ↓
Edge Function creates booking with direct INSERT
    ↓
Edge Function initializes Paystack payment
    ↓
User sees Paystack modal
    ↓
User completes payment
    ↓
Paystack webhook updates booking status
    ↓
User redirected to success page
    ↓
Booking in "My Slates"
```

## Files You Need to Know

| File | Action |
|------|--------|
| `supabase/functions/create-payment/index.ts` | Updated Edge Function (already done) |
| `RLS_FIX_SIMPLE.sql` | RLS policies fix - run this in SQL Editor |
| `FIX_BOOKING_NOW.md` | Quick reference guide |

## If You Still Get Errors

### Check 1: Verify Edge Function Deployed
1. Supabase Dashboard → Functions → create-payment
2. Look at "Recent deployments"
3. Should see a recent deployment
4. Check "Logs" tab for any errors during deployment

### Check 2: Verify RLS Fix Ran
1. SQL Editor → New Query
2. Run:
```sql
SELECT policyname FROM pg_policies WHERE tablename = 'bookings';
```
3. Should see policies like:
   - "Allow service role to create bookings"
   - "Users can read their own bookings"
   - etc.

### Check 3: Check Function Logs
1. Functions → create-payment → Logs
2. Look for your most recent booking attempt
3. Check the error message
4. Common issues:
   - "permission denied" → RLS still blocking (rerun RLS_FIX_SIMPLE.sql)
   - "Paystack secret key not configured" → Add PAYSTACK_SECRET_KEY to secrets
   - "Property not found" → Try a different property

### Check 4: Verify Paystack Configuration
1. Supabase Dashboard → Settings → Functions → Secrets
2. Look for `PAYSTACK_SECRET_KEY`
3. If missing:
   - Get from: https://dashboard.paystack.com/settings/developer
   - Add new secret
   - Name: `PAYSTACK_SECRET_KEY`
   - Value: Your Paystack secret
   - Click Save
   - Wait 30 seconds

## Troubleshooting Checklist

- [ ] Edge Function deployed (`create-payment` shows recent deployment)
- [ ] RLS fix SQL executed (see "RLS FIX COMPLETED!" message)
- [ ] RLS policies created (can query pg_policies and see the new policies)
- [ ] PAYSTACK_SECRET_KEY exists in Supabase secrets
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] App page refreshed (Ctrl+R)
- [ ] Attempted booking on a published property
- [ ] Selected different check-in and check-out dates

## Summary

You now have:
1. ✅ Updated Edge Function (direct inserts, no RPC calls)
2. ✅ Fixed RLS policies (service_role can create bookings)
3. ✅ Better error handling throughout

**The booking system should now work.**

If issues persist, check the function logs in Supabase dashboard for specific error messages and match them to the troubleshooting section above.