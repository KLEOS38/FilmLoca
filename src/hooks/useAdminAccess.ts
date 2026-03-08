import { useAuth } from '@/contexts/AuthContext';
import { 
  canAccessAdminDashboard, 
  canExportData, 
  canEditUserData, 
  canDeleteData,
  getAdminLevel,
  isAdmin,
  isAdminProfile 
} from '@/utils/adminUtils';

export const useAdminAccess = () => {
  const { user, profile, loading } = useAuth();

  const hasAdminAccess = canAccessAdminDashboard(user, profile);
  const canExport = canExportData(user, profile);
  const canEdit = canEditUserData(user, profile);
  const canDelete = canDeleteData(user, profile);
  const adminLevel = getAdminLevel(user);
  const isUserAdmin = isAdmin(user);
  const isProfileAdmin = isAdminProfile(profile);

  return {
    // Access checks
    hasAdminAccess,
    canExport,
    canEdit,
    canDelete,
    
    // Admin status
    isUserAdmin,
    isProfileAdmin,
    adminLevel,
    
    // User info
    user,
    profile,
    loading,
    
    // Helper functions
    isSuperAdmin: adminLevel === 'super_admin',
    isRegularAdmin: adminLevel === 'admin',
    hasAnyAdminAccess: hasAdminAccess,
  };
};
