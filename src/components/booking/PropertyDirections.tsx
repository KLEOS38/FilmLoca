import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Phone, Mail, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PropertyDirectionsProps {
  property: {
    id: string;
    title: string;
    address: string;
    lat: number;
    lng: number;
    contactPhone?: string;
    contactEmail?: string;
    specialInstructions?: string;
  };
  booking: {
    id: string;
    startDate: string;
    endDate: string;
    teamSize: number;
    notes?: string;
  };
  isVisible: boolean;
}

const PropertyDirections: React.FC<PropertyDirectionsProps> = ({
  property,
  booking,
  isVisible
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [directions, setDirections] = useState<string[]>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate mock directions based on property location
      generateDirections();
    }
  }, [isVisible, property]);

  const generateDirections = () => {
    // Mock directions - in production, this would use a real directions API
    // Directions are generated based on the property's actual address
    const mockDirections = [
      "Navigate to the property address using your preferred maps application",
      "Follow GPS directions to reach the exact location",
      "Look for the property entrance and signage",
      "Parking is available on-site - please follow parking instructions",
      "Contact the property owner if you need assistance finding the location"
    ];
    setDirections(mockDirections);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const openInMaps = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${property.lat},${property.lng}`;
    window.open(mapsUrl, '_blank');
  };

  const sendDirectionsViaEmail = () => {
    const subject = `Directions to ${property.title} - Booking ${booking.id}`;
    const body = `
Property: ${property.title}
Address: ${property.address}
Booking Dates: ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}
Team Size: ${booking.teamSize}

DIRECTIONS:
${directions.map((dir, index) => `${index + 1}. ${dir}`).join('\n')}

${property.specialInstructions ? `\nSPECIAL INSTRUCTIONS:\n${property.specialInstructions}` : ''}

Contact Information:
${property.contactPhone ? `Phone: ${property.contactPhone}` : ''}
${property.contactEmail ? `Email: ${property.contactEmail}` : ''}

Please arrive 15 minutes before your scheduled time.
    `.trim();

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const sendDirectionsViaSMS = () => {
    const message = `
Directions to ${property.title}:
${property.address}

${directions.slice(0, 3).join('\n')}

Booking: ${new Date(booking.startDate).toLocaleDateString()}
Contact: ${property.contactPhone || 'N/A'}
    `.trim();

    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.open(smsUrl);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <MapPin className="h-5 w-5" />
          Property Directions & Information
        </CardTitle>
        <p className="text-sm text-green-700">
          Your booking is confirmed! Here are the directions and important information for your filming location.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Summary */}
        <div className="p-4 bg-white rounded-lg border border-green-200">
          <h3 className="font-semibold text-lg mb-3">Booking Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Property</p>
              <p className="font-medium">{property.title}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Booking ID</p>
              <p className="font-medium font-mono text-sm">{booking.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dates</p>
              <p className="font-medium">
                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Team Size</p>
              <p className="font-medium">{booking.teamSize} people</p>
            </div>
          </div>
        </div>

        {/* Property Address */}
        <div className="p-4 bg-white rounded-lg border border-green-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                Property Address
              </h3>
              <p className="text-gray-700 mb-2">{property.address}</p>
              <p className="text-sm text-muted-foreground">
                Coordinates: {property.lat.toFixed(6)}, {property.lng.toFixed(6)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(property.address, 'Address')}
                className="flex items-center gap-2"
              >
                {copiedField === 'Address' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy
              </Button>
              <Button
                size="sm"
                onClick={openInMaps}
                className="flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                Open in Maps
              </Button>
            </div>
          </div>
        </div>

        {/* Directions */}
        <div className="p-4 bg-white rounded-lg border border-green-200">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Step-by-Step Directions
          </h3>
          <div className="space-y-3">
            {directions.map((direction, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">
                  {index + 1}
                </Badge>
                <p className="text-sm text-gray-700">{direction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Special Instructions */}
        {property.specialInstructions && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Special Instructions
            </h3>
            <p className="text-sm text-gray-700">{property.specialInstructions}</p>
          </div>
        )}

        {/* Contact Information */}
        <div className="p-4 bg-white rounded-lg border border-green-200">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </h3>
          <div className="space-y-3">
            {property.contactPhone && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.contactPhone}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(property.contactPhone!, 'Phone')}
                    className="flex items-center gap-2"
                  >
                    {copiedField === 'Phone' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`tel:${property.contactPhone}`)}
                  >
                    Call
                  </Button>
                </div>
              </div>
            )}
            {property.contactEmail && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.contactEmail}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(property.contactEmail!, 'Email')}
                    className="flex items-center gap-2"
                  >
                    {copiedField === 'Email' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`mailto:${property.contactEmail}`)}
                  >
                    Email
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Share Actions */}
        <div className="p-4 bg-white rounded-lg border border-green-200">
          <h3 className="font-semibold text-lg mb-3">Share Directions</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={sendDirectionsViaEmail}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Send via Email
            </Button>
            <Button
              variant="outline"
              onClick={sendDirectionsViaSMS}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Send via SMS
            </Button>
          </div>
        </div>

        {/* Important Notes */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-lg mb-2 text-blue-800">Important Notes</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Please arrive 15 minutes before your scheduled filming time</li>
            <li>• Contact the property owner if you need to make any changes</li>
            <li>• Keep this information secure and do not share with unauthorized persons</li>
            <li>• In case of emergency, contact the property owner immediately</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDirections;
