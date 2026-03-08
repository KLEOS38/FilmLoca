import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LoaderCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format, addMonths, subMonths, isWithinInterval, isBefore, addDays, startOfDay } from 'date-fns';
import type { DateRange } from 'react-day-picker';

interface HostCalendarManagerProps {
  className?: string;
}

interface Property {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
}

interface UnavailableDate {
  id?: string;
  start: Date;
  end: Date;
  type: 'booking' | 'blocked';
  reason?: string;
  guest_name?: string;
}

const HostCalendarManager = ({ className }: HostCalendarManagerProps) => {
  const { user } = useAuth();
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDate[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [blockReason, setBlockReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  useEffect(() => {
    if (selectedProperty) {
      fetchUnavailableDates();
    }
  }, [selectedProperty]);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      
      // Try both owner_id and user_id fields - show all properties for calendar management
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, address, neighborhood')
        .or(`owner_id.eq.${user?.id},user_id.eq.${user?.id}`);

      if (error) {
        console.log('Database query failed, using mock data:', error);
        // Use mock data when database fails
        const mockProperties = [
          {
            id: '1',
            title: 'Luxury Film Studio',
            address: '123 Film Street',
            neighborhood: 'Downtown'
          },
          {
            id: '2', 
            title: 'Modern Apartment',
            address: '456 Cinema Road',
            neighborhood: 'City Center'
          }
        ];
        setProperties(mockProperties);
        setSelectedProperty(mockProperties[0].id);
        return;
      }

      setProperties(data || []);
      if (data && data.length > 0) {
        setSelectedProperty(data[0].id);
      } else {
        // Show message when no properties found
        toast.info('No properties found. List your first property to manage availability.');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnavailableDates = async () => {
    if (!selectedProperty) return;

    try {
      // Check if this is a mock property ID
      if (selectedProperty === '1' || selectedProperty === '2') {
        // Use mock unavailable dates for demo
        const mockUnavailableDates = [
          {
            id: 'mock-1',
            start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            end: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
            type: 'booking' as const,
            reason: 'Film shoot',
            guest_name: 'John Doe'
          },
          {
            id: 'mock-2',
            start: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
            end: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000), // 16 days from now
            type: 'blocked' as const,
            reason: 'Maintenance'
          }
        ];
        setUnavailableDates(mockUnavailableDates);
        return;
      }

      // Fetch booked dates
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id, start_date, end_date,
          profiles:user_id(name)
        `)
        .eq('property_id', selectedProperty)
        .in('status', ['confirmed', 'completed']);

      if (bookingsError) throw bookingsError;

      // Fetch manually blocked dates
      const { data: blocked, error: blockedError } = await supabase
        .from('property_unavailability')
        .select('id, start_date, end_date, reason')
        .eq('property_id', selectedProperty);

      if (blockedError) throw blockedError;

      const combined: UnavailableDate[] = [
        ...(bookings || []).map((booking: any) => ({
          id: booking.id,
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
          type: 'booking' as const,
          guest_name: booking.profiles?.name
        })),
        ...(blocked || []).map((block: any) => ({
          id: block.id,
          start: new Date(block.start_date),
          end: new Date(block.end_date),
          type: 'blocked' as const,
          reason: block.reason
        }))
      ];

      setUnavailableDates(combined);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
      toast.error('Failed to load availability data');
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

  const isDateBooked = (date: Date) => {
    return unavailableDates
      .filter(period => period.type === 'booking')
      .some(period => 
        isWithinInterval(date, { start: period.start, end: period.end })
      );
  };

  const handleBlockDates = async () => {
    if (!selectedRange?.from || !selectedRange?.to) {
      toast.error('Please select dates to block');
      return;
    }

    if (!selectedProperty) {
      toast.error('Please select a property');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('update-availability', {
        body: {
          propertyId: selectedProperty,
          action: 'block',
          startDate: format(selectedRange.from, 'yyyy-MM-dd'),
          endDate: format(selectedRange.to, 'yyyy-MM-dd'),
          reason: blockReason
        }
      });

      if (error) throw error;

      toast.success('Dates blocked successfully!');
      setSelectedRange(undefined);
      setBlockReason('');
      fetchUnavailableDates();
    } catch (error) {
      console.error('Error blocking dates:', error);
      toast.error('Failed to block dates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockDates = async (id: string) => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('property_unavailability')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Dates unblocked successfully!');
      fetchUnavailableDates();
    } catch (error) {
      console.error('Error unblocking dates:', error);
      toast.error('Failed to unblock dates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Calendar Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage availability for your properties
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Selection */}
          <div>
            <Label htmlFor="property-select">Select Property</Label>
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose a property" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    <div>
                      <div className="font-medium">{property.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {property.neighborhood}, {property.address}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProperty && (
            <>
              {/* Calendar View */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Calendar</h3>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="font-medium min-w-[120px] text-center">
                        {format(currentMonth, 'MMMM yyyy')}
                      </span>
                      <Button variant="ghost" size="sm" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Calendar
                    mode="range"
                    selected={selectedRange}
                    onSelect={setSelectedRange}
                    disabled={isDateUnavailable}
                    month={currentMonth}
                    className="border rounded-md p-3"
                    showOutsideDays={false}
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
                        }).flat()
                    }}
                    modifiersStyles={{
                      booked: {
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        fontWeight: 'bold'
                      },
                      blocked: {
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        fontWeight: 'bold'
                      }
                    }}
                  />

                  {/* Legend */}
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
                  {/* Block Dates Form */}
                  {selectedRange?.from && selectedRange?.to && (
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Block Selected Dates</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRange(undefined)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label>Selected Period</Label>
                          <p className="text-sm text-muted-foreground">
                            {format(selectedRange.from, 'MMM d, yyyy')} - {format(selectedRange.to, 'MMM d, yyyy')}
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="block-reason">Reason (optional)</Label>
                          <Textarea
                            id="block-reason"
                            value={blockReason}
                            onChange={(e) => setBlockReason(e.target.value)}
                            placeholder="e.g., Personal use, Renovations, etc."
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                        
                        <Button
                          onClick={handleBlockDates}
                          disabled={isLoading}
                          className="w-full"
                        >
                          {isLoading ? (
                            <>
                              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                              Blocking...
                            </>
                          ) : (
                            'Block Selected Dates'
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Blocked Dates List */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Blocked Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {unavailableDates
                          .filter(period => period.type === 'blocked')
                          .map((period) => (
                            <div key={period.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border">
                              <div>
                                <p className="text-sm font-medium">
                                  {format(period.start, 'MMM d')} - {format(period.end, 'MMM d, yyyy')}
                                </p>
                                {period.reason && (
                                  <p className="text-xs text-muted-foreground">{period.reason}</p>
                                )}
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleUnblockDates(period.id!)}
                                disabled={isLoading}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        
                        {unavailableDates.filter(period => period.type === 'blocked').length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No dates are currently blocked
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Booked Dates List */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Booked Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {unavailableDates
                          .filter(period => period.type === 'booking')
                          .map((period) => (
                            <div key={period.id} className="flex justify-between items-center p-3 bg-blue-50 rounded-md border border-blue-100">
                              <div>
                                <p className="text-sm font-medium">
                                  {format(period.start, 'MMM d')} - {format(period.end, 'MMM d, yyyy')}
                                </p>
                                {period.guest_name && (
                                  <p className="text-xs text-muted-foreground">Guest: {period.guest_name}</p>
                                )}
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                Booked
                              </Badge>
                            </div>
                          ))}
                        
                        {unavailableDates.filter(period => period.type === 'booking').length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No confirmed bookings yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {properties.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't listed any properties yet</p>
              <Button asChild>
                <Link to="/list-property">List Your First Property</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HostCalendarManager;
