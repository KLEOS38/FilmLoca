import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  CreditCard, 
  Calendar,
  RefreshCw
} from 'lucide-react';
import { format, differenceInHours, differenceInDays } from 'date-fns';

interface PaymentStatusCardProps {
  bookingId: string;
  className?: string;
}

interface PaymentStatus {
  id: string;
  host_amount: number;
  platform_amount: number;
  transfer_status: string;
  transfer_scheduled_date: string | null;
  transfer_completed_date: string | null;
  transfer_reference: string | null;
  transfer_error: string | null;
  created_at: string;
  start_date: string;
  end_date: string;
}

const PaymentStatusCard = ({ bookingId, className }: PaymentStatusCardProps) => {
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentStatus();
  }, [bookingId]);

  const fetchPaymentStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          host_amount,
          platform_amount,
          transfer_status,
          transfer_scheduled_date,
          transfer_completed_date,
          transfer_reference,
          transfer_error,
          created_at,
          start_date,
          end_date
        `)
        .eq('id', bookingId)
        .single();

      if (error) throw error;
      setPaymentStatus(data);
    } catch (error) {
      console.error('Error fetching payment status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4" />;
      case 'pending_bank_details':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending_bank_details':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Transferred';
      case 'failed':
        return 'Failed';
      case 'pending_bank_details':
        return 'Pending Bank Details';
      default:
        return 'Processing';
    }
  };

  const getTimeRemaining = (scheduledDate: string) => {
    const now = new Date();
    const scheduled = new Date(scheduledDate);
    const diffHours = differenceInHours(scheduled, now);
    const diffDays = differenceInDays(scheduled, now);

    if (diffHours < 0) {
      return 'Due now';
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
    } else {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} remaining`;
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            <span>Loading payment status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!paymentStatus) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Payment status not found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Status
        </CardTitle>
        <CardDescription>
          Track your payment and transfer status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {getStatusIcon(paymentStatus.transfer_status)}
          <Badge className={getStatusColor(paymentStatus.transfer_status)}>
            {getStatusText(paymentStatus.transfer_status)}
          </Badge>
        </div>

        {/* Payment Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600">Your Share (85%)</div>
            <div className="text-lg font-semibold text-green-800">
              ₦{((paymentStatus.host_amount || 0) / 100).toLocaleString()}
            </div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Platform Fee (15%)</div>
            <div className="text-lg font-semibold text-blue-800">
              ₦{((paymentStatus.platform_amount || 0) / 100).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Transfer Schedule */}
        {paymentStatus.transfer_status === 'scheduled' && paymentStatus.transfer_scheduled_date && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Transfer Schedule</span>
            </div>
            <div className="text-sm text-blue-700">
              <div>Transfer Date: {format(new Date(paymentStatus.transfer_scheduled_date), 'MMM dd, yyyy HH:mm')}</div>
              <div className="mt-1">
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                  {getTimeRemaining(paymentStatus.transfer_scheduled_date)}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Completed Transfer */}
        {paymentStatus.transfer_status === 'completed' && paymentStatus.transfer_completed_date && (
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Transfer Completed</span>
            </div>
            <div className="text-sm text-green-700">
              <div>Completed: {format(new Date(paymentStatus.transfer_completed_date), 'MMM dd, yyyy HH:mm')}</div>
              {paymentStatus.transfer_reference && (
                <div className="mt-1">
                  Reference: <code className="text-xs bg-green-100 px-1 rounded">{paymentStatus.transfer_reference}</code>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Failed Transfer */}
        {paymentStatus.transfer_status === 'failed' && (
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Transfer Failed</span>
            </div>
            <div className="text-sm text-red-700">
              {paymentStatus.transfer_error && (
                <div className="mb-2">Error: {paymentStatus.transfer_error}</div>
              )}
              <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                Contact Support
              </Button>
            </div>
          </div>
        )}

        {/* Pending Bank Details */}
        {paymentStatus.transfer_status === 'pending_bank_details' && (
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Bank Details Required</span>
            </div>
            <div className="text-sm text-yellow-700">
              <div className="mb-2">Please add your bank account details to receive payment.</div>
              <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-300">
                Add Bank Details
              </Button>
            </div>
          </div>
        )}

        {/* Quality Assurance Notice */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600">
            <strong>Quality Assurance:</strong> Payments are held for 48 hours after slate completion to ensure service quality and handle any disputes.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentStatusCard;
