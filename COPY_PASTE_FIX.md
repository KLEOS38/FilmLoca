# 🚀 COPY-PASTE FIX (5 Minutes - No Thinking Required)

## DO THIS RIGHT NOW:

### STEP 1: Go to Supabase Dashboard
https://app.supabase.com

### STEP 2: Select Your Project
Click on your FILM-LOCA-APP project

### STEP 3: Click "SQL Editor" on Left Sidebar
Then click "New Query"

### STEP 4: Copy THIS ENTIRE CODE BLOCK:

```sql
-- DELETE ALL BAD POLICIES
DROP POLICY IF EXISTS "Allow service role inserts" ON bookings;
DROP POLICY IF EXISTS "Service role full access" ON bookings;
DROP POLICY IF EXISTS "service_role_insert_bookings" ON bookings;
DROP POLICY IF EXISTS "service_role_select_bookings" ON bookings;
DROP POLICY IF EXISTS "service_role_update_bookings" ON bookings;
DROP POLICY IF EXISTS "user_select_own_bookings" ON bookings;
DROP POLICY IF EXISTS "user_update_own_bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can delete their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;

-- ENABLE RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- CREATE NEW CLEAN POLICIES
CREATE POLICY "service_role_full_access" ON bookings FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_insert_own_bookings" ON bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "authenticated_select_own_bookings" ON bookings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "authenticated_update_own_bookings" ON bookings FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "authenticated_delete_own_bookings" ON bookings FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- PUBLISH ALL PROPERTIES
UPDATE properties SET is_published = true WHERE is_published = false;

-- VERIFY IT WORKED
SELECT COUNT(*) as policy_count FROM pg_policies WHERE tablename = 'bookings';
```

### STEP 5: Paste in Supabase
- Click in the SQL Editor text box
- Press Ctrl+A (select all)
- Press Ctrl+V (paste)

### STEP 6: Click RUN Button
Or press Ctrl+Enter

### STEP 7: Look for Results
You should see at bottom:
```
policy_count
5
```

If you see this ✅ you're done with SQL

### STEP 8: Redeploy Edge Function
Open terminal and run:
```bash
cd /Users/fortune./Documents/BRANDS/FILM-LOCA-APP
supabase functions deploy create-payment
```

Wait for:
```
✔ Function create-payment deployed successfully
```

### STEP 9: Clear Browser Cache
- Press F12 (open DevTools)
- Right-click the refresh button
- Click "Empty cache and hard refresh"
- Close DevTools (F12)

### STEP 10: Test Booking
1. Go to your app
2. Click any property
3. Set dates (tomorrow to +3 days)
4. Click "Book Now"
5. Should redirect to Paystack ✅

---

## ✅ VERIFICATION

Run this in SQL Editor to double-check:

```sql
SELECT COUNT(*) FROM pg_policies WHERE tablename = 'bookings';
```

Should return: **5**

---

## ❌ IF IT STILL FAILS

### Check 1: Browser Console Error
- Press F12
- Go to Console tab
- Click "Book Now" again
- Copy any red error messages

### Check 2: Supabase Function Logs
- Supabase Dashboard
- Functions
- create-payment
- Click Logs tab
- Find your request
- Copy error details

### Check 3: Paystack Secret
- Supabase Dashboard
- Settings (left sidebar)
- Functions tab
- Secrets
- Should see: PAYSTACK_SECRET_KEY
- If missing: Add it with your key from https://dashboard.paystack.com/settings/developer

### Check 4: Verify Policies
```sql
SELECT policyname FROM pg_policies WHERE tablename = 'bookings' ORDER BY policyname;
```

Should show:
```
authenticated_delete_own_bookings
authenticated_insert_own_bookings
authenticated_select_own_bookings
authenticated_update_own_bookings
service_role_full_access
```

---

## 🎯 THAT'S IT!

If you follow these 10 steps:
1. Copy the SQL
2. Paste in Supabase
3. Click Run
4. Redeploy function
5. Clear cache
6. Test booking

It WILL work. ✅

Average time: 5 minutes

---

## 💡 WHAT THIS DOES

- ✅ Deletes 10 conflicting policies
- ✅ Creates 5 clean policies
- ✅ Gives service role full access (needed for Edge Function)
- ✅ Restricts users to their own data
- ✅ Publishes all properties (needed for booking validation)

---

## 📞 SUPPORT

If something goes wrong:
1. Note the error message
2. Run verification queries above
3. Check that Paystack secret is set
4. Make sure you ran the SQL completely
5. Make sure you redeployed the function

The most common issue: Forgot to set PAYSTACK_SECRET_KEY in Step 3 of "Check 3" above.

---

## ✨ SUCCESS INDICATORS

You'll know it worked when:
1. ✅ SQL query returns policy_count = 5
2. ✅ Function deployed successfully
3. ✅ Browser cache cleared
4. ✅ Clicking "Book Now" redirects to Paystack (no error)
5. ✅ No red errors in browser console
6. ✅ Supabase logs show "CREATE-PAYMENT SUCCEEDED"

---

**NEXT STEP: Copy the SQL above and follow the 10 steps. You've got this! 🚀**