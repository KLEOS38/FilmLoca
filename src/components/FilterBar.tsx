import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  Home,
  SlidersHorizontal,
  MapPin,
  Globe,
  X,
  Calendar as CalendarIcon,
  DollarSign,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format, isBefore, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { countries, Country } from "@/data/locations";
import { locationTypes, amenitiesList } from "@/data/propertyConstants";

// Helper functions for locations
const getCountries = () => countries.map((c) => c.name);
const getStatesByCountry = (countryName: string) => {
  const country = countries.find((c) => c.name === countryName);
  return country ? country.states.map((s) => s.name) : [];
};
const getCitiesByState = (countryName: string, stateName: string) => {
  const country = countries.find((c) => c.name === countryName);
  if (!country) return [];
  const state = country.states.find((s) => s.name === stateName);
  return state ? state.cities.map((c) => c.name) : [];
};
const getCurrencyForCountry = (countryName: string) => {
  const country = countries.find((c) => c.name === countryName);
  return {
    symbol: country?.currencySymbol || "$",
    code: country?.currency || "USD",
  };
};

interface FilterBarProps {
  filters?: {
    location: string;
    country: string;
    state: string;
    dateRange: { from?: Date; to?: Date };
    priceRange: [number, number];
    propertyType: string;
    propertyTypes: string[];
    amenities: string[];
  };
  onFiltersChange?: (filters: {
    location: string;
    country: string;
    state: string;
    dateRange: { from?: Date; to?: Date };
    priceRange: [number, number];
    propertyType: string;
    propertyTypes: string[];
    amenities: string[];
  }) => void;
}

// Map property types from constants
const propertyTypes = locationTypes.map((type) => ({
  name: type.label,
  icon: Home,
}));

