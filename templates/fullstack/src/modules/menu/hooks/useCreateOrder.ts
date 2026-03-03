import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { logger } from '@/lib/logger';
import type { CartItem, OrderItem } from '@/types';

interface CreateOrderParams {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  guestEmail?: string;
}

interface UseCreateOrderReturn {
  createOrder: (params: CreateOrderParams) => Promise<string>;
  isLoading: boolean;
  error: Error | null;
}

export function useCreateOrder(): UseCreateOrderReturn {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrder = async ({
    items,
    subtotal,
    tax,
    total,
    guestEmail,
  }: CreateOrderParams): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);

      // Transform cart items to order items
      const orderItems: OrderItem[] = items.map((item) => ({
        menu_item_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      // Create order
      const { data, error: insertError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id || null,
            guest_email: !user ? guestEmail : null,
            items: orderItems,
            subtotal,
            tax,
            total,
            status: 'pending',
          },
        ])
        .select('id')
        .single();

      if (insertError) throw insertError;
      if (!data) throw new Error('Failed to create order');

      logger.track('order_created', {
        orderId: data.id,
        itemCount: items.length,
        total,
      });

      return data.id;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Failed to create order');
      logger.error('Order creation failed', errorObj, {
        itemCount: items.length,
        total,
      });
      setError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading, error };
}
