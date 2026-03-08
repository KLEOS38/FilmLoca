import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, MapPin, Users, Home, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import { extractOfficeSpaceFromRules } from "@/utils/fixOfficeSpace";
import { formatCompactCurrency } from "@/utils/formatCurrency";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface LocationProps {
  id: string;
  title: string;
  imageUrl: string;
  images?: string[]; // Additional images for carousel
  price: number;
  rating: number;
  reviewCount: number;
  neighborhood: string;
  isVerified?: boolean;
  isPublished?: boolean;
  maxGuests?: number;
  maxRooms?: number;
  damageDeposit?: number | null;
  type?: string;
  amenities?: string[];
  address?: string;
  description?: string;
  country?: string;
  state?: string;
  city?: string;
  rules?: string;
}

interface LocationCardProps {
  location: LocationProps;
  index?: number;
}

const LocationCard = ({ location, index = 0 }: LocationCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Prepare all images for carousel
  const allImages = location.images ? [location.imageUrl, ...location.images] : [location.imageUrl];
  const hasMultipleImages = allImages.length > 1;

  // Auto-advance carousel on hover
  useEffect(() => {
    if (!isHovered || !hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered, hasMultipleImages, allImages.length]);

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  // Calculate animation delay for staggered effect
  const delayIndex = index % 4;
  const delayClasses = ["delay-0", "delay-15", "delay-30", "delay-45"];
  const delayClass = delayClasses[delayIndex] || "delay-0";

  // Handle property click - check authentication
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please sign in to view property details");
      navigate("/auth?tab=signin");
      return;
    }
  };

  return (
    <Link
      to={`/locations/${location.id}`}
      className="block h-full"
      onClick={handleCardClick}
    >
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group border border-gray-100 hover:shadow-[0_10px_30px_-5px_rgba(252,231,243,0.6)] ${delayClass} h-full flex flex-col`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section with Carousel */}
        <div className="relative h-56 overflow-hidden">
          {/* Main Image */}
          <img
            src={allImages[currentImageIndex]}
            alt={`${location.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Carousel Navigation */}
          {hasMultipleImages && (
            <>
              {/* Previous Button */}
              <button
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 text-black rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm z-10"
                aria-label="Previous image"
                type="button"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/25 hover:bg-white/40 text-black rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm z-10"
                aria-label="Next image"
                type="button"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'bg-white w-4'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {location.isVerified && (
              <div className="bg-rose-50 text-black px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                <Shield className="w-3 h-3" />
                Verified
              </div>
            )}
            {hasMultipleImages && (
              <div className="bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                {currentImageIndex + 1}/{allImages.length}
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <FavoriteButton propertyId={location.id} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Title and Location */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-gray-700 transition-colors">
              {location.title}
            </h3>

            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>{location.neighborhood}</span>
              {(location.city || location.state) && (
                <span className="ml-1 text-gray-500">
                  {location.city && `${location.city}, `}
                  {location.state}
                </span>
              )}
            </div>
          </div>

          {/* Property Type and Bedrooms */}
          <div className="flex items-center justify-between mb-3">
            {location.type && (
              <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200">
                {location.type}
              </div>
            )}
            {location.maxRooms && location.maxRooms > 0 ? (
              <div className="text-sm text-gray-600">
                {location.maxRooms} bedrooms
              </div>
            ) : null}
          </div>

          {/* Description */}
          {location.description && (
            <div className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
              {location.description}
            </div>
          )}

          {/* Rating and Reviews */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {location.rating > 0 && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
              <span className="font-semibold text-gray-900">
                {location.rating > 0 ? location.rating.toFixed(1) : "0 reviews"}
              </span>
            </div>
            {extractOfficeSpaceFromRules(location.rules) && (
              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                Office Space
              </div>
            )}
          </div>

          {/* Amenities Preview */}
          {location.amenities && location.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {location.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200"
                >
                  {amenity}
                </span>
              ))}
              {location.amenities.length > 3 &&
                location.amenities.length > 0 && (
                  <span className="bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200">
                    +{location.amenities.length - 3} more
                  </span>
                )}
            </div>
          )}

          {/* Bottom Section - Price and Deposit */}
          <div className="border-t border-gray-100 pt-4 mt-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCompactCurrency(location.price)}
                  </span>
                  <span className="text-sm text-gray-500">/day</span>
                </div>
                {location.damageDeposit && (
                  <div className="text-xs text-gray-500 mt-1">
                    Deposit: {formatCompactCurrency(location.damageDeposit)}
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="bg-white hover:bg-red-50 text-red-600 hover:text-red-800 hover:border-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-xl border-2 border-[#ff0000] hover:scale-105">
                  View Details
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
