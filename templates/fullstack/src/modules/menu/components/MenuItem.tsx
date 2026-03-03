import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { MenuItem as MenuItemType } from '@/types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (itemId: string) => void;
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {item.image_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardContent className="flex-1 flex flex-col p-6">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-secondary-900">{item.name}</h3>
            <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
              ${item.price.toFixed(2)}
            </span>
          </div>

          {item.description && (
            <p
              className="text-sm text-secondary-600 mb-4"
              style={{ lineHeight: '1.7' }}
            >
              {item.description}
            </p>
          )}

          {item.dietary_tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.dietary_tags.map((tag) => (
                <Badge key={tag} size="sm" variant="success">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={() => onAddToCart(item.id)}
          disabled={!item.is_available}
          className="w-full"
          size="sm"
        >
          <Plus size={16} className="mr-1" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
