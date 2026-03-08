import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Navigation, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface PropertyLocationMapProps {
  onLocationChange: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number; address: string };
  height?: string;
}

const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({
  onLocationChange,
  initialLocation,
  height = '400px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    initialLocation || { lat: 0, lng: 0, address: 'Select a location' }
  );

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // For demo purposes, we'll create a mock map interface
    // In production, you would integrate with Google Maps, Mapbox, or similar
    const initializeMap = () => {
      const mapElement = mapRef.current;
      if (!mapElement) return;

      // Create a simple mock map interface
      mapElement.innerHTML = `
        <div style="
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
        ">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Interactive Map</div>
            <div style="font-size: 14px; opacity: 0.8;">Click to set property location</div>
            <div style="font-size: 12px; opacity: 0.6; margin-top: 8px;">
              Lat: ${currentLocation.lat.toFixed(6)}, Lng: ${currentLocation.lng.toFixed(6)}
            </div>
          </div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 24px;
            height: 24px;
            background: #ff0000;
            border: 3px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>
        </div>
      `;

      // Add click handler to the map
      mapElement.addEventListener('click', handleMapClick);
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.removeEventListener('click', handleMapClick);
      }
    };
  }, [currentLocation]);

  const handleMapClick = (e: MouseEvent) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click position to approximate lat/lng
    // This is a simplified conversion for demo purposes
    const lat = currentLocation.lat + (y - rect.height / 2) * 0.001;
    const lng = currentLocation.lng + (x - rect.width / 2) * 0.001;
    
    const newLocation = {
      lat: Math.max(-90, Math.min(90, lat)),
      lng: Math.max(-180, Math.min(180, lng)),
      address: `Custom Location (${lat.toFixed(6)}, ${lng.toFixed(6)})`
    };

    setCurrentLocation(newLocation);
    onLocationChange(newLocation);
    toast.success('Location updated!');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      // Mock geocoding - in production, use a real geocoding service
      const mockResults = [
        { lat: 6.5244, lng: 3.3792, address: 'Lagos, Nigeria' },
        { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, USA' },
        { lat: 51.5074, lng: -0.1278, address: 'London, UK' },
        { lat: 40.7128, lng: -74.0060, address: 'New York, USA' },
        { lat: 48.8566, lng: 2.3522, address: 'Paris, France' }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find best match or use first result
      const result = mockResults.find(r => 
        r.address.toLowerCase().includes(searchQuery.toLowerCase())
      ) || mockResults[0];

      const newLocation = {
        lat: result.lat + (Math.random() - 0.5) * 0.01, // Add some randomness
        lng: result.lng + (Math.random() - 0.5) * 0.01,
        address: result.address
      };

      setCurrentLocation(newLocation);
      onLocationChange(newLocation);
      toast.success(`Location set to ${result.address}`);
    } catch (error) {
      toast.error('Failed to find location');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: `Current Location (${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)})`
        };

        setCurrentLocation(newLocation);
        onLocationChange(newLocation);
        toast.success('Current location set!');
        setIsLoading(false);
      },
      (error) => {
        toast.error('Failed to get current location');
        setIsLoading(false);
      }
    );
  };

  const resetLocation = () => {
    const defaultLocation = { lat: 0, lng: 0, address: 'Select a location' };
    setCurrentLocation(defaultLocation);
    onLocationChange(defaultLocation);
    toast.success('Location reset');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Property Location
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Set the exact location of your property by clicking on the map or searching for an address.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for an address or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" />
            Use Current Location
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetLocation}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset to Default
          </Button>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="w-full border border-gray-200 rounded-lg overflow-hidden cursor-crosshair"
          style={{ height }}
        />

        {/* Location Info */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">Selected Location</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {currentLocation.address}
          </p>
          <p className="text-xs text-muted-foreground">
            Coordinates: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
          </p>
        </div>

        {/* Instructions */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Instructions:</strong> Click anywhere on the map to set your property's exact location. 
            The red pin will move to your selected position. You can also search for an address or use your current location.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { PropertyLocationMap };
export default PropertyLocationMap;
