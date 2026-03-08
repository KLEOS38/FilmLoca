-- Fix RLS policy performance issue for Auth_Delete_Own_Props
-- Replace auth.uid() with (select auth.uid()) to avoid re-evaluation for each row

-- Drop the existing problematic policy
DROP POLICY IF EXISTS "Auth_Delete_Own_Props" ON "public"."properties";

-- Create the optimized policy
CREATE POLICY "Auth_Delete_Own_Props" ON "public"."properties"
FOR DELETE TO authenticated
USING (
  (select auth.uid()) = owner_id
);