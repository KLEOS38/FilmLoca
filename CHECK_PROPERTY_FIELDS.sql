-- CHECK EXACT PROPERTY FIELDS
-- Run this to see what fields your properties table actually has

SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- COMPARE WITH WHAT THE APP SENDS:
-- The app sends these fields (user-provided only):
-- ✅ title (text)
-- ✅ property_type (text) 
-- ✅ address (text)
-- ✅ description (text)
-- ✅ price (numeric)
-- ✅ price_type (text)
-- ✅ country (text)
-- ✅ state (text)
-- ✅ city (text)
-- ✅ neighborhood (text)
-- ✅ max_guests (integer)
-- ✅ damage_deposit (numeric)
-- ✅ owner_id (uuid)
-- ✅ is_verified (boolean)
-- ✅ is_published (boolean)
-- ✅ is_featured (boolean)
-- ✅ zip_code (text)
-- ✅ has_office_space (boolean)
-- ✅ rules (text)

-- AUTO-GENERATED FIELDS (don't send these):
-- ❌ id (auto-generated)
-- ❌ created_at (auto-generated)
-- ❌ updated_at (auto-generated)

-- If you're missing any fields from the list above, add them with:
-- ALTER TABLE properties ADD COLUMN field_name DATA_TYPE;
