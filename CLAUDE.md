# CLAUDE.md — LetsGo!

## Project Overview

LetsGo! is an open-source CLI tool and starter kit for generating production-ready local business websites. Users run `npx create-letsgo-app` and get a fully scaffolded, deployable project tailored to their business type.

**Stack:** Vite + React + TypeScript + Tailwind CSS + Supabase + Stripe/Square
**Deployment:** Vercel
**Version Control:** Git + GitHub

---

## Tech Stack Rules

### Frontend

- **Vite** as the build tool — no Next.js, no CRA
- **React 18+** with functional components only — no class components
- **TypeScript** in strict mode — no `any` types unless absolutely unavoidable (and commented why)
- **Tailwind CSS** for all styling — no CSS modules, no styled-components, no inline styles except dynamic values
- **React Router v6** for routing — file-based routing is NOT used
- **Lucide React** for icons — no other icon libraries

### Backend

- **Supabase** for auth, database, storage, and edge functions
- **PostgreSQL** via Supabase — all schemas defined in migration files
- **Row Level Security (RLS)** enabled on every table from day one — no exceptions
- **Supabase Auth** for all authentication — email/password + optional social providers

### Payments

- **Stripe** as the default payment processor
- **Square** as an optional alternative
- Payment logic is abstracted behind a provider interface so swapping is trivial

### Deployment

- **Vercel** for frontend hosting
- **GitHub** for version control
- Environment variables managed via `.env.local` (never committed)

---

## Project Structure — Static Site (HTML / CSS / JS)

When the static site option is selected, the project structure is intentionally simple. No build tools, no npm, no frameworks.

```
project-name/
├── site-data.json            # ALL site content lives here — single source of truth
├── index.html                # Homepage
├── about.html                # About page
├── [page-3].html             # Business-specific (menu, services, classes, etc.)
├── [page-4].html             # Business-specific (order, book, membership, portal)
├── contact.html              # Contact page
├── 404.html                  # Error page — clean, on-brand, link back to home
├── sitemap.xml               # Auto-generated sitemap listing all pages
├── css/
│   ├── reset.css             # Minimal CSS reset (box-sizing, margin/padding zero)
│   ├── variables.css         # CSS custom properties (colors, fonts, spacing, breakpoints)
│   └── styles.css            # All site styles — imports reset and variables
├── js/
│   ├── data.js               # Loads site-data.json and populates the page content
│   ├── nav.js                # Mobile hamburger menu toggle
│   ├── forms.js              # Contact form validation and submission
│   └── main.js               # Any page-specific interactivity
├── images/                   # Placeholder images directory
│   └── .gitkeep
├── .gitignore
├── CHANGELOG.md              # Version history — tracks all content and design changes
└── README.md                 # Setup instructions (just open index.html or use Live Server)
```

### site-data.json

This is the single source of truth for all site content. Every piece of text, every menu item, every team member, every hour of operation lives here. The HTML files reference this data via `data.js`, which fetches the JSON and populates the DOM on page load.

**Base structure (shared across all business types):**

```json
{
  "business": {
    "name": "Business Name",
    "tagline": "Short tagline here",
    "description": "A few sentences about the business.",
    "phone": "(555) 123-4567",
    "email": "hello@business.com",
    "address": {
      "street": "123 Main St",
      "city": "Savannah",
      "state": "GA",
      "zip": "31401"
    },
    "coordinates": {
      "lat": 32.0809,
      "lng": -81.0912
    }
  },
  "hours": {
    "monday": { "open": "9:00 AM", "close": "5:00 PM" },
    "tuesday": { "open": "9:00 AM", "close": "5:00 PM" },
    "wednesday": { "open": "9:00 AM", "close": "5:00 PM" },
    "thursday": { "open": "9:00 AM", "close": "5:00 PM" },
    "friday": { "open": "9:00 AM", "close": "5:00 PM" },
    "saturday": { "open": "10:00 AM", "close": "3:00 PM" },
    "sunday": "closed"
  },
  "social": {
    "facebook": "",
    "instagram": "",
    "twitter": "",
    "linkedin": "",
    "yelp": ""
  },
  "theme": {
    "primaryColor": "#2563EB",
    "secondaryColor": "#1e293b"
  },
  "navigation": [
    { "label": "Home", "href": "index.html" },
    { "label": "About", "href": "about.html" },
    { "label": "Contact", "href": "contact.html" }
  ],
  "hero": {
    "headline": "Headline goes here",
    "subheadline": "Supporting text goes here.",
    "ctaText": "Get Started",
    "ctaLink": "contact.html"
  },
  "testimonials": [
    {
      "name": "Customer Name",
      "text": "Review text here.",
      "rating": 5
    }
  ],
  "team": [
    {
      "name": "Team Member",
      "title": "Position",
      "bio": "Short bio.",
      "photo": "images/team-1.jpg"
    }
  ]
}
```

**Additional fields by business type:**

Restaurant adds:

