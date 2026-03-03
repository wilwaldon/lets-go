import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

interface TestimonialCardProps {
  quote: string;
  author: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({ quote, author, rating, className = '' }: TestimonialCardProps) {
  return (
    <Card className={className}>
      <CardContent className="py-6">
        {rating && (
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < rating ? 'fill-primary-500 text-primary-500' : 'text-secondary-300'}
              />
            ))}
          </div>
        )}

        <blockquote className="text-secondary-700 mb-4" style={{ lineHeight: '1.7' }}>
          "{quote}"
        </blockquote>

        <cite className="not-italic text-sm font-semibold text-secondary-900">{author}</cite>
      </CardContent>
    </Card>
  );
}
