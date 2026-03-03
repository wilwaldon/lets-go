import React from 'react';
import { Clock } from 'lucide-react';
import { siteConfig } from '@/config/site.config';

export function BusinessHours() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });

  return (
    <div className="bg-white rounded-lg border border-secondary-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-primary-600" size={24} />
        <h3 className="text-xl font-semibold text-secondary-900">Hours</h3>
      </div>

      <div className="space-y-2">
        {Object.entries(siteConfig.hours).map(([day, hours]) => {
          const isToday = day === today;

          return (
            <div
              key={day}
              className={`flex justify-between py-2 ${
                isToday ? 'bg-primary-50 -mx-2 px-2 rounded font-semibold' : ''
              }`}
            >
              <span className={`capitalize ${isToday ? 'text-primary-600' : 'text-secondary-700'}`}>
                {day}
              </span>
              <span className={isToday ? 'text-primary-600' : 'text-secondary-600'}>
                {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
