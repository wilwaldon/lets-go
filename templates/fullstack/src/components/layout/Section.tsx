
interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'light';
  spacing?: 'default' | 'tight' | 'loose';
  className?: string;
}

const variantStyles = {
  default: 'bg-white',
  primary: 'bg-primary-50',
  secondary: 'bg-secondary-50',
  light: 'bg-secondary-100',
};

const spacingStyles = {
  default: 'py-16 md:py-24',
  tight: 'py-8 md:py-12',
  loose: 'py-24 md:py-32',
};

export function Section({
  children,
  variant = 'default',
  spacing = 'default',
  className = '',
}: SectionProps) {
  return (
    <section className={`${variantStyles[variant]} ${spacingStyles[spacing]} ${className}`}>
      {children}
    </section>
  );
}
