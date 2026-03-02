# ARCHITECTURE.md — Let's Go!

## System Overview

Let's Go! supports two build modes:

### Full Stack Mode

A monorepo containing two packages:

1. **`packages/cli`** — An npm-publishable CLI tool that scaffolds new projects
2. **`packages/core`** — The template source code that the CLI copies and configures

When a user runs `npx create-lets-go-app`, the CLI asks questions, then copies the relevant pieces from `core/` into a new project directory, customized to their answers.

### Static Site Mode

A simple folder with HTML, CSS, JS, and a `site-data.json` file that contains all site content. No build tools, no npm, no frameworks. All content is driven by the JSON file — the HTML files are shells that get populated by `data.js` on page load. Change the JSON, the site updates.

---

## Architecture Diagrams

### Full Stack Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLI (create-lets-go-app)         │
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

### Static Site Architecture

```
┌───────────────────────────────────────┐
│           Static Site Project          │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │        site-data.json           │  │
│  │   (Single source of truth)      │  │
│  │   Business info, hours, menu,   │  │
│  │   services, team, testimonials  │  │
│  └──────────────┬──────────────────┘  │
│                 │                     │
│                 ▼                     │
│  ┌─────────────────────────────────┐  │
│  │          data.js                │  │
│  │   Fetches JSON, populates DOM   │  │
│  │   via data-bind attributes      │  │
│  └──────────────┬──────────────────┘  │
│                 │                     │
│                 ▼                     │
│  ┌─────────────────────────────────┐  │
│  │     HTML Pages (5 per site)     │  │
│  │  Semantic shells with data-bind │  │
│  │  attributes and <template> tags │  │
│  └──────────────┬──────────────────┘  │
│                 │                     │
│                 ▼                     │
│  ┌─────────────────────────────────┐  │
│  │     CSS (variables + styles)    │  │
│  │  Theme colors set from JSON     │  │
│  │  via CSS custom properties      │  │
│  └─────────────────────────────────┘  │
│                                       │
│  Deploy anywhere: Vercel, Netlify,    │
│  GitHub Pages, any static host        │
└───────────────────────────────────────┘
```

---

## Static Site Specifications

### How `data.js` Works

1. On page load, fetches `site-data.json`
2. Populates elements with `data-bind` attributes matching JSON paths (e.g., `<span data-bind="business.name"></span>`)
3. For arrays (menu items, team members, testimonials), clones `<template>` elements and fills each instance
4. Generates navigation dynamically from the `navigation` array
5. Sets CSS custom properties from `theme.primaryColor` and `theme.secondaryColor` on `:root`
6. Handles conditional sections — if a JSON array is empty, hides that section

### Static Site Page Content by Business Type

**Restaurant / Café:**
| Page | File | Content |
|------|------|---------|
| Home | `index.html` | Hero with tagline, featured menu items (3-4 highlights), hours, location map, testimonials |
| Menu | `menu.html` | Full menu from `menu.categories[]`, organized by category, dietary tags shown as small badges |
| Order | `order.html` | Reservation info or link to third-party ordering (static sites don't process payments), phone/email CTA |
| About | `about.html` | Business story, team/chef bios from `team[]`, photo gallery |
| Contact | `contact.html` | Contact form (mailto: fallback), hours from `hours`, map embed, address/phone |

**Salon / Barbershop:**
| Page | File | Content |
|------|------|---------|
| Home | `index.html` | Hero, featured services (3-4), stylist highlights, testimonials, booking CTA |
| Services | `services.html` | Full service list from `services[]` with descriptions, durations, prices |
| Book | `book.html` | Booking instructions, link to third-party booking tool or phone/email CTA |
| Team | `team.html` | Stylist profiles from `team[]` with bios, specialties, photos |
| Contact | `contact.html` | Contact form, hours, map, phone |

**Fitness / Gym:**
| Page | File | Content |
|------|------|---------|
| Home | `index.html` | Hero, class previews, membership tier highlights, trainer spotlights, trial CTA |
| Classes | `classes.html` | Weekly schedule from `classes[]`, grouped by day |
| Membership | `membership.html` | Tier comparison from `memberships[]` with features and pricing |
| Trainers | `trainers.html` | Trainer profiles from `team[]` with certifications and specialties |
| Contact | `contact.html` | Contact form, trial signup CTA, hours, map |

**Professional Services:**
| Page | File | Content |
|------|------|---------|
| Home | `index.html` | Hero, services overview, credentials from `credentials[]`, testimonials, CTA |
| Services | `services.html` | Detailed service descriptions from `services[]` |
| Team | `team.html` | Partner/staff profiles from `team[]` with credentials and expertise |
| Portal | `portal.html` | Client info page with login link placeholder or instructions |
| Contact | `contact.html` | Intake form with business-specific fields, office location, hours, map |

### Static Site Deployment

Static sites can be deployed anywhere:

- **Vercel** — `vercel deploy` from the project folder
- **Netlify** — drag and drop the folder, or connect GitHub repo
- **GitHub Pages** — push to repo, enable Pages in settings
- **Any web host** — upload files via FTP/SFTP
- **Local** — `npx serve` or VS Code Live Server (required for JSON fetch to work locally)

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
