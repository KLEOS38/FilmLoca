
import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
export const phoneSchema = z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number');
export const uuidSchema = z.string().uuid('Invalid ID format');

// User profile validation
export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio too long').optional(),
  address: z.string().max(200, 'Address too long').optional(),
  company_name: z.string().max(100, 'Company name too long').optional(),
  user_type: z.enum(['renter', 'homeowner']),
});

// Property validation
export const propertySchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(2000, 'Description too long'),
  property_type: z.enum(['residential', 'commercial', 'studio', 'outdoor']),
  price: z.number().min(1, 'Price must be greater than 0').max(10000000, 'Price too high'),
  price_type: z.enum(['day', 'hour', 'week', 'month']),
  address: z.string().min(1, 'Address is required').max(200, 'Address too long'),
  neighborhood: z.string().min(1, 'Neighborhood is required').max(100, 'Neighborhood too long'),
  city: z.string().min(1, 'City is required').max(50, 'City too long'),
  state: z.string().min(1, 'State is required').max(50, 'State too long'),
  zip_code: z.string().max(20, 'ZIP code too long').optional(),
  max_guests: z.number().min(1, 'Must allow at least 1 guest').max(100, 'Too many guests'),
  bedrooms: z.number().min(0).max(20).optional(),
  bathrooms: z.number().min(0).max(20).optional(),
  size_sqft: z.number().min(1).max(100000).optional(),
});

// Booking validation
export const bookingSchema = z.object({
  property_id: z.string().min(1, 'Property ID is required'),
  start_date: z.string().refine((date) => {
    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj >= today;
  }, 'Start date must be today or in the future'),
  end_date: z.string().refine((date) => {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
  }, 'Invalid end date format'),
  check_in_time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').default('09:00'),
  notes: z.string().max(500, 'Notes too long').optional(),
}).refine((data) => {
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);
  return endDate > startDate;
}, {
  message: 'End date must be after start date',
  path: ['end_date'],
});

// Review validation
export const reviewSchema = z.object({
  property_id: uuidSchema,
  booking_id: uuidSchema.optional(),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  property_rating: z.number().min(1).max(5).optional(),
  host_rating: z.number().min(1).max(5).optional(),
  comment: z.string().max(1000, 'Comment too long').optional(),
});

// Message validation
export const messageSchema = z.object({
  recipient_id: uuidSchema,
  property_id: uuidSchema.optional(),
  content: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
});

// Sanitization utilities
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};
