import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BookingDetails {
  propertyId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  checkInTime: string;
  notes?: string;
  paymentProvider?: string;
}

interface EdgeFunctionDebugResult {
  success: boolean;
  error?: string;
  details?: any;
  timestamp: string;
}

/**
 * Comprehensive Edge Function debugging utility
 * This helps identify exactly why the create-payment Edge Function is failing
 */
export class EdgeFunctionDebugger {
  private static instance: EdgeFunctionDebugger;
  
  public static getInstance(): EdgeFunctionDebugger {
    if (!EdgeFunctionDebugger.instance) {
      EdgeFunctionDebugger.instance = new EdgeFunctionDebugger();
    }
    return EdgeFunctionDebugger.instance;
  }

  /**
   * Step 1: Check authentication status
   */
  async checkAuthentication(): Promise<{ authenticated: boolean; user?: any; error?: string }> {
    try {
      console.log('🔍 Step 1: Checking authentication status...');
      
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('❌ Authentication check failed:', error);
        return { authenticated: false, error: error.message };
      }
      
      if (!user) {
        console.error('❌ No user found in authentication check');
        return { authenticated: false, error: 'No authenticated user found' };
      }
      
      console.log('✅ Authentication successful:', user.id);
      return { authenticated: true, user };
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown authentication error';
      console.error('❌ Authentication check exception:', error);
      return { authenticated: false, error: errorMessage };
    }
  }

  /**
   * Step 2: Validate booking details
   */
  validateBookingDetails(details: BookingDetails): { valid: boolean; errors: string[] } {
    console.log('🔍 Step 2: Validating booking details...');
    
    const errors: string[] = [];
    
    // Check required fields
    if (!details.propertyId) errors.push('Property ID is required');
    if (!details.startDate) errors.push('Start date is required');
    if (!details.endDate) errors.push('End date is required');
    if (!details.totalAmount || details.totalAmount <= 0) errors.push('Total amount must be greater than 0');
    if (!details.checkInTime) errors.push('Check-in time is required');
    
    // Validate dates
    if (details.startDate && details.endDate) {
      const start = new Date(details.startDate);
      const end = new Date(details.endDate);
      
      if (isNaN(start.getTime())) errors.push('Start date is invalid');
      if (isNaN(end.getTime())) errors.push('End date is invalid');
      if (start >= end) errors.push('Start date must be before end date');
    }
    
    // Validate amount range
    if (details.totalAmount && (details.totalAmount <= 0 || details.totalAmount > 10000000)) {
      errors.push('Total amount must be between 0 and 10,000,000');
    }
    
    // Validate team size range
    if (details.teamSize && (details.teamSize < 1 || details.teamSize > 100)) {
      errors.push('Team size must be between 1 and 100');
    }
    
    if (errors.length > 0) {
      console.error('❌ Booking details validation failed:', errors);
      return { valid: false, errors };
    }
    
    console.log('✅ Booking details validation passed');
    return { valid: true, errors: [] };
  }

  /**
   * Step 3: Check property exists
   */
  async checkPropertyExists(propertyId: string): Promise<{ exists: boolean; property?: any; error?: string }> {
    try {
      console.log('🔍 Step 3: Checking property exists...');
      
      const { data: property, error } = await supabase
        .from('properties')
        .select('id, title, price')
        .eq('id', propertyId)
        .single();
      
      if (error) {
        console.error('❌ Property check failed:', error);
        return { exists: false, error: error.message };
      }
      
      if (!property) {
        console.error('❌ Property not found:', propertyId);
        return { exists: false, error: 'Property not found' };
      }
      
      console.log('✅ Property exists:', property.title);
      return { exists: true, property };
      
    } catch (error) {
      console.error('❌ Property check exception:', error);
      return { 
        exists: false, 
        error: error instanceof Error ? error.message : 'Unknown property check error' 
      };
    }
  }

  /**
   * Step 4: Test Edge Function with minimal data
   */
  async testEdgeFunctionMinimal(): Promise<EdgeFunctionDebugResult> {
    try {
      console.log('🔍 Step 4: Testing Edge Function with minimal data...');
      
      const minimalData = {
        propertyId: '00000000-0000-0000-0000-000000000000',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        totalPrice: 100,
        teamSize: 1,
        notes: 'Test booking',
        paymentProvider: 'paystack'
      };
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: minimalData
      });
      
      if (error) {
        console.error('❌ Edge Function minimal test failed:', error);
        return {
          success: false,
          error: error.message,
          details: { minimalData, error },
          timestamp: new Date().toISOString()
        };
      }
      
      console.log('✅ Edge Function minimal test succeeded:', data);
      return {
        success: true,
        details: { minimalData, response: data },
        timestamp: new Date().toISOString()
      };
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Edge Function error';
      console.error('❌ Edge Function minimal test exception:', error);
      return {
        success: false,
        error: errorMessage,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Step 5: Test Edge Function with real data
   */
  async testEdgeFunctionReal(details: BookingDetails): Promise<EdgeFunctionDebugResult> {
    try {
      console.log('🔍 Step 5: Testing Edge Function with real data...');
      
      // Convert frontend naming to backend naming
      const backendData = {
        propertyId: details.propertyId,
        startDate: details.startDate,
        endDate: details.endDate,
        totalPrice: details.totalAmount, // Convert totalAmount to totalPrice
        checkInTime: details.checkInTime,
        notes: details.notes || '',
        paymentProvider: details.paymentProvider || 'paystack'
      };
      
      console.log('📤 Sending to Edge Function:', backendData);
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: backendData
      });
      
      if (error) {
        console.error('❌ Edge Function real test failed:', error);
        return {
          success: false,
          error: error.message,
          details: { backendData, error },
          timestamp: new Date().toISOString()
        };
      }
      
      console.log('✅ Edge Function real test succeeded:', data);
      return {
        success: true,
        details: { backendData, response: data },
        timestamp: new Date().toISOString()
      };
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Edge Function error';
      console.error('❌ Edge Function real test exception:', error);
      return {
        success: false,
        error: errorMessage,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Step 6: Check database connectivity
   */
  async checkDatabaseConnectivity(): Promise<{ connected: boolean; error?: string }> {
    try {
      console.log('🔍 Step 6: Checking database connectivity...');
      
      // Test basic database connection
      const { data, error } = await supabase
        .from('properties')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error('❌ Database connectivity check failed:', error);
        return { connected: false, error: error.message };
      }
      
      console.log('✅ Database connectivity confirmed');
      return { connected: true };
      
    } catch (error) {
      console.error('❌ Database connectivity check exception:', error);
      return { 
        connected: false, 
        error: error instanceof Error ? error.message : 'Unknown database error' 
      };
    }
  }

  /**
   * Run comprehensive debugging
   */
  async runComprehensiveDebug(details: BookingDetails): Promise<void> {
    console.log('🚀 Starting comprehensive Edge Function debugging...');
    
    const results = {
      authentication: await this.checkAuthentication(),
      validation: this.validateBookingDetails(details),
      property: await this.checkPropertyExists(details.propertyId),
      database: await this.checkDatabaseConnectivity(),
      minimalTest: await this.testEdgeFunctionMinimal(),
      realTest: null as EdgeFunctionDebugResult | null
    };
    
    // Only test real data if basic checks pass
    if (results.authentication.authenticated && 
        results.validation.valid && 
        results.property.exists && 
        results.database.connected) {
      results.realTest = await this.testEdgeFunctionReal(details);
    }
    
    // Generate comprehensive report
    this.generateDebugReport(results);
  }

  /**
   * Generate debug report
   */
  private generateDebugReport(results: any): void {
    console.log('\n📊 === COMPREHENSIVE DEBUG REPORT ===');
    
    // Authentication
    console.log('\n🔐 Authentication:');
    if (results.authentication.authenticated) {
      console.log('✅ User authenticated:', results.authentication.user?.id);
    } else {
      console.log('❌ Authentication failed:', results.authentication.error);
    }
    
    // Validation
    console.log('\n✅ Booking Details Validation:');
    if (results.validation.valid) {
      console.log('✅ All booking details are valid');
    } else {
      console.log('❌ Validation errors:', results.validation.errors);
    }
    
    // Property
    console.log('\n🏠 Property Check:');
    if (results.property.exists) {
      console.log('✅ Property exists:', results.property.property?.title);
    } else {
      console.log('❌ Property check failed:', results.property.error);
    }
    
    // Database
    console.log('\n💾 Database Connectivity:');
    if (results.database.connected) {
      console.log('✅ Database connection successful');
    } else {
      console.log('❌ Database connection failed:', results.database.error);
    }
    
    // Edge Function Tests
    console.log('\n⚡ Edge Function Tests:');
    console.log('Minimal Test:', results.minimalTest.success ? '✅ PASSED' : '❌ FAILED');
    if (!results.minimalTest.success) {
      console.log('Error:', results.minimalTest.error);
    }
    
    if (results.realTest) {
      console.log('Real Test:', results.realTest.success ? '✅ PASSED' : '❌ FAILED');
      if (!results.realTest.success) {
        console.log('Error:', results.realTest.error);
      }
    }
    
    console.log('\n🎯 === RECOMMENDATIONS ===');
    
    if (!results.authentication.authenticated) {
      console.log('📝 Fix authentication issues - ensure user is logged in');
    }
    
    if (!results.validation.valid) {
      console.log('📝 Fix validation errors in booking details');
    }
    
    if (!results.property.exists) {
      console.log('📝 Verify property ID is correct and property exists');
    }
    
    if (!results.database.connected) {
      console.log('📝 Check database connection and permissions');
    }
    
    if (!results.minimalTest.success) {
      console.log('📝 Edge Function has fundamental issues - check environment variables and deployment');
    }
    
    if (results.realTest && !results.realTest.success) {
      console.log('📝 Edge Function works with minimal data but fails with real data - check data format');
    }
    
    console.log('\n🏁 === DEBUG COMPLETE ===\n');
  }

  /**
   * Step 7: Direct Edge Function test (bypass Supabase client)
   */
  async testEdgeFunctionDirect(details: BookingDetails): Promise<EdgeFunctionDebugResult> {
    try {
      console.log('🔍 Step 7: Testing Edge Function with direct API call...');
      
      // Get Supabase URL and user session token
      const supabaseUrl = 'https://jwuakfowjxebtpcxcqyr.supabase.co';
      
      // Get current user session token
      const { data: { session } } = await supabase.auth.getSession();
      const userToken = session?.access_token;
      
      if (!userToken) {
        console.error('❌ No user session token available for direct API test');
        return {
          success: false,
          error: 'User not authenticated - no session token',
          details: { reason: 'No auth token' },
          timestamp: new Date().toISOString()
        };
      }
      
      console.log('🔐 Using user token for direct API test');
      
      // Convert frontend naming to backend naming
      const backendData = {
        propertyId: details.propertyId,
        startDate: details.startDate,
        endDate: details.endDate,
        totalPrice: details.totalAmount,
        checkInTime: details.checkInTime,
        notes: details.notes || '',
        paymentProvider: details.paymentProvider || 'paystack'
      };
      
      console.log('📤 Direct API call to:', `${supabaseUrl}/functions/v1/create-payment`);
      console.log('📤 Request body:', backendData);
      
      const response = await fetch(`${supabaseUrl}/functions/v1/create-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData)
      });
      
      console.log('📦 Direct API response status:', response.status);
      console.log('📦 Direct API response headers:', Object.fromEntries(response.headers.entries()));
      
      const responseData = await response.json();
      console.log('📦 Direct API response data:', responseData);
      
      if (!response.ok) {
        console.error('❌ Direct API call failed:', response.status, responseData);
        return {
          success: false,
          error: `HTTP ${response.status}: ${responseData.error || responseData.message || 'Unknown error'}`,
          details: { status: response.status, response: responseData },
          timestamp: new Date().toISOString()
        };
      }
      
      console.log('✅ Direct API call succeeded:', responseData);
      return {
        success: true,
        details: { status: response.status, response: responseData },
        timestamp: new Date().toISOString()
      };
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown direct API error';
      console.error('❌ Direct API call exception:', error);
      return {
        success: false,
        error: errorMessage,
        details: { error },
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Quick debug method for immediate feedback
   */
  async quickDebug(details: BookingDetails): Promise<void> {
    const auth = await this.checkAuthentication();
    const validation = this.validateBookingDetails(details);
    const property = await this.checkPropertyExists(details.propertyId);
    
    if (!auth.authenticated) {
      toast.error('Authentication issue: Please log in again');
      return;
    }
    
    if (!validation.valid) {
      toast.error('Validation error: ' + validation.errors.join(', '));
      return;
    }
    
    if (!property.exists) {
      toast.error('Property not found');
      return;
    }
    
    toast.success('Basic checks passed - testing Edge Function...');
    const result = await this.testEdgeFunctionReal(details);
    
    if (result.success) {
      toast.success('Edge Function test passed!');
    } else {
      toast.error('Edge Function failed: ' + result.error);
      console.log('🔍 Trying direct API call as fallback...');
      const directResult = await this.testEdgeFunctionDirect(details);
      if (directResult.success) {
        toast.success('Direct API call worked - issue with Supabase client');
      } else {
        toast.error('Direct API also failed: ' + directResult.error);
      }
    }
  }
}

// Export singleton instance
export const edgeFunctionDebugger = EdgeFunctionDebugger.getInstance();
