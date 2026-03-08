import { useState } from 'react';
import PropertyVerification from '@/components/property/PropertyVerification';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface VerificationAppointment {
  propertyId: string;
  propertyTitle: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export default function usePropertyVerification() {
  const [isLoading, setIsLoading] = useState(false);

  const scheduleVerification = async (appointmentData: VerificationAppointment) => {
    setIsLoading(true);
    
    try {
      console.log('🚀 Starting verification scheduling:', appointmentData);
      
      const { data, error } = await supabase.functions.invoke('schedule-verification', {
        body: appointmentData,
      });

      console.log('📦 Edge function response:', { data, error });

      if (error) {
        console.error('❌ Edge function error:', error);
        throw new Error(error.message || 'Failed to schedule verification');
      }

      if (!data?.success) {
        console.error('❌ Edge function returned error:', data);
        throw new Error(data?.error || 'Failed to schedule verification');
      }

      console.log('✅ Verification scheduled successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ Verification scheduling error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    scheduleVerification,
    isLoading,
  };
}
