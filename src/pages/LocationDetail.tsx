import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { supabaseLocationManager } from "@/utils/supabaseLocationManager";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { differenceInCalendarDays } from "date-fns";
import usePropertyVerification from "@/hooks/usePropertyVerification";
import PropertyVerificationButton from "@/components/property/PropertyVerificationButton";

// Import the refactored components
import ImageCarousel from "@/components/location-detail/ImageCarousel";
import LocationHeader from "@/components/location-detail/LocationHeader";
import LocationInfo from "@/components/location-detail/LocationInfo";
import ReviewSection from "@/components/location-detail/ReviewSection";
import BookingCard from "@/components/location-detail/BookingCard";
import MiniBookingTrigger from "@/components/location-detail/MiniBookingTrigger";
import OverlayBookingCard from "@/components/location-detail/OverlayBookingCard";
import SimilarLocations from "@/components/location-detail/SimilarLocations";
import ActionButtons from "@/components/location-detail/ActionButtons";
import PropertyVerification from "@/components/property/PropertyVerification";
import { useAuth } from "@/contexts/AuthContext";
import type { LocationProps } from "@/components/LocationCard";
type PropertyDBExtras = {
  has_office_space?: boolean | null;
  rules?: string | null;
};

type ExtendedLocation = LocationProps & {
  additionalImages?: string[];
  location?: string;
  owner?: { name: string; avatar?: string | null };
  description?: string;
  hasOfficeSpace?: boolean;
  rules?: string;
  maxRooms?: number;
  maxGuests?: number;
  damageDeposit?: number | null;
  user_id?: string; // Add user_id for property ownership check
};

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [days, setDays] = useState(1);
  const [location, setLocation] = useState<ExtendedLocation | null>(null);
  const [relatedLocations, setRelatedLocations] = useState<LocationProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const { scheduleVerification } = usePropertyVerification();
  const [refreshReviews, setRefreshReviews] = useState(0);
  const [isBookingOverlayOpen, setIsBookingOverlayOpen] = useState(false);

  // Handle URL parameters (kept for potential future use)
  useEffect(() => {
    // URL parameter handling can be added here if needed
  }, [searchParams]);

  // Load property details from Supabase
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setIsLoading(true);

      try {
        // Get property details
        const { data: property, error } = await supabase
          .from("properties")
          .select(
            `
            *,
            profiles:owner_id(*),
            property_images(*),
            property_amenities(
              amenities(*)
            )
          `,
          )
          .eq("id", id)
          .single();

        console.log('🏠 Property data fetched:', { property, error });

        if (error) {
          console.error("Error fetching property:", error);

          // Try to get from localStorage first
          try {
            const customProperties = JSON.parse(
              localStorage.getItem("properties") || "[]",
            ) as Array<{ id: string }>;
            const customProperty = customProperties.find((p) => p.id === id);
            if (customProperty) {
              setLocation(customProperty as unknown as LocationProps);
              setRelatedLocations([]); // TODO: Implement related locations
              return;
            }
          } catch (localStorageError) {
            console.error(
              "Error reading from localStorage:",
              localStorageError,
            );
          }

          // Fallback to Supabase location data
          const supabaseLocation =
            await supabaseLocationManager.getLocationById(id || "");
          setLocation(supabaseLocation);
          setRelatedLocations([]); // TODO: Implement related locations
          return;
        }

        // Get reviews and calculate actual rating
        const { data: reviews } = await supabase
          .from("reviews")
          .select("rating, property_rating")
          .eq("property_id", id)
          .eq("is_published", true);

        // Calculate actual rating using property_rating if available, otherwise rating
        const publishedReviews = reviews || [];
        const ratings = publishedReviews.map(
          (r: { rating: number; property_rating?: number | null }) =>
            r.property_rating ?? r.rating,
        );
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((sum: number, r: number) => sum + r, 0) /
              ratings.length
            : 0;

        // Transform property data to match the existing structure
        const transformedProperty: ExtendedLocation = {
          ...property,
          id: property.id,
          title: property.title,
          description: property.description,
          imageUrl:
            property.property_images?.find(
              (img: { is_primary?: boolean; url?: string }) => img.is_primary,
            )?.url ||
            (property.property_images?.[0]?.url as string | undefined),
          price: property.price,
          rating: averageRating,
          reviewCount: publishedReviews.length,
          location: property.address,
          neighborhood: property.neighborhood,
          isVerified: property.is_verified,
          amenities:
            (property.property_amenities
              ?.map(
                (pa: { amenities?: { name?: string } }) =>
                  pa.amenities?.name || "",
              )
              .filter(Boolean) as string[]) || [],
          type: property.property_type,
          owner: {
            name: property.profiles?.name || "Property Owner",
            avatar: property.profiles?.avatar_url,
          },
          additionalImages:
            (property.property_images
              ?.map((img: { url?: string }) => img.url)
              .filter(Boolean) as string[]) || [],
          // Map snake_case DB fields to camelCase component props
          hasOfficeSpace:
            (property as typeof property & PropertyDBExtras).has_office_space ??
            false,
          rules: (property as typeof property & PropertyDBExtras).rules || "",
          maxRooms: property.max_guests || 0,
          maxGuests: property.max_guests || 0,
          damageDeposit: property.damage_deposit ?? null,
        };

        setLocation(transformedProperty);

        // Get related properties
        const { data: related } = await supabase
          .from("properties")
          .select(
            `
            *,
            profiles:owner_id(*),
            property_images(*)
          `,
          )
          .eq("is_published", true)
          .neq("id", id)
          .eq("city", property.city)
          .limit(3);

        if (related?.length) {
          const transformedRelated: LocationProps[] = related.map(
            (prop: {
              id: string;
              title: string;
              description?: string;
              property_images?: Array<{ is_primary?: boolean; url?: string }>;
              price: number;
              neighborhood?: string;
              is_verified?: boolean;
              property_type?: string;
            }) => ({
              id: prop.id,
              title: prop.title,
              imageUrl:
                prop.property_images?.find((img) => img.is_primary)?.url ||
                (prop.property_images?.[0]?.url as string | undefined) ||
                "/placeholder.svg",
              price: prop.price,
              rating: 0,
              reviewCount: 0,
              neighborhood: prop.neighborhood || "",
              isVerified: prop.is_verified,
              type: prop.property_type,
            }),
          );
          setRelatedLocations(transformedRelated);
        } else {
          // Fallback to mock data
          setRelatedLocations([]); // TODO: Implement related locations
        }
      } catch (error) {
        console.error("Error loading property details:", error);
        // Fallback to Supabase location data
        const supabaseLocation = await supabaseLocationManager.getLocationById(
          id || "",
        );
        setLocation(supabaseLocation);
        setRelatedLocations([]); // TODO: Implement related locations
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  // Mock additional images if needed
  const additionalImages = location?.additionalImages || [
    location?.imageUrl || "",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Loading location details...
            </h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Location not found</h1>
            <Link to="/locations">
              <Button>Browse all locations</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    setIsFavorite(!isFavorite);

    if (isFavorite) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites");
    }

    // TODO: Implement favorites in database
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleVerificationRequest = async (appointmentData: {
    propertyId: string;
    propertyTitle: string;
    preferredDate: string;
    preferredTime: string;
    notes?: string;
  }) => {
    try {
      await scheduleVerification(appointmentData);
    } catch (error) {
      // Error is handled by the component
    }
  };

  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);

    if (startDate && endDate) {
      // Use differenceInCalendarDays for consistent, timezone-aware day calculation
      const daysDiff = Math.max(
        1,
        differenceInCalendarDays(endDate, startDate),
      );
      setDays(daysDiff);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-12.5">
        {/* Back button (mobile) */}
        <div className="md:hidden p-4">
          <Link to="/locations">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back to locations
            </Button>
          </Link>
        </div>

        {/* Image Carousel */}
        <div className="relative bg-muted px-8 py-3">
          <ImageCarousel
            images={additionalImages}
            isVerified={location.isVerified}
            title={location.title}
          />

          <div className="absolute top-8 right-12">
            <ActionButtons
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              handleShare={handleShare}
              propertyId={id}
            />
          </div>
        </div>

        {/* Pricing & Booking Section */}
        <div className="bg-white py-6 border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <LocationHeader
                title={location.title}
                rating={location.rating}
                reviewCount={location.reviewCount}
                neighborhood={location.neighborhood}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Verification Button for Property Owners */}
                {user && location.user_id === user.id && (
                  <Button
                    onClick={() => {
                      // Scroll to verification section
                      const verificationSection = document.querySelector('[data-verification-section]');
                      if (verificationSection) {
                        verificationSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    variant="outline"
                    className="flex items-center space-x-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Shield className="h-4 w-4" />
                    <span>{location.isVerified ? 'View Verification' : 'Get Verified'}</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LocationInfo
                location={{
                  ...location,
                  type: location.type || "Space",
                  imageUrl: location.imageUrl || "/placeholder.svg",
                  amenities: location.amenities || [],
                  isVerified: location.isVerified || false,
                  neighborhood: location.neighborhood || "",
                }}
              />

              {/* Property Verification Section - Show only to property owners */}
              {user && location.user_id === user.id && (
                <div className="mt-8" data-verification-section>
                  <PropertyVerificationButton
                    propertyId={id || ""}
                    propertyTitle={location.title}
                    isVerified={location.isVerified || false}
                    compact={false}
                  />
                </div>
              )}

              <ReviewSection
                rating={location.rating}
                reviewCount={location.reviewCount}
                propertyId={id || ""}
                onReviewSubmitted={() => setRefreshReviews((prev) => prev + 1)}
              />
            </div>

            {/* Inline Booking Card */}
            <div className="mt-8 mb-8">
              <BookingCard
                propertyId={id || ""}
                price={location.price}
                rating={location.rating}
                reviewCount={location.reviewCount}
                days={days}
                setDays={setDays}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                onDateChange={handleDateSelect}
              />
            </div>
          </div>

          {/* Related Locations */}
          <SimilarLocations locations={relatedLocations} />
        </div>

        {/* Floating Mini Booking Trigger */}
        <MiniBookingTrigger
          price={location.price}
          rating={location.rating}
          reviewCount={location.reviewCount}
          onClick={() => setIsBookingOverlayOpen(true)}
          isOpen={isBookingOverlayOpen}
        />

        {/* Overlay Booking Card */}
        <OverlayBookingCard
          isOpen={isBookingOverlayOpen}
          onClose={() => setIsBookingOverlayOpen(false)}
          propertyId={id || ""}
          price={location.price}
          rating={location.rating}
          reviewCount={location.reviewCount}
          days={days}
          setDays={setDays}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateChange={handleDateSelect}
        />
      </main>
      <Footer />
    </div>
  );
};

export default LocationDetail;
