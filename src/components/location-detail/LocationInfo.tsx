import React from "react";
import { Check, Zap, Wind, Shield, Car, Wifi, Tv } from "lucide-react";
import type { LocationProps } from "@/components/LocationCard";
import { extractOfficeSpaceFromRules } from "@/utils/fixOfficeSpace";

type ExtendedLocation = LocationProps & {
  description?: string;
  location?: string;
  owner?: { name: string; avatar?: string | null };
  additionalImages?: string[];
  country?: string;
  state?: string;
  city?: string;
  hasOfficeSpace?: boolean;
  rules?: string; // Restored rules field
  maxGuests?: number; // Guest capacity
  maxRooms?: number; // Bedroom count // Updated from maxGuests to match display
  damageDeposit?: number | null;
};

interface LocationInfoProps {
  location: ExtendedLocation;
}

const LocationInfo = ({ location }: LocationInfoProps) => {
  // Get the appropriate icon component based on amenity name
  const getIconComponent = (amenity: string) => {
    switch (amenity) {
      case "Generator":
        return <Zap className="h-5 w-5 text-nollywood-primary" />;
      case "AC":
        return <Wind className="h-5 w-5 text-nollywood-primary" />;
      case "Security":
        return <Shield className="h-5 w-5 text-nollywood-primary" />;
      case "Parking":
        return <Car className="h-5 w-5 text-nollywood-primary" />;
      case "Wifi":
        return <Wifi className="h-5 w-5 text-nollywood-primary" />;
      case "TV/Monitors":
        return <Tv className="h-5 w-5 text-nollywood-primary" />;
      default:
        return <Check className="h-5 w-5 text-nollywood-primary" />;
    }
  };

  return (
    <>
      {/* About */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About this location</h2>
        {location.description ? (
          <div className="text-muted-foreground whitespace-pre-wrap">
            {location.description}
          </div>
        ) : (
          <div className="text-muted-foreground">
            <p className="mb-4">
              A stunning {location.type?.toLowerCase() || "property"} located in{" "}
              {location.neighborhood}, perfect for FilmLoca productions. This
              location offers a blend of modern elegance and functional space,
              making it ideal for various filming needs.
            </p>
            <p>
              The property features excellent natural lighting throughout the
              day, spacious rooms for equipment setup, and quiet surroundings
              for clean audio recording. With its distinctive architecture and
              versatile spaces, this location has been featured in several
              notable FilmLoca productions.
            </p>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-2">
            <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
              <span className="text-muted-foreground font-medium w-1/3">
                Property Type:
              </span>
              <span className="font-semibold text-right w-2/3">
                {location.type || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
              <span className="text-muted-foreground font-medium w-1/3">
                Bedrooms:
              </span>
              <span className="font-semibold text-right w-2/3">
                {location.maxRooms || 0}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
              <span className="text-muted-foreground font-medium w-1/3">
                Office Space:
              </span>
              <span className="font-semibold text-right w-2/3">
                {location.hasOfficeSpace ||
                extractOfficeSpaceFromRules(location.rules || null)
                  ? "Available"
                  : "Not Available"}
              </span>
            </div>
            {location.damageDeposit && (
              <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                <span className="text-muted-foreground font-medium w-1/3">
                  Damage Deposit:
                </span>
                <span className="font-semibold text-right w-2/3">
                  ${location.damageDeposit.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
              <span className="text-muted-foreground font-medium w-1/3">
                Address:
              </span>
              <span className="font-semibold text-right w-2/3">
                {location.address || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
              <span className="text-muted-foreground font-medium w-1/3">
                Location:
              </span>
              <span className="font-semibold text-right w-2/3">
                {location.city}, {location.state}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
              <span className="text-muted-foreground font-medium w-1/3">
                Neighborhood:
              </span>
              <span className="font-semibold text-right w-2/3">
                {location.neighborhood || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* House Rules */}
      {location.rules &&
        (() => {
          const displayRules = location
            .rules!.split("\n")
            .filter((line) => !line.trim().startsWith("OFFICE_SPACE:"))
            .join("\n")
            .trim();
          return displayRules ? (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">House Rules</h2>
              <div className="text-muted-foreground whitespace-pre-wrap">
                {displayRules}
              </div>
            </div>
          ) : null;
        })()}

      {/* Amenities */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {location.amenities?.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              {getIconComponent(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LocationInfo;
