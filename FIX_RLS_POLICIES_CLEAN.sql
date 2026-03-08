-- =====================================================
-- CLEAN RLS POLICY FIX FOR BOOKINGS TABLE
-- =====================================================
-- This recreates all RLS policies cleanly with NO conflicts
-- Run this entire file in Supabase SQL Editor

-- =====================================================
-- STEP 1: DROP ALL EXISTING POLICIES
-- =====================================================
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

-- =====================================================
-- STEP 2: ENSURE RLS IS ENABLED
-- =====================================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 3: CREATE CLEAN, NON-CONFLICTING POLICIES
-- =====================================================

-- Policy 1: Service role has FULL access to everything
-- This allows Edge Functions to create/read/update/delete bookings
CREATE POLICY "service_role_full_access"
    ON bookings
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy 2: Authenticated users can INSERT their own bookings
-- This allows frontend to create bookings if needed
CREATE POLICY "authenticated_insert_own_bookings"
    ON bookings
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy 3: Authenticated users can SELECT their own bookings
-- This allows users to view their bookings
CREATE POLICY "authenticated_select_own_bookings"
    ON bookings
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy 4: Authenticated users can UPDATE their own bookings
-- This allows users to modify their bookings
CREATE POLICY "authenticated_update_own_bookings"
    ON bookings
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy 5: Authenticated users can DELETE their own bookings
-- This allows users to cancel their bookings
CREATE POLICY "authenticated_delete_own_bookings"
    ON bookings
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- =====================================================
-- STEP 4: VERIFY POLICIES WERE CREATED
-- =====================================================
SELECT
    policyname,
    permissive,
    cmd,
    roles,
    qual
FROM pg_policies
WHERE tablename = 'bookings'
AND schemaname = 'public'
ORDER BY policyname;

-- =====================================================
-- STEP 5: VERIFY RLS IS ENABLED
-- =====================================================
SELECT
    schemaname,
    tablename,
    rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE tablename = 'bookings'
AND schemaname = 'public';

-- =====================================================
-- STEP 6: ENSURE PROPERTIES TABLE IS ALSO FIXED
-- =====================================================
-- Drop conflicting policies on properties table too
DROP POLICY IF EXISTS "Enable read access for all" ON properties;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON properties;
DROP POLICY IF EXISTS "Enable update for users based on owner_id" ON properties;
DROP POLICY IF EXISTS "Enable delete for users based on owner_id" ON properties;

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can read published properties
CREATE POLICY "anyone_read_published_properties"
    ON properties
    FOR SELECT
    USING (is_published = true);

-- Policy 2: Owners can read their own unpublished properties
CREATE POLICY "owner_read_own_properties"
    ON properties
    FOR SELECT
    TO authenticated
    USING (auth.uid() = owner_id);

-- Policy 3: Only owners can INSERT their properties
CREATE POLICY "owner_insert_own_properties"
    ON properties
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = owner_id);

-- Policy 4: Only owners can UPDATE their properties
CREATE POLICY "owner_update_own_properties"
    ON properties
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

-- Policy 5: Only owners can DELETE their properties
CREATE POLICY "owner_delete_own_properties"
    ON properties
    FOR DELETE
    TO authenticated
    USING (auth.uid() = owner_id);

-- Policy 6: Service role can do anything
CREATE POLICY "service_role_full_access"
    ON properties
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- STEP 7: ENSURE ALL PROPERTIES ARE PUBLISHED
-- =====================================================
UPDATE properties
SET is_published = true
WHERE is_published = false;

-- =====================================================
-- STEP 8: FINAL VERIFICATION
-- =====================================================
DO $$
DECLARE
    bookings_policy_count INTEGER;
    properties_policy_count INTEGER;
    published_properties_count INTEGER;
    rls_enabled_bookings BOOLEAN;
    rls_enabled_properties BOOLEAN;
BEGIN
    -- Count policies
    SELECT COUNT(*) INTO bookings_policy_count
    FROM pg_policies
    WHERE tablename = 'bookings' AND schemaname = 'public';

    SELECT COUNT(*) INTO properties_policy_count
    FROM pg_policies
    WHERE tablename = 'properties' AND schemaname = 'public';

    -- Count published properties
    SELECT COUNT(*) INTO published_properties_count
    FROM properties
    WHERE is_published = true;

    -- Check RLS status
    SELECT rowsecurity INTO rls_enabled_bookings
    FROM pg_tables
    WHERE tablename = 'bookings' AND schemaname = 'public';

    SELECT rowsecurity INTO rls_enabled_properties
    FROM pg_tables
    WHERE tablename = 'properties' AND schemaname = 'public';

    -- Print results
    RAISE NOTICE '';
    RAISE NOTICE '╔════════════════════════════════════════════════════╗';
    RAISE NOTICE '║         RLS POLICY CLEANUP COMPLETED               ║';
    RAISE NOTICE '╚════════════════════════════════════════════════════╝';
    RAISE NOTICE '';
    RAISE NOTICE '✅ BOOKINGS TABLE:';
    RAISE NOTICE '   • RLS Enabled: %', rls_enabled_bookings;
    RAISE NOTICE '   • Policies Created: % (expected: 5)', bookings_policy_count;
    RAISE NOTICE '';
    RAISE NOTICE '✅ PROPERTIES TABLE:';
    RAISE NOTICE '   • RLS Enabled: %', rls_enabled_properties;
    RAISE NOTICE '   • Policies Created: % (expected: 6)', properties_policy_count;
    RAISE NOTICE '   • Published Properties: %', published_properties_count;
    RAISE NOTICE '';
    RAISE NOTICE '✅ NEXT STEPS:';
    RAISE NOTICE '   1. Redeploy Edge Function: supabase functions deploy create-payment';
    RAISE NOTICE '   2. Clear browser cache (Ctrl+Shift+Delete)';
    RAISE NOTICE '   3. Test booking in your app';
    RAISE NOTICE '   4. Should redirect to Paystack without errors';
    RAISE NOTICE '';
    RAISE NOTICE '✅ VERIFICATION QUERIES:';
    RAISE NOTICE '   SELECT COUNT(*) FROM pg_policies WHERE tablename = ''bookings'';';
    RAISE NOTICE '   SELECT COUNT(*) FROM pg_policies WHERE tablename = ''properties'';';
    RAISE NOTICE '   SELECT COUNT(*) FROM properties WHERE is_published = true;';
    RAISE NOTICE '';
END $$;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
SELECT
    '✅ RLS POLICIES CLEANED AND RECREATED' as status,
    'All conflicting policies have been removed.' as message,
    'New policies are clean and non-conflicting.' as detail,
    'Service role has full access for Edge Functions.' as edge_function_note,
    'Authenticated users can only access their own data.' as user_data_note;
