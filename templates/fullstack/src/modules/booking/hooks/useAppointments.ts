import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Appointment, BookingFormData } from '../types';
import { logger } from '@/lib/logger';

export function useAppointments(customerId?: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) {
      setIsLoading(false);
      return;
    }

    async function fetchAppointments() {
      try {
        const { data, error: fetchError } = await supabase
          .from('appointments')
          .select('*')
          .eq('customer_id', customerId)
          .order('appointment_date', { ascending: false });

        if (fetchError) throw fetchError;

        setAppointments(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load appointments';
        logger.error('Failed to fetch appointments', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAppointments();
  }, [customerId]);

  const createAppointment = async (data: BookingFormData): Promise<Appointment | null> => {
    try {
      if (!customerId) {
        throw new Error('User must be logged in to book appointments');
      }

      const { data: appointment, error: createError } = await supabase
        .from('appointments')
        .insert([
          {
            customer_id: customerId,
            service_id: data.serviceId,
            staff_id: data.staffId,
            appointment_date: data.date,
            appointment_time: data.time,
            notes: data.notes,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (createError) throw createError;

      // Refresh appointments list
      setAppointments((prev) => [appointment, ...prev]);

      return appointment;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create appointment';
      logger.error('Failed to create appointment', err);
      setError(message);
      return null;
    }
  };

  const cancelAppointment = async (appointmentId: string, reason?: string): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from('appointments')
        .update({
          status: 'cancelled',
          cancellation_reason: reason,
          cancelled_at: new Date().toISOString(),
        })
        .eq('id', appointmentId);

      if (updateError) throw updateError;

      // Update local state
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? {
                ...apt,
                status: 'cancelled',
                cancellation_reason: reason,
                cancelled_at: new Date().toISOString(),
              }
            : apt
        )
      );

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel appointment';
      logger.error('Failed to cancel appointment', err);
      setError(message);
      return false;
    }
  };

  return {
    appointments,
    isLoading,
    error,
    createAppointment,
    cancelAppointment,
  };
}
