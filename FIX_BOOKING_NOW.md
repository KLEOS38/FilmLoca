# Fix Booking Error Now — 5 Minutes

## The Error
```
Edge Function returned a non-2xx status code
```

## Why It Happens
Supabase Row Level Security (RLS) policies are blocking the Edge Function from creating bookings.

## How to Fix (5 Steps)

### Step 1: Open Supabase Dashboard
Go to: https://app.supabase.com
Select your project

### Step 2: Open SQL Editor
Click: **SQL Editor** (left sidebar)
Click: **New Query**

### Step 3: Copy the SQL
Open this file in your project: **RLS_FIX.sql**
Copy ALL the SQL code from that file

### Step 4: Paste and Run
Paste the SQL into the SQL editor
Click: **Run** (blue button at bottom right)
Wait for the query to complete

### Step 5: Test Booking
Go back to your app
Refresh the page (Ctrl+R or Cmd+R)
Select a property
Pick check-in and check-out dates
Click "Book Now"
You should see **Paystack payment modal** ✅

---

## If It Still Doesn't Work

### Check 1: Paystack Secret Key
Location: Supabase Dashboard → Settings → Functions → Secrets
Look for: `PAYSTACK_SECRET_KEY`
If missing:
  - Get key from: https://dashboard.paystack.com/settings/developer
  - Click: "+ New Secret"
  - Name: `PAYSTACK_SECRET_KEY`
  - Value: Your Paystack secret key
  - Click: Save
  - Wait 30 seconds
  - Try booking again

### Check 2: Clear Browser Cache
Press: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
Select: "Cookies and cached images"
Click: Clear data
Try booking again

### Check 3: Check Function Logs
Location: Supabase → Functions → create-payment → Logs
Find: Your booking attempt (by timestamp)
Read: The error message
Note it and try corresponding fix below

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "permission denied" | Run RLS_FIX.sql again, make sure all SQL executed |
| "function edge_create_booking does not exist" | Make sure ALL of RLS_FIX.sql ran successfully |
| "Paystack secret key not configured" | Add PAYSTACK_SECRET_KEY to Supabase secrets |
| "User not authenticated" | Log out and log back in, clear browser cache |
| "Property not found" | Try booking a different property |

---

## Summary

✅ Open RLS_FIX.sql
✅ Copy ALL the SQL code
✅ Paste in Supabase SQL Editor
✅ Click Run
✅ Wait for "SIMPLE RLS FIX COMPLETED!" message
✅ Refresh app and test booking

**That's it! Bookings should work now.**

If you need more help, see:
- BOOKING_ERROR_IMMEDIATE_FIX.md (detailed guide)
- EDGE_FUNCTION_ERROR_FIX.md (advanced troubleshooting)