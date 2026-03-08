-- Add rules field to properties table
-- Run this in Supabase SQL Editor to add house rules functionality

ALTER TABLE properties ADD COLUMN rules TEXT;

-- Verify the field was added
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND column_name = 'rules'
AND table_schema = 'public';

-- Test the field by inserting a sample (optional)
-- INSERT INTO properties (title, description, price, rules) 
-- VALUES ('Test Property', 'Test Description', 100, 'No smoking allowed');
