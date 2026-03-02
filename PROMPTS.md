# PROMPTS.md — Let's Go! Build Sequence

## How to Use This File

Each prompt below is designed to be copy-pasted directly into Claude Code. Run them **in order** — each one builds on the output of the previous. Wait for each prompt to finish completely before moving to the next.

Before starting, make sure Claude Code has access to `CLAUDE.md` and `ARCHITECTURE.md` in your project root. These files give Claude Code the full context it needs.

---

## Phase 0: Static Site Base Template (Run Once)

This phase creates the shared static site boilerplate that all business types inherit from. Run this once — after that, `/letsgo` just copies and customizes.

### Prompt 0 — Build the Static Site Base Template

````
Read CLAUDE.md and ARCHITECTURE.md in this repo.

Create the static site base template at templates/static/ with the following structure:

templates/static/
├── base/                         # Shared boilerplate — copied for every new static site
│   ├── index.html                # Homepage shell
│   ├── page-2.html               # Second page shell (renamed per business type)
│   ├── page-3.html               # Third page shell (renamed per business type)
│   ├── page-4.html               # Fourth page shell (renamed per business type)
│   ├── contact.html              # Contact page shell (shared across all types)
│   ├── 404.html                  # Error page shell (clean, on-brand, link to home)
│   ├── sitemap.xml               # Base sitemap (pages updated during generation)
│   ├── CHANGELOG.md              # Template with initial entry placeholder
│   ├── css/
│   │   ├── reset.css             # Minimal CSS reset
│   │   ├── variables.css         # CSS custom properties (colors, fonts, spacing, breakpoints)
│   │   └── styles.css            # Full site styles — imports reset and variables
│   ├── js/
│   │   ├── data.js               # Fetches site-data.json, populates DOM via data-bind, clones <template> tags, sets CSS vars
│   │   ├── nav.js                # Mobile hamburger menu with slide animation, backdrop, scroll lock
│   │   ├── forms.js              # Contact form validation + mailto: fallback
│   │   └── main.js               # Initializes all scripts, page-specific logic
│   ├── images/
│   │   └── .gitkeep
│   └── site-data.json            # Base JSON structure with shared fields only (business, hours, social, theme, navigation, hero, testimonials, team)
│
└── configs/                      # Business-type-specific overrides
    ├── restaurant.json           # Adds: menu.categories[], page mappings, restaurant-specific hero/CTA copy
    ├── salon.json                # Adds: services[], page mappings, salon-specific hero/CTA copy
    ├── fitness.json              # Adds: classes[], memberships[], page mappings, fitness-specific hero/CTA copy
    └── professional.json         # Adds: services[], credentials[], page mappings, professional-specific hero/CTA copy

BUILD RULES:

1. BASE HTML PAGES:
   - Every page shares identical <header> and <footer> markup (duplicated, not JS-injected, for SEO)
   - Header: logo/business name (data-bind="business.name"), nav generated from navigation[] by data.js, mobile hamburger button, CTA button
   - Footer: three columns — business info, quick links, contact info + social icons. Copyright with auto year.
   - <main> content uses data-bind attributes for text and <template> tags for repeated elements
   - index.html includes: hero section, featured items section (uses <template>), testimonials section (uses <template>), hours, map embed placeholder, CTA banner
   - page-2.html through page-4.html are generic shells with: hero section, main content area with <template> tags for list items, CTA banner. These get renamed and customized per business type.
   - contact.html includes: hero section, contact form (name, email, phone, message + honeypot), business hours, map embed, address/phone/email
   - Every page has proper <head> with title (data-bind), meta description (data-bind), Open Graph tags, viewport meta, charset, links to CSS files, defer links to JS files

