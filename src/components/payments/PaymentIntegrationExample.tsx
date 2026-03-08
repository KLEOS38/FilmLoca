import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, MapPin, Users } from 'lucide-react';
import PaystackPayment from './PaystackPayment';
import { useAuth } from '@/contexts/AuthContext';

// Example component showing how to integrate Paystack payment
const PaymentIntegrationExample = () => {
  const { user } = useAuth();
  const [showPayment, setShowPayment] = useState(false);

  // Example booking data - in real app, this would come from your booking form
  const exampleBooking = {
    propertyId: 'example-property-id',
    propertyTitle: 'Modern Film Studio',
    propertyAddress: '123 Film Street',
    startDate: '2024-12-20',
    endDate: '2024-12-25',
    totalAmount: 150000, // ₦150,000
    teamSize: 5,
    notes: 'Filming a commercial for a tech company'
  };

  const handlePaymentSuccess = (reference: string) => {
    console.log('Payment successful:', reference);
    // Handle successful payment
    // Redirect to success page or show success message
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // Handle payment error
  };

  const handleCancel = () => {
    setShowPayment(false);
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please log in to make a booking</p>
        </CardContent>
      </Card>
    );
  }

  if (showPayment) {
    return (
      <PaystackPayment
        bookingDetails={exampleBooking}
        userEmail={user.email || ''}
        userName={user.user_metadata?.name || 'User'}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Paystack Integration Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Example Booking</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>{exampleBooking.propertyTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>{exampleBooking.startDate} - {exampleBooking.endDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span>{exampleBooking.teamSize} people</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-medium">Total Amount:</span>
              <Badge className="bg-green-100 text-green-800">
                ₦{exampleBooking.totalAmount.toLocaleString()}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => setShowPayment(true)} 
            className="w-full"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Test Paystack Payment
          </Button>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Test Card Numbers:</strong></p>
            <p>• 4084084084084081 (Visa)</p>
            <p>• 5123456789012346 (Mastercard)</p>
            <p>• Any future date for expiry</p>
            <p>• Any 3 digits for CVV</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentIntegrationExample;
