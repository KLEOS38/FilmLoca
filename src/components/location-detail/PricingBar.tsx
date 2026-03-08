import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePaystackPayment } from "@/hooks/usePaystackPayment";
import { CreditCard, Calendar, X } from "lucide-react";
import { format, addDays, isBefore, differenceInCalendarDays } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface PricingBarProps {
  price: number;
  days: number;
  setDays: (days: number) => void;
  propertyId?: string;
  propertyTitle?: string;
  selectedStartDate?: Date | null;
  selectedEndDate?: Date | null;
}

const PricingBar = ({
  price,
  days,
  setDays,
  propertyId = "",
  propertyTitle = "Selected Property",
  selectedStartDate,
  selectedEndDate,
}: PricingBarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { initializePayment, paymentState } = usePaystackPayment();
  const [startDate, setStartDate] = useState<Date | undefined>(
    selectedStartDate || undefined,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    selectedEndDate || undefined,
  );
  const [showCalendar, setShowCalendar] = useState(false);

  // Update local state when props change
  useEffect(() => {
    if (selectedStartDate) setStartDate(selectedStartDate);
    if (selectedEndDate) setEndDate(selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  const totalPrice = price * days;
  const hasDates = startDate && endDate;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // If no start date or both dates are selected, set new start date
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(undefined);
    }
    // If start date is set but end date is not, set end date (must be after start date)
    else if (isBefore(startDate, date)) {
      setEndDate(date);
      const daysDiff = Math.max(1, differenceInCalendarDays(date, startDate));
      setDays(daysDiff);
      setShowCalendar(false);
    }
  };

  const clearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleBookNow = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }

    if (!user) {
      toast.error("Please sign in to book this location");
      navigate("/auth");
      return;
    }

    // Dates are already in the correct format

    console.log("PricingBar Book Now clicked!", {
      user: user.id,
      propertyId,
      propertyTitle,
      startDate,
      endDate,
      days,
      totalPrice,
    });

    try {
      // Initialize payment directly
      const paymentResult = await initializePayment(
        {
          propertyId,
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
          totalAmount: Math.max(totalPrice, price), // Ensure minimum of 1 day's price
          checkInTime: "09:00", // Default check-in time for pricing bar
          notes: undefined,
          propertyTitle,
        },
        user.email || "",
        user.user_metadata?.name || "User",
      );

      console.log("PricingBar payment result:", paymentResult);

      if (paymentResult.success) {
        toast.success("Opening payment window...");
      } else {
        throw new Error(paymentResult.error || "Payment initialization failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to process booking. Please try again.";
      console.error("PricingBar booking error:", error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
      <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
        <span className="text-muted-foreground text-sm">Price per day</span>
        <span className="text-2xl font-bold">₦{price.toLocaleString()}</span>
      </div>

      <div className="w-full sm:w-auto">
        <Popover open={showCalendar} onOpenChange={setShowCalendar}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal text-sm",
                !startDate && "text-muted-foreground",
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {startDate ? (
                endDate ? (
                  <>
                    <span className="text-blue-600 font-medium">
                      {format(startDate, "MMM d")}
                    </span>
                    <span className="mx-1 text-muted-foreground">to</span>
                    <span className="text-green-600 font-medium">
                      {format(endDate, "MMM d, yyyy")}
                    </span>
                    <X
                      className="ml-auto h-4 w-4 opacity-50 hover:opacity-100"
                      onClick={clearDates}
                    />
                  </>
                ) : (
                  <span className="text-blue-600 font-medium">
                    {format(startDate, "MMM d, yyyy")}
                  </span>
                )
              ) : (
                <span>Select dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={startDate}
              onSelect={handleDateSelect}
              initialFocus
              disabled={(date) => date < addDays(new Date(), -1)}
              className="border-0"
              modifiers={{
                start: startDate,
                end: endDate,
              }}
              modifiersStyles={{
                start: {
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "6px 0 0 6px",
                },
                end: {
                  backgroundColor: "#16a34a",
                  color: "white",
                  borderRadius: "0 6px 6px 0",
                },
                range_middle: {
                  backgroundColor: "#dbeafe",
                },
              }}
            />
            {startDate && !endDate && (
              <div className="p-2 text-center text-sm text-muted-foreground">
                Select end date
              </div>
            )}
          </PopoverContent>
        </Popover>

        {hasDates && (
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-muted-foreground">
              {days} {days === 1 ? "day" : "days"}
            </span>
            <span className="font-medium">
              Total: ₦{totalPrice.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <Button
        size="sm"
        className="w-full sm:w-auto text-sm"
        onClick={handleBookNow}
        disabled={paymentState.isLoading || !hasDates || days <= 0}
      >
        {paymentState.isLoading ? (
          <span className="flex items-center gap-1">
            <CreditCard className="h-3 w-3 animate-pulse" />
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            {hasDates ? "Book Now" : "Select Dates"}
          </span>
        )}
      </Button>
    </div>
  );
};

export default PricingBar;
