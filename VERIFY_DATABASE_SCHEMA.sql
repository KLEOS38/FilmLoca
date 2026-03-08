-- DATABASE SCHEMA VERIFICATION SCRIPT
-- Run this in Supabase SQL Editor to verify your database has all required fields

-- Check current properties table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Required fields that should exist:
-- ✅ id (uuid/text)
-- ✅ title (text)
-- ✅ property_type (text)
-- ✅ address (text)
-- ✅ description (text)
-- ✅ price (numeric/decimal)
-- ✅ price_type (text)
-- ✅ country (text)
-- ✅ state (text)
-- ✅ city (text)
-- ✅ neighborhood (text)
-- ✅ max_guests (integer)
-- ✅ damage_deposit (numeric/decimal)
-- ✅ owner_id (uuid/text)
-- ✅ is_verified (boolean)
-- ✅ is_published (boolean)
-- ✅ is_featured (boolean)
-- ✅ zip_code (text)
-- ✅ has_office_space (boolean)
-- ✅ rules (text)
-- ✅ created_at (timestamp)
-- ✅ updated_at (timestamp)

-- If any fields are missing, run the migration script:
-- supabase/migrations/20260212041200_add_missing_property_fields.sql
