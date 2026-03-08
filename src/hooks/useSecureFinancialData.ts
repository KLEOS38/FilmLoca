import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FinancialData {
  commission_amount: number;
  commission_rate: number;
  payment_id: string;
  payment_status: string;
}

export const useSecureFinancialData = (bookingId?: string) => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFinancialData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .rpc('get_secure_financial_data', { booking_uuid: id });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setFinancialData(data[0]);
      } else {
        setFinancialData(null);
      }
    } catch (err: any) {
      console.error('Error fetching financial data:', err);
      setError('Failed to load financial data');
      toast.error('Access denied or financial data unavailable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchFinancialData(bookingId);
    }
  }, [bookingId]);

  return {
    financialData,
    loading,
    error,
    refetch: () => bookingId && fetchFinancialData(bookingId)
  };
};