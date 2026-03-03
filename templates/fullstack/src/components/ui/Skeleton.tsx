
export type SkeletonVariant = 'line' | 'circle' | 'rectangle';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
}

const variantStyles: Record<SkeletonVariant, string> = {
  line: 'h-4 rounded',
  circle: 'rounded-full',
  rectangle: 'rounded-lg',
};

export function Skeleton({
  variant = 'line',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const customStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      className={`
        bg-secondary-200 animate-pulse
        ${variantStyles[variant]}
        ${className}
      `}
      style={customStyle}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? '80%' : '100%'} />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton variant="rectangle" height={200} />
      <Skeleton width="60%" />
      <SkeletonText lines={2} />
    </div>
  );
}
