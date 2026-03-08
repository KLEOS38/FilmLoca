import { supabase } from '@/integrations/supabase/client';

/**
 * Calculate average rating and review count for a property from the reviews table
 */
export async function calculatePropertyRating(propertyId: string): Promise<{
  rating: number;
  reviewCount: number;
  ratingDistribution: { [key: number]: number };
}> {
  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('rating, property_rating')
      .eq('property_id', propertyId)
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching reviews for rating calculation:', error);
      return { rating: 0, reviewCount: 0, ratingDistribution: {} };
    }

    if (!reviews || reviews.length === 0) {
      return { rating: 0, reviewCount: 0, ratingDistribution: {} };
    }

    // Use property_rating if available, otherwise use rating
    const ratings = reviews.map(r => r.property_rating ?? r.rating);
    const totalRating = ratings.reduce((sum, r) => sum + r, 0);
    const averageRating = totalRating / ratings.length;

    // Calculate rating distribution
    const distribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach(rating => {
      const rounded = Math.round(rating);
      if (rounded >= 1 && rounded <= 5) {
        distribution[rounded] = (distribution[rounded] || 0) + 1;
      }
    });

    return {
      rating: averageRating,
      reviewCount: reviews.length,
      ratingDistribution: distribution
    };
  } catch (error) {
    console.error('Error calculating property rating:', error);
    return { rating: 0, reviewCount: 0, ratingDistribution: {} };
  }
}

/**
 * Calculate average rating and review count for multiple properties
 * Returns a map of propertyId -> { rating, reviewCount }
 */
export async function calculateMultiplePropertyRatings(propertyIds: string[]): Promise<Map<string, { rating: number; reviewCount: number }>> {
  const result = new Map<string, { rating: number; reviewCount: number }>();

  if (propertyIds.length === 0) {
    return result;
  }

  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('property_id, rating, property_rating')
      .in('property_id', propertyIds)
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching reviews for multiple properties:', error);
      return result;
    }

    if (!reviews || reviews.length === 0) {
      return result;
    }

    // Group reviews by property_id
    const reviewsByProperty = new Map<string, number[]>();
    reviews.forEach(review => {
      const rating = review.property_rating ?? review.rating;
      if (!reviewsByProperty.has(review.property_id)) {
        reviewsByProperty.set(review.property_id, []);
      }
      reviewsByProperty.get(review.property_id)!.push(rating);
    });

    // Calculate average for each property
    reviewsByProperty.forEach((ratings, propertyId) => {
      const totalRating = ratings.reduce((sum, r) => sum + r, 0);
      const averageRating = totalRating / ratings.length;
      result.set(propertyId, {
        rating: averageRating,
        reviewCount: ratings.length
      });
    });

    // Set 0 for properties with no reviews
    propertyIds.forEach(id => {
      if (!result.has(id)) {
        result.set(id, { rating: 0, reviewCount: 0 });
      }
    });

    return result;
  } catch (error) {
    console.error('Error calculating multiple property ratings:', error);
    return result;
  }
}

