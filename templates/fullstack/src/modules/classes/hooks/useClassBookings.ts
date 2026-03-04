import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ClassBooking, BookingFormData } from '../types';
import { logger } from '@/lib/logger';

export function useClassBookings(userId?: string) {
  const [bookings, setBookings] = useState<ClassBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    async function fetchBookings() {
      try {
        const { data, error: fetchError } = await supabase
          .from('class_bookings')
          .select('*')
          .eq('user_id', userId)
          .order('booking_date', { ascending: false });

        if (fetchError) throw fetchError;

        setBookings(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load bookings';
        logger.error('Failed to fetch class bookings', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [userId]);

  const createBooking = async (data: BookingFormData): Promise<ClassBooking | null> => {
    try {
      if (!userId) {
        throw new Error('User must be logged in to book classes');
      }

      const { data: booking, error: createError } = await supabase
        .from('class_bookings')
        .insert([
          {
            user_id: userId,
            class_session_id: data.classSessionId,
            booking_date: data.bookingDate,
            status: 'confirmed',
          },
        ])
        .select()
        .single();

      if (createError) throw createError;

      // Refresh bookings list
      setBookings((prev) => [booking, ...prev]);

      return booking;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create booking';
      logger.error('Failed to create class booking', err);
      setError(message);
      return null;
    }
  };

  const cancelBooking = async (bookingId: string, reason?: string): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from('class_bookings')
        .update({
          status: 'cancelled',
          cancellation_reason: reason,
          cancelled_at: new Date().toISOString(),
        })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      // Update local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: 'cancelled',
                cancellation_reason: reason,
                cancelled_at: new Date().toISOString(),
              }
            : booking
        )
      );

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel booking';
      logger.error('Failed to cancel class booking', err);
      setError(message);
      return false;
    }
  };

  return {
    bookings,
    isLoading,
    error,
    createBooking,
    cancelBooking,
  };
}
