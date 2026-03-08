import { differenceInHours, differenceInDays } from 'date-fns';

export interface RefundCalculation {
  refundPercentage: number;
  refundAmount: number;
  processingFee: number;
  processingFeePercentage: number;
  hoursUntilStart: number;
  daysUntilStart: number;
  canCancel: boolean;
  policyTier: 'full_refund' | 'partial_refund' | 'no_refund';
  message: string;
}

export interface CancellationPolicy {
  fullRefundHours: number;      // 72 hours = 3 days
  partialRefundHours: number;   // 24 hours = 1 day
  processingFeePercentage: number; // 15%
}

export const CANCELLATION_POLICY: CancellationPolicy = {
  fullRefundHours: 72,
  partialRefundHours: 24,
  processingFeePercentage: 15,
};

/**
 * Calculate refund based on FilmLoca's cancellation policy
 * @param startDate Booking start date
 * @param totalAmount Total booking amount
 * @param policy Optional custom policy (defaults to FilmLoca policy)
 * @returns Refund calculation details
 */
export function calculateRefund(
  startDate: Date,
  totalAmount: number,
  policy: CancellationPolicy = CANCELLATION_POLICY
): RefundCalculation {
  const now = new Date();
  const hoursUntilStart = differenceInHours(startDate, now);
  const daysUntilStart = differenceInDays(startDate, now);

  // Determine policy tier
  let policyTier: 'full_refund' | 'partial_refund' | 'no_refund';
  let refundPercentage: number;
  let canCancel: boolean;
  let message: string;

  if (hoursUntilStart >= policy.fullRefundHours) {
    // 72+ hours before: 85% refund (15% processing fee)
    policyTier = 'full_refund';
    refundPercentage = 100 - policy.processingFeePercentage; // 85%
    canCancel = true;
    message = `Full refund (${100 - policy.processingFeePercentage}%) available - ${policy.processingFeePercentage}% processing fee applies`;
  } else if (hoursUntilStart >= policy.partialRefundHours) {
    // 24-72 hours before: 50% refund
    policyTier = 'partial_refund';
    refundPercentage = 50;
    canCancel = true;
    message = 'Partial refund (50%) available';
  } else {
    // Less than 24 hours: No refund
    policyTier = 'no_refund';
    refundPercentage = 0;
    canCancel = false;
    message = 'No refund available - less than 24 hours before start time';
  }

  // Calculate amounts
  const processingFeePercentage = policyTier === 'full_refund' ? policy.processingFeePercentage : 0;
  const processingFee = policyTier === 'full_refund' ? (totalAmount * processingFeePercentage) / 100 : 0;
  const refundAmount = (totalAmount * refundPercentage) / 100;

  return {
    refundPercentage,
    refundAmount,
    processingFee,
    processingFeePercentage,
    hoursUntilStart,
    daysUntilStart,
    canCancel,
    policyTier,
    message,
  };
}

/**
 * Check if a booking can be cancelled based on policy
 * @param startDate Booking start date
 * @param status Current booking status
 * @param policy Optional custom policy
 * @returns Whether booking can be cancelled
 */
export function canCancelBooking(
  startDate: Date,
  status: string,
  policy: CancellationPolicy = CANCELLATION_POLICY
): boolean {
  if (status !== 'confirmed') {
    return false;
  }

  const now = new Date();
  const hoursUntilStart = differenceInHours(startDate, now);
  
  return hoursUntilStart >= policy.partialRefundHours; // Can cancel if more than 24 hours away
}

/**
 * Get cancellation policy details for display
 * @param startDate Booking start date
 * @param totalAmount Total booking amount
 * @param policy Optional custom policy
 * @returns Formatted policy information
 */
export function getCancellationPolicyInfo(
  startDate: Date,
  totalAmount: number,
  policy: CancellationPolicy = CANCELLATION_POLICY
): {
  canCancel: boolean;
  currentTier: string;
  refundAmount: number;
  message: string;
  timeLeft: string;
} {
  const refund = calculateRefund(startDate, totalAmount, policy);
  
  const formatTimeLeft = (hours: number): string => {
    if (hours < 0) return 'Booking has started';
    if (hours < 24) return `${hours} hours`;
    if (hours < 48) return `${Math.floor(hours / 24)} day, ${hours % 24} hours`;
    return `${Math.floor(hours / 24)} days`;
  };

  const tierMessages = {
    full_refund: 'Full refund period',
    partial_refund: 'Partial refund period',
    no_refund: 'No refund period',
  };

  return {
    canCancel: refund.canCancel,
    currentTier: tierMessages[refund.policyTier],
    refundAmount: refund.refundAmount,
    message: refund.message,
    timeLeft: formatTimeLeft(refund.hoursUntilStart),
  };
}

/**
 * Process refund calculation for industry exceptions
 * @param totalAmount Total booking amount
 * @param exceptionType Type of industry exception
 * @param policy Cancellation policy
 * @returns Refund calculation for exception
 */
export function calculateIndustryExceptionRefund(
  totalAmount: number,
  exceptionType: 'weather' | 'permit' | 'medical' | 'equipment' | 'other',
  policy: CancellationPolicy = CANCELLATION_POLICY
): RefundCalculation {
  // Industry exceptions typically get full refund consideration
  // but still subject to platform discretion and documentation
  const refundPercentage = 100 - policy.processingFeePercentage; // 85%
  const processingFee = (totalAmount * policy.processingFeePercentage) / 100;
  const refundAmount = (totalAmount * refundPercentage) / 100;

  return {
    refundPercentage,
    refundAmount,
    processingFee,
    processingFeePercentage: policy.processingFeePercentage,
    hoursUntilStart: 0,
    daysUntilStart: 0,
    canCancel: true,
    policyTier: 'full_refund',
    message: `Industry exception (${exceptionType}) - ${refundPercentage}% refund subject to documentation review`,
  };
}
