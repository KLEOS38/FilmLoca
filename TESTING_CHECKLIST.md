# Booking System Fixes — Testing Checklist

## Pre-Testing Setup
- [ ] Clear browser cache and local storage
- [ ] Open browser DevTools → Console tab (for logging verification)
- [ ] Have test Paystack account ready (or test mode enabled)
- [ ] Have test property ID ready for booking
- [ ] Have test user account(s) ready

---

## Issue #1 & #5: Payment Success Page (Webhook Race Condition)

### Test Case 1.1: Fast Webhook (Payment confirmed quickly)
**Setup**: Make a test payment and have webhook fire immediately
**Steps**:
1. Navigate to a property detail page
2. Select dates and click "Book Now"
3. Complete payment in Paystack modal
4. Observe redirect to `/booking-success?booking_id=xxx&reference=xxx`
5. Check browser console for logs:
   - [ ] Should see "🔍 Payment verification started:"
   - [ ] Should see "📝 Attempting direct booking lookup by ID:"
   - [ ] Should see "✅ Booking details loaded successfully by ID"
   - [ ] Should see "📊 Payment status check: { payment_status: 'paid', status: 'confirmed', alreadyConfirmed: true }"
   - [ ] Should see "✅ Payment already confirmed in database"

**Expected Result**: ✅
- Success page loads immediately (< 1 second)
- Green checkmark, "Slate Confirmed!" heading visible
- Booking details displayed
- No "awaiting webhook" UI shown

---

### Test Case 1.2: Delayed Webhook (Webhook fires 5-10 seconds later)
**Setup**: Simulate delayed webhook (or use test Paystack account where confirmation takes time)
**Steps**:
1. Navigate to property detail page
2. Select dates and click "Book Now"
3. Complete Paystack payment
4. Observe initial page load (should show "Almost There..." UI)
5. Watch console logs
6. After 5-10 seconds, observe automatic refresh to "Payment confirmed"

**Expected Result**: ✅
- Initial page shows "Almost There..." with animated clock icon
- Message: "Your payment was received. We're waiting for the final confirmation from Paystack..."
- Console shows polling logs:
  - [ ] "⏳ Payment status pending, polling for webhook confirmation..."
  - [ ] Multiple "No webhook yet..." attempts (if webhook delayed)
  - [ ] Eventually "✅ Webhook confirmation received"
- After webhook, success page automatically updates
- No manual refresh needed
- No error messages

---

### Test Case 1.3: Webhook Timeout (Webhook never fires, polling expires after 30 seconds)
**Setup**: Manually test timeout scenario (or mock delayed webhook)
**Steps**:
1. Navigate to property detail page
2. Start payment flow
3. Let page poll for 30+ seconds without webhook
4. Observe what happens after timeout

