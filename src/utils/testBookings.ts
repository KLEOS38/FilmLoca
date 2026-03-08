import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TestBookingInput {
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  teamSize: number;
  notes?: string;
}

export const createTestBooking = async (input: TestBookingInput) => {
  try {
    const now = new Date().toISOString();
    const testBooking = {
      id: `test-booking-${Date.now()}`,
      property_id: input.propertyId,
      user_id: input.userId,
      start_date: input.startDate,
      end_date: input.endDate,
      total_price: input.totalAmount,
      team_size: input.teamSize,
      status: 'confirmed',
      payment_status: 'paid',
      payment_reference: `test-ref-${Math.random().toString(36).substring(2, 11)}`,
      notes: input.notes || 'Test booking',
      is_test: true,
      created_at: now,
      updated_at: now
    };

    // Use the 'bookings' table with a test flag
    const { data, error } = await supabase
      .from('bookings')
      .insert([testBooking])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating test booking:', error);
      throw new Error('Failed to create test booking');
    }

    console.log('✅ Test booking created:', data);
    return data;
  } catch (error) {
    console.error('❌ Error in createTestBooking:', error);
    toast.error('Failed to create test booking');
    throw error;
  }
};

export const getTestBookings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .eq('is_test', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('❌ Error fetching test bookings:', error);
    throw error;
  }
};