```json
{
  "menu": {
    "categories": [
      {
        "name": "Appetizers",
        "items": [
          {
            "name": "Item Name",
            "description": "Short description.",
            "price": 12.99,
            "dietary": ["vegetarian", "gluten-free"],
            "image": "images/menu-1.jpg"
          }
        ]
      }
    ]
  }
}
```

Salon adds:

```json
{
  "services": [
    {
      "name": "Haircut",
      "description": "Description of service.",
      "duration": "45 min",
      "price": 45
    }
  ]
}
```

Fitness adds:

```json
{
  "classes": [
    {
      "name": "Yoga Flow",
      "instructor": "Name",
      "day": "Monday",
      "time": "9:00 AM",
      "duration": "60 min",
      "level": "All levels"
    }
  ],
  "memberships": [
    {
      "name": "Basic",
      "price": 29,
      "period": "month",
      "features": ["Gym access", "Locker room"]
    }
  ]
}
```

Professional adds:

```json
{
  "services": [
    {
      "name": "Consulting",
      "description": "Description of service.",
      "icon": "briefcase"
    }
  ],
  "credentials": ["Licensed in State of Georgia", "Board Certified"]
}
```

### How data.js Works

- On page load, `data.js` fetches `site-data.json`
- It populates elements that have `data-bind` attributes matching JSON paths
- Example: `<span data-bind="business.name"></span>` gets populated with the business name
- For arrays (menu items, team, testimonials), it clones a `<template>` element and fills it
- Navigation is generated dynamically from the `navigation` array
- CSS custom properties are set from `theme.primaryColor` and `theme.secondaryColor`
- This means the HTML files are basically shells — all real content comes from the JSON

**Note:** Since `fetch()` requires a server for local files, the README should tell users to run `npx serve` or use VS Code Live Server for local development. Direct file:// opening will not load the JSON.

### Static Site Conventions

- **Base template lives at `templates/static/base/`** — this is the shared boilerplate, never edited per-project
- **Business configs live at `templates/static/configs/`** — one JSON per business type with page mappings and sample content
- **Per-project sites are generated** by copying base/ and merging the appropriate config
- **No build step** — files work when opened directly in a browser or served from any host
- **Shared nav/footer** — duplicated across HTML files (no JS injection, keeps it simple and SEO-friendly)
- **CSS custom properties** for theming — change colors in one file, updates everywhere
- **Semantic HTML** — `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Mobile-first CSS** — base styles are mobile, `@media` queries add desktop layouts
- **No external dependencies** — no CDN links, no Google Fonts embed, no jQuery, no Bootstrap
- **System font stack** — `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Vanilla JS only** — no libraries, no transpilation needed
- **Each page is self-contained** — no JS routing, every page is a real HTML file

### 404 Page

- Clean, on-brand error page using the same header/footer as the rest of the site
- Friendly message: not robotic, not cutesy — just helpful
- Link back to homepage
- Consistent with the site's color scheme and typography
- Works on Vercel, Netlify, and GitHub Pages (all recognize 404.html automatically)

### Sitemap (sitemap.xml)

- Lists all HTML pages with full URLs
- Includes `<lastmod>` dates (set to build date initially)
- Must be updated whenever pages are added or removed (the `/addpage` command handles this)
- Format: standard XML sitemap protocol

### Changelog (CHANGELOG.md)

- Tracks all changes to the project — content updates, new pages, theme changes, bug fixes
- Format: date + version + description
- Initial entry created on first build: "v1.0.0 — Initial site launch"
- All slash commands (`/addpage`, `/update`, `/theme`) append entries automatically
- Useful for client handoffs — shows exactly what changed and when

### Static Site Page Templates by Business Type

**Restaurant / Café:**
index.html (Home), menu.html (Menu), order.html (Order/Reservations), about.html (About), contact.html (Contact)

**Salon / Barbershop:**
index.html (Home), services.html (Services & Pricing), book.html (Book Appointment), team.html (Our Team), contact.html (Contact)

**Fitness / Gym:**
index.html (Home), classes.html (Class Schedule), membership.html (Membership Plans), trainers.html (Trainers), contact.html (Contact)

**Professional Services:**
index.html (Home), services.html (Services), team.html (Our Team), portal.html (Client Info/Login), contact.html (Contact)

---

**Note:** Full stack build specifications have been moved to `fullstack-todo.md` for future development.

---

## Coding Conventions

### Naming

