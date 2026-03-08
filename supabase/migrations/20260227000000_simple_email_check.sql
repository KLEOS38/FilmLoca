-- Create a simple, reliable function to check if email exists
-- This checks both auth.users and profiles tables for complete coverage
CREATE OR REPLACE FUNCTION check_email_exists_simple(email_to_check TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  -- Check if email exists in either auth.users or profiles table
  SELECT EXISTS(
    SELECT 1 FROM (
      SELECT email FROM auth.users WHERE email = LOWER(TRIM(email_to_check))
      UNION ALL
      SELECT email FROM profiles WHERE email = LOWER(TRIM(email_to_check))
    ) combined_emails
    WHERE email IS NOT NULL
  );
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION check_email_exists_simple TO authenticated;
GRANT EXECUTE ON FUNCTION check_email_exists_simple TO anon;
