# Let's Go! — Full-Stack Restaurant Template

A production-ready restaurant website built with Vite, React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Modern Stack**: Vite + React 18 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Email/password with Supabase Auth
- **Menu Management**: Dynamic menu with categories and dietary filters
- **Shopping Cart**: Local storage persistence with real-time updates
- **Payments**: Stripe and Square integration (swappable)
- **Error Handling**: React Error Boundaries with graceful recovery
- **Environment Validation**: Startup validation with helpful error messages
- **Logging**: Centralized logger with analytics tracking hooks
- **Responsive**: Mobile-first design that works on all devices
- **SEO-Friendly**: React Helmet Async for meta tags
- **Accessible**: WCAG AA compliant components

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([sign up free](https://supabase.com))
- Stripe or Square account (optional, for payments)

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Copy `.env.example` to `.env.local` and add your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Payment provider keys
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
# OR
VITE_SQUARE_APPLICATION_ID=your_square_app_id
VITE_SQUARE_LOCATION_ID=your_square_location_id
```

3. **Set up Supabase:**

Install the Supabase CLI:

```bash
npm install -g supabase
```

Link your project:

```bash
supabase link --project-ref your-project-ref
```

Run migrations:

```bash
supabase db reset
```

This creates all tables and applies Row Level Security policies.

4. **Seed sample data (optional):**

```bash
supabase db reset --seed
```

5. **Start development server:**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── ui/              # 12 reusable UI primitives
│   ├── layout/          # Header, Footer, PageWrapper, etc.
│   ├── common/          # Shared components (ErrorBoundary, LoadingScreen, etc.)
│   └── auth/            # Authentication forms
├── modules/
│   ├── menu/            # Menu display, cart, ordering
│   └── payments/        # Stripe + Square providers
├── templates/
│   └── restaurant/      # Restaurant-specific pages
├── config/
│   ├── site.config.ts   # Business info, hours, social
│   └── features.config.ts # Module toggles, payment provider
├── lib/
│   ├── supabase.ts      # Supabase client
│   ├── env.ts           # Environment validation
│   └── logger.ts        # Centralized logging
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── App.tsx              # Root app component
└── main.tsx             # Entry point
```

## Configuration

### Business Information

Edit `src/config/site.config.ts`:

```typescript
export const siteConfig = {
  business: {
    name: 'Your Restaurant Name',
    tagline: 'Your tagline here',
    phone: '(555) 123-4567',
    email: 'hello@yourrestaurant.com',
    address: { ... },
  },
  hours: { ... },
  social: { ... },
  theme: {
    colors: {
      primary: '#f97316',    // Orange-500
      secondary: '#1e293b',  // Slate-800
    },
  },
};
```

### Feature Toggles

Edit `src/config/features.config.ts`:

```typescript
export const featuresConfig = {
  template: 'restaurant',
  modules: {
    menu: true,
    booking: false,        // Future: booking system
    payments: true,
    portal: false,         // Future: customer portal
  },
  paymentProvider: 'stripe', // or 'square'
  auth: {
    providers: ['email'],     // email, google, facebook
    requireEmailVerification: false,
  },
};
```

### Styling

Edit `tailwind.config.ts` to customize colors, fonts, and design tokens:

```typescript
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... },
    },
  },
},
```

### UI Components

The template includes 12 reusable UI components in `src/components/ui/`:

**Button Component** - Supports composition with the `asChild` prop:

```typescript
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

// Regular button
<Button onClick={handleClick}>Click Me</Button>

// Button as Link (composition pattern)
<Button asChild>
  <Link to="/menu">View Menu</Link>
</Button>

// With variants and sizes
<Button variant="outline" size="lg">Large Outline</Button>
<Button variant="ghost" isLoading>Loading...</Button>
```

Available variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`
Available sizes: `sm`, `md`, `lg`

**Other Components:**
- `Card`, `CardHeader`, `CardContent`, `CardFooter` - Card layouts
- `Input`, `Select`, `Textarea` - Form inputs with labels and errors
- `Modal` - Dialog with backdrop and focus trap
- `Toast` / `useToast()` - Toast notifications
- `Badge` - Labels and tags
- `Spinner` - Loading indicators
- `Skeleton` - Loading placeholders
- `Tabs`, `TabList`, `Tab`, `TabPanel` - Tab navigation
- `Avatar` - User avatars with fallback

All components are fully typed, accessible (WCAG AA), and styled with Tailwind CSS.

## Database

### Migrations

Migrations are in `supabase/migrations/`:

- `20240101000000_core.sql` — Profiles and contact submissions
- `20240101000001_menu.sql` — Menu categories, items, and orders

To create a new migration:

```bash
supabase migration new your_migration_name
```

### Row Level Security

All tables have RLS enabled. Policies ensure:

- Menu items are publicly viewable
- Orders belong to authenticated users or guest email
- Profiles are user-owned
- Contact submissions are insert-only for public

### Seeding Data

Edit `supabase/seed.sql` to add sample menu items, categories, etc.

Run seeds with:

```bash
supabase db reset --seed
```

## Payment Setup

### Stripe

1. Get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Add to `.env.local`:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
3. Add server secret to Supabase:
   ```bash
   supabase secrets set STRIPE_SECRET_KEY=sk_test_...
   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
   ```
4. Set `paymentProvider: 'stripe'` in `features.config.ts`
5. Deploy Edge Functions:
   ```bash
   supabase functions deploy create-checkout
   supabase functions deploy webhook-handler
   ```

### Square

1. Get credentials from [Square Developer Dashboard](https://developer.squareup.com/)
2. Add to `.env.local`:
   ```
   VITE_SQUARE_APPLICATION_ID=sq0idp-...
   VITE_SQUARE_LOCATION_ID=L...
   ```
3. Add server token to Supabase:
   ```bash
   supabase secrets set SQUARE_ACCESS_TOKEN=EAAAl...
   ```
4. Set `paymentProvider: 'square'` in `features.config.ts`
5. Deploy Edge Functions (same as Stripe)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the project:

```bash
npm run build
```

Deploy the `dist/` folder to any static hosting (Netlify, Cloudflare Pages, etc.).

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier
- `npm run type-check` — Check TypeScript types

## Architecture

### Type Safety

Full TypeScript coverage with strict mode. No `any` types (except documented exceptions).

### State Management

- **Auth**: React Context (`AuthContext`)
- **Cart**: Custom hook with localStorage (`useCart`)
- **Server State**: Direct Supabase queries (consider React Query for caching)

### Payment Abstraction

Payment providers implement a common interface:

```typescript
interface PaymentProvider {
  name: 'stripe' | 'square';
  createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession>;
}
```

Swap providers by changing `features.config.ts`.

### Module System

Modules are self-contained in `src/modules/`:

- `menu/` — Menu display, cart, ordering
- `payments/` — Payment provider abstraction

Future modules (booking, portal) follow the same pattern.

## Error Handling & Logging

### Error Boundaries

The app uses React Error Boundaries to catch rendering errors:

```typescript
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

Features:
- Catches all React rendering errors in child components
- Shows user-friendly error UI with recovery options
- Displays detailed error messages in development mode
- Logs errors to centralized logger
- Provides "Try Again" and "Go Home" actions

The root `App.tsx` is wrapped in an ErrorBoundary to catch all application errors.

### Environment Validation

Environment variables are validated on app startup:

```typescript
import { env } from '@/lib/env';

// Type-safe access
const supabaseUrl = env.get('VITE_SUPABASE_URL');

// Check if optional var exists
if (env.has('VITE_STRIPE_PUBLISHABLE_KEY')) {
  // Use Stripe
}
```

Features:
- Validates required environment variables on startup
- Shows helpful error screen in dev mode with fix instructions
- Validates URL formats
- Type-safe environment variable access
- Prevents app from starting with missing configuration

If environment variables are missing, you'll see a helpful error screen:

```
⚠️ Configuration Error

Missing or invalid environment variables:
• VITE_SUPABASE_URL is required but not set

To fix this:
1. Copy .env.example to .env.local
2. Add your Supabase credentials
3. Restart the dev server
```

### Centralized Logging

Use the logger for consistent logging across the app:

```typescript
import { logger } from '@/lib/logger';

// Log errors with context
logger.error('Payment failed', error, { userId, orderId });

// Log warnings
logger.warn('Using deprecated API');

// Track analytics events
logger.track('button_clicked', { buttonId, page });

// Log performance metrics
logger.performance('api_call', duration, { endpoint });

// Measure async operations
const result = await logger.measure('fetchMenu', async () => {
  return await fetch('/api/menu');
});
```

Features:
- Centralized logging across the entire application
- Different log levels: error, warn, info, debug
- Analytics tracking hooks
- Performance measurement utilities
- Ready for integration with Sentry, LogRocket, DataDog
- Global error handlers for unhandled rejections

In production, uncomment the service integration in `src/lib/logger.ts`:

```typescript
// Example: Sentry integration
// Sentry.captureException(error, {
//   level: 'error',
//   extra: { message, ...context },
// });
```

### Loading States

Use the provided loading components for consistent UX:

```typescript
import { LoadingScreen, LoadingSection, LoadingEmpty } from '@/components/common/LoadingScreen';

// Full-screen loading
<LoadingScreen message="Loading your order..." />

// Section loading
<LoadingSection message="Loading menu..." />

// Empty state loading
<LoadingEmpty message="Loading content..." />
```

## Customization

### Hero Background Images

The template automatically detects and displays hero background images on all pages. Just add images to `/public/images/` and they'll appear automatically!

**Naming Convention:**
```
hero-{pageName}.{extension}
```

**Examples:**
- `hero-home.jpg` → Home page
- `hero-menu.webp` → Menu page
- `hero-about.jpg` → About page
- `hero-contact.jpg` → Contact page

**Supported Formats** (in order of preference):
1. `.webp` - Best performance (recommended)
2. `.avif` - Excellent quality
3. `.jpg` / `.jpeg` - Universal compatibility
4. `.png` - Use only if transparency needed

**Image Requirements:**
- **Minimum Size**: 1920x800px (landscape)
- **Aspect Ratio**: 21:9 or 16:9 recommended
- **File Size**: Keep under 500KB for performance
- **Composition**: Choose images with good contrast for text overlay

**What Happens Automatically:**
- ✅ Background image displays full-bleed
- ✅ 80% dark overlay applied for text readability
- ✅ Text automatically turns white
- ✅ Responsive on all devices
- ✅ No code changes needed!

**Pro Tips:**
- Add multiple formats (`.webp` + `.jpg`) for best browser compatibility
- Use image optimization tools like [TinyJPG](https://tinyjpg.com) or [Squoosh](https://squoosh.app)
- If no image exists, the page displays with a clean white background
- See `/public/images/README.md` for detailed documentation

### Adding a New Page

1. Create page component in `src/templates/restaurant/pages/`
2. Add route in `src/templates/restaurant/routes.tsx`
3. Add navigation link in `Header.tsx` and `Footer.tsx`

### Adding Menu Items

1. Go to Supabase dashboard → Table Editor
2. Add categories to `menu_categories`
3. Add items to `menu_items` (link to category)

Or use SQL:

```sql
INSERT INTO menu_categories (name, description, display_order)
VALUES ('Appetizers', 'Start your meal right', 0);

INSERT INTO menu_items (category_id, name, description, price, dietary_tags)
VALUES (
  (SELECT id FROM menu_categories WHERE name = 'Appetizers'),
  'Bruschetta',
  'Toasted bread with tomato and basil',
  8.99,
  ARRAY['vegetarian']
);
```

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
    // ... other shades
  },
},
```

## Troubleshooting

### Build Errors

1. Clear node_modules: `rm -rf node_modules && npm install`
2. Check TypeScript: `npm run type-check`
3. Clear Vite cache: `rm -rf node_modules/.vite`

### Environment Configuration Errors

If you see an environment configuration error on startup:

1. Ensure `.env.local` exists (copy from `.env.example`)
2. Verify all required variables are set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Check URL format (must start with `https://`)
4. Restart the dev server after changes

The environment validator will show exactly which variables are missing or invalid.

### Supabase Connection Issues

1. Verify `.env.local` has correct URL and anon key
2. Check Supabase dashboard is accessible
3. Ensure RLS policies allow your operations
4. Check browser console for specific error messages

### Payment Not Working

1. Check Edge Functions are deployed: `supabase functions list`
2. Verify secrets are set: `supabase secrets list`
3. Check browser console for errors
4. Test with Stripe/Square test cards

## Support

- **Documentation**: See `docs/` folder
- **Issues**: [GitHub Issues](https://github.com/your-org/lets-go)
- **Community**: [Discord](https://discord.gg/your-server)

## License

MIT License — see LICENSE file for details.
