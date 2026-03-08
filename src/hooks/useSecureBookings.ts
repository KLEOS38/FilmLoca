import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface SecureBooking {
  id: string;
  property_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  team_size: number;
  created_at: string;
  updated_at: string;
  notes: string | null;
  status: string;
  payment_status: string | null;
  // Financial data excluded for security
}

export const useSecureBookings = () => {
  const [bookings, setBookings] = useState<SecureBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBookings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Use the secure function for all bookings (handles both user and owner access)
      const { data: allBookings, error: bookingsError } = await supabase
        .rpc('get_secure_bookings_for_owners');

      if (bookingsError) {
        throw bookingsError;
      }

      setBookings(allBookings || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching secure bookings:', err);
      setError('Failed to load bookings');
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings
  };
};