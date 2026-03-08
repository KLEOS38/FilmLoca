-- Verify messages table exists and check its structure
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'messages' 
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'messages';

-- List existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'messages';

-- Check if indexes exist
SELECT indexname, tablename, indexdef 
FROM pg_indexes 
WHERE tablename = 'messages';

-- Test if we can query the table (should return 0 rows if no messages yet)
SELECT COUNT(*) as message_count FROM messages;
