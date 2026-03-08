
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format, isWithinInterval, isBefore, isSameDay } from 'date-fns';

interface PropertyAvailabilityManagerProps {
  propertyId: string;
}

interface UnavailableDate {
  id?: string;
  start: Date;
  end: Date;
  type: 'booking' | 'blocked';
}

const PropertyAvailabilityManager = ({ propertyId }: PropertyAvailabilityManagerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reason, setReason] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [selectedBlockedDates, setSelectedBlockedDates] = useState<Date[]>([]);
  const { user } = useAuth();
  
  // Fetch unavailable dates on component mount
  useEffect(() => {
    if (propertyId) {
      fetchUnavailableDates();
    }
  }, [propertyId]);

  const fetchUnavailableDates = async () => {
    try {
      if (!propertyId) {
        console.warn('⚠️ No property ID provided for fetching unavailable dates');
        setUnavailableDates([]);
        return;
      }
      
      console.log('📅 Fetching unavailable dates for property:', propertyId);
      
      // Fetch booked dates
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('id, start_date, end_date')
        .eq('property_id', propertyId)
        .in('status', ['confirmed', 'completed'])
        .in('payment_status', ['paid', 'completed']);
        
      if (bookingsError) {
        console.error('❌ Error fetching bookings:', bookingsError);
        console.error('Error details:', {
          message: bookingsError.message,
          details: bookingsError.details,
          hint: bookingsError.hint,
          code: bookingsError.code
        });
        toast.error("Could not load booked dates");
        // Don't throw, continue with unavailability fetch
      } else {
        console.log('✅ Bookings fetched:', bookings?.length || 0);
      }
      
      // Fetch manually blocked dates
      const { data: unavailability, error: unavailabilityError } = await supabase
        .from('property_unavailability')
        .select('id, start_date, end_date')
        .eq('property_id', propertyId);
        
      if (unavailabilityError) {
        console.error('❌ Error fetching unavailability:', unavailabilityError);
        console.error('Error details:', {
          message: unavailabilityError.message,
          details: unavailabilityError.details,
          hint: unavailabilityError.hint,
          code: unavailabilityError.code
        });
        toast.error("Could not load blocked dates");
        // Don't throw, continue with bookings data
      } else {
        console.log('✅ Unavailability records fetched:', unavailability?.length || 0);
      }
      
      // Combine both sets of dates
      const combinedUnavailable: UnavailableDate[] = [
        ...(bookings || []).map((booking: any) => ({
          id: booking.id,
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
          type: 'booking' as const
        })),
        ...(unavailability || []).map((block: any) => ({
          id: block.id,
          start: new Date(block.start_date),
          end: new Date(block.end_date),
          type: 'blocked' as const
        }))
      ];
      
      console.log('✅ Total unavailable dates:', combinedUnavailable.length);
      setUnavailableDates(combinedUnavailable);
    } catch (error: any) {
      console.error("❌ Error fetching unavailable dates:", error);
      toast.error(`Could not load unavailable dates: ${error?.message || 'Unknown error'}`);
      setUnavailableDates([]); // Set empty array on error
    }
  };

  const handleDateClick = (date: Date) => {
    if (isDateUnavailable(date)) {
      // If date is already selected, unselect it
      if (selectedBlockedDates.some(d => isSameDay(d, date))) {
        setSelectedBlockedDates(selectedBlockedDates.filter(d => !isSameDay(d, date)));
      }
      return;
    }
    
    // Toggle date selection
    setSelectedBlockedDates(prev => {
      const existingIndex = prev.findIndex(d => isSameDay(d, date));
      if (existingIndex >= 0) {
        return [...prev.slice(0, existingIndex), ...prev.slice(existingIndex + 1)];
      } else {
        return [...prev, date].sort((a, b) => a.getTime() - b.getTime());
      }
    });
  };
  
  const handleBlockSelectedDates = async () => {
    if (!user) {
      toast.error("You must be signed in to manage availability");
      return;
    }
    
    if (!propertyId) {
      toast.error("Property ID is missing");
      return;
    }
    
    if (selectedBlockedDates.length === 0) {
      toast.error("Please select at least one date to block");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('📅 Blocking dates for property:', propertyId);
      console.log('📆 Selected dates:', selectedBlockedDates.map(d => format(d, 'yyyy-MM-dd')).join(', '));
      
      // Verify property ownership before blocking dates
      const { data: propertyCheck, error: propertyCheckError } = await supabase
        .from('properties')
        .select('id, owner_id')
        .eq('id', propertyId)
        .eq('owner_id', user.id)
        .single();

      if (propertyCheckError || !propertyCheck) {
        console.error('❌ Property ownership verification failed:', propertyCheckError);
        toast.error('You do not have permission to manage this property');
        return;
      }

      // Insert unavailability records for each selected date
      const { error } = await supabase
        .from('property_unavailability')
        .insert(
          selectedBlockedDates.map(date => ({
            property_id: propertyId,
            start_date: format(date, 'yyyy-MM-dd'),
            end_date: format(date, 'yyyy-MM-dd'),
            reason: reason || null
          }))
        );
      
      if (error) {
        console.error('❌ Error blocking dates:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast.error(`Failed to block dates: ${error.message || 'Unknown error'}`);
        return;
      }
      
      toast.success(`${selectedBlockedDates.length} date(s) blocked successfully!`);
      setReason("");
      setSelectedBlockedDates([]);
      await fetchUnavailableDates();
      
      // Refresh the location manager to update listings immediately
      if (typeof window !== 'undefined' && (window as any).supabaseLocationManager) {
        (window as any).supabaseLocationManager.refreshLocations();
      }
    } catch (error: any) {
      console.error("❌ Error blocking dates:", error);
      toast.error(`Failed to block dates: ${error?.message || 'Please try again'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockDates = async (id?: string) => {
    if (!user) {
      toast.error("You must be signed in to manage availability");
      return;
    }
    
    if (!id) {
      toast.error("Invalid unavailability record ID");
      return;
    }
    
    if (!propertyId) {
      toast.error("Property ID is missing");
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('📅 Unblocking dates for property:', propertyId);
      console.log('🆔 Unavailability record ID:', id);
      console.log('👤 Current user:', user.id);
      
      // Verify the unavailability record belongs to this property
      const { data: unavailabilityCheck, error: checkError } = await supabase
        .from('property_unavailability')
        .select('id, property_id')
        .eq('id', id)
        .eq('property_id', propertyId)
        .single();
      
      if (checkError || !unavailabilityCheck) {
        console.error('❌ Unavailability record not found or does not belong to property:', checkError);
        toast.error('Unable to verify unavailability record');
        return;
      }
      
      const { error } = await supabase
        .from('property_unavailability')
        .delete()
        .eq('id', id)
        .eq('property_id', propertyId); // Extra safety check
      
      if (error) {
        console.error('❌ Error unblocking dates:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast.error(`Failed to unblock dates: ${error.message}`);
        return;
      }
      
      console.log('✅ Dates unblocked successfully');
      toast.success("Dates unblocked successfully!");
      await fetchUnavailableDates();
      
      // Refresh the location manager to update listings immediately
      if (typeof window !== 'undefined' && (window as any).supabaseLocationManager) {
        (window as any).supabaseLocationManager.refreshLocations();
      }
    } catch (error: any) {
      console.error("❌ Error unblocking dates:", error);
      toast.error(`Failed to unblock dates: ${error?.message || 'Please try again'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isDateUnavailable = (date: Date) => {
    // Disable dates in the past
    if (isBefore(date, new Date())) {
      return true;
    }
    
    // Check if date falls within any unavailable period
    return unavailableDates.some(period => 
      isWithinInterval(date, { start: period.start, end: period.end })
    );
  };

  const isDateBooked = (date: Date) => {
    return unavailableDates
      .filter(period => period.type === 'booking')
      .some(period => 
        isWithinInterval(date, { start: period.start, end: period.end })
      );
  };
  
  const isDateSelected = (date: Date) => {
    return selectedBlockedDates.some(d => isSameDay(d, date));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Property Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Select dates to block</Label>
              <div className="mt-2">
                <div className="relative">
                <Calendar
                  mode="single"
                  onDayClick={handleDateClick}
                  disabled={isDateUnavailable}
                  className="border rounded-md p-3"
                  modifiers={{
                    booked: unavailableDates
                      .filter(period => period.type === 'booking')
                      .map(period => {
                        const dates = [];
                        const startDate = new Date(period.start);
                        const endDate = new Date(period.end);
                        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                          dates.push(new Date(d));
                        }
                        return dates;
                      }).flat(),
                    blocked: unavailableDates
                      .filter(period => period.type === 'blocked')
                      .map(period => {
                        const dates = [];
                        const startDate = new Date(period.start);
                        const endDate = new Date(period.end);
                        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                          dates.push(new Date(d));
                        }
                        return dates;
                      }).flat(),
                    selected: selectedBlockedDates
                  }}
                  modifiersStyles={{
                    booked: {
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      pointerEvents: 'none'
                    },
                    blocked: {
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      pointerEvents: 'none'
                    },
                    selected: {
                      backgroundColor: '#3b82f6',
                      color: '#ffffff',
                      fontWeight: 'bold'
                    }
                  }}
                />
                {selectedBlockedDates.length > 0 && (
                  <div className="mt-2 text-sm text-blue-600">
                    {selectedBlockedDates.length} date(s) selected
                  </div>
                )}
              </div>
              </div>
              
              {/* Legend for host calendar */}
              <div className="flex flex-col gap-2 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-black border border-gray-300 rounded"></div>
                  <span>Booked (cannot be changed)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 border border-red-300 rounded"></div>
                  <span>Blocked by you</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 border border-green-300 rounded"></div>
                  <span>Available</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="block-reason">Reason (optional)</Label>
                <Textarea
                  id="block-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Personal use, Renovations, etc."
                  className="mt-1"
                />
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={handleBlockSelectedDates}
                  disabled={isLoading || selectedBlockedDates.length === 0}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Blocking...
                    </>
                  ) : (
                    `Block ${selectedBlockedDates.length} Selected Date${selectedBlockedDates.length !== 1 ? 's' : ''}`
                  )}
                </Button>
                {selectedBlockedDates.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedBlockedDates([])}
                    className="w-full"
                  >
                    Clear Selection
                  </Button>
                )}
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Currently Blocked Dates:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {unavailableDates
                    .filter(period => period.type === 'blocked')
                    .map((period, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md border">
                      <span className="text-sm">
                        {format(period.start, 'MMM d, yyyy')} - {format(period.end, 'MMM d, yyyy')}
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleUnblockDates(period.id)}
                        disabled={isLoading}
                      >
                        Unblock
                      </Button>
                    </div>
                  ))}
                  
                  {unavailableDates.filter(period => period.type === 'blocked').length === 0 && (
                    <p className="text-sm text-muted-foreground">No dates are currently manually blocked</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Booked Dates:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {unavailableDates
                    .filter(period => period.type === 'booking')
                    .map((period, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-blue-50 rounded-md border border-blue-100">
                      <span className="text-sm">
                        {format(period.start, 'MMM d, yyyy')} - {format(period.end, 'MMM d, yyyy')}
                      </span>
                      <span className="text-xs text-blue-600 font-medium">Booked</span>
                    </div>
                  ))}
                  
                  {unavailableDates.filter(period => period.type === 'booking').length === 0 && (
                    <p className="text-sm text-muted-foreground">No confirmed bookings yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyAvailabilityManager;
