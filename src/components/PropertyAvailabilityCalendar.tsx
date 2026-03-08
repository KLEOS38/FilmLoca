import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AvailabilityDate {
  date: Date;
  available: boolean;
  price?: number;
}

interface PropertyAvailabilityCalendarProps {
  onAvailabilityChange?: (availability: AvailabilityDate[]) => void;
  initialAvailability?: AvailabilityDate[];
}

const PropertyAvailabilityCalendar: React.FC<PropertyAvailabilityCalendarProps> = ({
  onAvailabilityChange,
  initialAvailability = []
}) => {
  const [availability, setAvailability] = useState<AvailabilityDate[]>(initialAvailability);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    setIsOpen(true);
  };

  const updateAvailability = (date: Date, updates: Partial<AvailabilityDate>) => {
    const existingIndex = availability.findIndex(
      item => item.date.toDateString() === date.toDateString()
    );

    let newAvailability: AvailabilityDate[];
    
    if (existingIndex >= 0) {
      newAvailability = availability.map((item, index) => 
        index === existingIndex ? { ...item, ...updates } : item
      );
    } else {
      newAvailability = [...availability, { date, available: true, ...updates }];
    }

    setAvailability(newAvailability);
    onAvailabilityChange?.(newAvailability);
  };


  const getDateStatus = (date: Date) => {
    const availabilityItem = availability.find(
      item => item.date.toDateString() === date.toDateString()
    );
    
    if (!availabilityItem) return 'available'; // Default to available
    if (availabilityItem.available) return 'available';
    return 'unavailable';
  };

  const getDateClassName = (date: Date) => {
    const status = getDateStatus(date);
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'unavailable':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-green-100 text-green-800 hover:bg-green-200'; // Default to green
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'unavailable':
        return <Badge className="bg-red-100 text-red-800">Unavailable</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Property Availability Calendar
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          All dates are available by default (green). Click on any date to mark it as unavailable (red) when your property cannot be booked.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
            modifiers={{
              available: availability
                .filter(item => item.available)
                .map(item => item.date),
              unavailable: availability
                .filter(item => !item.available)
                .map(item => item.date)
            }}
            modifiersStyles={{
              available: { backgroundColor: '#dcfce7', color: '#166534' },
              unavailable: { backgroundColor: '#fecaca', color: '#991b1b' }
            }}
            components={{
              Day: ({ date, displayMonth }) => {
                const status = getDateStatus(date);
                const isCurrentMonth = date.getMonth() === displayMonth.getMonth();
                
                if (!isCurrentMonth) {
                  return <div className="h-9 w-9" />;
                }
                
                return (
                  <button
                    className={`h-9 w-9 rounded-md text-sm font-normal transition-colors ${
                      status === 'unavailable'
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              }
            }}
          />
        </div>

        {/* Date Status Popover */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">
                  {selectedDate ? format(selectedDate, 'PPP') : 'Select Date'}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {selectedDate && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Current Status:</span>
                    {getStatusBadge(getDateStatus(selectedDate))}
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        updateAvailability(selectedDate, { available: true });
                        setIsOpen(false);
                      }}
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                      Mark as Available
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        updateAvailability(selectedDate, { available: false });
                        setIsOpen(false);
                      }}
                    >
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                      Mark as Unavailable
                    </Button>

                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Unavailable</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default PropertyAvailabilityCalendar;
