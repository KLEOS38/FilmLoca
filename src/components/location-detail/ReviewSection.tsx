
import React, { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { reviewSchema } from '@/lib/validation';
import { sanitizeForDisplay } from '@/utils/security';
import { requireAuth } from '@/lib/auth-guard';

interface ReviewSectionProps {
  rating: number;
  reviewCount: number;
  propertyId: string;
  onReviewSubmitted?: () => void;
}

interface Review {
  id: string;
  rating: number;
  property_rating?: number | null;
  comment: string;
  created_at: string;
  profiles: {
    name: string;
    avatar_url?: string;
  };
}

const ReviewSection = ({ rating, reviewCount, propertyId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
    checkCanReview();
  }, [propertyId, user]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          property_rating,
          comment,
          created_at,
          profiles:user_id(name, avatar_url)
        `)
        .eq('property_id', propertyId)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const checkCanReview = async () => {
    if (!user) {
      setCanReview(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id')
        .eq('property_id', propertyId)
        .eq('user_id', user.id)
        .eq('status', 'confirmed');

      if (error) throw error;
      
      // Check if user already reviewed
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('id')
        .eq('property_id', propertyId)
        .eq('user_id', user.id)
        .single();

      setCanReview(data && data.length > 0 && !existingReview);
    } catch (error) {
      setCanReview(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!(await requireAuth())) return;

    const validation = reviewSchema.safeParse({
      property_id: propertyId,
      rating: newReview.rating,
      comment: newReview.comment.trim()
    });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          property_id: propertyId,
          user_id: user!.id,
          rating: newReview.rating,
          property_rating: newReview.rating,
          comment: newReview.comment.trim() || null,
          is_published: true
        });

      if (error) throw error;

      toast.success('Review submitted successfully!');
      setNewReview({ rating: 5, comment: '' });
      setCanReview(false);
      fetchReviews();
    } catch (err) {
      const error = err as Error;
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, size: string = 'h-4 w-4') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center">
            {renderStars(Math.round(rating))}
            <span className="ml-2 text-lg font-semibold">{rating.toFixed(1)}</span>
          </div>
          <span className="text-muted-foreground">({reviewCount} reviews)</span>
        </div>
      </div>

      {canReview && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                    className="p-1"
                    aria-label={`Rate ${i + 1} ${i + 1 === 1 ? 'star' : 'stars'}`}
                    title={`Rate ${i + 1} ${i + 1 === 1 ? 'star' : 'stars'}`}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        i < newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Comment</label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ 
                  ...prev, 
                  comment: e.target.value.slice(0, 1000) 
                }))}
                placeholder="Share your experience..."
                maxLength={1000}
              />
              <div className="text-xs text-muted-foreground mt-1">
                {newReview.comment.length}/1000 characters
              </div>
            </div>
            
            <Button onClick={handleSubmitReview} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {review.profiles?.avatar_url ? (
                      <img
                        src={review.profiles.avatar_url}
                        alt={review.profiles?.name || 'User'}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{review.profiles?.name || 'Anonymous'}</span>
                      <div className="flex">{renderStars(review.property_rating ?? review.rating)}</div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {review.comment && (
                      <p className="text-muted-foreground">
                        {sanitizeForDisplay(review.comment)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
