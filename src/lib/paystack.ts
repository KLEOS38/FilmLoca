// Get dynamic callback URL based on current host
const getCallbackUrl = (): string => {
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}/booking-success`;
  }
  // Fallback for SSR or environment variable
  return import.meta.env.VITE_PAYSTACK_CALLBACK_URL || 'https://filmloca.com/booking-success';
};

// Paystack configuration and utilities
export const PAYSTACK_CONFIG = {
  // Test keys
  publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_3385bdb705a56ff939c735f27431a3800173122b',
  secretKey: import.meta.env.VITE_PAYSTACK_SECRET_KEY || 'sk_test_ff029298e7f7d62aeeb7a245f668e15b4be202e1',
  
  // URLs - Dynamic callback URL based on current host
  get callbackUrl() {
    return getCallbackUrl();
  },
  webhookUrl: import.meta.env.VITE_PAYSTACK_WEBHOOK_URL || 'https://jwuakfowjxebtpcxcqyr.supabase.co/functions/v1/paystack-webhook',
  
  // Environment
  environment: 'test' as const,
  
  // Currency
  currency: 'NGN',
  
  // Base URLs
  baseUrl: 'https://api.paystack.co',
  verifyUrl: 'https://api.paystack.co/transaction/verify',
};

// Paystack transaction interface
export interface PaystackTransaction {
  reference: string;
  amount: number;
  email: string;
  currency: string;
  callback_url?: string;
  metadata?: Record<string, unknown>;
}

// Paystack response interface
export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

// Paystack verification response
export interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, unknown>;
    log: unknown;
    fees: number;
    fees_split: unknown;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
      metadata: Record<string, unknown>;
      risk_action: string;
      international_format_phone: string;
    };
    plan: unknown;
    split: unknown;
    order_id: unknown;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: unknown;
    source: unknown;
    fees_breakdown: unknown;
  };
}

// Initialize Paystack transaction (simplified approach)
export const initializePaystackTransaction = async (
  transaction: PaystackTransaction,
  hostUserId?: string
): Promise<PaystackResponse> => {
  try {
    // Calculate split amounts (85% to host, 15% to platform)
    const totalAmount = transaction.amount;
    const platformAmount = Math.round(totalAmount * 0.15); // 15% to platform
    const hostAmount = totalAmount - platformAmount; // 85% to host

    const requestBody: Omit<PaystackTransaction, 'currency'> & { currency: string } = {
      ...transaction,
      callback_url: PAYSTACK_CONFIG.callbackUrl,
      currency: PAYSTACK_CONFIG.currency,
    };

    // For now, we'll collect full payment and handle split manually
    // This avoids the complexity of subaccount setup
    console.log('Paystack transaction (split to be handled manually):', {
      totalAmount,
      hostAmount,
      platformAmount,
      note: 'Split will be processed after payment confirmation'
    });

    const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error initializing Paystack transaction:', error);
    throw error;
  }
};

// Verify Paystack transaction
export const verifyPaystackTransaction = async (
  reference: string
): Promise<PaystackVerificationResponse> => {
  try {
    const response = await fetch(`${PAYSTACK_CONFIG.verifyUrl}/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Paystack verification error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying Paystack transaction:', error);
    throw error;
  }
};

// Create payment reference
export const createPaymentReference = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `FL_${timestamp}_${random}`.toUpperCase();
};

// Format amount for Paystack (convert to kobo)
export const formatAmountForPaystack = (amount: number): number => {
  return Math.round(amount * 100); // Convert Naira to Kobo
};

// Format amount from Paystack (convert from kobo)
export const formatAmountFromPaystack = (amount: number): number => {
  return amount / 100; // Convert Kobo to Naira
};

// Validate email for Paystack
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get Paystack public key for frontend
export const getPaystackPublicKey = (): string => {
  return PAYSTACK_CONFIG.publicKey;
};

// Check if transaction is successful
export const isTransactionSuccessful = (status: string): boolean => {
  return status === 'success';
};

// Create automatic transfer to host
export const createTransferToHost = async (
  amount: number,
  hostBankAccount: {
    account_number: string;
    bank_code: string;
    account_name: string;
  },
  reason: string,
  reference: string
): Promise<unknown> => {
  try {
    const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transfer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'balance',
        amount: amount,
        recipient: hostBankAccount.account_number,
        reason: reason,
        reference: reference,
        currency: PAYSTACK_CONFIG.currency
      }),
    });

    if (!response.ok) {
      throw new Error(`Paystack transfer error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating transfer to host:', error);
    throw error;
  }
};

// Create transfer recipient (host bank account)
export const createTransferRecipient = async (
  hostBankAccount: {
    account_number: string;
    bank_code: string;
    account_name: string;
  }
): Promise<unknown> => {
  try {
    const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transferrecipient`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'nuban',
        name: hostBankAccount.account_name,
        account_number: hostBankAccount.account_number,
        bank_code: hostBankAccount.bank_code,
        currency: PAYSTACK_CONFIG.currency
      }),
    });

    if (!response.ok) {
      throw new Error(`Paystack recipient creation error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating transfer recipient:', error);
    throw error;
  }
};

// Get transaction status message
export const getTransactionStatusMessage = (status: string): string => {
  switch (status) {
    case 'success':
      return 'Payment successful';
    case 'failed':
      return 'Payment failed';
    case 'pending':
      return 'Payment pending';
    case 'reversed':
      return 'Payment reversed';
    default:
      return 'Payment status unknown';
  }
};

// Paystack webhook signature verification
export const verifyPaystackWebhookSignatureServer = async (
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> => {
  const { createHmac } = await import('crypto');
  const hash = createHmac('sha512', secret).update(payload).digest('hex');
  return hash === signature;
};

export default PAYSTACK_CONFIG;
