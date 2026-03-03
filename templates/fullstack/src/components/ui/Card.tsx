import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const variantStyles = {
  default: 'bg-white border border-secondary-200',
  outlined: 'bg-transparent border-2 border-secondary-300',
  elevated: 'bg-white shadow-lg',
};

export function Card({ children, variant = 'default', className = '', ...props }: CardProps) {
  return (
    <div
      className={`
        rounded-lg overflow-hidden
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`px-6 py-4 border-b border-secondary-200 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={`px-6 py-4 border-t border-secondary-200 bg-secondary-50 ${className}`} {...props}>
      {children}
    </div>
  );
}
