import { supabase } from '@/integrations/supabase/client';

// Database field validation and integrity checks
export class DatabaseIntegrityManager {
  // Required fields for properties table (match exact database schema)
  static REQUIRED_PROPERTY_FIELDS = [
    'title',
    'property_type',
    'address',
    'description',
    'price',
    'price_type',
    'country',
    'state',
    'city',
    'owner_id',
    'number_of_rooms', // Bedroom count field
    'has_office_space'
  ];

  // Optional fields that should have default values
  static OPTIONAL_PROPERTY_FIELDS = [
    'neighborhood',
    'damage_deposit',
    'is_verified',
    'is_featured',
    'is_published',
    'zip_code',
    'rules'
  ];

  // Validate property data before insertion
  static validatePropertyData(data: any): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required fields
    this.REQUIRED_PROPERTY_FIELDS.forEach(field => {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push(`Missing required field: ${field}`);
      }
    });

    // Validate data types and formats
    if (data.price && (isNaN(data.price) || data.price <= 0)) {
      errors.push('Price must be a positive number');
    }

    if (data.max_guests && (isNaN(data.max_guests) || data.max_guests < 0)) {
      errors.push('Max guests must be a non-negative number');
    }

    if (data.damage_deposit && (isNaN(data.damage_deposit) || data.damage_deposit < 0)) {
      errors.push('Damage deposit must be a non-negative number');
    }

    // Validate description length
    if (data.description && data.description.length < 10) {
      warnings.push('Description should be at least 10 characters');
    }

    // Validate address
    if (data.address && data.address.length < 5) {
      errors.push('Address must be at least 5 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Sanitize property data before insertion
  static sanitizePropertyData(data: any): any {
    const sanitized = { ...data };

    console.log('🧹 DATABASE INTEGRITY: Input data:', data);

    // Ensure boolean fields are properly typed
    sanitized.has_office_space = Boolean(sanitized.has_office_space);
    sanitized.is_verified = Boolean(sanitized.is_verified);
    sanitized.is_published = Boolean(sanitized.is_published);
    sanitized.is_featured = Boolean(sanitized.is_featured);

    console.log('🧹 DATABASE INTEGRITY: After boolean conversion:', {
      has_office_space: sanitized.has_office_space,
      is_verified: sanitized.is_verified,
      is_published: sanitized.is_published,
      is_featured: sanitized.is_featured
    });

    // Ensure numeric fields are properly typed
    sanitized.price = parseFloat(sanitized.price) || 0;
    sanitized.max_guests = parseInt(sanitized.max_guests) || 10;
    sanitized.damage_deposit = parseFloat(sanitized.damage_deposit) || null;

    // Trim string fields
    if (sanitized.title) sanitized.title = sanitized.title.trim();
    if (sanitized.description) sanitized.description = sanitized.description.trim();
    if (sanitized.address) sanitized.address = sanitized.address.trim();
    if (sanitized.neighborhood) sanitized.neighborhood = sanitized.neighborhood.trim();
    if (sanitized.rules) sanitized.rules = sanitized.rules.trim();

    console.log('🧹 DATABASE INTEGRITY: Final sanitized data:', sanitized);
    console.log('🧹 DATABASE INTEGRITY: Final has_office_space:', sanitized.has_office_space);
    console.log('🧹 DATABASE INTEGRITY: Final rules:', sanitized.rules);

    // Ensure country, state, city are capitalized properly
    if (sanitized.country) {
      sanitized.country = sanitized.country
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    if (sanitized.state) {
      sanitized.state = sanitized.state
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    if (sanitized.city) {
      sanitized.city = sanitized.city
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    return sanitized;
  }

  // Check database connection and table access
  static async checkDatabaseHealth(): Promise<{
    isConnected: boolean;
    tablesAccessible: string[];
    errors: string[];
  }> {
    const errors: string[] = [];
    const tablesAccessible: string[] = [];

    try {
      // Test basic connection
      const { data: testData, error: testError } = await supabase
        .from('properties')
        .select('id')
        .limit(1);

      if (testError) {
        errors.push(`Database connection error: ${testError.message}`);
      } else {
        tablesAccessible.push('properties');
      }

      // Test other important tables
      const tables = ['property_images', 'property_amenities', 'amenities', 'profiles'];
      
      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('id')
            .limit(1);
          
          if (!error) {
            tablesAccessible.push(table);
          } else {
            errors.push(`Table ${table} not accessible: ${error.message}`);
          }
        } catch (err) {
          errors.push(`Error accessing table ${table}: ${err}`);
        }
      }

    } catch (err) {
      errors.push(`Database health check failed: ${err}`);
    }

    return {
      isConnected: errors.length === 0,
      tablesAccessible,
      errors
    };
  }

  // Verify property data integrity
  static async verifyPropertyIntegrity(propertyId: string): Promise<{
    isValid: boolean;
    issues: string[];
    data: any;
  }> {
    const issues: string[] = [];
    let data: any = null;

    try {
      // Fetch property with related data
      const { data: property, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images(*),
          property_amenities(
            amenities(*)
          ),
          profiles:owner_id(*)
        `)
        .eq('id', propertyId)
        .single();

      if (error) {
        issues.push(`Failed to fetch property: ${error.message}`);
        return { isValid: false, issues, data: null };
      }

      data = property;

      // Validate required fields
      const validation = this.validatePropertyData(property);
      issues.push(...validation.errors);
      issues.push(...validation.warnings);

      // Check for images
      if (!property.property_images || property.property_images.length === 0) {
        issues.push('Property has no images');
      }

      // Check for primary image
      const hasPrimaryImage = property.property_images?.some((img: any) => img.is_primary);
      if (!hasPrimaryImage && property.property_images?.length > 0) {
        issues.push('Property has images but no primary image specified');
      }

      // Check for amenities
      if (!property.property_amenities || property.property_amenities.length === 0) {
        issues.push('Property has no amenities specified');
      }

      // Check owner profile
      if (!property.profiles) {
        issues.push('Property owner profile not found');
      }

    } catch (err) {
      issues.push(`Integrity check failed: ${err}`);
    }

    return {
      isValid: issues.length === 0,
      issues,
      data
    };
  }

  // Fix common data issues
  static async fixPropertyData(propertyId: string): Promise<{
    success: boolean;
    fixes: string[];
    errors: string[];
  }> {
    const fixes: string[] = [];
    const errors: string[] = [];

    try {
      // Get current property data
      const { data: property, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) {
        errors.push(`Failed to fetch property: ${error.message}`);
        return { success: false, fixes, errors };
      }

      const updates: any = {};

      // Fix missing defaults
      if (property.max_guests === null || property.max_guests === undefined) {
        updates.max_guests = 10;
        fixes.push('Set default max_guests to 10');
      }

      if (property.has_office_space === null || property.has_office_space === undefined) {
        updates.has_office_space = false;
        fixes.push('Set default has_office_space to false');
      }

      if (property.is_verified === null || property.is_verified === undefined) {
        updates.is_verified = false;
        fixes.push('Set default is_verified to false');
      }

      if (property.is_featured === null || property.is_featured === undefined) {
        updates.is_featured = false;
        fixes.push('Set default is_featured to false');
      }

      // Apply updates if any fixes needed
      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('properties')
          .update(updates)
          .eq('id', propertyId);

        if (updateError) {
          errors.push(`Failed to apply fixes: ${updateError.message}`);
        }
      }

    } catch (err) {
      errors.push(`Fix operation failed: ${err}`);
    }

    return {
      success: errors.length === 0,
      fixes,
      errors
    };
  }

  // Comprehensive database audit
  static async auditDatabase(): Promise<{
    totalProperties: number;
    validProperties: number;
    propertiesWithIssues: number;
    commonIssues: Record<string, number>;
    recommendations: string[];
  }> {
    const commonIssues: Record<string, number> = {};
    const recommendations: string[] = [];
    let validProperties = 0;
    let propertiesWithIssues = 0;

    try {
      // Get all properties
      const { data: properties, error } = await supabase
        .from('properties')
        .select('id, title');

      if (error) {
        throw new Error(`Failed to fetch properties: ${error.message}`);
      }

      const totalProperties = properties.length;

      // Sample check (check first 10 properties for performance)
      const sampleSize = Math.min(10, totalProperties);
      const sampleProperties = properties.slice(0, sampleSize);

      for (const property of sampleProperties) {
        const integrity = await this.verifyPropertyIntegrity(property.id);
        
        if (integrity.isValid) {
          validProperties++;
        } else {
          propertiesWithIssues++;
          
          // Track common issues
          integrity.issues.forEach(issue => {
            commonIssues[issue] = (commonIssues[issue] || 0) + 1;
          });
        }
      }

      // Generate recommendations
      if (propertiesWithIssues > 0) {
        recommendations.push('Run data fixes on properties with issues');
        recommendations.push('Review data validation rules');
      }

      if (commonIssues['Property has no images'] > 0) {
        recommendations.push('Implement mandatory image upload for property listings');
      }

      if (commonIssues['Property has no amenities specified'] > 0) {
        recommendations.push('Ensure amenities are properly linked to properties');
      }

      // Estimate total issues based on sample
      const estimatedTotalIssues = Math.round((propertiesWithIssues / sampleSize) * totalProperties);

      return {
        totalProperties,
        validProperties: Math.round((validProperties / sampleSize) * totalProperties),
        propertiesWithIssues: estimatedTotalIssues,
        commonIssues,
        recommendations
      };

    } catch (err) {
      throw new Error(`Database audit failed: ${err}`);
    }
  }
}
