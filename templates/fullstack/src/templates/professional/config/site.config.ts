import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  business: {
    name: 'Anderson & Chen Law Firm',
    tagline: 'Trusted Legal Counsel Since 1998',
    phone: '(555) 123-4567',
    email: 'info@andersonchen.com',
    address: {
      street: '1200 Market Street, Suite 2500',
      city: 'Portland',
      state: 'OR',
      zip: '97204',
    },
  },
  hours: {
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '00:00', close: '00:00' }, // Closed
    sunday: { open: '00:00', close: '00:00' }, // Closed
  },
  social: {
    instagram: 'https://instagram.com/andersonchenlawfirm',
    facebook: 'https://facebook.com/andersonchenlawfirm',
    twitter: 'https://twitter.com/andersonchenlawfirm',
  },
  theme: {
    colors: {
      primary: '#1e40af', // Blue-800
      secondary: '#1e293b', // Slate-800
    },
    fonts: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif',
    },
  },
};
