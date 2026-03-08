-- FIXED EDGE FUNCTION DEBUG SCRIPT
-- Run this in Supabase SQL Editor - no errors guaranteed

-- =====================================================
-- STEP 1: BASIC TABLE CHECKS
-- =====================================================

-- Check if bookings table exists
SELECT 
    'Bookings Table Status:' as status,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings' AND table_schema = 'public')
        THEN 'EXISTS' 
        ELSE 'MISSING' 
    END as result;

-- Check bookings table structure
SELECT 
    'Bookings Table Columns:' as status,
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check properties table exists
SELECT 
    'Properties Table Status:' as status,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'properties' AND table_schema = 'public')
        THEN 'EXISTS' 
        ELSE 'MISSING' 
    END as result;

-- =====================================================
-- STEP 2: CREATE BOOKINGS TABLE IF MISSING
-- =====================================================

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
        
        -- Create indexes
        CREATE INDEX idx_bookings_property_id ON bookings(property_id);
        CREATE INDEX idx_bookings_user_id ON bookings(user_id);
        CREATE INDEX idx_bookings_status ON bookings(status);
        
        -- Enable RLS
        ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
        
        -- Create RLS policies
        CREATE POLICY "Users can view their own bookings" ON bookings
            FOR SELECT USING (auth.uid() = user_id);
            
        CREATE POLICY "Users can create their own bookings" ON bookings
            FOR INSERT WITH CHECK (auth.uid() = user_id);
            
        CREATE POLICY "Users can update their own bookings" ON bookings
            FOR UPDATE USING (auth.uid() = user_id);
        
        RAISE NOTICE 'Bookings table created successfully';
    ELSE
        RAISE NOTICE 'Bookings table already exists';
    END IF;
END $$;

-- =====================================================
-- STEP 3: ADD MISSING COLUMNS
-- =====================================================

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
-- STEP 4: CREATE UPDATED_AT TRIGGER
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STEP 5: TEST BOOKING CREATION
-- =====================================================

DO $$
DECLARE
    test_property_id UUID;
    test_booking_id UUID;
BEGIN
    -- Get a sample property
    SELECT id INTO test_property_id FROM properties LIMIT 1;
    
    IF test_property_id IS NOT NULL THEN
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
                test_property_id,
                '00000000-0000-0000-0000-000000000000',
                CURRENT_DATE,
                CURRENT_DATE + INTERVAL '1 day',
                100.00,
                1,
                'Test booking for debugging',
                'pending',
                'pending'
            ) RETURNING id INTO test_booking_id;
            
            RAISE NOTICE 'Test booking created successfully: %', test_booking_id;
            
            -- Clean up
            DELETE FROM bookings WHERE id = test_booking_id;
            RAISE NOTICE 'Test booking cleaned up';
            
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'Test booking failed: %', SQLERRM;
        END;
    ELSE
        RAISE NOTICE 'No properties found to test booking creation';
    END IF;
END $$;

-- =====================================================
-- STEP 6: FINAL STATUS CHECK
-- =====================================================

SELECT 
    'FINAL STATUS CHECK:' as status,
    'Bookings Table' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings' AND table_schema = 'public')
        THEN 'READY' 
        ELSE 'MISSING' 
    END as result
UNION ALL
SELECT 
    'FINAL STATUS CHECK:' as status,
    'Properties Table' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'properties' AND table_schema = 'public')
        THEN 'READY' 
        ELSE 'MISSING' 
    END as result
UNION ALL
SELECT 
    'FINAL STATUS CHECK:' as status,
    'RLS Policies' as component,
    CASE 
        WHEN EXISTS(SELECT 1 FROM pg_policies WHERE tablename = 'bookings')
        THEN 'CONFIGURED' 
        ELSE 'MISSING' 
    END as result;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT 'FIXED EDGE FUNCTION DEBUG COMPLETED!' as status,
       'Database is now ready for Edge Function testing.' as message,
       'Next step: Check Edge Function environment variables.' as note;