**Expected Result**: ✅
- Page shows success after timeout (doesn't fail)
- Console shows: "⏱️ Polling timeout after X attempts (30000ms)"
- Toast shows: "Your booking is saved. Payment confirmation may take a few minutes."
- Booking details still displayed (from initial direct ID lookup)
- Page doesn't show "Payment Verification Failed"

---

### Test Case 1.4: Verify booking_id is read from URL
**Steps**:
1. Complete a payment and get redirected to success page
2. Check URL bar - should contain `?booking_id=xxx&reference=xxx`
3. Open browser console and check logs

**Expected Result**: ✅
- URL contains `booking_id` parameter
- Console shows: "📝 Attempting direct booking lookup by ID: [uuid]"
- Booking is loaded by ID, not by reference
- This confirms `bookingIdParam` is being read and used

---

## Issue #2: Booking Modification (Supabase Persistence)

### Test Case 2.1: Modify Booking Dates
**Setup**: User has at least one confirmed booking at least 14 days in future
**Steps**:
1. Navigate to Profile → My Slates
2. Find a future booking
3. Click "EDIT" button → Click "Change Date"
4. Modal appears
5. Select new check-in and check-out dates
6. Enter reason: "Need to reschedule"
7. Click "Change Date" button
8. Observe success toast
9. **CRITICAL**: Refresh the page (Cmd+R or F5)
10. Check if dates are still updated

**Expected Result**: ✅
- Success toast: "Booking dates updated successfully!"
- Dates in UI update immediately
- **After refresh**: Dates are still updated (persisted to Supabase)
- Console should show: "✅ Property found:" and refetch logs
- Booking card shows new dates

**Expected Result** ❌ **FAILURE** (before fix):
- Dates revert to original after refresh

---

### Test Case 2.2: Cancel Booking
**Setup**: User has a confirmed booking at least 14 days in future
**Steps**:
1. Navigate to Profile → My Slates
2. Find a future booking (14+ days away)
3. Click "EDIT" button → Click "Cancellation"
4. Confirm cancellation dialog
5. Observe success toast
6. Check booking status (should show "Cancelled" badge)
7. **CRITICAL**: Refresh the page (Cmd+R or F5)
8. Check if cancellation persisted

**Expected Result**: ✅
- Success toast: "Booking cancelled successfully. A full refund will be processed..."
- Booking badge changes to "Cancelled"
- Edit button disappears (cancelled bookings can't be edited)
- **After refresh**: Status still shows "Cancelled"
- Booking still in list with cancelled status

**Expected Result** ❌ **FAILURE** (before fix):
- Cancellation reverts after refresh

---

### Test Case 2.3: Verify Supabase Write Before Local Update
**Setup**: Enable network throttling in DevTools (to slow down API calls)
**Steps**:
1. Open DevTools → Network tab
2. Set throttling to "Slow 3G" or "Custom" (3 seconds delay)
3. Click "Change Date" on a booking
4. Select new dates
5. Click "Change Date"
6. **Watch carefully**: Does UI update immediately or wait for server?

**Expected Result**: ✅
- UI should wait for Supabase response
- Then update dates
- Then show success toast
- If Supabase fails → Error toast, dates don't update locally

---

## Issue #3: Day Count Calculation (Off-by-One)

### Test Case 3.1: Consistent Day Counts Across Components
**Setup**: Have both PricingBar and BookingCard visible on property detail page
**Steps**:
1. Navigate to property detail page
2. **In PricingBar**: Select dates Jan 5 to Jan 8 (3 days)
3. Check displayed price: should be `₦X × 3 days`
4. Check that PricingBar shows "Total: ₦(price × 3)"
5. **In BookingCard**: Check if same date range shows same total price
6. Now use **AvailabilityCalendar** (if visible) to select same dates
7. Check if both components show same price

**Expected Result**: ✅
- PricingBar shows: "3 days" and "Total: ₦1500" (example: ₦500/day × 3)
- BookingCard shows: "₦500 × 3 days = ₦1500" (in pricing breakdown)
- Both match exactly
- If dates span DST boundary: calculations still consistent

---

### Test Case 3.2: Same-Day Selection Prevention
**Setup**: Test boundary condition of same check-in and check-out
**Steps**:
1. In PricingBar: Try to select Jan 5 as both check-in and check-out
2. Observe that you can't select end date same as start date
3. Try to type same date in BookingCard date inputs
4. Click "Book Now"

**Expected Result**: ✅
- PricingBar: Calendar prevents selecting same day (isBefore check)
- BookingCard: Shows error toast "Check-out date must be after check-in date"
- Button is disabled when dates are invalid
- No payment is attempted

---

### Test Case 3.3: DST Boundary (if testing across spring/fall)
**Setup**: Select dates that cross DST boundary (if applicable)
**Steps**:
1. Navigate to property detail page
2. Select dates that cross DST change (e.g., March 1 to April 1)
3. Check day count calculation
4. Compare PricingBar vs BookingCard

**Expected Result**: ✅
- Both show same day count despite timezone shift
- `differenceInCalendarDays` handles DST correctly
- No off-by-one errors

---

## Issue #4: Book Now Button (Zero Days Prevention)

### Test Case 4.1: Button Disabled When Invalid
**Setup**: BookingCard with invalid date combinations
**Steps**:
1. Navigate to property detail page
2. **Scenario A**: No dates selected
   - [ ] Book Now button should be disabled
3. **Scenario B**: Only check-in selected
   - [ ] Book Now button should be disabled
4. **Scenario C**: Only check-out selected (without check-in)
   - [ ] Book Now button should be disabled
5. **Scenario D**: Check-in >= Check-out (same day or out before in)
   - [ ] Book Now button should be disabled
6. **Scenario E**: Valid dates (check-out after check-in)
   - [ ] Book Now button should be ENABLED
   - [ ] Click should proceed

**Expected Result**: ✅
- Disabled states match all invalid conditions
- Valid dates enable the button
- No confusion about button state

---

### Test Case 4.2: Zero Payment Amount Prevention
**Setup**: Have network inspector open to see payment payload
**Steps**:
1. Open DevTools → Network tab → XHR/Fetch filter
2. Navigate to property with ₦500/day price
3. Select dates: Jan 5 to Jan 8 (3 days)
4. Click "Book Now"
5. Inspect the network request to initializePayment
6. Check the `totalAmount` field in request payload

**Expected Result**: ✅
- Request includes: `totalAmount: 1500` (₦500 × 3 days)
- Never shows `totalAmount: 0`
- For 1 day booking: `totalAmount: 500` (minimum price)
- Paystack opens successfully with valid amount

**Expected Result** ❌ **FAILURE** (before fix):
- `totalAmount: 0` in payload
- Paystack rejects with error

---

## Issue #3B: PricingBar Payment Guard

### Test Case 3B.1: PricingBar Book Now Button
**Setup**: PricingBar visible on property detail page
**Steps**:
1. In PricingBar: Click "Select dates" (no dates selected yet)
2. Observe: "Select Dates" button should be disabled
3. Select dates: Jan 5 to Jan 8
4. Observe: "Book Now" button becomes enabled
5. Hover over button, check tooltip/state
6. Try same-day dates (Jan 5 to Jan 5)
7. Observe button behavior

**Expected Result**: ✅
- Button disabled when `!hasDates || days <= 0`
- Button enabled only with valid date range
- Button shows "Book Now" when enabled
- Button shows "Select Dates" when disabled
- Clicking enabled button opens Paystack

---

### Test Case 3B.2: PricingBar Payment Amount
**Setup**: PricingBar with date selection
**Steps**:
1. In PricingBar: Select dates Jan 5 to Jan 8
2. Check displayed total: "Total: ₦X"
3. Click "Book Now"
4. Inspect payment request (DevTools Network tab)

**Expected Result**: ✅
- Displayed total matches payment amount
- Payment amount is never zero
- Paystack opens successfully
- Payment completes without errors

---

## Integration Test: Full Booking Flow

### Test Case INT.1: Complete End-to-End Booking
**Setup**: Fresh test environment
**Steps**:
1. **Browse**: Navigate to property detail page
2. **Select**: Choose dates using AvailabilityCalendar or inline picker
3. **Verify**: Check both PricingBar and BookingCard show same price
4. **Review**: Confirm dates and price in BookingCard
5. **Pay**: Click "Book Now" → Complete Paystack payment
6. **Wait**: Observe success page handling (immediate or polling)
7. **Verify**: Booking appears in Profile → My Slates
8. **Modify** (if within 14 days limit): Click EDIT → Change Date → Confirm
9. **Persist**: Refresh page, verify changes are still there
10. **Cancel** (if within 14 days): Click EDIT → Cancellation → Confirm
11. **Verify**: Booking shows as "Cancelled" after refresh

**Expected Result**: ✅
- All steps complete successfully
- No errors at any stage
- Success page doesn't show "Verification Failed"
- Modifications persist across page refresh
- Cancellation persists across page refresh
- Prices are consistent throughout
- No confusion about day counts

---

## Browser Console Verification

### Check for Expected Logs
**Steps**:
1. Open DevTools → Console tab
2. Filter by "booking" or payment-related messages
3. Look for these patterns:

**Expected Logs** ✅:
- [ ] "🔍 Payment verification started:"
- [ ] "📝 Attempting direct booking lookup by ID:"
- [ ] "✅ Booking details loaded successfully"
- [ ] "📊 Payment status check:"
- [ ] "⏳ Payment status pending, polling..."
- [ ] "✅ Webhook confirmation received" OR "⏱️ Polling timeout"
- [ ] "Total price calculated: X for Y days"
- [ ] "Payment result: { success: true }"

**Unexpected Logs** ❌ (should NOT see):
- [ ] "Payment Verification Failed"
- [ ] `payment_status is not paid` (immediately)
- [ ] `totalAmount: 0`
- [ ] Duplicate logs (should not repeat excessively)

---

## Performance Checklist

### Test Case PERF.1: Payment Success Page Load Time
**Steps**:
1. Open DevTools → Performance tab
2. Complete a payment and navigate to success page
3. Record performance: Click the record button, wait for page to fully load
4. Check metrics:
   - [ ] First Contentful Paint (FCP) < 2 seconds
   - [ ] Largest Contentful Paint (LCP) < 3 seconds
   - [ ] Total page load < 4 seconds

**Expected Result**: ✅
- Page loads quickly even with polling
- Polling doesn't block user interactions
- "Almost There..." UI appears immediately

---

### Test Case PERF.2: Modification Modal Responsiveness
**Steps**:
1. Open DevTools → Lighthouse
2. Navigate to Profile → My Slates
3. Click EDIT → Change Date
4. Monitor responsiveness while interacting with modal

**Expected Result**: ✅
- Modal opens/closes smoothly
- Date picker is responsive
- No lag when selecting dates
- Submit button doesn't hang

---

## Edge Cases & Error Handling

### Test Case EDGE.1: Network Disconnection During Payment
**Setup**: Use DevTools network throttling or disable internet
**Steps**:
1. Start payment process
2. Disconnect network before clicking "Book Now"
3. Observe error handling

**Expected Result**: ✅
- Error toast appears
- User can retry
- No broken state

---

### Test Case EDGE.2: Network Disconnection During Modification
**Setup**: Disable network after clicking "Change Date"
**Steps**:
1. Click EDIT → Change Date
2. Fill in new dates
3. Disable network
4. Click "Change Date" button

**Expected Result**: ✅
- Error toast appears
- Dates don't update in local state
- Can retry after network restore

---

### Test Case EDGE.3: Multiple Simultaneous Bookings
**Setup**: Have multiple browser tabs open for same property
**Steps**:
1. Tab A: Select dates and start payment
2. Tab B: Select same dates and start payment
3. Both complete payments
4. Check if both bookings exist

**Expected Result**: ✅
- Both bookings created successfully
- No conflicts
- Both appear in My Slates

---

## Regression Testing

### Test Case REG.1: Old Features Still Work
**Steps**:
1. [ ] Browsing properties works
2. [ ] Viewing property details works
3. [ ] Searching by location works
4. [ ] Favoriting properties works
5. [ ] Leaving reviews works (if separate feature)
6. [ ] Messaging host works (if separate feature)

**Expected Result**: ✅
- No regression in other features

---

## Final Sign-Off

**Testing Date**: _______________
**Tester Name**: _______________
**Environment**: ☐ Dev  ☐ Staging  ☐ Production

### Summary
- [ ] All test cases passed
- [ ] No critical bugs found
- [ ] No console errors (except expected warnings)
- [ ] Performance acceptable
- [ ] Ready for production

### Issues Found (if any)
```
[List any issues discovered during testing]
```

### Sign-Off
- [ ] Approved for release
- [ ] Requires additional fixes
- [ ] Requires retesting

**Signature**: _________________________ **Date**: _________
