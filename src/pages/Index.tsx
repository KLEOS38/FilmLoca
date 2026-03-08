import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCard from "@/components/LocationCard";
import { supabaseLocationManager } from "@/utils/supabaseLocationManager";
import { LocationProps } from "@/components/LocationCard";
import { ArrowRight, Clapperboard, Home, ThumbsUp, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

/**
 * Homepage - Accessible to ALL users (signed in or not)
 * Featured locations should be visible to everyone (unlike /locations page which requires login)
 */
const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get cached locations immediately (no loading state)
  // This works for both authenticated and anonymous users via RLS policies
  const getFeaturedFromCache = () => {
    const cached = supabaseLocationManager.getAllLocations();
    return cached.filter((loc) => loc.isPublished !== false).slice(0, 4);
  };

  const [featuredLocations, setFeaturedLocations] = useState<LocationProps[]>(
    getFeaturedFromCache(),
  );

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    // Function to update featured locations from cache
    const updateFeatured = () => {
      if (isMounted) {
        const cached = getFeaturedFromCache();
        console.log(
          "🏠 Homepage: Updating featured locations. Cached count:",
          cached.length,
        );
        setFeaturedLocations(cached);
      }
    };

    // Update immediately with cached data (might be empty on first load)
    updateFeatured();

    // Subscribe to location updates - this will fire when locations finish loading
    unsubscribe = supabaseLocationManager.subscribe(() => {
      console.log("🏠 Homepage: Received location update notification");
      updateFeatured();
    });

    // Load fresh data in background (non-blocking)
    // Don't wait for it - show cached data immediately
    supabaseLocationManager
      .ensureLocationsLoaded()
      .then(() => {
        if (isMounted) {
          console.log("🏠 Homepage: Locations loaded successfully");
          updateFeatured();
        }
      })
      .catch((error) => {
        console.error("❌ Homepage: Error loading locations:", error);
        console.error("❌ Error details:", {
          message: error?.message,
          code: error?.code,
          details: error?.details,
          hint: error?.hint,
        });

        // Check if it's a permission error
        if (
          error?.code === "42501" ||
          error?.message?.includes("permission denied")
        ) {
          console.error(
            "🚨 PERMISSION ERROR: RLS policies may not allow anonymous access",
          );
          console.error("   Run SIMPLE_FIX_PUBLIC_ACCESS.sql to fix this");
        }

        // Still update with whatever cache we have
        if (isMounted) {
          updateFeatured();
        }
      });

    // Also ensure locations are loaded (non-blocking)
    // This is critical for anonymous users - ensure we try to load
    console.log(
      "🏠 Homepage: Starting to load locations (works for anonymous users)...",
    );

    // Small delay to let any initial load complete
    setTimeout(() => {
      supabaseLocationManager
        .ensureLocationsLoaded()
        .then((locations) => {
          console.log(
            "🏠 Homepage: Locations loaded successfully. Count:",
            locations.length,
          );
          console.log(
            "🏠 Homepage: Published locations:",
            locations.filter((loc) => loc.isPublished !== false).length,
          );
          updateFeatured();
        })
        .catch((error) => {
          console.error("❌ Homepage: Error loading locations:", error);
          console.error("❌ Error details:", {
            message: error?.message,
            code: error?.code,
            details: error?.details,
            hint: error?.hint,
          });

          // Check if it's a permission error
          if (
            error?.code === "42501" ||
            error?.message?.includes("permission denied")
          ) {
            console.error(
              "🚨 PERMISSION ERROR: RLS policies may not allow anonymous access",
            );
            console.error("   Run SIMPLE_FIX_PUBLIC_ACCESS.sql to fix this");
          }

          // Still update with whatever cache we have
          updateFeatured();
        });
    }, 100);

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen page-wrapper">
      <Header />
      <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] w-full">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="absolute inset-0 hero-bg-image bg-cover bg-center"></div>
        </div>
        <div className="relative z-20 flex items-center min-h-[600px] w-full">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Find Perfect Locations for Your Film Production
              </h1>
              <p className="text-xl text-white mb-8">
                The marketplace that connects filmmakers with verified filming
                locations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-nollywood-primary hover:bg-[#000] text-white"
                  onClick={() => {
                    if (!user) {
                      toast.error("Please sign in to browse locations");
                      navigate("/auth?tab=signin");
                    } else {
                      navigate("/locations");
                    }
                  }}
                >
                  Browse Locations
                </Button>
                <Button
                  size="lg"
                  variant="light"
                  className="bg-white text-nollywood-primary hover:bg-nollywood-primary/10 hover:text-white border border-nollywood-primary"
                  onClick={() => navigate("/list-property")}
                >
                  List Your Property
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Locations
            </h2>
            <button
              onClick={() => {
                if (!user) {
                  toast.error("Please sign in to view all locations");
                  navigate("/auth?tab=signin");
                } else {
                  navigate("/locations");
                }
              }}
              className="flex items-center text-nollywood-primary hover:underline cursor-pointer"
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {featuredLocations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredLocations.map((location, index) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No featured locations available at the moment.</p>
              <p className="text-sm mt-2">
                Check the browser console for loading details.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className=" p-4 rounded-full mb-4">
                <Clapperboard className="h-8 w-8 text-nollywood-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Your Location</h3>
              <p className="text-muted-foreground">
                Browse verified homes, studios, and unique spaces for your next
                film production.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-nollywood-secondary/10 p-4 rounded-full mb-4">
                <Home className="h-8 w-8 text-nollywood-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Book With Confidence
              </h3>
              <p className="text-muted-foreground">
                Check ratings, amenities, and real reviews from other filmmakers
                before you book.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-nollywood-accent/20 p-4 rounded-full mb-4">
                <ThumbsUp className="h-8 w-8 text-nollywood-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Shoot Your Film</h3>
              <p className="text-muted-foreground">
                Get support during your shoot and leave reviews to help the film
                community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-nollywood-primary/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                We've Got Your Back
              </h2>
              <p className="text-lg mb-6">
                At FilmLoca, we understand the importance of reliable and
                truthful property listings for your production.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Verified Listings</h3>
                    <p className="text-muted-foreground">
                      All premium listings are physically verified by our team
                      to ensure accuracy.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Filmmaker Reviews</h3>
                    <p className="text-muted-foreground">
                      Real reviews from film professionals who have filmed at
                      the locations.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Shield className="h-6 w-6 text-nollywood-primary mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Secure Payments</h3>
                    <p className="text-muted-foreground">
                      Your booking payments are secure and only released to
                      hosts after check-in.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <Button
                  className="hover:bg-[#000] hover:text-white"
                  onClick={() => navigate("/safety")}
                >
                  Learn More About Our Process
                </Button>
              </div>
            </div>

            <div className="md:w-1/2">
              <img
                src="/filmloca-12.jpg"
                alt="FilmLoca verified filming locations"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-no-repeat bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/80 z-0"></div>
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 cta-bg-image"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Find Your Next Filming Location?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white">
            Join hundreds of filmmakers who are discovering perfect filming
            locations across the globe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-nollywood-primary hover:bg-[#000] text-white"
              onClick={() => navigate("/auth?tab=signup")}
            >
              Sign Up as Filmmaker
            </Button>
            <Button
              size="lg"
              variant="light"
              className="bg-white text-nollywood-primary hover:bg-nollywood-primary/10 hover:text-white border border-nollywood-primary"
              onClick={() => {
                if (!user) {
                  toast.error("Please sign in to list your property");
                  navigate("/auth?tab=signin");
                } else {
                  navigate("/list-property");
                }
              }}
            >
              List Your Property
            </Button>
          </div>
        </div>
      </section>

      </div>
      <Footer />
    </div>
  );
};

export default Index;
