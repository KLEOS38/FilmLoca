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
  Heart,
  MapPin
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
    address: string;
    neighborhood: string;
    price: number;
    property_images: Array<{
      url: string;
      is_primary: boolean;
    }>;
  };
}

interface Favorite {
  id: string;
  created_at: string;
  properties: {
    id: string;
    title: string;
    address: string;
    neighborhood: string;
    price: number;
    property_images: Array<{
      url: string;
      is_primary: boolean;
    }>;
  };
}

interface GuestAnalytics {
  totalTrips: number;
  totalSpent: number;
  savedProperties: number;
  upcomingTrips: number;
  monthlySpending: number;
  averageTripValue: number;
}

const GuestAnalyticsPage = () => {
  const { user } = useAuth();
  const { hasAdminAccess } = useAdminAccess();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [analytics, setAnalytics] = useState<GuestAnalytics>({
    totalTrips: 0,
    totalSpent: 0,
    savedProperties: 0,
    upcomingTrips: 0,
    monthlySpending: 0,
    averageTripValue: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGuestAnalyticsData();
    }
  }, [user]);

  const fetchGuestAnalyticsData = async () => {
    try {
      setIsLoading(true);

      // Fetch bookings made by the user
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

      // Calculate analytics
      const totalTrips = bookingData?.length || 0;
      const totalSpent = bookingData?.reduce((total, booking) => {
        if (booking.payment_status === 'paid') {
          return total + Number(booking.total_price);
        }
        return total;
      }, 0) || 0;

      const upcomingTrips = bookingData?.filter(booking => 
        booking.status === 'confirmed' && new Date(booking.start_date) > new Date()
      ).length || 0;

      const savedProperties = favoritesData?.length || 0;

      // Calculate monthly spending
      const currentMonth = new Date();
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      
      const monthlySpending = bookingData?.reduce((total, booking) => {
        const bookingDate = new Date(booking.created_at);
        if (bookingDate >= monthStart && bookingDate <= monthEnd &&
            booking.payment_status === 'paid') {
          return total + Number(booking.total_price);
        }
        return total;
      }, 0) || 0;

      const averageTripValue = totalTrips > 0 ? totalSpent / totalTrips : 0;

      setBookings(bookingData || []);
      setFavorites(favoritesData || []);
      setAnalytics({
        totalTrips,
        totalSpent,
        savedProperties,
        upcomingTrips,
        monthlySpending,
        averageTripValue
      });

    } catch (error) {
      console.error('Error fetching guest analytics data:', error);
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
        <title>Guest Analytics | FilmLoca</title>
        <meta name="description" content="View your trip analytics and spending history on FilmLoca" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link to={hasAdminAccess ? "/profile?tab=renting" : "/profile?tab=dashboard"}>
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Profile
                  </Button>
                </Link>
              </div>
              <h1 className="text-3xl font-bold mb-2">Guest Analytics</h1>
              <p className="text-muted-foreground">
                Track your trips, spending, and slate history
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Saved Properties</p>
                      <p className="text-2xl font-bold">{analytics.savedProperties}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Trips</p>
                      <p className="text-2xl font-bold">{analytics.totalTrips}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Wallet className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">₦{analytics.totalSpent.toLocaleString()}</p>
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
                    Monthly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Monthly Spending</span>
                      <span className="text-lg font-bold">₦{analytics.monthlySpending.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Trip Value</span>
                      <span className="text-lg font-bold">₦{analytics.averageTripValue.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Trip Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Upcoming Trips</span>
                      <Badge variant="outline">{analytics.upcomingTrips}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Trips</span>
                      <Badge variant="default">{analytics.totalTrips}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Saved Properties</span>
                      <Badge variant="secondary">{analytics.savedProperties}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Trips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Trips
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
                            {booking.properties?.neighborhood}
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
                    <p className="text-muted-foreground">No trips yet</p>
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
      return '✓';
    case 'pending':
      return '⏳';
    case 'cancelled':
      return '✗';
    default:
      return '?';
  }
};

export default GuestAnalyticsPage;
