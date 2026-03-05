import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { AvailabilityWindow } from '../types';
import { logger } from '@/lib/logger';

export function useAvailability(staffId?: string) {
  const [availability, setAvailability] = useState<AvailabilityWindow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        setIsLoading(true);

        let query = supabase
          .from('staff_availability')
          .select('*')
          .eq('is_available', true);

        // Filter by staffId if provided
        if (staffId) {
          query = query.eq('staff_id', staffId);
        }

        const { data, error: fetchError } = await query.order('day_of_week');

        if (fetchError) throw fetchError;

        // Map database fields to our interface
        const mappedData: AvailabilityWindow[] = (data || []).map((row) => ({
          id: row.id,
          staffId: row.staff_id,
          dayOfWeek: row.day_of_week,
          startTime: row.start_time,
          endTime: row.end_time,
          isAvailable: row.is_available,
        }));

        setAvailability(mappedData);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load availability';
        logger.error('Failed to fetch staff availability', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAvailability();
  }, [staffId]);

  return { availability, isLoading, error };
}
