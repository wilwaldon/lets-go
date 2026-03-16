# PROMPTS.md — LetsGo! Build Sequence

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

**Note:** Full stack build prompts (Phase 1, Phase 2, Phase 3) have been moved to `fullstack-todo.md` for future development.

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
