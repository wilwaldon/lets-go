import React from 'react';
import { Button } from '@/components/ui/Button';
import { useCheckout } from '../hooks/useCheckout';
import { useToast } from '@/components/ui/Toast';

interface CheckoutButtonProps {
  orderId: string;
  amount: number;
  customerEmail: string;
  disabled?: boolean;
  className?: string;
}

export function CheckoutButton({
  orderId,
  amount,
  customerEmail,
  disabled,
  className,
}: CheckoutButtonProps) {
  const { initiateCheckout, isLoading } = useCheckout();
  const { showToast } = useToast();

  const handleCheckout = async () => {
    try {
      await initiateCheckout({
        orderId,
        amount,
        customerEmail,
        successUrl: `${window.location.origin}/order-success?order_id=${orderId}`,
        cancelUrl: `${window.location.origin}/menu`,
      });
    } catch (error) {
      showToast('Failed to initiate checkout. Please try again.', 'error');
      console.error('Checkout error:', error);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      size="lg"
      className={className}
    >
      {isLoading ? 'Processing...' : 'Continue to Payment'}
    </Button>
  );
}
