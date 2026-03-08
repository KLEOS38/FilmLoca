
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import { format, addMonths, subMonths, isWithinInterval, isBefore, startOfDay, differenceInDays } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePaystackPayment } from '@/hooks/usePaystackPayment';
import type { DateRange } from 'react-day-picker';

interface AvailabilityCalendarProps {
  propertyId: string;
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void;
  selectedStartDate?: Date | null;
  selectedEndDate?: Date | null;
  price?: number;
  propertyTitle?: string;
}

interface UnavailableDate {
  start: Date;
  end: Date;
  type: 'booking' | 'blocked';
}

const AvailabilityCalendar = ({ 
  propertyId, 
  onDateSelect, 
  selectedStartDate, 
  selectedEndDate,
  price = 0,
  propertyTitle = 'Selected Property'
}: AvailabilityCalendarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { initializePayment, paymentState } = usePaystackPayment();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: selectedStartDate || undefined,
    to: selectedEndDate || undefined
  });

  useEffect(() => {
    fetchUnavailableDates();
  }, [propertyId]);

  const fetchUnavailableDates = async () => {
    try {
      // Check if property ID is a simple string (mock data) or UUID
      const isMockData = !propertyId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      
      if (isMockData) {
        console.log('Mock data detected, skipping availability fetch');
        // For mock data, set empty unavailable dates
        setUnavailableDates([]);
        return;
      }

      // Fetch booked dates
      const { data: bookings } = await supabase
        .from('bookings')
        .select('start_date, end_date')
        .eq('property_id', propertyId)
        .in('status', ['confirmed', 'completed']);

      // Fetch blocked dates
      const { data: blocked } = await supabase
        .from('property_unavailability')
        .select('start_date, end_date')
        .eq('property_id', propertyId);

      const combined: UnavailableDate[] = [
        ...(bookings || []).map(booking => ({
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
          type: 'booking' as const
        })),
        ...(blocked || []).map(block => ({
          start: new Date(block.start_date),
          end: new Date(block.end_date),
          type: 'blocked' as const
        }))
      ];

      setUnavailableDates(combined);
    } catch (error) {
      console.error('Error fetching availability:', error);
      // For any error, set empty unavailable dates to allow booking
      setUnavailableDates([]);
    }
  };

  const isDateUnavailable = (date: Date) => {
    const dayStart = startOfDay(date);
    
    // Disable past dates
    if (isBefore(dayStart, startOfDay(new Date()))) {
      return true;
    }

    // Check if date is within any unavailable period
    return unavailableDates.some(period => 
      isWithinInterval(dayStart, { 
        start: startOfDay(period.start), 
        end: startOfDay(period.end) 
      })
    );
  };

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      setSelectedRange(undefined);
      onDateSelect?.(null, null);
      return;
    }

    setSelectedRange(range);
    onDateSelect?.(range.from || null, range.to || null);
  };

  const clearDates = () => {
    setSelectedRange(undefined);
    onDateSelect?.(null, null);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleBookNow = async () => {
    console.log('Calendar Book Now clicked!', {
      user: user?.id,
      selectedRange,
      propertyId,
      price,
      propertyTitle
    });

    if (!user) {
      toast.error("Please sign in to book this location");
      navigate('/auth');
      return;
    }

    if (!selectedRange?.from || !selectedRange?.to) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    // Calculate days and total price
    const days = differenceInDays(selectedRange.to, selectedRange.from);
    const totalPrice = price * days;

    console.log('Calendar booking data:', {
      propertyId,
      startDate: format(selectedRange.from, 'yyyy-MM-dd'),
      endDate: format(selectedRange.to, 'yyyy-MM-dd'),
      totalAmount: totalPrice,
      checkInTime: '09:00', // Default check-in time
      propertyTitle,
      userEmail: user.email,
      userName: user.user_metadata?.name
    });

    try {
      // Initialize payment directly
      const paymentResult = await initializePayment({
        propertyId,
        startDate: format(selectedRange.from, 'yyyy-MM-dd'),
        endDate: format(selectedRange.to, 'yyyy-MM-dd'),
        totalAmount: totalPrice,
        checkInTime: '09:00', // Default check-in time
        notes: undefined,
        propertyTitle: propertyTitle
      }, user.email || '', user.user_metadata?.name || 'User');

      console.log('Calendar payment result:', paymentResult);

      if (paymentResult.success) {
        toast.success('Opening payment window...');
      } else {
        throw new Error(paymentResult.error || 'Payment initialization failed');
      }
    } catch (error: any) {
      console.error('Calendar booking error:', error);
      toast.error(error.message || 'Failed to process booking. Please try again.');
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedRange?.from || !selectedRange?.to) return 0;
    const days = differenceInDays(selectedRange.to, selectedRange.from);
    return price * days;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Select check-in date</h3>
        <Button variant="ghost" onClick={clearDates} className="text-sm underline">
          Clear dates
        </Button>
      </div>
      
      {/* Single Month Calendar with FilterBar-style navigation */}
      <div 
        className="bg-pastel-blue/5 rounded-lg border border-pastel-blue/20 w-full"
        style={{ padding: '24px 24px 0 24px' }}
      >
        {/* Nav row matches calendar width so arrows align with calendar edges */}
        <div className="flex items-center justify-between mb-2 w-full max-w-[25rem] mx-auto">
          <button
            className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 bg-white border border-gray-300 shadow-sm p-0 opacity-80 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center"
            onClick={() => {
              const newMonth = new Date(currentMonth);
              newMonth.setMonth(newMonth.getMonth() - 1);
              setCurrentMonth(newMonth);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-sm font-semibold text-black text-center">
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <button
            className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 bg-white border border-gray-300 shadow-sm p-0 opacity-80 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center"
            onClick={() => {
              const newMonth = new Date(currentMonth);
              newMonth.setMonth(newMonth.getMonth() + 1);
              setCurrentMonth(newMonth);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            disabled={isDateUnavailable}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            numberOfMonths={1}
            className="text-sm w-fit"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-1 p-4 pt-1 pb-4 bg-white rounded-xl shadow-lg relative",
              caption: "hidden",
              caption_label: "hidden",
              nav: "hidden",
              nav_button: "hidden",
              nav_button_previous: "hidden",
              nav_button_next: "hidden",
              table: "w-full border-collapse space-y-1",
              head_row: "flex w-full justify-center",
              head_cell: "text-sm font-semibold text-gray-700 w-12 py-1.5 px-3 text-center",
              row: "flex w-full mt-1.5 justify-center",
              cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-[#000000] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-10 w-10 p-0 font-normal text-[#757575] aria-selected:opacity-100 hover:bg-[#f0f0f0] focus:z-20",
              day_range_end: "day-range-end",
              day_range_middle: "aria-selected:bg-[#000000] aria-selected:text-[#ffffff]",
              day_range_start: "day-range-start aria-selected:bg-[#000000] aria-selected:text-[#ffffff]",
              day_selected: 
                "bg-[#000000] text-[#ffffff] hover:bg-[#000000] hover:text-[#ffffff] focus:bg-[#000000] focus:text-[#ffffff]",
              day_today: "bg-[#f8f8f8] text-[#000000]",
              day_outside: 
                "text-gray-300 opacity-50 aria-selected:bg-[#000000]/10 aria-selected:text-gray-300 aria-selected:opacity-30",
            }}
            showOutsideDays={false}
          />
        </div>
      </div>

      {/* Book Now Button with Price */}
      {selectedRange?.from && selectedRange?.to && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">
                {format(selectedRange.from, 'MMM dd')} - {format(selectedRange.to, 'MMM dd')}
              </div>
              <div className="text-lg font-semibold">
                ₦{calculateTotalPrice().toLocaleString()}
                <span className="text-sm font-normal text-gray-600 ml-1">
                  ({differenceInDays(selectedRange.to, selectedRange.from)} days)
                </span>
              </div>
            </div>
            <Button 
              onClick={handleBookNow}
              disabled={paymentState.isLoading || paymentState.isProcessing}
              className="bg-black hover:bg-[#e5e5e5] text-white px-6"
            >
              {paymentState.isLoading || paymentState.isProcessing ? (
                <>
                  <CreditCard className="h-4 w-4 mr-2 animate-pulse" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Book Now
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-200 border border-red-300 rounded"></div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary border rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
