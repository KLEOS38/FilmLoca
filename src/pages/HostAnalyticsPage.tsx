import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Calendar, 
  Wallet, 
  TrendingUp, 
  BarChart3, 
  ArrowLeft,
  Users,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { supabase } from '@/integrations/supabase/client';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

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

interface HostAnalytics {
  totalProperties: number;
  totalBookings: number;
  totalEarnings: number;
  pendingRequests: number;
  monthlyEarnings: number;
  occupancyRate: number;
  conversionRate: number;
}

const HostAnalyticsPage = () => {
  const { user } = useAuth();
  const { hasAdminAccess } = useAdminAccess();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [analytics, setAnalytics] = useState<HostAnalytics>({
    totalProperties: 0,
    totalBookings: 0,
    totalEarnings: 0,
    pendingRequests: 0,
    monthlyEarnings: 0,
    occupancyRate: 0,
    conversionRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHostAnalyticsData();
    }
  }, [user]);

  const fetchHostAnalyticsData = async () => {
    try {
      setIsLoading(true);

      // Fetch properties owned by the user
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user?.id);

      if (propertyError) throw propertyError;

      // Fetch bookings for the user's properties
      const { data: bookingData, error: bookingError } = await supabase
        .rpc('get_secure_bookings_for_owners');

      if (bookingError) throw bookingError;

      // Calculate analytics
      const totalProperties = propertyData?.length || 0;
      const totalBookings = bookingData?.length || 0;
      const totalEarnings = bookingData?.reduce((total, booking) => {
        if (booking.status === 'completed' && booking.payment_status === 'paid') {
          return total + Number(booking.total_price);
        }
        return total;
      }, 0) || 0;

      const pendingRequests = bookingData?.filter(booking => booking.status === 'pending').length || 0;

      // Calculate monthly earnings
      const currentMonth = new Date();
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      
      const monthlyEarnings = bookingData?.reduce((total, booking) => {
        const bookingDate = new Date(booking.created_at);
        if (bookingDate >= monthStart && bookingDate <= monthEnd &&
            booking.status === 'completed' && booking.payment_status === 'paid') {
          return total + Number(booking.total_price);
        }
        return total;
      }, 0) || 0;

      // Calculate occupancy rate (simplified)
      const totalDays = 30; // Last 30 days
      const bookedDays = bookingData?.reduce((total, booking) => {
        if (booking.status === 'completed' || booking.status === 'confirmed') {
          const startDate = new Date(booking.start_date);
          const endDate = new Date(booking.end_date);
          const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          return total + daysDiff;
        }
        return total;
      }, 0) || 0;

      const occupancyRate = totalProperties > 0 ? (bookedDays / (totalProperties * totalDays)) * 100 : 0;

      // Calculate conversion rate (bookings vs inquiries - simplified)
      const conversionRate = totalBookings > 0 ? Math.min((totalBookings / (totalBookings + pendingRequests)) * 100, 100) : 0;

      setProperties(propertyData || []);
      setBookings(bookingData || []);
      setAnalytics({
        totalProperties,
        totalBookings,
        totalEarnings,
        pendingRequests,
        monthlyEarnings,
        occupancyRate,
        conversionRate
      });

    } catch (error) {
      console.error('Error fetching host analytics data:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Host Analytics | FilmLoca</title>
        <meta name="description" content="View your property analytics and performance metrics on FilmLoca" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link to={hasAdminAccess ? "/profile?tab=admin" : "/profile?tab=dashboard"}>
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Profile
                  </Button>
                </Link>
              </div>
              <h1 className="text-3xl font-bold mb-2">Host Analytics</h1>
              <p className="text-muted-foreground">
                Track your property performance and earnings
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Home className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Properties</p>
                      <p className="text-2xl font-bold">{analytics.totalProperties}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Slates</p>
                      <p className="text-2xl font-bold">{analytics.totalBookings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Wallet className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold">₦{analytics.totalEarnings.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Monthly Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Monthly Earnings</span>
                      <span className="text-lg font-bold">₦{analytics.monthlyEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Occupancy Rate</span>
                      <span className="text-lg font-bold">{analytics.occupancyRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-lg font-bold">{analytics.conversionRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Booking Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Pending Requests</span>
                      <Badge variant="outline">{analytics.pendingRequests}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Bookings</span>
                      <Badge variant="default">{analytics.totalBookings}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Properties Listed</span>
                      <Badge variant="secondary">{analytics.totalProperties}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{booking.properties?.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Guest: {booking.profiles?.name || booking.profiles?.email}
                          </p>
                          <p className="text-sm">
                            {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1">{booking.status}</span>
                          </Badge>
                          <p className="text-sm font-medium mt-1">₦{booking.total_price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bookings yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

// Helper functions
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return <CheckCircle className="h-3 w-3" />;
    case 'pending':
      return <Clock className="h-3 w-3" />;
    case 'cancelled':
      return '✗';
    default:
      return '?';
  }
};

export default HostAnalyticsPage;
