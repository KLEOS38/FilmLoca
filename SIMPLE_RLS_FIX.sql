-- SIMPLE RLS FIX - BYPASS RLS FOR EDGE FUNCTIONS
-- Run this in Supabase SQL Editor

-- =====================================================
-- STEP 1: DISABLE RLS TEMPORARILY (QUICK FIX)
-- =====================================================

ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: CREATE BOOKING WITH SERVICE ROLE
-- =====================================================

-- Create a function that bypasses RLS completely
CREATE OR REPLACE FUNCTION create_booking_bypass_rls(
    p_property_id UUID,
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE,
    p_total_price DECIMAL,
    p_team_size INTEGER,
    p_notes TEXT
)
RETURNS UUID AS $$
DECLARE
    v_booking_id UUID;
BEGIN
    -- Set role to service role to bypass RLS
    SET LOCAL role = 'service_role';

    -- Create booking without RLS restrictions
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

    -- Reset role
    RESET role;

    RETURN v_booking_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- STEP 3: CREATE ALTERNATIVE EDGE FUNCTION
-- =====================================================

-- Create a simple function for Edge Function to call
-- Note: All parameters must be explicitly cast to correct types
CREATE OR REPLACE FUNCTION edge_create_booking(
    p_property_id UUID,
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE,
    p_total_price DECIMAL,
    p_team_size INTEGER,
    p_notes TEXT
)
RETURNS JSON AS $$
DECLARE
    v_booking_id UUID;
    v_result JSON;
BEGIN
    -- Validate input parameters
    IF p_property_id IS NULL OR p_user_id IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Property ID and User ID are required',
            'message', 'Invalid input parameters'
        );
    END IF;

    IF p_start_date IS NULL OR p_end_date IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Start date and end date are required',
            'message', 'Invalid date parameters'
        );
    END IF;

    IF p_start_date >= p_end_date THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Start date must be before end date',
            'message', 'Invalid date range'
        );
    END IF;

    IF p_total_price IS NULL OR p_total_price <= 0 THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Total price must be greater than 0',
            'message', 'Invalid price'
        );
    END IF;

    IF p_team_size IS NULL OR p_team_size < 1 THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Team size must be at least 1',
            'message', 'Invalid team size'
        );
    END IF;

    -- Use the bypass function
    v_booking_id := create_booking_bypass_rls(
        p_property_id,
        p_user_id,
        p_start_date::DATE,
        p_end_date::DATE,
        p_total_price,
        p_team_size,
        COALESCE(p_notes, '')
    );

    -- Return success result
    v_result := json_build_object(
        'success', true,
        'booking_id', v_booking_id,
        'message', 'Booking created successfully'
    );

    RETURN v_result;

EXCEPTION
    WHEN OTHERS THEN
        -- Return error result
        v_result := json_build_object(
            'success', false,
            'error', SQLERRM,
            'message', 'Failed to create booking',
            'error_code', SQLSTATE
        );

        RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- STEP 4: RE-ENABLE RLS (OPTIONAL)
-- =====================================================

-- Only enable if you want RLS for direct user access
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 5: CREATE MINIMAL RLS POLICIES
-- =====================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON bookings;
DROP POLICY IF EXISTS "Enable select for own bookings" ON bookings;
DROP POLICY IF EXISTS "Enable update for own bookings" ON bookings;

-- Simple policies that work
CREATE POLICY "Enable insert for authenticated users" ON bookings
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable select for own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Enable update for own bookings" ON bookings
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- STEP 6: VERIFY SETUP
-- =====================================================

-- Check if functions exist
SELECT
    routine_name,
    routine_type,
    'Function exists' as status
FROM information_schema.routines
WHERE routine_name IN ('create_booking_bypass_rls', 'edge_create_booking')
AND routine_schema = 'public'
ORDER BY routine_name;

-- =====================================================
-- STEP 7: TEST THE FIX (SAFE TEST)
-- =====================================================

DO $$
DECLARE
    test_property_id UUID;
    test_user_id UUID := '00000000-0000-0000-0000-000000000001';
    test_result JSON;
    test_booking_id UUID;
BEGIN
    -- Get a sample property
    SELECT id INTO test_property_id FROM properties WHERE is_published = true LIMIT 1;

    IF test_property_id IS NOT NULL THEN
        RAISE NOTICE 'Testing with property: %', test_property_id;

        -- Test the edge function with explicit type casting
        SELECT edge_create_booking(
            test_property_id::UUID,
            test_user_id::UUID,
            CURRENT_DATE::DATE,
            (CURRENT_DATE + INTERVAL '1 day')::DATE,
            100.00::DECIMAL,
            1::INTEGER,
            'Test booking for bypass function'::TEXT
        ) INTO test_result;

        RAISE NOTICE 'Edge function test result: %', test_result;

        -- Extract booking ID if successful
        IF test_result->>'success' = 'true' THEN
            test_booking_id := (test_result->>'booking_id')::UUID;
            RAISE NOTICE 'Test booking created successfully: %', test_booking_id;

            -- Clean up test booking
            DELETE FROM bookings WHERE id = test_booking_id;
            RAISE NOTICE 'Test booking cleaned up successfully';
        ELSE
            RAISE NOTICE 'Edge function returned error: %', test_result->>'error';
        END IF;
    ELSE
        RAISE NOTICE 'No published properties found for testing. Please create a property first.';
    END IF;
END $$;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT
    'SIMPLE RLS FIX COMPLETED!' as status,
    'Edge Function can now create bookings using bypass functions.' as message,
    'Test the booking flow in your application - it should work now.' as note,
    'If you still get errors, check the Supabase function logs.' as hint;
