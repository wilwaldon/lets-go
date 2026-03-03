import type { FeaturesConfig } from '@/types';

export const featuresConfig: FeaturesConfig = {
  template: 'restaurant',
  modules: {
    menu: true,
    booking: false,
    payments: true,
    portal: false,
  },
  paymentProvider: 'stripe',
  auth: {
    providers: ['email'],
    requireEmailVerification: false,
  },
};
