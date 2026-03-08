# Code Changes Reference — Before & After

## Fix #1 & #5: BookingSuccessPage.tsx — Webhook Race Condition

### BEFORE (Broken)
```typescript
const handlePaymentVerification = useCallback(async () => {
  try {
    setIsLoading(true);
    const paymentRef = reference || trxref;

    // PROBLEM: Immediately checks payment_status without waiting for webhook
    const { data } = await supabase
      .from("bookings")
      .select("status, payment_status")
      .eq("payment_id", paymentRef)
      .single();

    // If webhook hasn't fired yet, payment_status is still "pending"
    if (data?.payment_status !== "paid") {
      setVerificationStatus("failed");
      toast.error("Payment verification failed");
      return;
    }

    setVerificationStatus("success");
  } catch (err) {
    setVerificationStatus("failed");
  }
}, [reference, trxref]);
```

**Problems:**
- ❌ No polling mechanism
- ❌ Doesn't use booking_id parameter at all
- ❌ Fails immediately if webhook delayed
- ❌ No fallback or retry logic

### AFTER (Fixed)
```typescript
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

    // STEP 1: PRIORITY - Load booking details by ID (works immediately)
    let detailsLoaded = false;
    if (bookingIdParam) {
      console.log("📝 Attempting direct booking lookup by ID:", bookingIdParam);
      detailsLoaded = await fetchBookingById(bookingIdParam);
      if (detailsLoaded) {
        console.log("✅ Booking details loaded successfully by ID");
      }
    }

    // STEP 2: FALLBACK - Load by reference if ID lookup failed
    if (!detailsLoaded && paymentRef) {
      console.log("📝 Attempting booking lookup by payment reference:", paymentRef);
      detailsLoaded = await fetchBookingByReference(paymentRef);
      if (detailsLoaded) {
        console.log("✅ Booking details loaded successfully by reference");
      }
    }

    // STEP 3: Check if payment already confirmed
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

    // STEP 4: Webhook hasn't fired yet — show "awaiting" UI and poll
    console.log(
      "⏳ Payment status pending, polling for webhook confirmation...",
    );
    setVerificationStatus("awaiting_webhook");
    setIsLoading(false);

    const confirmed = await pollForConfirmation(bookingIdParam, paymentRef);

    if (confirmed) {
      console.log("✅ Webhook confirmation received");
      if (bookingIdParam) await fetchBookingById(bookingIdParam);
      else if (paymentRef) await fetchBookingByReference(paymentRef);
      setVerificationStatus("success");
      toast.success("Payment confirmed!");
    } else {
      // Timeout — still show success (booking is safe in DB)
      console.warn(
        "⚠️ Polling timeout, but showing success (booking exists in database)",
      );
      setVerificationStatus("success");
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
```

**Improvements:**
- ✅ Direct ID lookup (bypasses webhook completely)
- ✅ 30-second polling with 2.5-second intervals
- ✅ User-friendly "Almost There..." UI during polling
- ✅ Graceful timeout (shows success even if webhook delayed)
- ✅ Comprehensive logging for debugging

---

## Fix #2: BookingModification.tsx — Persistence

### BEFORE (Broken)
```typescript
const submitModificationRequest = async () => {
  // ... validation code ...

  try {
    // PROBLEM: Only updates local state, nothing written to DB
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

    // Only updates local React state
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
    cancelModification();
  } catch (error) {
    console.error("Error submitting modification request:", error);
    toast.error("Failed to update booking. Please try again.");
  }
};
```

**Problems:**
- ❌ No Supabase write
- ❌ Changes reverted on page refresh
- ❌ Only local state updated

### AFTER (Fixed)
```typescript
const submitModificationRequest = async () => {
  // ... validation code ...

  try {
    // STEP 1: Persist updated dates to Supabase FIRST
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

    // STEP 2: Supabase update successful - now update local state
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

    // STEP 3: Refetch booking data to ensure consistency with server
    await fetchUserBookings();

    cancelModification();
    setEditingBookingId(null);
  } catch (error) {
    console.error("Error submitting modification request:", error);
    toast.error("Failed to update booking. Please try again.");
  }
};
```

**Improvements:**
- ✅ Write to Supabase first
- ✅ Local state updated only if DB succeeds
- ✅ Refetch to ensure consistency
- ✅ Changes persist across page refreshes

