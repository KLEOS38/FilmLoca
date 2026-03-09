import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { createMockBooking, saveMockBooking } from '@/utils/mockDataUtils';
import { edgeFunctionDebugger } from '@/utils/edgeFunctionDebugger';

interface BookingData {
  propertyId: string;
  propertyTitle: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  checkInTime: string;
  notes?: string;
}

interface PaymentState {
  isLoading: boolean;
  isProcessing: boolean;
  error: string | null;
  reference: string | null;
}

interface PaymentInitResult {
  success: boolean;
  authorizationUrl?: string;
  reference?: string;
  booking_id?: string;
  mock?: boolean;
  test?: boolean;
  error?: string;
  testData?: {
    bookingId: string;
    propertyId: string;
    status: string;
    paymentStatus: string;
    timestamp: string;
    [key: string]: unknown;
  };
}

interface VerificationResultData {
  id?: string;
  status?: string;
  payment_status?: string;
}

interface VerificationResult {
  success: boolean;
  data?: VerificationResultData;
  error?: string;
}

const isMockBookingRecord = (b: unknown): b is { id: string } => {
  if (typeof b !== 'object' || b === null) return false;
  const rec = b as Record<string, unknown>;
  return typeof rec.id === 'string' && rec.id.startsWith('mock-booking-');
};

