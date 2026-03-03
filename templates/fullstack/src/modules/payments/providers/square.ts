import type { PaymentProvider, CheckoutParams, CheckoutSession } from '@/types';
import { supabase } from '@/lib/supabase';

export const squareProvider: PaymentProvider = {
  name: 'square',

  async createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession> {
    try {
      // Call Supabase Edge Function to create Square Checkout
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          provider: 'square',
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
      console.error('Square checkout error:', error);
      throw new Error('Failed to create Square checkout session');
    }
  },
};