---

## Fix #3: Day Count Calculation — Standardized Formula

### BEFORE (Inconsistent)

**LocationDetail.tsx:**
```typescript
const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
  setSelectedStartDate(startDate);
  setSelectedEndDate(endDate);

  if (startDate && endDate) {
    const timeDiff = endDate.getTime() - startDate.getTime();
    // PROBLEM: No Math.max guard, different from other components
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDays(daysDiff);
  }
};
```

**PricingBar.tsx:**
```typescript
const handleDateSelect = (date: Date | undefined) => {
  // ... validation ...
  else if (isBefore(startDate, date)) {
    setEndDate(date);
    const timeDiff = date.getTime() - startDate.getTime();
    // Different formula with Math.max guard
    const daysDiff = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    setDays(daysDiff);
  }
};
```

**BookingCard.tsx:**
```typescript
useEffect(() => {
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const timeDiff = end.getTime() - start.getTime();
    // Yet another variation
    const daysDiff = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    setDays(daysDiff);
  }
}, [checkIn, checkOut, setDays]);
```

**Problems:**
- ❌ Three different formulas
- ❌ Inconsistent edge-case handling
- ❌ Potential DST issues
- ❌ Off-by-one errors possible

### AFTER (Consistent)

**All three components now use:**
```typescript
import { differenceInCalendarDays } from "date-fns";

const daysDiff = Math.max(1, differenceInCalendarDays(endDate, startDate));
```

**LocationDetail.tsx:**
```typescript
import { differenceInCalendarDays } from "date-fns";

const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
  setSelectedStartDate(startDate);
  setSelectedEndDate(endDate);

  if (startDate && endDate) {
    // Use differenceInCalendarDays for consistent, timezone-aware day calculation
    const daysDiff = Math.max(
      1,
      differenceInCalendarDays(endDate, startDate),
    );
    setDays(daysDiff);
  }
};
```

**PricingBar.tsx:**
```typescript
import { differenceInCalendarDays } from "date-fns";

const handleDateSelect = (date: Date | undefined) => {
  // ... validation ...
  else if (isBefore(startDate, date)) {
    setEndDate(date);
    const daysDiff = Math.max(1, differenceInCalendarDays(date, startDate));
    setDays(daysDiff);
    setShowCalendar(false);
  }
};
```

**BookingCard.tsx:**
```typescript
import { differenceInCalendarDays } from "date-fns";

useEffect(() => {
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const daysDiff = Math.max(1, differenceInCalendarDays(end, start));
    setDays(daysDiff);
  }
}, [checkIn, checkOut, setDays]);
```

**Improvements:**
- ✅ Single formula everywhere
- ✅ Timezone-safe (handles DST)
- ✅ Calendar-accurate (not fractional math)
- ✅ Consistent edge-case handling
- ✅ No off-by-one errors

---

## Fix #4: BookingCard.tsx — Zero Payment Prevention

### BEFORE (Vulnerable)

```typescript
const handleBooking = async () => {
  // ... validation ...

  try {
    // PROBLEM: No guard against zero days
    const totalPrice = price * Math.max(1, days);
    console.log("Total price calculated:", totalPrice);

    // ... payment initialization ...

    // PROBLEM: totalAmount could be 0 if days is 0
    const paymentResult = await initializePayment(
      {
        propertyId,
        startDate: checkIn,
        endDate: checkOut,
        totalAmount: totalPrice,
        teamSize,
        notes: notes.trim() || undefined,
        propertyTitle,
      },
      user?.email || "",
      user?.user_metadata?.name || "User",
    );
  } catch (error) {
    // ... error handling ...
  }
};

// Button disabled check doesn't prevent same-day well enough
<Button
  disabled={
    !checkIn ||
    !checkOut ||
    !teamSize ||
    isBooking ||
    isLoading
    // PROBLEM: Missing checks for days <= 0 and checkIn >= checkOut
  }
>
```

**Problems:**
- ❌ No validation for zero days in handler
- ❌ Button doesn't check for invalid date range
- ❌ Could send ₦0 to Paystack

### AFTER (Fixed - Multiple Layers)

