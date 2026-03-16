# Full Stack Build - Future Development

This file contains all the full stack build specifications and prompts that were extracted from the main documentation. These represent future development work for LetsGo!

---

## Full Stack Mode Overview

A monorepo containing two packages:

1. **`packages/cli`** — An npm-publishable CLI tool that scaffolds new projects
2. **`packages/core`** — The template source code that the CLI copies and configures

When a user runs `npx create-letsgo-app`, the CLI asks questions, then copies the relevant pieces from `core/` into a new project directory, customized to their answers.

---

## Full Stack Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   CLI (create-letsgo-app)         │
│                                                     │
│  Prompts → Template Selection → File Generation     │
│              ↓                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │              Generated Project               │    │
│  │                                             │    │
│  │  ┌─────────┐  ┌──────────┐  ┌───────────┐  │    │
│  │  │  Pages  │  │ Modules  │  │  Config   │  │    │
│  │  └────┬────┘  └────┬─────┘  └─────┬─────┘  │    │
│  │       │             │              │        │    │
│  │       ▼             ▼              ▼        │    │
│  │  ┌──────────────────────────────────────┐   │    │
│  │  │           Shared UI Layer            │   │    │
│  │  │  (ui/ components, layout, common)    │   │    │
│  │  └──────────────────────────────────────┘   │    │
│  │       │                                     │    │
│  │       ▼                                     │    │
│  │  ┌──────────────────────────────────────┐   │    │
│  │  │         Supabase Backend             │   │    │
│  │  │  Auth │ Database │ Storage │ Edge Fn  │   │    │
│  │  └──────────────────────────────────────┘   │    │
│  │       │                                     │    │
│  │       ▼                                     │    │
│  │  ┌──────────────────────────────────────┐   │    │
│  │  │      Payment Provider (Stripe/Square) │   │    │
│  │  └──────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Project Structure — Full Stack (Vite + React + TypeScript)

