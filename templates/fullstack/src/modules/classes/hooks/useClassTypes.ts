import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ClassType } from '../types';
import { logger } from '@/lib/logger';

export function useClassTypes() {
  const [classTypes, setClassTypes] = useState<ClassType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClassTypes() {
      try {
        const { data, error: fetchError } = await supabase
          .from('class_types')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (fetchError) throw fetchError;

        setClassTypes(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load class types';
        logger.error('Failed to fetch class types', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchClassTypes();
  }, []);

  return { classTypes, isLoading, error };
}
