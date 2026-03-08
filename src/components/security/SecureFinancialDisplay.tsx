import React from 'react';
import { useSecureFinancialData } from '@/hooks/useSecureFinancialData';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface SecureFinancialDisplayProps {
  bookingId: string;
  children: (data: any) => React.ReactNode;
  fallback?: React.ReactNode;
}

export const SecureFinancialDisplay: React.FC<SecureFinancialDisplayProps> = ({
  bookingId,
  children,
  fallback
}) => {
  const { financialData, loading, error } = useSecureFinancialData(bookingId);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  if (error || !financialData) {
    return fallback || (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Financial data is protected and only available to authorized users.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children(financialData)}</>;
};