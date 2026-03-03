
interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
}

const sizeStyles = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-screen-2xl',
};

export function Container({ children, size = 'default', className = '' }: ContainerProps) {
  return (
    <div className={`${sizeStyles[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