```
letsgo/
├── packages/
│   ├── cli/                          # The npx create-letsgo-app CLI tool
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

---

## Full Stack Template Definitions

### Restaurant / Café

**Pages:**
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero image, featured menu items, hours, location map, reviews |
| Menu | `/menu` | Full menu organized by category with prices, dietary tags, images |
| Order | `/order` | Online ordering with cart, checkout via Stripe/Square |
| About | `/about` | Story, team/chef bios, gallery, values |
| Contact | `/contact` | Contact form, hours, map, phone, email |

**Modules used:** `menu`, `payments`

**Database tables:**

- `menu_categories` — id, name, description, display_order, is_active
- `menu_items` — id, category_id, name, description, price, image_url, dietary_tags[], is_available, display_order
- `orders` — id, user_id (nullable for guest), items (jsonb), subtotal, tax, total, status, payment_id, created_at
- `order_items` — id, order_id, menu_item_id, quantity, price_at_time, special_instructions

**RLS:**

- `menu_categories` and `menu_items`: public read, authenticated admin write
- `orders` and `order_items`: users read own, admin read all

---

### Salon / Barbershop

**Pages:**
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured services, stylist highlights, testimonials, CTA |
| Services | `/services` | Service list with descriptions, durations, pricing |
| Book | `/book` | Calendar picker, service selector, stylist selector, time slots |
| Team | `/team` | Stylist profiles with bios, specialties, photos |
| Contact | `/contact` | Contact form, hours, map, phone |

**Modules used:** `booking`, `payments`

**Database tables:**

- `services` — id, name, description, duration_minutes, price, category, is_active
- `staff` — id, user_id, name, bio, photo_url, specialties[], is_active
- `staff_services` — staff_id, service_id (which staff can do which services)
- `availability` — id, staff_id, day_of_week, start_time, end_time
- `bookings` — id, user_id, staff_id, service_id, date, start_time, end_time, status, payment_id, notes
- `booking_settings` — id, business_id, min_advance_hours, max_advance_days, cancellation_policy

**RLS:**

- `services`, `staff`, `availability`: public read
- `bookings`: users read own, staff read assigned, admin read all

---

### Fitness / Gym

**Pages:**
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, class preview, membership tiers CTA, trainer highlights |
| Classes | `/classes` | Weekly class schedule, class descriptions, filter by type/trainer |
| Membership | `/membership` | Tier comparison, pricing, signup with payment |
| Trainers | `/trainers` | Trainer profiles with bios, certifications, class schedules |
| Contact | `/contact` | Contact form, trial signup, location, hours |

**Modules used:** `booking`, `payments`, `portal`

**Database tables:**

- `classes` — id, name, description, trainer_id, duration_minutes, max_capacity, category, level
- `class_schedule` — id, class_id, day_of_week, start_time, room, is_recurring
- `class_bookings` — id, user_id, class_schedule_id, date, status
- `membership_tiers` — id, name, description, price_monthly, price_yearly, features (jsonb), stripe_price_id, square_plan_id
- `memberships` — id, user_id, tier_id, status, start_date, end_date, payment_provider, payment_subscription_id
- `trainers` — id, user_id, name, bio, photo_url, certifications[], specialties[]

**RLS:**

- `classes`, `class_schedule`, `membership_tiers`, `trainers`: public read
- `class_bookings`: users read own, trainer read assigned, admin all
- `memberships`: users read own, admin all

---

### Professional Services

**Pages:**
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, service overview, credentials, testimonials, CTA |
| Services | `/services` | Detailed service descriptions, process explanation, pricing if applicable |
| Team | `/team` | Partner/staff bios, credentials, areas of expertise |
| Portal | `/portal` | Client login, project dashboard, document sharing, messaging |
| Contact | `/contact` | Intake form (customizable fields), office locations, scheduling link |

**Modules used:** `portal`, `payments` (optional)

**Database tables:**

- `services` — id, name, description, icon, display_order
- `team_members` — id, user_id, name, title, bio, photo_url, credentials[], areas_of_expertise[]
- `clients` — id, user_id, company_name, status, onboarded_at
- `projects` — id, client_id, name, description, status, start_date, due_date
- `project_updates` — id, project_id, author_id, content, created_at
- `documents` — id, project_id, name, file_url, uploaded_by, created_at
- `intake_submissions` — id, name, email, phone, message, form_data (jsonb), status, created_at

**RLS:**

- `services`, `team_members`: public read
- `clients`, `projects`, `project_updates`, `documents`: client reads own, team reads assigned, admin all
- `intake_submissions`: admin only

---

## Module Specifications

### Booking Module (`src/modules/booking/`)

**Components:**

- `BookingCalendar` — Date picker showing available dates
- `TimeSlotPicker` — Available time slots for selected date
- `ServiceSelector` — Choose service type (with duration/price)
- `StaffSelector` — Choose provider (optional, auto-assign if skipped)
- `BookingConfirmation` — Summary before payment
- `BookingStatus` — View/cancel existing bookings

**Hooks:**

- `useAvailableSlots(date, serviceId, staffId?)` — Fetches open time slots
- `useCreateBooking()` — Creates booking + triggers payment
- `useUserBookings()` — Lists current user's bookings
- `useCancelBooking()` — Cancels and handles refund logic

**Logic:**

- Slot availability calculated from staff `availability` minus existing `bookings`
- Buffer time between bookings configurable in `booking_settings`
- Confirmation emails via Supabase Edge Function
- Cancellation respects the policy in `booking_settings`

---

### Menu Module (`src/modules/menu/`)

**Components:**

- `MenuDisplay` — Full menu with category tabs/sections
- `MenuCategory` — Single category with its items
- `MenuItem` — Individual item with name, description, price, image, dietary tags
- `DietaryFilter` — Filter by vegan, gluten-free, etc.
- `Cart` — Sliding cart panel with item list, quantities, totals
- `CartItem` — Single cart line item with quantity controls
- `OrderSummary` — Pre-checkout review with subtotal, tax, total

**Hooks:**

- `useMenu()` — Fetches all categories and items
- `useCart()` — Cart state management (add, remove, update quantity, clear)
- `useCreateOrder()` — Submits order to database + triggers payment
- `useOrderStatus(orderId)` — Real-time order status tracking

**Logic:**

- Cart persisted in localStorage (no auth required to browse/add)
- Guest checkout supported (email required at checkout)
- Order status flow: `pending` → `confirmed` → `preparing` → `ready` → `completed`
- Tax calculation configurable in `site.config.ts`

---

### Payments Module (`src/modules/payments/`)

**Provider Interface:**

```typescript
// src/modules/payments/types.ts

export type PaymentProviderType = "stripe" | "square";

