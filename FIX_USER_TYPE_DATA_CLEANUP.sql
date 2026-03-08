-- FIX PROFILES USER_TYPE_CHECK CONSTRAINT ERROR - DATA CLEANUP
-- Run this in Supabase SQL Editor to fix existing data that violates the constraint

-- First, let's see what the current constraint looks like
SELECT 
    conname,
    contype,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conname = 'profiles_user_type_check'
AND conrelid = 'public.profiles'::regclass;

-- Check what user_type values currently exist in the profiles table (including problematic ones)
SELECT 
    user_type, 
    COUNT(*) as count,
    id as sample_id
FROM profiles 
WHERE user_type IS NOT NULL 
GROUP BY user_type, id
ORDER BY user_type;

-- Find all rows that would violate the common constraint
SELECT id, user_type, created_at
FROM profiles 
WHERE user_type IS NOT NULL 
AND user_type NOT IN ('filmmaker', 'property_owner', 'admin', 'user')
LIMIT 10;

-- Update problematic user_type values to valid ones
-- First, update any 'homeowner' to 'property_owner' (common mapping issue)
UPDATE profiles 
SET user_type = 'property_owner' 
WHERE user_type = 'homeowner';

-- Update any other invalid values to 'filmmaker' (default fallback)
UPDATE profiles 
SET user_type = 'filmmaker' 
WHERE user_type IS NOT NULL 
AND user_type NOT IN ('filmmaker', 'property_owner', 'admin', 'user');

-- Now drop the existing check constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;

-- Add the corrected check constraint for user_type
ALTER TABLE profiles 
ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IN ('filmmaker', 'property_owner', 'admin', 'user'));

-- Verify no more violations exist
SELECT COUNT(*) as violation_count
FROM profiles 
WHERE user_type IS NOT NULL 
AND user_type NOT IN ('filmmaker', 'property_owner', 'admin', 'user');

-- Show final user_type distribution
SELECT user_type, COUNT(*) as count 
FROM profiles 
WHERE user_type IS NOT NULL 
GROUP BY user_type 
ORDER BY count DESC;

-- Verify the constraint was added correctly
SELECT 
    conname,
    contype,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conname = 'profiles_user_type_check'
AND conrelid = 'public.profiles'::regclass;
