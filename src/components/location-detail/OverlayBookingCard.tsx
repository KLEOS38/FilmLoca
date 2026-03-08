import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingCard from "./BookingCard";

interface OverlayBookingCardProps {
  isOpen: boolean;
  onClose: () => void;
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

const OverlayBookingCard = ({
  isOpen,
  onClose,
  propertyId,
  price,
  rating,
  reviewCount,
  days,
  setDays,
  selectedStartDate,
  selectedEndDate,
  onDateChange,
}: OverlayBookingCardProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg mx-auto">
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute -top-12 right-0 text-white hover:bg-white/20 md:-top-14"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="bg-white rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto md:max-h-[90vh]">
          <BookingCard
            propertyId={propertyId}
            price={price}
            rating={rating}
            reviewCount={reviewCount}
            days={days}
            setDays={setDays}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateChange={onDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OverlayBookingCard;
