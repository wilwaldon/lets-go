import React from 'react';

interface DietaryFilterProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const dietaryOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten Free' },
  { value: 'dairy-free', label: 'Dairy Free' },
];

export function DietaryFilter({ selectedFilters, onFilterChange }: DietaryFilterProps) {
  const handleToggle = (value: string) => {
    if (selectedFilters.includes(value)) {
      onFilterChange(selectedFilters.filter((f) => f !== value));
    } else {
      onFilterChange([...selectedFilters, value]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-secondary-200 p-6">
      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Dietary Preferences</h3>

      <div className="space-y-3">
        {dietaryOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selectedFilters.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-secondary-700 group-hover:text-secondary-900">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {selectedFilters.length > 0 && (
        <button
          onClick={() => onFilterChange([])}
          className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
