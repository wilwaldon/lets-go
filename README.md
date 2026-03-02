# Let's Go!

Generate production-ready local business websites with cutting-edge 2025-2026 design features. Pick a business type, pick a design style, get a complete site in minutes.

**No frameworks. No build tools.** Just HTML, CSS, and JS with native scroll-driven animations, glassmorphism, bento grids, and View Transitions API.

**Not 2024 generic.** Actually future.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/lets-go.git
cd lets-go

# Open in Claude Code and run
/letsgo
```

Claude Code will ask you four questions:

1. **Stack** — Static site or full stack (Vite + React + Supabase)
2. **Business type** — Restaurant, Salon, Fitness, or Professional Services
3. **Design style** — Editorial, Modern Minimal, Bold, Warm, Classic, Material, Kinetic, Glass, or Brutal
4. **Business name**

Then it builds everything.

## What's New (2025 Update)

🚀 **Major upgrade:** Templates now feature cutting-edge 2025-2026 technologies:

- **3 new "Future" styles:** Kinetic, Glass, Brutal
- **CSS scroll-driven animations** (native, 60fps)
- **Bento grid layouts** (Apple-style)
- **Glassmorphism** (Liquid Glass aesthetic)
- **View Transitions API** (smooth page changes)
- **Variable fonts** (animated weight shifts)

All with progressive enhancement and graceful fallbacks for older browsers.

See `UPGRADE-SUMMARY.md` for complete details.

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

### Future Styles (2025-2026)

| Style       | Vibe                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| **Kinetic** | Oversized variable fonts, scroll-reactive typography, text as primary visual element. David Carson.    |
| **Glass**   | Apple's Liquid Glass aesthetic, layered depth, translucent surfaces, soft shadows. iOS / macOS.        |
| **Brutal**  | Neo-brutalism, harsh borders, high contrast, intentional chaos, raw aesthetics. Gumroad / Anti-design. |

## Commands

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

- **CSS scroll-driven animations** — Native, off-main-thread animations triggered by scroll (Interop 2025)
- **Bento grid layouts** — Apple-style variable-sized cards with hover depth
- **Glassmorphism** — Translucent surfaces with backdrop-filter blur and layered depth
- **View Transitions API** — Smooth animated page changes (Firefox stable Oct 2025)
- **Variable fonts** — Fine-grained weight control, 75% smaller file sizes
- **Kinetic typography** — Oversized headings with scroll-reactive weight shifts

### Core

- **Lazy image loading** — Blur-up effect with IntersectionObserver
- **Skeleton loading** — Shimmer placeholders while JSON loads
- **Mobile-first** — Responsive from 320px up, natural bento stacking
- **Contact form** — Validation, honeypot spam protection, mailto fallback
- **SEO ready** — Sitemap, robots.txt, meta tags, semantic HTML
- **Zero dependencies** — No npm, no build step, no frameworks
- **Progressive enhancement** — Modern features with graceful fallbacks

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

| Feature           | Chrome | Firefox  | Safari   | Edge | Mobile     |
| ----------------- | ------ | -------- | -------- | ---- | ---------- |
| View Transitions  | ✅     | ✅ v144+ | Polyfill | ✅   | ✅         |
| Scroll Animations | ✅     | ✅ v144+ | Polyfill | ✅   | ✅         |
| Glassmorphism     | ✅     | ✅       | ✅       | ✅   | ✅ iOS 14+ |
| Variable Fonts    | ✅     | ✅       | ✅       | ✅   | ✅         |
| Bento Grids       | ✅     | ✅       | ✅       | ✅   | ✅         |

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

## License

MIT
