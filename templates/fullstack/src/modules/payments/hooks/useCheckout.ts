import { useState } from 'react';
import { featuresConfig } from '@/config/features.config';
import { stripeProvider } from '../providers/stripe';
import { squareProvider } from '../providers/square';
import type { CheckoutParams } from '@/types';

interface UseCheckoutReturn {
  initiateCheckout: (params: CheckoutParams) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

export function useCheckout(): UseCheckoutReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const provider = featuresConfig.paymentProvider === 'square' ? squareProvider : stripeProvider;

  const initiateCheckout = async (params: CheckoutParams): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const session = await provider.createCheckoutSession(params);

      // Redirect to payment provider's checkout page
      window.location.href = session.url;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Failed to initiate checkout');
      setError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  return { initiateCheckout, isLoading, error };
}
