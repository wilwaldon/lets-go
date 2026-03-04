# Let's Go!

Generate production-ready local business websites. Pick a business type, pick a design style, get a complete site in minutes.

**No frameworks. No build tools.** Just HTML, CSS, and JS with native scroll-driven animations, glassmorphism, bento grids, and View Transitions API.

**Not 2024 generic.** Actually future.

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

### Usage

Run `/letsgo` and Claude Code will ask you four questions:

1. **Stack** — Static site or full stack (Vite + React + Supabase)
2. **Business type** — Restaurant, Salon, Fitness, or Professional Services
3. **Design style** — Editorial, Modern Minimal, Bold, Warm, Classic, Material, Kinetic, Glass, or Brutal
4. **Business name**

Then it builds everything.

## What's New 

🚀 **Major upgrade:** Templates now feature new styles:

### Phase 1: Modern Features (Completed)
- **3 new "Future" styles:** Kinetic, Glass, Brutal
- **CSS scroll-driven animations** (native, 60fps)
- **Bento grid layouts** (Apple-style)
- **Glassmorphism** (Liquid Glass aesthetic)
- **View Transitions API** (smooth page changes)
- **Variable fonts** (animated weight shifts)
- **Container queries** (component-based responsive design)

### Phase 2: Bleeding Edge Features (NEW!)
- **15 cutting-edge layout techniques** including:
  - CSS Anchor Positioning (Chrome 125+)
  - CSS Subgrid (perfect alignment across nested grids)
  - CSS Masonry Layout (native Pinterest-style)
  - Scroll-linked color transitions
  - Clip-path morphing
  - Text reveals (character-by-character)
  - Magnetic cursor effects
  - Full-bleed breakout grids
  - 3D perspective scrolling
  - Morphing blob shapes

All with progressive enhancement and graceful fallbacks for older browsers.

See `UPGRADE-SUMMARY.md` and `BLEEDING-EDGE-GUIDE.md` for complete details.

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

## What You Get

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
- **Zero dependencies** — No npm, no build step, no frameworks
- **Progressive enhancement** — Modern features with graceful fallbacks
- **Auto hero images** — Drop images in `/images/` folder and they automatically appear with text overlays

### Hero Background Images

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

## How It Works

Let's Go! is a prompt engineering system for Claude Code. The repo contains:

- **CLAUDE.md** — Design rules, copy guidelines, layout recipes, the AI slop checklist
- **PROMPTS.md** — Build prompts for full-stack and static site generation
- **ARCHITECTURE.md** — System architecture and data flow
- **templates/** — Base HTML/CSS/JS, business configs, design token files
- **.claude/commands/** — Slash commands that Claude Code executes

When you run `/letsgo`, Claude Code reads the docs, copies the base template, merges the business config, applies the design style tokens, customizes the HTML, writes human copy, runs a 20-point self-check, validates all links, and commits.

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
- Minimal JavaScript (~15KB)

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI

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

## License

MIT
