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
    console.log("=== PAYMENT REQUEST STARTED ===");
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);

    // Enhanced input validation and sanitization
    const requestBody = await req.json();
    const { propertyId, startDate, endDate, totalPrice, teamSize, notes, paymentProvider = 'paystack' } = requestBody;

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    // Validate required fields
    if (!propertyId || !startDate || !endDate || !totalPrice) {
      console.error("Missing required fields");
      return new Response(JSON.stringify({ 
        error: "Missing required fields: propertyId, startDate, endDate, totalPrice",
        received: requestBody
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Sanitize and validate inputs
    if (typeof totalPrice !== 'number' || totalPrice <= 0 || totalPrice > 10000000) {
      console.error("Invalid total price:", totalPrice);
      return new Response(JSON.stringify({ 
        error: "Invalid total price: must be between 0 and 10000000",
        received: totalPrice
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (typeof teamSize !== 'number' || teamSize < 1 || teamSize > 100) {
      console.error("Invalid team size:", teamSize);
      return new Response(JSON.stringify({ 
        error: "Invalid team size: must be between 1 and 100",
        received: teamSize
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      console.error("Invalid booking dates:", { startDate, endDate });
      return new Response(JSON.stringify({ 
        error: "Invalid booking dates: start must be before end",
        received: { startDate, endDate }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Rate limiting check (simple implementation)
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    
    // Log security event
    console.log(`Payment attempt from IP: ${clientIP}, Property: ${propertyId}, Amount: ${totalPrice}`);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No Authorization header found");
      return new Response(JSON.stringify({ 
        error: "User not authenticated: No authorization header",
        code: "NO_AUTH_HEADER"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      console.error("No token found in Authorization header");
      return new Response(JSON.stringify({ 
        error: "User not authenticated: No token provided",
        code: "NO_TOKEN"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    console.log("Attempting to authenticate user with token:", token.substring(0, 20) + "...");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      console.error("User authentication error:", userError);
      return new Response(JSON.stringify({ 
        error: `User not authenticated: ${userError.message}`,
        code: "AUTH_ERROR",
        details: userError
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    if (!userData.user) {
      console.error("No user data returned from authentication");
      return new Response(JSON.stringify({ 
        error: "User not authenticated: No user data",
        code: "NO_USER_DATA"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    console.log("User authenticated successfully:", userData.user.id);
    
    const user = userData.user;

    // Get property details
    const { data: property, error: propertyError } = await supabaseClient
      .from("properties")
      .select("title, price")
      .eq("id", propertyId)
      .single();
    
    if (propertyError || !property) {
      console.error("Property not found:", propertyError);
      return new Response(JSON.stringify({ 
        error: "Property not found",
        code: "PROPERTY_NOT_FOUND",
        details: propertyError
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    console.log("Property found:", property.title);

    // Create booking record in database (pending payment)
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .insert({
        property_id: propertyId,
        user_id: user.id,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        team_size: teamSize,
        notes: notes,
        status: "pending",
        payment_status: "pending"
      })
      .select()
      .single();
      
    if (bookingError) {
      console.error("Failed to create booking:", bookingError);
      return new Response(JSON.stringify({ 
        error: `Failed to create booking: ${bookingError.message}`,
        code: "BOOKING_CREATION_FAILED",
        details: bookingError
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("Booking created successfully:", booking.id);

    // Handle Paystack payment
    if (paymentProvider === 'paystack') {
      const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
      
      if (!paystackSecretKey) {
        console.error("PAYSTACK_SECRET_KEY not found in environment variables");
        return new Response(JSON.stringify({ 
          error: "Paystack secret key not configured. Please set PAYSTACK_SECRET_KEY in Supabase Edge Function secrets.",
          code: "MISSING_PAYSTACK_KEY",
          hint: "Go to Supabase Dashboard > Edge Functions > Settings > Secrets"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      console.log("Paystack secret key found:", paystackSecretKey.substring(0, 10) + "...");
      console.log("Initializing Paystack payment for booking:", booking.id);
      console.log("Payment details:", {
        email: user.email,
        amount: totalPrice,
        amountInKobo: Math.round(totalPrice * 100),
        propertyId: propertyId,
        bookingId: booking.id
      });

      const paymentReference = `booking_${booking.id}_${Date.now()}`;
      const origin = req.headers.get("origin") || req.headers.get("referer") || "https://filmloca.com";
      const callbackUrl = `${origin}/booking-success?booking_id=${booking.id}`;
      
      console.log("Paystack request details:", {
        reference: paymentReference,
        callback_url: callbackUrl,
        amount: Math.round(totalPrice * 100)
      });

      try {
        // Initialize Paystack payment
        const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${paystackSecretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email || user.user_metadata?.email || "user@example.com",
            amount: Math.round(totalPrice * 100), // Convert to kobo (Paystack uses kobo)
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
        });

        console.log("Paystack response status:", paystackResponse.status);
        const paystackData = await paystackResponse.json();
        console.log("Paystack response data:", JSON.stringify(paystackData, null, 2));

        if (!paystackResponse.ok) {
          console.error("Paystack API error:", paystackData);
          return new Response(JSON.stringify({ 
            error: `Paystack API error: ${paystackData.message || 'Unknown error'}`,
            code: "PAYSTACK_API_ERROR",
            details: paystackData
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          });
        }

        if (!paystackData.status) {
          console.error("Paystack returned error status:", paystackData);
          return new Response(JSON.stringify({ 
            error: `Paystack error: ${paystackData.message || 'Payment initialization failed'}`,
            code: "PAYSTACK_ERROR",
            details: paystackData
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          });
        }

        if (!paystackData.data || !paystackData.data.authorization_url) {
          console.error("Paystack response missing authorization_url:", paystackData);
          return new Response(JSON.stringify({ 
            error: "Paystack did not return an authorization URL",
            code: "NO_AUTH_URL",
            details: paystackData
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          });
        }

        console.log("Paystack payment initialized successfully:", {
          reference: paystackData.data.reference,
          authorization_url: paystackData.data.authorization_url.substring(0, 50) + "..."
        });

        // Update booking with payment reference
        const { error: updateError } = await supabaseClient
          .from("bookings")
          .update({
            payment_id: paystackData.data.reference,
          })
          .eq("id", booking.id);

        if (updateError) {
          console.error("Error updating booking with payment reference:", updateError);
          // Don't throw error here, payment was initialized successfully
        }

        console.log("=== PAYMENT REQUEST SUCCESSFUL ===");
        return new Response(JSON.stringify({ 
          authorization_url: paystackData.data.authorization_url,
          payment_url: paystackData.data.authorization_url,
          reference: paystackData.data.reference,
          booking_id: booking.id,
          status: "success"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });

      } catch (paystackError) {
        console.error("Paystack API call failed:", paystackError);
        return new Response(JSON.stringify({ 
          error: `Paystack API call failed: ${paystackError.message}`,
          code: "PAYSTACK_CALL_FAILED",
          details: paystackError
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }
    }

    // Fallback for other payment providers or future implementations
    return new Response(JSON.stringify({ 
      error: "Payment provider not supported",
      code: "UNSUPPORTED_PROVIDER",
      supported_providers: ["paystack"]
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("=== PAYMENT INITIALIZATION ERROR ===");
    console.error("Error message:", errorMessage);
    console.error("Error stack:", errorStack);
    console.error("Request method:", req.method);
    console.error("Request URL:", req.url);
    
    // Log request headers (but not sensitive data)
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'authorization') {
        headers[key] = value.substring(0, 20) + '...'; // Only log prefix
      } else {
        headers[key] = value;
      }
    });
    console.error("Request headers:", headers);
    
    // Return detailed error for debugging (in production, you might want to hide some details)
    const publicError = errorMessage.includes("Missing") || 
                       errorMessage.includes("Invalid") || 
                       errorMessage.includes("not authenticated") ||
                       errorMessage.includes("not configured")
      ? errorMessage 
      : `Payment processing failed: ${errorMessage}`;
    
    console.error("=== PAYMENT REQUEST FAILED ===");
    return new Response(JSON.stringify({ 
      error: publicError,
      details: errorMessage,
      code: "GENERAL_ERROR",
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
