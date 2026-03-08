-- Create property_verifications table
CREATE TABLE IF NOT EXISTS property_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_title TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  video_call_link TEXT,
  admin_notes TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_property_verifications_property_id ON property_verifications(property_id);
CREATE INDEX IF NOT EXISTS idx_property_verifications_user_id ON property_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_property_verifications_status ON property_verifications(status);
CREATE INDEX IF NOT EXISTS idx_property_verifications_date ON property_verifications(preferred_date);

-- Add verification_status to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'not_verified' 
CHECK (verification_status IN ('not_verified', 'pending', 'verified', 'rejected'));

-- Add verified_at timestamp to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;

-- Add verification_notes to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS verification_notes TEXT;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_property_verifications_updated_at 
  BEFORE UPDATE ON property_verifications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS policies for property_verifications
ALTER TABLE property_verifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own verification requests
CREATE POLICY "Users can view own property verifications" ON property_verifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own verification requests
CREATE POLICY "Users can create own property verifications" ON property_verifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own verification requests (notes only)
CREATE POLICY "Users can update own property verifications" ON property_verifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin policies (service role bypasses RLS)
-- Admin can view all verification requests
CREATE POLICY "Admin can view all property verifications" ON property_verifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Admin can update all verification requests
CREATE POLICY "Admin can update all property verifications" ON property_verifications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );
