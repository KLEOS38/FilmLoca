# ACTION PLAN: Fix Booking Error Now

## 🎯 Goal
Fix the error: **"Edge Function returned a non-2xx status code"** when trying to book a property.

## ⏱️ Time Required
- **Total: 10 minutes**
- Step 1 (SQL): 2 minutes
- Step 2 (Secrets): 2 minutes
- Step 3 (Deploy): 2 minutes
- Step 4 (Test): 4 minutes

---

## 📋 STEP 1: Fix RLS Policies in Database (2 minutes)

### What You'll Do
Run SQL code in Supabase to fix Row Level Security policies that are blocking bookings.

### Instructions

1. **Open Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click **SQL Editor** in the left sidebar
   - Click **New Query**

3. **Copy This SQL Code**
   ```sql
   -- DROP ALL OLD POLICIES
   DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
   DROP POLICY IF EXISTS "Users can read their own bookings" ON bookings;
   DROP POLICY IF EXISTS "Service role can create bookings" ON bookings;
   DROP POLICY IF EXISTS "Enable insert for authenticated users" ON bookings;
   DROP POLICY IF EXISTS "Enable select for own bookings" ON bookings;
   DROP POLICY IF EXISTS "Enable update for own bookings" ON bookings;
   DROP POLICY IF EXISTS "Anyone can insert bookings" ON bookings;
   DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
   
   -- RE-ENABLE RLS
   ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
   
   -- CREATE NEW WORKING POLICIES
   CREATE POLICY "Edge Function can create bookings" ON bookings
       FOR INSERT WITH CHECK (true);
   
   CREATE POLICY "Users can view own bookings" ON bookings
       FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can update own bookings" ON bookings
       FOR UPDATE USING (auth.uid() = user_id)
       WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete own bookings" ON bookings
       FOR DELETE USING (auth.uid() = user_id);
   
   -- PUBLISH ALL PROPERTIES (REQUIRED FOR BOOKING)
   UPDATE properties SET is_published = true WHERE is_published = false;
   
   -- VERIFY
   SELECT policyname FROM pg_policies WHERE tablename = 'bookings' ORDER BY policyname;
   ```

