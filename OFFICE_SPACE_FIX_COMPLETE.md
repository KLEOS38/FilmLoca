-- OFFICE SPACE FIX SUMMARY
-- This file contains all the fixes for the Office Space feature issue

-- STEP 1: Run this SQL to add the missing column
-- Copy and paste this into your Supabase SQL editor:

DO $$ 
BEGIN
    -- Check if column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name = 'has_office_space' 
        AND table_schema = 'public'
    ) THEN
        -- Add the column
        ALTER TABLE properties 
        ADD COLUMN has_office_space BOOLEAN DEFAULT FALSE;
        
        -- Add comment
        COMMENT ON COLUMN properties.has_office_space IS 'Whether the property has dedicated office space';
        
        RAISE NOTICE 'has_office_space column added to properties table';
    ELSE
        RAISE NOTICE 'has_office_space column already exists in properties table';
    END IF;
END $$;

-- STEP 2: Update existing properties to have default value
UPDATE properties 
SET has_office_space = FALSE 
WHERE has_office_space IS NULL;

-- STEP 3: Verify the column was added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND column_name = 'has_office_space' 
AND table_schema = 'public';

-- STEP 4: Test the column works
SELECT id, title, has_office_space 
FROM properties 
LIMIT 5;

-- CODE CHANGES MADE:
-- 1. Created fixOfficeSpace.ts utility with workaround functions
-- 2. Updated ListPropertyPage.tsx to use workaround for saving
-- 3. Updated EditPropertyPage.tsx to use workaround for loading
-- 4. Updated LocationCard.tsx to display Office Space from rules field
-- 5. Added Office Space badge display in property cards

-- TEMPORARY WORKAROUND:
-- Office Space data is stored in the 'rules' field as "OFFICE_SPACE:true|timestamp"
-- This allows the feature to work immediately without database migration
-- Once you run the SQL above, the system will automatically use the real field

-- HOW IT WORKS:
-- - Listing: Saves OFFICE_SPACE tag to rules field
-- - Editing: Extracts OFFICE_SPACE from rules field
-- - Display: Shows Office Space badge when tag is found in rules
-- - Cards: Display Office Space badge when tag is found in rules
