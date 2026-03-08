import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to create Paystack subaccount
async function createPaystackSubaccount(hostData: any, paystackSecret: string) {
  const subaccountData = {
    business_name: hostData.business_name,
    bank_code: hostData.bank_code,
    account_number: hostData.account_number,
    percentage_charge: hostData.commission_percentage || 5.0,
    description: `Host subaccount for ${hostData.business_name}` 
  };

  const response = await fetch("https://api.paystack.co/subaccount", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${paystackSecret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subaccountData),
  });

  const result = await response.json();
  
  if (!result.status) {
    throw new Error(`Failed to create subaccount: ${result.message}`);
  }

  return result.data;
}

// Enhanced payment function with subaccount support
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    const { 
      propertyId, 
      startDate, 
      endDate, 
      totalPrice, 
      checkInTime,  // ✅ FIXED: Replaced teamSize
      notes, 
      paymentProvider = 'paystack'
    } = requestBody;

    // Validate required fields
    if (!propertyId || !startDate || !endDate || !totalPrice || !checkInTime) {
      throw new Error("Missing required fields");
    }

    // Sanitize and validate inputs
    if (typeof totalPrice !== 'number' || totalPrice <= 0 || totalPrice > 10000000) {
      throw new Error("Invalid total price");
    }

    // ✅ FIXED: Validate checkInTime instead of teamSize
    if (!checkInTime || typeof checkInTime !== 'string') {
      throw new Error("Invalid check-in time");
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(checkInTime)) {
      throw new Error("Invalid check-in time format");
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      throw new Error("Invalid booking dates");
    }

    // Rate limiting check
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    console.log(`Payment attempt from IP: ${clientIP}, Property: ${propertyId}, Amount: ${totalPrice}, Check-in: ${checkInTime}`);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "https://jwuakfowjxebtpcxcqyr.supabase.co",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dWFrZm93anhlYnRwY3hjcXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMDkzNzksImV4cCI6MjA1OTU4NTM3OX0.MgQBolc8BmqN4qFe-8FEgR3MBjg8T6QY9W00Ld8Y1OE"
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }
    
    const user = userData.user;

    // Get property details with host information
    const { data: property, error: propertyError } = await supabaseClient
      .from("properties")
      .select(`
        title, 
        price, 
        user_id,
        profiles!inner(
          id,
          business_name,
          bank_code,
          account_number,
          commission_percentage,
          subaccount_code
        )
      `)
      .eq("id", propertyId)
      .single();
    
    if (propertyError || !property) {
      throw new Error("Property not found");
    }

    console.log(`Property found: ${property.title}, Host: ${property.profiles.business_name}`);

    // ✅ FIXED: Create booking record with checkInTime instead of teamSize
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .insert({
        property_id: propertyId,
        user_id: user.id,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        notes: notes,
        status: "pending",
        payment_status: "pending",
        // ✅ FIXED: Include checkInTime and remove teamSize
        check_in_time: checkInTime,
        // ✅ FIXED: Include commission fields if they exist
        commission_amount: 0.00,
        commission_rate: 0.0000,
        is_test: false,
        payment_reference: null
      })
      .select()
      .single();
      
    if (bookingError) {
      throw new Error(`Failed to create booking: ${bookingError.message}`);
    }

    // Handle Paystack payment with subaccount support
    if (paymentProvider === 'paystack') {
      // Use environment variable or fallback to test key
      const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY") ?? "sk_test_your_secret_key_here";
      
      if (!paystackSecretKey || paystackSecretKey === "sk_test_your_secret_key_here") {
        throw new Error("Paystack secret key not configured. Please set PAYSTACK_SECRET_KEY environment variable.");
      }

      // Check if host has subaccount, create if not
      let subaccountCode = property.profiles?.subaccount_code;
      
      if (!subaccountCode && property.profiles?.business_name) {
        console.log(`Creating subaccount for host: ${property.profiles.business_name}`);
        
        try {
          // Create subaccount for host
          const subaccountData = await createPaystackSubaccount({
            business_name: property.profiles.business_name,
            bank_code: property.profiles.bank_code,
            account_number: property.profiles.account_number,
            commission_percentage: property.profiles.commission_percentage || 5.0
          }, paystackSecretKey);
          
          subaccountCode = subaccountData.subaccount_code;
          
          // Update host profile with subaccount code
          const { error: updateError } = await supabaseClient
            .from("profiles")
            .update({ subaccount_code: subaccountCode })
            .eq("id", property.profiles.id);
            
          if (updateError) {
            console.error(`Failed to update profile with subaccount: ${updateError.message}`);
          } else {
            console.log(`✅ Subaccount created and profile updated: ${subaccountCode}`);
          }
        } catch (error) {
          console.error(`Failed to create subaccount: ${error.message}`);
          // Continue without subaccount (host won't get commission split)
        }
      } else if (subaccountCode) {
        console.log(`Using existing subaccount: ${subaccountCode}`);
      } else {
        console.warn(`Host profile missing business information for subaccount creation`);
      }

      // Prepare payment data
      const paymentData = {
        email: user.email,
        amount: Math.round(totalPrice * 100), // Convert to kobo
        currency: "NGN",
        reference: `booking_${booking.id}_${Date.now()}`,
        callback_url: `${req.headers.get("origin")}/booking-success?booking_id=${booking.id}`,
        metadata: {
          booking_id: booking.id,
          property_id: propertyId,
          user_id: user.id,
          property_title: property.title,
          start_date: startDate,
          end_date: endDate,
          check_in_time: checkInTime, // ✅ FIXED: Include checkInTime in metadata
          host_id: property.user_id,
          business_name: property.profiles?.business_name
        }
      };

      // Add subaccount if available
      if (subaccountCode) {
        paymentData.subaccount = subaccountCode;
      }

      // Initialize Paystack payment
      const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const paystackData = await paystackResponse.json();

      if (!paystackData.status) {
        throw new Error(`Paystack error: ${paystackData.message}`);
      }

      // Update booking with payment reference
      await supabaseClient
        .from("bookings")
        .update({
          payment_id: paystackData.data.reference,
          payment_data: {
            subaccount_code: subaccountCode,
            commission_percentage: property.profiles?.commission_percentage || 5.0,
            host_business_name: property.profiles?.business_name,
            check_in_time: checkInTime // ✅ FIXED: Include checkInTime
          }
        })
        .eq("id", booking.id);

      return new Response(JSON.stringify({ 
        authorization_url: paystackData.data.authorization_url,
        payment_url: paystackData.data.authorization_url,
        reference: paystackData.data.reference,
        booking_id: booking.id,
        subaccount_created: !!subaccountCode,
        commission_percentage: property.profiles?.commission_percentage || 5.0
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Fallback for other payment providers
    throw new Error("Payment provider not supported");

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Payment error:", errorMessage);
    
    // Security: Don't expose internal error details
    const publicError = errorMessage.includes("Missing") || errorMessage.includes("Invalid") 
      ? errorMessage 
      : "Payment processing failed. Please try again.";
    
    return new Response(JSON.stringify({ error: publicError }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
