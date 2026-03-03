import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { OrderSummary } from '@/modules/menu/components/OrderSummary';
import { CheckoutButton } from '@/modules/payments/components/CheckoutButton';
import { useCart } from '@/modules/menu/hooks/useCart';
import { useCreateOrder } from '@/modules/menu/hooks/useCreateOrder';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, tax, total } = useCart();
  const { createOrder, isLoading: isCreatingOrder } = useCreateOrder();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [email, setEmail] = useState(user?.email || '');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/menu');
    }
  }, [cart, navigate]);

  const handleCreateOrder = async () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email address');
      return;
    }

    try {
      const newOrderId = await createOrder({
        items: cart,
        subtotal,
        tax,
        total,
        guestEmail: user ? undefined : email,
      });

      setOrderId(newOrderId);
    } catch (error) {
      showToast('Failed to create order. Please try again.', 'error');
      console.error('Order creation error:', error);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <PageWrapper title="Checkout" description="Complete your order">
      <Section spacing="tight" className="!pt-32">
        <Container size="narrow">
          <h1
            className="text-3xl md:text-4xl font-bold text-secondary-900 mb-8"
            style={{ letterSpacing: '-0.02em' }}
          >
            Checkout
          </h1>

          <div className="space-y-8">
            {/* Order Items */}
            <div className="bg-white rounded-lg border border-secondary-200 p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Your Order</h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-2 border-b border-secondary-100 last:border-0">
                    <div>
                      <p className="font-medium text-secondary-900">{item.name}</p>
                      <p className="text-sm text-secondary-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-secondary-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg border border-secondary-200 p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Contact Information</h2>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                error={emailError}
                placeholder="your@email.com"
                disabled={!!user}
                required
              />
              {user && (
                <p className="mt-2 text-sm text-secondary-600">
                  Signed in as {user.email}
                </p>
              )}
            </div>

            {/* Order Summary & Payment */}
            <div className="bg-white rounded-lg border border-secondary-200 p-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">Order Summary</h2>
              <OrderSummary subtotal={subtotal} tax={tax} total={total} />

              <div className="mt-6">
                {!orderId ? (
                  <button
                    onClick={handleCreateOrder}
                    disabled={isCreatingOrder}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreatingOrder ? 'Creating Order...' : 'Continue to Payment'}
                  </button>
                ) : (
                  <CheckoutButton
                    orderId={orderId}
                    amount={total}
                    customerEmail={email}
                    className="w-full"
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
