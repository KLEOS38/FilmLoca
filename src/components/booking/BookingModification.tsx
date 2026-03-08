import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Clock, Edit, Trash2, X, Check, AlertTriangle, MessageSquare, CalendarIcon } from "lucide-react";
import { format, addDays, differenceInDays, isAfter, isBefore } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { calculateRefund, canCancelBooking as canCancelByPolicy, getCancellationPolicyInfo } from "@/utils/cancellationUtils";

interface Booking {
  id: string;
  property_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  status: string;
  total_price: number;
  property_title: string;
  property_address: string;
  created_at: string;
  modification_requests?: ModificationRequest[];
}

interface ModificationRequest {
  id: string;
  booking_id: string;
  new_start_date: string;
  new_end_date: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  response_message?: string;
}

const BookingModification: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModifying, setIsModifying] = useState(false);
  const [newStartDate, setNewStartDate] = useState<Date>();
  const [newEndDate, setNewEndDate] = useState<Date>();
  const [modificationReason, setModificationReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);

  const fetchUserBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      // Fetch real bookings from Supabase
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select(
          `
          id,
          property_id,
          user_id,
          start_date,
          end_date,
          status,
          total_price,
          payment_status,
          created_at,
          properties:property_id(
            id,
            title,
            address
          )
        `,
        )
        .eq("user_id", user.id)
        .in("status", ["confirmed", "completed", "pending"])
        .order("created_at", { ascending: false });

      if (bookingError) {
        console.error("Error fetching bookings:", bookingError);
        setBookings([]);
        setIsLoading(false);
        return;
      }

      // Transform the data to match Booking interface
      const transformedBookings: Booking[] = (bookingData || []).map(
        (booking: {
          id: string;
          property_id: string;
          user_id: string;
          start_date: string;
          end_date: string;
          status: string;
          total_price: number;
          created_at: string;
          properties?: { title?: string; address?: string };
        }) => {
          // Normalize status: ensure it's never "approved" or contains "approved"
          // Booking status should only be: confirmed, completed, pending, cancelled
          let normalizedStatus = booking.status?.toLowerCase() || "pending";

          // If status contains "approved", extract just the booking status part
          if (normalizedStatus.includes("approved")) {
            // Extract the main status (e.g., "confirmed and approved" -> "confirmed")
            if (normalizedStatus.includes("confirmed")) {
              normalizedStatus = "confirmed";
            } else if (normalizedStatus.includes("completed")) {
              normalizedStatus = "completed";
            } else if (normalizedStatus.includes("pending")) {
              normalizedStatus = "pending";
            } else {
              normalizedStatus = "confirmed"; // Default to confirmed for paid bookings
            }
          }

          return {
            id: booking.id,
            property_id: booking.property_id,
            user_id: booking.user_id,
            start_date: booking.start_date,
            end_date: booking.end_date,
            status: normalizedStatus,
            total_price: booking.total_price || 0,
            property_title: booking.properties?.title || "Unknown Property",
            property_address: booking.properties?.address || "",
            created_at: booking.created_at,
            modification_requests: [], // Modification requests would be fetched separately if needed
          };
        },
      );

      setBookings(transformedBookings);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user, fetchUserBookings]);

  const canModifyBooking = (booking: Booking) => {
    const startDate = new Date(booking.start_date);
    const today = new Date();
    const daysUntilStart = differenceInDays(startDate, today);

    return daysUntilStart >= 14 && booking.status === "confirmed";
  };

  const canCancelBooking = (booking: Booking) => {
    const startDate = new Date(booking.start_date);
    return canCancelByPolicy(startDate, booking.status);
  };

  const getModificationStatus = (booking: Booking) => {
    if (
      !booking.modification_requests ||
      booking.modification_requests.length === 0
    ) {
      return null;
    }

    const latestRequest =
      booking.modification_requests[booking.modification_requests.length - 1];
    return latestRequest.status;
  };

  const startModification = (booking: Booking) => {
    const startDate = new Date(booking.start_date);
    const refund = calculateRefund(startDate, booking.total_price);

    if (!refund.canCancel) {
      toast.error(refund.message);
      setEditingBookingId(null);
      return;
    }

    setSelectedBooking(booking);
    setNewStartDate(new Date(booking.start_date));
    setNewEndDate(new Date(booking.end_date));
    setModificationReason("");
    setIsModifying(true);
  };

  const cancelModification = () => {
    setSelectedBooking(null);
    setNewStartDate(undefined);
    setNewEndDate(undefined);
    setModificationReason("");
    setIsModifying(false);
  };

  const startEdit = (booking: Booking) => {
    setEditingBookingId(booking.id);
  };

  const cancelEdit = () => {
    setEditingBookingId(null);
  };

  const submitModificationRequest = async () => {
    if (
      !selectedBooking ||
      !newStartDate ||
      !newEndDate ||
      !modificationReason.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const daysUntilOriginalStart = differenceInDays(
      new Date(selectedBooking.start_date),
      new Date(),
    );
    
    const refund = calculateRefund(new Date(selectedBooking.start_date), selectedBooking.total_price);
    
    if (!refund.canCancel) {
      toast.error(refund.message);
      return;
    }

    const newStart = newStartDate.toISOString().split("T")[0];
    const newEnd = newEndDate.toISOString().split("T")[0];

    if (newStart >= newEnd) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    try {
      // Persist updated dates to Supabase first
      const { error: updateError } = await supabase
        .from("bookings")
        .update({
          start_date: newStart,
          end_date: newEnd,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedBooking.id)
        .eq("user_id", user?.id ?? "");

      if (updateError) {
        console.error("Error updating booking dates:", updateError);
        toast.error("Failed to update booking dates. Please try again.");
        return;
      }

      // Supabase update successful - now update local state
      const modificationRequest: ModificationRequest = {
        id: Date.now().toString(),
        booking_id: selectedBooking.id,
        new_start_date: newStart,
        new_end_date: newEnd,
        reason: modificationReason,
        status: "approved",
        created_at: new Date().toISOString(),
        response_message: "Date change request automatically approved",
      };

      // Reflect changes in local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                start_date: newStart,
                end_date: newEnd,
                modification_requests: [
                  ...(booking.modification_requests || []),
                  modificationRequest,
                ],
              }
            : booking,
        ),
      );

      toast.success("Booking dates updated successfully!");

      // Refetch booking data to ensure consistency with server
      await fetchUserBookings();

      cancelModification();
      setEditingBookingId(null);
    } catch (error) {
      console.error("Error submitting modification request:", error);
      toast.error("Failed to update booking. Please try again.");
    }
  };

  const cancelBooking = async (booking: Booking) => {
    const startDate = new Date(booking.start_date);
    const refund = calculateRefund(startDate, booking.total_price);

    if (!refund.canCancel) {
      toast.error(refund.message);
      setEditingBookingId(null);
      return;
    }

    const confirmMessage = `Are you sure you want to cancel this booking? ${refund.message}. This action cannot be undone.`;

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      // Persist cancellation to Supabase first
      const { error: cancelError } = await supabase
        .from("bookings")
        .update({
          status: "cancelled",
          payment_status: "refund_pending",
          refund_amount: refund.refundAmount,
          refund_percentage: refund.refundPercentage,
          processing_fee: refund.processingFee,
          updated_at: new Date().toISOString(),
        })
        .eq("id", booking.id)
        .eq("user_id", user?.id ?? "");

      if (cancelError) {
        console.error("Error cancelling booking:", cancelError);
        toast.error("Failed to cancel booking. Please try again.");
        return;
      }

      // Supabase update successful - now update local state
      setBookings((prev) =>
        prev.map((b) =>
          b.id === booking.id ? { ...b, status: "cancelled" } : b,
        ),
      );

      // Show success message with refund details
      const refundMessage = refund.refundAmount > 0 
        ? `Booking cancelled successfully. Refund of $${refund.refundAmount.toFixed(2)} (${refund.refundPercentage}%) will be processed.`
        : "Booking cancelled successfully. No refund available based on cancellation policy.";
      
      toast.success(refundMessage);

      // Refetch booking data to ensure consistency with server
      await fetchUserBookings();

      setEditingBookingId(null);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <span className="ml-2">Loading slates...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Slates</h1>
        <Badge variant="outline">
          {bookings.length} slate{bookings.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No slates found</h3>
            <p className="text-muted-foreground mb-4">
              You haven't created any slates yet. Start exploring properties!
            </p>
            <Button onClick={() => (window.location.href = "/locations")}>
              Browse Properties
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const canModify = canModifyBooking(booking);
            const canCancel = canCancelBooking(booking);
            const modificationStatus = getModificationStatus(booking);
            const daysUntilStart = differenceInDays(
              new Date(booking.start_date),
              new Date(),
            );
            const policyInfo = getCancellationPolicyInfo(
              new Date(booking.start_date),
              booking.total_price
            );

            return (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {booking.property_title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {booking.property_address}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Normalize status display - ensure it never shows "approved" */}
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : booking.status === "completed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {booking.status === "confirmed"
                          ? "Confirmed"
                          : booking.status === "completed"
                            ? "Completed"
                            : booking.status === "pending"
                              ? "Pending"
                              : booking.status === "cancelled" ||
                                  booking.status === "canceled"
                                ? "Cancelled"
                                : "Confirmed"}
                      </Badge>
                      {/* Only show modification status for pending requests, not approved ones */}
                      {modificationStatus &&
                        modificationStatus === "pending" && (
                          <Badge variant="secondary">
                            Modification Pending
                          </Badge>
                        )}
                      {modificationStatus &&
                        modificationStatus === "rejected" && (
                          <Badge variant="destructive">
                            Modification Rejected
                          </Badge>
                        )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking.start_date), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking.end_date), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Price</p>
                      <p className="text-sm text-muted-foreground">
                        ₦{booking.total_price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Cancellation Policy Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-800">Cancellation Policy</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-blue-700">
                          <strong>Current Status:</strong> {policyInfo.currentTier}
                        </p>
                        <p className="text-blue-700">
                          <strong>Time Left:</strong> {policyInfo.timeLeft}
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-700">
                          <strong>Refund Amount:</strong> ₦{policyInfo.refundAmount.toLocaleString()}
                        </p>
                        <p className="text-blue-700">
                          <strong>Status:</strong> {policyInfo.canCancel ? 'Can Cancel' : 'Cannot Cancel'}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">{policyInfo.message}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {daysUntilStart} days until check-in
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const subject = `Slate Dispute: ${booking.id}`;
                          const body = `Hello Admin,

I'd like to raise a dispute for slate with reference/ID: ${booking.id}.

Property: ${booking.property_title}
Dates: ${format(new Date(booking.start_date), "MMM d, yyyy")} - ${format(new Date(booking.end_date), "MMM d, yyyy")}

Concern:
`;
                          const mailtoLink = `mailto:hello@filmloca.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                          window.location.href = mailtoLink;
                        }}
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Dispute
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-black text-white hover:bg-black/90"
                        onClick={() =>
                          navigate(
                            `/profile?tab=messages&bookingId=${booking.id}&propertyId=${booking.property_id}`,
                          )
                        }
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message Host
                      </Button>
                      {editingBookingId === booking.id ? (
                        // Show Change Date and Cancel buttons when editing
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startModification(booking)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Change Date
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => cancelBooking(booking)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Cancellation
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={cancelEdit}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : // Show EDIT button when not editing
                      booking.status === "confirmed" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(booking)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          EDIT
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Cannot edit this slate</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Modification Modal */}
      {isModifying && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Change Slate Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  Property: {selectedBooking.property_title}
                </p>
                <p className="text-sm text-muted-foreground">
                  Current dates:{" "}
                  {format(new Date(selectedBooking.start_date), "MMM dd")} -{" "}
                  {format(new Date(selectedBooking.end_date), "MMM dd, yyyy")}
                </p>
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-xs text-blue-800">
                    <strong>14-Day Rule:</strong> Date changes and cancellations
                    can only be done up to 14 days before check-in for a full
                    refund.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">New Check-in</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newStartDate
                          ? format(newStartDate, "MMM dd, yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newStartDate}
                        onSelect={setNewStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm font-medium">New Check-out</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEndDate
                          ? format(newEndDate, "MMM dd, yyyy")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newEndDate}
                        onSelect={setNewEndDate}
                        disabled={(date) => date < (newStartDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Reason for change</label>
                <Input
                  placeholder="Please explain why you need to change the dates..."
                  value={modificationReason}
                  onChange={(e) => setModificationReason(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={submitModificationRequest} className="flex-1">
                  <Save className="h-4 w-4 mr-1" />
                  Change Date
                </Button>
                <Button variant="outline" onClick={cancelModification}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BookingModification;
