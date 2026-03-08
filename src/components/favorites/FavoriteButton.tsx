
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
}

const FavoriteButton = ({ propertyId, className }: FavoriteButtonProps) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkFavoriteStatus();
    }
  }, [user, propertyId]);

  const checkFavoriteStatus = async () => {
    try {
      if (!user?.id) {
        setIsFavorite(false);
        return;
      }

      // Check database
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('property_id', propertyId)
        .single();

      setIsFavorite(!!data);
    } catch (error) {
      // Favorite doesn't exist, which is fine
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId);

        if (error) throw error;
        
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            property_id: propertyId
          });

        if (error) throw error;
        
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error("Failed to update favorites");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleFavorite}
      disabled={isLoading}
      className={cn("p-2", className)}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-colors",
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
        )}
      />
    </Button>
  );
};

export default FavoriteButton;
