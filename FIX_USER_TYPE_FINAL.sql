-- FIX PROFILES USER_TYPE_CHECK CONSTRAINT ERROR - FINAL FIX
-- Run this in Supabase SQL Editor to fix the specific constraint violation

-- The error shows: property_owner is being rejected by the constraint
-- This means the constraint doesn't include 'property_owner' in the allowed values

-- First, let's see what the current constraint actually allows
SELECT 
    conname,
    contype,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conname = 'profiles_user_type_check'
AND conrelid = 'public.profiles'::regclass;

-- Check the specific failing row
SELECT id, name, email, user_type, created_at
FROM profiles 
WHERE id = 'a7c4522c-8028-412a-b2af-42c7686cb461';

-- Drop the restrictive constraint that's causing the violation
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;

-- Add a comprehensive constraint that includes ALL needed values
ALTER TABLE profiles 
ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user'));

-- Alternative: If you want to be more permissive, use this:
-- ALTER TABLE profiles 
-- ADD CONSTRAINT profiles_user_type_check 
-- CHECK (user_type IS NULL OR user_type IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user'));

-- Verify the constraint was added correctly
SELECT 
    conname,
    contype,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conname = 'profiles_user_type_check'
AND conrelid = 'public.profiles'::regclass;

-- Verify the specific row now passes the constraint
SELECT id, name, email, user_type, created_at,
       CASE 
         WHEN user_type IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user') 
         THEN 'PASS' 
         ELSE 'FAIL' 
       END as constraint_check
FROM profiles 
WHERE id = 'a7c4522c-8028-412a-b2af-42c7686cb461';

-- Show all user_type values to confirm everything is covered
SELECT user_type, COUNT(*) as count 
FROM profiles 
WHERE user_type IS NOT NULL 
GROUP BY user_type 
ORDER BY count DESC;
