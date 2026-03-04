import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Professional } from '../types';
import { logger } from '@/lib/logger';

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        const { data, error: fetchError } = await supabase
          .from('professionals')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (fetchError) throw fetchError;

        setProfessionals(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load professionals';
        logger.error('Failed to fetch professionals', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfessionals();
  }, []);

  return { professionals, isLoading, error };
}
