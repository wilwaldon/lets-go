import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-secondary-100 last:border-b-0">
      {item.image_url && (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />
      )}

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-secondary-900 mb-1">{item.name}</h3>
        <p className="text-sm text-secondary-600 mb-2">${item.price.toFixed(2)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-1 rounded hover:bg-secondary-100 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>

          <span className="text-sm font-medium min-w-[2ch] text-center">{item.quantity}</span>

          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded hover:bg-secondary-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={() => onRemove(item.id)}
            className="p-1 rounded hover:bg-red-100 text-red-600 transition-colors ml-auto"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-secondary-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