export interface CheckoutParams {
  items: LineItem[];
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface LineItem {
  name: string;
  description?: string;
  amount: number; // in cents
  currency: string; // 'usd'
  quantity: number;
}

export interface CheckoutSession {
  id: string;
  url: string; // redirect URL for hosted checkout
  status: "open" | "complete" | "expired";
}

export interface SubscriptionParams {
  priceId: string; // Stripe price ID or Square plan ID
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
}

export interface Subscription {
  id: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd: string;
}

export interface WebhookPayload {
  provider: PaymentProviderType;
  headers: Record<string, string>;
  body: string;
}

export interface WebhookResult {
  event: string;
  handled: boolean;
  data?: Record<string, unknown>;
}

export interface PaymentStatus {
  id: string;
  status: "pending" | "succeeded" | "failed" | "refunded";
  amount: number;
  currency: string;
}

export interface PaymentProvider {
  createCheckoutSession(params: CheckoutParams): Promise<CheckoutSession>;
  createSubscription(params: SubscriptionParams): Promise<Subscription>;
  handleWebhook(payload: WebhookPayload): Promise<WebhookResult>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
}
```

**Stripe Implementation (`providers/stripe.ts`):**

- Uses Stripe Checkout for one-time payments
- Uses Stripe Billing for subscriptions
- Webhook handler for `checkout.session.completed`, `invoice.paid`, `customer.subscription.updated`
- All Stripe calls go through Supabase Edge Functions (secrets stay server-side)

**Square Implementation (`providers/square.ts`):**

- Uses Square Checkout API for one-time payments
- Uses Square Subscriptions API for recurring
- Webhook handler for `payment.completed`, `subscription.updated`
- All Square calls go through Supabase Edge Functions

**Components:**

- `CheckoutButton` — Initiates checkout redirect
- `PricingTable` — Displays subscription tiers with signup buttons
- `PaymentHistory` — Lists past payments for authenticated users

**Hooks:**

- `useCheckout()` — Creates checkout session and redirects
- `useSubscription()` — Manages subscription lifecycle
- `usePaymentHistory()` — Fetches payment records

---

### Portal Module (`src/modules/portal/`)

**Components:**

- `PortalLayout` — Authenticated layout with sidebar navigation
- `PortalDashboard` — Overview of projects/bookings/orders depending on template
- `ProjectList` — List of client's active projects
- `ProjectDetail` — Single project with updates and documents
- `DocumentList` — Uploaded files for a project
- `MessageThread` — Simple messaging between client and business

**Hooks:**

- `usePortalData()` — Fetches client's dashboard data
- `useProjects()` — Lists projects for current client
- `useProjectUpdates(projectId)` — Real-time updates feed
- `useDocuments(projectId)` — File list with upload capability

**Logic:**

- Portal requires authentication — redirect to login if not authenticated
- Different views based on user role (client vs admin/staff)
- Document uploads go to Supabase Storage with RLS on the bucket
- Real-time updates via Supabase Realtime subscriptions

---

## Shared Components (`src/components/`)

### UI Primitives (`ui/`)

| Component  | Description                                                                       |
| ---------- | --------------------------------------------------------------------------------- |
| `Button`   | Primary, secondary, outline, ghost, destructive variants. Supports loading state. |
| `Card`     | Container with optional header, footer, padding.                                  |
| `Input`    | Text input with label, error state, helper text.                                  |
| `Select`   | Dropdown select with label and error state.                                       |
| `Textarea` | Multi-line input with character count.                                            |
| `Modal`    | Dialog overlay with close button, title, actions.                                 |
| `Toast`    | Notification toasts (success, error, info). Uses a toast context provider.        |
| `Badge`    | Status badges (open, closed, active, etc.).                                       |
| `Spinner`  | Loading spinner with optional text.                                               |
| `Skeleton` | Content placeholder for loading states.                                           |
| `Tabs`     | Tab navigation component.                                                         |
| `Avatar`   | User/staff photo with fallback initials.                                          |

### Layout (`layout/`)

| Component     | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `Header`      | Sticky nav with logo, links, mobile hamburger menu, CTA button. |
| `Footer`      | Business info, quick links, social links, copyright.            |
| `PageWrapper` | Sets page title, meta tags, consistent padding.                 |
| `Section`     | Content section with consistent max-width and vertical spacing. |
| `Container`   | Max-width centered container.                                   |
| `MobileMenu`  | Slide-out navigation for mobile.                                |

### Common (`common/`)

| Component         | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| `ContactForm`     | Name, email, phone, message. Submits to Supabase.                     |
| `SEOHead`         | Sets page title, description, Open Graph tags via react-helmet-async. |
| `MapEmbed`        | Google Maps embed with business location pin.                         |
| `SocialLinks`     | Social media icon links from config.                                  |
| `HeroSection`     | Full-width hero with background image, heading, subtext, CTA.         |
| `TestimonialCard` | Customer review card with name, text, rating.                         |
| `TeamCard`        | Staff member card with photo, name, title, bio snippet.               |
| `GalleryGrid`     | Responsive image gallery with lightbox.                               |
| `BusinessHours`   | Formatted hours table from config.                                    |
| `CTABanner`       | Call-to-action banner with heading and button.                        |

---

## Configuration System

### `site.config.ts`

```typescript
export interface SiteConfig {
  businessName: string;
  tagline: string;
  description: string;
  url: string;

  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };

  hours: {
    [key: string]: { open: string; close: string } | "closed";
    // e.g., monday: { open: '9:00 AM', close: '5:00 PM' }
  };

  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    yelp?: string;
    google?: string;
  };

  theme: {
    primaryColor: string; // hex, e.g., '#2563EB'
    secondaryColor: string;
    fontFamily?: string; // defaults to system font stack
    borderRadius?: "none" | "sm" | "md" | "lg" | "full";
    logoUrl?: string;
  };

  seo: {
    defaultTitle: string;
    titleTemplate: string; // e.g., '%s | Business Name'
    defaultDescription: string;
    ogImage?: string;
  };

  maps: {
    googleMapsApiKey?: string;
    latitude: number;
    longitude: number;
  };

  tax: {
    rate: number; // e.g., 0.08 for 8%
    inclusive: boolean;
  };
}
```

### `features.config.ts`

```typescript
export interface FeaturesConfig {
  template: "restaurant" | "salon" | "fitness" | "professional";

  modules: {
    booking: boolean;
    menu: boolean;
    payments: boolean;
    portal: boolean;
  };

  payments: {
    provider: "stripe" | "square" | "none";
    currency: string; // 'usd'
  };

