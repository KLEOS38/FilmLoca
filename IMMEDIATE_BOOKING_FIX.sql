-- =====================================================
-- IMMEDIATE BOOKING FIX - RUN THIS FIRST
-- =====================================================

-- Add missing columns that Edge Function needs
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS commission_amount DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS commission_rate DECIMAL(5,4) DEFAULT 0.0000,
ADD COLUMN IF NOT EXISTS is_test BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS payment_reference TEXT;

-- Verify columns were added
SELECT 
    column_name,
    data_type,
    column_default
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND table_schema = 'public'
AND column_name IN ('commission_amount', 'commission_rate', 'is_test', 'payment_reference')
ORDER BY column_name;
