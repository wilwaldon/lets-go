import React, { useEffect } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { CartItem } from './CartItem';
import { OrderSummary } from './OrderSummary';
import { Button } from '@/components/ui/Button';
import type { CartItem as CartItemType } from '@/types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  subtotal: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

export function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  tax,
  total,
  onCheckout,
}: CartProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-xl animate-slide-in flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <h2 id="cart-title" className="text-xl font-semibold text-secondary-900 flex items-center gap-2">
            <ShoppingCart size={24} />
            Your Cart ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-secondary-300 mb-4" />
              <p className="text-secondary-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with Summary */}
        {items.length > 0 && (
          <div className="border-t border-secondary-200 p-6 space-y-4">
            <OrderSummary subtotal={subtotal} tax={tax} total={total} />
            <Button onClick={onCheckout} className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
