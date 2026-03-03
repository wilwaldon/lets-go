import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';

interface TeamCardProps {
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  className?: string;
}

export function TeamCard({ name, title, bio, imageUrl, className = '' }: TeamCardProps) {
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}>
      <CardContent className="py-6 flex flex-col items-center text-center">
        <Avatar src={imageUrl} fallback={name} size="xl" className="mb-4" />

        <h3 className="text-xl font-semibold text-secondary-900 mb-1">{name}</h3>
        <p className="text-sm font-medium text-primary-600 mb-3">{title}</p>

        {bio && <p className="text-secondary-600" style={{ lineHeight: '1.7' }}>{bio}</p>}
      </CardContent>
    </Card>
  );
}