  auth: {
    providers: ("email" | "google" | "facebook")[];
    requireEmailVerification: boolean;
  };
}
```

---

## CLI Architecture

### Package: `packages/cli`

**Dependencies:**

- `inquirer` — Interactive prompts
- `chalk` — Colored terminal output
- `ora` — Spinner animations
- `fs-extra` — File operations
- `execa` — Shell command execution (git init, npm install)

**Flow:**

```
1. Welcome message + version
2. Prompt: Stack type (Full stack / Static site)
3. Prompt: Project name (validate: kebab-case, no conflicts)
4. Prompt: Business type (restaurant / salon / fitness / professional)
5. Prompt: Business name (for config/JSON pre-fill)
6.
7. IF Full Stack:
   a. Prompt: Payment provider (Stripe / Square / None)
   b. Prompt: Supabase URL + anon key (or skip)
   c. Scaffold full stack project (see below)
8.
9. IF Static Site:
   a. Scaffold static project:
      - Generate site-data.json with business name and type-specific fields pre-filled
      - Generate HTML pages for the selected business type
      - Generate css/ directory with reset.css, variables.css, styles.css
      - Generate js/ directory with data.js, nav.js, forms.js, main.js
      - Set CSS custom properties from theme values in site-data.json
      - Generate README.md with setup instructions
   b. git init + initial commit
   c. Print next steps (edit site-data.json, run npx serve, deploy)
10.
11. Full Stack Scaffold:
    a. Copy core template files
    b. Remove unused module directories based on template
    c. Remove unused migration files
    d. Generate site.config.ts with provided business name
    e. Generate features.config.ts based on selections
    f. Generate .env.local with Supabase credentials (if provided)
    g. Update package.json with project name
    h. Generate appropriate routes.ts for selected template
    i. git init + initial commit
    j. npm install
    k. Print next steps
```

**Template → Module Mapping:**
| Template | booking | menu | payments | portal |
|----------|---------|------|----------|--------|
| Restaurant | ✗ | ✓ | ✓ | ✗ |
| Salon | ✓ | ✗ | ✓ | ✗ |
| Fitness | ✓ | ✗ | ✓ | ✓ |
| Professional | ✗ | ✗ | Optional | ✓ |

---

## Supabase Edge Functions

Located in `supabase/functions/`:

| Function              | Purpose                                                             |
| --------------------- | ------------------------------------------------------------------- |
| `create-checkout`     | Creates Stripe/Square checkout session (keeps API keys server-side) |
| `create-subscription` | Creates subscription checkout                                       |
| `webhook-stripe`      | Handles Stripe webhook events                                       |
| `webhook-square`      | Handles Square webhook events                                       |
| `send-email`          | Sends transactional emails (booking confirmations, order receipts)  |

---

## Deployment Architecture

```
GitHub Repo
    │
    ├──→ Vercel (frontend)
    │     - Auto-deploys on push to main
    │     - Preview deploys on PRs
    │     - Environment variables configured in dashboard
    │
    └──→ Supabase (backend)
          - Database + Auth + Storage + Edge Functions
          - Migrations run via CLI: supabase db push
          - Edge Functions deployed via: supabase functions deploy
```

### Environment Variables

```
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Stripe (only in Supabase Edge Functions, NOT in frontend)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Square (only in Supabase Edge Functions, NOT in frontend)
SQUARE_ACCESS_TOKEN=...
SQUARE_WEBHOOK_SIGNATURE_KEY=...

# Frontend-safe Stripe key
VITE_STRIPE_PUBLISHABLE_KEY=pk_...

# Frontend-safe Square key
VITE_SQUARE_APPLICATION_ID=...
VITE_SQUARE_LOCATION_ID=...
```

---

## Future Considerations (Not in Initial Build)

- **Analytics dashboard** — Business owner metrics (bookings, revenue, popular items)
- **Email marketing integration** — Mailchimp/ConvertKit connector
- **Multi-location support** — Single dashboard, multiple physical locations
- **Internationalization (i18n)** — Multi-language support
- **Theme marketplace** — Community-contributed visual themes
- **Plugin system** — Third-party module contributions
- **Admin panel** — Full CRUD admin interface for business owners
- **SEO sitemap generation** — Auto-generated sitemap.xml
- **PWA support** — Offline capability and install prompt

---

# Full Stack Build Prompts

## Phase 1: Core Foundation

### Prompt 1 — Initialize the Monorepo

```
Read CLAUDE.md and ARCHITECTURE.md in this repo.

Initialize the LetsGo! monorepo structure:

