// Supabase Edge Function for handling payment webhooks
// This function handles both Stripe and Square webhooks

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.10.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const provider = url.searchParams.get('provider');

  try {
    if (provider === 'stripe') {
      return await handleStripeWebhook(req);
    } else if (provider === 'square') {
      return await handleSquareWebhook(req);
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid provider' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleStripeWebhook(req: Request) {
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
  const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!stripeSecretKey || !stripeWebhookSecret) {
    return new Response(
      JSON.stringify({ error: 'Stripe not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
  });

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response(
      JSON.stringify({ error: 'Missing signature' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await updateOrderStatus(orderId, 'confirmed', session.id, 'stripe');
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook verification failed' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleSquareWebhook(req: Request) {
  const squareWebhookSignatureKey = Deno.env.get('SQUARE_WEBHOOK_SIGNATURE_KEY');

  if (!squareWebhookSignatureKey) {
    return new Response(
      JSON.stringify({ error: 'Square not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();

    // Verify webhook signature
    const signature = req.headers.get('x-square-signature');
    // Note: In production, verify the signature using squareWebhookSignatureKey

    // Handle the event
    if (body.type === 'payment.updated' && body.data?.object?.payment) {
      const payment = body.data.object.payment;

      if (payment.status === 'COMPLETED') {
        const orderId = payment.order_id;

        if (orderId) {
          await updateOrderStatus(orderId, 'confirmed', payment.id, 'square');
        }
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Square webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function updateOrderStatus(
  orderId: string,
  status: string,
  paymentId: string,
  provider: string
) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase not configured');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { error } = await supabase
    .from('orders')
    .update({
      status,
      payment_id: paymentId,
      payment_provider: provider,
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId);

  if (error) {
    console.error('Failed to update order:', error);
    throw error;
  }
}
