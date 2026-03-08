import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MinimalProfile {
  id: string;
  name: string | null;
  phone: string | null;
  company_name: string | null;
  user_type: string;
}

export const useSecureProfile = (profileUserId?: string) => {
  const [profile, setProfile] = useState<MinimalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchMinimalProfile = async (userId: string) => {
    try {
      setLoading(true);
      
      // Use the secure function that implements data minimization
      const { data, error } = await supabase
        .rpc('get_minimal_profile_info', {
          profile_user_id: userId
        });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setProfile(data[0]);
      } else {
        setProfile(null);
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Error fetching minimal profile:', err);
      setError('Failed to load profile information');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileUserId && user) {
      fetchMinimalProfile(profileUserId);
    } else {
      setLoading(false);
    }
  }, [profileUserId, user]);

  return {
    profile,
    loading,
    error,
    refetch: () => profileUserId && fetchMinimalProfile(profileUserId)
  };
};