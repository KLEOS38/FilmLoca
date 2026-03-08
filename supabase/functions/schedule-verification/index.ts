import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerificationRequest {
  propertyId: string;
  propertyTitle: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const user = userData.user;

    // Parse request body
    const body: VerificationRequest = await req.json();
    const { propertyId, propertyTitle, preferredDate, preferredTime, notes } = body;

    // Validate required fields
    if (!propertyId || !propertyTitle || !preferredDate || !preferredTime) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: propertyId, propertyTitle, preferredDate, preferredTime' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(preferredDate)) {
      return new Response(JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(preferredTime)) {
      return new Response(JSON.stringify({ error: 'Invalid time format. Use HH:MM' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if property exists and user owns it
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id, title, owner_id')
      .eq('id', propertyId)
      .single();

    console.log('🏠 Property check:', { propertyId, property, propertyError, userId: user.id });

    if (propertyError || !property) {
      console.error('❌ Property not found:', propertyError);
      return new Response(JSON.stringify({ error: 'Property not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (property.owner_id !== user.id) {
      console.error('❌ Ownership mismatch:', { propertyOwner: property.owner_id, userId: user.id });
      return new Response(JSON.stringify({ error: 'You can only request verification for your own properties' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if verification already exists
    const { data: existingVerification } = await supabase
      .from('property_verifications')
      .select('*')
      .eq('property_id', propertyId)
      .eq('status', 'scheduled')
      .single();

    if (existingVerification) {
      return new Response(JSON.stringify({ error: 'Verification already scheduled for this property' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create verification appointment
    const { data: verification, error: verificationError } = await supabase
      .from('property_verifications')
      .insert({
        property_id: propertyId,
        user_id: user.id,
        property_title: propertyTitle,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        notes: notes || null,
        status: 'scheduled',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (verificationError) {
      console.error('Verification creation error:', verificationError);
      return new Response(JSON.stringify({ error: 'Failed to schedule verification' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // TODO: Send email notification to admin and user
    // TODO: Generate video call link (Zoom/Google Meet integration)
    
    const videoCallLink = `https://meet.filmloca.com/verification-${verification.id}`;
    
    // Update verification with video call link
    await supabase
      .from('property_verifications')
      .update({ video_call_link: videoCallLink })
      .eq('id', verification.id);

    return new Response(JSON.stringify({
      success: true,
      verification: {
        ...verification,
        video_call_link: videoCallLink,
      },
      message: 'Verification scheduled successfully',
      videoCallLink,
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Verification scheduling error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
