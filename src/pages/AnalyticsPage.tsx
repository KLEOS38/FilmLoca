import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Calendar, 
  Wallet, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useSecureBookings } from '@/hooks/useSecureBookings';
import { SecureDataDisplay } from '@/components/security/SecureDataDisplay';
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
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

interface Analytics {
  totalProperties: number;
  totalBookings: number;
  totalEarnings: number;
  pendingRequests: number;
  monthlyEarnings: number;
  occupancyRate: number;
  conversionRate: number;
}

const AnalyticsPage = () => {
  const { user, profile } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalProperties: 0,
    totalBookings: 0,
    totalEarnings: 0,
    pendingRequests: 0,
    monthlyEarnings: 0,
    occupancyRate: 0,
    conversionRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Determine if user is a host or guest
  const isHost = profile?.user_type === 'homeowner';

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user]);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);

      if (isHost) {
        // Host analytics - fetch properties owned by the user
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', user?.id);

        if (propertyError) throw propertyError;

        // Fetch bookings for the user's properties
        const { data: bookingData, error: bookingError } = await supabase
          .rpc('get_secure_bookings_for_owners');

        if (bookingError) throw bookingError;

        setProperties(propertyData || []);
        setBookings(bookingData || []);
      } else {
        // Guest analytics - fetch bookings made by the user
        const { data: bookingData, error: bookingError } = await supabase
          .from('bookings')
          .select(`
            *,
            properties (
              id,
              title,
              address,
              neighborhood,
              price,
              property_images
            )
          `)
          .eq('user_id', user?.id);

        if (bookingError) throw bookingError;

        // Fetch favorites
        const { data: favoritesData, error: favoritesError } = await supabase
          .from('favorites')
          .select(`
            *,
            properties (
              id,
              title,
              address,
              neighborhood,
              price,
              property_images
            )
          `)
          .eq('user_id', user?.id);

        if (favoritesError) throw favoritesError;

        setBookings(bookingData || []);
        setFavorites(favoritesData || []);
      }

      // Calculate analytics based on user type
      let analyticsData;
      
      if (isHost) {
        // Host analytics
        const totalProperties = properties.length;
        const totalBookings = bookings.length;
        const totalEarnings = bookings.reduce((total, booking) => {
          if (booking.status === 'completed' && booking.payment_status === 'paid') {
            return total + Number(booking.total_price);
          }
          return total;
        }, 0);

        const pendingRequests = bookings.filter(booking => booking.status === 'pending').length;

        // Calculate monthly earnings
        const currentMonth = new Date();
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        
        const monthlyEarnings = bookings.reduce((total, booking) => {
          const bookingDate = new Date(booking.created_at);
          if (bookingDate >= monthStart && bookingDate <= monthEnd &&
              booking.status === 'completed' && booking.payment_status === 'paid') {
            return total + Number(booking.total_price);
          }
          return total;
        }, 0);

        // Calculate occupancy rate (simplified)
        const totalDays = 30; // Last 30 days
        const bookedDays = bookings.reduce((total, booking) => {
          if (booking.status === 'completed' || booking.status === 'confirmed') {
            const startDate = new Date(booking.start_date);
            const endDate = new Date(booking.end_date);
            const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            return total + daysDiff;
          }
          return total;
        }, 0);

        const occupancyRate = totalProperties > 0 ? (bookedDays / (totalProperties * totalDays)) * 100 : 0;

        // Calculate conversion rate (bookings vs inquiries - simplified)
        const conversionRate = totalBookings > 0 ? Math.min((totalBookings / (totalBookings + pendingRequests)) * 100, 100) : 0;

        analyticsData = {
          totalProperties,
          totalBookings,
          totalEarnings,
          pendingRequests,
          monthlyEarnings,
          occupancyRate,
          conversionRate
        };
      } else {
        // Guest analytics
        const totalBookings = bookings.length;
        const totalSpent = bookings.reduce((total, booking) => {
          if (booking.payment_status === 'paid') {
            return total + Number(booking.total_price);
          }
          return total;
        }, 0);

        const upcomingBookings = bookings.filter(booking => 
          booking.status === 'confirmed' && new Date(booking.start_date) > new Date()
        ).length;

        const pastBookings = bookings.filter(booking => 
          booking.status === 'completed' || new Date(booking.end_date) < new Date()
        ).length;

        const savedProperties = favorites.length;

        // Calculate monthly spending
        const currentMonth = new Date();
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        
        const monthlySpending = bookings.reduce((total, booking) => {
          const bookingDate = new Date(booking.created_at);
          if (bookingDate >= monthStart && bookingDate <= monthEnd &&
              booking.payment_status === 'paid') {
            return total + Number(booking.total_price);
          }
          return total;
        }, 0);

        analyticsData = {
          totalProperties: savedProperties, // Use saved properties count
          totalBookings,
          totalEarnings: totalSpent, // Use total spent for guests
          pendingRequests: upcomingBookings,
          monthlyEarnings: monthlySpending,
          occupancyRate: 0, // Not applicable for guests
          conversionRate: 0 // Not applicable for guests
        };
      }

      setAnalytics(analyticsData);

    } catch (error) {
      console.error('Error fetching analytics data:', error);
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
        <title>Analytics | FilmLoca</title>
        <meta name="description" content="View your property analytics and performance metrics on FilmLoca" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link to="/profile?tab=dashboard">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Profile
                  </Button>
                </Link>
              </div>
              <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                {isHost 
                  ? "Track your property performance and earnings"
                  : "Track your trips, spending, and slate history"
                }
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Home className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        {isHost ? "Properties" : "Saved Properties"}
                      </p>
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
                      <p className="text-sm font-medium text-muted-foreground">
                        {isHost ? "Total Slates" : "Total Trips"}
                      </p>
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
                      <p className="text-sm font-medium text-muted-foreground">
                        {isHost ? "Total Earnings" : "Total Spent"}
                      </p>
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
                    {isHost ? "Monthly Performance" : "Monthly Activity"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {isHost ? "Monthly Earnings" : "Monthly Spending"}
                      </span>
                      <span className="text-lg font-bold">₦{analytics.monthlyEarnings.toLocaleString()}</span>
                    </div>
                    {isHost && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Occupancy Rate</span>
                          <span className="text-lg font-bold">{analytics.occupancyRate.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Conversion Rate</span>
                          <span className="text-lg font-bold">{analytics.conversionRate.toFixed(1)}%</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {isHost ? "Booking Status" : "Trip Status"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {isHost ? "Pending Requests" : "Upcoming Trips"}
                      </span>
                      <Badge variant="outline">{analytics.pendingRequests}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {isHost ? "Total Slates" : "Total Trips"}
                      </span>
                      <Badge variant="default">{analytics.totalBookings}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {isHost ? "Properties Listed" : "Saved Properties"}
                      </span>
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
                  {isHost ? "Recent Bookings" : "Recent Trips"}
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
                    <p className="text-muted-foreground">
                      {isHost ? "No bookings yet" : "No trips yet"}
                    </p>
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
      return <XCircle className="h-3 w-3" />;
    default:
      return <AlertCircle className="h-3 w-3" />;
  }
};

export default AnalyticsPage;
