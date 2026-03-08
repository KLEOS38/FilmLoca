import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, X } from 'lucide-react';
import { format, addDays, isBefore, isAfter, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface AvailabilityDate {
  date: string;
  status: 'available' | 'blocked' | 'booked';
  reason?: string;
}

interface PropertyAvailabilityCalendarProps {
  onAvailabilityChange: (availability: AvailabilityDate[]) => void;
  initialAvailability?: AvailabilityDate[];
}

const PropertyAvailabilityCalendar: React.FC<PropertyAvailabilityCalendarProps> = ({
  onAvailabilityChange,
  initialAvailability = []
}) => {
  const [availability, setAvailability] = useState<AvailabilityDate[]>(initialAvailability);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [blockReason, setBlockReason] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    onAvailabilityChange(availability);
  }, [availability, onAvailabilityChange]);

  const getDateStatus = (date: Date): 'available' | 'blocked' | 'booked' => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const availabilityItem = availability.find(item => item.date === dateStr);
    return availabilityItem?.status || 'available';
  };

  const isDateDisabled = (date: Date): boolean => {
    return isBefore(date, new Date());
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || isBefore(date, new Date())) return;
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const blockDate = () => {
    if (!selectedDate) return;

    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const existingIndex = availability.findIndex(item => item.date === dateStr);

    const newAvailability = [...availability];
    if (existingIndex >= 0) {
      newAvailability[existingIndex] = {
        date: dateStr,
        status: 'blocked',
        reason: blockReason || 'Blocked by owner'
      };
    } else {
      newAvailability.push({
        date: dateStr,
        status: 'blocked',
        reason: blockReason || 'Blocked by owner'
      });
    }

    setAvailability(newAvailability);
    setBlockReason('');
    setSelectedDate(undefined);
  };

  const unblockDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const newAvailability = availability.filter(item => item.date !== dateStr);
    setAvailability(newAvailability);
  };

  const blockDateRange = () => {
    if (!selectedDate) return;

    const startDate = selectedDate;
    const endDate = addDays(startDate, 6); // Block for a week

    const newAvailability = [...availability];
    
    for (let d = new Date(startDate); d <= endDate; d = addDays(d, 1)) {
      if (isBefore(d, new Date())) continue;
      
      const dateStr = format(d, 'yyyy-MM-dd');
      const existingIndex = newAvailability.findIndex(item => item.date === dateStr);
      
      if (existingIndex >= 0) {
        newAvailability[existingIndex] = {
          date: dateStr,
          status: 'blocked',
          reason: blockReason || 'Blocked by owner'
        };
      } else {
        newAvailability.push({
          date: dateStr,
          status: 'blocked',
          reason: blockReason || 'Blocked by owner'
        });
      }
    }

    setAvailability(newAvailability);
    setBlockReason('');
    setSelectedDate(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      case 'booked': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return '✅';
      case 'blocked': return '🚫';
      case 'booked': return '📅';
      default: return '❓';
    }
  };

  const blockedDates = availability.filter(item => item.status === 'blocked');
  const availableDates = availability.filter(item => item.status === 'available');
  const bookedDates = availability.filter(item => item.status === 'booked');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Property Availability
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Set your property's availability calendar. Block dates when your property is not available for filming.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border"
              modifiers={{
                blocked: availability
                  .filter(item => item.status === 'blocked')
                  .map(item => new Date(item.date)),
                booked: availability
                  .filter(item => item.status === 'booked')
                  .map(item => new Date(item.date))
              }}
              modifiersStyles={{
                blocked: {
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontWeight: 'bold'
                },
                booked: {
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontWeight: 'bold'
                }
              }}
            />
          </div>

          <div className="lg:w-80 space-y-4">
            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Selected Date</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Block Reason */}
            {selectedDate && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Block Reason (Optional)</label>
                <input
                  type="text"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  placeholder="e.g., Personal use, Maintenance"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            )}

            {/* Action Buttons */}
            {selectedDate && (
              <div className="space-y-2">
                <Button
                  onClick={blockDate}
                  className="w-full"
                  variant="destructive"
                >
                  Block This Date
                </Button>
                <Button
                  onClick={blockDateRange}
                  className="w-full"
                  variant="outline"
                >
                  Block Week (7 days)
                </Button>
              </div>
            )}

            {/* Legend */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 border border-green-200 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 border border-red-200 rounded"></div>
                  <span>Blocked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-black border border-gray-200 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blocked Dates List */}
        {blockedDates.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Blocked Dates ({blockedDates.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {blockedDates.map((item) => (
                <div
                  key={item.date}
                  className="flex items-center justify-between p-2 bg-red-50 border border-red-200 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">🚫</span>
                    <div>
                      <p className="text-sm font-medium">
                        {format(new Date(item.date), 'MMM d, yyyy')}
                      </p>
                      {item.reason && (
                        <p className="text-xs text-muted-foreground">
                          {item.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => unblockDate(new Date(item.date))}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{availableDates.length}</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{blockedDates.length}</p>
            <p className="text-xs text-muted-foreground">Blocked</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{bookedDates.length}</p>
            <p className="text-xs text-muted-foreground">Booked</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { PropertyAvailabilityCalendar };
export default PropertyAvailabilityCalendar;
