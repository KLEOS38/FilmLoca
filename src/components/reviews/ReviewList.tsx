
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { isMockPropertyId, getMockReviews } from '@/utils/mockDataUtils';

interface ReviewListProps {
  propertyId: string;
  refreshTrigger?: number;
}

const ReviewList = ({ propertyId, refreshTrigger }: ReviewListProps) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [propertyId, refreshTrigger]);

  const fetchReviews = async () => {
    try {
      if (isMockPropertyId(propertyId)) {
        console.log('Mock data detected, using mock reviews');
        // For mock data, show some sample reviews
        setReviews(getMockReviews(propertyId));
        return;
      }

      // For real data, fetch from database
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id(name, avatar_url)
        `)
        .eq('property_id', propertyId)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // On error, show empty reviews
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={review.profiles?.avatar_url} />
                <AvatarFallback>
                  {review.profiles?.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{review.profiles?.name || 'Anonymous'}</h4>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(review.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const displayRating = review.property_rating ?? review.rating;
                    return (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= displayRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    );
                  })}
                </div>
                
                {review.comment && (
                  <p className="text-gray-700">{review.comment}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewList;