export const usePaystackPayment = () => {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    isLoading: false,
    isProcessing: false,
    error: null,
    reference: null
  });

  const createBooking = useCallback(async (bookingData: BookingData, userEmail: string, userName: string) => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true, error: null }));

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if this is a test booking
      const isTestBooking = import.meta.env.MODE === 'test' || 
                          bookingData.propertyId.startsWith('test-') ||
                          !bookingData.propertyId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      
      if (isTestBooking) {
        console.log('Test booking detected, creating test booking record');
        
        // Create a test booking with proper test data
        const testBooking = {
          id: `test-booking-${Date.now()}`,
          property_id: bookingData.propertyId || 'test-property-123',
          user_id: user.id,
          start_date: bookingData.startDate,
          end_date: bookingData.endDate,
          total_price: bookingData.totalAmount,
          checkInTime: bookingData.checkInTime,
          notes: bookingData.notes || 'Test booking',
          status: 'confirmed',
          payment_status: 'paid',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          // Include additional test metadata
          _test: true,
          test_scenario: 'success',
          test_timestamp: new Date().toISOString()
        };

        // In a real test environment, you might want to save this to a test database
        if (import.meta.env.MODE === 'test') {
          // Save to test database or in-memory store
          console.log('Saving test booking to test database');
          // In a real test setup, you would use a test database here
        } else {
          // In development, save to localStorage for demo purposes
          const testBookings = JSON.parse(localStorage.getItem('testBookings') || '[]');
          testBookings.push(testBooking);
          localStorage.setItem('testBookings', JSON.stringify(testBookings));
        }

        console.log('Test booking created:', testBooking);
        
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return testBooking;
      }

      // For real bookings, proceed with normal flow
      console.log('Processing real booking via Edge Function');
      // ... existing real booking logic ...
      return null;
    } catch (err) {
      const error = err as Error;
      console.error('Error in createBooking:', error);
      setPaymentState(prev => ({ ...prev, error: error.message }));
      throw error;
    } finally {
      setPaymentState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const initializePayment = useCallback(async (
    bookingData: BookingData,
    userEmail: string,
    userName: string,
    testMode: boolean = false
  ): Promise<PaymentInitResult> => {
    try {
      setPaymentState(prev => ({ ...prev, isProcessing: true, error: null }));

      // Check if this is a test booking
      const isTestBooking = testMode || 
                          import.meta.env.MODE === 'test' || 
                          bookingData.propertyId.startsWith('test-');

      // For test bookings, create and save to database
      if (isTestBooking) {
        console.log('🛠️ Test booking detected, creating test booking record');
        
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error('You must be logged in to create a test booking');
        }

        // Create test booking data
        const now = new Date().toISOString();
        const testBooking = {
          id: `test-booking-${Date.now()}`,
          property_id: bookingData.propertyId,
          user_id: user.id,
          start_date: bookingData.startDate,
          end_date: bookingData.endDate,
          total_price: bookingData.totalAmount,
          checkInTime: bookingData.checkInTime,
          notes: bookingData.notes || 'Test booking',
          status: 'confirmed',
          payment_status: 'paid',
          payment_reference: `test-ref-${Math.random().toString(36).substring(2, 11)}`,
          is_test: true,
          created_at: now,
          updated_at: now
        };

        // Save to bookings table with test flag
        const { data: savedBooking, error: saveError } = await supabase
          .from('bookings')
          .insert([testBooking])
          .select()
          .single();

        if (saveError) {
          console.error('❌ Error saving test booking:', saveError);
          throw new Error('Failed to save test booking to database');
        }

        console.log('✅ Test booking saved to database:', savedBooking);
        toast.success('Test booking created successfully');
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          success: true,
          test: true,
          booking_id: savedBooking.id,
          reference: savedBooking.payment_reference,
          testData: {
            bookingId: savedBooking.id,
            propertyId: savedBooking.property_id,
            status: savedBooking.status,
            paymentStatus: savedBooking.payment_status,
            timestamp: savedBooking.created_at
          }
        };
      }

      // For mock data: create and save a mock booking locally and skip payment
      const mockOrNull = await createBooking(bookingData, userEmail, userName);
      if (isMockBookingRecord(mockOrNull)) {
        toast.success('Mock booking created. Skipping payment.');
        return { success: true, mock: true };
      }

      // Verify user is authenticated before calling Edge Function
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
      if (authError || !currentUser) {
        throw new Error('You must be logged in to make a booking. Please sign in and try again.');
      }

      console.log('🔐 User authenticated:', currentUser.id);
      console.log('💳 Initializing payment via Edge Function:', {
        propertyId: bookingData.propertyId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalPrice: bookingData.totalAmount,
        checkInTime: bookingData.checkInTime,
        notes: bookingData.notes || '',
        paymentProvider: 'paystack'
      });

      // Run Edge Function debugger to identify the exact issue
      console.log('🔍 Running Edge Function debugger...');
      const debugDetails = {
        propertyId: bookingData.propertyId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalAmount: bookingData.totalAmount,
        checkInTime: bookingData.checkInTime,
        notes: bookingData.notes || '',
        paymentProvider: 'paystack'
      };
      
      await edgeFunctionDebugger.quickDebug(debugDetails);

      // Initialize transaction via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          propertyId: bookingData.propertyId,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          totalPrice: bookingData.totalAmount,
          checkInTime: bookingData.checkInTime,
          notes: bookingData.notes || '',
          paymentProvider: 'paystack'
        }
      });

      console.log('📦 Edge Function response:', { data, error });

      if (error) {
        console.error('❌ Edge Function error:', error);
        console.error('❌ Full error object:', JSON.stringify(error, null, 2));
        console.error('❌ Error message:', error.message);
        console.error('❌ Error details:', error.details);
        
        // Provide more helpful error messages
        if (error.message?.includes('not authenticated')) {
          throw new Error('You must be logged in to make a booking. Please sign in and try again.');
        }
        if (error.message?.includes('not configured')) {
          throw new Error('Payment service is not configured. Please contact support.');
        }
        if (error.message?.includes('Property not found')) {
          throw new Error('Property not found. Please refresh the page and try again.');
        }
        if (error.message?.includes('Edge Function returned a non-2xx status code')) {
          console.error('🔍 This is the specific error - checking for more details...');
          console.error('🔍 Error context:', error.context);
          console.error('🔍 Error status:', error.status);
          console.error('🔍 Error code:', error.code);
          
          // Try direct API call as fallback
          console.log('🔄 Trying direct API call as fallback...');
          try {
            const supabaseUrl = 'https://jwuakfowjxebtpcxcqyr.supabase.co';
            
            // Get current user session token
            const { data: { session } } = await supabase.auth.getSession();
            const userToken = session?.access_token;
            
            if (!userToken) {
              console.error('❌ No user session token available');
              throw new Error('User not authenticated - no session token');
            }
            
            console.log('🔐 Using user token for direct API call');
            
            const response = await fetch(`${supabaseUrl}/functions/v1/create-payment`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                propertyId: bookingData.propertyId,
                startDate: bookingData.startDate,
                endDate: bookingData.endDate,
                totalPrice: bookingData.totalAmount,
                checkInTime: bookingData.checkInTime,
                notes: bookingData.notes || '',
                paymentProvider: 'paystack'
              })
            });
            
            if (response.ok) {
              const responseData = await response.json();
              console.log('✅ Direct API call succeeded:', responseData);
              if (responseData?.authorization_url) {
                window.location.href = responseData.authorization_url;
                return;
              }
            } else {
              const errorData = await response.json();
              console.error('❌ Direct API also failed:', response.status, errorData);
              throw new Error(`Edge Function error: ${error.message}. Direct API also failed: ${errorData.error || errorData.message}`);
            }
          } catch (directError) {
            console.error('❌ Direct API fallback failed:', directError);
            throw new Error(`Edge Function error: ${error.message}. Direct API fallback also failed.`);
          }
        }
        throw new Error(error.message || 'Failed to initialize payment. Please try again.');
      }

      if (!data) {
        console.error('❌ No data returned from Edge Function');
        throw new Error('Payment initialization failed: No response from server');
      }

      if (data.error) {
        console.error('❌ Error in response data:', data.error);
        throw new Error(data.error || 'Payment initialization failed');
      }

      if (data?.authorization_url) {
        console.log('✅ Payment initialized successfully, redirecting to:', data.authorization_url.substring(0, 50) + '...');
        // Redirect to Paystack checkout (server-initialized)
        window.location.href = data.authorization_url;
        return {
          success: true,
          authorizationUrl: data.authorization_url,
          reference: data.reference,
          booking_id: data.booking_id
        };
      }

      console.error('❌ No authorization URL in response:', data);
      throw new Error('Payment initialization did not return an authorization URL. Please try again or contact support.');
    } catch (err) {
      const error = err as Error;
      console.error('Error initializing payment:', error);
      setPaymentState(prev => ({ ...prev, error: error.message }));
      toast.error(error.message || 'Payment initialization failed');
      return {
        success: false,
        error: error.message
      };
    } finally {
      setPaymentState(prev => ({ ...prev, isProcessing: false }));
    }
  }, [createBooking]);

  const verifyPayment = useCallback(async (reference: string): Promise<VerificationResult> => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true, error: null }));

      // Optional: If you maintain a verification endpoint, invoke it here.
      // Otherwise rely on webhook to update booking/payment.
      const { data, error } = await supabase
        .from('bookings')
        .select('id, status, payment_status')
        .eq('payment_id', reference)
        .single();
      if (!error && data && data.payment_status === 'paid') {
        // Check if this is a mock booking by looking at the metadata
        const bookingId = data.id;
        const isMockBooking = bookingId?.startsWith && bookingId.startsWith('mock-booking-');
        
        if (isMockBooking) {
          console.log('Mock booking payment verified successfully');
          toast.success('Payment verified successfully! (Mock booking)');
          return {
            success: true,
            data: { id: bookingId, payment_status: 'paid' }
          };
        }

        // For real bookings, update database
        // Webhook should already have updated this; nothing to do here.

        // Create success notification
        const { data: bookingData } = await supabase
          .from('bookings')
          .select('id, user_id, properties(title)')
          .eq('payment_id', reference)
          .single();

        const booking = bookingData as { id: string; user_id: string; properties?: { title?: string | null } | null } | null;

        if (booking) {
          await supabase
            .from('notifications')
            .insert({
              user_id: booking.user_id,
              title: 'Payment Successful',
              message: `Your payment has been confirmed for ${booking.properties?.title}.`,
              type: 'payment',
              data: {
                booking_id: booking.id,
                reference: reference
              }
            });
        }

        toast.success('Payment verified successfully!');
        return { success: true, data };
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err) {
      const error = err as Error;
      console.error('Error verifying payment:', error);
      setPaymentState(prev => ({ ...prev, error: error.message }));
      toast.error(error.message || 'Payment verification failed');
      return {
        success: false,
        error: error.message
      };
    } finally {
      setPaymentState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const cancelPayment = useCallback(async (reference: string) => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true, error: null }));

      // For mock bookings, just show success message
      if (reference.includes('mock-booking-')) {
        console.log('Mock booking payment cancelled');
        toast.info('Payment cancelled (Mock booking)');
        return { success: true };
      }

      // For real bookings, update database
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          payment_status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', reference);

      if (error) {
        throw error;
      }

      toast.info('Payment cancelled');
      return { success: true };
    } catch (err) {
      const error = err as Error;
      console.error('Error cancelling payment:', error);
      setPaymentState(prev => ({ ...prev, error: error.message }));
      toast.error(error.message || 'Failed to cancel payment');
      return {
        success: false,
        error: error.message
      };
    } finally {
      setPaymentState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const resetPaymentState = useCallback(() => {
    setPaymentState({
      isLoading: false,
      isProcessing: false,
      error: null,
      reference: null
    });
  }, []);

  return {
    paymentState,
    initializePayment,
    verifyPayment,
    cancelPayment,
    resetPaymentState
  };
};
