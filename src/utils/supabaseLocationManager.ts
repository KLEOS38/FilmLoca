import { supabase } from '@/integrations/supabase/client';
import { LocationProps } from '@/components/LocationCard';
import { calculateMultiplePropertyRatings } from './ratingUtils';

// Supabase-based location management system
export class SupabaseLocationManager {
  private static instance: SupabaseLocationManager;
  private locations: LocationProps[] = [];
  private listeners: Set<() => void> = new Set();
  private isLoaded: boolean = false;

  private constructor() {
    // Start loading locations immediately (works for both authenticated and anonymous users)
    // This is non-blocking - components will get notified when locations are ready
    this.loadLocations().catch(error => {
      console.error('❌ LocationManager: Failed to load locations in constructor:', error);
      // Don't throw - allow the app to continue even if initial load fails
      // Components can retry via ensureLocationsLoaded()
    });
  }

  // Subscribe to location updates
  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify all listeners of changes
  private notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error('Error in location update listener:', error);
      }
    });
  }

  public static getInstance(): SupabaseLocationManager {
    if (!SupabaseLocationManager.instance) {
      SupabaseLocationManager.instance = new SupabaseLocationManager();
    }
    return SupabaseLocationManager.instance;
  }

  private async loadLocations() {
    try {
      console.log('🔄 Starting to load locations from Supabase...');
      console.log('🌐 Environment:', import.meta.env.MODE);
      console.log('🔗 Supabase URL:', import.meta.env.VITE_SUPABASE_URL || 'Using hardcoded URL');
      
      // First, check if we can access the properties table at all
      const { data: testData, error: testError } = await supabase
        .from('properties')
        .select('id')
        .limit(1);
      
      if (testError) {
        console.error('❌ Cannot access properties table:', testError);
        console.error('This might be an RLS policy issue. Error:', {
          message: testError.message,
          details: testError.details,
          hint: testError.hint,
          code: testError.code
        });
        console.error('💡 Troubleshooting tips:');
        console.error('   1. Check RLS policies allow public/anonymous SELECT on properties table');
        console.error('   2. Verify Supabase URL and key are correct');
        console.error('   3. Check browser network tab for CORS errors');
        console.error('   4. Verify you are connected to the internet');
        this.locations = [];
        return;
      } else {
        console.log('✅ Can access properties table. Test query returned:', testData?.length || 0, 'rows');
      }
      
      // Fetch properties from Supabase (only published properties)
      // Start with a simple query first, then add nested data if it works
      console.log('🔍 Fetching published properties...');
      
      // Try simple query first (without nested relationships to avoid RLS issues)
      let supabaseProperties: any[] | null = null;
      let error: any = null;
      
      // First attempt: Simple query with explicit error handling
      // Fetch all properties first, then filter in JavaScript to handle NULL values
      // This avoids issues with Supabase query syntax for NULL values
      const { data: simpleData, error: simpleError } = await supabase
        .from('properties')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('updated_at', { ascending: false }); // ✅ FIXED: use updated_at instead of created_at
      
      // Filter in JavaScript: only include is_published = true
      // This matches the RLS policy: is_published = true
      // Note: NULL/undefined values are treated as unpublished and filtered out
      const filteredData = simpleData?.filter(prop => {
        const isPublished = prop.is_published === true;
        if (!isPublished) {
          console.warn('⚠️ LocationManager: Filtered out unpublished property:', prop.id, prop.title, 'is_published:', prop.is_published);
        }
        return isPublished;
      }) || null;
      
      console.log('✅ LocationManager: Filtered data count:', filteredData?.length || 0, 'out of', simpleData?.length || 0, 'total properties');
      
      if (simpleError) {
        console.error('❌ Simple query failed:', simpleError);
        console.error('Error details:', {
          message: simpleError.message,
          details: simpleError.details,
          hint: simpleError.hint,
          code: simpleError.code
        });
        
        // If it's a permission error, provide specific guidance
        if (simpleError.code === '42501' || simpleError.message?.includes('permission denied')) {
          console.error('🚨 PERMISSION DENIED: RLS policies are blocking access to properties');
          console.error('   Solution: Run VERIFY_AND_FIX_PUBLIC_ACCESS.sql to fix RLS policies');
        }
        
        error = simpleError;
      } else {
        console.log('✅ Simple query succeeded. Found', simpleData?.length || 0, 'total properties');
        console.log('📊 Filtering for published properties (is_published = true only)...');
        console.log('📊 Published properties after filter:', filteredData?.length || 0);
        supabaseProperties = filteredData;
        
        // Fetch images in parallel for all properties (much faster than sequential)
        if (supabaseProperties && supabaseProperties.length > 0) {
          console.log('🔍 Fetching property images and amenities in parallel...');
          const imagePromises = supabaseProperties.map(async (prop) => {
            const { data: images, error: imgError } = await supabase
              .from('property_images')
              .select('url, is_primary')
              .eq('property_id', prop.id)
              .limit(10);
            
            if (!imgError && images) {
              prop.property_images = images;
            } else if (imgError) {
              console.warn(`⚠️ Could not fetch images for property ${prop.id}:`, imgError);
              prop.property_images = [];
            }
            return prop;
          });
          
          // Fetch amenities for all properties
          const amenityPromises = supabaseProperties.map(async (prop) => {
            const { data: amenities, error: amenityError } = await supabase
              .from('property_amenities')
              .select(`
                amenity_id,
                amenities!inner(
                  name
                )
              `)
              .eq('property_id', prop.id);
            
            if (!amenityError && amenities) {
              prop.property_amenities = amenities;
            } else if (amenityError) {
              console.warn(`⚠️ Could not fetch amenities for property ${prop.id}:`, amenityError);
              prop.property_amenities = [];
            }
            return prop;
          });
          
          // Wait for all fetches to complete in parallel
          await Promise.all([...imagePromises, ...amenityPromises]);
          console.log('✅ All property images and amenities fetched in parallel');
        }
      }
      
        // Skip full query if we already have images from parallel fetch
        // This saves time - we already have what we need
        // Only try full query if images are missing (shouldn't happen, but just in case)
        const needsFullQuery = supabaseProperties && supabaseProperties.some(prop => !prop.property_images || prop.property_images.length === 0);
        
        if (!error && supabaseProperties && needsFullQuery) {
          console.log('🔍 Some properties missing images, attempting full query with nested relationships...');
          const { data: fullData, error: fullError } = await supabase
            .from('properties')
            .select(`
              *,
              property_images!inner(url, is_primary),
              property_amenities!inner(amenity_id, amenities(name))
            `)
            .eq('is_published', true)
            .order('is_featured', { ascending: false })
            .order('updated_at', { ascending: false }); // ✅ FIXED: use updated_at instead of created_at
        
          if (!fullError && fullData) {
            // Filter for published properties (only is_published = true)
            const filteredFullData = fullData.filter(prop => 
              prop.is_published === true
            );
            console.log('✅ Full query with nested data succeeded. Published properties:', filteredFullData.length);
            supabaseProperties = filteredFullData;
          } else if (fullError) {
            console.warn('⚠️ Full query failed, using simple query results:', fullError);
            // Continue with simple query results
          }
        } else if (!needsFullQuery) {
          console.log('✅ All properties have images from parallel fetch, skipping full query');
        }

      if (error) {
        console.error('❌ Error fetching properties from Supabase:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        this.locations = [];
        return;
      }

      console.log('✅ Properties fetched from Supabase:', supabaseProperties?.length || 0, 'properties');
      
      // Only log full data in development to avoid console spam in production
      if (import.meta.env.MODE === 'development') {
        console.log('📦 Full properties data:', JSON.stringify(supabaseProperties, null, 2));
      }
      
      if (!supabaseProperties || supabaseProperties.length === 0) {
        console.warn('⚠️ No published properties found in database. Check:');
        console.warn('1. Are properties inserted with is_published = true?');
        console.warn('2. Are RLS policies allowing public read access?');
        console.warn('3. Run DEBUG_PROPERTY_VISIBILITY.sql to check database');
        console.warn('4. Check browser console for RLS policy errors');
        console.warn('5. Verify you are in production mode and environment variables are set');
        
        // Try fetching without the is_published filter to see if ANY properties exist
        // Also check for NULL is_published values
        const { data: allProperties, error: allError } = await supabase
          .from('properties')
          .select('id, title, is_published, is_verified')
          .limit(10);
        
        if (allError) {
          console.error('❌ Cannot fetch any properties (even unpublished):', allError);
          console.error('This indicates an RLS policy issue or connection problem');
        } else {
          console.log('📊 Total properties in database (published + unpublished):', allProperties?.length || 0);
          if (allProperties && allProperties.length > 0) {
            console.log('📊 Sample properties:', allProperties);
            const publishedCount = allProperties.filter(p => p.is_published).length;
            console.log(`📊 Published properties: ${publishedCount} out of ${allProperties.length}`);
          }
        }
      }

      // Calculate ratings for all properties
      const propertyIds = (supabaseProperties || []).map((p: any) => p.id);
      const ratingsMap = await calculateMultiplePropertyRatings(propertyIds);
      console.log('📊 Calculated ratings for', ratingsMap.size, 'properties');

      // Convert Supabase properties to LocationProps format
      const supabaseLocations: LocationProps[] = (supabaseProperties || []).map((prop: any) => {
        // Get primary image or first image
        const primaryImage = prop.property_images?.find((img: any) => img.is_primary) || prop.property_images?.[0];
        const imageUrl = primaryImage?.url || '/placeholder.svg';

        // Convert property_images to images array (excluding primary image)
        const images = prop.property_images
          ?.filter((img: any) => !img.is_primary)
          ?.map((img: any) => img.url) || [];

        // Extract amenities from the nested property_amenities structure
        const amenities: string[] = [];
        if (prop.property_amenities && Array.isArray(prop.property_amenities)) {
          prop.property_amenities.forEach((pa: any) => {
            if (pa.amenities && pa.amenities.name) {
              amenities.push(pa.amenities.name);
            } else if (pa.amenity_id) {
              // Fallback to amenity_id if name is not available
              amenities.push(pa.amenity_id);
            }
          });
        }

        // Get actual rating and review count from reviews table
        const propertyRating = ratingsMap.get(prop.id) || { rating: 0, reviewCount: 0 };

        console.log(`📍 Property: ${prop.title}, Price: ${prop.price}, Published: ${prop.is_published}, Verified: ${prop.is_verified}, Rating: ${propertyRating.rating.toFixed(1)}, Reviews: ${propertyRating.reviewCount}, Images: ${prop.property_images?.length || 0}, Amenities: ${amenities.length}`);

        return {
          id: prop.id,
          title: prop.title,
          type: prop.property_type || 'Space',
          price: prop.price || 0,
          rating: propertyRating.rating,
          reviewCount: propertyRating.reviewCount,
          neighborhood: prop.neighborhood || '',
          imageUrl: imageUrl,
          images: images, // Add the additional images array
          isVerified: prop.is_verified || false,
          isPublished: prop.is_published !== false, // Default to true if not set
          maxGuests: prop.number_of_rooms || 0, // Use number_of_rooms from database
          maxRooms: prop.number_of_rooms || 0, // Bedroom count
          damageDeposit: prop.damage_deposit || null,
          amenities: amenities,
          address: prop.address || '',
          description: prop.description || '',
          country: prop.country || '',
          state: prop.state || '',
          city: prop.city || '',
          hasOfficeSpace: prop.has_office_space || false,
          rules: prop.rules || null
        };
      });

      this.locations = supabaseLocations;
      this.isLoaded = true;

      console.log('📊 Total locations loaded:', this.locations.length);
      
      // Notify all listeners that locations have been updated
      this.notifyListeners();
    } catch (error) {
      console.error('Error loading locations:', error);
      this.locations = [];
      this.isLoaded = false;
    }
  }

  public getAllLocations(): LocationProps[] {
    // Return cached locations immediately (synchronous)
    // If locations haven't been loaded yet, return empty array
    // The component will trigger a refresh if needed
    return this.locations;
  }

  public async ensureLocationsLoaded(): Promise<LocationProps[]> {
    // Ensure locations are loaded (async)
    if (!this.isLoaded) {
      await this.loadLocations();
    }
    return this.locations;
  }

  public async getLocationById(id: string): Promise<LocationProps | undefined> {
    await this.loadLocations();
    return this.locations.find(location => location.id === id);
  }

  public async updateLocationVerification(id: string, isVerified: boolean): Promise<boolean> {
    try {
      // Update Supabase property
      const { error } = await supabase
        .from('properties')
        .update({ is_verified: isVerified })
        .eq('id', id);

      if (error) {
        console.error('Error updating Supabase property verification:', error);
        return false;
      }
      console.log(`✅ Updated Supabase property ${id} verification to ${isVerified}`);

      // Update local cache
      const location = this.locations.find(loc => loc.id === id);
      if (location) {
        location.isVerified = isVerified;
      }

      return true;
    } catch (error) {
      console.error('Error updating location verification:', error);
      return false;
    }
  }

  public async refreshLocations() {
    console.log('🔄 Refreshing locations...');
    // Clear cache first to force reload
    this.locations = [];
    this.isLoaded = false;
    await this.loadLocations();
    console.log('✅ Locations refreshed. Total locations:', this.locations.length);
    
    // Log details about published properties
    if (this.locations.length > 0) {
      console.log('📊 Published properties found:');
      this.locations.forEach((loc, index) => {
        console.log(`  ${index + 1}. ${loc.title} (ID: ${loc.id}, Verified: ${loc.isVerified})`);
      });
    } else {
      console.warn('⚠️ No published properties found after refresh!');
      console.warn('   Check:');
      console.warn('   1. Are properties set with is_published = true?');
      console.warn('   2. Are RLS policies allowing public read access?');
      console.warn('   3. Run a query in Supabase to verify properties exist');
    }
  }

  public isDataLoaded(): boolean {
    return this.isLoaded;
  }

  public getLocationStats() {
    const verifiedCount = this.locations.filter(loc => loc.isVerified).length;
    
    return {
      total: this.locations.length,
      verified: verifiedCount
    };
  }
}

// Export singleton instance
export const supabaseLocationManager = SupabaseLocationManager.getInstance();

// Expose on window for global access (useful for refreshing after property creation)
if (typeof window !== 'undefined') {
  (window as any).supabaseLocationManager = supabaseLocationManager;
}


