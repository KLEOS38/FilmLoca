
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Edit, Trash2, Eye, Pause, Play, Calendar, DollarSign, MapPin, Users, ArrowLeft, Shield, Video } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import PropertyAvailabilityManager from "@/components/property/PropertyAvailabilityManager";
import PropertyVerificationManagement from "@/components/property/PropertyVerificationManagement";
import { format } from 'date-fns';
import { toast } from 'sonner';

declare global {
  interface Window {
    supabaseLocationManager?: { refreshLocations: () => void };
  }
}

interface PropertyImage { url: string; is_primary: boolean }
interface OwnerProperty {
  id: string;
  title: string;
  price: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  is_verified: boolean;
  is_published: boolean;
  verification_status?: 'not_verified' | 'pending' | 'verified' | 'rejected';
  verified_at?: string;
  verification_notes?: string;
  property_images: PropertyImage[];
}

interface OwnerBooking {
  id: string;
  status: string;
  payment_status: string;
  start_date: string;
  end_date: string;
  total_price: number;
  team_size: number;
  notes?: string;
  property_id: string;
  properties: { title: string };
  profiles: { name: string; email: string };
}

const PropertyManagementPage = () => {
  const [properties, setProperties] = useState<OwnerProperty[]>([]);
  const [bookings, setBookings] = useState<OwnerBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("properties");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string>("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/auth');
      return;
    }

    console.log('User authenticated:', user.id, user.email);

    // Load owner's properties and bookings
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get properties owned by the user
        console.log('Fetching properties for user:', user.id);
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select(`
            id,
            title,
            price,
            address,
            neighborhood,
            city,
            state,
            is_verified,
            is_published,
            property_images(url, is_primary)
          `)
          .eq('owner_id', user.id);

        console.log('Properties query result:', { propertyData, propertyError });

        if (propertyError) {
          console.error('❌ Property query error:', propertyError);
          console.error('Error details:', {
            message: propertyError.message,
            details: propertyError.details,
            hint: propertyError.hint,
            code: propertyError.code
          });
          toast.error(`Failed to load properties: ${propertyError.message}`);
          setProperties([]);
          return;
        }
        
        console.log('✅ Properties loaded successfully:', propertyData?.length || 0, 'properties');
        
        const propertyArray = (propertyData as unknown as OwnerProperty[]) || [];
        setProperties(propertyArray);
        
        // Set the first property as selected by default if available
        // Use a function to access current selectedProperty state without needing it in dependencies
        if (propertyArray.length > 0) {
          setSelectedProperty(prevSelected => {
            // If no property is selected, or the selected property is not in the list, select the first one
            if (!prevSelected || !propertyArray.find(p => p.id === prevSelected)) {
              return propertyArray[0].id;
            }
            // Otherwise, keep the current selection
            return prevSelected;
          });
        } else {
          // No properties, clear selection
          setSelectedProperty(null);
        }

        // Get bookings for properties owned by the user
        // Only fetch bookings if there are properties
        if (propertyData && propertyData.length > 0) {
          const propertyIds = (propertyData as OwnerProperty[]).map(p => p.id);
          
          console.log('🔍 Fetching bookings for properties:', propertyIds);
          const { data: bookingData, error: bookingError } = await supabase
            .from('bookings')
            .select(`
              id,
              status,
              payment_status,
              start_date,
              end_date,
              total_price,
              team_size,
              notes,
              property_id,
              properties:property_id(title),
              profiles:user_id(name, email)
            `)
            .in('property_id', propertyIds)
            .order('created_at', { ascending: false });

          if (bookingError) {
            console.error('❌ Error fetching bookings:', bookingError);
            console.error('Error details:', {
              message: bookingError.message,
              details: bookingError.details,
              hint: bookingError.hint,
              code: bookingError.code
            });
            toast.error(`Failed to load bookings: ${bookingError.message}`);
            setBookings([]);
          } else {
            console.log('✅ Bookings loaded successfully:', bookingData?.length || 0, 'bookings');
            setBookings((bookingData as unknown as OwnerBooking[]) || []);
          }
        } else {
          console.log('ℹ️ No properties found, skipping bookings fetch');
          setBookings([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load your property data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]); // Removed selectedProperty from dependencies to avoid infinite loop

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      console.log('🔄 Updating booking status:', { bookingId, newStatus });
      console.log('👤 Current user:', user?.id);
      
      if (!user?.id) {
        toast.error('You must be logged in to update booking status');
        return;
      }
      
      // Verify the booking belongs to a property owned by this user
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) {
        console.error('❌ Booking not found in local state');
        toast.error('Booking not found');
        return;
      }

      // Validate status transition
      const validTransitions: Record<string, string[]> = {
        'pending': ['confirmed', 'canceled'],
        'confirmed': ['completed', 'canceled'],
        'completed': [], // Terminal state
        'canceled': [] // Terminal state
      };

      if (!validTransitions[booking.status]?.includes(newStatus)) {
        console.error('❌ Invalid status transition:', { from: booking.status, to: newStatus });
        toast.error(`Cannot change status from ${booking.status} to ${newStatus}`);
        return;
      }

      const property = properties.find(p => p.id === booking.property_id);
      if (!property) {
        console.error('❌ Property not found for booking:', booking.property_id);
        toast.error('Property not found for this booking');
        return;
      }

      // Double-check ownership at database level
      console.log('🔍 Verifying property ownership...');
      const { data: propertyCheck, error: propertyCheckError } = await supabase
        .from('properties')
        .select('id, owner_id')
        .eq('id', booking.property_id)
        .eq('owner_id', user.id)
        .single();

      if (propertyCheckError || !propertyCheck) {
        console.error('❌ Property ownership verification failed:', propertyCheckError);
        toast.error('You do not have permission to update this booking');
        return;
      }

      console.log('✅ Ownership verified. Updating booking status...');
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) {
        console.error('❌ Error updating booking status:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast.error(`Failed to update booking status: ${error.message}`);
        return;
      }

      console.log('✅ Booking status updated successfully');

      // Update the local state
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );

      toast.success(`Booking status updated to ${newStatus}`);
    } catch (error) {
      console.error('❌ Error updating booking status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to update booking status: ${errorMessage}`);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'canceled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPaymentStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'unpaid':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'refunded':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Property Management Functions
  const handleEditProperty = (propertyId: string) => {
    // Navigate to edit property page (we'll create this)
    navigate(`/edit-property/${propertyId}`);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      console.log('🗑️ Starting delete property process for:', propertyId);
      console.log('👤 Current user:', user?.id);
      
      // Verify user owns the property
      const property = properties.find(p => p.id === propertyId);
      if (!property) {
        toast.error('Property not found');
        return;
      }

      // First, check if there are any active bookings
      console.log('🔍 Checking for active bookings...');
      const { data: activeBookings, error: bookingError } = await supabase
        .from('bookings')
        .select('id, status')
        .eq('property_id', propertyId)
        .in('status', ['pending', 'confirmed']);

      if (bookingError) {
        console.error('❌ Error checking bookings:', bookingError);
        toast.error(`Failed to check bookings: ${bookingError.message}`);
        return;
      }

      if (activeBookings && activeBookings.length > 0) {
        console.warn('⚠️ Cannot delete: active bookings found', activeBookings);
        toast.error('Cannot delete property with active bookings. Please cancel all bookings first.');
        return;
      }

      console.log('✅ No active bookings. Proceeding with deletion...');

      // Delete property images first
      console.log('🖼️ Deleting property images...');
      const { error: imageError } = await supabase
        .from('property_images')
        .delete()
        .eq('property_id', propertyId);

      if (imageError) {
        console.error('❌ Error deleting images:', imageError);
        toast.error(`Failed to delete images: ${imageError.message}`);
        return;
      }
      console.log('✅ Images deleted');

      // Delete property amenities
      console.log('🏷️ Deleting property amenities...');
      const { error: amenityError } = await supabase
        .from('property_amenities')
        .delete()
        .eq('property_id', propertyId);

      if (amenityError) {
        console.error('❌ Error deleting amenities:', amenityError);
        toast.error(`Failed to delete amenities: ${amenityError.message}`);
        return;
      }
      console.log('✅ Amenities deleted');

      // Delete property unavailability
      console.log('📅 Deleting property unavailability...');
      const { error: unavailabilityError } = await supabase
        .from('property_unavailability')
        .delete()
        .eq('property_id', propertyId);

      if (unavailabilityError) {
        console.error('❌ Error deleting unavailability:', unavailabilityError);
        // Don't fail if unavailability doesn't exist
        console.warn('⚠️ Continuing despite unavailability error (might not exist)');
      } else {
        console.log('✅ Unavailability deleted');
      }

      // Finally, delete the property
      console.log('🏠 Deleting property...');
      const { error: propertyError } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId)
        .eq('owner_id', user?.id); // Ensure user owns the property

      if (propertyError) {
        console.error('❌ Error deleting property:', propertyError);
        console.error('Error details:', {
          message: propertyError.message,
          details: propertyError.details,
          hint: propertyError.hint,
          code: propertyError.code
        });
        toast.error(`Failed to delete property: ${propertyError.message}. This might be a permissions issue.`);
        return;
      }
      console.log('✅ Property deleted successfully');

      // Update local state and selected property in one operation
      setProperties(prev => {
        const remaining = prev.filter(p => p.id !== propertyId);
        // Update selected property if it was deleted
        if (selectedProperty === propertyId) {
          setSelectedProperty(remaining.length > 0 ? remaining[0].id : null);
        }
        return remaining;
      });

      // Refresh location manager
      if (typeof window !== 'undefined' && window.supabaseLocationManager) {
        window.supabaseLocationManager.refreshLocations();
      }

      toast.success('Property deleted successfully');
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('❌ Error deleting property:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to delete property: ${errorMessage}`);
    }
  };

  const handleTogglePropertyStatus = async (propertyId: string) => {
    try {
      console.log('🔄 Toggling property status for:', propertyId);
      console.log('👤 Current user:', user?.id);
      
      const property = properties.find(p => p.id === propertyId);
      if (!property) {
        toast.error('Property not found');
        return;
      }

      const newStatus = !property.is_published;
      console.log(`📝 Updating property status from ${property.is_published} to ${newStatus}`);

      const { error } = await supabase
        .from('properties')
        .update({ is_published: newStatus })
        .eq('id', propertyId)
        .eq('owner_id', user?.id); // Ensure user owns the property

      if (error) {
        console.error('❌ Error updating property status:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast.error(`Failed to update property status: ${error.message}. Check console for details.`);
        return;
      }

      console.log('✅ Property status updated successfully');

      // Update local state
      setProperties(prev =>
        prev.map(p =>
          p.id === propertyId
            ? { ...p, is_published: newStatus }
            : p
        )
      );

      // Refresh the location manager to update search results immediately
      if (typeof window !== 'undefined' && window.supabaseLocationManager) {
        window.supabaseLocationManager.refreshLocations();
      }

      toast.success(`Property ${newStatus ? 'published' : 'paused'} successfully`);
    } catch (error) {
      console.error('❌ Error updating property status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to update property status: ${errorMessage}`);
    }
  };

  const openDeleteDialog = (propertyId: string) => {
    setPropertyToDelete(propertyId);
    setDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-medium">Loading your properties...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-20">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/profile?tab=dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Profile</span>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Property Management</h1>
              <p className="text-muted-foreground">Manage your property listings and availability</p>
            </div>
          </div>
          <Button onClick={() => navigate("/list-property")}>
            + Add New Property
          </Button>
        </div>

        <Tabs
          defaultValue="properties"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full max-w-2xl mx-auto mb-6">
            <TabsTrigger value="properties" className="flex-1">
              My Properties ({properties.length})
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex-1">
              Bookings ({bookings.length})
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex-1">
              Availability
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex-1">
              <Shield className="h-4 w-4 mr-1" />
              Verification
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties" className="mt-4">
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => {
                  const primaryImage = property.property_images?.find((img: PropertyImage) => img.is_primary)?.url;
                  const firstImage = property.property_images?.[0]?.url;
                  const imageUrl = primaryImage || firstImage || '/placeholder.svg';
                  
                  return (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={imageUrl}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        {property.is_verified && (
                          <div className="absolute top-2 right-2 bg-rose-50 text-black px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                            <Shield className="w-3 h-3" />
                            Verified
                          </div>
                        )}
                        {!property.is_published && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                            Not Published
                          </div>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <h3 className="font-bold text-lg truncate">{property.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {property.neighborhood && `${property.neighborhood}, `}{property.city}, {property.state}
                        </p>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="font-medium">₦{property.price.toLocaleString()} / day</p>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2 pt-0">
                        <div className="flex gap-2 w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setSelectedProperty(property.id);
                              setActiveTab("availability");
                            }}
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Calendar
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              console.log('Navigating to property:', property.id);
                              navigate(`/locations/${property.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                        <div className="flex gap-2 w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProperty(property.id);
                              setActiveTab("verification");
                            }}
                            className="flex-1"
                          >
                            <Shield className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProperty(property.id)}
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTogglePropertyStatus(property.id)}
                            className={`flex-1 ${property.is_published ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}`}
                          >
                            {property.is_published ? (
                              <>
                                <Pause className="h-4 w-4 mr-1" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                Publish
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(property.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-4">You haven't listed any properties yet</h3>
                <p className="mb-6 text-muted-foreground">
                  Start earning by listing your property on Film Loca
                </p>
                <Button onClick={() => navigate("/list-property")}>
                  List Your Property
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-4">
            {bookings.length > 0 ? (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <h3 className="font-bold text-lg">
                          {booking.properties?.title || "Property"}
                        </h3>
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <span className={`px-2 py-1 text-xs border rounded-full ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          <span className={`px-2 py-1 text-xs border rounded-full ${getPaymentStatusBadgeClass(booking.payment_status)}`}>
                            {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Booked by:</p>
                          <p className="font-medium">{booking.profiles?.name || "User"}</p>
                          <p className="text-sm">{booking.profiles?.email || ""}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Booking period:</p>
                          <p className="font-medium">
                            {format(new Date(booking.start_date), 'MMM d, yyyy')} - 
                            {format(new Date(booking.end_date), 'MMM d, yyyy')}
                          </p>
                          <p className="text-sm">Team size: {booking.team_size} people</p>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-muted-foreground">Notes:</p>
                          <p className="text-sm">{booking.notes}</p>
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground">Total payment:</p>
                        <p className="font-bold">₦{booking.total_price.toLocaleString()}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 pt-3 flex-wrap">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                          >
                            Confirm Booking
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateBookingStatus(booking.id, 'canceled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                        >
                          Mark as Completed
                        </Button>
                      )}
                      <Link to={`/locations/${booking.property_id}`} className="ml-auto">
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          View Property
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-4">No bookings yet</h3>
                <p className="text-muted-foreground">
                  When users book your properties, they'll appear here
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="availability" className="mt-4">
            <div className="mb-6">
              <label className="font-medium mb-2 block">Select Property:</label>
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {properties.map((property) => (
                    <Button
                      key={property.id}
                      variant={selectedProperty === property.id ? "default" : "outline"}
                      className="justify-start overflow-hidden"
                      onClick={() => setSelectedProperty(property.id)}
                    >
                      <span className="truncate">{property.title}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="mb-4">You need to add a property first</p>
                  <Button onClick={() => navigate("/list-property")}>
                    List Your Property
                  </Button>
                </div>
              )}
            </div>
            
            {selectedProperty && (
              <PropertyAvailabilityManager propertyId={selectedProperty} />
            )}
          </TabsContent>
          <TabsContent value="verification" className="mt-4">
            <PropertyVerificationManagement 
              properties={properties.map(p => ({
                ...p,
                verification_status: p.verification_status || 'not_verified',
                verified_at: p.verified_at,
                verification_notes: p.verification_notes
              }))}
              onVerificationUpdate={() => {
                // Refresh properties data
                const fetchProperties = async () => {
                  if (!user) return;
                  
                  try {
                    // Get properties owned by the user
                    console.log('Fetching properties for user:', user.id);
                    const { data: propertyData, error: propertyError } = await supabase
                      .from('properties')
                      .select(`
                        id,
                        title,
                        price,
                        address,
                        neighborhood,
                        city,
                        state,
                        is_verified,
                        is_published,
                        property_images(url, is_primary)
                      `)
                      .eq('owner_id', user.id);

                    if (propertyError) {
                      console.error('❌ Property query error:', propertyError);
                      toast.error(`Failed to load properties: ${propertyError.message}`);
                      setProperties([]);
                    } else {
                      console.log('✅ Properties loaded:', propertyData?.length || 0);
                      setProperties(propertyData || []);
                    }
                  } catch (error) {
                    console.error('❌ Unexpected error:', error);
                    toast.error('An unexpected error occurred while loading properties');
                    setProperties([]);
                  }
                };
                
                fetchProperties();
              }}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
              All associated data (images, amenities, availability) will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDeleteProperty(propertyToDelete)}
            >
              Delete Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default PropertyManagementPage;
