# Let's Go! — Full-Stack Restaurant Template

A production-ready restaurant website built with Vite, React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Modern Stack**: Vite + React 18 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Email/password with Supabase Auth
- **Menu Management**: Dynamic menu with categories and dietary filters
- **Shopping Cart**: Local storage persistence with real-time updates
- **Payments**: Stripe and Square integration (swappable)
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
│   ├── common/          # Shared business components
│   └── auth/            # Authentication forms
├── modules/
│   ├── menu/            # Menu display, cart, ordering
│   └── payments/        # Stripe + Square providers
├── templates/
│   └── restaurant/      # Restaurant-specific pages
├── config/
│   ├── site.config.ts   # Business info, hours, social
│   └── features.config.ts # Module toggles, payment provider
├── lib/                 # Supabase client
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

## Customization

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

### Supabase Connection Issues

1. Verify `.env.local` has correct URL and anon key
2. Check Supabase dashboard is accessible
3. Ensure RLS policies allow your operations

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
