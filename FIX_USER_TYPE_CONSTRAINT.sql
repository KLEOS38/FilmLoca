-- FIX PROFILES USER_TYPE_CHECK CONSTRAINT ERROR
-- Run this in Supabase SQL Editor to fix the check constraint violation

-- First, let's see what the current constraint looks like
SELECT 
    conname,
    contype,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conname = 'profiles_user_type_check'
AND conrelid = 'public.profiles'::regclass;

-- Check what user_type values currently exist in the profiles table
SELECT DISTINCT user_type, COUNT(*) as count 
FROM profiles 
WHERE user_type IS NOT NULL 
GROUP BY user_type;

-- Drop the existing check constraint that's causing issues
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;

-- Add a more flexible check constraint for user_type
ALTER TABLE profiles 
ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IN ('filmmaker', 'property_owner', 'admin', 'user'));

-- Or if you want to allow any string value, use this instead:
-- ALTER TABLE profiles 
-- ADD CONSTRAINT profiles_user_type_check 
-- CHECK (user_type IS NULL OR user_type IS NOT NULL);

-- Verify the constraint was added correctly
SELECT 
    conname,
    contype,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conname = 'profiles_user_type_check'
AND conrelid = 'public.profiles'::regclass;
