import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { canAccessAdminDashboard } from '@/utils/adminUtils';
import { useNavigate } from 'react-router-dom';

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showAccessDenied?: boolean;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ 
  children, 
  fallback,
  showAccessDenied = true 
}) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-burgundy"></div>
        <span className="ml-2">Checking admin access...</span>
      </div>
    );
  }

  // Check if user has admin access
  const hasAdminAccess = canAccessAdminDashboard(user, profile);

  // If user has admin access, render the protected content
  if (hasAdminAccess) {
    return <>{children}</>;
  }

  // If fallback is provided, use it
  if (fallback) {
    return <>{fallback}</>;
  }

  // If showAccessDenied is false, render nothing
  if (!showAccessDenied) {
    return null;
  }

  // Show access denied message
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              You don't have permission to access the admin dashboard.
            </p>
            <p className="text-sm text-muted-foreground">
              This area is restricted to Film Loca administrators only.
            </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Need Admin Access?</p>
                <p className="text-amber-700 mt-1">
                  Contact the Film Loca team to request admin privileges.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              onClick={() => navigate('/profile')}
              className="w-full"
            >
              <Shield className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Go to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGuard;
