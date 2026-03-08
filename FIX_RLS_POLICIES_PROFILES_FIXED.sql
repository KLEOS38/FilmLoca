-- FIX RLS POLICIES FOR PERSONAL INFORMATION UPDATES
-- Run this in Supabase SQL Editor to fix personal information update errors

-- Drop existing function with CASCADE to handle dependent policies
DROP FUNCTION IF EXISTS get_auth_uid() CASCADE;

-- Drop existing policies that might be blocking updates
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Drop any remaining referral policies that depend on get_auth_uid
DROP POLICY IF EXISTS "referrals_select" ON referrals;
DROP POLICY IF EXISTS "referrals_insert" ON referrals;
DROP POLICY IF EXISTS "referrals_update" ON referrals;
DROP POLICY IF EXISTS "referrals_delete" ON referrals;
DROP POLICY IF EXISTS "profiles_owner_fixed" ON profiles;

-- Create new RLS policies for profiles table
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create function to get auth UID if it doesn't exist
CREATE OR REPLACE FUNCTION get_auth_uid()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT auth.uid()::TEXT;
$$;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION get_auth_uid() TO authenticated;
GRANT EXECUTE ON FUNCTION get_auth_uid() TO service_role;

-- Add missing bank_name column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND table_schema = 'public' 
        AND column_name = 'bank_name'
    ) THEN
        ALTER TABLE profiles ADD COLUMN bank_name TEXT;
        RAISE NOTICE 'Added bank_name column to profiles table';
    ELSE
        RAISE NOTICE 'bank_name column already exists in profiles table';
    END IF;
END $$;

-- Verify policies are working
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;
