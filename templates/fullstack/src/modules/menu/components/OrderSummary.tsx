import React from 'react';

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

export function OrderSummary({ subtotal, tax, total }: OrderSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-secondary-600">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-secondary-600">
        <span>Tax (7%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="border-t border-secondary-200 pt-2 mt-2">
        <div className="flex justify-between text-lg font-semibold text-secondary-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