4. **Paste into SQL Editor**
   - Click in the SQL Editor text area
   - Press Ctrl+A to select all (if there's existing text)
   - Press Ctrl+V to paste the SQL code above

5. **Run the Query**
   - Click the blue **Run** button (or press Ctrl+Enter)

6. **Verify Success**
   - You should see a result showing policy names
   - Should list 4 policies:
     - Edge Function can create bookings
     - Users can delete own bookings
     - Users can update own bookings
     - Users can view own bookings

✅ **STEP 1 COMPLETE**

---

## 🔑 STEP 2: Add Paystack Secret Key (2 minutes)

### What You'll Do
Add your Paystack API secret to Supabase so the payment system works.

### Instructions

1. **Get Your Paystack Secret Key**
   - Go to https://dashboard.paystack.com/settings/developer
   - Log in to Paystack (create account if needed)
   - Copy your **Secret Key** (not Public Key)
   - Keep this tab open

2. **Go to Supabase Functions Settings**
   - In Supabase Dashboard (still open from Step 1)
   - Click **Settings** in left sidebar
   - Click **Functions** tab
   - Click **Secrets**

3. **Add New Secret**
   - Click **+ New Secret** button

4. **Fill in the Secret**
   - **Key field:** `PAYSTACK_SECRET_KEY`
   - **Value field:** Paste your Paystack secret key (from step 1 above)
   - Keep the key exactly as shown: `PAYSTACK_SECRET_KEY`

5. **Save**
   - Click **Save** button
   - Wait for confirmation message

6. **Verify Success**
   - You should see `PAYSTACK_SECRET_KEY` listed in the Secrets section
   - **Important:** Wait 30 seconds before proceeding (for deployment)

✅ **STEP 2 COMPLETE**

---

## 🚀 STEP 3: Deploy Updated Edge Function (2 minutes)

### What You'll Do
Deploy the updated Edge Function code that fixes the booking issue.

### Option A: Using Terminal (Recommended if you have Supabase CLI)

1. **Open Terminal**
   - Open a terminal/command prompt
   - Navigate to your project folder:
     ```bash
     cd /path/to/FILM-LOCA-APP
     ```

2. **Deploy Function**
   ```bash
   supabase functions deploy create-payment
   ```

3. **Verify Deployment**
   - You should see:
     ```
     ✔ Function create-payment deployed successfully
     ```

**DONE - Skip Option B**

### Option B: Manual Deployment (If no terminal/CLI)

1. **In Supabase Dashboard**
   - Click **Functions** in left sidebar
   - Click **create-payment**

2. **View the Code**
   - The code is already updated in your project
   - You should see the updated code in the editor

3. **Deploy**
   - If there's a **Deploy** button, click it
   - Or code automatically deploys after 30 seconds

4. **Verify Deployment**
   - Function should show "deployed" status

✅ **STEP 3 COMPLETE**

---

## 🧪 STEP 4: Test the Booking (4 minutes)

### What You'll Do
Test that the booking system is now working.

### Instructions

1. **Clear Browser Cache**
   - Open your app in browser
   - Press **F12** to open Developer Tools
   - Right-click the Refresh button
   - Click **Empty cache and hard refresh**
   - Or press: **Ctrl+Shift+Delete** (Windows) or **Cmd+Shift+Delete** (Mac)
   - Close DevTools (F12)

2. **Log In to Your App**
   - Make sure you're logged in
   - If not, click "Sign In" and log in with your account

3. **Find a Property to Book**
   - Click on any property listing
   - Go to property detail page

4. **Fill in Booking Details**
   - **Check-in:** Select tomorrow's date
   - **Check-out:** Select a date 3+ days from today
   - **Team Size:** Enter 1 (or any number between 1-100)

5. **Click "Book Now" Button**
   - Should be a button in the right sidebar
   - Click it

6. **Expected Outcome - SUCCESS** ✅
   - You should be redirected to Paystack payment page
   - You should see Paystack logo and payment form
   - **No error messages** in the browser

7. **Expected Outcome - FAILURE** ❌
   - Error message appears
   - **No redirect to Paystack**
   - **Go to Troubleshooting section below**

### If Booking Works

🎉 **CONGRATULATIONS!** The booking system is fixed!

To complete the payment test:
1. Use Paystack test card: **4084 0840 8408 4081**
2. Use any future date for expiry
3. Use any 3 digits for CVV
4. Click "Pay"
5. You should see success page

---

## ❌ Troubleshooting (If Booking Still Fails)

### Check 1: Look at Browser Error Message

**What to do:**
1. Open browser DevTools: **F12**
2. Go to **Console** tab
3. Try booking again
4. Look for red error messages
5. Copy the error message text

**Common errors and fixes:**

| Error Message | What to Do |
|---------------|-----------|
| "Permission denied" or "RLS policy" | Go back to Step 1, run the SQL again |
| "Paystack secret key not configured" | Go back to Step 2, verify secret was added |
| "User not authenticated" | Log out and log back in, then try again |
| "Property not found" | Make sure property exists and is published |
| "Invalid total price" | Check price is > 0 and dates are correct |

### Check 2: Look at Supabase Function Logs

**What to do:**
1. Open Supabase Dashboard
2. Click **Functions** in left sidebar
3. Click **create-payment**
4. Click **Logs** tab
5. Find the request matching your booking attempt time
6. Look for error messages (anything with 🔴 or error text)
7. Copy the error details

### Check 3: Verify Database Setup

**In Supabase SQL Editor, run:**

```sql
-- Check if RLS policies exist
SELECT COUNT(*) as policy_count FROM pg_policies WHERE tablename = 'bookings';
```

**Should return:** `4` policies

If less than 4: Go back to Step 1 and run the SQL again.

```sql
-- Check if properties are published
SELECT COUNT(*) as published_count FROM properties WHERE is_published = true;
```

**Should return:** A number > 0

If 0: Run this to publish all properties:
```sql
UPDATE properties SET is_published = true WHERE is_published = false;
```

### Check 4: Verify Paystack Secret is Set

1. Go to Supabase Dashboard
2. Click **Settings**
3. Click **Functions**
4. Click **Secrets**
5. You should see `PAYSTACK_SECRET_KEY` listed

If NOT listed: Go back to Step 2 and add it.

### Still Not Working?

If you've done all checks above and still getting errors:

1. **Wait 1-2 minutes** - Sometimes Supabase needs time to deploy changes
2. **Refresh page** - Press Ctrl+F5 (or Cmd+Shift+R on Mac)
3. **Clear all cache** - DevTools → Application → Clear all data
4. **Try again** - Repeat the test from Step 4

### Last Resort

If absolutely nothing works:

1. Go to Supabase Dashboard
2. Functions → create-payment → Logs
3. Find the error message in the logs
4. Copy the **entire error message**
5. This exact error message will help identify the issue

---

## ✅ Verification Checklist

Before declaring success, verify all these:

- [ ] Step 1 SQL ran without errors
- [ ] Step 2 PAYSTACK_SECRET_KEY is visible in Supabase Secrets
- [ ] Step 3 Edge Function was deployed
- [ ] Step 4 Booking redirects to Paystack (no error)
- [ ] Paystack page loads successfully
- [ ] Test payment card works (4084 0840 8408 4081)
- [ ] Success page appears after payment
- [ ] No error messages in browser console

---

## 📞 What If You Need Help?

### Information to Gather
If booking still fails, gather this info before asking for help:

1. **Exact error message** - Copy from browser console
2. **Screenshot** - Take screenshot of the error
3. **Supabase logs** - Copy relevant error from function logs
4. **Property ID** - The ID of the property you're trying to book

### Where to Find Support
- **Supabase Docs:** https://supabase.com/docs
- **Paystack Support:** https://paystack.com/support
- **Your Project Dashboard:** https://app.supabase.com

---

## 🎉 Success!

If you made it this far and booking works, you've successfully fixed the issue!

### Next Steps (Optional)
1. Test with real Paystack key when ready for production
2. Set up payment webhook verification
3. Monitor Supabase function logs regularly
4. Test booking flow weekly

---

## Summary

| Step | Action | Time | Status |
|------|--------|------|--------|
| 1 | Run SQL to fix RLS | 2 min | ⬜ Not Started |
| 2 | Add Paystack Secret | 2 min | ⬜ Not Started |
| 3 | Deploy Edge Function | 2 min | ⬜ Not Started |
| 4 | Test Booking | 4 min | ⬜ Not Started |

**Total Time:** 10 minutes

**Expected Result:** Booking system works without errors ✅

---

## Emergency Quick Fix (If Very Stuck)

If absolutely nothing else works, this nuclear option will make booking work (development only):

**In Supabase SQL Editor:**
```sql
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
```

Then test booking. If this works:
- Your RLS setup was wrong
- Go back to Step 1 and run the RLS fix again
- Then re-enable RLS:
```sql
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
```

⚠️ **WARNING:** Only use the emergency fix for debugging. Don't leave RLS disabled in production.

---

## You're All Set! 🚀

Start with Step 1 above and follow each step in order. Most bookings will work after Step 1 alone!

Good luck! 💪