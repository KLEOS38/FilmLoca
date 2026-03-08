import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== PAYMENT REQUEST STARTED ===");
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return new Response(
        JSON.stringify({
          error: "Invalid JSON in request body",
          details: e instanceof Error ? e.message : String(e),
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const {
      propertyId,
      startDate,
      endDate,
      totalPrice,
      teamSize,
      notes,
      paymentProvider = "paystack",
    } = requestBody;

    console.log("Request body received:", {
      propertyId,
      startDate,
      endDate,
      totalPrice,
      teamSize,
    });

    // Validate required fields
    if (!propertyId || !startDate || !endDate || !totalPrice || !checkInTime) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({
          error:
            "Missing required fields: propertyId, startDate, endDate, totalPrice, checkInTime",
          code: "MISSING_FIELDS",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Validate totalPrice
    const totalPriceNum =
      typeof totalPrice === "string" ? parseFloat(totalPrice) : totalPrice;
    if (
      isNaN(totalPriceNum) ||
      totalPriceNum <= 0 ||
      totalPriceNum > 10000000
    ) {
      console.error("Invalid total price:", totalPrice);
      return new Response(
        JSON.stringify({
          error: "Invalid total price: must be between 0 and 10000000",
          code: "INVALID_PRICE",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Validate teamSize
    const teamSizeNum =
      typeof teamSize === "string" ? parseInt(teamSize) : teamSize;
    if (isNaN(teamSizeNum) || teamSizeNum < 1 || teamSizeNum > 100) {
      console.error("Invalid team size:", teamSize);
      return new Response(
        JSON.stringify({
          error: "Invalid team size: must be between 1 and 100",
          code: "INVALID_TEAM_SIZE",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Validate dates - more lenient validation
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      console.error("Invalid booking dates:", { startDate, endDate });
      return new Response(
        JSON.stringify({
          error: "Invalid booking dates: start must be before end",
          code: "INVALID_DATES",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Get auth token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No Authorization header");
      return new Response(
        JSON.stringify({
          error: "User not authenticated: No authorization header",
          code: "NO_AUTH_HEADER",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        },
      );
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      console.error("No token in Authorization header");
      return new Response(
        JSON.stringify({
          error: "User not authenticated: No token provided",
          code: "NO_TOKEN",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        },
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({
          error: "Server configuration error",
          code: "MISSING_CONFIG",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    // FIXED: Use getUser with better error handling and token validation
    console.log("Authenticating user with token");
    let userData;
    let userError;

    try {
      // First try to get user with the token
      const result = await supabaseClient.auth.getUser(token);
      userData = result.data;
      userError = result.error;

      console.log("Auth result:", { userData: userData?.user?.id, error: userError });

      // If getUser fails, try alternative method
      if (userError || !userData?.user) {
        console.log("getUser failed, trying alternative auth method");
        
        // Try to get user from sessions as fallback
        try {
          const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession(token);
          if (!sessionError && sessionData?.user) {
            userData = { user: sessionData.user };
            userError = null;
            console.log("Fallback auth successful via session");
          } else {
            console.log("Session fallback also failed:", sessionError);
          }
        } catch (sessionErr) {
          console.log("Session fallback error:", sessionErr);
        }
      }
    } catch (authException) {
      console.error("Authentication exception:", authException);
      userError = authException;
      userData = null;
    }

    if (userError || !userData?.user) {
      console.error("User authentication failed completely:", userError);
      return new Response(
        JSON.stringify({
          error: "User not authenticated",
          code: "AUTH_FAILED",
          details: userError?.message || "Authentication failed",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        },
      );
    }

    const user = userData.user;
    console.log("User authenticated successfully:", user.id);

    // Verify property exists
    console.log("Verifying property exists:", propertyId);
    const { data: property, error: propertyError } = await supabaseClient
      .from("properties")
      .select("id, title, price, is_published")
      .eq("id", propertyId)
      .single();

    if (propertyError || !property) {
      console.error("Property not found:", propertyError);
      return new Response(
        JSON.stringify({
          error: "Property not found",
          code: "PROPERTY_NOT_FOUND",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        },
      );
    }

    if (!property.is_published) {
      console.error("Property not published:", propertyId);
      return new Response(
        JSON.stringify({
          error: "Property is not available for booking",
          code: "PROPERTY_NOT_PUBLISHED",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    console.log("Property verified:", property.title);

    // Create booking with service role to bypass RLS
    console.log("Creating booking with service role...");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseServiceRole = createClient(
      supabaseUrl,
      serviceRoleKey || supabaseAnonKey, // Fallback to anon key if service role not set
    );

    const { data: booking, error: bookingError } = await supabaseServiceRole
      .from("bookings")
      .insert({
        property_id: propertyId,
        user_id: user.id,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPriceNum,
        team_size: teamSizeNum,
        notes: notes || null,
        status: "pending",
        payment_status: "pending",
        // Temporarily comment out missing fields until database is updated
        // commission_amount: 0.00,
        // commission_rate: 0.0000,
        // is_test: false,
        // payment_reference: null,
      })
      .select()
      .single();

    if (bookingError) {
      console.error("Booking creation failed:", bookingError);
      return new Response(
        JSON.stringify({
          error: "Failed to create booking",
          code: "BOOKING_CREATION_FAILED",
          details: bookingError.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    console.log("Booking created successfully:", booking.id);

    // Handle payment - only Paystack for now
    if (paymentProvider !== "paystack") {
      console.error("Unsupported payment provider:", paymentProvider);
      return new Response(
        JSON.stringify({
          error: "Payment provider not supported",
          code: "UNSUPPORTED_PROVIDER",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Initialize Paystack payment
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY") || "sk_test_ff029298e7f7d62aeeb7a245f668e15b4be202e1";

    if (!paystackSecretKey) {
      console.error("PAYSTACK_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({
          error: "Paystack is not configured. Please contact support.",
          code: "PAYSTACK_NOT_CONFIGURED",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    const paymentReference = `booking_${booking.id}_${Date.now()}`;
    const origin =
      req.headers.get("origin") ||
      req.headers.get("referer") ||
      "https://filmloca.com";
    const callbackUrl = `${origin}/booking-success?booking_id=${booking.id}&reference=`;

    console.log("Initializing Paystack payment:", {
      reference: paymentReference,
      amount: totalPriceNum,
      bookingId: booking.id,
    });

    // Add timeout and retry logic for Paystack request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    try {
      const paystackResponse = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${paystackSecretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email || "user@example.com",
            amount: Math.round(totalPriceNum * 100), // Convert to kobo
            currency: "NGN",
            reference: paymentReference,
            callback_url: callbackUrl,
            metadata: {
              booking_id: booking.id,
              property_id: propertyId,
              user_id: user.id,
              property_title: property.title,
              start_date: startDate,
              end_date: endDate,
            },
          }),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);
      console.log("Paystack response status:", paystackResponse.status);

      if (!paystackResponse.ok) {
        const errorData = await paystackResponse.json().catch(() => ({}));
        const statusCode = paystackResponse.status;
        console.error("Paystack API error:", { statusCode, errorData });

        // Return appropriate status code based on HTTP status
        let responseStatus = 500;
        if (statusCode >= 400 && statusCode < 500) {
          responseStatus = statusCode; // Return actual error code from Paystack
        }

        return new Response(
          JSON.stringify({
            error: "Paystack payment initialization failed",
            code: "PAYSTACK_ERROR",
            status_code: statusCode,
            details: errorData.message || "Unknown error",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: responseStatus,
          },
        );
      }

      const paystackData = await paystackResponse.json();
      console.log("Paystack response received");

      if (!paystackData.status || !paystackData.data?.authorization_url) {
        console.error("Invalid Paystack response:", paystackData);
        return new Response(
          JSON.stringify({
            error: "Invalid response from Paystack",
            code: "INVALID_PAYSTACK_RESPONSE",
            details: paystackData.message || "Invalid response format",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          },
        );
      }

      // Update booking with payment reference
      const { error: updateError } = await supabaseServiceRole
        .from("bookings")
        .update({
          payment_id: paystackData.data.reference,
        })
        .eq("id", booking.id);

      if (updateError) {
        console.error("Warning: Could not update payment_id:", updateError);
        // Don't fail here - payment was initialized successfully
      }

      console.log("=== PAYMENT REQUEST SUCCESSFUL ===");
      return new Response(
        JSON.stringify({
          success: true,
          authorization_url: paystackData.data.authorization_url,
          reference: paystackData.data.reference,
          booking_id: booking.id,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    } catch (paystackError) {
      clearTimeout(timeoutId);
      
      if (paystackError.name === 'AbortError') {
        console.error("Paystack request timed out");
        return new Response(
          JSON.stringify({
            error: "Payment request timed out",
            code: "PAYSTACK_TIMEOUT",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 408, // Request Timeout
          },
        );
      }

      console.error("Paystack request failed:", paystackError);
      return new Response(
        JSON.stringify({
          error: "Failed to initialize payment",
          code: "PAYSTACK_REQUEST_FAILED",
          details:
            paystackError instanceof Error
              ? paystackError.message
              : String(paystackError),
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error("=== PAYMENT REQUEST FAILED ===");
    console.error("Error:", errorMessage);
    console.error("Stack:", errorStack);

    return new Response(
      JSON.stringify({
        error: "Payment processing failed",
        code: "GENERAL_ERROR",
        details: errorMessage,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
