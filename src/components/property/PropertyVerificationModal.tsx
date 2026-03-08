import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Shield, CheckCircle, AlertCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { format, addDays, isWeekend, startOfWeek } from 'date-fns';

interface VerificationAppointment {
  propertyId: string;
  propertyTitle: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

interface PropertyVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  isVerified: boolean;
  onVerificationRequest: (data: VerificationAppointment) => Promise<void>;
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30'
];

export default function PropertyVerificationModal({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  isVerified,
  onVerificationRequest
}: PropertyVerificationModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate available dates (next 14 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = addDays(today, i);
      if (!isWeekend(date)) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const monthStart = startOfWeek(currentMonth);
    const days = [];
    
    for (let i = 0; i < 42; i++) {
      const day = addDays(monthStart, i);
      days.push(day);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const isDateAvailable = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return availableDates.some(availableDate => 
      format(availableDate, 'yyyy-MM-dd') === dateStr
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDate === format(date, 'yyyy-MM-dd');
  };

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(format(date, 'yyyy-MM-dd'));
      setSelectedTime(''); // Reset time when date changes
    }
  };

  const handleVerificationRequest = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time for your verification call');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🚀 Scheduling verification:', {
        propertyId,
        propertyTitle,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        notes: notes.trim() || undefined
      });

      const appointmentData: VerificationAppointment = {
        propertyId,
        propertyTitle,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        notes: notes.trim() || undefined
      };

      await onVerificationRequest(appointmentData);
      
      toast.success('Verification appointment scheduled! We\'ll send you a video call link.');
      
      // Reset form and close modal
      setSelectedDate('');
      setSelectedTime('');
      setNotes('');
      onClose();
    } catch (error) {
      console.error('❌ Verification request failed:', error);
      toast.error('Failed to schedule verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  if (isVerified) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Property Verified
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">This property is verified!</h3>
            <p className="text-muted-foreground">
              Your property has been successfully verified and is ready to attract more bookings.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600" />
            Schedule Property Verification
          </DialogTitle>
          <DialogDescription>
            Book a 15-minute video call to verify your property. Our team will guide you through the process.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Info */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">{propertyTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    Video verification required to build trust with guests
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Select Date
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  disabled={isSubmitting}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[120px] text-center">
                  {format(currentMonth, 'MMMM yyyy')}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  disabled={isSubmitting}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => {
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const isAvailable = isDateAvailable(day);
                const isSelected = isDateSelected(day);
                const isWeekendDay = isWeekend(day);
                const isPast = day < new Date() && !isSelected;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    disabled={!isAvailable || isWeekendDay || isPast}
                    className={`
                      relative p-2 text-sm rounded-md transition-colors
                      ${!isCurrentMonth ? 'text-muted-foreground' : ''}
                      ${isWeekendDay ? 'text-gray-400 cursor-not-allowed' : ''}
                      ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${isAvailable && !isWeekendDay && !isPast ? 'hover:bg-blue-100 cursor-pointer' : ''}
                      ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                      ${!isAvailable && !isWeekendDay && !isPast ? 'text-gray-400 cursor-not-allowed' : ''}
                    `}
                  >
                    {format(day, 'd')}
                    {isAvailable && !isSelected && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-md">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  Selected: {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
            )}
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Select Time
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map(time => {
                  const displayTime = `${time.slice(0, 5)} ${parseInt(time) < 12 ? 'AM' : 'PM'}`;
                  return (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      disabled={isSubmitting}
                      className="text-sm"
                    >
                      {displayTime}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          {selectedTime && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific areas you'd like to highlight during the verification call?"
                className="w-full p-3 border rounded-md resize-none h-20 text-sm"
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Summary */}
          {selectedDate && selectedTime && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-800 mb-2">Appointment Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">
                      {selectedTime.slice(0, 5)} {parseInt(selectedTime) < 12 ? 'AM' : 'PM'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">15 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerificationRequest}
              disabled={!selectedDate || !selectedTime || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  Schedule Verification
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
