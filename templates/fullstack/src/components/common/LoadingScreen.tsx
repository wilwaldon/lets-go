import { Spinner } from '@/components/ui/Spinner';

interface LoadingScreenProps {
  message?: string;
}

/**
 * Full-screen loading overlay
 * Used for page-level loading states
 */
export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-secondary-600">{message}</p>
      </div>
    </div>
  );
}

/**
 * Inline loading state for sections
 */
export function LoadingSection({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="py-12 text-center">
      <Spinner size="md" />
      <p className="mt-4 text-secondary-600">{message}</p>
    </div>
  );
}

/**
 * Loading state for empty states
 */
export function LoadingEmpty({ message = 'Loading content...' }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Spinner size="md" className="mb-4" />
      <p className="text-secondary-600">{message}</p>
    </div>
  );
}
