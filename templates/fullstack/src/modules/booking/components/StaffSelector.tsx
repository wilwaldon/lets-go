import { useStaff } from '../hooks/useStaff';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface StaffSelectorProps {
  selectedStaffId: string;
  onStaffChange: (staffId: string) => void;
}

export function StaffSelector({ selectedStaffId, onStaffChange }: StaffSelectorProps) {
  const { staff, isLoading, error } = useStaff();

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

  return (
    <div>
      <label htmlFor="staff" className="block text-sm font-medium text-secondary-900 mb-2">
        Select Stylist
      </label>
      <select
        id="staff"
        value={selectedStaffId}
        onChange={(e) => onStaffChange(e.target.value)}
        className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        required
      >
        <option value="">Choose a stylist...</option>
        <option value="any">No Preference (First Available)</option>
        {staff.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name} - {member.title}
          </option>
        ))}
      </select>
    </div>
  );
}