// Map amenities from constants - no categories, just simple list
const amenities = amenitiesList.map((amenity) => ({
  name: amenity.name,
  icon: Home,
}));

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const modalContentRef = React.useRef<HTMLDivElement>(null);

  // Filter state
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const dr = filters?.dateRange;
    if (!dr || (dr.from == null && dr.to == null)) return undefined;
    return {
      from: dr.from != null ? new Date(dr.from) : undefined,
      to: dr.to != null ? new Date(dr.to) : undefined,
    };
  });
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters?.priceRange || [0, 2000000],
  );
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    filters?.propertyTypes ||
      (filters?.propertyType ? [filters.propertyType] : []),
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    filters?.amenities || [],
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    filters?.country || "",
  );
  const [selectedState, setSelectedState] = useState<string>(
    filters?.state || "",
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    filters?.location || "",
  );
  const [currentCurrency, setCurrentCurrency] = useState(() =>
    getCurrencyForCountry(filters?.country || ""),
  );

  // State for calendar navigation
  const [currentDisplayMonth, setCurrentDisplayMonth] = useState(new Date());

  useEffect(() => {
    if (filterModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Always scroll filter section to top when modal opens (handles reopen / reload)
      const scrollToTop = () => {
        if (modalContentRef.current) {
          modalContentRef.current.scrollTop = 0;
        }
      };
      scrollToTop();
      requestAnimationFrame(scrollToTop);
      const t1 = setTimeout(scrollToTop, 50);
      const t2 = setTimeout(scrollToTop, 150);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return undefined;
    }
  }, [filterModalOpen]);

  // When modal opens, show the month of check-in if we have a selection
  useEffect(() => {
    if (filterModalOpen && dateRange?.from) {
      setCurrentDisplayMonth(new Date(dateRange.from));
    }
  }, [filterModalOpen]); // only when open state changes, not on every dateRange change

  // Sync internal state when parent filters change (e.g. Reset button).
  // Preserve partial date range (check-in only) so calendar selection is not wiped.
  useEffect(() => {
    if (filters) {
      setSelectedCountry(filters.country || "");
      setSelectedState(filters.state || "");
      setSelectedCity(filters.location || "");
      const dr = filters.dateRange;
      const hasFrom = dr?.from != null;
      const hasTo = dr?.to != null;
      setDateRange(
        hasFrom || hasTo
          ? {
              from: hasFrom ? new Date(dr.from!) : undefined,
              to: hasTo ? new Date(dr.to!) : undefined,
            }
          : undefined,
      );
      setPriceRange(filters.priceRange || [0, 2000000]);
      setSelectedPropertyTypes(
        filters.propertyTypes?.length
          ? filters.propertyTypes
          : filters.propertyType
            ? [filters.propertyType]
            : [],
      );
      setSelectedAmenities(filters.amenities || []);
    }
  }, [
    filters?.country,
    filters?.state,
    filters?.location,
    filters?.dateRange?.from?.getTime?.() ?? 0,
    filters?.dateRange?.to?.getTime?.() ?? 0,
    JSON.stringify(filters?.priceRange),
    JSON.stringify(filters?.propertyTypes),
    JSON.stringify(filters?.propertyType),
    JSON.stringify(filters?.amenities),
  ]);
  // Note: Intentionally not syncing on every filters change to avoid loops with onFiltersChange

  // Update currency when country changes
  useEffect(() => {
    setCurrentCurrency(getCurrencyForCountry(selectedCountry));
  }, [selectedCountry]);

  // Notify parent when filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange({
        location: selectedCity,
        country: selectedCountry,
        state: selectedState,
        dateRange,
        priceRange,
        propertyType: selectedPropertyTypes[0] || "",
        propertyTypes: selectedPropertyTypes,
        amenities: selectedAmenities,
      });
    }
  }, [
    dateRange,
    priceRange,
    selectedPropertyTypes,
    selectedAmenities,
    selectedCity,
    selectedCountry,
    selectedState,
    onFiltersChange,
  ]);

  // Handlers
  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const clearFilters = () => {
    setDateRange(undefined);
    setPriceRange([0, 2000000]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setSelectedCountry("");
    setSelectedState("");
    setSelectedCity("");
  };

  const activeFiltersCount =
    (dateRange ? 1 : 0) +
    (JSON.stringify(priceRange) !== JSON.stringify([0, 2000000]) ? 1 : 0) +
    selectedPropertyTypes.length +
    selectedAmenities.length +
    (selectedCity ? 1 : 0) +
    (selectedCountry ? 1 : 0) +
    (selectedState ? 1 : 0);

  return (
    <>
      {/* Filter Button - Visible for all screen sizes */}
      <div className="mb-6 flex justify-center">
        <Button
          onClick={() => setFilterModalOpen(true)}
          className="flex items-center gap-2 text-black bg-rose-50 border-b-2 border-rose-400 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <SlidersHorizontal size={20} />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-blue-500 text-white border-white shadow-lg">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Main Filter Modal */}
      <Dialog open={filterModalOpen} onOpenChange={setFilterModalOpen}>
        <DialogContent className="w-[95vw] max-w-5xl max-h-[92vh] p-0 gap-0 rounded-2xl flex flex-col overflow-hidden" hideCloseButton>
          {/* Header */}
          <div className="text-black bg-rose-50 border-b-2 border-rose-400 p-6 flex items-center justify-between flex-shrink-0 px-4 sm:px-8">
            <div>
              <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                <SlidersHorizontal size={24} />
                Filters
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {activeFiltersCount > 0
                  ? `${activeFiltersCount} filter${activeFiltersCount > 1 ? "s" : ""} applied`
                  : "No filters applied"}
              </p>
            </div>
            <button
              className="text-black hover:bg-red-100 p-2 rounded-lg transition-colors [&>svg]:text-black"
              aria-label="Close filters"
              onClick={() => setFilterModalOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div
            ref={modalContentRef}
            className="overflow-y-auto flex-1 p-6 bg-white px-4 sm:px-8"
            style={{ scrollBehavior: 'smooth', scrollPaddingTop: '0' }}
          >
            <div className="space-y-8">
              {/* Location Section */}
              <div className="space-y-4 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-lg">
                    <MapPin size={20} className="text-purple-600" />
                  </div>
                  Location
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Country
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        const states = getStatesByCountry(e.target.value);
                        if (states.length > 0) {
                          setSelectedState(states[0]);
                          setSelectedCity("");
                        }
                      }}
                      className="w-full p-3 border-2 border-pastel-blue/40 rounded-lg bg-white focus:ring-2 focus:ring-nollywood-primary/50 focus:border-nollywood-primary transition-all hover:border-pastel-blue/60 text-sm"
                    >
                      <option value="">Select Country</option>
                      {getCountries().map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      State/Province
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedCity("");
                      }}
                      className="w-full p-3 border-2 border-pastel-blue/40 rounded-lg bg-white focus:ring-2 focus:ring-nollywood-primary/50 focus:border-nollywood-primary transition-all hover:border-pastel-blue/60 text-sm"
                    >
                      <option value="">Select State</option>
                      {getStatesByCountry(selectedCountry).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border-2 border-pastel-blue/40 rounded-lg bg-white focus:ring-2 focus:ring-nollywood-primary/50 focus:border-nollywood-primary transition-all hover:border-pastel-blue/60 text-sm"
                    >
                      <option value="">Select City</option>
                      {getCitiesByState(selectedCountry, selectedState).map(
                        (city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date Range Section */}
              <div className="space-y-2 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-lg">
                    <CalendarIcon size={20} className="text-blue-500" />
                  </div>
                  Check-in & Check-out
                </h3>

                <div
                  id="filter-modal-calendar"
                  className="bg-pastel-blue/5 rounded-lg border border-pastel-blue/20 w-full"
                  style={{ padding: '24px 24px 0 24px' }}
                >
                  {/* Nav row matches calendar width so arrows align with calendar edges */}
                  <div className="flex items-center justify-between mb-2 w-full max-w-[25rem] mx-auto">
                    <button
                      className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 bg-white border border-gray-300 shadow-sm p-0 opacity-80 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center"
                      onClick={() => {
                        const newMonth = new Date(currentDisplayMonth);
                        newMonth.setMonth(newMonth.getMonth() - 1);
                        setCurrentDisplayMonth(newMonth);
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="text-sm font-semibold text-black text-center">
                      {format(currentDisplayMonth, "MMMM yyyy")}
                    </div>
                    <button
                      className="h-10 w-10 sm:h-8 sm:w-8 shrink-0 bg-white border border-gray-300 shadow-sm p-0 opacity-80 hover:opacity-100 transition-opacity rounded-full flex items-center justify-center"
                      onClick={() => {
                        const newMonth = new Date(currentDisplayMonth);
                        newMonth.setMonth(newMonth.getMonth() + 1);
                        setCurrentDisplayMonth(newMonth);
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      month={currentDisplayMonth}
                      onMonthChange={setCurrentDisplayMonth}
                      numberOfMonths={1}
                      disabled={(date) => isBefore(date, startOfDay(new Date()))}
                      className="text-sm w-fit"
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-1 p-4 pt-1 pb-4 bg-white rounded-xl shadow-lg relative",
                        caption: "hidden",
                        caption_label: "hidden",
                        nav: "hidden",
                        nav_button: "hidden",
                        nav_button_previous: "hidden",
                        nav_button_next: "hidden",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex w-full justify-center",
                        head_cell: "text-sm font-semibold text-gray-700 w-12 py-1.5 px-3 text-center",
                        row: "flex w-full mt-1.5 justify-center",
                        cell: "h-12 w-12 text-center text-sm p-1 relative flex justify-center items-center",
                        day: cn(
                          "h-10 w-10 p-0 font-normal text-sm rounded-full transition-all flex justify-center items-center cursor-pointer",
                          "hover:bg-gray-100",
                        ),
                        day_range_start: "rdp-day_range_start flex justify-center items-center",
                        day_range_end: "rdp-day_range_end day-range-end flex justify-center items-center",
                        day_range_middle: "rdp-day_range_middle font-medium rounded-full flex justify-center items-center",
                        day_selected: "flex justify-center items-center",
                        day_today: "bg-transparent text-inherit flex justify-center items-center",
                        day_outside: "text-muted-foreground opacity-50 flex justify-center items-center",
                        day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed flex justify-center items-center",
                        day_hidden: "invisible",
                      }}
                      components={{
                        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
                        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Price Range Section */}
              <div className="space-y-4 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-lg">
                    <DollarSign size={20} className="text-green-600" />
                  </div>
                  Daily Price Range ({currentCurrency.symbol})
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Minimum
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="10000"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const min = Math.max(
                          0,
                          Math.min(Number(e.target.value) || 0, priceRange[1]),
                        );
                        setPriceRange([min, priceRange[1]]);
                      }}
                      placeholder="Min"
                      className="w-full p-3 border-2 border-pastel-blue/40 rounded-lg bg-white focus:ring-2 focus:ring-nollywood-primary/50 focus:border-nollywood-primary transition-all hover:border-pastel-blue/60 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Maximum
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const max = Math.max(
                          priceRange[0],
                          Number(e.target.value) || 0,
                        );
                        setPriceRange([priceRange[0], max]);
                      }}
                      placeholder="2,000,000+"
                      className="w-full p-3 border-2 border-pastel-blue/40 rounded-lg bg-white focus:ring-2 focus:ring-nollywood-primary/50 focus:border-nollywood-primary transition-all hover:border-pastel-blue/60 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Property Types Section */}
              <div className="space-y-4 pb-8 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-3 rounded-lg">
                    <Home size={20} className="text-pink-600" />
                  </div>
                  Property Type ({propertyTypes.length})
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {propertyTypes.map((type) => {
                    const isSelected = selectedPropertyTypes.includes(
                      type.name,
                    );
                    return (
                      <Button
                        key={type.name}
                        variant={isSelected ? "default" : "outline"}
                        aria-pressed={isSelected}
                        className={cn(
                          "h-auto py-3 justify-center gap-2 border-2 transition-all font-medium text-sm",
                          !isSelected &&
                            "border-pastel-blue/30 bg-white text-gray-600 hover:bg-pastel-blue/15 hover:border-pastel-blue/60 hover:text-gray-800 hover:shadow-sm",
                          isSelected &&
                            "bg-nollywood-primary text-white border-nollywood-primary shadow-md hover:bg-nollywood-primary/90 hover:shadow-lg",
                        )}
                        onClick={() => togglePropertyType(type.name)}
                      >
                        {isSelected && (
                          <span className="text-white font-bold">✓</span>
                        )}
                        {type.name}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Amenities Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-lg">
                    <Zap size={20} className="text-green-500" />
                  </div>
                  Amenities ({amenities.length})
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {amenities.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity.name);
                    return (
                      <Button
                        key={amenity.name}
                        variant={isSelected ? "default" : "outline"}
                        aria-pressed={isSelected}
                        className={cn(
                          "h-auto py-3 justify-center gap-2 border-2 transition-all font-medium text-sm",
                          !isSelected &&
                            "border-pastel-blue/30 bg-white text-gray-600 hover:bg-pastel-blue/15 hover:border-pastel-blue/60 hover:text-gray-800 hover:shadow-sm",
                          isSelected &&
                            "bg-nollywood-primary text-white border-nollywood-primary shadow-md hover:bg-nollywood-primary/90 hover:shadow-lg",
                        )}
                        onClick={() => toggleAmenity(amenity.name)}
                      >
                        {isSelected && (
                          <span className="text-white font-bold">✓</span>
                        )}
                        {amenity.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-t border-pastel-blue/20 px-4 sm:px-8 py-4 flex gap-3 justify-between flex-shrink-0 rounded-b-2xl">
            <Button
              variant="ghost"
              onClick={() => {
                clearFilters();
                setFilterModalOpen(false);
              }}
              className="flex-1 bg-pastel-blue text-blue-700 hover:bg-pastel-blue/80 font-semibold py-3 rounded-lg transition-all border border-blue-200/50"
            >
              Clear Filters
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-nollywood-primary to-nollywood-primary/80 hover:from-nollywood-primary/90 hover:to-nollywood-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all py-3 rounded-lg"
              onClick={() => setFilterModalOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterBar;
