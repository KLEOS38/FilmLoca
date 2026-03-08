-- FIX ST_MAKEPOINT ERROR - COMPREHENSIVE SOLUTION
-- Run this in Supabase SQL Editor to fix the database trigger issue

-- STEP 1: Check if PostGIS extension is installed
SELECT * FROM pg_extension WHERE extname = 'postgis';

-- STEP 2: Install PostGIS extension if not present
CREATE EXTENSION IF NOT EXISTS postgis;

-- STEP 3: Create the missing st_makepoint function
CREATE OR REPLACE FUNCTION st_makepoint(double precision, double precision)
RETURNS geometry AS $$
BEGIN
    -- Use ST_Point which is the standard PostGIS function
    RETURN ST_Point($1, $2, 4326); -- WGS84 coordinate system
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- STEP 4: Create a safer version that handles NULL values
CREATE OR REPLACE FUNCTION st_makepoint_safe(double precision, double precision)
RETURNS geometry AS $$
BEGIN
    -- Return NULL if coordinates are invalid
    IF $1 IS NULL OR $2 IS NULL THEN
        RETURN NULL;
    END IF;
    
    -- Validate coordinate ranges
    IF $1 < -180 OR $1 > 180 OR $2 < -90 OR $2 > 90 THEN
        RETURN NULL;
    END IF;
    
    RETURN ST_Point($1, $2, 4326);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- STEP 5: Check for existing triggers on properties table
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_timing,
    action_condition,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'properties' 
AND trigger_schema = 'public';

-- STEP 6: If there's a problematic trigger, disable it temporarily
-- Uncomment the following lines if you find a trigger causing issues:
-- DROP TRIGGER IF EXISTS geographic_update_trigger ON properties;
-- DROP TRIGGER IF EXISTS properties_geography_trigger ON properties;
-- DROP TRIGGER IF EXISTS set_location_point_trigger ON properties;

-- STEP 7: Create a safe trigger that handles geographic data properly
CREATE OR REPLACE FUNCTION safe_update_geography()
RETURNS TRIGGER AS $$
BEGIN
    -- Only update geography if location data is valid
    IF NEW.country IS NOT NULL AND NEW.city IS NOT NULL THEN
        -- Try to geocode, but don't fail if it doesn't work
        BEGIN
            -- This would be where geocoding logic goes
            -- For now, just skip geographic updates to avoid errors
            NULL;
        EXCEPTION
            WHEN OTHERS THEN
                -- Silently handle any geographic errors
                NULL;
        END;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- STEP 8: Create a safe trigger (only if needed)
-- DROP TRIGGER IF EXISTS safe_geography_trigger ON properties;
-- CREATE TRIGGER safe_geography_trigger
--     BEFORE INSERT OR UPDATE ON properties
--     FOR EACH ROW
--     EXECUTE FUNCTION safe_update_geography();

-- STEP 9: Test the function works
SELECT st_makepoint(0, 0) as test_point;
SELECT st_makepoint_safe(-74.0060, 40.7128) as nyc_point;

-- STEP 10: Verify the properties table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- STEP 11: Check for any geographic columns
SELECT 
    column_name, 
    data_type,
    udt_name
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND table_schema = 'public'
AND (data_type LIKE '%geometry%' OR data_type LIKE '%geography%' OR udt_name LIKE '%geometry%');

-- STEP 12: If there are geographic columns, make sure they're nullable
-- ALTER TABLE properties ALTER COLUMN geometry_column DROP NOT NULL;

-- STEP 13: Test a simple update to make sure it works
-- UPDATE properties SET title = title WHERE id = 'your-test-id';
