-- BOOKING ERROR DIAGNOSIS SCRIPT
-- Run this in Supabase SQL Editor to diagnose booking-related issues

-- =====================================================
-- STEP 1: CHECK BOOKINGS TABLE STRUCTURE
-- =====================================================
SELECT 
    'Bookings Table Structure:' as info,
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- =====================================================
-- STEP 2: CHECK RECENT BOOKING ERRORS
-- =====================================================
-- Check recent bookings that might have failed
SELECT 
    'Recent Bookings (Last 10):' as info,
    id,
    property_id,
    user_id,
    start_date,
    end_date,
    total_price,
    status,
    payment_status,
    created_at,
    updated_at
FROM bookings 
ORDER BY created_at DESC 
LIMIT 10;

-- =====================================================
-- STEP 3: CHECK FOR MISSING REQUIRED FIELDS
-- =====================================================
-- Check if bookings table has all required fields
SELECT 
    column_name,
    CASE 
        WHEN column_name IN ('id', 'property_id', 'user_id', 'start_date', 'end_date', 'total_price', 'status', 'payment_status') 
        THEN 'REQUIRED'
        ELSE 'OPTIONAL'
    END as importance,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND table_schema = 'public'
ORDER BY 
    CASE 
        WHEN column_name IN ('id', 'property_id', 'user_id', 'start_date', 'end_date', 'total_price', 'status', 'payment_status') 
        THEN 1 
        ELSE 2 
    END,
    column_name;

-- =====================================================
-- STEP 4: CHECK PROPERTIES TABLE FOR BOOKING COMPATIBILITY
-- =====================================================
-- Check if properties table has required fields for booking
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND table_schema = 'public'
AND column_name IN ('id', 'title', 'price')
ORDER BY column_name;

-- =====================================================
-- STEP 5: CHECK RLS POLICIES ON BOOKINGS TABLE
-- =====================================================
-- Check Row Level Security policies that might block booking creation
SELECT 
    'RLS Policies on Bookings:' as info,
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
-- STEP 6: CHECK USER AUTHENTICATION SETUP
-- =====================================================
-- Check if users table exists and has required fields
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
ORDER BY column_name;

-- =====================================================
-- STEP 7: CREATE MISSING BOOKINGS TABLE IF NEEDED
-- =====================================================
-- Create bookings table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'bookings' 
        AND table_schema = 'public'
    ) THEN
        CREATE TABLE bookings (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
            user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            total_price DECIMAL(10,2) NOT NULL CHECK (total_price > 0),
            team_size INTEGER NOT NULL CHECK (team_size > 0),
            notes TEXT,
            status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
            payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
            payment_id TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create indexes for better performance
        CREATE INDEX idx_bookings_property_id ON bookings(property_id);
        CREATE INDEX idx_bookings_user_id ON bookings(user_id);
        CREATE INDEX idx_bookings_status ON bookings(status);
        CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
        
        -- Enable RLS
        ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
        
        -- Create RLS policies
        CREATE POLICY "Users can view their own bookings" ON bookings
            FOR SELECT USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can create their own bookings" ON bookings
            FOR INSERT WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can update their own bookings" ON bookings
            FOR UPDATE USING (auth.uid() = user_id);
            
        CREATE POLICY "Property owners can view bookings for their properties" ON bookings
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM properties 
                    WHERE properties.id = bookings.property_id 
                    AND properties.owner_id = auth.uid()
                )
            );
        
        RAISE NOTICE 'Bookings table created successfully';
    ELSE
        RAISE NOTICE 'Bookings table already exists';
    END IF;
END $$;

-- =====================================================
-- STEP 8: ADD MISSING COLUMNS IF NEEDED
-- =====================================================
-- Add missing columns to bookings table
DO $$
BEGIN
    -- Add payment_id column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' 
        AND column_name = 'payment_id'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE bookings ADD COLUMN payment_id TEXT;
        RAISE NOTICE 'Added payment_id column';
    END IF;
    
    -- Add team_size column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' 
        AND column_name = 'team_size'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE bookings ADD COLUMN team_size INTEGER NOT NULL DEFAULT 1;
        RAISE NOTICE 'Added team_size column';
    END IF;
    
    -- Add notes column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' 
        AND column_name = 'notes'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE bookings ADD COLUMN notes TEXT;
        RAISE NOTICE 'Added notes column';
    END IF;
    
    -- Add updated_at column if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' 
        AND column_name = 'updated_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE bookings ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
        RAISE NOTICE 'Added updated_at column';
    END IF;
END $$;

-- =====================================================
-- STEP 9: CREATE OR UPDATE TRIGGER FOR UPDATED_AT
-- =====================================================
-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;

-- Create new trigger
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STEP 10: TEST BOOKING CREATION
-- =====================================================
-- Test creating a sample booking (this will help identify issues)
DO $$
DECLARE
    test_user_id UUID := '00000000-0000-0000-0000-000000000000'; -- Test user ID
    test_property_id UUID;
    test_booking_id UUID;
BEGIN
    -- Get a sample property ID
    SELECT id INTO test_property_id FROM properties LIMIT 1;
    
    IF test_property_id IS NOT NULL THEN
        -- Try to create a test booking
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
            'Test booking for debugging',
            'pending',
            'pending'
        ) RETURNING id INTO test_booking_id;
        
        RAISE NOTICE 'Test booking created with ID: %', test_booking_id;
        
        -- Clean up test booking
        DELETE FROM bookings WHERE id = test_booking_id;
        RAISE NOTICE 'Test booking cleaned up';
        
    ELSE
        RAISE NOTICE 'No properties found to test booking creation';
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Test booking creation failed: %', SQLERRM;
END $$;

-- =====================================================
-- STEP 11: FINAL STATUS CHECK
-- =====================================================
SELECT 
    'BOOKING SYSTEM STATUS:' as status,
    'Bookings Table' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings' AND table_schema = 'public')
        THEN 'EXISTS' 
        ELSE 'MISSING' 
    END as status_value
UNION ALL
SELECT 
    'BOOKING SYSTEM STATUS:' as status,
    'Required Columns' as component,
    CASE 
        WHEN EXISTS(
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'bookings' 
            AND table_schema = 'public'
            AND column_name IN ('id', 'property_id', 'user_id', 'start_date', 'end_date', 'total_price', 'status', 'payment_status')
            GROUP BY column_name
            HAVING COUNT(*) = 8
        )
        THEN 'COMPLETE' 
        ELSE 'INCOMPLETE' 
    END as status_value
UNION ALL
SELECT 
    'BOOKING SYSTEM STATUS:' as status,
    'RLS Policies' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM pg_policies WHERE tablename = 'bookings')
        THEN 'CONFIGURED' 
        ELSE 'MISSING' 
    END as status_value
UNION ALL
SELECT 
    'BOOKING SYSTEM STATUS:' as status,
    'Properties Table' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'properties' AND table_schema = 'public')
        THEN 'EXISTS' 
        ELSE 'MISSING' 
    END as status_value;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
SELECT 'BOOKING ERROR DIAGNOSIS COMPLETED!' as status,
       'Check the results above for any issues.' as message,
       'If all components show EXISTS/COMPLETE/CONFIGURED, the database is ready.' as note;
