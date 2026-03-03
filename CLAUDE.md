# CLAUDE.md — Let's Go!

## Project Overview

Let's Go! is an open-source CLI tool and starter kit for generating production-ready local business websites. Users run `npx create-lets-go-app` and get a fully scaffolded, deployable project tailored to their business type.

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

## Documentation

### Architecture

Let's Go! supports two project types:

1. **Static Site (HTML/CSS/JS):** [docs/STATIC-SITE.md](docs/STATIC-SITE.md)
   - Simple, no build tools
   - site-data.json as single source of truth
   - Vanilla JavaScript with data binding
   - Perfect for small local businesses

2. **Full Stack (Vite + React + TypeScript):** [docs/FULLSTACK.md](docs/FULLSTACK.md)
   - Modern React application
   - Modular plugin system
   - Supabase backend integration
   - Advanced features (booking, payments, portal)

### Design & Development

- **Design Rules:** [docs/DESIGN-RULES.md](docs/DESIGN-RULES.md)
  - Design philosophy and AI slop checklist
  - Layout patterns and component rules
  - Copy rules and voice guidelines
  - Section recipes and page blueprints

- **Coding Conventions:** [docs/CODING-CONVENTIONS.md](docs/CODING-CONVENTIONS.md)
  - Naming conventions
  - Component patterns
  - State management
  - Error handling and accessibility

- **Database:** [docs/DATABASE.md](docs/DATABASE.md)
  - Migration patterns
  - RLS policies
  - Schema conventions

---

## Quick Reference

### Business Types Supported

- Restaurant / Café
- Salon / Barbershop
- Fitness / Gym
- Professional Services (law, consulting, etc.)

### Design Styles Available

| Style                | Vibe                                  |
| -------------------- | ------------------------------------- |
| Editorial            | Monocle, Cereal magazine              |
| Modern Minimal       | Linear, Stripe                        |
| Bold & Confident     | Ghost, Optimised Lean                 |
| Warm & Approachable  | Neighborhood shop                     |
| Classic Professional | Law firm, advisor                     |
| Material             | Google product page                   |
| Kinetic              | Variable fonts, scroll-reactive       |
| Glass                | Apple Liquid Glass, translucent       |
| Brutal               | Neo-brutalism, harsh borders          |

See [docs/STATIC-SITE.md](docs/STATIC-SITE.md) for detailed trait definitions.

### Available Slash Commands

| Command               | Purpose                                                       |
| --------------------- | ------------------------------------------------------------- |
| `/letsgo`             | Generate a new site from scratch                              |
| `/addpage`            | Add a new page to an existing project                         |
| `/update`             | Update site-data.json from a new business brief               |
| `/theme`              | Change colors and/or fonts                                    |
| `/redesign`           | Coordinate design improvements (delegates to sub-skills)      |
| `/redesign-layout`    | Fix repetitive layouts, add variety                           |
| `/redesign-typography`| Improve typography, spacing, and hierarchy                    |
| `/redesign-animations`| Add scroll animations, hover states, micro-interactions       |
| `/redesign-slop`      | Remove AI slop (visual tells)                                 |
| `/switch-style`       | Change to a different design style                            |
| `/copy`               | Audit and fix copy quality (remove generic phrases)           |
| `/accessibility`      | Comprehensive WCAG AA accessibility audit and fixes           |
| `/content`            | Scrape an existing website and generate site-data.json        |
| `/export`             | Zip the project for client handoff                            |

---

## Design Skills

Let's Go! includes specialized design skills for iterating on existing sites. These skills can be used independently or together through the `/redesign` coordinator.

### Core Design Skills

**`/redesign`** — Smart coordinator that diagnoses issues and delegates to sub-skills
- Automatically detects layout, typography, animation, slop, and copy issues
- Can run individual improvements or comprehensive "everything" pass
- Supports shortcuts: `/redesign layout`, `/redesign slop`, `/redesign everything`

**`/redesign-layout`** — Fix repetitive layouts and add variety
- Identifies sections using the same layout pattern
- Applies different Layout Recipes from DESIGN-RULES.md
- Ensures homepage follows the Homepage Blueprint
- Mixes container widths and section padding for visual rhythm

**`/redesign-typography`** — Improve typography and spacing
- Tightens letter-spacing on headings (-0.03em h1, -0.02em h2)
- Increases font sizes and improves hierarchy
- Fixes line-height (1.7+ for body, 1.1 for headings)
- Constrains text blocks to readable width (36rem max)
- Increases section padding and grid gaps

**`/redesign-animations`** — Add polish with animations and interactions
- Scroll-triggered fade-up animations using IntersectionObserver
- Card hover effects (lift + shadow + border)
- Hero staggered entrance animations
- Header scroll effect (blur + shadow)
- Form input focus states
- Respects prefers-reduced-motion

**`/redesign-slop`** — Remove AI tells and generic patterns
- Removes decorative lines next to labels (the #1 AI tell)
- Removes colored pills/badges above headings
- Removes star emoji ratings
- Fixes circular team photos (converts to square/3:4)
- Removes icon grids and pill-shaped buttons
- Fixes three-card grids with icon + title + paragraph
- Ensures design doesn't look AI-generated

**`/switch-style`** — Change to a different design style
- Applies complete style CSS from templates/static/styles/
- Updates CSS variables, component styles, and theme colors
- Handles style-specific HTML changes (e.g., dark mode for Bold & Confident)
- Updates favicon.svg to match new colors
- Six styles available: Editorial, Modern Minimal, Bold & Confident, Warm & Approachable, Classic Professional, Material

### Content & Quality Skills

**`/copy`** — Audit and improve copy quality
- Scans for banned phrases ("Welcome to...", "passionate about", "Learn More")
- Flags generic CTAs and vague descriptions
- Checks voice consistency across pages
- Provides before/after suggestions for human-sounding copy
- Business-type specific rewrite guidance

**`/accessibility`** — WCAG AA compliance audit
- Color contrast checking (4.5:1 for text, 3:1 for large text)
- Missing alt text detection
- Form label validation
- Keyboard navigation checks
- Touch target size validation (44px minimum)
- ARIA label completeness
- Semantic HTML structure
- Provides detailed report with priority fixes

### Usage Patterns

**Single issue fix:**
```
/redesign-slop           # Just remove AI tells
/copy                    # Just fix copy
/accessibility           # Just fix a11y issues
```

**Multiple improvements:**
```
/redesign 1,2,4          # Fix layouts, slop, and animations
/redesign layout         # Shortcut for just layouts
/redesign everything     # Run all sub-skills
```

**Style change:**
```
/switch-style            # Interactive style picker
/redesign bold           # Shortcut to switch to Bold & Confident
```

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
