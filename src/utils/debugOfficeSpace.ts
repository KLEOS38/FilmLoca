import { supabase } from '@/integrations/supabase/client';

// Debug function to check actual database schema and data
export async function debugOfficeSpaceField() {
  console.log('🔍 DEBUGGING OFFICE SPACE FIELD ISSUE');
  
  try {
    // 1. Check if has_office_space column exists in database
    console.log('\n📋 Step 1: Checking database schema...');
    const { data: schemaData, error: schemaError } = await supabase
      .from('properties')
      .select('*')
      .limit(1);
    
    if (schemaError) {
      console.error('❌ Schema check failed:', schemaError);
      if (schemaError.message?.includes('has_office_space')) {
        console.error('🚨 CRITICAL: has_office_space column does not exist in database!');
      }
    } else {
      console.log('✅ Properties table accessible, checking columns...');
      console.log('Sample data keys:', Object.keys(schemaData?.[0] || {}));
    }
    
    // 2. Check a sample property to see actual data
    console.log('\n📋 Step 2: Checking sample property data...');
    const { data: properties, error: dataError } = await supabase
      .from('properties')
      .select('id, title')
      .limit(5);
    
    if (dataError) {
      console.error('❌ Data check failed:', dataError);
    } else {
      console.log('✅ Sample properties:', properties);
    }
    
    // 3. Try to select has_office_space specifically
    console.log('\n📋 Step 3: Testing has_office_space field access...');
    const { data: officeSpaceData, error: officeSpaceError } = await supabase
      .from('properties')
      .select('id, title, has_office_space')
      .limit(1);
    
    if (officeSpaceError) {
      console.error('❌ Office space field access failed:', officeSpaceError);
      console.error('This confirms the field does not exist in the database!');
    } else {
      console.log('✅ Office space field accessible:', officeSpaceData);
    }
    
    // 4. Try to update a test property with has_office_space
    console.log('\n📋 Step 4: Testing update with has_office_space...');
    const testId = properties?.[0]?.id;
    if (testId) {
      const { data: updateResult, error: updateError } = await supabase
        .from('properties')
        .update({ 
          has_office_space: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', testId)
        .select('id, title, updated_at')
        .single();
      
      if (updateError) {
        console.error('❌ Update test failed:', updateError);
        console.error('Error details:', {
          message: updateError.message,
          details: updateError.details,
          hint: updateError.hint,
          code: updateError.code
        });
      } else {
        console.log('✅ Update test successful:', updateResult);
      }
    }
    
  } catch (error) {
    console.error('❌ Debug function failed:', error);
  }
}
