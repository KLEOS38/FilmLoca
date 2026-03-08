
import { useState } from 'react';
import { toast } from 'sonner';
import { requireAuth } from '@/lib/auth-guard';

interface UseSecureOperationOptions {
  requireAuthentication?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useSecureOperation = (options: UseSecureOperationOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (operation: () => Promise<any>) => {
    setIsLoading(true);
    setError(null);

    try {
      if (options.requireAuthentication && !(await requireAuth())) {
        return;
      }

      const result = await operation();
      
      if (options.onSuccess) {
        options.onSuccess();
      }
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      
      // Don't show sensitive error details to users
      if (!errorMessage.includes('permission') && !errorMessage.includes('access')) {
        toast.error('Operation failed. Please try again.');
      }
      
      if (options.onError) {
        options.onError(err);
      }
      
      console.error('Secure operation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
};
