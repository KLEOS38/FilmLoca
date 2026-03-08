
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Home } from 'lucide-react';
import { MOCK_LOCATIONS } from "@/data/mockLocations";
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem,
  CommandSeparator
} from "@/components/ui/command";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar = ({ 
  placeholder = "Search Locations...", 
  onSearch,
  className = "" 
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [neighborhoodResults, setNeighborhoodResults] = useState<string[]>([]);
  const [typeResults, setTypeResults] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/locations?search=${encodeURIComponent(searchQuery)}`);
    }
    setOpen(false);
  };

  const getLocations = () => {
    try {
      const customProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      return [...MOCK_LOCATIONS, ...customProperties];
    } catch (error) {
      console.error('Error loading custom properties:', error);
      return MOCK_LOCATIONS;
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const allLocations = getLocations();
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      const locations = allLocations.filter(location => 
        location.title.toLowerCase().includes(lowerCaseQuery) ||
        location.neighborhood.toLowerCase().includes(lowerCaseQuery) ||
        location.type.toLowerCase().includes(lowerCaseQuery) ||
        (location.amenities && location.amenities.some((amenity: string) => 
          amenity.toLowerCase().includes(lowerCaseQuery)
        ))
      );
      
      const neighborhoods = [...new Set(
        allLocations
          .map(location => location.neighborhood)
          .filter(neighborhood => 
            neighborhood.toLowerCase().includes(lowerCaseQuery)
          )
      )];
      
      const types = [...new Set(
        allLocations
          .map(location => location.type)
          .filter(type => 
            type.toLowerCase().includes(lowerCaseQuery)
          )
      )];
      
      setSearchResults(locations);
      setNeighborhoodResults(neighborhoods as string[]);
      setTypeResults(types as string[]);
    } else {
      setSearchResults([]);
      setNeighborhoodResults([]);
      setTypeResults([]);
    }
  }, [searchQuery]);

  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1600585154526-990dced4db0d";
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20 py-5 h-11 bg-muted/50"
              onClick={() => setOpen(true)}
            />
            <Button 
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 hover:bg-muted"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search Locations..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {(searchResults.length === 0 && neighborhoodResults.length === 0 && typeResults.length === 0) && searchQuery && (
            <CommandEmpty>No results found for "{searchQuery}"</CommandEmpty>
          )}
          
          {searchResults.length > 0 && (
            <CommandGroup heading="Locations">
              {searchResults.slice(0, 5).map((location) => (
                <CommandItem
                  key={location.id}
                  onSelect={() => {
                    navigate(`/locations/${location.id}`);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded overflow-hidden mr-2 flex-shrink-0">
                      <img 
                        src={location.imageUrl} 
                        alt={location.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = getFallbackImage();
                        }}
                      />
                    </div>
                    <div>
                      <span className="font-medium">{location.title}</span>
                      <span className="text-xs text-muted-foreground ml-2">{location.neighborhood}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          {neighborhoodResults.length > 0 && (
            <>
              {searchResults.length > 0 && <CommandSeparator />}
              <CommandGroup heading="Neighborhoods">
                {neighborhoodResults.map((neighborhood) => (
                  <CommandItem
                    key={neighborhood}
                    onSelect={() => {
                      navigate(`/locations?search=${encodeURIComponent(neighborhood)}`);
                      setOpen(false);
                    }}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{neighborhood}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
          
          {typeResults.length > 0 && (
            <>
              {(searchResults.length > 0 || neighborhoodResults.length > 0) && <CommandSeparator />}
              <CommandGroup heading="Property Types">
                {typeResults.map((type) => (
                  <CommandItem
                    key={type}
                    onSelect={() => {
                      navigate(`/locations?search=${encodeURIComponent(type)}`);
                      setOpen(false);
                    }}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    <span>{type}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
          
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                navigate(`/locations?search=${encodeURIComponent(searchQuery)}`);
                setOpen(false);
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search all for "{searchQuery}"</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate(`/locations`);
                setOpen(false);
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Browse all locations</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
