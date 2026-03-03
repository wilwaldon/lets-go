// Supabase Edge Function for creating checkout sessions
// This function handles both Stripe and Square checkout creation

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.10.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CheckoutRequest {
  provider: 'stripe' | 'square';
  amount: number;
  orderId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body: CheckoutRequest = await req.json();
    const { provider, amount, orderId, customerEmail, successUrl, cancelUrl } = body;

    // Validate request
    if (!provider || !amount || !orderId || !customerEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (provider === 'stripe') {
      return await handleStripeCheckout({
        amount,
        orderId,
        customerEmail,
        successUrl,
        cancelUrl,
      });
    } else if (provider === 'square') {
      return await handleSquareCheckout({
        amount,
        orderId,
        customerEmail,
        successUrl,
        cancelUrl,
      });
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid payment provider' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleStripeCheckout({
  amount,
  orderId,
  customerEmail,
  successUrl,
  cancelUrl,
}: Omit<CheckoutRequest, 'provider'>) {
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

  if (!stripeSecretKey) {
    return new Response(
      JSON.stringify({ error: 'Stripe not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2023-10-16',
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Order from Restaurant',
              description: `Order ID: ${orderId}`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customerEmail,
      metadata: {
        orderId,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return new Response(
      JSON.stringify({
        url: session.url,
        sessionId: session.id,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Stripe error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create Stripe checkout' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleSquareCheckout({
  amount,
  orderId,
  customerEmail,
  successUrl,
  cancelUrl,
}: Omit<CheckoutRequest, 'provider'>) {
  const squareAccessToken = Deno.env.get('SQUARE_ACCESS_TOKEN');
  const squareLocationId = Deno.env.get('SQUARE_LOCATION_ID');

  if (!squareAccessToken || !squareLocationId) {
    return new Response(
      JSON.stringify({ error: 'Square not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Create Square checkout
    const response = await fetch('https://connect.squareup.com/v2/online-checkout/payment-links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${squareAccessToken}`,
        'Content-Type': 'application/json',
        'Square-Version': '2023-12-13',
      },
      body: JSON.stringify({
        idempotency_key: orderId,
        order: {
          location_id: squareLocationId,
          line_items: [
            {
              name: 'Restaurant Order',
              quantity: '1',
              base_price_money: {
                amount: Math.round(amount * 100), // Convert to cents
                currency: 'USD',
              },
            },
          ],
        },
        checkout_options: {
          redirect_url: successUrl,
          ask_for_shipping_address: false,
        },
        pre_populated_data: {
          buyer_email: customerEmail,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Square API error: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        url: data.payment_link.url,
        sessionId: data.payment_link.id,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Square error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create Square checkout' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
