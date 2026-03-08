import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, Heart, Clock, CheckCircle, XCircle, AlertCircle, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { format, isAfter, isBefore, addDays, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import BookingModification from '@/components/booking/BookingModification';

interface Booking {
  id: string;
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

const FixedGuestDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Start with false - show UI immediately
  const [activeSection, setActiveSection] = useState<'bookings' | 'favorites' | 'recent-trips'>('bookings');

  const fetchGuestData = useCallback(async () => {
    try {
      // Don't set loading to true - load in background
      if (!user?.id) {
        return;
      }

      // Fetch bookings from Supabase
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id,
          start_date,
          end_date,
          status,
          payment_status,
          total_price,
          team_size,
          notes,
          created_at,
          properties:property_id(
            id,
            title,
            address,
            neighborhood,
            price,
            property_images(url, is_primary)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        setBookings([]);
      } else {
        // Transform bookings to match Booking interface
        const transformedBookings: Booking[] = (bookingsData || []).map((booking: any) => ({
          id: booking.id,
          start_date: booking.start_date,
          end_date: booking.end_date,
          status: booking.status,
          payment_status: booking.payment_status || 'unpaid',
          total_price: booking.total_price || 0,
          team_size: booking.team_size || 1,
          notes: booking.notes || '',
          created_at: booking.created_at,
          properties: {
            id: booking.properties?.id || '',
            title: booking.properties?.title || 'Unknown Property',
            address: booking.properties?.address || '',
            neighborhood: booking.properties?.neighborhood || '',
            price: booking.properties?.price || 0,
            property_images: booking.properties?.property_images?.map((img: any) => ({
              url: img.url || '/placeholder.svg',
              is_primary: img.is_primary || false
            })) || [{ url: '/placeholder.svg', is_primary: true }]
          }
        }));
        setBookings(transformedBookings);
      }

      // Fetch favorites from Supabase
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('favorites')
        .select(`
          id,
          created_at,
          properties:property_id(
            id,
            title,
            address,
            neighborhood,
            price,
            property_images(url, is_primary)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (favoritesError) {
        console.error('Error fetching favorites:', favoritesError);
        setFavorites([]);
      } else {
        // Transform favorites to match Favorite interface
        const transformedFavorites: Favorite[] = (favoritesData || []).map((favorite: any) => ({
          id: favorite.id,
          created_at: favorite.created_at,
          properties: {
            id: favorite.properties?.id || '',
            title: favorite.properties?.title || 'Unknown Property',
            address: favorite.properties?.address || '',
            neighborhood: favorite.properties?.neighborhood || '',
            price: favorite.properties?.price || 0,
            property_images: favorite.properties?.property_images?.map((img: any) => ({
              url: img.url || '/placeholder.svg',
              is_primary: img.is_primary || false
            })) || [{ url: '/placeholder.svg', is_primary: true }]
          }
        }));
        setFavorites(transformedFavorites);
      }

      // Fetch notifications from Supabase
      const { data: notificationsData, error: notificationsError } = await supabase
        .from('notifications')
        .select('id, title, message, type, is_read, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (notificationsError) {
        console.error('Error fetching notifications:', notificationsError);
        setNotifications([]);
      } else {
        const transformedNotifications: Notification[] = (notificationsData || []).map((notif: any) => ({
          id: notif.id,
          title: notif.title || 'Notification',
          message: notif.message || '',
          type: notif.type || 'info',
          is_read: notif.is_read || false,
          created_at: notif.created_at
        }));
        setNotifications(transformedNotifications);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching guest data:', error);
      setBookings([]);
      setFavorites([]);
      setNotifications([]);
    }
  }, [user?.id]);

  // Load data immediately on mount (non-blocking)
  useEffect(() => {
    if (user?.id) {
      fetchGuestData();
    }
  }, [user?.id, fetchGuestData]);

  useEffect(() => {
    if (user?.id) {
      fetchGuestData();
    } else {
      // If no user ID, ensure loading state is cleared
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]); // Only re-fetch when user ID changes, not when fetchGuestData updates

  const getUpcomingBookings = () => {
    const today = new Date();
    return bookings.filter(booking => 
      booking.status === 'confirmed' && 
      isAfter(new Date(booking.start_date), today)
    );
  };

  const getPastBookings = () => {
    const today = new Date();
    return bookings.filter(booking => 
      booking.status === 'completed' || 
      isBefore(new Date(booking.end_date), today)
    );
  };

  const getTotalSpent = () => {
    return bookings
      .filter(booking => booking.payment_status === 'paid')
      .reduce((total, booking) => total + booking.total_price, 0);
  };

  const getAverageRating = () => {
    // Calculate average rating from reviews (if reviews table exists)
    // For now, return 0 as we'll implement reviews separately
    return 0;
  };

  const getUnreadNotifications = () => {
    return notifications.filter(notification => !notification.is_read);
  };

  // Don't block rendering - show content immediately, data loads in background
  // Show loading indicator only if we have no data yet and are still loading
  const showLoadingIndicator = isLoading && bookings.length === 0 && favorites.length === 0;

  const upcomingBookings = getUpcomingBookings();
  const pastBookings = getPastBookings();
  const totalSpent = getTotalSpent();
  const averageRating = getAverageRating();
  const unreadNotifications = getUnreadNotifications();

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-pastel-blue/20 p-1 rounded-lg overflow-x-auto scrollbar-hide divide-x divide-gray-300">
        <Button
          variant={activeSection === 'bookings' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveSection('bookings')}
          className="flex-shrink-0 text-xs sm:text-sm whitespace-nowrap hover:bg-pastel-blue/60 hover:text-blue-800 border-r border-gray-300"
        >
          <span className="hidden sm:inline">My Slates</span>
          <span className="sm:hidden">Slates</span>
        </Button>
        <Button
          variant={activeSection === 'favorites' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveSection('favorites')}
          className="flex-shrink-0 text-xs sm:text-sm whitespace-nowrap hover:bg-pastel-blue/60 hover:text-blue-800 border-r border-gray-300"
        >
          <span className="hidden sm:inline">Saved Properties</span>
          <span className="sm:hidden">Saved</span>
        </Button>
        <Button
          variant={activeSection === 'recent-trips' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveSection('recent-trips')}
          className="flex-shrink-0 text-xs sm:text-sm whitespace-nowrap hover:bg-pastel-blue/60 hover:text-blue-800 border-r border-gray-300"
        >
          <span className="hidden sm:inline">Recent Slates</span>
          <span className="sm:hidden">Recent</span>
        </Button>
      </div>

      {/* Recent Slates Section */}
      {activeSection === 'recent-trips' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Slates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings
                  .filter(booking => booking.status === 'completed')
                  .slice(0, 5)
                  .map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <img
                          src={booking.properties.property_images[0]?.url || '/placeholder.svg'}
                          alt={booking.properties.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{booking.properties.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {booking.properties.neighborhood}, {booking.properties.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.start_date), 'MMM dd')} - {format(new Date(booking.end_date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦{booking.total_price.toLocaleString()}</p>
                        <Badge variant="outline" className="text-xs">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  ))}
                {bookings.filter(booking => booking.status === 'completed').length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No completed slates yet</p>
                    <Link to="/locations">
                      <Button className="mt-4">Browse Properties</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bookings Section */}
      {activeSection === 'bookings' && (
        <BookingModification />
      )}

      {/* Favorites Section */}
      {activeSection === 'favorites' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Saved Properties</h1>
            <Badge variant="outline">
              {favorites.length} propert{favorites.length !== 1 ? 'ies' : 'y'}
            </Badge>
          </div>
          {favorites.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved properties</h3>
                <p className="text-muted-foreground mb-4">
                  You haven't saved any properties yet. Start exploring properties!
                </p>
                <Button onClick={() => window.location.href = '/locations'}>
                  Browse Properties
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((favorite) => (
                <Link key={favorite.id} to={`/locations/${favorite.properties.id}`} className="block group">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={favorite.properties?.property_images?.find(img => img.is_primary)?.url || favorite.properties?.property_images?.[0]?.url || '/placeholder.svg'}
                          alt={favorite.properties?.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="font-semibold mb-1 truncate group-hover:underline">{favorite.properties.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{favorite.properties.neighborhood}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">₦{favorite.properties.price.toLocaleString()}/day</span>
                        <Button size="sm" variant="outline" tabIndex={-1}>
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FixedGuestDashboard;
