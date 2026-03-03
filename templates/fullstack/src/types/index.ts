// Core auth types
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  user: User;
}

// Menu types
export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  dietary_tags: string[];
  is_available: boolean;
  display_order: number;
  created_at: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  display_order: number;
  created_at: string;
  items?: MenuItem[];
}

// Cart types
export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

// Order types
export interface OrderItem {
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  user_id?: string;
  guest_email?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_id?: string;
  payment_provider?: 'stripe' | 'square';
  created_at: string;
  updated_at: string;
}

// Payment types
export type PaymentProviderType = 'stripe' | 'square';

export interface CheckoutParams {
  amount: number;
  orderId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSession {
  url: string;
  sessionId: string;
}

export interface PaymentProvider {
  name: PaymentProviderType;
  createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession>;
}

// Contact form types
export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Config types
export interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
  } | null;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

export interface SiteTheme {
  colors: ThemeColors;
  fonts: ThemeFonts;
}

export interface SiteConfig {
  business: BusinessInfo;
  hours: BusinessHours;
  social: SocialLinks;
  theme: SiteTheme;
}

export interface FeaturesConfig {
  template: 'restaurant' | 'salon' | 'fitness' | 'professional';
  modules: {
    menu: boolean;
    booking: boolean;
    payments: boolean;
    portal: boolean;
  };
  paymentProvider?: PaymentProviderType;
  auth: {
    providers: ('email' | 'google' | 'facebook')[];
    requireEmailVerification: boolean;
  };
}