2. CSS:
   - reset.css: box-sizing border-box on everything, zero margins/padding on body, consistent form element defaults, img max-width 100%
   - variables.css: --color-primary, --color-secondary, --color-text, --color-text-light, --color-bg, --color-bg-alt, --color-border, --font-family, --font-size-base through --font-size-4xl, --spacing-xs through --spacing-4xl, --max-width, --border-radius, --transition-speed, breakpoint comments
   - styles.css: mobile-first responsive layout using flexbox and grid. Includes styles for: typography, buttons (primary + secondary), cards, forms and inputs, navigation (desktop + mobile), hero sections, content sections, footer, testimonial cards, team cards, badges, grid layouts, utility classes (visually-hidden, container). NO AI SLOP — follow all design rules from CLAUDE.md.

3. JAVASCRIPT:
   - data.js must:
     a. Fetch site-data.json on DOMContentLoaded
     b. Walk all elements with data-bind="path.to.value" and set textContent
     c. Walk all elements with data-bind-href="path.to.value" and set href
     d. Walk all elements with data-bind-src="path.to.value" and set src
     e. For elements with data-template attribute, find the matching array in JSON, clone the <template> for each item, populate data-bind attributes within the clone, and append to the parent
     f. Generate <nav> links from navigation[] array
     g. Set CSS custom properties on :root from theme.primaryColor and theme.secondaryColor
     h. Hide sections where the bound array is empty (add a data-hide-empty attribute)
     i. Export a global siteData object for other scripts to use
   - nav.js: hamburger toggle, slide-in panel, backdrop overlay, body scroll lock, close on backdrop click, close on Escape key, proper aria attributes
   - forms.js: validate required fields, validate email format with regex, show inline error messages, on valid submit construct mailto: link and open it, show success state, honeypot check
   - main.js: import and initialize data.js first (wait for data load), then nav.js, then forms.js. Set current year in footer copyright. Highlight active nav link based on current page.

4. BUSINESS TYPE CONFIGS:
   Each config JSON file contains:
   - "pages": mapping of page-2/3/4 to actual filenames and labels (e.g., page-2 → menu.html with label "Menu")
   - "additionalData": the type-specific JSON fields to merge into site-data.json (menu categories for restaurant, services for salon, etc.)
   - "hero": type-specific headline, subheadline, CTA text
   - "sampleContent": realistic pre-filled content for that business type — NOT generic. Write it as if it were a real business.

   Restaurant config: pages map to menu.html, order.html, about.html. Includes 3 menu categories with 4 items each. Realistic Italian restaurant sample content.

   Salon config: pages map to services.html, book.html, team.html. Includes 8 services with prices/durations. Realistic modern salon sample content.

   Fitness config: pages map to classes.html, membership.html, trainers.html. Includes weekly class schedule, 3 membership tiers. Realistic boutique gym sample content.

   Professional config: pages map to services.html, team.html, portal.html. Includes 4 services, credentials list. Realistic law firm sample content.

5. 404 PAGE:
   - Uses the same header/footer as all other pages
   - Centered content: "Page not found" heading, friendly subtext, button linking back to home
   - Clean and on-brand — not a joke page, not robotic
   - data.js still loads so the nav and footer populate from site-data.json

