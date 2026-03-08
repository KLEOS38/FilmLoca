/**
 * Unified Mock Data Utilities
 * Handles all mock data operations consistently across the application
 */

import { getLocationById } from '@/data/mockLocations';

/**
 * Check if a property ID is mock data (simple string) or real data (UUID)
 */
export const isMockPropertyId = (propertyId: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return !uuidRegex.test(propertyId);
};

/**
 * Get mock property data by ID
 */
export const getMockPropertyData = (propertyId: string) => {
  return getLocationById(propertyId);
};

/**
 * Create mock favorite object for display
 */
export interface MockFavorite {
  id: string;
  created_at: string;
  properties: {
    id: string;
    title: string;
    address: string;
    neighborhood: string;
    price: number;
    property_images: Array<{ url: string; is_primary: boolean }>;
  };
}

export const createMockFavorite = (propertyId: string): MockFavorite | null => {
  const property = getMockPropertyData(propertyId);
  if (!property) return null;

  return {
    id: `mock-favorite-${propertyId}`,
    created_at: new Date().toISOString(),
    properties: {
      id: propertyId,
      title: property.title,
      address: property.neighborhood, // Using neighborhood as address
      neighborhood: property.neighborhood,
      price: property.price,
      property_images: [{
        url: property.imageUrl || '/placeholder.svg',
        is_primary: true
      }]
    }
  };
};

/**
 * Get all mock favorites from localStorage
 */
export const getMockFavorites = (): MockFavorite[] => {
  const savedFavorites = localStorage.getItem('mock-favorites');
  if (!savedFavorites) return [];

  const mockFavoriteIds = JSON.parse(savedFavorites) as string[];
  return (mockFavoriteIds
    .map((id) => createMockFavorite(id))
    .filter(Boolean) as MockFavorite[]);
};

/**
 * Add mock favorite to localStorage
 */
export const addMockFavorite = (propertyId: string): void => {
  const savedFavorites = localStorage.getItem('mock-favorites');
  const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  
  if (!favorites.includes(propertyId)) {
    favorites.push(propertyId);
    localStorage.setItem('mock-favorites', JSON.stringify(favorites));
  }
};

/**
 * Remove mock favorite from localStorage
 */
export const removeMockFavorite = (propertyId: string): void => {
  const savedFavorites = localStorage.getItem('mock-favorites');
  const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  
  const updatedFavorites = favorites.filter((id: string) => id !== propertyId);
  localStorage.setItem('mock-favorites', JSON.stringify(updatedFavorites));
};

/**
 * Check if property is in mock favorites
 */
export const isMockFavorite = (propertyId: string): boolean => {
  const savedFavorites = localStorage.getItem('mock-favorites');
  const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  return favorites.includes(propertyId);
};

/**
 * Create mock review data
 */
export interface MockReview {
  id: string;
  property_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  is_published: boolean;
  user: { name: string; avatar_url: string | null };
}

export const createMockReview = (propertyId: string, rating: number, comment: string): MockReview => {
  return {
    id: `mock-review-${Date.now()}`,
    property_id: propertyId,
    user_id: 'mock-user',
    rating,
    comment,
    created_at: new Date().toISOString(),
    is_published: true,
    user: {
      name: 'You',
      avatar_url: null
    }
  };
};

/**
 * Save a mock review to localStorage
 */
export const saveMockReview = (propertyId: string, rating: number, comment: string): MockReview => {
  const newReview = createMockReview(propertyId, rating, comment);
  
  // Get existing reviews for this property
  const savedReviews = localStorage.getItem(`mock-reviews-${propertyId}`);
  const existingReviews = savedReviews ? JSON.parse(savedReviews) as MockReview[] : [];
  
  // Add the new review
  existingReviews.push(newReview);
  
  // Save back to localStorage
  localStorage.setItem(`mock-reviews-${propertyId}`, JSON.stringify(existingReviews));
  
  console.log('Saved mock review:', newReview);
  console.log('All reviews for property:', existingReviews);
  
  return newReview;
};

/**
 * Get mock reviews for a property (includes both static and user-submitted reviews)
 */
export const getMockReviews = (propertyId: string): MockReview[] => {
  // Get user-submitted reviews from localStorage
  const savedReviews = localStorage.getItem(`mock-reviews-${propertyId}`);
  const userReviews = savedReviews ? JSON.parse(savedReviews) as MockReview[] : [];

  // Static mock reviews (always show these)
  const staticReviews: MockReview[] = [
    {
      id: `mock-review-1-${propertyId}`,
      property_id: propertyId,
      user_id: 'mock-user-1',
      rating: 5,
      comment: 'Amazing location! Perfect for our film shoot.',
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      is_published: true,
      user: {
        name: 'John Doe',
        avatar_url: null
      }
    },
    {
      id: `mock-review-2-${propertyId}`,
      property_id: propertyId,
      user_id: 'mock-user-2',
      rating: 4,
      comment: 'Great space, very professional setup.',
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      is_published: true,
      user: {
        name: 'Jane Smith',
        avatar_url: null
      }
    }
  ];

  // Combine static and user reviews, sort by date (newest first)
  const allReviews = [...staticReviews, ...userReviews];
  return allReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
};

/**
 * Create mock booking data
 */
export interface MockBooking {
  id: string;
  property_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'canceled';
  payment_status: 'paid' | 'unpaid' | 'refunded';
  team_size: number;
  notes: string;
  created_at: string;
  properties: {
    id: string;
    title: string;
    address: string;
    neighborhood: string;
    price: number;
    property_images: Array<{ url: string; is_primary: boolean }>;
  };
}

export const createMockBooking = (propertyId: string, startDate: string, endDate: string, totalPrice: number, userId: string = 'mock-user'): MockBooking => {
  return {
    id: `mock-booking-${Date.now()}`,
    property_id: propertyId,
    user_id: userId,
    start_date: startDate,
    end_date: endDate,
    total_price: totalPrice,
    status: 'confirmed',
    payment_status: 'paid',
    team_size: 5,
    notes: 'Mock booking for testing',
    created_at: new Date().toISOString(),
    properties: {
      id: propertyId,
      title: getMockPropertyData(propertyId)?.title || 'Mock Property',
      address: getMockPropertyData(propertyId)?.neighborhood || 'Mock Address',
      neighborhood: getMockPropertyData(propertyId)?.neighborhood || 'Mock Neighborhood',
      price: getMockPropertyData(propertyId)?.price || 0,
      property_images: [{
        url: getMockPropertyData(propertyId)?.imageUrl || '/placeholder.svg',
        is_primary: true
      }]
    }
  };
};

/**
 * Save a mock booking to localStorage
 */
export const saveMockBooking = (booking: MockBooking): MockBooking => {
  const savedBookings = localStorage.getItem('mock-bookings');
  const bookings = savedBookings ? JSON.parse(savedBookings) as MockBooking[] : [];
  
  // Add the new booking
  bookings.push(booking);
  
  // Save back to localStorage
  localStorage.setItem('mock-bookings', JSON.stringify(bookings));
  
  console.log('Saved mock booking:', booking);
  console.log('All mock bookings:', bookings);
  
  return booking;
};

/**
 * Get mock bookings for a user
 */
export const getMockBookings = (userId: string = 'mock-user'): MockBooking[] => {
  const savedBookings = localStorage.getItem('mock-bookings');
  if (!savedBookings) return [];

  const allBookings = JSON.parse(savedBookings) as MockBooking[];
  return allBookings.filter((booking) => booking.user_id === userId);
};
