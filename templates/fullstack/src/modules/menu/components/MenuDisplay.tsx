import React from 'react';
import { MenuCategory } from './MenuCategory';
import { SkeletonCard } from '@/components/ui/Skeleton';
import type { MenuCategory as MenuCategoryType } from '@/types';

interface MenuDisplayProps {
  categories: MenuCategoryType[];
  isLoading: boolean;
  error: Error | null;
  dietaryFilter?: string[];
  onAddToCart: (itemId: string) => void;
}

export function MenuDisplay({
  categories,
  isLoading,
  error,
  dietaryFilter = [],
  onAddToCart,
}: MenuDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 w-48 bg-secondary-200 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((j) => (
                <SkeletonCard key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-2">Failed to load menu</p>
        <p className="text-sm text-secondary-600">{error.message}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-600">No menu items available at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <MenuCategory
          key={category.id}
          category={category}
          dietaryFilter={dietaryFilter}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
