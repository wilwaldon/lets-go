# Let's Go!

Generate production-ready local business websites in minutes. Pick a business type, pick a design style, and get a complete site ready to deploy.

**Two Options:**
- **Static Site** - No frameworks, no build tools. Just HTML, CSS, and vanilla JS.
- **Full Stack** - Vite + React + TypeScript + Tailwind + Supabase for booking, payments, and user accounts.

---

## Prerequisites

### For Static Sites

**Nothing!** Static sites work in any browser with zero dependencies. Just open `index.html`.

### For Full Stack Sites

You'll need these tools installed:

#### 1. Node.js (v20+ LTS)

**Check if installed:**
```bash
node --version
npm --version
```

**Install (2026):**

- **Windows:** Download from [nodejs.org](https://nodejs.org) or use `winget`:
  ```bash
  winget install OpenJS.NodeJS.LTS
  ```

- **macOS:** Use Homebrew:
  ```bash
  brew install node@20
  ```

- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

#### 2. Git

**Check if installed:**
```bash
git --version
```

**Install:**

- **Windows:** Download from [git-scm.com](https://git-scm.com) or use `winget`:
  ```bash
  winget install Git.Git
  ```

- **macOS:**
  ```bash
  brew install git
  ```

- **Linux:**
  ```bash
  sudo apt-get install git
  ```

#### 3. Supabase CLI (Optional - for local database development)

**Check if installed:**
```bash
supabase --version
```

**Install:**

```bash
npm install -g supabase
```

**Requires Docker** (see below) for local database instances.

#### 4. Docker Desktop (Optional - for local Supabase)

Only needed if you want to run a local Supabase database instead of using Supabase Cloud.

**Check if installed:**
```bash
docker --version
```

**Install:**

- **Windows/macOS:** Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux:** Follow [Docker Engine installation](https://docs.docker.com/engine/install/)

After installing, start Docker Desktop and ensure it's running.

---

## Quick Start

### Installation

**Option 1: Claude Code Plugin (Recommended)**

```bash
# In Claude Code, add the marketplace:
/plugin marketplace add YOUR_USERNAME/lets-go

# Install the plugin:
/plugin install lets-go@YOUR_USERNAME

# Start building:
/letsgo
```

**Option 2: Clone the Repository**

```bash
git clone https://github.com/YOUR_USERNAME/lets-go.git
cd lets-go

# Open in Claude Code and run:
/letsgo
```

---

## Usage

### Generate a New Site

Run `/letsgo` and answer four questions:

1. **Stack** — Static site or Full Stack (Vite + React + Supabase)
2. **Business type** — Restaurant, Salon, Fitness, or Professional Services
3. **Design style** — Editorial, Modern Minimal, Bold, Warm, Classic, Material, Kinetic, Glass, or Brutal
4. **Business name** — Your business name

Then Let's Go! builds everything.

### Static Site Workflow

```bash
# 1. Generate the site
/letsgo

# 2. Open in browser
cd your-site-name
open index.html

# 3. Edit content
# Edit site-data.json with your business info

# 4. Deploy
# Upload to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages)
```

**No build step. No dependencies. Just HTML, CSS, and JS.**

### Full Stack Workflow

```bash
# 1. Generate the site
/letsgo

# 2. Install dependencies
cd your-site-name
npm install

# 3. Set up Supabase
# Option A: Use Supabase Cloud (Recommended)
# - Create project at https://supabase.com
# - Copy URL and anon key to .env.local
# - Run migrations: supabase db push

# Option B: Use Local Supabase (Requires Docker)
# - Ensure Docker Desktop is running
# - supabase init
# - supabase start
# - Copy local credentials to .env.local

# 4. Run migrations
supabase db reset

# 5. Start dev server
npm run dev

# 6. Build for production
npm run build

# 7. Deploy
# Frontend: Vercel (recommended), Netlify, or Cloudflare Pages
# Database: Supabase Cloud (already set up)
```

---

## Business Types

Each business type includes industry-specific pages and functionality:

### Restaurant
- **Pages:** Home, Menu, About, Contact, Checkout
- **Features:** Menu with dietary filters, shopping cart, online ordering
- **Module:** Order management with cart persistence

### Salon
- **Pages:** Home, Services, Team, Gallery, Booking, Contact
- **Features:** Service catalog, staff profiles, portfolio gallery, appointment booking
- **Module:** Booking system with service selection and staff scheduling

### Fitness / Gym
- **Pages:** Home, Classes, Schedule, Trainers, Memberships, Contact
- **Features:** Class types, weekly schedule, trainer profiles, membership tiers
- **Module:** Class booking with capacity management

### Professional Services (Law, Consulting, etc.)
- **Pages:** Home, Services, Team, Case Studies, Consultation, Contact
- **Features:** Practice areas, attorney profiles, case studies, consultation scheduling
- **Module:** Consultation booking with meeting type selection

---

## Design Styles

### Classic Styles (2024)

| Style                    | Vibe                                                               |
| ------------------------ | ------------------------------------------------------------------ |
| **Editorial**            | Serif headings, dramatic scale, thin rules. Monocle magazine.      |
| **Modern Minimal**       | Clean sans-serif, tight tracking, subtle hovers. Linear / Stripe.  |
| **Bold & Confident**     | Oversized headings, sharp corners, strong color. Agency portfolio. |
| **Warm & Approachable**  | Rounded corners, warm palette, friendly copy. Neighborhood shop.   |
| **Classic Professional** | Conservative, muted, no animations. Law firm.                      |
| **Material**             | Tonal surfaces, elevation shadows, light heading weights. Google.  |

### Future Styles (2026)

| Style       | Vibe                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| **Kinetic** | Oversized variable fonts, scroll-reactive typography, text as primary visual element. David Carson.    |
| **Glass**   | Apple's Liquid Glass aesthetic, layered depth, translucent surfaces, soft shadows. iOS / macOS.        |
| **Brutal**  | Neo-brutalism, harsh borders, high contrast, intentional chaos, raw aesthetics. Gumroad / Anti-design. |

---

## Commands

All commands are available after installing the plugin.

| Command              | What it does                           |
| -------------------- | -------------------------------------- |
| `/letsgo`            | Build a new site from scratch          |
| `/redesign`          | Improve an existing site's design      |
| `/redesign material` | Switch to a specific design style      |
| `/addpage`           | Add pages to an existing site          |
| `/update`            | Update content from a business brief   |
| `/theme`             | Change colors and fonts                |
| `/content`           | Scrape a URL → generate site-data.json |
| `/export`            | Zip the project for client handoff     |
| `/accessibility`     | WCAG AA compliance audit and fixes     |
| `/copy`              | Audit and fix copy quality             |
| `/switch-style`      | Change to a different design style     |

---

## Project Structure

### Static Site

```
your-site/
├── index.html          # Homepage
├── [page-2].html       # Business-specific (menu, services, classes, etc.)
├── [page-3].html       # Business-specific (order, book, membership, etc.)
├── [page-4].html       # Business-specific (about, team, trainers, etc.)
├── contact.html        # Contact form + hours + map
├── 404.html            # Error page
├── site-data.json      # All content — single source of truth
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Crawler rules
├── favicon.svg         # Letter-based favicon in brand color
├── css/
│   ├── reset.css       # Minimal reset
│   ├── variables.css   # Design tokens (overridden by style)
│   └── styles.css      # Complete component library
├── js/
│   ├── data.js         # JSON → DOM binding
│   ├── nav.js          # Mobile menu
│   ├── forms.js        # Contact form validation
│   └── main.js         # Scroll animations, lazy loading, init
└── images/
```

### Full Stack Site

```
your-site/
├── src/
│   ├── templates/
│   │   ├── restaurant/      # Restaurant template
│   │   ├── salon/           # Salon template
│   │   ├── fitness/         # Fitness template
│   │   └── professional/    # Professional services template
│   ├── components/
│   │   ├── ui/              # Button, Card, Modal, Toast, etc.
│   │   ├── layout/          # Header, Footer, Section, Container
│   │   ├── common/          # HeroSection, ContactForm, etc.
│   │   └── auth/            # LoginForm, SignUpForm
│   ├── modules/
│   │   ├── menu/            # Restaurant ordering (cart, checkout)
│   │   ├── booking/         # Salon appointments
│   │   ├── classes/         # Fitness class bookings
│   │   └── consultations/   # Professional consultations
│   ├── contexts/            # AuthContext, CartContext
│   ├── lib/                 # Utilities, Supabase client
│   └── types/               # TypeScript definitions
├── supabase/
│   ├── migrations/          # Database schema
│   └── seed-*.sql           # Sample data for each template
├── public/
│   └── images/              # Hero images, logos
├── .env.local               # Supabase credentials (never commit!)
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## Built-in Features

### Modern (2025-2026)

- **Container queries** — Components respond to their container size, not viewport (Baseline 2023)
- **CSS scroll-driven animations** — Native, off-main-thread animations triggered by scroll (Interop 2025)
- **Bento grid layouts** — Apple-style variable-sized cards with hover depth
- **Glassmorphism** — Translucent surfaces with backdrop-filter blur and layered depth
- **View Transitions API** — Smooth animated page changes (Firefox stable Oct 2025)
- **Variable fonts** — Fine-grained weight control, 75% smaller file sizes
- **Kinetic typography** — Oversized headings with scroll-reactive weight shifts

### Bleeding Edge (2025-2026)

- **CSS Anchor Positioning** — Position tooltips/popovers relative to any element (Chrome 125+)
- **CSS Subgrid** — Perfect alignment across nested grid layouts (Baseline 2023)
- **CSS Masonry** — Native Pinterest-style layouts with fallback (Experimental)
- **Scroll-linked colors** — Background colors morph as you scroll (Chrome 115+)
- **Clip-path morphing** — Dynamic shapes that transform on hover/scroll
- **Text reveals** — Character-by-character animated text entrances
- **Magnetic cursor** — Elements follow and react to mouse movement
- **3D tilt effects** — Cards tilt based on mouse position
- **Floating sticky** — Sticky elements that scale/fade while scrolling
- **Full-bleed grids** — Content that breaks out while maintaining alignment
- **Asymmetric splits** — Column widths that swap as you scroll
- **Diagonal layouts** — Rotated grids for dynamic energy
- **3D perspective** — Multi-layer parallax with depth
- **Morphing blobs** — Organic animated background shapes
- **Scroll progress** — Visual indicator of page scroll position

### Core

- **Lazy image loading** — Blur-up effect with IntersectionObserver
- **Skeleton loading** — Shimmer placeholders while JSON loads
- **Mobile-first** — Responsive from 320px up, natural bento stacking
- **Contact form** — Validation, honeypot spam protection, mailto fallback
- **SEO ready** — Sitemap, robots.txt, meta tags, semantic HTML
- **Zero dependencies (static)** — No npm, no build step, no frameworks
- **Progressive enhancement** — Modern features with graceful fallbacks
- **Auto hero images** — Drop images in `/images/` folder and they automatically appear with text overlays

### Full Stack Features

- **Authentication** — Supabase Auth with email/password and social providers
- **Database** — PostgreSQL with Row Level Security enabled by default
- **Real-time** — Live updates for bookings, orders, availability
- **File storage** — Image uploads for profiles, galleries
- **Edge functions** — Serverless functions for webhooks, emails
- **Payment processing** — Stripe integration (Square as alternative)
- **Type safety** — Full TypeScript coverage in strict mode

---

## Hero Background Images

Both static and full-stack templates support automatic hero background images. Just add images to the `/images/` folder (or `/public/images/` for full-stack) and they'll automatically appear on pages!

**How it works:**
- Name images using the pattern: `hero-{pageName}.{ext}`
- Supported formats: `.webp`, `.avif`, `.jpg`, `.jpeg`, `.png`
- Automatic features: 80% dark overlay, white text, responsive design
- No code changes needed — completely automatic!

**Examples:**
```
images/
├── hero-home.jpg      # Home page background
├── hero-menu.webp     # Menu page background
├── hero-about.jpg     # About page background
└── hero-contact.jpg   # Contact page background
```

**Best practices:**
- Use 1920x800px minimum, 21:9 or 16:9 aspect ratio
- Keep files under 500KB (use [TinyJPG](https://tinyjpg.com) or [Squoosh](https://squoosh.app))
- Choose images with good contrast for text overlay
- Add both `.webp` and `.jpg` for best browser compatibility

See `/images/README.md` in any generated site for detailed documentation.

---

## Testing Templates Locally

The project includes test environments for all templates. These let you preview templates without setting up Supabase.

### Available Test Environments

```bash
# Fitness template (emerald green)
cd fitness-test
npm install
npm run dev

# Salon template (pink)
cd salon-test
npm install
npm run dev

# Professional services template (blue)
cd professional-test
npm install
npm run dev
```

All test environments:
- Use dummy Supabase credentials (no database needed)
- Display hardcoded sample data
- Show full UI/navigation/styling
- Run at http://localhost:5173

**Note:** Test directories are in `.gitignore` and not part of the published package.

---

## Deployment

### Static Sites

Deploy to any static host:

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd your-site
vercel
```

**Netlify:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd your-site
netlify deploy
```

**Cloudflare Pages:**
- Push to GitHub
- Connect repository in Cloudflare Pages dashboard
- Deploy automatically on push

**GitHub Pages:**
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

### Full Stack Sites

**Frontend (Vercel - Recommended):**

```bash
# Install Vercel CLI
npm i -g vercel

# Build and deploy
npm run build
vercel --prod

# Set environment variables in Vercel dashboard:
# VITE_SUPABASE_URL
# VITE_SUPABASE_ANON_KEY
```

**Database (Supabase Cloud):**

Your Supabase project is already deployed in the cloud. Just ensure:
1. Migrations have been run (`supabase db push`)
2. RLS policies are enabled (they are by default)
3. Environment variables are set in your frontend deployment

**Alternative Hosts:**
- Netlify (similar to Vercel)
- Cloudflare Pages (supports server-side functions)
- Railway (full stack with database)
- Render (full stack with database)

---

## Why These Templates Are Different

### Not 2024 Generic — Actually Future (2025-2026)

These templates use cutting-edge features that major tech companies are adopting:

**Apple's direction:** Glassmorphism (Liquid Glass from WWDC 2025), bento grids (used across Apple.com, iOS)

**Web standards:** CSS scroll-driven animations and View Transitions API (both part of Interop 2025 baseline)

**Typography trends:** Variable fonts (61% adoption, 75% smaller files), kinetic weight-shifting effects

**Layout innovation:** Bento grids (Notion, Framer, Supabase standard), asymmetric split layouts, staggered testimonials

### Anti-AI Slop

Every design decision is opinionated against common AI tells. No gradient heroes, no pill badges, no icon grids, no "Welcome to..." copy, no circular headshots, no star emoji ratings. The generated sites look like a human developer built them.

The design rules, copy guidelines, and self-check audits are documented in `CLAUDE.md`.

---

## Browser Support

All modern features use progressive enhancement with graceful fallbacks:

### Core Modern Features

| Feature           | Chrome  | Firefox  | Safari  | Edge    | Mobile     |
| ----------------- | ------- | -------- | ------- | ------- | ---------- |
| Container Queries | ✅ v105+ | ✅ v110+ | ✅ v16+ | ✅ v105+ | ✅         |
| View Transitions  | ✅      | ✅ v144+ | Polyfill | ✅     | ✅         |
| Scroll Animations | ✅ v115+ | ✅ v144+ | Polyfill | ✅     | ✅         |
| Glassmorphism     | ✅      | ✅       | ✅      | ✅      | ✅ iOS 14+ |
| Variable Fonts    | ✅      | ✅       | ✅      | ✅      | ✅         |
| Bento Grids       | ✅      | ✅       | ✅      | ✅      | ✅         |

### Bleeding Edge Features

| Feature                | Chrome  | Firefox | Safari  | Edge    | Fallback              |
| ---------------------- | ------- | ------- | ------- | ------- | --------------------- |
| Anchor Positioning     | ✅ v125+ | ❌      | ✅ v18.2+ | ✅ v125+ | Static positioning    |
| Subgrid                | ✅ v117+ | ✅ v71+ | ✅ v16+ | ✅ v117+ | Standard grid         |
| Masonry                | Flag    | Flag    | ❌      | Flag    | Column-count          |
| Scroll-Linked Colors   | ✅ v115+ | ✅ v144+ | Polyfill | ✅ v115+ | Static colors         |
| Clip-Path              | ✅      | ✅      | ✅      | ✅      | Rectangle             |
| Magnetic Cursor        | ✅      | ✅      | ✅      | ✅      | Standard hover        |
| 3D Transforms          | ✅      | ✅      | ✅      | ✅      | 2D fallback           |
| Morphing Blobs         | ✅      | ✅      | ✅      | ✅      | Static shapes         |

**Older browsers:** Get clean, functional designs without animations. Core experience is identical.

---

## Performance

Expected Lighthouse scores:

- **Performance:** 95-100
- **Accessibility:** 90-100
- **Best Practices:** 95-100
- **SEO:** 90-100

Features optimized for speed:

- Native CSS animations (off main thread)
- Variable fonts (75% smaller than multiple files)
- Lazy image loading
- Minimal JavaScript (~15KB for static, tree-shaken React for full-stack)
- Code splitting (full-stack only)

---

## Troubleshooting

### Full Stack Setup Issues

**"Supabase connection failed"**
- Check `.env.local` has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- Ensure you're using the ANON key, not the service role key
- Verify Supabase project is active (not paused)

**"Database migration failed"**
- Ensure Docker Desktop is running (for local Supabase)
- Run `supabase db reset` to reset local database
- Check migration files for syntax errors

**"Module not found" errors**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version: `node --version` (should be v20+)

**Build fails with TypeScript errors**
- Run `npm run type-check` to see all errors
- Ensure all `import` statements use correct paths
- Check `tsconfig.json` is not modified

### Static Site Issues

**Images not loading**
- Check image paths are relative: `images/hero-home.jpg`
- Ensure images exist in the `images/` folder
- Check browser console for 404 errors

**Animations not working**
- Check browser version (need Chrome 115+, Firefox 144+, or Safari with polyfill)
- Open DevTools and look for JavaScript errors
- Ensure `main.js` is loading correctly

---

## How It Works

Let's Go! is a prompt engineering system for Claude Code. The repo contains:

- **CLAUDE.md** — Design rules, copy guidelines, layout recipes, the AI slop checklist
- **PROMPTS.md** — Build prompts for full-stack and static site generation
- **ARCHITECTURE.md** — System architecture and data flow
- **templates/** — Base HTML/CSS/JS, React components, business configs, design token files
- **.claude/commands/** — Slash commands that Claude Code executes

When you run `/letsgo`, Claude Code reads the docs, copies the appropriate template (static or full-stack), merges the business config, applies the design style tokens, customizes the code, writes human copy, runs a 20-point self-check, validates all links, and commits.

---

## Distribution

Let's Go! is distributed as a Claude Code plugin via GitHub. Users can install it through the plugin marketplace system without needing to clone the repository or install Node.js.

### For Plugin Users

Install via Claude Code:
```bash
/plugin marketplace add YOUR_USERNAME/lets-go
/plugin install lets-go@YOUR_USERNAME
```

### For Contributors

To publish updates:
1. Update version in `.claude-plugin/plugin.json`
2. Update version in `.claude-plugin/marketplace.json`
3. Commit and push to GitHub
4. Users get updates automatically with `/plugin marketplace update`

See `PUBLISHING.md` for detailed publishing instructions.

---

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete design system, coding conventions, and guidelines
- **[templates/fullstack/README.md](templates/fullstack/README.md)** - Full-stack template documentation
- **[templates/static/README.md](templates/static/README.md)** - Static template documentation
- **[SESSION-NOTES.md](SESSION-NOTES.md)** - Development session notes and progress tracking

---

## License

MIT
