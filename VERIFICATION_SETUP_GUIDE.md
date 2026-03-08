# Property Verification Database Setup

## 🗄️ **Step 1: Run SQL Script**
Execute these commands in your Supabase SQL editor:

```sql
-- 1. Add verification columns to properties table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'not_verified' 
CHECK (verification_status IN ('not_verified', 'pending', 'verified', 'rejected'));

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS verification_notes TEXT;

-- 2. Create property_verifications table
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

-- 3. Create indexes
CREATE INDEX IF NOT EXISTS idx_property_verifications_property_id ON property_verifications(property_id);
CREATE INDEX IF NOT EXISTS idx_property_verifications_user_id ON property_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_property_verifications_status ON property_verifications(status);
CREATE INDEX IF NOT EXISTS idx_property_verifications_date ON property_verifications(preferred_date);

-- 4. Create trigger for updated_at
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

-- 5. Enable RLS
ALTER TABLE property_verifications ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Users can view their own verification requests
CREATE POLICY "Users can view own property verifications" ON property_verifications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own verification requests
CREATE POLICY "Users can create own property verifications" ON property_verifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own verification requests (notes only)
CREATE POLICY "Users can update own property verifications" ON property_verifications
  FOR UPDATE USING (auth.uid() = user_id);
```

## 🔧 **Step 2: Deploy Edge Function**
```bash
npx supabase functions deploy schedule-verification
```

## 🌐 **Step 3: Set Environment Variables**
In your Supabase dashboard, set these Edge Function secrets:

```
PAYSTACK_SECRET_KEY=sk_test_ff029298e7f7d62aeeb7a245f668e15b4be202e1
SUPABASE_URL=https://jwuakfowjxebtpcxcqyr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 🎯 **Step 4: Update Existing Properties**
Run this to update existing properties with verification status:

```sql
UPDATE properties 
SET 
  verification_status = 'not_verified',
  verification_notes = NULL,
  verified_at = NULL
WHERE verification_status IS NULL;
```

## ✅ **Verification System Features**

### **🏠 **Property Management Dashboard**
- **Verification Tab**: Centralized management
- **Overview**: All properties with verification status
- **Requests**: Track verification appointments
- **Schedule**: Book new verifications

### **🏠 **Property Detail Pages**
- **Header Button**: Quick verification access
- **Verification Section**: Full scheduling interface
- **Owner-Only**: Visible only to property owners

### **🔐 **Security & Access**
- **RLS Policies**: Users can only manage their own verifications
- **Authentication**: Proper user validation
- **Error Handling**: Comprehensive error management

### **📊 **Data Structure**
- **Properties Table**: verification_status, verified_at, verification_notes
- **Verifications Table**: Complete tracking of all requests
- **Status Tracking**: scheduled, completed, cancelled, rescheduled

## 🎮 **Testing**
1. **Go to Property Management** → Click "Verification" tab
2. **Schedule verification** for any property
3. **Check property detail page** → Verify button appears for owners
4. **Test video call link** generation

## 🚀 **Ready to Use**
After completing these steps, the verification system will be fully functional!
