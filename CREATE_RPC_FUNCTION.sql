-- Create RPC function to get user verification requests
CREATE OR REPLACE FUNCTION get_user_verification_requests()
RETURNS TABLE (
  id UUID,
  property_id UUID,
  property_title TEXT,
  preferred_date DATE,
  preferred_time TIME,
  notes TEXT,
  status TEXT,
  video_call_link TEXT,
  admin_notes TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pv.id,
    pv.property_id,
    pv.property_title,
    pv.preferred_date,
    pv.preferred_time,
    pv.notes,
    pv.status,
    pv.video_call_link,
    pv.admin_notes,
    pv.scheduled_at,
    pv.completed_at,
    pv.created_at,
    pv.updated_at
  FROM property_verifications pv
  WHERE pv.user_id = auth.uid()
  ORDER BY pv.created_at DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_verification_requests() TO authenticated;
