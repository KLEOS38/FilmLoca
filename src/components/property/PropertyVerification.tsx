import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Video, Shield, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface PropertyVerificationProps {
  propertyId: string;
  propertyTitle: string;
  isVerified: boolean;
  onVerificationRequest: (appointmentData: VerificationAppointment) => void;
}

interface VerificationAppointment {
  propertyId: string;
  propertyTitle: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export default function PropertyVerification({ 
  propertyId, 
  propertyTitle, 
  isVerified, 
  onVerificationRequest 
}: PropertyVerificationProps) {
  const { user } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available time slots for verification calls
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00',
    '18:00'
  ];

  // Generate available dates (next 14 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleVerificationRequest = async () => {
    if (!user) {
      toast.error('Please sign in to request verification');
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time for the verification call');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🔍 Scheduling verification:', {
        propertyId,
        propertyTitle,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        notes: notes.trim() || undefined
      });

      const appointmentData = {
        propertyId,
        propertyTitle,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        notes: notes.trim() || undefined
      };

      await onVerificationRequest(appointmentData);
      
      toast.success('Verification appointment requested! We\'ll send you a video call link.');
      setShowBooking(false);
      setSelectedDate('');
      setSelectedTime('');
      setNotes('');
    } catch (error) {
      console.error('❌ Verification request failed:', error);
      toast.error('Failed to request verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isVerified) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Verified Property</h4>
              <p className="text-sm text-green-600">
                This property has been verified through video inspection
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Property Verification</span>
        </CardTitle>
        <CardDescription>
          Get your property verified through a video call to build trust with renters
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Verification Status</p>
            <Badge variant="secondary">Not Verified</Badge>
          </div>
          
          <Button
            onClick={() => setShowBooking(!showBooking)}
            variant={showBooking ? "outline" : "default"}
            className="flex items-center space-x-2"
          >
            <Video className="h-4 w-4" />
            <span>Get Verified</span>
          </Button>
        </div>

        {showBooking && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h4 className="font-medium mb-2">Schedule Video Verification</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Book a 15-minute video call to show your property. Our team will guide you through the verification process.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="verification-date">Preferred Date</Label>
                  <select
                    id="verification-date"
                    name="verification-date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-md"
                    disabled={isSubmitting}
                    aria-label="Select verification date"
                  >
                  <option value="">Select a date</option>
                  {availableDates.map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Preferred Time</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      disabled={isSubmitting}
                      className={`p-2 text-sm border rounded-md transition-colors ${
                        selectedTime === time
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white hover:bg-gray-50'
                      } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="verification-notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="verification-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific areas you'd like to highlight during the verification..."
                  className="mt-1"
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                onClick={handleVerificationRequest}
                disabled={isSubmitting || !selectedDate || !selectedTime}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Verification
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowBooking(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
