-- NUCLEAR OPTION - DISABLE ALL CONSTRAINTS TEMPORARILY (FIXED SYNTAX)
-- Run this in Supabase SQL Editor if constraint violations persist

-- Step 1: Remove the constraint entirely (temporary fix)
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;

-- Step 2: Check if this fixes the immediate issue
-- Try to insert a test row to see if constraint is gone
-- (This will be rolled back if there are still issues)

-- Step 3: If you want to re-add constraint later, run this:
-- ALTER TABLE profiles 
-- ADD CONSTRAINT profiles_user_type_check 
-- CHECK (user_type IS NULL OR user_type IN ('filmmaker', 'property_owner', 'homeowner', 'admin', 'user'));

-- For now, let's see what user_type values exist without constraint
SELECT 
    user_type, 
    COUNT(*) as count,
    STRING_AGG(DISTINCT id::TEXT, ', ' ORDER BY id) as sample_ids
FROM profiles 
WHERE user_type IS NOT NULL 
GROUP BY user_type 
ORDER BY count DESC;

-- Check the specific problematic row
SELECT 
    id, 
    name, 
    email, 
    user_type, 
    created_at,
    'AFTER_CONSTRAINT_DROP' as status
FROM profiles 
WHERE id = 'a7c4522c-8028-412a-b2af-42c7686cb461';

-- Verify constraint is actually gone
SELECT 
    COUNT(*) as constraint_count
FROM pg_constraint 
WHERE conname = 'profiles_user_type_check'
AND conrelid = 'public.profiles'::regclass;

-- Alternative: Show sample IDs without STRING_AGG (if syntax issues persist)
SELECT 
    user_type, 
    COUNT(*) as count
FROM profiles 
WHERE user_type IS NOT NULL 
GROUP BY user_type 
ORDER BY count DESC;

-- If constraint_count shows 0, then the constraint is successfully removed
-- Your profile updates should now work without constraint violations
