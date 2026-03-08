-- FIX PROFILES USER_TYPE_CHECK CONSTRAINT ERROR - EMERGENCY FIX
-- Run this in Supabase SQL Editor to completely resolve the constraint violation

-- EMERGENCY APPROACH: Remove all constraints temporarily, then add them back

-- Step 1: Drop the problematic constraint entirely
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;

-- Step 2: Check if there are any other constraints on user_type
SELECT conname, contype 
FROM pg_constraint 
WHERE conrelid = 'public.profiles'::regclass 
AND conname LIKE '%user_type%';

-- Step 3: Find all rows that might have problematic user_type values
SELECT id, name, email, user_type, created_at
FROM profiles 
WHERE user_type IS NOT NULL 
AND user_type NOT IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user', null)
LIMIT 20;

-- Step 4: Update any remaining problematic values to 'filmmaker' (safe default)
UPDATE profiles 
SET user_type = 'filmmaker' 
WHERE user_type IS NOT NULL 
AND user_type NOT IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user');

-- Step 5: Verify no problematic values remain
SELECT COUNT(*) as problematic_count
FROM profiles 
WHERE user_type IS NOT NULL 
AND user_type NOT IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user');

-- Step 6: Add back a very permissive constraint
ALTER TABLE profiles 
ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IS NULL OR user_type IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user'));

-- Step 7: Verify the specific problematic row now passes
SELECT id, name, email, user_type, created_at,
       CASE 
         WHEN user_type IS NULL THEN 'NULL_PASS'
         WHEN user_type IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user') THEN 'PASS' 
         ELSE 'FAIL' 
       END as constraint_check
FROM profiles 
WHERE id = 'a7c4522c-8028-412a-b2af-42c7686cb461';

-- Step 8: Show final user_type distribution
SELECT user_type, COUNT(*) as count 
FROM profiles 
WHERE user_type IS NOT NULL 
GROUP BY user_type 
ORDER BY count DESC;

-- Step 9: Verify constraint was created successfully
SELECT 
    conname,
    contype,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conname = 'profiles_user_type_check'
AND conrelid = 'public.profiles'::regclass;
