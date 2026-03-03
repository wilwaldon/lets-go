import { MenuItem } from './MenuItem';
import type { MenuCategory as MenuCategoryType } from '@/types';

interface MenuCategoryProps {
  category: MenuCategoryType;
  dietaryFilter?: string[];
  onAddToCart: (itemId: string) => void;
}

export function MenuCategory({ category, dietaryFilter = [], onAddToCart }: MenuCategoryProps) {
  const filteredItems = category.items?.filter((item) => {
    if (dietaryFilter.length === 0) return true;
    return dietaryFilter.some((filter) => item.dietary_tags.includes(filter));
  });

  if (!filteredItems || filteredItems.length === 0) {
    return null;
  }

  return (
    <section id={`category-${category.id}`}>
      <div className="mb-6">
        <h2
          className="text-3xl font-bold text-secondary-900 mb-2"
          style={{ letterSpacing: '-0.02em' }}
        >
          {category.name}
        </h2>
        {category.description && (
          <p className="text-secondary-600" style={{ lineHeight: '1.7' }}>
            {category.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
