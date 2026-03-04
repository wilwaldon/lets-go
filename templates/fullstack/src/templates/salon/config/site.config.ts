import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  business: {
    name: 'Luxe Hair Studio',
    tagline: 'Where Style Meets Expertise',
    phone: '(555) 234-5678',
    email: 'hello@luxehairstudio.com',
    address: {
      street: '456 Fashion Avenue',
      city: 'Portland',
      state: 'OR',
      zip: '97202',
    },
  },
  hours: {
    monday: { open: '09:00', close: '18:00' },
    tuesday: { open: '09:00', close: '18:00' },
    wednesday: { open: '09:00', close: '18:00' },
    thursday: { open: '09:00', close: '18:00' },
    friday: { open: '09:00', close: '18:00' },
    saturday: { open: '09:00', close: '17:00' },
    sunday: { open: '00:00', close: '00:00' }, // Closed
  },
  social: {
    instagram: 'https://instagram.com/luxehairstudio',
    facebook: 'https://facebook.com/luxehairstudio',
    twitter: 'https://twitter.com/luxehairstudio',
  },
  theme: {
    colors: {
      primary: '#ec4899', // Pink-500
      secondary: '#1e293b', // Slate-800
    },
    fonts: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif',
    },
  },
};
