# ARCHITECTURE.md — LetsGo!

## System Overview

LetsGo! is a static site generator focused on simplicity and ease of use.

**Note:** Full stack build specifications have been moved to `fullstack-todo.md` for future development.

### Static Site Mode

A simple folder with HTML, CSS, JS, and a `site-data.json` file that contains all site content. No build tools, no npm, no frameworks. All content is driven by the JSON file — the HTML files are shells that get populated by `data.js` on page load. Change the JSON, the site updates.

---

## Architecture Diagram

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

