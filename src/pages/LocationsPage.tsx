import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCard, { LocationProps } from "@/components/LocationCard";
import FilterBar from "@/components/FilterBar";
import { supabaseLocationManager } from "@/utils/supabaseLocationManager";
import { Search, MapPin, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LocationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Get cached locations immediately
  const getCachedLocations = () => supabaseLocationManager.getAllLocations();

  const [filteredLocations, setFilteredLocations] = useState<LocationProps[]>(
    () => {
      // Show cached locations immediately
      const cached = getCachedLocations();
      // Apply initial filters to cached data
      let results = [...cached];
      // Basic price filter only (other filters can be applied later)
      results = results.filter((location) => {
        const price = location.price || 0;
        return price >= 0 && price <= 2000000;
      });
      return results;
    },
  );
  const [isLoadingLocations, setIsLoadingLocations] = useState(false); // No loading - show immediately
  const [locationsLoaded, setLocationsLoaded] = useState(false); // Start with false to show loading initially
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState<
    "relevance" | "price_asc" | "price_desc"
  >("relevance");
  
  // Autocomplete and recent searches state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recent-searches');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearchSubmit = useCallback((query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    
    // Add to recent searches
    if (query.trim() && !recentSearches.includes(query)) {
      const updatedRecent = [query, ...recentSearches.slice(0, 4)]; // Keep top 5
      setRecentSearches(updatedRecent);
      localStorage.setItem('recent-searches', JSON.stringify(updatedRecent));
    }
  }, [recentSearches]);

  const handleClearSearch = useCallback(() => {
    handleSearch("");
    handleSearchSubmit("");
  }, [handleSearchSubmit]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setSearchInput(suggestion);
    handleSearchSubmit(suggestion);
  }, [handleSearchSubmit]);

  type Filters = {
    location: string;
    country: string;
    state: string;
    dateRange: { from?: Date; to?: Date };
    priceRange: [number, number];
    propertyType: string;
    propertyTypes: string[];
    amenities: string[];
  };
  const [filters, setFilters] = useState<Filters>({
    location: "",
    country: "",
    state: "",
    dateRange: {},
    priceRange: [0, 2000000],
    propertyType: "",
    propertyTypes: [],
    amenities: [],
  });

  // Filter locations when search query or filters change
  const filterLocations = React.useCallback(
    (locations: LocationProps[]) => {
      let results = [...locations];

      console.log("🔍 LocationsPage: Starting to filter locations...");
      console.log("🔍 LocationsPage: Current filters:", filters);
      console.log(
        "🔍 LocationsPage: Total locations before filtering:",
        results.length,
      );

      // Enhanced text search filter with synonym matching
      if (searchQuery && searchQuery.trim()) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        
        // Synonym mappings
        const synonyms: Record<string, string[]> = {
          'office': ['workspace', 'work space', 'office space', 'business'],
          'workspace': ['office', 'work space', 'office space', 'business'],
          'studio': ['production space', 'film studio', 'recording studio', 'sound stage'],
          'production space': ['studio', 'film studio', 'recording studio', 'sound stage'],
          'house': ['home', 'residence', 'property', 'building'],
          'home': ['house', 'residence', 'property', 'building'],
          'apartment': ['flat', 'condo', 'unit'],
          'flat': ['apartment', 'condo', 'unit'],
          'garden': ['yard', 'outdoor', 'backyard'],
          'yard': ['garden', 'outdoor', 'backyard'],
          'pool': ['swimming pool', 'water'],
          'parking': ['garage', 'car park', 'parking space'],
          'garage': ['parking', 'car park', 'parking space'],
        };

        // Get all matching terms including synonyms
        const getMatchingTerms = (query: string): string[] => {
          const terms = [query];
          for (const [key, values] of Object.entries(synonyms)) {
            if (query.includes(key) || values.some(v => query.includes(v))) {
              terms.push(key, ...values);
            }
          }
          return [...new Set(terms)];
        };

        const matchingTerms = getMatchingTerms(lowerCaseQuery);
        
        results = results.filter((location) => {
          // Search across multiple fields
          const searchableText = [
            location.title || '',
            location.description || '',
            location.neighborhood || '',
            location.type || '',
            ...(location.amenities || [])
          ].join(' ').toLowerCase();
          
          // Check if any matching term is found
          return matchingTerms.some(term => 
            searchableText.includes(term) ||
            term.split(' ').some(word => searchableText.includes(word))
          );
        });
      }
      // If no search query, show all results (don't filter)

      // Location filter - check country, state, city, and neighborhood
      if (filters.country || filters.state || filters.location) {
        results = results.filter((location) => {
          // Country filter
          if (filters.country) {
            const countryQuery = filters.country.toLowerCase();
            if (!location.country || !location.country.toLowerCase().includes(countryQuery)) {
              return false;
            }
          }
          
          // State filter
          if (filters.state) {
            const stateQuery = filters.state.toLowerCase();
            if (!location.state || !location.state.toLowerCase().includes(stateQuery)) {
              return false;
            }
          }
          
          // City filter
          if (filters.location) {
            const locationQuery = filters.location.toLowerCase();
            if ((!location.city || !location.city.toLowerCase().includes(locationQuery)) &&
                (!location.neighborhood || !location.neighborhood.toLowerCase().includes(locationQuery))) {
              return false;
            }
          }
          
          return true;
        });
      }

      // Property type filter (support both single and multiple)
      if (filters.propertyType || filters.propertyTypes.length > 0) {
        const selectedTypes = filters.propertyType
          ? [filters.propertyType]
          : filters.propertyTypes;

        if (selectedTypes.length > 0) {
          results = results.filter((location) =>
            selectedTypes.some(
              (type) =>
                location.type &&
                location.type.toLowerCase() === type.toLowerCase(),
            ),
          );
        }
      }

      // Price range filter (handle null/undefined prices)
      results = results.filter((location) => {
        const price = location.price || 0;
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });

      // Date range filter (if dates are selected)
      if (filters.dateRange?.from && filters.dateRange?.to) {
        // For now, we'll just filter out properties that don't have availability data
        // In a real implementation, you'd check against actual availability
        console.log(
          "Date filter selected:",
          filters.dateRange.from,
          "to",
          filters.dateRange.to,
        );

        // If there's no availability data, we'll assume the property is available
        // This is a simplified approach - in a real app, you'd check against actual availability
        results = results.filter((location) => {
          // If no availability data, assume available
          const availability = (
            location as unknown as Record<
              string,
              Array<{ from: string; to: string }>
            >
          ).availability;
          if (!availability || availability.length === 0) {
            return true;
          }

          // Check if any of the availability ranges include the selected dates
          return availability.some((avail) => {
            const from = new Date(avail.from);
            const to = new Date(avail.to);
            const selectedFrom = new Date(filters.dateRange.from);
            const selectedTo = new Date(filters.dateRange.to);

            return selectedFrom >= from && selectedTo <= to;
          });
        });
      }

      // Amenities filter - make it case-insensitive and handle undefined amenities
      if (filters.amenities.length > 0) {
        const selectedAmenities = filters.amenities.map((a) => a.toLowerCase());

        results = results.filter((location) => {
          // If location has no amenities, it doesn't match any amenity filter
          if (!location.amenities || location.amenities.length === 0) {
            return false;
          }

          // Check if ANY selected amenities are in the location's amenities
          // Convert both to lowercase for case-insensitive comparison
          const locationAmenities = location.amenities.map((a: string) =>
            a.toLowerCase(),
          );
          return selectedAmenities.some((amenity) =>
            locationAmenities.includes(amenity),
          );
        });
      }

      // Sorting
      if (sortBy === "price_asc") {
        results = results
          .slice()
          .sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sortBy === "price_desc") {
        results = results
          .slice()
          .sort((a, b) => (b.price || 0) - (a.price || 0));
      }

      console.log("Final filtered results:", results.length);
      setFilteredLocations(results);
    },
    [searchQuery, filters, sortBy],
  );

  // Load locations on mount and subscribe to updates
  // Show cached data immediately, load fresh data in background
  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    // Show cached locations immediately (don't wait for auth)
    const cached = getCachedLocations();
    if (cached.length > 0 && isMounted) {
      filterLocations(cached);
      setLocationsLoaded(true);
    }

    // Don't load fresh data if user is not authenticated
    if (!user) {
      setIsLoadingLocations(false);
      setLocationsLoaded(true);

      // Still try to load locations for anonymous users (if RLS allows)
      // This ensures cached data is available
      supabaseLocationManager
        .ensureLocationsLoaded()
        .then(() => {
          if (isMounted) {
            const results = supabaseLocationManager.getAllLocations();
            if (results.length > 0) {
              filterLocations(results);
            }
          }
        })
        .catch((error) => {
          console.error(
            "❌ Error loading locations for anonymous user:",
            error,
          );
        });

      return;
    }

    // Load fresh data in background and update when ready
    const loadLocations = async () => {
      try {
        console.log(
          "📍 LocationsPage: Loading fresh locations in background...",
        );

        // Load fresh data in background
        await supabaseLocationManager.ensureLocationsLoaded();

        if (!isMounted) return;

        const results = supabaseLocationManager.getAllLocations();
        console.log(
          "📍 LocationsPage: Loaded",
          results.length,
          "locations from database",
        );

        if (isMounted) {
          // Filter locations based on current filters and search
          filterLocations(results);
          setLocationsLoaded(true);
        }
      } catch (error) {
        console.error("❌ Error loading locations:", error);
        if (isMounted) {
          setLocationsLoaded(true);
        }
      } finally {
        if (isMounted) {
          setIsLoadingLocations(false);
        }
      }
    };

    // Load in background (don't block UI)
    loadLocations();

    // Subscribe to location updates (e.g., when new properties are added)
    unsubscribe = supabaseLocationManager.subscribe(() => {
      if (isMounted) {
        const locations = supabaseLocationManager.getAllLocations();
        console.log(
          "📍 LocationsPage: Received update, refreshing locations...",
        );
        filterLocations(locations);
        setLocationsLoaded(true);
      }
    });

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, filterLocations]); // Re-load when user or filters change

  // Handle search query changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search");

    if (query) {
      setSearchQuery(query);
      setSearchInput(query);
    }
  }, [location.search]);

  // Debounce search input and sync URL
  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== searchQuery) {
        setSearchQuery(searchInput);
        navigate(`/locations?search=${encodeURIComponent(searchInput)}`, {
          replace: true,
        });
      }
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput, searchQuery, navigate]);

  // Re-filter when search query, filters, or sort changes
  // This ensures filtering happens immediately when user changes filters, not just when locations update
  // Only re-filter if locations have been loaded
  useEffect(() => {
    if (!locationsLoaded) {
      return; // Don't filter until locations are loaded
    }
    const locations = supabaseLocationManager.getAllLocations();
    if (locations.length > 0) {
      filterLocations(locations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filters, sortBy, locationsLoaded]); // Re-filter when filters change (filterLocations is stable)

  // Enhanced search handlers with autocomplete
  const handleSearch = (query: string) => {
    setSearchInput(query);
    
    // Generate suggestions
    if (query.length > 0) {
      const allLocations = supabaseLocationManager.getAllLocations();
      const queryLower = query.toLowerCase();
      
      // Extract possible suggestions from titles, neighborhoods, types, and amenities
      const possibleSuggestions = new Set<string>();
      
      allLocations.forEach(location => {
        // Add title words
        location.title?.split(' ').forEach(word => {
          if (word.toLowerCase().includes(queryLower) && word.length > 2) {
            possibleSuggestions.add(word);
          }
        });
        
        // Add neighborhood
        if (location.neighborhood?.toLowerCase().includes(queryLower)) {
          possibleSuggestions.add(location.neighborhood);
        }
        
        // Add property type
        if (location.type?.toLowerCase().includes(queryLower)) {
          possibleSuggestions.add(location.type);
        }
        
        // Add amenities
        location.amenities?.forEach(amenity => {
          if (amenity.toLowerCase().includes(queryLower)) {
            possibleSuggestions.add(amenity);
          }
        });
      });
      
      // Convert to array and limit to 5 suggestions
      const suggestionList = Array.from(possibleSuggestions)
        .slice(0, 5)
        .sort((a, b) => a.length - b.length); // Shorter suggestions first
      
      setSuggestions(suggestionList);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only search if input is different from current search query
      if (searchInput !== searchQuery) {
        handleSearchSubmit(searchInput);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, searchQuery, handleSearchSubmit]);

  // Restrict location browsing to authenticated users only
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to browse locations");
      navigate("/auth?tab=signin");
      return;
    }
  }, [user, authLoading, navigate]);

  // Don't block on auth loading - show UI immediately with cached data
  // Allow only authenticated users to browse properties

  return (
    <>
      <Helmet>
        <title>Browse Filming Locations | FilmLoca</title>
        <meta
          name="description"
          content="Find the perfect house, apartment, or studio for your next film production worldwide. All locations verified with filmmaker reviews."
        />
        <link rel="canonical" href="https://www.filmloca.com/locations" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-0 pb-8 bg-white">
          <div className="container mx-auto px-4">
            <section aria-labelledby="locations-heading" className="pt-0">
              <div className="mb-4 bg-pastel-blue/20 pb-[30px] pt-[25px] px-6 rounded-lg border border-pastel-blue/30 mt-[30px]">
                <h1
                  id="locations-heading"
                  className="text-3xl font-bold mb-2 text-black"
                >
                  <span className="animated-red-line-slow">
                    {"Browse Filming Locations".split("").map((char, index) => (
                      <span key={index}>{char === " " ? "\u00A0" : char}</span>
                    ))}
                  </span>
                </h1>
                <p className="text-muted-foreground">
                  Discover amazing locations for your next film production
                </p>
              </div>

              {/* Search & Sort */}
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:max-w-md relative">
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchInput}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(searchInput);
                      }
                    }}
                    onFocus={() => {
                      if (searchInput.length === 0 && recentSearches.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      // Delay hiding suggestions to allow click events
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    className="w-full px-4 py-2.5 border-2 border-pastel-blue/80 rounded-full bg-pastel-blue/20 focus:ring-2 focus:ring-pastel-blue/50 focus:border-pastel-blue/90 transition-all hover:border-pastel-pink/80 hover:bg-pastel-pink/20 shadow-sm"
                  />
                  
                  {/* Autocomplete Suggestions */}
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {/* Recent Searches */}
                      {searchInput.length === 0 && recentSearches.length > 0 && (
                        <>
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b">
                            Recent Searches
                          </div>
                          {recentSearches.map((search, index) => (
                            <button
                              key={`recent-${index}`}
                              onClick={() => handleSuggestionClick(search)}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{search}</span>
                            </button>
                          ))}
                        </>
                      )}
                      
                      {/* Autocomplete Suggestions */}
                      {searchInput.length > 0 && suggestions.length > 0 && (
                        <>
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b">
                            Suggestions
                          </div>
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={`suggestion-${index}`}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Search className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{suggestion}</span>
                            </button>
                          ))}
                        </>
                      )}
                      
                      {/* No suggestions found */}
                      {searchInput.length > 0 && suggestions.length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          No suggestions found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 sm:ml-auto">
                  <label
                    htmlFor="sort"
                    className="text-sm text-muted-foreground"
                  >
                    Sort by
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as
                          | "relevance"
                          | "price_asc"
                          | "price_desc",
                      )
                    }
                    className="px-3 py-2 border-2 border-pastel-blue/60 rounded-full focus:ring-2 focus:ring-pastel-blue/50 focus:border-pastel-blue/80 text-sm bg-pastel-blue/10 text-gray-700 hover:border-pastel-pink/80 hover:bg-pastel-pink/20 transition-all cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Filters */}
              <div className="mb-8">
                <FilterBar filters={filters} onFiltersChange={setFilters} />
              </div>

              {/* Locations Grid */}
              {!locationsLoaded ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nollywood-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : filteredLocations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredLocations.map((location, index) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-pastel-peach/30 rounded-lg border border-pastel-peach/40 p-8">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    No locations found
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any locations matching your search
                    criteria.
                  </p>
                  <button
                    onClick={() => {
                      handleClearSearch();
                      setFilters({
                        location: "",
                        country: "",
                        state: "",
                        dateRange: { from: undefined, to: undefined },
                        priceRange: [0, 2000000],
                        propertyType: "",
                        propertyTypes: [],
                        amenities: [],
                      });
                      navigate("/locations", { replace: true });
                    }}
                    className="px-4 py-2 bg-pastel-blue text-blue-700 rounded-lg hover:bg-pastel-blue/80 border border-blue-200/50 shadow-sm transition-all font-medium"
                  >
                    Reset
                  </button>
                </div>
              )}
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LocationsPage;
