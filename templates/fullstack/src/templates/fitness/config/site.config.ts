import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  business: {
    name: 'Peak Performance Gym',
    tagline: 'Transform Your Body, Transform Your Life',
    phone: '(555) 345-6789',
    email: 'hello@peakperformancegym.com',
    address: {
      street: '789 Fitness Boulevard',
      city: 'Portland',
      state: 'OR',
      zip: '97203',
    },
  },
  hours: {
    monday: { open: '05:00', close: '23:00' },
    tuesday: { open: '05:00', close: '23:00' },
    wednesday: { open: '05:00', close: '23:00' },
    thursday: { open: '05:00', close: '23:00' },
    friday: { open: '05:00', close: '23:00' },
    saturday: { open: '07:00', close: '21:00' },
    sunday: { open: '07:00', close: '21:00' },
  },
  social: {
    instagram: 'https://instagram.com/peakperformancegym',
    facebook: 'https://facebook.com/peakperformancegym',
    twitter: 'https://twitter.com/peakperformancegym',
  },
  theme: {
    colors: {
      primary: '#10b981', // Emerald-500
      secondary: '#1e293b', // Slate-800
    },
    fonts: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif',
    },
  },
};
