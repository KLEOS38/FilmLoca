import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Star, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { bookingSchema } from "@/lib/validation";
import { usePaystackPayment } from "@/hooks/usePaystackPayment";
import { format, differenceInCalendarDays } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingCardProps {
  propertyId: string;
  price: number;
  rating: number;
  reviewCount: number;
  days: number;
  setDays: (days: number) => void;
  selectedStartDate?: Date | null;
  selectedEndDate?: Date | null;
  onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const BookingCard = ({
  propertyId,
  price,
  rating,
  reviewCount,
  days,
  setDays,
  selectedStartDate,
  selectedEndDate,
  onDateChange,
}: BookingCardProps) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [checkInTime, setCheckInTime] = useState("09:00");
  const [checkOutTime, setCheckOutTime] = useState("10:00");
  const [bookingType, setBookingType] = useState<"hourly" | "daily" | "">("");
  const [notes, setNotes] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { initializePayment, paymentState } = usePaystackPayment();
  const { isLoading } = paymentState;

  // Sync with parent component dates
  useEffect(() => {
    if (selectedStartDate) {
      setCheckIn(format(selectedStartDate, "yyyy-MM-dd"));
    }
    if (selectedEndDate) {
      setCheckOut(format(selectedEndDate, "yyyy-MM-dd"));
    }
  }, [selectedStartDate, selectedEndDate]);

  // Calculate days when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const daysDiff = Math.max(
        1,
        differenceInCalendarDays(new Date(checkOut), new Date(checkIn)),
      );
      setDays(daysDiff);
    }
  }, [checkIn, checkOut, setDays]);

  const handleDateChange = (field: "checkIn" | "checkOut", value: string) => {
    if (field === "checkIn") {
      setCheckIn(value);
      if (onDateChange) {
        onDateChange(value ? new Date(value) : null, selectedEndDate);
      }
    } else {
      setCheckOut(value);
      if (onDateChange) {
        onDateChange(selectedStartDate, value ? new Date(value) : null);
      }
    }
  };

  const handleBooking = async () => {
    console.log("Booking started with data:", {
      propertyId,
      checkIn,
      checkOut,
      checkInTime,
      notes,
      price,
      days,
      user: user?.id,
    });

    if (!user) {
      toast.error("Please sign in to book this location");
      navigate("/auth");
      return;
    }

    // Validate dates make sense
    if (checkIn >= checkOut) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    // Validate input
    const validation = bookingSchema.safeParse({
      property_id: propertyId,
      start_date: checkIn,
      end_date: checkOut,
      check_in_time: checkInTime,
      notes: notes.trim(),
    });

    if (!validation.success) {
      console.error("Validation errors:", validation.error.errors);
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    console.log("Validation passed, starting booking process...");
    setIsBooking(true);

    try {
      // Guard against zero hours/days being sent to Paystack
      const safeAmount = bookingType === "hourly" ? 1 : Math.max(1, days);
      const totalPrice = bookingType === "hourly" ? price : price * safeAmount;
      console.log(
        "Total price calculated:",
        totalPrice,
        "for",
        bookingType === "hourly" ? "1 hour" : `${safeAmount} days`,
      );

      // Validate hours/days before proceeding
      if (bookingType === "hourly" && price <= 0) {
        toast.error("Invalid hourly rate");
        return;
      }
      if (bookingType === "daily" && safeAmount <= 0) {
        toast.error("Invalid booking duration");
        return;
      }

      // For mock data, we'll skip the property lookup and use mock data
      let propertyTitle = "Property";

      // Get property details from database (required for real bookings)
      try {
        const { data: property, error: propertyError } = await supabase
          .from("properties")
          .select("id, title, owner_id, is_published")
          .eq("id", propertyId)
          .single();

        if (propertyError) {
          console.error("❌ Error fetching property:", propertyError);
          // If it's a UUID format, this is an error (property should exist)
          if (
            propertyId.match(
              /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
            )
          ) {
            throw new Error(`Property not found: ${propertyError.message}`);
          }
          // Otherwise, it might be mock data, continue with default title
          console.log(
            "⚠️ Property not found in database, continuing with default title",
          );
        } else if (property) {
          if (!property.is_published) {
            throw new Error("This property is not available for booking.");
          }
          propertyTitle = property.title;
          console.log("✅ Property found:", propertyTitle);
        }
      } catch (error) {
        console.error("❌ Property lookup error:", error);
        // If it's a validation error, throw it
        const errorMessage = error instanceof Error ? error.message : "";
        if (
          errorMessage.includes("not available") ||
          errorMessage.includes("not found")
        ) {
          throw error;
        }
        // Otherwise, continue (might be mock data)
        console.log("⚠️ Continuing with default property title");
      }

      console.log("Initializing payment with:", {
        propertyId,
        startDate: checkIn,
        endDate: checkOut,
        totalAmount: totalPrice,
        checkInTime,
        propertyTitle,
      });

      // Initialize Paystack payment
      const paymentResult = await initializePayment(
        {
          propertyId,
          startDate: checkIn,
          endDate: checkOut,
          totalAmount: totalPrice,
          checkInTime,
          notes: notes.trim() || undefined,
          propertyTitle,
        },
        user?.email || "",
        user?.user_metadata?.name || "User",
      );

      console.log("Payment result:", paymentResult);

      if (paymentResult.success) {
        toast.success("Opening payment window...");
      } else {
        throw new Error(paymentResult.error || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to process booking. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsBooking(false);
    }
  };

  const totalPrice = bookingType ? (bookingType === "hourly" ? price : price * days) : 0;

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-gray-50 to-white p-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-black to-[#ff0000] bg-clip-text text-transparent">
              ₦{price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              {bookingType ? `/${bookingType === "hourly" ? "hour" : "day"}` : "/unit"}
            </span>
          </div>
          <div className="flex items-center text-sm">
            {rating > 0 && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />}
            <span>{rating > 0 ? rating.toFixed(1) : "0 reviews"}</span>
            {rating > 0 && <span className="text-muted-foreground">({reviewCount})</span>}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 px-2">
        {/* Booking Type Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Booking Type</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={bookingType === "hourly" ? "default" : "outline"}
              className={`py-3 transition-all ${
                bookingType === "hourly" 
                  ? "bg-black hover:bg-gray-900 border-black text-white" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setBookingType("hourly")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Hourly
            </Button>
            <Button
              variant={bookingType === "daily" ? "default" : "outline"}
              className={`py-3 transition-all ${
                bookingType === "daily" 
                  ? "bg-black hover:bg-gray-900 border-black text-white" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setBookingType("daily")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Daily
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="checkin" className="text-sm font-medium text-gray-700">
              {bookingType === "hourly" ? "Booking Date" : "Check-in Date"}
            </Label>
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => handleDateChange("checkIn", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="checkout" className="text-sm font-medium text-gray-700">
              {bookingType === "daily" ? "Check-out Date" : "Booking End Time"}
            </Label>
            {bookingType === "daily" ? (
              <Input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => handleDateChange("checkOut", e.target.value)}
                min={checkIn || new Date().toISOString().split("T")[0]}
                className="mt-1"
                required
              />
            ) : (
              <Select value={checkOutTime} onValueChange={setCheckOutTime}>
                <SelectTrigger id="checkout" className="mt-1">
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="07:00">7:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="19:00">7:00 PM</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkintime" className="text-sm font-medium text-gray-700">
            {bookingType === "hourly" ? "Booking Time" : "Check-in Time"}
          </Label>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-nollywood-primary" />
            <Select value={checkInTime} onValueChange={setCheckInTime}>
              <SelectTrigger id="checkintime" className="flex-1">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="06:00">6:00 AM</SelectItem>
                <SelectItem value="09:00">9:00 AM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="18:00">6:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            Available times: 6:00 AM, 9:00 AM, 2:00 PM, 6:00 PM
          </p>
        </div>

        {bookingType === "hourly" && (
          <div className="space-y-2">
            <Label htmlFor="checkout" className="text-sm font-medium text-gray-700">
              Booking End Time
            </Label>
            <Select value={checkOutTime} onValueChange={setCheckOutTime}>
              <SelectTrigger id="checkout" className="mt-1">
                <SelectValue placeholder="Select end time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="07:00">7:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="15:00">3:00 PM</SelectItem>
                <SelectItem value="19:00">7:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
            Special Requests (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any special requirements or questions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 500))}
            maxLength={500}
            className="resize-none"
            rows={3}
          />
        </div>

        {checkIn && (bookingType === "daily" ? checkOut : true) && bookingType && (
          <div className="pt-4 space-y-3">
            <div className="bg-gradient-to-r from-[#ff0000]/5 to-black/5 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  ₦{price.toLocaleString()}/{bookingType === "hourly" ? "hour" : "day"} × {bookingType === "hourly" ? "1 hour" : `${days} days`}
                </span>
                <span className="font-semibold text-gray-900">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total</span>
                <span className="text-xl font-bold text-nollywood-primary">
                  ₦{totalPrice.toLocaleString()}
                </span>
                {bookingType === "daily" && days > 1 && (
                  <span className="text-xs text-gray-500 ml-2">
                    {days} days
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 px-2">
        <Button
          className="w-full bg-gradient-to-r from-black to-[#ff0000] hover:from-gray-900 hover:to-[#cc0000] text-white font-semibold py-3 transition-all shadow-lg"
          onClick={handleBooking}
          disabled={
            !checkIn ||
            !bookingType ||
            (bookingType === "daily" && !checkOut) ||
            (bookingType === "hourly" && !checkOutTime) ||
            !checkInTime ||
            days <= 0 ||
            checkIn >= checkOut ||
            isBooking ||
            isLoading
          }
        >
          {isBooking || isLoading ? (
            <>
              <CreditCard className="h-4 w-4 mr-2 animate-pulse" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Book Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
