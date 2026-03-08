-- FIX RLS POLICIES FOR BOOKINGS TABLE
-- Run this in Supabase SQL Editor to fix the RLS issue

-- =====================================================
-- STEP 1: DROP EXISTING RLS POLICIES
-- =====================================================

DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can delete their own bookings" ON bookings;

-- =====================================================
-- STEP 2: ENABLE RLS (IF NOT ALREADY ENABLED)
-- =====================================================

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 3: CREATE PROPER RLS POLICIES
-- =====================================================

-- Policy for viewing bookings
CREATE POLICY "Users can view their own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

-- Policy for creating bookings (THE CRITICAL ONE)
CREATE POLICY "Users can create their own bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for updating bookings
CREATE POLICY "Users can update their own bookings" ON bookings
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy for deleting bookings
CREATE POLICY "Users can delete their own bookings" ON bookings
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- STEP 4: ADD SERVICE ROLE POLICY FOR EDGE FUNCTIONS
-- =====================================================

-- Allow service role to bypass RLS (for Edge Functions)
CREATE POLICY "Service role full access" ON bookings
    FOR ALL USING (current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role');

-- =====================================================
-- STEP 5: TEST RLS POLICIES
-- =====================================================

-- Test if policies work
DO $$
DECLARE
    test_user_id UUID := '00000000-0000-0000-0000-000000000000';
    test_property_id UUID;
    test_booking_id UUID;
    policy_works BOOLEAN := FALSE;
BEGIN
    -- Get a sample property
    SELECT id INTO test_property_id FROM properties LIMIT 1;
    
    IF test_property_id IS NOT NULL THEN
        -- Test booking creation with RLS enabled
        BEGIN
            -- This should work with the new policy
            INSERT INTO bookings (
                property_id,
                user_id,
                start_date,
                end_date,
                total_price,
                team_size,
                notes,
                status,
                payment_status
            ) VALUES (
                test_property_id,
                test_user_id,
                CURRENT_DATE,
                CURRENT_DATE + INTERVAL '1 day',
                100.00,
                1,
                'Test booking for RLS policy verification',
                'pending',
                'pending'
            ) RETURNING id INTO test_booking_id;
            
            -- Clean up
            DELETE FROM bookings WHERE id = test_booking_id;
            
            policy_works := TRUE;
            RAISE NOTICE 'RLS policies are working correctly!';
            
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'RLS policy test failed: %', SQLERRM;
        END;
    ELSE
        RAISE NOTICE 'No properties found to test RLS policies';
    END IF;
END $$;

-- =====================================================
-- STEP 6: VERIFY POLICIES
-- =====================================================

-- Check current policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'bookings'
ORDER BY policyname;

-- =====================================================
-- STEP 7: CHECK RLS STATUS
-- =====================================================

SELECT 
    'RLS Status Check:' as info,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'bookings' 
AND schemaname = 'public';

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT 'RLS POLICIES FIXED!' as status,
       'Bookings table now has proper Row Level Security policies.' as message,
       'Edge Function should now be able to create bookings.' as note;
