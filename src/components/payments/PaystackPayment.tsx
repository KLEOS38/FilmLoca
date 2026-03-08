import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Loader2, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Mail,
  User,
  Calendar,
  MapPin,
  Home
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Declare PaystackPop type for TypeScript
declare global {
  interface Window {
    PaystackPop: any;
  }
}

interface BookingDetails {
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  checkInTime: string;
  notes?: string;
}

interface PaystackPaymentProps {
  bookingDetails: BookingDetails;
  userEmail: string;
  userName: string;
  onPaymentSuccess: (reference: string) => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

const PaystackPayment: React.FC<PaystackPaymentProps> = ({
  bookingDetails,
  userEmail,
  userName,
  onPaymentSuccess,
  onPaymentError,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success' | 'error'>('details');
  const [email, setEmail] = useState(userEmail);
  const [name, setName] = useState(userName);
  const [isEmailValid, setIsEmailValid] = useState(true);

  // No external scripts needed when using server-side initialization

  useEffect(() => {
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
    setIsEmailValid(emailOk);
  }, [email]);

  const handlePayment = async () => {
    if (!isEmailValid) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setIsLoading(true);
    setPaymentStep('processing');

    try {
      // Initialize transaction via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          propertyId: bookingDetails.propertyId,
          startDate: bookingDetails.startDate,
          endDate: bookingDetails.endDate,
          totalPrice: bookingDetails.totalAmount,
          checkInTime: bookingDetails.checkInTime,
          notes: bookingDetails.notes || '',
          paymentProvider: 'paystack'
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to initialize payment');
      }

      if (data?.authorization_url) {
        // Redirect to Paystack checkout (server-initialized)
        window.location.href = data.authorization_url;
        return;
      }

      throw new Error('Payment initialization did not return an authorization URL');
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStep('error');
      onPaymentError(error.message || 'Payment initialization failed');
      toast.error(error.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDays = () => {
    const start = new Date(bookingDetails.startDate);
    const end = new Date(bookingDetails.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (paymentStep === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground mb-4">
            Your booking has been confirmed. You will receive a confirmation email shortly.
          </p>
          <Button onClick={() => window.location.href = '/booking-success'} className="w-full">
            View Booking Details
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (paymentStep === 'error') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
          <p className="text-muted-foreground mb-4">
            There was an error processing your payment. Please try again.
          </p>
          <div className="space-y-2">
            <Button onClick={() => setPaymentStep('details')} className="w-full">
              Try Again
            </Button>
            <Button variant="outline" onClick={onCancel} className="w-full">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{bookingDetails.propertyTitle}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {bookingDetails.propertyAddress}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Check-in</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(bookingDetails.startDate)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Check-out</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(bookingDetails.endDate)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Check-in Time</p>
              <p className="font-medium">{bookingDetails.checkInTime}</p>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-green-600">
              ₦{bookingDetails.totalAmount.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="pl-10"
                required
              />
            </div>
            {!isEmailValid && email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Please enter a valid email address
              </p>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Test Mode</p>
                <p className="text-yellow-700">
                  This is a test payment. Use test card numbers like 4084084084084081
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handlePayment}
              disabled={isLoading || !isEmailValid || !name.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay ₦{bookingDetails.totalAmount.toLocaleString()}
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaystackPayment;
