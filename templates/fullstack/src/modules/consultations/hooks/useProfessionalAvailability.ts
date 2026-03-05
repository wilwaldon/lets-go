import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ProfessionalAvailabilityWindow } from '../types';
import { logger } from '@/lib/logger';

export function useProfessionalAvailability(professionalId?: string) {
  const [availability, setAvailability] = useState<ProfessionalAvailabilityWindow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        setIsLoading(true);

        let query = supabase
          .from('professional_availability')
          .select('*')
          .eq('is_available', true);

        // Filter by professionalId if provided
        if (professionalId) {
          query = query.eq('professional_id', professionalId);
        }

        const { data, error: fetchError } = await query.order('day_of_week');

        if (fetchError) throw fetchError;

        // Map database fields to our interface
        const mappedData: ProfessionalAvailabilityWindow[] = (data || []).map((row) => ({
          id: row.id,
          professionalId: row.professional_id,
          dayOfWeek: row.day_of_week,
          startTime: row.start_time,
          endTime: row.end_time,
          isAvailable: row.is_available,
        }));

        setAvailability(mappedData);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load availability';
        logger.error('Failed to fetch professional availability', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAvailability();
  }, [professionalId]);

  return { availability, isLoading, error };
}
