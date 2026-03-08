import { supabase } from '@/integrations/supabase/client';

interface AuditLogEntry {
  action: string;
  table_name?: string;
  record_id?: string;
  sensitive_data_accessed?: boolean;
  ip_address?: string;
  user_agent?: string;
}

export const logSecurityEvent = async (entry: AuditLogEntry) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    // Get client IP and user agent from browser
    const userAgent = navigator.userAgent;
    
    await supabase
      .from('security_audit_log')
      .insert({
        user_id: user.id,
        action: entry.action,
        table_name: entry.table_name,
        record_id: entry.record_id,
        sensitive_data_accessed: entry.sensitive_data_accessed || false,
        user_agent: userAgent,
        ...entry
      });
  } catch (error) {
    // Don't throw errors for audit logging to avoid disrupting user flow
    console.warn('Failed to log security event:', error);
  }
};

export const auditActions = {
  PROFILE_ACCESSED: 'profile_accessed',
  MESSAGE_ACCESSED: 'message_accessed',
  SENSITIVE_MESSAGE_VIEWED: 'sensitive_message_viewed',
  FINANCIAL_DATA_ACCESSED: 'financial_data_accessed',
  ADMIN_ACTION_PERFORMED: 'admin_action_performed',
  PROPERTY_MANAGEMENT: 'property_management',
  BOOKING_CREATED: 'booking_created',
  PAYMENT_PROCESSED: 'payment_processed'
} as const;

// Helper function to detect if we're accessing sensitive data
export const isSensitiveDataAccess = (tableName: string, action: string): boolean => {
  const sensitiveActions = [
    'profile_accessed',
    'message_accessed',
    'financial_data_accessed',
    'sensitive_message_viewed',
    'admin_action_performed'
  ];
  
  const sensitiveTables = [
    'profiles',
    'bookings',
    'messages',
    'admin_users',
    'payments'
  ];

  return sensitiveActions.includes(action) || sensitiveTables.includes(tableName);
};