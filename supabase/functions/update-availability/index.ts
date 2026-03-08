
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
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) throw new Error("Authentication error: " + userError.message);
    const user = userData.user;
    
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Parse and validate request body
    const requestBody = await req.json();
    const { propertyId, action, startDate, endDate, reason } = requestBody;
    
    if (!propertyId || !action || !startDate || !endDate) {
      throw new Error("Missing required fields: propertyId, action, startDate, endDate");
    }

    // Validate action type
    if (!['block', 'unblock'].includes(action)) {
      throw new Error("Invalid action type. Must be 'block' or 'unblock'");
    }

    // Validate UUID format for propertyId
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(propertyId)) {
      throw new Error("Invalid property ID format");
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      throw new Error("Invalid date range");
    }

    // Sanitize reason if provided
    const sanitizedReason = reason ? reason.substring(0, 200).trim() : null;

    // Verify property ownership
    const { data: property, error: propertyError } = await supabaseClient
      .from("properties")
      .select("id")
      .eq("id", propertyId)
      .eq("owner_id", user.id)
      .single();
    
    if (propertyError || !property) {
      throw new Error("You do not have permission to update this property's availability");
    }

    // Process based on action type
    if (action === "block") {
      // Block dates by creating unavailability record
      const { data: blockData, error: blockError } = await supabaseClient
        .from("property_unavailability")
        .insert({
          property_id: propertyId,
          start_date: startDate,
          end_date: endDate,
          reason: sanitizedReason || "Owner blocked"
        });
      
      if (blockError) throw blockError;
      
      return new Response(JSON.stringify({
        success: true,
        message: "Dates have been blocked successfully",
        data: blockData
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else if (action === "unblock") {
      // Unblock dates by removing unavailability records
      const { data: unblockData, error: unblockError } = await supabaseClient
        .from("property_unavailability")
        .delete()
        .eq("property_id", propertyId)
        .gte("start_date", startDate)
        .lte("end_date", endDate);
      
      if (unblockError) throw unblockError;
      
      return new Response(JSON.stringify({
        success: true,
        message: "Dates have been unblocked successfully",
        data: unblockData
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      throw new Error("Invalid action type. Must be 'block' or 'unblock'");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating availability:", errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
