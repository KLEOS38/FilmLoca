-- Add refund-related fields to bookings table
-- This migration supports the new cancellation policy with automatic refund calculations

ALTER TABLE bookings 
ADD COLUMN refund_amount DECIMAL(10, 2),
ADD COLUMN refund_percentage INTEGER,
ADD COLUMN processing_fee DECIMAL(10, 2),
ADD COLUMN cancellation_reason TEXT,
ADD COLUMN cancellation_documentation JSONB,
ADD COLUMN refund_processed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN refund_method VARCHAR(50),
ADD COLUMN refund_transaction_id VARCHAR(255);

-- Add comments to explain the new fields
COMMENT ON COLUMN bookings.refund_amount IS 'The amount to be refunded to the customer';
COMMENT ON COLUMN bookings.refund_percentage IS 'The percentage of the total price that will be refunded';
COMMENT ON COLUMN bookings.processing_fee IS 'The processing fee deducted from the refund';
COMMENT ON COLUMN bookings.cancellation_reason IS 'The reason provided by the user for cancellation';
COMMENT ON COLUMN bookings.cancellation_documentation IS 'Documentation uploaded for industry exceptions (weather alerts, medical notes, etc.)';
COMMENT ON COLUMN bookings.refund_processed_at IS 'Timestamp when the refund was actually processed';
COMMENT ON COLUMN bookings.refund_method IS 'The method used for refund (original_payment, bank_transfer, etc.)';
COMMENT ON COLUMN bookings.refund_transaction_id IS 'The transaction ID for the refund processing';

-- Create an index for faster queries on refund status
CREATE INDEX idx_bookings_refund_status ON bookings(payment_status) WHERE payment_status = 'refund_pending';

-- Create a trigger to automatically calculate refund amounts when status changes to cancelled
CREATE OR REPLACE FUNCTION calculate_refund_on_cancellation()
RETURNS TRIGGER AS $$
BEGIN
    -- Only calculate refund when booking is being cancelled
    IF OLD.status != 'cancelled' AND NEW.status = 'cancelled' THEN
        -- Calculate hours until start
        DECLARE
            hours_until_start INTEGER;
            refund_percentage INTEGER;
            processing_fee DECIMAL(10, 2);
        BEGIN
            hours_until_start := EXTRACT(EPOCH FROM (NEW.start_date - NOW())) / 3600;
            
            -- Apply FilmLoca cancellation policy
            IF hours_until_start >= 72 THEN
                -- 72+ hours: 85% refund (15% processing fee)
                refund_percentage := 85;
                processing_fee := NEW.total_price * 0.15;
            ELSIF hours_until_start >= 24 THEN
                -- 24-72 hours: 50% refund
                refund_percentage := 50;
                processing_fee := 0;
            ELSE
                -- Less than 24 hours: No refund
                refund_percentage := 0;
                processing_fee := 0;
            END IF;
            
            -- Set the refund fields
            NEW.refund_amount := NEW.total_price * refund_percentage / 100;
            NEW.refund_percentage := refund_percentage;
            NEW.processing_fee := processing_fee;
            NEW.payment_status := 'refund_pending';
        END;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_calculate_refund_on_cancellation ON bookings;
CREATE TRIGGER trigger_calculate_refund_on_cancellation
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION calculate_refund_on_cancellation();

-- Create a function to handle industry exception refunds
CREATE OR REPLACE FUNCTION process_industry_exception_refund(
    booking_id UUID,
    exception_type TEXT,
    documentation JSONB DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE bookings 
    SET 
        refund_amount = total_price * 0.85, -- 85% refund for industry exceptions
        refund_percentage = 85,
        processing_fee = total_price * 0.15,
        cancellation_reason = 'Industry exception: ' || exception_type,
        cancellation_documentation = documentation,
        payment_status = 'refund_pending',
        updated_at = NOW()
    WHERE id = booking_id AND status = 'cancelled';
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Create a view for easy refund reporting
CREATE OR REPLACE VIEW refund_report AS
SELECT 
    b.id,
    b.property_id,
    b.user_id,
    b.total_price,
    b.refund_amount,
    b.refund_percentage,
    b.processing_fee,
    b.status,
    b.payment_status,
    b.start_date,
    b.created_at,
    b.updated_at,
    b.cancellation_reason,
    p.title as property_title,
    u.email as user_email
FROM bookings b
LEFT JOIN properties p ON b.property_id = p.id
LEFT JOIN auth.users u ON b.user_id = u.id
WHERE b.status = 'cancelled' OR b.payment_status = 'refund_pending';

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION process_industry_exception_refund TO authenticated;
GRANT SELECT ON refund_report TO authenticated;
