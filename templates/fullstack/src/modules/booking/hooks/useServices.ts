import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Service } from '../types';
import { logger } from '@/lib/logger';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error: fetchError } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (fetchError) throw fetchError;

        setServices(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load services';
        logger.error('Failed to fetch services', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, isLoading, error };
}
