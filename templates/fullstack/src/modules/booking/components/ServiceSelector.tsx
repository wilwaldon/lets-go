import { useServices } from '../hooks/useServices';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Service } from '../types';

interface ServiceSelectorProps {
  selectedServiceId: string;
  onServiceChange: (serviceId: string, service: Service | undefined) => void;
}

export function ServiceSelector({ selectedServiceId, onServiceChange }: ServiceSelectorProps) {
  const { services, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    const category = service.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const handleChange = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    onServiceChange(serviceId, service);
  };

  return (
    <div>
      <label htmlFor="service" className="block text-sm font-medium text-secondary-900 mb-2">
        Select Service
      </label>
      <select
        id="service"
        value={selectedServiceId}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        required
      >
        <option value="">Choose a service...</option>
        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
          <optgroup key={category} label={category}>
            {categoryServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price.toFixed(2)} ({service.duration} min)
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
