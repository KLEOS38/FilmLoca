import React from 'react';
import { Button } from "@/components/ui/button";
import { Share2 } from 'lucide-react';
import FavoriteButton from '@/components/favorites/FavoriteButton';

interface ActionButtonsProps {
  isFavorite: boolean;
  toggleFavorite: () => void;
  handleShare: () => void;
  propertyId?: string;
}

const ActionButtons = ({ isFavorite, toggleFavorite, handleShare, propertyId }: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <FavoriteButton 
        propertyId={propertyId || ""} 
        className="bg-white/90 hover:bg-[#e5e5e5]" 
      />
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleShare}
        className="bg-white/90 hover:bg-[#e5e5e5]"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
};

export default ActionButtons;