1. Set up the root package.json with npm workspaces pointing to packages/cli and packages/core
2. Create packages/cli with its own package.json, tsconfig.json, and src/ directory
3. Create packages/core with:
   - Vite + React + TypeScript project (use `npm create vite@latest` config but set it up manually, don't run the command)
   - Tailwind CSS configured with the default theme from CLAUDE.md
   - TypeScript strict mode enabled
   - Path alias @ mapped to src/
   - All config files: .eslintrc.cjs, .prettierrc, vite.config.ts, tailwind.config.ts, tsconfig.json, vercel.json
4. Create the .env.example file with all environment variable placeholders from ARCHITECTURE.md
5. Create a root .gitignore covering node_modules, dist, .env.local, .env, .DS_Store
6. Do NOT install dependencies yet — just create the files

Follow all conventions from CLAUDE.md exactly.
```

---

### Prompt 2 — Create the Shared UI Components

```
Read CLAUDE.md and ARCHITECTURE.md.

Create all the shared UI primitive components in packages/core/src/components/ui/:

Build these components following the component pattern from CLAUDE.md:
- Button (variants: primary, secondary, outline, ghost, destructive; sizes: sm, md, lg; loading state with spinner)
- Card (with optional CardHeader, CardContent, CardFooter subcomponents)
- Input (with label, error message, helper text, disabled state)
- Select (with label, error message, options array, placeholder)
- Textarea (with label, error message, character count, max length)
- Modal (overlay, close button, title, children, action buttons footer)
- Toast (success, error, info variants; auto-dismiss timer; toast context provider and useToast hook)
- Badge (variants: default, success, warning, error, info; sizes: sm, md)
- Spinner (sizes: sm, md, lg; optional text label)
- Skeleton (variants: text line, circle, rectangle; configurable width/height)
- Tabs (TabList, Tab, TabPanel with controlled active state)
- Avatar (image with fallback to initials, sizes: sm, md, lg)

Each component should:
- Be fully typed with TypeScript interfaces for props
- Use Tailwind CSS exclusively for styling
- Support className prop for overrides
- Be exported from an index.ts barrel file in the ui/ directory
- Be accessible (proper aria attributes, keyboard navigation where applicable)

Use Lucide React for any icons needed (spinner icon, close icon, etc.).
```

---

### Prompt 3 — Create the Layout Components

```
Read CLAUDE.md and ARCHITECTURE.md.

Create the layout components in packages/core/src/components/layout/:

1. Header
   - Sticky top navigation
   - Logo/business name on the left (pulled from site.config.ts)
   - Navigation links in the center (pulled from route config)
   - CTA button on the right (configurable text and link)
   - Mobile hamburger menu that triggers MobileMenu
   - Smooth scroll behavior

2. Footer
   - Three-column layout on desktop, stacked on mobile
   - Column 1: Business name, description, address
   - Column 2: Quick navigation links
   - Column 3: Contact info + social media icons
   - Copyright bar at bottom with current year
   - All data pulled from site.config.ts

3. MobileMenu
   - Slide-in panel from the right
   - Full navigation links
   - CTA button
   - Close button
   - Backdrop overlay that closes menu on click
   - Body scroll lock when open

4. PageWrapper
   - Sets document title via react-helmet-async
   - Sets meta description and OG tags
   - Wraps content in consistent max-width container with vertical padding
   - Accepts title, description props

5. Section
   - Consistent vertical padding (py-16 on desktop, py-12 on mobile)
   - Max-width container centered
   - Optional background color prop

6. Container
   - max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

Create the site.config.ts and features.config.ts files in src/config/ with placeholder/demo values for a generic business. Use the exact TypeScript interfaces from ARCHITECTURE.md.

Install react-helmet-async and react-router-dom as dependencies in packages/core/package.json.

Export everything from an index.ts barrel file in layout/.
```

---

### Prompt 4 — Create the Common Components

```
Read CLAUDE.md and ARCHITECTURE.md.

Create the common components in packages/core/src/components/common/:

1. ContactForm
   - Fields: name, email, phone (optional), message
   - Client-side validation (required fields, email format)
   - Submit handler that inserts into a Supabase "contact_submissions" table
   - Success/error toast notifications
   - Loading state on submit button
   - Honeypot field for basic spam prevention

2. SEOHead
   - Uses react-helmet-async
   - Props: title, description, ogImage, noIndex
   - Applies titleTemplate from site.config.ts
   - Sets Open Graph and Twitter Card meta tags

3. MapEmbed
   - Google Maps iframe embed
   - Uses coordinates from site.config.ts
   - Responsive container with rounded corners
   - Fallback text if no API key configured

4. SocialLinks
   - Renders icons for each social platform in site.config.ts
   - Uses Lucide icons (Facebook, Instagram, Twitter, Linkedin)
   - Opens in new tab with rel="noopener noreferrer"
   - Horizontal layout with configurable size

5. HeroSection
   - Full-width section with background image/color
   - Heading, subheading text
   - One or two CTA buttons
   - Dark overlay on background image for text readability
   - Responsive text sizing

6. TestimonialCard
   - Customer name, review text, star rating (1-5)
   - Optional customer photo
   - Clean card design with quote icon

7. TeamCard
   - Staff photo (Avatar fallback), name, title
   - Short bio text
   - Optional links (email, social)
   - Hover effect

8. GalleryGrid
   - Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
   - Images with consistent aspect ratio
   - Click to expand (uses Modal component)
   - Alt text on all images

9. BusinessHours
   - Reads hours from site.config.ts
   - Formatted table with day and hours
   - Highlights today's hours
   - Shows "Closed" for closed days

10. CTABanner
    - Full-width colored background section
    - Heading text, optional subtext
    - CTA button
    - Configurable background color (uses primary color by default)

Export everything from an index.ts barrel file.
```

---

### Prompt 5 — Set Up Supabase Client and Auth

```
Read CLAUDE.md and ARCHITECTURE.md.

Set up the Supabase integration in packages/core/:

1. Create src/lib/supabase.ts
   - Initialize Supabase client with env vars (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
   - Export the typed client

2. Create src/hooks/use-auth.ts
   - useAuth hook that provides:
     - user (current user object or null)
     - session (current session or null)
     - isLoading (true while checking auth state)
     - signIn(email, password)
     - signUp(email, password)
     - signOut()
     - signInWithProvider(provider: 'google' | 'facebook')
     - resetPassword(email)
   - Listens to onAuthStateChange for real-time updates
   - Wraps Supabase auth methods with error handling and toast notifications

3. Create src/components/auth/ directory with:
   - AuthProvider — React Context provider wrapping the app, provides useAuth
   - LoginForm — Email + password form with "Forgot password?" link
   - SignUpForm — Email + password + confirm password form
   - ResetPasswordForm — Email-only form for password reset
   - AuthGuard — Wrapper component that redirects to /login if not authenticated
   - SocialLoginButtons — Google/Facebook buttons based on features.config.ts

4. Create supabase/migrations/00001_core.sql with:
   - profiles table (id references auth.users, full_name, avatar_url, role, phone, created_at, updated_at)
   - contact_submissions table (id, name, email, phone, message, status, created_at)
   - RLS policies for both tables as specified in CLAUDE.md
   - Trigger to auto-create profile on user signup
   - Updated_at trigger function

5. Create supabase/seed.sql with sample data for development

6. Create src/types/database.ts with TypeScript types matching the database schema

Install @supabase/supabase-js as a dependency.
```

---

### Prompt 6 — Set Up Routing and App Shell

```
Read CLAUDE.md and ARCHITECTURE.md.

Set up the routing system and main App shell in packages/core/:

1. Create src/App.tsx
   - BrowserRouter wrapping everything
   - AuthProvider wrapping routes
   - HelmetProvider for SEO
   - ToastProvider for notifications
   - Header and Footer persistent across routes
   - Route outlet area in the middle

2. Create src/routes/ directory with:
   - index.tsx — central route configuration that reads from the active template's routes.ts
   - A route type definition: { path, component, label (for nav), requiresAuth, showInNav }

3. Create the four template route configs:
   - src/templates/restaurant/routes.ts — Home, Menu, Order, About, Contact
   - src/templates/salon/routes.ts — Home, Services, Book, Team, Contact
   - src/templates/fitness/routes.ts — Home, Classes, Membership, Trainers, Contact
   - src/templates/professional/routes.ts — Home, Services, Team, Portal, Contact

4. Create placeholder page components for ONE template (restaurant) to validate the routing works:
   - src/templates/restaurant/pages/HomePage.tsx
   - src/templates/restaurant/pages/MenuPage.tsx
   - src/templates/restaurant/pages/OrderPage.tsx
   - src/templates/restaurant/pages/AboutPage.tsx
   - src/templates/restaurant/pages/ContactPage.tsx

   Each page should use PageWrapper, have a HeroSection, and include placeholder content sections so the app looks and feels real when you run it. Use realistic restaurant copy and layout.

5. Create src/templates/restaurant/config.ts defining which modules this template uses

6. Update main.tsx to render App

7. Make sure the Header navigation dynamically reads from the active template's routes and only shows routes where showInNav is true.

The app should be fully runnable after this prompt — `npm run dev` should show a working restaurant website with navigation between all 5 pages.
```

---

### Prompt 7 — Install Dependencies and Verify Build

```
Read CLAUDE.md.

Now install all dependencies and verify the project builds:

1. In packages/core, install:
   - react, react-dom, react-router-dom
   - @supabase/supabase-js
   - react-helmet-async
   - lucide-react
   - @tanstack/react-query
   - tailwindcss, postcss, autoprefixer (dev)
   - typescript, @types/react, @types/react-dom (dev)
   - eslint, prettier and their configs (dev)
   - vite, @vitejs/plugin-react (dev)

2. In the root, install any workspace tooling needed

3. Run `npm run dev` in packages/core and fix any TypeScript errors, import issues, or missing dependencies

4. Run `npm run build` and fix any build errors

5. Verify:
   - The app renders in the browser
   - All 5 restaurant pages are accessible via navigation
   - The responsive hamburger menu works on mobile viewport
   - No TypeScript errors
   - No console errors

Fix everything until it's clean.
```

---

## Phase 2: Modules (Run After Phase 1 is Complete)

### Prompt 8 — Build the Menu Module

```
Read CLAUDE.md and ARCHITECTURE.md, specifically the Menu Module section.

Build the complete menu module in packages/core/src/modules/menu/:

1. Create all TypeScript types in types.ts matching the ARCHITECTURE.md schema
2. Create the Supabase migration file supabase/migrations/00003_menu.sql with all tables and RLS policies
3. Build all components listed in ARCHITECTURE.md: MenuDisplay, MenuCategory, MenuItem, DietaryFilter, Cart, CartItem, OrderSummary
4. Build all hooks: useMenu, useCart (with localStorage persistence), useCreateOrder, useOrderStatus
5. Create the barrel export in index.ts
6. Update the restaurant template pages to actually USE the menu module:
   - MenuPage should render MenuDisplay with DietaryFilter
   - OrderPage should render Cart and OrderSummary with checkout flow
7. Add realistic seed data for the menu (categories: Appetizers, Mains, Desserts, Drinks with 4-5 items each)

The menu page should be fully functional with browsing, filtering, adding to cart, and viewing cart. Payment integration comes later.
```

---

### Prompt 9 — Build the Booking Module

```
Read CLAUDE.md and ARCHITECTURE.md, specifically the Booking Module section.

Build the complete booking module in packages/core/src/modules/booking/:

1. Create all TypeScript types in types.ts
2. Create supabase/migrations/00002_booking.sql with all tables and RLS policies
3. Build all components: BookingCalendar, TimeSlotPicker, ServiceSelector, StaffSelector, BookingConfirmation, BookingStatus
4. Build all hooks: useAvailableSlots, useCreateBooking, useUserBookings, useCancelBooking
5. Create index.ts barrel export
6. Create the salon template pages that use this module:
   - src/templates/salon/pages/HomePage.tsx — Hero, featured services, testimonials
   - src/templates/salon/pages/ServicesPage.tsx — Full service list with prices and durations
   - src/templates/salon/pages/BookPage.tsx — Full booking flow (select service → select staff → select date → select time → confirm)
   - src/templates/salon/pages/TeamPage.tsx — Staff profiles
   - src/templates/salon/pages/ContactPage.tsx — Contact form, hours, map
7. Add realistic seed data (services, staff members, availability schedules)

The booking page should walk through the full flow visually. Actual Supabase calls can gracefully handle missing connection.
```

---

### Prompt 10 — Build the Payments Module

```
Read CLAUDE.md and ARCHITECTURE.md, specifically the Payments Module section.

Build the complete payments module in packages/core/src/modules/payments/:

1. Create all TypeScript types in types.ts — copy the full PaymentProvider interface from ARCHITECTURE.md
2. Create supabase/migrations/00004_payments.sql for payment records table
3. Build the Stripe provider in providers/stripe.ts implementing PaymentProvider interface
4. Build the Square provider in providers/square.ts implementing PaymentProvider interface
5. Create a provider factory: getPaymentProvider() that reads from features.config.ts and returns the correct implementation
6. Build components: CheckoutButton, PricingTable, PaymentHistory
7. Build hooks: useCheckout, useSubscription, usePaymentHistory
8. Create index.ts barrel export
9. Create the Supabase Edge Functions:
   - supabase/functions/create-checkout/index.ts
   - supabase/functions/create-subscription/index.ts
   - supabase/functions/webhook-stripe/index.ts
   - supabase/functions/webhook-square/index.ts
10. Wire CheckoutButton into the restaurant OrderPage and the salon BookingConfirmation

Both Stripe and Square implementations should be complete and functional — the active one is determined by features.config.ts.
```

---

### Prompt 11 — Build the Portal Module

```
Read CLAUDE.md and ARCHITECTURE.md, specifically the Portal Module section.

Build the complete portal module in packages/core/src/modules/portal/:

1. Create all TypeScript types in types.ts
2. Create supabase/migrations/00005_portal.sql with all tables and RLS policies
3. Build all components: PortalLayout (sidebar nav), PortalDashboard, ProjectList, ProjectDetail, DocumentList, MessageThread
4. Build all hooks: usePortalData, useProjects, useProjectUpdates, useDocuments
5. Create index.ts barrel export
6. Create the professional services template pages:
   - src/templates/professional/pages/HomePage.tsx — Hero, services overview, credentials, testimonials
   - src/templates/professional/pages/ServicesPage.tsx — Detailed service descriptions
   - src/templates/professional/pages/TeamPage.tsx — Partner/staff bios
   - src/templates/professional/pages/PortalPage.tsx — Protected route using AuthGuard, renders PortalLayout with dashboard
   - src/templates/professional/pages/ContactPage.tsx — Intake form with customizable fields
7. Add seed data for demo projects, updates, and documents

The portal should have a distinct authenticated layout with sidebar navigation, separate from the public-facing pages.
```

---

### Prompt 12 — Build the Fitness Template

```
Read CLAUDE.md and ARCHITECTURE.md.

Create the fitness/gym template that combines booking, payments, and portal modules:

1. Create src/templates/fitness/pages/:
   - HomePage.tsx — Hero, class preview cards, membership tier highlights, trainer spotlights
   - ClassesPage.tsx — Weekly schedule view (calendar/grid), filter by class type and trainer, book a class button
   - MembershipPage.tsx — Tier comparison cards using PricingTable from payments module, signup flow
   - TrainersPage.tsx — Trainer profiles with certifications and class schedules
   - ContactPage.tsx — Contact form, trial class signup, location, hours

2. Create src/templates/fitness/config.ts and routes.ts

3. Add class-specific database tables to a migration or extend existing ones:
   - classes, class_schedule, class_bookings tables
   - membership_tiers, memberships tables

4. Add realistic seed data (class types, weekly schedule, trainers, membership tiers)

This template should demonstrate how multiple modules work together in a single project.
```

---

## Phase 3: CLI Tool

### Prompt 13 — Build the CLI

```
Read CLAUDE.md and ARCHITECTURE.md, specifically the CLI Architecture section.

Build the CLI tool in packages/cli/:

1. Install dependencies: inquirer, chalk, ora, fs-extra, execa
2. Create src/index.ts — entry point with shebang line, parses args
3. Create src/prompts.ts — all interactive prompts:
   - Project name (validate: lowercase, no spaces, no conflicts with existing directory)
   - Business type (restaurant / salon / fitness / professional) with descriptions
   - Payment provider (Stripe / Square / None for now)
   - Supabase URL and anon key (with "skip for now" option)
   - Business name (free text, used to pre-fill site.config.ts)

4. Create src/scaffold.ts — the file generation logic:
   - Copies packages/core to the target directory
   - Removes module directories not needed by selected template
   - Removes unused migration files
   - Generates site.config.ts with business name filled in
   - Generates features.config.ts with correct template and module flags
   - Generates .env.local if Supabase credentials provided
   - Updates package.json name field
   - Sets the correct template in the route config

5. Create src/templates.ts — template registry mapping template names to their module requirements and descriptions

6. Set up the package.json with bin field pointing to the compiled CLI
7. Set up tsconfig.json for CLI compilation
8. Add a build script that compiles TypeScript to dist/

9. After scaffolding:
   - Run git init + git add . + git commit -m "Initial LetsGo! scaffold"
   - Run npm install
   - Print a styled "success" message with next steps:
     a. cd into project
     b. Copy .env.example to .env.local and fill in values
     c. Run supabase migrations
     d. npm run dev
     e. Deploy to Vercel

Test the CLI by running it locally and generating a test project.
```

---

### Prompt 14 — README and Documentation

```
Read CLAUDE.md and ARCHITECTURE.md.

Create comprehensive documentation for the LetsGo! open-source project:

1. Root README.md — the main project README that includes:
   - Project name and tagline with a clean header
   - What LetsGo! is (2-3 sentences)
   - Feature list
   - Quick start (npx create-letsgo-app + 3-4 steps to running)
   - Screenshot placeholders (we'll add real ones later)
   - Available templates with brief descriptions
   - Tech stack badges
   - Configuration section explaining site.config.ts and features.config.ts
   - Module overview
   - Deployment guide (Vercel + Supabase)
   - Contributing section
   - License (MIT)

2. docs/MODULES.md — detailed documentation of each module's components, hooks, and how to use them

3. docs/DEPLOYMENT.md — step-by-step deployment guide:
   - Creating a Supabase project
   - Running migrations
   - Setting up Stripe/Square
   - Deploying to Vercel
   - Custom domain setup
   - Environment variables checklist

4. docs/CONTRIBUTING.md — contribution guidelines:
   - How to add a new template
   - How to add a new module
   - Code style requirements
   - PR process

5. Add a LICENSE file (MIT)

6. Create a .github/workflows/ci.yml that runs:
   - TypeScript type checking
   - ESLint
   - Build verification
   - On push to main and PRs

Make the README compelling — this is what people see first on GitHub. It should make someone want to star the repo and try it immediately.
```

---

## Running Order Checklist - Full Stack Build

- [ ] Prompt 1 — Initialize monorepo
- [ ] Prompt 2 — Shared UI components
- [ ] Prompt 3 — Layout components
- [ ] Prompt 4 — Common components
- [ ] Prompt 5 — Supabase + Auth
- [ ] Prompt 6 — Routing + Restaurant pages
- [ ] Prompt 7 — Install deps + verify build
- [ ] Prompt 8 — Menu module
- [ ] Prompt 9 — Booking module
- [ ] Prompt 10 — Payments module
- [ ] Prompt 11 — Portal module
- [ ] Prompt 12 — Fitness template
- [ ] Prompt 13 — CLI tool
- [ ] Prompt 14 — README + docs

---

## Tips for Running These Prompts

1. **Wait for completion** — Don't paste the next prompt until Claude Code has completely finished the current one and you've verified the output.

2. **Fix as you go** — If a prompt produces errors, tell Claude Code to fix them before moving on. Say something like: "There are TypeScript errors in [file]. Fix them."

3. **Verify visually** — After Prompt 7, run the dev server and actually look at the app in a browser. If something looks wrong, describe it to Claude Code.

4. **Save your progress** — After each prompt, commit to git. This gives you rollback points.

5. **Customize the config** — After Prompt 3, update site.config.ts with a real business name and details. This makes the visual output more satisfying as you build.

6. **The CLAUDE.md is your contract** — If Claude Code ever generates something that violates CLAUDE.md conventions, point it out. Say: "This violates the naming convention in CLAUDE.md. Fix it."
