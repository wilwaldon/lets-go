# Full Stack (Vite + React + TypeScript)

## Project Structure

```
lets-go/
├── packages/
│   ├── cli/                          # The npx create-lets-go-app CLI tool
│   │   ├── src/
│   │   │   ├── index.ts              # Entry point
│   │   │   ├── prompts.ts            # Interactive prompts (inquirer)
│   │   │   ├── scaffold.ts           # File generation logic
│   │   │   └── templates.ts          # Template registry
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── core/                         # The generated project template
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/               # Shared UI primitives (Button, Card, Input, Modal, etc.)
│       │   │   ├── layout/           # Header, Footer, Sidebar, PageWrapper
│       │   │   └── common/           # ContactForm, SEOHead, MapEmbed, SocialLinks
│       │   │
│       │   ├── modules/              # Pluggable feature modules
│       │   │   ├── booking/          # Appointment/class booking system
│       │   │   │   ├── components/
│       │   │   │   ├── hooks/
│       │   │   │   ├── types.ts
│       │   │   │   └── index.ts
│       │   │   ├── menu/             # Menu display + online ordering
│       │   │   │   ├── components/
│       │   │   │   ├── hooks/
│       │   │   │   ├── types.ts
│       │   │   │   └── index.ts
│       │   │   ├── payments/         # Stripe + Square abstraction
│       │   │   │   ├── providers/
│       │   │   │   │   ├── stripe.ts
│       │   │   │   │   └── square.ts
│       │   │   │   ├── components/
│       │   │   │   ├── hooks/
│       │   │   │   ├── types.ts
│       │   │   │   └── index.ts
│       │   │   └── portal/           # Client portal (login, dashboard, history)
│       │   │       ├── components/
│       │   │       ├── hooks/
│       │   │       ├── types.ts
│       │   │       └── index.ts
│       │   │
│       │   ├── templates/            # Business-type page configurations
│       │   │   ├── restaurant/
│       │   │   │   ├── pages/        # HomePage, MenuPage, OrderPage, AboutPage, ContactPage
│       │   │   │   ├── config.ts     # Which modules this template uses
│       │   │   │   └── routes.ts     # Route definitions
│       │   │   ├── salon/
│       │   │   │   ├── pages/
│       │   │   │   ├── config.ts
│       │   │   │   └── routes.ts
│       │   │   ├── fitness/
│       │   │   │   ├── pages/
│       │   │   │   ├── config.ts
│       │   │   │   └── routes.ts
│       │   │   └── professional/
│       │   │       ├── pages/
│       │   │       ├── config.ts
│       │   │       └── routes.ts
│       │   │
│       │   ├── config/
│       │   │   ├── site.config.ts    # Business name, colors, contact info, social links
│       │   │   └── features.config.ts # Which modules are enabled
│       │   │
│       │   ├── hooks/                # Shared hooks (useAuth, useSupabase, etc.)
│       │   ├── lib/                  # Utility functions, Supabase client, constants
│       │   ├── types/                # Global TypeScript types
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── index.css             # Tailwind directives + custom CSS variables
│       │
│       ├── supabase/
│       │   ├── migrations/           # Ordered SQL migration files
│       │   │   ├── 00001_core.sql    # Users, profiles, settings
│       │   │   ├── 00002_booking.sql
│       │   │   ├── 00003_menu.sql
│       │   │   ├── 00004_payments.sql
│       │   │   └── 00005_portal.sql
│       │   ├── seed.sql              # Demo data for development
│       │   └── config.toml
│       │
│       ├── .env.example
│       ├── .eslintrc.cjs
│       ├── .prettierrc
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── vercel.json
│       └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── MODULES.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── CLAUDE.md                         # This file
├── README.md
├── LICENSE
└── package.json                      # Monorepo root (workspaces)
```

## Module System Rules

### Adding a Module

Each module is self-contained in `src/modules/<name>/` and must include:

1. `index.ts` — public API (exports components, hooks, types)
2. `types.ts` — all TypeScript types for the module
3. `components/` — React components
4. `hooks/` — custom hooks for data fetching and logic

### Module Independence

- Modules never import from other modules directly
- Shared dependencies go in `src/components/ui/` or `src/lib/`
- Modules communicate through props and callbacks, never shared global state
- Each module has its own Supabase migration file

### Payment Provider Interface

All payment operations go through the abstract interface in `src/modules/payments/types.ts`:

```typescript
interface PaymentProvider {
  createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession>;
  createSubscription(params: SubscriptionParams): Promise<Subscription>;
  handleWebhook(payload: WebhookPayload): Promise<WebhookResult>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
}
```

Stripe and Square each implement this interface. The active provider is set in `features.config.ts`.

## CLI Behavior

The CLI (`npx create-lets-go-app`) should:

1. Ask for project name
2. Ask for business type (restaurant, salon, fitness, professional)
3. Ask for payment provider (Stripe, Square, none)
4. Ask for Supabase project URL and anon key (or skip for later)
5. Generate the project with only the relevant modules and pages
6. Initialize git repo
7. Install dependencies
8. Print next steps (set up .env, run migrations, start dev server)
