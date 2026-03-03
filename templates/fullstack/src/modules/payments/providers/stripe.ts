import type { PaymentProvider, CheckoutParams, CheckoutSession } from '@/types';
import { supabase } from '@/lib/supabase';

export const stripeProvider: PaymentProvider = {
  name: 'stripe',

  async createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession> {
    try {
      // Call Supabase Edge Function to create Stripe Checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          provider: 'stripe',
          amount: params.amount,
          orderId: params.orderId,
          customerEmail: params.customerEmail,
          successUrl: params.successUrl,
          cancelUrl: params.cancelUrl,
        },
      });

      if (error) throw error;

      if (!data || !data.url || !data.sessionId) {
        throw new Error('Invalid response from payment service');
      }

      return {
        url: data.url,
        sessionId: data.sessionId,
      };
    } catch (error) {
      console.error('Stripe checkout error:', error);
      throw new Error('Failed to create Stripe checkout session');
    }
  },
};
