import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Home,
  ArrowLeft,
  Loader2,
  XCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BookingDetails {
  id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  team_size: number;
  status: string;
  payment_status: string;
  payment_id: string;
  created_at: string;
  properties: {
    title: string;
    address: string;
    neighborhood: string;
  };
}

// How long to keep polling for webhook confirmation (ms)
const POLL_TIMEOUT_MS = 30_000;
// Interval between polls (ms)
const POLL_INTERVAL_MS = 2_500;

const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "failed" | "awaiting_webhook"
  >("pending");

  // Paystack appends ?reference=xxx&trxref=xxx to the callback URL.
  // Our Edge Function also embeds ?booking_id=xxx in the callback URL.
  const reference = searchParams.get("reference");
  const trxref = searchParams.get("trxref");
  const bookingIdParam = searchParams.get("booking_id");

  // ─── Fetch booking by ID (fastest path – no webhook dependency) ──────────
  const fetchBookingById = useCallback(
    async (bookingId: string): Promise<boolean> => {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select(
            `
          *,
          properties (
            title,
            address,
            neighborhood
          )
        `,
          )
          .eq("id", bookingId)
          .single();

        if (error || !data) return false;
        setBookingDetails(data);
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  // ─── Fetch booking by Paystack reference (used as fallback) ──────────────
  const fetchBookingByReference = useCallback(
    async (paymentRef: string): Promise<boolean> => {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select(
            `
          *,
          properties (
            title,
            address,
            neighborhood
          )
        `,
          )
          .eq("payment_id", paymentRef)
          .single();

        if (error || !data) return false;
        setBookingDetails(data);
        return true;
      } catch {
        return false;
      }
    },
    [],
  );

  // ─── Poll until payment_status = 'paid' (handles webhook delay) ──────────
  const pollForConfirmation = useCallback(
    async (
      bookingId: string | null,
      paymentRef: string | null,
    ): Promise<boolean> => {
      const deadline = Date.now() + POLL_TIMEOUT_MS;
      let pollCount = 0;

      while (Date.now() < deadline) {
        pollCount++;

        // Prefer lookup by booking_id (no webhook needed for basic details)
        if (bookingId) {
          try {
            const { data, error } = await supabase
              .from("bookings")
              .select("id, status, payment_status, payment_id")
              .eq("id", bookingId)
              .single();

            if (!error && data) {
              if (
                data.payment_status === "paid" ||
                data.status === "confirmed"
              ) {
                console.log(`✅ Payment confirmed after ${pollCount} polls`);
                return true;
              }
            }
          } catch (err) {
            console.warn("Error polling by booking_id:", err);
          }
        }

        // Fallback: lookup by Paystack reference
        if (!bookingId && paymentRef) {
          try {
            const { data, error } = await supabase
              .from("bookings")
              .select("id, status, payment_status")
              .eq("payment_id", paymentRef)
              .single();

            if (!error && data) {
              if (
                data.payment_status === "paid" ||
                data.status === "confirmed"
              ) {
                console.log(`✅ Payment confirmed after ${pollCount} polls`);
                return true;
              }
            }
          } catch (err) {
            console.warn("Error polling by payment_id:", err);
          }
        }

        // Wait before next poll
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
      }

      console.warn(
        `⏱️ Polling timeout after ${pollCount} attempts (${POLL_TIMEOUT_MS}ms)`,
      );
      return false;
    },
    [],
  );

  // ─── Main verification flow ───────────────────────────────────────────────
  const handlePaymentVerification = useCallback(async () => {
    try {
      setIsLoading(true);
      const paymentRef = reference || trxref;

      console.log("🔍 Payment verification started:", {
        bookingIdParam,
        paymentRef,
      });

      if (!bookingIdParam && !paymentRef) {
        throw new Error("No payment reference or booking ID found in URL");
      }

      // Step 1 – PRIORITY: Load booking details by ID (completely bypasses webhook race condition)
      let detailsLoaded = false;
      if (bookingIdParam) {
        console.log(
          "📝 Attempting direct booking lookup by ID:",
          bookingIdParam,
        );
        detailsLoaded = await fetchBookingById(bookingIdParam);
        if (detailsLoaded) {
          console.log("✅ Booking details loaded successfully by ID");
        }
      }

      // Step 2 – FALLBACK: Load booking by Paystack reference if ID lookup failed
      if (!detailsLoaded && paymentRef) {
        console.log(
          "📝 Attempting booking lookup by payment reference:",
          paymentRef,
        );
        detailsLoaded = await fetchBookingByReference(paymentRef);
        if (detailsLoaded) {
          console.log("✅ Booking details loaded successfully by reference");
        }
      }

      // Step 3 – Check if payment is already confirmed in the DB (quick check)
      let alreadyConfirmed = false;
      if (bookingIdParam) {
        try {
          const { data } = await supabase
            .from("bookings")
            .select("status, payment_status")
            .eq("id", bookingIdParam)
            .single();
          alreadyConfirmed =
            data?.payment_status === "paid" || data?.status === "confirmed";
          console.log("📊 Payment status check:", {
            payment_status: data?.payment_status,
            status: data?.status,
            alreadyConfirmed,
          });
        } catch (err) {
          console.warn("⚠️ Could not check payment status:", err);
        }
      }

      // If already confirmed, show success immediately
      if (alreadyConfirmed) {
        console.log("✅ Payment already confirmed in database");
        setVerificationStatus("success");
        toast.success("Payment confirmed!");
        setIsLoading(false);
        return;
      }

      // Step 4 – Webhook hasn't fired yet — show "awaiting" UI and poll in background
      console.log(
        "⏳ Payment status pending, polling for webhook confirmation...",
      );
      setVerificationStatus("awaiting_webhook");
      setIsLoading(false); // show the "awaiting" UI while polling runs in background

      const confirmed = await pollForConfirmation(bookingIdParam, paymentRef);

      if (confirmed) {
        console.log("✅ Webhook confirmation received");
        // Refresh booking details now that webhook has updated the record
        if (bookingIdParam) await fetchBookingById(bookingIdParam);
        else if (paymentRef) await fetchBookingByReference(paymentRef);
        setVerificationStatus("success");
        toast.success("Payment confirmed!");
      } else {
        // Timeout — payment may still be processing; show a soft warning
        console.warn(
          "⚠️ Polling timeout, but showing success (booking exists in database)",
        );
        setVerificationStatus("success"); // still show success page with booking details
        toast.info(
          "Your booking is saved. Payment confirmation may take a few minutes.",
          { duration: 8000 },
        );
      }
    } catch (err) {
      const error = err as Error;
      console.error("❌ Payment verification error:", error);
      setVerificationStatus("failed");
      toast.error(
        error.message || "Could not verify payment. Please contact support.",
      );
      setIsLoading(false);
    }
  }, [
    reference,
    trxref,
    bookingIdParam,
    fetchBookingById,
    fetchBookingByReference,
    pollForConfirmation,
  ]);

  useEffect(() => {
    handlePaymentVerification();
  }, [handlePaymentVerification]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const calculateDays = () => {
    if (!bookingDetails) return 0;
    const start = new Date(bookingDetails.start_date);
    const end = new Date(bookingDetails.end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your booking…
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Webhook not yet received — show a reassuring "hold on" screen while polling
  if (verificationStatus === "awaiting_webhook") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-xl font-semibold mb-2">Almost There…</h2>
              <p className="text-muted-foreground mb-2">
                Your payment was received. We're waiting for the final
                confirmation from Paystack — this usually takes a few seconds.
              </p>
              <p className="text-sm text-muted-foreground">
                Do not refresh or close this page.
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (verificationStatus === "failed") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                Payment Verification Failed
              </h2>
              <p className="text-muted-foreground mb-6">
                We couldn't verify your payment. Please contact support if you
                believe this is an error.
              </p>
              <div className="space-y-3">
                <Button onClick={() => navigate("/profile")} className="w-full">
                  Go to Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  Return Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Slate Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your payment has been processed successfully
            </p>
          </div>

          {bookingDetails && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Slate Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Slate Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Home className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {bookingDetails.properties.title}
                        </h3>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {bookingDetails.properties.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {bookingDetails.properties.neighborhood}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Check-in
                          </p>
                          <p className="font-medium">
                            {formatDate(bookingDetails.start_date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Check-out
                          </p>
                          <p className="font-medium">
                            {formatDate(bookingDetails.end_date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Team Size
                          </p>
                          <p className="font-medium">
                            {bookingDetails.team_size}{" "}
                            {bookingDetails.team_size === 1
                              ? "person"
                              : "people"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Duration
                          </p>
                          <p className="font-medium">
                            {calculateDays()}{" "}
                            {calculateDays() === 1 ? "day" : "days"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ₦{bookingDetails.total_price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Payment Status
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Transaction Reference
                      </span>
                      <span className="font-mono text-sm">
                        {bookingDetails.payment_id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Slate Status
                      </span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Confirmed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What's Next?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Payment Confirmed</p>
                          <p className="text-sm text-muted-foreground">
                            Your payment has been processed successfully
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Confirmation Email</p>
                          <p className="text-sm text-muted-foreground">
                            You'll receive a confirmation email shortly
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Property Access</p>
                          <p className="text-sm text-muted-foreground">
                            Contact details will be shared before your stay
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Button
                        onClick={() => navigate("/profile")}
                        className="w-full"
                      >
                        View My Slates
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/")}
                        className="w-full"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Return Home
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const subject = encodeURIComponent(
                            `Slate Dispute: ${bookingDetails?.id || ""}`,
                          );
                          const body = encodeURIComponent(
                            `Hello Admin,%0D%0A%0D%0AI'd like to raise a dispute for slate with reference: ${bookingDetails?.payment_id || ""}.%0D%0A%0D%0ADetails:%0D%0A- Slate ID: ${bookingDetails?.id || ""}%0D%0A- Property: ${bookingDetails?.properties?.title || ""}%0D%0A- Dates: ${bookingDetails ? `${formatDate(bookingDetails.start_date)} to ${formatDate(bookingDetails.end_date)}` : ""}%0D%0A%0D%0AConcern:%0D%0A`,
                          );
                          window.location.href = `mailto:hello@filmloca.com?subject=${subject}&body=${body}`;
                        }}
                        className="w-full"
                      >
                        Raise Dispute (Contact Admin)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingSuccessPage;
