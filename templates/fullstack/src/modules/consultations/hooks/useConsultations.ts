import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Consultation, ConsultationFormData } from '../types';
import { logger } from '@/lib/logger';

export function useConsultations(userId?: string) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    async function fetchConsultations() {
      try {
        const { data, error: fetchError } = await supabase
          .from('consultations')
          .select('*')
          .eq('user_id', userId)
          .order('consultation_date', { ascending: false });

        if (fetchError) throw fetchError;

        setConsultations(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load consultations';
        logger.error('Failed to fetch consultations', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchConsultations();
  }, [userId]);

  const createConsultation = async (data: ConsultationFormData): Promise<Consultation | null> => {
    try {
      if (!userId) {
        throw new Error('User must be logged in to book consultations');
      }

      const { data: consultation, error: createError } = await supabase
        .from('consultations')
        .insert([
          {
            user_id: userId,
            professional_id: data.professionalId,
            service_area_id: data.serviceAreaId,
            consultation_date: data.date,
            consultation_time: data.time,
            meeting_type: data.meetingType,
            notes: data.notes,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (createError) throw createError;

      // Refresh consultations list
      setConsultations((prev) => [consultation, ...prev]);

      return consultation;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create consultation';
      logger.error('Failed to create consultation', err);
      setError(message);
      return null;
    }
  };

  const cancelConsultation = async (consultationId: string, reason?: string): Promise<boolean> => {
    try {
      const { error: updateError } = await supabase
        .from('consultations')
        .update({
          status: 'cancelled',
          cancellation_reason: reason,
          cancelled_at: new Date().toISOString(),
        })
        .eq('id', consultationId);

      if (updateError) throw updateError;

      // Update local state
      setConsultations((prev) =>
        prev.map((consultation) =>
          consultation.id === consultationId
            ? {
                ...consultation,
                status: 'cancelled',
                cancellation_reason: reason,
                cancelled_at: new Date().toISOString(),
              }
            : consultation
        )
      );

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel consultation';
      logger.error('Failed to cancel consultation', err);
      setError(message);
      return false;
    }
  };

  return {
    consultations,
    isLoading,
    error,
    createConsultation,
    cancelConsultation,
  };
}
