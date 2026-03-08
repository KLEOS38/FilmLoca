-- DEEP EDGE FUNCTION DEBUGGING SCRIPT
-- Run this in Supabase SQL Editor to diagnose deeper Edge Function issues

-- =====================================================
-- STEP 1: CHECK EDGE FUNCTION ENVIRONMENT VARIABLES
-- =====================================================

-- Note: Environment variables can only be checked in Supabase Dashboard
-- But we can create a test function to verify connectivity

-- =====================================================
-- STEP 2: CREATE A TEST EDGE FUNCTION FOR DEBUGGING
-- =====================================================

-- Create a simple test function to verify Edge Function connectivity
CREATE OR REPLACE FUNCTION test_edge_function_connectivity()
RETURNS TABLE(test_name TEXT, status TEXT, details TEXT) AS $$
BEGIN
    -- Test 1: Check if we can create a booking manually
    RETURN QUERY
    SELECT 
        'Manual Booking Creation' as test_name,
        CASE 
            WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings' AND table_schema = 'public')
            THEN 'AVAILABLE' 
            ELSE 'NOT AVAILABLE' 
        END as status,
        'Bookings table exists for manual testing' as details;
    
    -- Test 2: Check properties table
    RETURN QUERY
    SELECT 
        'Properties Table Access' as test_name,
        CASE 
            WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'properties' AND table_schema = 'public')
            THEN 'AVAILABLE' 
            ELSE 'NOT AVAILABLE' 
        END as status,
        'Properties table exists for booking validation' as details;
    
    -- Test 3: Check user authentication setup
    RETURN QUERY
    SELECT 
        'Auth Schema Access' as test_name,
        CASE 
            WHEN EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth')
            THEN 'AVAILABLE' 
            ELSE 'NOT AVAILABLE' 
        END as status,
        'Auth schema exists for user authentication' as details;
    
    -- Test 4: Check RLS policies
    RETURN QUERY
    SELECT 
        'RLS Policies' as test_name,
        CASE 
            WHEN EXISTS(SELECT 1 FROM pg_policies WHERE tablename = 'bookings')
            THEN 'CONFIGURED' 
            ELSE 'NOT CONFIGURED' 
        END as status,
        'Row Level Security policies for bookings table' as details;
END;
$$ LANGUAGE plpgsql;

-- Run the test
SELECT * FROM test_edge_function_connectivity();

-- =====================================================
-- STEP 3: CREATE A MANUAL BOOKING TEST
-- =====================================================

-- Test manual booking creation (simulates what Edge Function does)
DO $$
DECLARE
    test_user_id UUID := '00000000-0000-0000-0000-000000000000';
    test_property_id UUID;
    test_booking_id UUID;
    booking_created BOOLEAN := FALSE;
BEGIN
    -- Get a real property ID
    SELECT id INTO test_property_id FROM properties LIMIT 1;
    
    IF test_property_id IS NOT NULL THEN
        -- Try to create a booking exactly like the Edge Function
        BEGIN
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
                'Test booking for Edge Function debugging',
                'pending',
                'pending'
            ) RETURNING id INTO test_booking_id;
            
            booking_created := TRUE;
            
            -- Clean up immediately
            DELETE FROM bookings WHERE id = test_booking_id;
            
            RAISE NOTICE 'Manual booking test: SUCCESS - Booking creation works';
            
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Manual booking test: FAILED - %', SQLERRM;
        END;
    ELSE
        RAISE NOTICE 'Manual booking test: SKIPPED - No properties found';
    END IF;
END $$;

-- =====================================================
-- STEP 4: CHECK SPECIFIC EDGE FUNCTION REQUIREMENTS
-- =====================================================

