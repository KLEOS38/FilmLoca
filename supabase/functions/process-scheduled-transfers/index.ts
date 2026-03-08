import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    console.log('Processing scheduled transfers...')

    // Get all bookings with scheduled transfers that are due
    const currentDate = new Date().toISOString()
    const { data: scheduledBookings, error: fetchError } = await supabaseClient
      .from('bookings')
      .select(`
        id,
        property_id,
        user_id,
        host_amount,
        transfer_status,
        transfer_scheduled_date,
        properties!inner(
          user_id,
          title
        )
      `)
      .eq('transfer_status', 'scheduled')
      .lte('transfer_scheduled_date', currentDate)

    if (fetchError) {
      console.error('Error fetching scheduled bookings:', fetchError)
      throw fetchError
    }

    console.log(`Found ${scheduledBookings?.length || 0} scheduled transfers to process`)

    if (!scheduledBookings || scheduledBookings.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No scheduled transfers to process',
          processed: 0 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    let processedCount = 0
    let failedCount = 0

    // Process each scheduled transfer
    for (const booking of scheduledBookings) {
      try {
        console.log(`Processing transfer for booking ${booking.id}`)

        // Get host's bank account details
        const { data: hostProfile, error: profileError } = await supabaseClient
          .from('profiles')
          .select('bank_account_number, bank_code, bank_account_name')
          .eq('id', booking.properties.user_id)
          .single()

        if (profileError || !hostProfile) {
          console.error(`Error fetching host profile for booking ${booking.id}:`, profileError)
          failedCount++
          continue
        }

        if (!hostProfile.bank_account_number || !hostProfile.bank_code) {
          console.log(`Host ${booking.properties.user_id} has no bank account details for booking ${booking.id}`)
          
          // Update booking status to pending bank details
          await supabaseClient
            .from('bookings')
            .update({
              transfer_status: 'pending_bank_details',
              updated_at: new Date().toISOString()
            })
            .eq('id', booking.id)

          // Create notification for host to add bank details
          await supabaseClient
            .from('notifications')
            .insert({
              user_id: booking.properties.user_id,
              title: 'Add Bank Account Details 🏦',
              message: `Please add your bank account details to receive your payment of ₦${(booking.host_amount / 100).toLocaleString()} for booking ${booking.id}.`,
              type: 'add_bank_details',
              data: {
                booking_id: booking.id,
                pending_amount: booking.host_amount
              }
            })

          failedCount++
          continue
        }

        // Create transfer to host's bank account
        const transferResponse = await fetch('https://api.paystack.co/transfer', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('PAYSTACK_SECRET_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            source: 'balance',
            amount: booking.host_amount,
            recipient: hostProfile.bank_account_number,
            reason: `Payment for booking ${booking.id} - ${booking.properties.title}`,
            reference: `transfer-${booking.id}-${Date.now()}`,
            currency: 'NGN'
          }),
        })

        if (transferResponse.ok) {
          const transferData = await transferResponse.json()
          console.log(`Transfer successful for booking ${booking.id}:`, transferData.data.reference)

          // Update booking with transfer information
          await supabaseClient
            .from('bookings')
            .update({
              transfer_status: 'completed',
              transfer_reference: transferData.data.reference,
              transfer_completed_date: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', booking.id)

          // Create notification for host about successful transfer
          await supabaseClient
            .from('notifications')
            .insert({
              user_id: booking.properties.user_id,
              title: 'Payment Transferred Successfully 💰',
              message: `₦${(booking.host_amount / 100).toLocaleString()} has been transferred to your bank account for booking ${booking.id}. Transfer reference: ${transferData.data.reference}`,
              type: 'transfer_completed',
              data: {
                booking_id: booking.id,
                transfer_amount: booking.host_amount,
                transfer_reference: transferData.data.reference,
                bank_account: hostProfile.bank_account_number
              }
            })

          processedCount++
        } else {
          const errorText = await transferResponse.text()
          console.error(`Transfer failed for booking ${booking.id}:`, errorText)

          // Update booking status to failed
          await supabaseClient
            .from('bookings')
            .update({
              transfer_status: 'failed',
              transfer_error: errorText,
              updated_at: new Date().toISOString()
            })
            .eq('id', booking.id)

          // Create notification about transfer failure
          await supabaseClient
            .from('notifications')
            .insert({
              user_id: booking.properties.user_id,
              title: 'Transfer Failed ⚠️',
              message: `Transfer of ₦${(booking.host_amount / 100).toLocaleString()} failed for booking ${booking.id}. Please contact support.`,
              type: 'transfer_failed',
              data: {
                booking_id: booking.id,
                transfer_amount: booking.host_amount,
                error: errorText
              }
            })

          failedCount++
        }
      } catch (error) {
        console.error(`Error processing transfer for booking ${booking.id}:`, error)
        failedCount++
      }
    }

    console.log(`Transfer processing completed. Processed: ${processedCount}, Failed: ${failedCount}`)

    return new Response(
      JSON.stringify({ 
        message: 'Scheduled transfers processed',
        processed: processedCount,
        failed: failedCount,
        total: scheduledBookings.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error processing scheduled transfers:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