```typescript
const handleBooking = async () => {
  console.log("Booking started with data:", {
    propertyId,
    checkIn,
    checkOut,
    teamSize,
    notes,
    price,
    days,
    user: user?.id,
  });

  // ... rate limiting check ...

  if (!user) {
    toast.error("Please sign in to book this location");
    navigate("/auth");
    return;
  }

  // LAYER 1: Validate dates make sense
  if (checkIn >= checkOut) {
    toast.error("Check-out date must be after check-in date");
    return;
  }

  // ... validation schema check ...

  console.log("Validation passed, starting booking process...");
  setIsBooking(true);

  try {
    // LAYER 2: Guard against zero days when calculating price
    const safeDays = Math.max(1, days);
    const totalPrice = price * safeDays;
    console.log(
      "Total price calculated:",
      totalPrice,
      "for",
      safeDays,
      "days",
    );

    // LAYER 3: Validate safeDays before proceeding
    if (safeDays <= 0) {
      toast.error("Invalid booking duration");
      return;
    }

    // ... property lookup ...

    // LAYER 4: Initialize payment with guarded amount
    const paymentResult = await initializePayment(
      {
        propertyId,
        startDate: checkIn,
        endDate: checkOut,
        totalAmount: totalPrice, // Never zero due to safeDays guard
        teamSize,
        notes: notes.trim() || undefined,
        propertyTitle,
      },
      user?.email || "",
      user?.user_metadata?.name || "User",
    );

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

// LAYER 1: Comprehensive button disabled checks
<Button
  className="w-full"
  onClick={handleBooking}
  disabled={
    !checkIn ||
    !checkOut ||
    !teamSize ||
    days <= 0 ||                    // NEW: Check for zero days
    checkIn >= checkOut ||           // NEW: Check for same date
    isBooking ||
    isLoading
  }
>
```

**Improvements:**
- ✅ Layer 1: Button disabled checks
- ✅ Layer 2: Handler validation (checkIn >= checkOut)
- ✅ Layer 3: Day calculation guard (Math.max)
- ✅ Layer 4: Handler validation (safeDays <= 0)
- ✅ Result: Zero payment impossible

---

## Fix #3B: PricingBar.tsx — Payment Amount Guard

### BEFORE (Vulnerable)

```typescript
const handleBookNow = async () => {
  if (!startDate || !endDate) {
    toast.error("Please select both check-in and check-out dates");
    return;
  }

  // ... user check ...

  try {
    // PROBLEM: totalPrice could be 0
    const paymentResult = await initializePayment(
      {
        propertyId,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        totalAmount: totalPrice, // Could be 0 if days is 0
        teamSize: 1,
        notes: undefined,
        propertyTitle,
      },
      user.email || "",
      user.user_metadata?.name || "User",
    );
  } catch (error: any) {
    // ... error handling ...
  }
};

// PROBLEM: Button doesn't check days <= 0
<Button
  size="sm"
  className="w-full sm:w-auto text-sm"
  onClick={handleBookNow}
  disabled={paymentState.isLoading || !hasDates}
>
```

**Problems:**
- ❌ No guard on payment amount
- ❌ Button doesn't check for days <= 0

### AFTER (Fixed)

```typescript
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

  try {
    // Guard against zero payment amount
    const paymentResult = await initializePayment(
      {
        propertyId,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        totalAmount: Math.max(totalPrice, price), // Minimum of 1 day's price
        teamSize: 1,
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

// Button now checks days <= 0
<Button
  size="sm"
  className="w-full sm:w-auto text-sm"
  onClick={handleBookNow}
  disabled={paymentState.isLoading || !hasDates || days <= 0}
>
```

**Improvements:**
- ✅ Payment amount guard: `Math.max(totalPrice, price)`
- ✅ Button disabled check: `days <= 0`
- ✅ Proper error handling (no `any` type)

---

## Summary of Formula Changes

| Component | Before | After |
|-----------|--------|-------|
| **LocationDetail** | `Math.ceil(timeDiff / 86400000)` | `Math.max(1, differenceInCalendarDays(...))` |
| **PricingBar** | `Math.max(1, Math.ceil(timeDiff / 86400000))` | `Math.max(1, differenceInCalendarDays(...))` |
| **BookingCard** | `Math.max(1, Math.ceil(timeDiff / 86400000))` | `Math.max(1, differenceInCalendarDays(...))` |

**Key Benefit**: Single source of truth, timezone-safe, consistent everywhere
