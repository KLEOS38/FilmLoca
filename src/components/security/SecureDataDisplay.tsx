import React from 'react';
import { logSecurityEvent, auditActions, isSensitiveDataAccess } from '@/utils/securityAudit';

interface SecureDataDisplayProps {
  children: React.ReactNode;
  dataType: 'profile' | 'financial' | 'message' | 'admin';
  recordId?: string;
  className?: string;
}

export const SecureDataDisplay: React.FC<SecureDataDisplayProps> = ({
  children,
  dataType,
  recordId,
  className = ''
}) => {
  React.useEffect(() => {
    // Log access to sensitive data
    const logDataAccess = async () => {
      let action = '';
      let tableName = '';
      
      switch (dataType) {
        case 'profile':
          action = auditActions.PROFILE_ACCESSED;
          tableName = 'profiles';
          break;
        case 'financial':
          action = auditActions.FINANCIAL_DATA_ACCESSED;
          tableName = 'bookings';
          break;
        case 'message':
          action = auditActions.SENSITIVE_MESSAGE_VIEWED;
          tableName = 'messages';
          break;
        case 'admin':
          action = auditActions.ADMIN_ACTION_PERFORMED;
          tableName = 'admin_users';
          break;
      }

      await logSecurityEvent({
        action,
        table_name: tableName,
        record_id: recordId,
        sensitive_data_accessed: isSensitiveDataAccess(tableName, action)
      });
    };

    logDataAccess();
  }, [dataType, recordId]);

  return (
    <div className={className} data-secure-content={dataType}>
      {children}
    </div>
  );
};

// Higher-order component for protecting sensitive components
export const withSecurityAudit = <P extends object>(
  Component: React.ComponentType<P>,
  dataType: 'profile' | 'financial' | 'message' | 'admin'
) => {
  return (props: P & { recordId?: string }) => {
    const { recordId, ...restProps } = props;
    
    return (
      <SecureDataDisplay dataType={dataType} recordId={recordId}>
        <Component {...(restProps as P)} />
      </SecureDataDisplay>
    );
  };
};