6. SITEMAP:
   - Standard XML sitemap protocol
   - Lists base pages: index.html, page-2.html, page-3.html, page-4.html, contact.html
   - Uses placeholder URL (https://example.com/) — updated during site generation
   - <lastmod> set to current date placeholder — updated during generation
   - Priority: homepage 1.0, other pages 0.8, contact 0.6

7. CHANGELOG:
   - Markdown file with header and initial entry template:
     ```
     # Changelog

     ## v1.0.0 — [DATE]
     - Initial site launch
     ```
   - DATE placeholder gets replaced with actual date during site generation

8. VALIDATION:
   - Serve the base/ directory with npx serve and verify:
     a. All 5 pages render with placeholder content
     b. Navigation works between all pages
     c. Mobile hamburger menu opens/closes correctly
     d. Contact form validates and shows errors
     e. data-bind attributes populate from site-data.json
     f. <template> elements clone correctly for arrays
     g. CSS custom properties apply from theme values
     h. No console errors
   - Fix any issues before finishing

This base template is the foundation everything builds on. Quality matters here — take extra care with the CSS and data.js.
````

---

## Phase 1: Core Foundation

### Prompt 1 — Initialize the Monorepo

```
Read CLAUDE.md and ARCHITECTURE.md in this repo.

Initialize the Let's Go! monorepo structure:

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
   - Run git init + git add . + git commit -m "Initial Let's Go! scaffold"
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

Create comprehensive documentation for the Let's Go! open-source project:

1. Root README.md — the main project README that includes:
   - Project name and tagline with a clean header
   - What Let's Go! is (2-3 sentences)
   - Feature list
   - Quick start (npx create-lets-go-app + 3-4 steps to running)
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

## Static Site Build (Alternative to Phases 1-3)

If the user selected Static Site mode, skip Prompts 1-14 and run this single prompt instead:

### Prompt S1 — Generate Static Site from Base Template

```
Read CLAUDE.md and ARCHITECTURE.md in this repo.

Generate a static site for a [BUSINESS_TYPE] called "[BUSINESS_NAME]" using the base template.

1. Copy templates/static/base/ to the project output directory
2. Read templates/static/configs/[BUSINESS_TYPE].json
3. Merge the config into site-data.json:
   - Set business.name to "[BUSINESS_NAME]"
   - Merge additionalData fields (menu, services, classes, etc.) into site-data.json
   - Set hero content from the config
   - Set navigation labels and hrefs from the config's page mappings
   - Fill in realistic placeholder content appropriate for "[BUSINESS_NAME]" as a [BUSINESS_TYPE]
4. Rename page files according to the config's page mappings:
   - page-2.html → [mapped name].html (e.g., menu.html)
   - page-3.html → [mapped name].html (e.g., order.html)
   - page-4.html → [mapped name].html (e.g., about.html)
5. Update internal links in all HTML files to use the new filenames
6. Update <title> and meta descriptions on each page
7. Customize the <main> content sections of each renamed page to match the business type:
   - Use the appropriate <template> structures for that page's data (menu items, services, classes, etc.)
   - Add any page-specific sections that the base doesn't cover
8. Update sitemap.xml: replace placeholder URLs with actual filenames, set lastmod to today's date
9. Update CHANGELOG.md: replace DATE placeholder with today's date, set business name in header
10. Generate README.md with project name, setup instructions, and deployment guide
11. git init + initial commit

Follow ALL design rules from CLAUDE.md — NO AI SLOP.

Verify all pages render correctly and navigation works before finishing.
```

When using this prompt, replace `[BUSINESS_TYPE]` with one of: restaurant, salon, fitness, professional. Replace `[BUSINESS_NAME]` with the actual business name.

---

## Running Order Checklist

### Full Stack Build

- [ ] Prompt 0 — Build static site base template (run once, first time only)
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

### Static Site Build

- [ ] Prompt 0 — Build static site base template (run once, first time only)
- [ ] Prompt S1 — Generate site from base template (run per project)

---

## Tips for Running These Prompts

1. **Wait for completion** — Don't paste the next prompt until Claude Code has completely finished the current one and you've verified the output.

2. **Fix as you go** — If a prompt produces errors, tell Claude Code to fix them before moving on. Say something like: "There are TypeScript errors in [file]. Fix them."

3. **Verify visually** — After Prompt 7, run the dev server and actually look at the app in a browser. If something looks wrong, describe it to Claude Code.

4. **Save your progress** — After each prompt, commit to git. This gives you rollback points.

5. **Customize the config** — After Prompt 3, update site.config.ts with a real business name and details. This makes the visual output more satisfying as you build.

6. **The CLAUDE.md is your contract** — If Claude Code ever generates something that violates CLAUDE.md conventions, point it out. Say: "This violates the naming convention in CLAUDE.md. Fix it."
