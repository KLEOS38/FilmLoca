-- =====================================================
-- ULTRA-SIMPLE RLS FIX FOR EDGE FUNCTION
-- =====================================================

-- Drop existing RLS policies that might be blocking
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable select for own bookings" ON bookings;
DROP POLICY IF EXISTS "Enable update for own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can read their own bookings" ON bookings;
DROP POLICY IF EXISTS "Service role can create bookings" ON bookings;

-- Ensure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow service_role (Edge Functions) to do anything
CREATE POLICY "Allow service role to create bookings" ON bookings
    FOR INSERT TO service_role
    WITH CHECK (true);

-- Allow service_role to read all bookings for webhook processing
CREATE POLICY "Allow service role to read bookings" ON bookings
    FOR SELECT TO service_role
    USING (true);

-- Allow service_role to update bookings (for webhook payments)
CREATE POLICY "Allow service role to update bookings" ON bookings
    FOR UPDATE TO service_role
    USING (true);

-- Allow authenticated users to read their own bookings
CREATE POLICY "Users can read their own bookings" ON bookings
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Allow authenticated users to update their own bookings
CREATE POLICY "Users can update their own bookings" ON bookings
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- =====================================================
-- VERIFY POLICIES ARE IN PLACE
-- =====================================================

SELECT policyname, permissive, roles, qual_name, with_check_qual_name
FROM pg_policies
WHERE tablename = 'bookings'
ORDER BY policyname;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT 'RLS FIX COMPLETED!' as status,
       'Edge Function can now create bookings.' as message,
       'Test the booking flow - it should work now.' as next_step;
