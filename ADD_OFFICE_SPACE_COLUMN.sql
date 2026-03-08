-- Add has_office_space column to properties table if it doesn't exist
-- This fixes the Office Space feature not working

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

-- Update existing properties to have default value
UPDATE properties 
SET has_office_space = FALSE 
WHERE has_office_space IS NULL;

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND column_name = 'has_office_space' 
AND table_schema = 'public';
