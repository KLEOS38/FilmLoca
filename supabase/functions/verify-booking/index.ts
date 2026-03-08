
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get auth user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Invalid authorization header");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) throw userError;
    if (!userData.user) throw new Error("User not authenticated");
    
    const user = userData.user;
    
    // Get property ID from request with validation
    const requestBody = await req.json();
    const { propertyId } = requestBody;
    
    if (!propertyId || typeof propertyId !== 'string') {
      throw new Error("Property ID is required and must be a valid string");
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(propertyId)) {
      throw new Error("Invalid property ID format");
    }
    
    // Check if user has completed bookings for this property
    const { data: bookings, error: bookingsError } = await supabaseClient
      .from("bookings")
      .select("id")
      .eq("property_id", propertyId)
      .eq("user_id", user.id)
      .in("status", ["completed", "confirmed"])
      .limit(1);
    
    if (bookingsError) throw bookingsError;
    
    const hasCompletedBooking = bookings && bookings.length > 0;
    let bookingId = hasCompletedBooking ? bookings[0].id : null;
    
    // Check if user has already left a review
    const { data: reviews, error: reviewsError } = await supabaseClient
      .from("reviews")
      .select("id")
      .eq("property_id", propertyId)
      .eq("user_id", user.id)
      .limit(1);
    
    if (reviewsError) throw reviewsError;
    
    const hasReviewed = reviews && reviews.length > 0;
    
    // User can review if they have completed a booking and haven't already reviewed
    const canReview = hasCompletedBooking && !hasReviewed;
    
    return new Response(JSON.stringify({
      canReview,
      bookingId,
      hasCompletedBooking,
      hasReviewed
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
