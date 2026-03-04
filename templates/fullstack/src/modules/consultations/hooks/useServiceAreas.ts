import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ServiceArea } from '../types';
import { logger } from '@/lib/logger';

export function useServiceAreas() {
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServiceAreas() {
      try {
        const { data, error: fetchError } = await supabase
          .from('service_areas')
          .select('*')
          .order('display_order');

        if (fetchError) throw fetchError;

        setServiceAreas(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load service areas';
        logger.error('Failed to fetch service areas', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServiceAreas();
  }, []);

  return { serviceAreas, isLoading, error };
}