-- Check if Edge Function can access required tables
SELECT 
    'Edge Function Requirements Check:' as info,
    table_name,
    CASE 
        WHEN EXISTS(
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = c.table_name 
            AND table_schema = 'public'
            AND column_name = 'id'
        )
        THEN 'HAS ID COLUMN'
        ELSE 'MISSING ID COLUMN'
    END as id_check,
    CASE 
        WHEN EXISTS(
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = c.table_name 
            AND table_schema = 'public'
            AND column_name IN ('property_id', 'user_id')
        )
        THEN 'HAS RELATION COLUMNS'
        ELSE 'MISSING RELATION COLUMNS'
    END as relation_check
FROM information_schema.tables c
WHERE table_name IN ('bookings', 'properties')
AND table_schema = 'public';

-- =====================================================
-- STEP 5: CHECK FOR COMMON EDGE FUNCTION ISSUES
-- =====================================================

-- Issue 1: Missing foreign key constraints
SELECT 
    'Foreign Key Constraints:' as info,
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_name = 'bookings';

-- Issue 2: Check for data type mismatches
SELECT 
    'Data Type Validation:' as info,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND table_schema = 'public'
AND column_name IN ('total_price', 'team_size', 'start_date', 'end_date');

-- Issue 3: Check for check constraints
SELECT 
    'Check Constraints:' as info,
    tc.constraint_name,
    cc.check_clause
FROM information_schema.table_constraints tc
JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'bookings'
AND tc.table_schema = 'public';

-- =====================================================
-- STEP 6: CREATE A DEBUGGING BOOKING FUNCTION
-- =====================================================

-- Create a function that mimics the Edge Function exactly
CREATE OR REPLACE FUNCTION debug_booking_creation(
    p_property_id UUID,
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE,
    p_total_price DECIMAL,
    p_team_size INTEGER,
    p_notes TEXT
)
RETURNS TABLE(success BOOLEAN, error_message TEXT, booking_id UUID) AS $$
DECLARE
    v_booking_id UUID;
    v_error_message TEXT;
BEGIN
    -- Validate inputs exactly like Edge Function
    IF p_property_id IS NULL OR p_user_id IS NULL OR p_start_date IS NULL OR p_end_date IS NULL OR p_total_price IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Missing required fields'::TEXT, NULL::UUID;
        RETURN;
    END IF;
    
    -- Validate total_price
    IF p_total_price <= 0 OR p_total_price > 10000000 THEN
        RETURN QUERY SELECT FALSE, 'Invalid total price'::TEXT, NULL::UUID;
        RETURN;
    END IF;
    
    -- Validate team_size
    IF p_team_size < 1 OR p_team_size > 100 THEN
        RETURN QUERY SELECT FALSE, 'Invalid team size'::TEXT, NULL::UUID;
        RETURN;
    END IF;
    
    -- Validate dates
    IF p_start_date >= p_end_date THEN
        RETURN QUERY SELECT FALSE, 'Invalid booking dates'::TEXT, NULL::UUID;
        RETURN;
    END IF;
    
    -- Check if property exists
    IF NOT EXISTS(SELECT 1 FROM properties WHERE id = p_property_id) THEN
        RETURN QUERY SELECT FALSE, 'Property not found'::TEXT, NULL::UUID;
        RETURN;
    END IF;
    
    -- Try to create booking
    BEGIN
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
            p_property_id,
            p_user_id,
            p_start_date,
            p_end_date,
            p_total_price,
            p_team_size,
            p_notes,
            'pending',
            'pending'
        ) RETURNING id INTO v_booking_id;
        
        -- Clean up test booking
        DELETE FROM bookings WHERE id = v_booking_id;
        
        RETURN QUERY SELECT TRUE, 'Booking creation successful'::TEXT, v_booking_id;
        
    EXCEPTION
        WHEN OTHERS THEN
            v_error_message := SQLERRM;
            RETURN QUERY SELECT FALSE, v_error_message, NULL::UUID;
    END;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STEP 7: TEST THE DEBUGGING FUNCTION
-- =====================================================

-- Test with sample data
DO $$
DECLARE
    test_property_id UUID;
    test_result RECORD;
