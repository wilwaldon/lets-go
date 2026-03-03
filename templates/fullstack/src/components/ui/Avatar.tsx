import { useState } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type StatusDot = 'online' | 'offline' | 'busy' | null;

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  status?: StatusDot;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
};

const statusStyles: Record<Exclude<StatusDot, null>, string> = {
  online: 'bg-green-500',
  offline: 'bg-secondary-400',
  busy: 'bg-red-500',
};

const statusSizeStyles: Record<AvatarSize, string> = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-4 w-4',
};

export function Avatar({
  src,
  alt = '',
  fallback,
  size = 'md',
  status,
  className = '',
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !src || imageError;
  const initials = fallback
    ? fallback
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`
          ${sizeStyles[size]}
          rounded-full overflow-hidden
          bg-secondary-200
          flex items-center justify-center
          font-medium text-secondary-600
        `}
      >
        {showFallback ? (
          <span>{initials}</span>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            ${statusSizeStyles[size]}
            ${statusStyles[status]}
            rounded-full
            border-2 border-white
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
