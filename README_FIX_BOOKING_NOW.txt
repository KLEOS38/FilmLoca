╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║         🚀 BOOKING ERROR FIX - CLEAN RLS POLICIES                ║
║                                                                    ║
║         Error: "Edge Function returned a non-2xx status code"     ║
║         Cause: Conflicting RLS policies                           ║
║         Fix: 5 minutes                                            ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝

THE PROBLEM:
────────────
Your bookings table has 10+ CONFLICTING RLS policies that are
interfering with each other and blocking bookings.

THE SOLUTION:
─────────────
Replace all conflicting policies with 5 CLEAN, NON-CONFLICTING ones.

QUICK START (5 MINUTES):
──────────────────────

1. Open: FIX_RLS_POLICIES_CLEAN.sql
   - Or: QUICK_FIX_RLS_CLEAN.md (easier to read)

2. Copy all the SQL code

3. In Supabase Dashboard:
   - SQL Editor → New Query
   - Paste the SQL
   - Click Run

4. Expected output:
   ✅ RLS POLICIES CLEANED AND RECREATED

5. Redeploy Edge Function:
   supabase functions deploy create-payment

6. Test booking:
   - Clear cache (Ctrl+Shift+Delete)
   - Click "Book Now"
   - Should redirect to Paystack ✅

WHAT GETS FIXED:
────────────────
BEFORE: 10+ conflicting policies
AFTER:  5 clean, non-conflicting policies

Bookings policies (5):
  1. service_role_full_access (ALL)
  2. authenticated_insert_own_bookings (INSERT)
  3. authenticated_select_own_bookings (SELECT)
  4. authenticated_update_own_bookings (UPDATE)
  5. authenticated_delete_own_bookings (DELETE)

KEY CHANGES:
────────────
✅ Removed all duplicate policies
✅ Service role has explicit full access
✅ Authenticated users have clear per-action access
✅ No policy conflicts
✅ Edge Function can bypass RLS

FILES TO USE:
──────────────
📄 FIX_RLS_POLICIES_CLEAN.sql (copy & paste in Supabase)
📄 QUICK_FIX_RLS_CLEAN.md (easier to read + understand)
📄 ACTION_PLAN_FIX_BOOKING.md (full step-by-step)
📄 START_HERE_BOOKING_FIX.md (navigation guide)

VERIFICATION AFTER FIXING:
──────────────────────────
Run in Supabase SQL Editor:

SELECT COUNT(*) FROM pg_policies WHERE tablename = 'bookings';
→ Should return: 5

SELECT COUNT(*) FROM properties WHERE is_published = true;
→ Should return: > 0

STILL NOT WORKING?
──────────────────
1. Check browser console (F12 → Console)
   → Copy error message

2. Check Supabase logs
   → Functions → create-payment → Logs
   → Find your request
   → Copy error

3. Verify Paystack secret
   → Settings → Functions → Secrets
   → Should have: PAYSTACK_SECRET_KEY

4. Redeploy function
   → supabase functions deploy create-payment

═══════════════════════════════════════════════════════════════════

NEXT STEPS:
───────────
1. Read: QUICK_FIX_RLS_CLEAN.md (2 min)
2. Run: FIX_RLS_POLICIES_CLEAN.sql (3 min)
3. Test: Click "Book Now" (obvious)

Total: 5 minutes

═══════════════════════════════════════════════════════════════════

Good luck! 🚀

