import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Home, Calendar, Wallet, Star, TrendingUp, Users, Eye, CheckCircle, Clock, XCircle, AlertCircle, Plus, BarChart3, AlertTriangle, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useSecureBookings } from '@/hooks/useSecureBookings';
import { SecureDataDisplay } from '@/components/security/SecureDataDisplay';
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Property {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  price: number;
  is_verified: boolean;
  is_published: boolean;
  created_at: string;
  property_images: Array<{
    url: string;
    is_primary: boolean;
  }>;
}

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  payment_status: string;
  total_price: number;
  team_size: number;
  created_at: string;
  properties: {
    title: string;
  };
  profiles: {
    name: string;
    email: string;
  };
}

interface Analytics {
  totalProperties: number;
  totalBookings: number;
  totalEarnings: number;
  pendingRequests: number;
  monthlyEarnings: number;
  occupancyRate: number;
  conversionRate: number;
}

const EnhancedHostDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalProperties: 0,
    totalBookings: 0,
    totalEarnings: 0,
    pendingRequests: 0,
    monthlyEarnings: 0,
    occupancyRate: 0,
    conversionRate: 0
  });
  const [isLoading, setIsLoading] = useState(false); // Start with false - show UI immediately
  const [activeSection, setActiveSection] = useState<'upcoming' | 'add-property' | 'manage-properties' | 'recent-trips' | 'analytics'>('upcoming');

  const fetchHostData = useCallback(async () => {
    try {
      // Don't set loading to true - load in background

      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select(`
          *,
          property_images(url, is_primary)
        `)
        .eq('owner_id', user?.id);

      if (propertyError) throw propertyError;

      const { data: bookingData, error: bookingError } = await supabase
        .rpc('get_secure_bookings_for_owners');

      if (bookingError) throw bookingError;

      const totalProperties = propertyData?.length || 0;
      const safeBookings = (bookingData as unknown as Booking[] | undefined)?.map((b) => ({
        ...b,
        properties: b?.properties || { title: '' },
        profiles: b?.profiles || { name: '', email: '' },
      })) || [];

      const totalBookings = safeBookings.length;
      const totalEarnings = safeBookings.reduce((total, booking) => {
        if (booking.status === 'completed' && booking.payment_status === 'paid') {
          return total + Number(booking.total_price);
        }
        return total;
      }, 0);

      const pendingRequests = safeBookings.filter(booking => booking.status === 'pending').length;

      const currentMonth = new Date();
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);

      const monthlyEarnings = safeBookings.reduce((total, booking) => {
        const bookingDate = new Date(booking.created_at);
        if (bookingDate >= monthStart && bookingDate <= monthEnd &&
          booking.status === 'completed' && booking.payment_status === 'paid') {
          return total + Number(booking.total_price);
        }
        return total;
      }, 0);

      const totalDays = 30;
      const bookedDays = safeBookings.reduce((total, booking) => {
        if (booking.status === 'confirmed' || booking.status === 'completed') {
          const start = new Date(booking.start_date);
          const end = new Date(booking.end_date);
          const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          return total + days;
        }
        return total;
      }, 0);

      const occupancyRate = totalProperties > 0 ? (bookedDays / (totalProperties * totalDays)) * 100 : 0;
      const conversionRate = totalBookings > 0 ? Math.min((totalBookings / (totalBookings + pendingRequests)) * 100, 100) : 0;

      setProperties(propertyData || []);
      setBookings(safeBookings);
      setAnalytics({
        totalProperties,
        totalBookings,
        totalEarnings,
        pendingRequests,
        monthlyEarnings,
        occupancyRate,
        conversionRate
      });

    } catch (error: any) {
      console.error('Error fetching host data:', error);
      toast.error(`Dashboard Error: ${error.message || error.error_description || 'Failed to load data'}`);
      if (error.details) console.error('Error Details:', error.details);
      if (error.hint) console.error('Error Hint:', error.hint);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      console.log('🔄 EnhancedHostDashboard: Fetching host data for user:', user.id);
      fetchHostData();
    } else {
      console.log('⚠️ EnhancedHostDashboard: No user ID available, cannot fetch data');
      setIsLoading(false);
      // Clear data when no user
      setProperties([]);
      setBookings([]);
      setAnalytics({
        totalProperties: 0,
        totalBookings: 0,
        totalEarnings: 0,
        pendingRequests: 0,
        monthlyEarnings: 0,
        occupancyRate: 0,
        conversionRate: 0
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]); // Only re-fetch when user ID changes, not when fetchHostData updates

  // Normalize booking status to remove "approved" or "confirmed and approved"
  const normalizeStatus = (status: string): string => {
    if (!status) return 'pending';
    const normalized = status.toLowerCase();

    // If status contains "approved", extract just the booking status part
    if (normalized.includes('approved')) {
      if (normalized.includes('confirmed')) {
        return 'confirmed';
      } else if (normalized.includes('completed')) {
        return 'completed';
      } else if (normalized.includes('pending')) {
        return 'pending';
      } else {
        return 'confirmed'; // Default to confirmed for paid bookings
      }
    }

    // Return normalized status (confirmed, completed, pending, cancelled)
    return normalized === 'canceled' || normalized === 'cancelled' ? 'cancelled' : normalized;
  };

  const getStatusColor = (status: string) => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
      case 'canceled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string): string => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      case 'cancelled':
      case 'canceled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  // Normalize booking statuses for filtering
  const normalizeBookingStatus = (status: string): string => {
    if (!status) return 'pending';
    const normalized = status.toLowerCase();
    if (normalized.includes('approved')) {
      if (normalized.includes('confirmed')) return 'confirmed';
      if (normalized.includes('completed')) return 'completed';
      if (normalized.includes('pending')) return 'pending';
      return 'confirmed';
    }
    return normalized === 'canceled' || normalized === 'cancelled' ? 'cancelled' : normalized;
  };

  const pendingBookings = bookings.filter(booking => normalizeBookingStatus(booking.status) === 'pending');
  const upcomingBookings = bookings.filter(booking =>
    new Date(booking.start_date) > new Date() && normalizeBookingStatus(booking.status) === 'confirmed'
  );
  // Past slates: completed bookings or past confirmed bookings, sorted by most recent first
  const recentTrips = bookings
    .filter(booking => {
      const status = normalizeBookingStatus(booking.status);
      return status === 'completed' ||
        (new Date(booking.end_date) < new Date() && status === 'confirmed');
    })
    .sort((a, b) => {
      // Sort by end_date descending (most recent first)
      return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
    });

  // Don't block rendering - show content immediately, data loads in background
  // Show loading indicator only if we have no data yet and are still loading
  const showLoadingIndicator = isLoading && properties.length === 0 && bookings.length === 0;

  if (showLoadingIndicator) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs - All in one group */}
      <div className="flex flex-wrap lg:flex-nowrap gap-1 bg-pastel-pink/20 p-1 rounded-lg divide-x divide-gray-300">
        <Button
          variant={activeSection === 'upcoming' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveSection('upcoming')}
          className="flex-[0_0_calc(50%-0.125rem)] sm:flex-[0_0_calc(33.333%-0.17rem)] lg:flex-none text-xs sm:text-sm hover:bg-pastel-pink/60 hover:text-pink-800 border-r border-gray-300"
        >
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="hidden sm:inline">Upcoming Slates</span>
          <span className="sm:hidden">Upcoming</span>
        </Button>
        <Button
          variant={activeSection === 'manage-properties' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            setActiveSection('manage-properties');
            navigate('/manage-properties');
          }}
          className="flex-[0_0_calc(50%-0.125rem)] sm:flex-[0_0_calc(33.333%-0.17rem)] lg:flex-none text-xs sm:text-sm hover:bg-pastel-pink/60 hover:text-pink-800 border-r border-gray-300"
        >
          <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="hidden md:inline">Manage Properties</span>
          <span className="md:hidden">Manage</span>
        </Button>
        <Button
          variant={activeSection === 'add-property' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            setActiveSection('add-property');
            navigate('/list-property');
          }}
          className="flex-[0_0_calc(50%-0.125rem)] sm:flex-[0_0_calc(33.333%-0.17rem)] lg:flex-none text-xs sm:text-sm hover:bg-pastel-pink/60 hover:text-pink-800 border-r border-gray-300"
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="hidden md:inline">Add New Property</span>
          <span className="md:hidden">Add</span>
        </Button>
        <Button
          variant={activeSection === 'recent-trips' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveSection('recent-trips')}
          className="flex-[0_0_calc(50%-0.125rem)] sm:flex-[0_0_calc(33.333%-0.17rem)] lg:flex-none text-xs sm:text-sm hover:bg-pastel-pink/60 hover:text-pink-800 border-r border-gray-300"
        >
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="hidden sm:inline">Past Slates</span>
          <span className="sm:hidden">Past</span>
        </Button>
        <Button
          variant={activeSection === 'analytics' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            setActiveSection('analytics');
            navigate('/host-analytics');
          }}
          className="flex-[0_0_calc(50%-0.125rem)] sm:flex-[0_0_calc(33.333%-0.17rem)] lg:flex-none text-xs sm:text-sm hover:bg-pastel-pink/60 hover:text-pink-800 border-r border-gray-300"
        >
          <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="hidden md:inline">View Analytics</span>
          <span className="md:hidden">Analytics</span>
        </Button>
      </div>

      {/* Upcoming Slates Section */}
      {activeSection === 'upcoming' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Slates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{booking.properties?.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Guest: {booking.profiles?.name || booking.profiles?.email}
                      </p>
                      <p className="text-xs sm:text-sm mt-1">
                        {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 text-xs">{getStatusLabel(booking.status)}</span>
                      </Badge>
                      <p className="text-xs sm:text-sm font-medium mt-1">₦{booking.total_price.toLocaleString()}</p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs sm:text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            const subject = `Slate Dispute (Host): ${booking.id}`;
                            const body = `Hello Admin,

I'd like to raise a dispute for slate with reference/ID: ${booking.id}.

Property: ${booking.properties?.title || ''}
Dates: ${format(new Date(booking.start_date), 'MMM d, yyyy')} - ${format(new Date(booking.end_date), 'MMM d, yyyy')}

Concern:
`;
                            const mailtoLink = `mailto:hello@filmloca.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                            window.location.href = mailtoLink;
                          }}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Dispute
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming slates</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Past Slates Section - Shows completed slates booked by renters */}
      {activeSection === 'recent-trips' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Past Slates
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Completed slates booked by renters for your properties
            </p>
          </CardHeader>
          <CardContent>
            {recentTrips.length > 0 ? (
              <div className="space-y-4">
                {recentTrips.map((booking) => (
                  <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{booking.properties?.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Renter: {booking.profiles?.name || booking.profiles?.email}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {format(new Date(booking.start_date), 'MMM d, yyyy')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Booked: {format(new Date(booking.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="text-left sm:text-right sm:ml-4 w-full sm:w-auto">
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1 text-xs">{getStatusLabel(booking.status)}</span>
                      </Badge>
                      <p className="text-xs sm:text-sm font-medium mt-2">₦{booking.total_price.toLocaleString()}</p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs sm:text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            const subject = `Slate Dispute (Host): ${booking.id}`;
                            const body = `Hello Admin,

I'd like to raise a dispute for slate with reference/ID: ${booking.id}.

Property: ${booking.properties?.title || ''}
Renter: ${booking.profiles?.name || booking.profiles?.email || 'Unknown'}
Dates: ${format(new Date(booking.start_date), 'MMM d, yyyy')} - ${format(new Date(booking.end_date), 'MMM d, yyyy')}

Concern:
`;
                            const mailtoLink = `mailto:hello@filmloca.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                            window.location.href = mailtoLink;
                          }}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Dispute
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No past slates</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Completed slates booked by renters will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedHostDashboard;
