import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { MenuCategory, MenuItem } from '@/types';

interface UseMenuReturn {
  categories: MenuCategory[];
  items: MenuItem[];
  isLoading: boolean;
  error: Error | null;
}

export function useMenu(): UseMenuReturn {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('menu_categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (categoriesError) throw categoriesError;

        // Fetch items
        const { data: itemsData, error: itemsError } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true)
          .order('display_order', { ascending: true });

        if (itemsError) throw itemsError;

        // Group items by category
        const categoriesWithItems = (categoriesData || []).map((category) => ({
          ...category,
          items: (itemsData || []).filter((item) => item.category_id === category.id),
        }));

        setCategories(categoriesWithItems);
        setItems(itemsData || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch menu'));
        console.error('Error fetching menu:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return { categories, items, isLoading, error };
}
