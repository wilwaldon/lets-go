import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Instructor } from '../types';
import { logger } from '@/lib/logger';

export function useInstructors() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInstructors() {
      try {
        const { data, error: fetchError } = await supabase
          .from('instructors')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (fetchError) throw fetchError;

        setInstructors(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load instructors';
        logger.error('Failed to fetch instructors', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInstructors();
  }, []);

  return { instructors, isLoading, error };
}
