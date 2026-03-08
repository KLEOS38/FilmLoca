import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CreditCard } from "lucide-react";

interface MiniBookingTriggerProps {
  price: number;
  rating: number;
  reviewCount: number;
  onClick: () => void;
  isOpen: boolean;
}

const MiniBookingTrigger = ({
  price,
  rating,
  reviewCount,
  onClick,
  isOpen,
}: MiniBookingTriggerProps) => {
  return (
    <div className="fixed bottom-4 left-4 z-50 md:bottom-6 md:left-6">
      <Button
        onClick={onClick}
        className={`bg-gradient-to-r from-[#ff0000] to-black hover:from-[#cc0000] hover:to-gray-900 text-white shadow-2xl transition-all duration-300 px-4 py-3 h-auto animate-pulse-slow md:px-6 md:py-4 ${
          isOpen ? "scale-95 opacity-80 animate-none" : "scale-100 opacity-100"
        }`}
        size="lg"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <span className="text-base font-bold md:text-lg">₦{price.toLocaleString()}</span>
              <span className="text-xs opacity-80">/day</span>
            </div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <Calendar className="h-3 w-3" />
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm font-medium">
              {isOpen ? "Close" : "Book"}
            </span>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default MiniBookingTrigger;
