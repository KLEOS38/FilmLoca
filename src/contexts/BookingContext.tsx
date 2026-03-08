import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookingState {
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  bookingType: "hourly" | "daily" | "";
  notes: string;
}

interface BookingContextType {
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  resetBookingState: () => void;
}

const initialBookingState: BookingState = {
  checkIn: "",
  checkOut: "",
  checkInTime: "",
  checkOutTime: "10:00",
  bookingType: "",
  notes: "",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  };

  const resetBookingState = () => {
    setBookingState(initialBookingState);
  };

  return (
    <BookingContext.Provider value={{ bookingState, updateBookingState, resetBookingState }}>
      {children}
    </BookingContext.Provider>
  );
};
