import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client using SERVICE ROLE for webhook (bypass RLS safely on backend)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the request body
    const body = await req.text()
    const signature = req.headers.get('x-paystack-signature')

    // Verify webhook signature
    const secret = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!secret) {
      throw new Error('Paystack secret key not configured')
    }

    // Verify signature
    const crypto = await import('https://deno.land/std@0.168.0/crypto/mod.ts')
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-512' },
      false,
      ['sign']
    )
    
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    if (signature !== computedSignature) {
      console.error('Invalid webhook signature')
      return new Response('Invalid signature', { status: 400, headers: corsHeaders })
    }

    // Parse the webhook payload
    const event = JSON.parse(body) as PaystackEvent
    console.log('Paystack webhook event:', event)

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleSuccessfulPayment(supabaseClient, event.data)
        break
      
      case 'charge.failed':
        await handleFailedPayment(supabaseClient, event.data)
        break
      
      case 'transfer.success':
        await handleSuccessfulTransfer(supabaseClient, event.data as PaystackTransferData)
        break
      
      case 'transfer.failed':
        await handleFailedTransfer(supabaseClient, event.data as PaystackTransferData)
        break
      
      default:
        console.log('Unhandled event type:', event.event)
    }

    return new Response('Webhook processed successfully', { 
      status: 200, 
      headers: corsHeaders 
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function handleSuccessfulPayment(supabaseClient: SupabaseClient, data: PaystackChargeData) {
  try {
    const { reference, amount, customer, metadata } = data
    
    console.log('Processing successful payment:', { reference, amount, metadata })
    
    // Update booking status to confirmed
    const { error: bookingError } = await supabaseClient
      .from('bookings')
      .update({
        status: 'confirmed',
        payment_status: 'paid',
        payment_id: reference,
        updated_at: new Date().toISOString()
      })
      .eq('id', metadata.booking_id)

    if (bookingError) {
      console.error('Error updating booking:', bookingError)
      throw bookingError
    }

    // Get property details for host notification
    const { data: property } = await supabaseClient
      .from('properties')
      .select('owner_id, title')
      .eq('id', metadata.property_id)
      .single()

    // Create notification for guest (renter)
    const { error: guestNotificationError } = await supabaseClient
      .from('notifications')
      .insert({
        user_id: metadata.user_id,
        title: 'Booking Confirmed! 🎉',
        message: `Your booking for ${metadata.property_title} from ${metadata.start_date} to ${metadata.end_date} has been confirmed. Payment of ₦${(amount / 100).toLocaleString()} processed successfully.`,
        type: 'booking_confirmed',
        data: {
          booking_id: metadata.booking_id,
          property_id: metadata.property_id,
          amount: amount,
          reference: reference,
          start_date: metadata.start_date,
          end_date: metadata.end_date
        }
      })

    if (guestNotificationError) {
      console.error('Error creating guest notification:', guestNotificationError)
    }

    // Create notification for host (property owner)
    if (property && (property as { owner_id?: string | null }).owner_id) {
      const { error: hostNotificationError } = await supabaseClient
        .from('notifications')
        .insert({
          user_id: (property as { owner_id: string }).owner_id,
          title: 'New Booking Received! 📅',
          message: `You have a new booking for ${property.title} from ${metadata.start_date} to ${metadata.end_date}. Guest: ${metadata.user_name}. Amount: ₦${(amount / 100).toLocaleString()}`,
          type: 'new_booking',
          data: {
            booking_id: metadata.booking_id,
            property_id: metadata.property_id,
            guest_name: metadata.user_name,
            guest_email: customer.email,
            amount: amount,
            reference: reference,
            start_date: metadata.start_date,
            end_date: metadata.end_date,
            team_size: metadata.team_size
          }
        })

      if (hostNotificationError) {
        console.error('Error creating host notification:', hostNotificationError)
      }

      // Update host's calendar with blocked dates
      const { error: calendarError } = await supabaseClient
        .from('property_unavailability')
        .insert({
          property_id: metadata.property_id,
          start_date: metadata.start_date,
          end_date: metadata.end_date,
          reason: 'booking',
          booking_id: metadata.booking_id,
          created_at: new Date().toISOString()
        })

      if (calendarError) {
        console.error('Error updating host calendar:', calendarError)
      }
    }

    // Update guest's profile with upcoming booking
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .update({
        updated_at: new Date().toISOString()
      })
      .eq('id', metadata.user_id)

    if (profileError) {
      console.error('Error updating guest profile:', profileError)
    }

    // Schedule transfer for 48 hours after booking end date (quality assurance hold)
    if (property && (property as { owner_id?: string | null }).owner_id) {
      try {
        // Calculate host amount (85% of total)
        const hostAmount = Math.round(amount * 0.85)
        const platformAmount = amount - hostAmount
        
        // Calculate transfer date (48 hours after booking end date)
        const bookingEndDate = new Date(metadata.end_date)
        const transferDate = new Date(bookingEndDate.getTime() + (48 * 60 * 60 * 1000)) // 48 hours later
        
        // Update booking with payment split and transfer schedule
        await supabaseClient
          .from('bookings')
          .update({
            host_amount: hostAmount,
            platform_amount: platformAmount,
            transfer_status: 'scheduled',
            transfer_scheduled_date: transferDate.toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', metadata.booking_id)

        // Create notification for host about scheduled transfer
        await supabaseClient
          .from('notifications')
          .insert({
            user_id: (property as { owner_id: string }).owner_id,
            title: 'Payment Scheduled 💰',
            message: `₦${(hostAmount / 100).toLocaleString()} will be transferred to your account 48 hours after the booking ends (${transferDate.toLocaleDateString()}) for quality assurance.`,
            type: 'payment_scheduled',
            data: {
              booking_id: metadata.booking_id,
              transfer_amount: hostAmount,
              transfer_date: transferDate.toISOString(),
              reason: '48-hour quality assurance hold'
            }
          })

        // Create notification for guest about payment hold
        await supabaseClient
          .from('notifications')
          .insert({
            user_id: metadata.user_id,
            title: 'Payment Secured 🔒',
            message: `Your payment of ₦${(amount / 100).toLocaleString()} is secured. The host will receive their payment 48 hours after your booking ends to ensure service quality.`,
            type: 'payment_secured',
            data: {
              booking_id: metadata.booking_id,
              total_amount: amount,
              transfer_date: transferDate.toISOString(),
              reason: 'Quality assurance protection'
            }
          })

        console.log(`Payment scheduled for transfer on ${transferDate.toISOString()} (48 hours after booking end)`)
      } catch (error) {
        console.error('Error scheduling payment transfer:', error)
      }
    }

    console.log('Successfully processed payment, created notifications, and initiated transfer')
  } catch (error) {
    console.error('Error handling successful payment:', error)
    throw error
  }
}

async function handleFailedPayment(supabaseClient: SupabaseClient, data: PaystackChargeData) {
  try {
    const { reference, customer, metadata } = data
    
    // Update booking status to failed
    const { error: bookingError } = await supabaseClient
      .from('bookings')
      .update({
        status: 'failed',
        payment_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', metadata.booking_id)

    if (bookingError) {
      console.error('Error updating booking:', bookingError)
      throw bookingError
    }

    // Create notification for user
    const { error: notificationError } = await supabaseClient
      .from('notifications')
      .insert({
        user_id: metadata.user_id || customer.email,
        title: 'Payment Failed',
        message: `Your payment for ${metadata.property_title} was not successful. Please try again.`,
        type: 'payment',
        data: {
          booking_id: metadata.booking_id,
          reference: reference
        }
      })

    if (notificationError) {
      console.error('Error creating notification:', notificationError)
    }

    console.log('Successfully processed failed payment:', reference)
  } catch (error) {
    console.error('Error handling failed payment:', error)
    throw error
  }
}

async function handleSuccessfulTransfer(_supabaseClient: SupabaseClient, data: PaystackTransferData) {
  try {
    const { reference, amount, recipient, metadata } = data
    
    // Log successful transfer
    console.log('Successful transfer:', {
      reference,
      amount,
      recipient: recipient.email,
      metadata
    })

    // You can add logic here to update host earnings or create notifications
  } catch (error) {
    console.error('Error handling successful transfer:', error)
    throw error
  }
}

async function handleFailedTransfer(_supabaseClient: SupabaseClient, data: PaystackTransferData) {
  try {
    const { reference, recipient, metadata } = data
    
    // Log failed transfer
    console.log('Failed transfer:', {
      reference,
      recipient: recipient.email,
      metadata
    })

    // You can add logic here to handle failed transfers
  } catch (error) {
    console.error('Error handling failed transfer:', error)
    throw error
  }
}

// Types
type PaystackEvent = {
  event: string;
  data: PaystackChargeData | PaystackTransferData;
}

type PaystackCustomer = {
  email: string;
}

type PaystackMetadata = {
  booking_id: string;
  property_id: string;
  property_title?: string;
  user_id: string;
  user_name?: string;
  start_date: string;
  end_date: string;
  team_size?: number;
}

type PaystackChargeData = {
  reference: string;
  amount: number; // in kobo
  customer: PaystackCustomer;
  metadata: PaystackMetadata;
}

type PaystackTransferData = {
  reference: string;
  amount: number;
  recipient: { email: string };
  metadata?: Record<string, unknown>;
}

