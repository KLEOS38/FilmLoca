
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Star, MapPin, ArrowLeft } from 'lucide-react';

interface LocationHeaderProps {
  title: string;
  rating: number;
  reviewCount: number;
  neighborhood: string;
}

const LocationHeader = ({ title, rating, reviewCount, neighborhood }: LocationHeaderProps) => {
  return (
    <div>
      <div className="hidden md:block mb-2">
        <Link to="/locations">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 -ml-2">
            <ArrowLeft size={16} /> Back to locations
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="flex items-center">
          {rating > 0 && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />}
          {rating > 0 ? rating.toFixed(1) : "0 reviews"}
          {rating > 0 && <span className="text-muted-foreground ml-1">({reviewCount} reviews)</span>}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="flex items-center text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          {neighborhood}
        </span>
      </div>
    </div>
  );
};

export default LocationHeader;
