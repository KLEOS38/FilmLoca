// Admin access control utilities

// List of admin email addresses (in production, this should be stored in environment variables or database)
const ADMIN_EMAILS = [
  'hello@filmloca.com',
  'fortune@filmloca.com',
  'elijah@filmloca.com'
];

// Admin user IDs (for additional security)
const ADMIN_USER_IDS = [
  // Add specific user IDs here if needed
];

/**
 * Check if a user is an admin based on their email
 */
export const isAdminByEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

/**
 * Check if a user is an admin based on their user ID
 */
export const isAdminByUserId = (userId: string | null | undefined): boolean => {
  if (!userId) return false;
  return ADMIN_USER_IDS.includes(userId);
};

/**
 * Check if a user is an admin (checks both email and user ID)
 */
type BasicUser = {
  email?: string | null;
  id?: string | null;
  user_metadata?: { user_type?: string } | null;
};

type BasicProfile = {
  email?: string | null;
  id?: string | null;
  user_type?: string | null;
};

export const isAdmin = (user: BasicUser | null | undefined): boolean => {
  if (!user) return false;
  
  // Check by email
  if (isAdminByEmail(user.email)) return true;
  
  // Check by user ID
  if (isAdminByUserId(user.id)) return true;
  
  // Check by profile user_type if available
  if (user.user_metadata?.user_type === 'admin') return true;
  
  return false;
};

/**
 * Check if a profile has admin privileges
 */
export const isAdminProfile = (profile: BasicProfile | null | undefined): boolean => {
  if (!profile) return false;
  
  // Check by email
  if (isAdminByEmail(profile.email)) return true;
  
  // Check by user ID
  if (isAdminByUserId(profile.id)) return true;
  
  // Check by user_type field
  if (profile.user_type === 'admin') return true;
  
  return false;
};

/**
 * Get admin access level (for future role-based permissions)
 */
export const getAdminLevel = (user: BasicUser | null | undefined): 'none' | 'viewer' | 'moderator' | 'admin' | 'super_admin' => {
  if (!isAdmin(user)) return 'none';
  
  // Super admin emails (full access)
  const superAdminEmails = ['hello@filmloca.com', 'fortune@filmloca.com'];
  if (user.email && superAdminEmails.includes(user.email.toLowerCase())) {
    return 'super_admin';
  }
  
  // Regular admin
  return 'admin';
};

/**
 * Check if user has permission to access admin dashboard
 */
export const canAccessAdminDashboard = (user: BasicUser | null | undefined, profile: BasicProfile | null | undefined): boolean => {
  return isAdmin(user) || isAdminProfile(profile);
};

/**
 * Check if user has permission to export data
 */
export const canExportData = (user: BasicUser | null | undefined, _profile: BasicProfile | null | undefined): boolean => {
  const level = getAdminLevel(user);
  return level === 'admin' || level === 'super_admin';
};

/**
 * Check if user has permission to edit user data
 */
export const canEditUserData = (user: BasicUser | null | undefined, _profile: BasicProfile | null | undefined): boolean => {
  const level = getAdminLevel(user);
  return level === 'admin' || level === 'super_admin';
};

/**
 * Check if user has permission to delete data
 */
export const canDeleteData = (user: BasicUser | null | undefined, _profile: BasicProfile | null | undefined): boolean => {
  const level = getAdminLevel(user);
  return level === 'super_admin';
};

/**
 * Get list of admin emails (for display purposes)
 */
export const getAdminEmails = (): string[] => {
  return [...ADMIN_EMAILS];
};

/**
 * Add a new admin email (for super admins only)
 */
export const addAdminEmail = (newEmail: string): boolean => {
  if (!ADMIN_EMAILS.includes(newEmail.toLowerCase())) {
    ADMIN_EMAILS.push(newEmail.toLowerCase());
    return true;
  }
  return false;
};

/**
 * Remove an admin email (for super admins only)
 */
export const removeAdminEmail = (email: string): boolean => {
  const index = ADMIN_EMAILS.indexOf(email.toLowerCase());
  if (index > -1) {
    ADMIN_EMAILS.splice(index, 1);
    return true;
  }
  return false;
};
