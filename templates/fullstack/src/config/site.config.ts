import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  business: {
    name: 'The Local Kitchen',
    tagline: 'Fresh, Local, Delicious',
    phone: '(555) 123-4567',
    email: 'hello@localkitchen.com',
    address: {
      street: '123 Main Street',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
    },
  },
  hours: {
    monday: { open: '11:00', close: '22:00' },
    tuesday: { open: '11:00', close: '22:00' },
    wednesday: { open: '11:00', close: '22:00' },
    thursday: { open: '11:00', close: '22:00' },
    friday: { open: '11:00', close: '23:00' },
    saturday: { open: '10:00', close: '23:00' },
    sunday: { open: '10:00', close: '21:00' },
  },
  social: {
    instagram: 'https://instagram.com/localkitchen',
    facebook: 'https://facebook.com/localkitchen',
    twitter: 'https://twitter.com/localkitchen',
  },
  theme: {
    colors: {
      primary: '#f97316', // Orange-500
      secondary: '#1e293b', // Slate-800
    },
    fonts: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif',
    },
  },
};
