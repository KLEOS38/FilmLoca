
import React, { useState, useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Heart, User, Home, Plus, MessageSquare, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import EnhancedUserProfile from '@/components/profile/EnhancedUserProfile';
import FixedGuestDashboard from '@/components/dashboard/FixedGuestDashboard';
import EnhancedHostDashboard from '@/components/dashboard/EnhancedHostDashboard';
import UnifiedMessages from '@/components/messaging/UnifiedMessages';
import SimpleAdminDashboard from '@/components/admin/SimpleAdminDashboard';
import AdminGuard from '@/components/admin/AdminGuard';
import { useAdminAccess } from '@/hooks/useAdminAccess';

const ProfilePage = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { hasAdminAccess } = useAdminAccess();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMode, setActiveMode] = useState<'guest' | 'host'>('guest');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'messages' | 'admin' | 'renting'>('dashboard');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const hasInitialized = useRef(false);
  // Initialize immediately - don't wait for profile
  // Don't block on authLoading - show UI immediately
  React.useEffect(() => {
    // Only redirect if we're sure there's no user (after auth finishes loading)
    if (!authLoading && !user) {
      navigate('/auth', { replace: true });
      return;
    }
    
    // If auth is still loading, don't do anything yet
    if (authLoading) {
      return;
    }

    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const mode = params.get('mode');

    // If URL has params, use them immediately
    if (tab || mode) {
      if (tab && ['dashboard', 'profile', 'messages', 'admin', 'renting'].includes(tab)) {
        setActiveTab(tab as typeof activeTab);
      }
      if (mode && (mode === 'guest' || mode === 'host')) {
        setActiveMode(mode as typeof activeMode);
      } else if (!mode && tab === 'dashboard') {
        // Use profile if available, otherwise default to guest
        const defaultMode = profile?.user_type === 'homeowner' ? 'host' : 'guest';
        setActiveMode(defaultMode);
        navigate(`/profile?tab=dashboard&mode=${defaultMode}`, { replace: true });
      }
      return;
    }

    // No URL params - set defaults immediately (don't wait for profile)
    if (!hasInitialized.current) {
      if (hasAdminAccess) {
        setActiveTab('admin');
        setActiveMode('host');
        navigate('/profile?tab=admin&mode=host', { replace: true });
      } else {
        // Default to dashboard with guest mode (will update when profile loads)
        const defaultMode = profile?.user_type === 'homeowner' ? 'host' : 'guest';
        setActiveTab('dashboard');
        setActiveMode(defaultMode);
        navigate(`/profile?tab=dashboard&mode=${defaultMode}`, { replace: true });
      }
      hasInitialized.current = true;
    } else {
      // Update mode if profile loads and we're on dashboard
      if (activeTab === 'dashboard' && profile?.user_type) {
        const correctMode = profile.user_type === 'homeowner' ? 'host' : 'guest';
        if (activeMode !== correctMode) {
          setActiveMode(correctMode);
          navigate(`/profile?tab=dashboard&mode=${correctMode}`, { replace: true });
        }
      }
    }
  }, [user, profile?.user_type, navigate, hasAdminAccess, authLoading, location.search, activeTab, activeMode]);

  // Removed unnecessary cleanup - no timeout ref needed

  // Watch for URL parameter changes after initialization (e.g., when navigating from Header)
  React.useEffect(() => {
    // Only run after initialization is complete
    if (!hasInitialized.current || authLoading || !user) {
      return;
    }

    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const mode = params.get('mode');

    // Update active tab if URL parameter changed
    if (tab && ['dashboard', 'profile', 'messages', 'admin', 'renting'].includes(tab)) {
      setActiveTab(tab as 'dashboard' | 'profile' | 'messages' | 'admin' | 'renting');
    }

    // Update active mode if URL parameter changed (only for dashboard)
    if (mode && (mode === 'guest' || mode === 'host')) {
      setActiveMode(mode as 'guest' | 'host');
    } else if (!mode && tab === 'dashboard') {
      // If dashboard tab but no mode, set default mode
      const defaultMode = profile?.user_type === 'homeowner' ? 'host' : 'guest';
      setActiveMode(defaultMode);
      navigate(`/profile?tab=dashboard&mode=${defaultMode}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, user, profile?.user_type, navigate, authLoading]);

  // Show loading spinner while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If no user after loading, redirect will happen in useEffect
  if (!user) {
    return null; 
  }

  // Don't show loading state - render immediately with defaults

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 m-0 p-0">
      <Header />
      
      <main className="flex-grow m-0 p-0">
        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="text-base sm:text-lg">
                  {user.user_metadata?.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  <span className="animated-red-line">
                    {(user.user_metadata?.name || 'Welcome').split('').map((char, index) => (
                      <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
                    ))}
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {user.user_metadata?.name ? user.email : 'Complete your profile'}
                </p>
                <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-xs sm:text-sm text-gray-500">(24 reviews)</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-2 sm:px-4">
            <div className="flex space-x-2 sm:space-x-4 md:space-x-8 overflow-x-auto scrollbar-hide">
              {hasAdminAccess ? (
                // Admin Navigation: Admin >> Notifications >> Renting >> Edit Profile
                <>
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      navigate('/profile?tab=admin&mode=host', { replace: true });
                    }}
                    className={`py-3 sm:py-4 px-2 sm:px-1 font-medium text-sm sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'admin'
                        ? 'text-black bg-pastel-purple/50 rounded-md'
                        : 'text-gray-500 hover:text-gray-600 hover:bg-pastel-blue/30'
                    }`}
                  >
                    <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline" />
                    Admin
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('messages');
                      navigate('/profile?tab=messages', { replace: true });
                    }}
                    className={`py-3 sm:py-4 px-2 sm:px-1 font-medium text-sm sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'messages'
                        ? 'text-black bg-pastel-purple/50 rounded-md'
                        : 'text-gray-500 hover:text-gray-600 hover:bg-pastel-blue/30'
                    }`}
                  >
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline" />
                    <span className="hidden sm:inline">Messages</span>
                    <span className="sm:hidden">Msgs</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('renting');
                      navigate('/profile?tab=renting&mode=guest', { replace: true });
                    }}
                    className={`py-3 sm:py-4 px-2 sm:px-1 font-medium text-sm sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'renting'
                        ? 'text-black bg-pastel-purple/50 rounded-md'
                        : 'text-gray-500 hover:text-gray-600 hover:bg-pastel-blue/30'
                    }`}
                  >
                    <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline" />
                    Renting
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      navigate('/profile?tab=profile', { replace: true });
                    }}
                    className={`py-3 sm:py-4 px-2 sm:px-1 font-medium text-sm sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'profile'
                        ? 'text-black bg-pastel-purple/50 rounded-md'
                        : 'text-gray-500 hover:text-gray-600 hover:bg-pastel-blue/30'
                    }`}
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                // Regular User Navigation
                <>
                  <button
                    onClick={() => {
                      const defaultMode = profile?.user_type === 'homeowner' ? 'host' : 'guest';
                      setActiveTab('dashboard');
                      setActiveMode(defaultMode);
                      navigate(`/profile?tab=dashboard&mode=${defaultMode}`, { replace: true });
                    }}
                    className={`py-3 sm:py-4 px-2 sm:px-1 font-medium text-sm sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'dashboard'
                        ? 'text-black bg-pastel-purple/50 rounded-md'
                        : 'text-gray-500 hover:text-gray-600 hover:bg-pastel-blue/30'
                    }`}
                  >
                Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      navigate('/profile?tab=profile', { replace: true });
                    }}
                    className={`py-3 sm:py-4 px-2 sm:px-1 font-medium text-sm sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'profile'
                        ? 'text-black bg-pastel-purple/50 rounded-md'
                        : 'text-gray-500 hover:text-gray-600 hover:bg-pastel-blue/30'
                    }`}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('messages');
                      navigate('/profile?tab=messages', { replace: true });
                    }}
                    className={`py-3 sm:py-4 px-2 sm:px-1 font-medium text-sm sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
                      activeTab === 'messages'
                        ? 'text-black bg-pastel-purple/50 rounded-md'
                        : 'text-gray-500 hover:text-gray-600 hover:bg-pastel-blue/30'
                    }`}
                  >
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1 inline" />
                    <span className="hidden sm:inline">Messages</span>
                    <span className="sm:hidden">Msgs</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mode Toggle - Only show on dashboard */}
        {activeTab === 'dashboard' && (
          <div className="bg-white border-b">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex space-x-3 sm:space-x-8">
                <button
                  onClick={() => {
                    setActiveMode('guest');
                    // Force re-render by updating URL
                    navigate('/profile?tab=dashboard&mode=guest', { replace: true });
                  }}
                  className={`py-2 sm:py-3 px-3 sm:px-4 rounded-md font-medium text-sm transition-colors border-b-2 ${
                    activeMode === 'guest'
                      ? 'text-black bg-indigo-50 border-indigo-400'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  Renting
                </button>
                <button
                  onClick={() => {
                    setActiveMode('host');
                    // Force re-render by updating URL
                    navigate('/profile?tab=dashboard&mode=host', { replace: true });
                  }}
                  className={`py-2 sm:py-3 px-3 sm:px-4 rounded-md font-medium text-sm transition-colors border-b-2 ${
                    activeMode === 'host'
                      ? 'text-black bg-rose-50 border-rose-400'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  Hosting
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {activeTab === 'dashboard' && (
            <>
              {activeMode === 'guest' ? (
                <FixedGuestDashboard key={`guest-${activeMode}`} />
              ) : (
                <EnhancedHostDashboard key={`host-${activeMode}`} />
              )}
            </>
          )}
          
          {activeTab === 'profile' && (
            <EnhancedUserProfile 
                isEditing={isEditingProfile}
                onEditToggle={() => setIsEditingProfile(!isEditingProfile)}
              />
          )}
          
          {activeTab === 'messages' && (
            <UnifiedMessages />
          )}
          
          
          {activeTab === 'renting' && hasAdminAccess && (
            <FixedGuestDashboard />
          )}
          
          {activeTab === 'admin' && (
            <AdminGuard>
              <SimpleAdminDashboard />
            </AdminGuard>
          )}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};


export default ProfilePage;
