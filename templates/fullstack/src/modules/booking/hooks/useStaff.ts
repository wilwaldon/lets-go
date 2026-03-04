import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { StaffMember } from '../types';
import { logger } from '@/lib/logger';

export function useStaff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStaff() {
      try {
        const { data, error: fetchError } = await supabase
          .from('staff_members')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (fetchError) throw fetchError;

        setStaff(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load staff';
        logger.error('Failed to fetch staff', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStaff();
  }, []);

  return { staff, isLoading, error };
}
