-- =====================================================
-- FINAL RLS FIX - HANDLES EXISTING POLICIES GRACEFULLY
-- =====================================================

-- Drop existing RLS policies safely
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable select for own bookings" ON bookings;
DROP POLICY IF EXISTS "Enable update for own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can read their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
DROP POLICY IF EXISTS "Service role can create bookings" ON bookings;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Allow select for own bookings" ON bookings;
DROP POLICY IF EXISTS "Allow update for own bookings" ON bookings;
DROP POLICY IF EXISTS "Allow service role to create bookings" ON bookings;
DROP POLICY IF EXISTS "Allow service role to read bookings" ON bookings;
DROP POLICY IF EXISTS "Allow service role to update bookings" ON bookings;

-- Ensure RLS is enabled on bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE NEW POLICIES FOR EDGE FUNCTION + USERS
-- =====================================================

-- Policy 1: Service role (Edge Functions) can INSERT bookings
CREATE POLICY "service_role_insert_bookings" ON bookings
    FOR INSERT TO service_role
    WITH CHECK (true);

-- Policy 2: Service role can READ all bookings (for webhooks)
CREATE POLICY "service_role_select_bookings" ON bookings
    FOR SELECT TO service_role
    USING (true);

-- Policy 3: Service role can UPDATE bookings (for webhook payment confirmation)
CREATE POLICY "service_role_update_bookings" ON bookings
    FOR UPDATE TO service_role
    USING (true);

-- Policy 4: Authenticated users can READ their own bookings
CREATE POLICY "user_select_own_bookings" ON bookings
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Policy 5: Authenticated users can UPDATE their own bookings
CREATE POLICY "user_update_own_bookings" ON bookings
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- =====================================================
-- VERIFY POLICIES ARE CREATED
-- =====================================================

SELECT
    policyname,
    permissive,
    roles,
    qual
FROM pg_policies
WHERE tablename = 'bookings'
ORDER BY policyname;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT
    'RLS FIX COMPLETED!' as status,
    'Edge Function can now create bookings.' as message,
    'Test the booking flow - it should work now.' as next_step,
    'If you still get errors, check the Supabase function logs.' as hint;
