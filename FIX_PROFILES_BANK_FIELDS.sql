-- FIX PROFILES TABLE - ADD MISSING BANK ACCOUNT FIELDS
-- Run this in Supabase SQL Editor to fix payment settings error

-- First check if bank_name column exists
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

-- Check if bank_account_name column exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND table_schema = 'public' 
        AND column_name = 'bank_account_name'
    ) THEN
        ALTER TABLE profiles ADD COLUMN bank_account_name TEXT;
        RAISE NOTICE 'Added bank_account_name column to profiles table';
    ELSE
        RAISE NOTICE 'bank_account_name column already exists in profiles table';
    END IF;
END $$;

-- Check if bank_code column exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND table_schema = 'public' 
        AND column_name = 'bank_code'
    ) THEN
        ALTER TABLE profiles ADD COLUMN bank_code TEXT;
        RAISE NOTICE 'Added bank_code column to profiles table';
    ELSE
        RAISE NOTICE 'bank_code column already exists in profiles table';
    END IF;
END $$;

-- Check if bank_account_number column exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND table_schema = 'public' 
        AND column_name = 'bank_account_number'
    ) THEN
        ALTER TABLE profiles ADD COLUMN bank_account_number TEXT;
        RAISE NOTICE 'Added bank_account_number column to profiles table';
    ELSE
        RAISE NOTICE 'bank_account_number column already exists in profiles table';
    END IF;
END $$;

-- Verify columns were added
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public' 
AND column_name IN ('bank_name', 'bank_account_name', 'bank_code', 'bank_account_number')
ORDER BY column_name;
