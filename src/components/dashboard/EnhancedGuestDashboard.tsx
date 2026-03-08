import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, Heart, Clock, CheckCircle, XCircle, AlertCircle, MessageSquare, Bell } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface Booking {
  id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  status: string;
  payment_status: string;
  total_price: number;
  team_size: number;
  notes?: string;
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

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

const EnhancedGuestDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Start with false - show UI immediately
  const [stats, setStats] = useState({
    upcomingTrips: 0,
    pastTrips: 0,
    savedProperties: 0,
    totalSpent: 0,
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as { [key: number]: number }
  });

  const fetchGuestData = useCallback(async () => {
    try {
      // Don't set loading to true - load in background, show UI immediately

      // Fetch all data in parallel for faster loading (instead of sequential)
      const [bookingsResult, favoritesResult, notificationsResult, reviewsResult] = await Promise.all([
        // Fetch bookings with property details from Supabase
        supabase
          .from('bookings')
          .select(`
            *,
            properties:property_id(
              id, title, address, neighborhood, price,
              property_images(url, is_primary)
            )
          `)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false }),
        
        // Fetch favorites from Supabase
        supabase
          .from('favorites')
          .select(`
            *,
            properties:property_id(
              id, title, address, neighborhood, price,
              property_images(url, is_primary)
            )
          `)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false }),
        
        // Fetch notifications
        supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(5),
        
        // Fetch user reviews for stats
        supabase
          .from('reviews')
          .select('rating, property_rating')
          .eq('user_id', user?.id)
          .eq('is_published', true)
      ]);

      const { data: dbBookings, error: bookingError } = bookingsResult;
      const { data: dbFavorites, error: favoriteError } = favoritesResult;
      const { data: notificationData, error: notificationError } = notificationsResult;
      const { data: reviewsData } = reviewsResult;

      // Handle errors gracefully - don't throw, just log and continue with empty data
      if (bookingError) {
        console.error('Error fetching bookings:', bookingError);
      }

      if (favoriteError) {
        console.error('Error fetching favorites:', favoriteError);
      }

      if (notificationError) {
        console.error('Error fetching notifications:', notificationError);
      }

      const bookingData: Booking[] = (dbBookings as unknown as Booking[]) || [];
      const favoriteData: Favorite[] = (dbFavorites as unknown as Favorite[]) || [];

      const bookingsList = bookingData || [];
      const favoritesList = favoriteData || [];
      const notificationsList = (notificationData as Notification[]) || [];
      const reviewsList = (reviewsData as Array<{ rating: number; property_rating?: number | null }>) || [];

      // Calculate stats
      const now = new Date();
      const upcomingTrips = bookingsList.filter(booking => 
        isAfter(new Date(booking.start_date), now) && booking.status === 'confirmed'
      ).length;
      
      const pastTrips = bookingsList.filter(booking => 
        isBefore(new Date(booking.end_date), now) || booking.status === 'completed'
      ).length;

      const totalSpent = bookingsList
        .filter(booking => booking.status === 'completed' && booking.payment_status === 'paid')
        .reduce((sum, booking) => sum + booking.total_price, 0);

      // Calculate average rating using property_rating if available, otherwise rating
      const averageRating = reviewsList.length > 0 
        ? reviewsList.reduce((sum, review) => sum + (review.property_rating ?? review.rating), 0) / reviewsList.length 
        : 0;

      // Calculate rating distribution for the chart
      const ratingDistribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      reviewsList.forEach(review => {
        const rating = Math.round(review.property_rating ?? review.rating);
        if (rating >= 1 && rating <= 5) {
          ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
        }
      });

      setBookings(bookingsList);
      setFavorites(favoritesList);
      setNotifications(notificationsList);
      setStats({
        upcomingTrips,
        pastTrips,
        savedProperties: favoritesList.length,
        totalSpent,
        averageRating,
        totalReviews: reviewsList.length,
        ratingDistribution
      });

    } catch (error) {
      console.error('Error fetching guest data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      fetchGuestData();
    }
  }, [user, fetchGuestData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'canceled': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const upcomingBookings = bookings.filter(booking => 
    isAfter(new Date(booking.start_date), new Date()) && booking.status === 'confirmed'
  );

  const pastBookings = bookings.filter(booking => 
    isBefore(new Date(booking.end_date), new Date()) || booking.status === 'completed'
  );

  const pendingBookings = bookings.filter(booking => booking.status === 'pending');

  // Don't show loading spinner - render immediately with empty states
  // Data will load in the background and update the UI

  return (
    <div className="space-y-8">
      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Upcoming Trips</p>
                <p className="text-2xl font-bold">{stats.upcomingTrips}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Saved Properties</p>
                <p className="text-2xl font-bold">{stats.savedProperties}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Past Trips</p>
                <p className="text-2xl font-bold">{stats.pastTrips}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link to="/locations">
              <Button className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Browse Properties</span>
              </Button>
            </Link>
            <Link to="/profile?tab=messages">
              <Button variant="outline" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>View Messages</span>
              </Button>
            </Link>
            <Link to="/profile?tab=notifications">
              <Button variant="outline" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Rating and Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Rating & Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(stats.averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.totalReviews} reviews written
              </p>
            </div>
            <div className="flex-1">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = stats.ratingDistribution?.[rating] || 0;
                  const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{rating}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <div className="flex-1">
                        <Progress value={percentage} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border ${
                    notification.is_read 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(notification.created_at), 'MMM d, yyyy • h:mm a')}
                      </p>
                    </div>
                    {!notification.is_read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Slates */}
      {pendingBookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Slate Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={booking.properties?.property_images?.find(img => img.is_primary)?.url || '/placeholder.svg'}
                      alt={booking.properties?.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{booking.properties?.title}</h3>
                      <p className="text-sm text-muted-foreground">{booking.properties?.address}</p>
                      <p className="text-sm">
                        {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm">Team size: {booking.team_size} people</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1">{booking.status}</span>
                    </Badge>
                    <p className="text-sm font-medium mt-1">₦{booking.total_price.toLocaleString()}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        const subject = encodeURIComponent(`Slate Dispute: ${booking.id}`);
                        const body = encodeURIComponent(`Hello Admin,%0D%0A%0D%0AI'd like to raise a dispute for slate with reference/ID: ${booking.id}.%0D%0A%0D%0AProperty: ${booking.properties?.title || ''}%0D%0ADates: ${format(new Date(booking.start_date), 'MMM d, yyyy')} - ${format(new Date(booking.end_date), 'MMM d, yyyy')}`);
                        window.location.href = `mailto:hello@filmloca.com?subject=${subject}&body=${body}`;
                      }}
                    >
                      Raise Dispute
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Trips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Trips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Link key={booking.id} to={`/locations/${booking.property_id}`}>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-[#e5e5e5] transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.properties?.property_images?.find(img => img.is_primary)?.url || '/placeholder.svg'}
                        alt={booking.properties?.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{booking.properties?.title}</h3>
                        <p className="text-sm text-muted-foreground">{booking.properties?.address}</p>
                        <p className="text-sm">
                          {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                        </p>
                        <p className="text-sm">Team size: {booking.team_size} people</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1">{booking.status}</span>
                      </Badge>
                      <p className="text-sm font-medium mt-1">₦{booking.total_price.toLocaleString()}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No upcoming trips</p>
              <Button asChild>
                <Link to="/locations">Browse Properties</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Saved Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((favorite) => (
                <Link key={favorite.id} to={`/locations/${favorite.properties.id}`} className="group">
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={favorite.properties?.property_images?.find(img => img.is_primary)?.url || '/placeholder.svg'}
                      alt={favorite.properties?.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold truncate group-hover:underline">
                        {favorite.properties?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{favorite.properties?.neighborhood}</p>
                      <p className="font-medium mt-1">₦{favorite.properties?.price.toLocaleString()}/day</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Saved {format(new Date(favorite.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No saved properties yet</p>
              <Button asChild>
                <Link to="/locations">Explore Properties</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Trips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Past Trips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.slice(0, 5).map((booking) => (
                <Link key={booking.id} to={`/locations/${booking.property_id}`}>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-[#e5e5e5] transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.properties?.property_images?.find(img => img.is_primary)?.url || '/placeholder.svg'}
                        alt={booking.properties?.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{booking.properties?.title}</h3>
                        <p className="text-sm text-muted-foreground">{booking.properties?.address}</p>
                        <p className="text-sm">
                          {format(new Date(booking.start_date), 'MMM d')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Navigate to property detail page with review modal
                          window.location.href = `/locations/${booking.property_id}?showReview=true`;
                        }}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                      <p className="text-sm font-medium mt-1">₦{booking.total_price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No past trips yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedGuestDashboard;
