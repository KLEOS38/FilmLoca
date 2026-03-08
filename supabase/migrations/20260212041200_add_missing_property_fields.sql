-- Add missing property fields to ensure database schema matches application
-- Run this in Supabase SQL Editor if any fields are missing

-- Check and add missing columns one by one to avoid errors
DO $$
BEGIN
    -- Add has_office_space if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'has_office_space'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties ADD COLUMN has_office_space BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Added has_office_space column';
    END IF;

    -- Add rules if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'rules'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties ADD COLUMN rules TEXT;
        RAISE NOTICE 'Added rules column';
    END IF;

    -- Add max_guests if it doesn't exist (check for both possible names)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'max_guests'
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'number_of_rooms'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties ADD COLUMN max_guests INTEGER DEFAULT 10;
        RAISE NOTICE 'Added max_guests column';
    END IF;

    -- If number_of_rooms exists but max_guests doesn't, rename it
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'number_of_rooms'
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'max_guests'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties RENAME COLUMN number_of_rooms TO max_guests;
        RAISE NOTICE 'Renamed number_of_rooms to max_guests';
    END IF;

    -- Add country if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'country'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties ADD COLUMN country TEXT;
        RAISE NOTICE 'Added country column';
    END IF;

    -- Add state if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'state'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties ADD COLUMN state TEXT;
        RAISE NOTICE 'Added state column';
    END IF;

    -- Add city if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'city'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties ADD COLUMN city TEXT;
        RAISE NOTICE 'Added city column';
    END IF;

    -- Add neighborhood if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'neighborhood'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties ADD COLUMN neighborhood TEXT;
        RAISE NOTICE 'Added neighborhood column';
    END IF;

    -- Add zip_code if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'zip_code'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE properties ADD COLUMN zip_code TEXT;
        RAISE NOTICE 'Added zip_code column';
    END IF;

END $$;

-- Show current schema after updates
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND table_schema = 'public'
ORDER BY ordinal_position;
