# Static Site (HTML / CSS / JS)

## Project Structure

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
├── robots.txt                # Search engine crawling rules
├── favicon.svg               # Letter-based SVG favicon using primary brand color
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

## site-data.json

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

## How data.js Works

- On page load, `data.js` fetches `site-data.json`
- It populates elements that have `data-bind` attributes matching JSON paths
- Example: `<span data-bind="business.name"></span>` gets populated with the business name
- For arrays (menu items, team, testimonials), it clones a `<template>` element and fills it
- Navigation is generated dynamically from the `navigation` array
- CSS custom properties are set from `theme.primaryColor` and `theme.secondaryColor`
- This means the HTML files are basically shells — all real content comes from the JSON

**Note:** Since `fetch()` requires a server for local files, the README should tell users to run `npx serve` or use VS Code Live Server for local development. Direct file:// opening will not load the JSON.

## Static Site Conventions

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

## 404 Page

- Clean, on-brand error page using the same header/footer as the rest of the site
- Friendly message: not robotic, not cutesy — just helpful
- Link back to homepage
- Consistent with the site's color scheme and typography
- Works on Vercel, Netlify, and GitHub Pages (all recognize 404.html automatically)

## Sitemap (sitemap.xml)

- Lists all HTML pages with full URLs
- Includes `<lastmod>` dates (set to build date initially)
- Must be updated whenever pages are added or removed (the `/addpage` command handles this)
- Format: standard XML sitemap protocol

## Changelog (CHANGELOG.md)

- Tracks all changes to the project — content updates, new pages, theme changes, bug fixes
- Format: date + version + description
- Initial entry created on first build: "v1.0.0 — Initial site launch"
- All slash commands (`/addpage`, `/update`, `/theme`) append entries automatically
- Useful for client handoffs — shows exactly what changed and when

## Skeleton Loading States

- While `site-data.json` is loading, empty `data-bind` and `data-template` elements show a shimmer animation
- Once data loads, `body.is-loaded` is added and content fades in
- Add class `skeleton` to any element for a manual shimmer placeholder
- Variants: `skeleton--text` (line-height block), `skeleton--circle` (round), `skeleton--rect` (rectangular)
- All skeletons are automatically removed once data.js finishes populating

## Lazy Image Loading

- Use `data-src` instead of `src` on `<img>` tags to enable lazy loading
- Images start blurred and scale slightly; when they enter the viewport, the real image loads and the blur fades out
- `IntersectionObserver` with 100px lookahead so images load just before they scroll into view
- Fallback for older browsers: images load immediately without blur effect

## Favicon

- `favicon.svg` ships with every site — a simple rounded square with the first letter of the business name
- Uses the primary brand color as the background
- During site generation, the letter and color should be updated to match the business
- SVG favicons are supported by all modern browsers and look crisp at any size

## robots.txt

- Ships with every site, allows all crawlers, points to sitemap.xml
- Sitemap URL should be updated during generation to match the actual domain

## Available Slash Commands

| Command     | Purpose                                                                             |
| ----------- | ----------------------------------------------------------------------------------- |
| `/letsgo`   | Generate a new site from scratch — asks stack, business type, design style, name    |
| `/addpage`  | Add a new page to an existing project                                               |
| `/update`   | Update site-data.json from a new business brief                                     |
| `/theme`    | Change colors and/or fonts                                                          |
| `/redesign` | Iterate on an existing site's design — layout, typography, animations, slop removal |
| `/content`  | Scrape an existing website URL and generate site-data.json from it                  |
| `/export`   | Zip the project for client handoff                                                  |

## Design Styles

Users choose a design style during `/letsgo` setup. The style defines typography, color approach, layout tendencies, component styling, and animation level. Full definitions are in letsgo.md.

| Style                | Vibe                     | Key Traits                                                                                                                             |
| -------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Editorial            | Monocle, Cereal magazine | Serif headings, dramatic scale, thin rules, minimal color, italic labels                                                               |
| Modern Minimal       | Linear, Stripe           | Clean sans-serif, tight tracking, generous space, subtle hover states                                                                  |
| Bold & Confident     | Ghost, Optimised Lean    | Dark mode, massive uppercase hero (6.5rem+), mixed type (fill + outline + accent), orange accent, sharp corners, grayscale team photos |
| Warm & Approachable  | Neighborhood shop        | Rounded corners, warm palette, friendly copy, soft hover shadows                                                                       |
| Classic Professional | Law firm, advisor        | Conservative sizing, muted colors, no animations, text-heavy layouts                                                                   |
| Material             | Google product page      | Tonal surfaces, elevation shadows, 12px card radius, light heading weights, filled cards                                               |

## Static Site Page Templates by Business Type

**Restaurant / Café:**
index.html (Home), menu.html (Menu), order.html (Order/Reservations), about.html (About), contact.html (Contact)

**Salon / Barbershop:**
index.html (Home), services.html (Services & Pricing), book.html (Book Appointment), team.html (Our Team), contact.html (Contact)

**Fitness / Gym:**
index.html (Home), classes.html (Class Schedule), membership.html (Membership Plans), trainers.html (Trainers), contact.html (Contact)

**Professional Services:**
index.html (Home), services.html (Services), team.html (Our Team), portal.html (Client Info/Login), contact.html (Contact)