- **Files:** kebab-case for all files (`contact-form.tsx`, `use-auth.ts`)
- **Components:** PascalCase (`ContactForm`, `BookingCalendar`)
- **Hooks:** camelCase with `use` prefix (`useAuth`, `useBooking`)
- **Types/Interfaces:** PascalCase with descriptive names (`BookingSlot`, `MenuCategory`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_BOOKING_DAYS`, `DEFAULT_CURRENCY`)
- **Database tables:** snake_case (`booking_slots`, `menu_items`)
- **Database columns:** snake_case (`created_at`, `business_name`)

### Component Pattern

Every component follows this structure:

```tsx
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { BookingSlot } from "@/types";

// 2. Types (if component-specific)
interface BookingCardProps {
  slot: BookingSlot;
  onBook: (slotId: string) => void;
}

// 3. Component
export function BookingCard({ slot, onBook }: BookingCardProps) {
  // hooks first
  const [isLoading, setIsLoading] = useState(false);

  // handlers
  const handleBook = async () => {
    setIsLoading(true);
    await onBook(slot.id);
    setIsLoading(false);
  };

  // render
  return <div className="rounded-lg border p-4">{/* ... */}</div>;
}
```

### Import Aliases

- `@/` maps to `src/`
- Always use aliases, never relative paths beyond one level (`../`)

### State Management

- **Local state:** `useState` / `useReducer`
- **Server state:** TanStack Query (React Query) for all Supabase data fetching
- **Global state:** React Context only when truly needed (auth, theme, site config)
- **No Redux, no Zustand** — keep it simple

### Error Handling

- All async operations wrapped in try/catch
- User-facing errors displayed via toast notifications
- Console errors for development debugging
- Supabase errors mapped to user-friendly messages

### Accessibility

- Semantic HTML elements (`nav`, `main`, `section`, `article`)
- All images have `alt` text
- All form inputs have associated labels
- Keyboard navigation works on all interactive elements
- Focus management on modals and dialogs
- Color contrast meets WCAG AA minimum

---

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

---

## Database Conventions

### Migration Files

- Numbered sequentially: `00001_`, `00002_`, etc.
- Each migration is idempotent where possible
- Always include `created_at` and `updated_at` timestamps on every table
- Always include RLS policies in the same migration that creates the table
- Use UUIDs for all primary keys (`gen_random_uuid()`)

### RLS Policy Pattern

```sql
-- Enable RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own data
CREATE POLICY "Users can read own data"
  ON table_name FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Public read access for non-sensitive data
CREATE POLICY "Public can read"
  ON table_name FOR SELECT
  TO anon
  USING (is_public = true);
```

---

## CLI Behavior

The CLI (`npx create-letsgo-app`) should:

1. Ask for project name
2. Ask for business type (restaurant, salon, fitness, professional)
3. Ask for payment provider (Stripe, Square, none)
4. Ask for Supabase project URL and anon key (or skip for later)
5. Generate the project with only the relevant modules and pages
6. Initialize git repo
7. Install dependencies
8. Print next steps (set up .env, run migrations, start dev server)

---

## UI/Design Rules

### Default Theme

- Clean, modern, professional — not flashy
- White/light gray backgrounds, dark text
- One primary accent color (configurable in `site.config.ts`)
- System font stack as default, configurable
- Consistent spacing scale via Tailwind defaults
- Rounded corners on cards and buttons (`rounded-lg`)
- Subtle shadows on elevated elements (`shadow-sm`)

### NO AI SLOP — Mandatory Design Rules

The design must look like a real developer built it. These are hard rules:

**NEVER use:**

- Gradient backgrounds on hero sections or CTAs
- Purple-to-blue or rainbow gradients anywhere
- Glassmorphism or frosted glass effects
- Excessive border-radius (no pill-shaped everything)
- Generic placeholder text like "Welcome to our amazing journey"
- Emojis as section icons
- Floating blobs, orbs, or decorative SVG noise
- Dark mode with neon accents as default
- Parallax scrolling effects
- Lorem ipsum — always use realistic copy for the business type
- Icon-heavy feature grids with generic icons
- Cookie-cutter hero with centered text over a dark overlay (unless it genuinely fits)
- Excessive drop shadows or glow effects
- Animations on every element load
- Tailwind's default indigo/violet as primary colors

**ALWAYS do:**

- Restrained color palette: one primary color, one neutral, plenty of white space
- Real typographic hierarchy using size and weight, not color tricks
- Lean on spacing and alignment for visual quality, not effects
- Aim for Squarespace or Stripe-quality template feel
- Flat, clean borders and subtle dividers
- Minimal animations — hover states and page transitions only
- Content is the focus, not decoration
- Looks like something from awwwards or minimal.gallery, not a Canva template

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Navigation collapses to hamburger menu on mobile
- All layouts work on 320px minimum width

### Page Structure

Every page follows:

```
Header (sticky)
├── Logo + Business Name
├── Navigation Links
└── CTA Button (Book Now / Order / Contact)

Main Content
├── Hero Section (page-specific)
├── Content Sections
└── CTA Section

Footer
├── Business Info (address, phone, hours)
├── Quick Links
├── Social Media Links
└── Copyright
```

---

## Testing

- No tests required for initial build
- Structure code to be testable (pure functions, separated logic)
- Tests will be added in a later phase

---

## What NOT To Do

- Do NOT use Next.js — this is a Vite project
- Do NOT use CSS-in-JS or CSS modules
- Do NOT use class components
- Do NOT skip TypeScript types
- Do NOT hardcode business information — everything goes in config
- Do NOT create API routes — use Supabase Edge Functions if server logic is needed
- Do NOT install packages without checking if Supabase/Tailwind/React already covers the need
- Do NOT use `any` type without a comment explaining why
- Do NOT commit `.env.local` or any secrets
- Do NOT skip RLS policies on any table