BEGIN
    -- Get a sample property
    SELECT id INTO test_property_id FROM properties LIMIT 1;
    
    IF test_property_id IS NOT NULL THEN
        -- Test the debugging function
        FOR test_result IN 
            SELECT * FROM debug_booking_creation(
                test_property_id,
                '00000000-0000-0000-0000-000000000000',
                CURRENT_DATE,
                CURRENT_DATE + INTERVAL '1 day',
                100.00,
                1,
                'Test booking for debugging'
            )
        LOOP
            RAISE NOTICE 'Debug booking test: % - %', test_result.success, test_result.error_message;
        END LOOP;
    ELSE
        RAISE NOTICE 'Debug booking test: SKIPPED - No properties found';
    END IF;
END $$;

-- =====================================================
-- STEP 8: CHECK FOR SUPABASE AUTH ISSUES
-- =====================================================

-- Check if auth.users table exists and is accessible
SELECT 
    'Auth Users Table Check:' as info,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'auth'
ORDER BY column_name;

-- =====================================================
-- STEP 9: CREATE A SIMPLIFIED EDGE FUNCTION
-- =====================================================

-- Create a simplified version of the Edge Function logic for testing
CREATE OR REPLACE FUNCTION simplified_booking_test(
    p_property_id TEXT,
    p_user_id TEXT,
    p_start_date TEXT,
    p_end_date TEXT,
    p_total_price DECIMAL,
    p_team_size INTEGER,
    p_notes TEXT
)
RETURNS TEXT AS $$
DECLARE
    v_property_uuid UUID;
    v_user_uuid UUID;
    v_start_date DATE;
    v_end_date DATE;
BEGIN
    -- Convert text inputs to proper types
    v_property_uuid := p_property_id::UUID;
    v_user_uuid := p_user_id::UUID;
    v_start_date := p_start_date::DATE;
    v_end_date := p_end_date::DATE;
    
    -- Validate property exists
    SELECT id INTO v_property_uuid FROM properties WHERE id = v_property_uuid;
    IF v_property_uuid IS NULL THEN
        RETURN 'ERROR: Property not found';
    END IF;
    
    -- Test booking creation
    BEGIN
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
            v_property_uuid,
            v_user_uuid,
            v_start_date,
            v_end_date,
            p_total_price,
            p_team_size,
            p_notes,
            'pending',
            'pending'
        );
        
        -- Clean up
        DELETE FROM bookings 
        WHERE property_id = v_property_uuid 
        AND user_id = v_user_uuid 
        AND start_date = v_start_date;
        
        RETURN 'SUCCESS: Booking creation works';
        
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STEP 10: FINAL DIAGNOSIS SUMMARY
-- =====================================================

SELECT 
    'DEEP EDGE FUNCTION DIAGNOSIS SUMMARY:' as status,
    'Database Structure' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings' AND table_schema = 'public')
        THEN 'READY' 
        ELSE 'MISSING' 
    END as status_value
UNION ALL
SELECT 
    'DEEP EDGE FUNCTION DIAGNOSIS SUMMARY:' as status,
    'Properties Access' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'properties' AND table_schema = 'public')
        THEN 'READY' 
        ELSE 'MISSING' 
    END as status_value
UNION ALL
SELECT 
    'DEEP EDGE FUNCTION DIAGNOSIS SUMMARY:' as status,
    'Auth Schema' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth')
        THEN 'READY' 
        ELSE 'MISSING' 
    END as status_value
UNION ALL
SELECT 
    'DEEP EDGE FUNCTION DIAGNOSIS SUMMARY:' as status,
    'RLS Policies' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM pg_policies WHERE tablename = 'bookings')
        THEN 'CONFIGURED' 
        ELSE 'MISSING' 
    END as status_value;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT 'DEEP EDGE FUNCTION DIAGNOSIS COMPLETED!' as status,
       'Check all results above for specific issues.' as message,
       'If all components show READY/CONFIGURED, the issue is in Edge Function environment.' as note;
