-- Check if email exists in auth.users or profiles table
CREATE OR REPLACE FUNCTION check_email_exists(email_to_check TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    email_exists BOOLEAN := FALSE;
BEGIN
    -- Check auth.users table first (most reliable)
    BEGIN
        SELECT EXISTS(
            SELECT 1 FROM auth.users 
            WHERE email = LOWER(TRIM(email_to_check))
        ) INTO email_exists;
    EXCEPTION WHEN OTHERS THEN
        -- If auth.users is not accessible, try profiles table
        SELECT EXISTS(
            SELECT 1 FROM profiles 
            WHERE email = LOWER(TRIM(email_to_check))
        ) INTO email_exists;
    END;
    
    RETURN email_exists;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION check_email_exists TO authenticated;
GRANT EXECUTE ON FUNCTION check_email_exists TO anon;
