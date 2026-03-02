Read CLAUDE.md, ARCHITECTURE.md, and PROMPTS.md in this repo.

FIRST: Check if templates/static/base/ exists. If it does NOT exist, run Prompt 0 from PROMPTS.md to build the static site base template before doing anything else. This only needs to happen once.

The user wants to build a new Let's Go! project. Ask these questions ONE AT A TIME. Wait for each answer before asking the next.

Question 1: "Pick a stack:
1 — Full stack (Vite + React + TypeScript + Supabase)
2 — Static site (HTML / CSS / JS only)"

(Wait for their answer)

Question 2: "Pick a business type:
1 — Restaurant / Café
2 — Salon / Barbershop
3 — Fitness / Gym
4 — Professional Services"

(Wait for their answer)

Question 3: "Pick a design style:
1 — Editorial — Magazine-inspired. Big serif headings, generous whitespace, left-aligned layouts, dramatic scale contrast between headings and body text. Feels like a Monocle feature.
2 — Modern Minimal — Clean sans-serif, tight letter-spacing, plenty of breathing room, subtle hover states. Feels like Linear or Stripe's marketing site.
3 — Bold & Confident — Oversized headings, strong color blocking, sharp edges (border-radius: 0 on cards), high contrast. Feels like a creative agency portfolio.
4 — Warm & Approachable — Rounded (but not pill-shaped) corners, warm neutral palette, friendly copy, soft shadows on hover only. Feels like a neighborhood shop you trust.
5 — Classic Professional — Conservative spacing, traditional layout, muted colors, no animations beyond hover states. Feels like a law firm or financial advisor who takes themselves seriously.
6 — Material — Google-inspired. Tonal color surfaces, elevation shadows instead of borders, systematic spacing, light heading weights, filled cards. Feels like a polished Google product page."

(Wait for their answer)

Question 4: "What's the business name?"

(Wait for their answer, then start building)

---

## DESIGN STYLE DEFINITIONS

Apply these specific CSS overrides and layout adjustments based on the chosen style. These layer ON TOP of the base design rules in CLAUDE.md.

### Style 1 — Editorial

**Typography:**

- Use a serif font for headings: Georgia, 'Times New Roman', Times, serif
- h1: font-size 4rem desktop, letter-spacing -0.04em, line-height 1.05
- h2: font-size 3rem desktop, letter-spacing -0.03em
- Body stays sans-serif (system stack) at 400 weight, line-height 1.85
- Pull quotes at 1.5rem italic serif

**Layout:**

- Hero: min-height 70vh, text max-width 36rem, extra large bottom margin
- Use Recipe 3 (Statement) more liberally — editorial sites love big text moments
- Alternate narrow text sections (32rem max) with full-width visuals
- Add thin horizontal rules (1px, #e2e8f0) between sections instead of background color changes

**Color:**

- Primary color used very sparingly — links and one accent element only
- Text should be #111111 (near black) for stronger contrast
- Background: pure #ffffff, no alternating section backgrounds

**Details:**

- Testimonials: large italic serif text, no border, em-dash attribution
- Cards: no border, no shadow, just generous spacing between them
- Buttons: border-only (no fill) for primary, underline-style for secondary
- Section labels: italic, normal case, primary color — not uppercase

### Style 2 — Modern Minimal

**Typography:**

- System sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- h1: font-size 3.5rem desktop, letter-spacing -0.03em, font-weight 700
- Body: 400 weight, line-height 1.7, color #334155
- Labels: 500 weight, uppercase, letter-spacing 0.1em, font-size 0.75rem

**Layout:**

- Hero: 60vh, left-aligned, max-width 42rem
- Follow the Homepage Blueprint from CLAUDE.md exactly
- Clean grid layouts with grid--offset for stagger
- Generous section padding: 7rem on desktop

**Color:**

- Primary: a single saturated blue, green, or neutral
- Backgrounds: #ffffff and #fafafa only
- Borders: #e5e7eb (light gray)
- One accent color, used on links, primary button, and hover states only

**Details:**

- Cards: 1px border, 8px radius, shadow only on hover
- Buttons: solid fill primary, ghost secondary
- Smooth transitions on everything: 200ms ease
- Navigation underline slides in on hover (::after pseudo-element)

### Style 3 — Bold & Confident

Reference energy: Optimised Lean (dark bg, giant uppercase hero with gradient accent words), Ghost (mixed fill + outline type, orange accent, stats with colored highlights), The Gentleman's Club (hero text overlapping photography, price list built into hero), Buildora (full-bleed hero image with massive serif title overlaid).

This is a DARK MODE design. The entire site is dark — #0a0a0a background, white text, one hot accent color (orange #f97316 by default). The hero dominates the viewport.

**Typography:**

- System sans-serif, EXTREMELY heavy: font-weight 900 on h1, 800 on h2
- h1: font-size 6.5rem desktop (scales down: 5rem tablet, 3rem mobile), letter-spacing -0.05em, line-height 0.9, text-transform uppercase
- h2: font-size 3.5rem desktop, letter-spacing -0.04em, uppercase
- Body: 400 weight, line-height 1.7, color rgba(255,255,255,0.6) — body text is subdued so headings dominate
- Mixed type treatments in hero: use `<span class="text-accent">` for words in the primary/accent color, use `<span class="text-outline">` for words rendered as outlines (-webkit-text-stroke). This creates visual variety within a single heading — some words solid white, some orange, some outlined. See the Ghost and Optimised Lean screenshots.

**Layout:**

- Hero: 90-95vh, near full-viewport. Text should be HUGE and feel like it fills the screen. Bottom-aligned or center-aligned content. Tagline above in small tracked uppercase, description below in subdued text, max-width 28rem. One or two buttons.
- The hero IS the first impression — it should feel like a billboard, not a webpage
- Use Recipe 5 (Full-Width Feature) frequently — bold sites need big visual moments
- Asymmetric splits: 65/35 or 70/30, never 50/50
- One section per page can use the primary color as full background (section--impact class) for a CTA or statement moment
- Section dividers are 1px rgba(255,255,255,0.12) — subtle, not heavy

**Color:**

- Background: #0a0a0a (near black). Alt sections: #141414.
- Primary accent: orange #f97316 (can swap to electric blue #3b82f6, hot pink #ec4899, or lime #84cc16 depending on business)
- Text: #ffffff for headings, rgba(255,255,255,0.6) for body, rgba(255,255,255,0.4) for meta/secondary
- Primary color used for: accent words in hero, tagline color, CTA banner background, hover border color, section labels, team card titles
- CTA banner inverts: primary color background with black text and buttons

**Details:**

- Cards: dark surface (#141414), 1px border rgba(255,255,255,0.12), border-radius 0, no shadow. Hover: border turns primary color.
- Buttons: primary = orange bg with black text, sharp corners, uppercase, tracked. Hover: inverts to white bg black text. Secondary = transparent with rgba white border.
- Navigation: dark, semi-transparent with blur. Logo is uppercase tracked. Links are small uppercase tracked. CTA button is ghost (border only).
- Testimonials: dark surface, 3px left border in primary, non-italic white text. Author in small uppercase tracked text, subdued.
- Team photos: square (1:1), grayscale by default, color on hover. Name uppercase, title in primary color.
- Forms: dark fields (#141414), subtle border, primary color on focus. White text, subdued placeholder.
- Footer: pure #000000, subtle top border, uppercase tracked section headers in tiny text.
- 404: enormous font-size (12rem) number in primary color.
- Pricing: dark cards. Featured card inverts to primary color bg with black text.

### Style 4 — Warm & Approachable

**Typography:**

- Rounded sans-serif feel: -apple-system or similar, 400/600 weights only
- h1: font-size 3rem desktop, letter-spacing -0.02em, line-height 1.15
- h2: font-size 2.25rem
- Body: 400 weight, line-height 1.8, color #374151

**Layout:**

- Hero: 55vh, welcoming tone, include a secondary "What we're known for" line below the main CTA
- Use Recipe 1 (Split) for the first content section — human and friendly
- Use Recipe 2 (Staggered Grid) for services/features
- More grid items visible (4-column grids at desktop for variety)

**Color:**

- Warm palette: amber, terracotta, sage green, warm gray as primaries
- Background: #ffffff and #faf9f7 (warm off-white)
- Borders: #e8e5e0 (warm gray)
- Text: #292524 (warm near-black)

**Details:**

- Cards: 12px border-radius (rounded but not pill), 1px warm border, subtle warm shadow on hover
- Buttons: 8px border-radius, solid fill, friendly copy ("Come Visit", "See What's Fresh")
- Testimonials: bordered card with rounded corners, warm background (#faf9f7), name in bold
- Team photos: 3:4 aspect with 12px border-radius
- Add a small emoji only in the hero tagline if it fits naturally (one max, e.g., 🍝 for restaurant)

### Style 5 — Classic Professional

**Typography:**

- System sans-serif, conservative sizing
- h1: font-size 2.75rem desktop, letter-spacing -0.02em, font-weight 700
- h2: font-size 2rem, font-weight 600
- Body: 400 weight, line-height 1.7, color #374151

**Layout:**

- Hero: standard height (no min-height), left-aligned, straightforward
- Prefer Recipe 1 (Split) and Recipe 4 (Narrow List) — grids used sparingly
- More text-heavy pages, fewer visual sections
- Conservative section padding: 5rem on desktop

**Color:**

- Muted primary: navy (#1e3a5f), dark green (#1a4731), or charcoal (#374151)
- Background: #ffffff only — no alternating backgrounds
- Borders: #d1d5db (medium gray)
- Minimal color usage — primary appears on links, one button, and active nav only

**Details:**

- Cards: 4px border-radius, 1px border, no hover animation (border-color change only)
- Buttons: solid fill with 4px radius, conservative padding
- No scroll animations — content is visible immediately
- No stagger effects — grids appear all at once
- Testimonials: simple italic text with author name, no decoration
- Footer: straightforward dark background, no decorative elements
- Navigation: simple text links, bold on active, no underline animation

### Style 6 — Material

Inspired by Google's Material Design 3. Clean, systematic, uses elevation and shape to create hierarchy. Feels like a well-built Android app or a Google product marketing page.

**Typography:**

- Use Google Sans-like feel via system sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- h1: font-size 3.5rem desktop, font-weight 400 (light/regular — Material uses lighter heading weights), letter-spacing 0em (normal, not tight), line-height 1.15
- h2: font-size 2.5rem, font-weight 400, letter-spacing 0em
- h3: font-size 1.5rem, font-weight 500
- Body: 400 weight, line-height 1.75, font-size 1rem, color #1f1f1f
- Labels/overlines: 500 weight, uppercase, letter-spacing 0.1em, font-size 0.6875rem (11px)

**Layout:**

- Hero: 60vh, left-aligned, generous padding, clean and airy
- Use Recipe 1 (Split) and Recipe 2 (Staggered Grid) primarily
- Cards are the primary content vehicle — Material is card-heavy, but vary card sizes (mix large featured card with smaller supporting cards)
- Section padding: 5rem desktop — structured and even, not dramatic
- Content widths: 72rem max, consistent — Material favors systematic grids over dramatic width changes

**Color:**

- Use Material's tonal palette approach: one primary color generates a full tonal range
- Primary: a medium-saturation color (not too vivid). Good defaults: #1a73e8 (Google blue), #0b8043 (green), #8430ce (purple), #c5221f (red)
- Surface colors: #ffffff (surface), #f8f9fa (surface variant), #e8eaed (outline variant)
- On-surface: #1f1f1f (high emphasis), #5f6368 (medium emphasis), #9aa0a6 (disabled)
- Containers: use tonal fills instead of borders — cards get #f8f9fa background, no border
- Error: #d93025

**Elevation & Shape:**

- Material uses elevation (shadow layers) instead of borders to create hierarchy:
  - Level 0: no shadow (flat on surface)
  - Level 1: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)
  - Level 2: 0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)
  - Level 3: 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)
- Cards at rest: Level 1 elevation with #f8f9fa fill. On hover: Level 2.
- Border-radius: 12px on cards, 20px on large containers, 8px on buttons, full-round (9999px) ONLY on FABs and chips (this is the one exception to the pill ban — Material specifically uses it for chips)
- Use shape to distinguish: large radius = prominent, small radius = supporting

**Components:**

- Cards: filled surface (#f8f9fa), no border, Level 1 shadow, 12px radius, 1.5rem padding. On hover: Level 2 shadow + slight translateY(-2px). No border-color change on hover.
- Buttons: two types only:
  - Filled: primary color background, white text, 8px radius, 500 weight, letter-spacing 0.02em, padding 0.625rem 1.5rem. Hover: darken 10%, Level 1 shadow.
  - Outlined/Tonal: primary-tinted background (primary at 8% opacity), primary text, 8px radius, 1px primary border. Hover: primary at 12% opacity.
- Navigation: clean horizontal links, 500 weight, #5f6368 color, active link gets primary color + a 3px bottom indicator bar (not underline — a thick active indicator)
- Chips/badges: full-round (9999px), surface variant fill, small text, used for tags/categories on menu items or service categories
- Testimonials: filled card style (#f8f9fa), 12px radius, no border, no italic, clean body text with bold author name below
- Team photos: square (1:1), 12px border-radius, no border
- Forms: outlined text fields with rounded corners (8px), 1px border #9aa0a6, on focus: 2px border primary color + primary tint background. Label floats above the field.
- Dividers: 1px #e8eaed, full-width, used sparingly between list items

**Animation:**

- Material uses purposeful motion with ease-out curves
- Duration: 200ms for small elements (buttons, chips), 300ms for medium (cards, sections), 500ms for large (page transitions)
- Easing: cubic-bezier(0.2, 0, 0, 1) for standard Material motion
- Hero entrance: fade + slight scale from 0.98 to 1 (not translateY — Material prefers scale for emphasis)
- Cards on scroll: fade in with 200ms stagger, no translateY — just opacity 0→1
- Ripple effect not needed (requires JS complexity), but hover states should feel responsive
- Header: no blur effect — use elevation change instead (no shadow → Level 2 shadow on scroll)

---

## BUILD PROCESS

If they picked **Full stack (1):**
Execute every prompt in PROMPTS.md in order, from Prompt 1 through Prompt 14, but ONLY include the template and modules relevant to the business type they chose. Skip prompts for modules and templates that don't apply.

If they picked **Static site (2):**
Skip PROMPTS.md Prompts 1-14. Instead, use Prompt S1 from PROMPTS.md:

- Copy templates/static/base/ to the output directory
- Read templates/static/configs/[business_type].json
- Merge the config into site-data.json with their business name and type-specific content
- Rename page-2/3/4.html to the correct filenames for that business type
- Update all internal links, titles, and meta descriptions
- Customize each page's <main> content to match the business type
- Apply the chosen design style: read the matching file from templates/static/styles/ (e.g., style-bold.css). Copy the :root block and APPEND it to the project's css/variables.css. Copy EVERYTHING ELSE from the style file and APPEND it to the end of the project's css/styles.css. The style file contains both token overrides AND complete component overrides (buttons, cards, nav, hero, testimonials, forms, footer, etc.) — do NOT manually write CSS from the style descriptions above, the style file IS the implementation.
  - Update favicon.svg with the first letter of the business name and the style's --color-primary value
- Update robots.txt sitemap URL
- Generate sitemap.xml listing all pages with lastmod dates
- Generate CHANGELOG.md with initial entry: "v1.0.0 — Initial site launch"
- Generate README.md
- git init + commit

---

## DESIGN RULES — MANDATORY ON INITIAL BUILD

CRITICAL — READ THE FULL UI/Design Rules IN CLAUDE.md BEFORE WRITING ANY HTML OR CSS. Every layout decision, color choice, typography setting, animation, and piece of copy must follow those rules PLUS the chosen design style above.

### Layout requirements:

- Vary section layouts across every page. Use at least 3 different Layout Recipes from CLAUDE.md per page. NEVER use the same layout on adjacent sections.
- Follow the Homepage Blueprint from CLAUDE.md for index.html
- Follow the Inner Page Patterns from CLAUDE.md for other pages
- Left-align the hero (unless Style 3 Bold warrants centered for impact)
- No "label → heading → 3-card grid" repeated on multiple sections
- Use grid--offset on at least one card grid per page for staggered visual interest

### AI slop prevention — do NOT include any of these:

- Small colored pills or badges above section headings
- Three equal-width cards with icon + title + paragraph (the "feature grid")
- Star ratings displayed as emoji (★★★★★)
- Circular headshot photos for team members (use square or 3:4)
- Pill-shaped buttons and badges (border-radius: 9999px)
- Icon grids (4-6 icons in a row with labels)
- Gradient backgrounds or gradient text
- Drop shadows on cards at rest (hover only)
- Dark overlay hero images with centered white text
- Every section having the same padding, max-width, and layout pattern
- Centered everything — mix left-aligned, split, and centered layouts

### Typography requirements:

- Headings: tight letter-spacing (-0.03em h1, -0.02em h2), line-height 1.1
- Body: generous line-height (1.7-1.8), max-width ~36rem on text blocks
- Font-weight contrast: 700-800 headings, 400 body, 500 labels
- Font sizes scale responsively: h1 from 2rem mobile to 3.5rem+ desktop
- Apply the chosen design style's typography specs

### Spacing requirements:

- Section padding: 6rem+ on desktop, 3rem on mobile
- Card internal padding: 1.5rem minimum
- Grid gaps: 2rem minimum
- Heading to content spacing: 1.5rem minimum
- Generous whitespace between sections — when in doubt, add more

### Animation requirements (skip for Style 5 Classic):

- Hero: staggered entrance — tagline 0.1s → title 0.2s → description 0.35s → buttons 0.5s
- Sections: add class="animate" on content wrappers for scroll-triggered fade-up
- Card grids: add data-stagger on parent, class="animate" on each card
- Header: frosted glass blur + shadow on scroll via .is-scrolled class
- Cards: hover lift + shadow + border-color change
- Buttons: hover translateY(-1px) + shadow
- Nav links: underline slides in on hover via ::after
- Form inputs: focus ring (box-shadow 0 0 0 3px primary at 10% opacity)

### Copy requirements:

READ THE FULL "Copy Rules — Write Like a Human, Not a Marketing Bot" SECTION IN CLAUDE.md. It has a banned phrases list, before/after examples for every business type, CTA rules, and page-specific voice guidelines. Follow all of it.

Key rules (see CLAUDE.md for the complete list with examples):

- NEVER use any phrase on the banned list ("Welcome to...", "passionate about", "experience the difference", "curated", "elevate", "nestled in the heart of", etc.)
- Write like a confident business owner, not a marketing agency
- Be specific: real numbers, real details, real language
- Short sentences. Fragments are fine.
- CTAs must be action-specific: "View the Menu" not "Learn More", "Book a Haircut" not "Get Started"
- Each page has a distinct voice: menu page is functional, about page is personal, contact page needs no intro
- The final test: read it out loud. If it sounds like a brochure, rewrite it. If a real person would say it to a friend, it's good.

### Mobile requirements:

- Design for 375px first, then scale up
- Touch targets: 44px minimum height on buttons and links
- No horizontal scroll on any page
- Form fields full-width below 640px
- Grids collapse to single column below 640px
- Body text: 16px minimum, never scale down on mobile
- Section padding reduces to 3rem on mobile (not 6rem)

---

## SELF-CHECK — RUN THIS BEFORE PRESENTING THE SITE

After building, audit every page against this checklist. Fix anything that fails BEFORE committing:

**Layout check:**

1. index.html: Are there at least 3 different layout patterns? If all sections look the same, redo them using different Layout Recipes.
2. Is the hero left-aligned with staggered animation (or matching the chosen style)?
3. Are there ANY colored pills/badges above section headings? Remove them.
   3b. Are there ANY small decorative lines, dashes, or accent bars near section labels or taglines (like a short colored line before text)? Remove them — this is the #1 AI tell. Labels must be plain text only, no ::before or ::after decorative elements.
4. Do testimonials have star emoji ratings or headshot circles? Remove them.
5. Are team photos circular? Make them square or 3:4 with small border-radius.
6. Is there at least one text-only statement section (Recipe 3) on the homepage? If not, add one.
7. Do cards have drop shadows at rest? Remove — shadows on hover only.
8. Is every section the same width? Mix container widths (72rem, 48rem, 36rem).
9. Does the page feel spacious? If sections feel cramped, increase padding.

**Copy check — scan EVERY page for these:** 10. Read the hero headline out loud. Would a real business owner say this to a friend? If it sounds like a brochure, rewrite. 11. Search all HTML for "Welcome to" — remove every instance. 12. Search for "passionate", "journey", "experience the difference", "curated", "elevate", "nestled", "world-class", "cutting-edge", "seamless", "tailored to your", "we believe" — remove or rewrite every instance. 13. Check every button: any that say "Learn More", "Get Started", "Discover", "Explore", or "Click Here" must be rewritten with a specific action. 14. Check section introductions: "Explore our delicious appetizers" → just "Appetizers". "Meet our talented team" → just "The Team" or remove entirely. 15. Check the about page: does it tell a real story with dates and details? Or is it generic mission-statement fluff? Rewrite if fluff. 16. Check testimonials: do they sound like real people? "Absolutely phenomenal experience, exceeded all expectations" is AI. "The pasta here is the best I've had outside of Italy. We come back every week." is human. 17. Check descriptions: are they specific? "Quality ingredients" is vague. "Three farms in Chatham County" is specific.

**Style check:** 18. Does the chosen design style come through clearly? Compare against the style definition above and the token file in templates/static/styles/. 19. Test at 375px width — is anything overflowing or unreadable? 20. Are animations working? Scroll down — do sections fade in? Do cards stagger? (Skip for Style 5 Classic.)

**Link validation — run this script and fix any failures:**

```bash
echo "=== Link Validation ==="

# Collect all HTML files
HTML_FILES=$(find . -name "*.html" -not -path "./.git/*" -not -path "./node_modules/*")

# Check 1: Every href in navigation matches an actual file
echo "Checking nav links..."
for file in $HTML_FILES; do
  grep -oP 'href="([^"#]+\.html)"' "$file" | grep -oP '"[^"]+"' | tr -d '"' | while read link; do
    if [ ! -f "./$link" ]; then
      echo "BROKEN: $file links to $link (file does not exist)"
    fi
  done
done

# Check 2: Navigation array in site-data.json matches actual files
echo "Checking site-data.json navigation..."
if [ -f "site-data.json" ]; then
  node -e "
    const data = JSON.parse(require('fs').readFileSync('site-data.json','utf8'));
    if (data.navigation) {
      data.navigation.forEach(item => {
        if (!require('fs').existsSync(item.href)) {
          console.log('BROKEN: site-data.json navigation has ' + item.href + ' but file does not exist');
        }
      });
    }
  " 2>/dev/null
fi

# Check 3: sitemap.xml references match actual files
echo "Checking sitemap.xml..."
if [ -f "sitemap.xml" ]; then
  grep -oP '<loc>[^<]+</loc>' sitemap.xml | grep -oP '>[^<]+<' | tr -d '><' | while read url; do
    page=$(echo "$url" | sed 's|.*/||')
    if [ -n "$page" ] && [ "$page" != "" ] && [ ! -f "./$page" ]; then
      echo "BROKEN: sitemap.xml references $page but file does not exist"
    fi
  done
fi

# Check 4: Every HTML file has consistent nav (same number of links)
echo "Checking nav consistency..."
EXPECTED_NAV=""
for file in $HTML_FILES; do
  NAV_COUNT=$(grep -c 'data-nav' "$file" 2>/dev/null || echo "0")
  if [ -z "$EXPECTED_NAV" ]; then
    EXPECTED_NAV=$NAV_COUNT
  elif [ "$NAV_COUNT" != "$EXPECTED_NAV" ]; then
    echo "WARNING: $file has different nav structure ($NAV_COUNT vs $EXPECTED_NAV data-nav elements)"
  fi
done

echo "=== Link validation complete ==="
```

Fix every BROKEN link before committing. For each broken link:

- If the file should exist but doesn't → create it following the same template structure
- If the link is wrong → update the href to point to the correct file
- Update sitemap.xml to match
- Update site-data.json navigation[] to match

---

## POST-BUILD

**After the initial build completes (both stack types):**

Present the user with a summary:

"Your site has been built with these pages:

1. Home (index.html)
2. [Page 2 name]
3. [Page 3 name]
4. [Page 4 name]
5. Contact (contact.html)

- 404 error page

Design style: [chosen style name]

Do you need any additional pages? Examples: Gallery, FAQ, Blog, Pricing, Events, Careers, Privacy Policy, Terms of Service

Type the page names separated by commas, or type 'done' to finish."

If they request extra pages:

- For static sites: create new .html files following the same base template structure (header/footer duplicated, data-bind attributes, proper SEO tags), add relevant sections to site-data.json, add to navigation[] array, update sitemap.xml, update nav in ALL existing HTML files. Apply the same design style.
- For full stack: create new page components following the existing template pattern, add routes, update navigation config
- After adding pages, ask again: "Any more pages, or type 'done' to finish?"
- When done, commit the additions

Use the business name they gave you to pre-fill site.config.ts (full stack) or site-data.json (static site) with realistic placeholder content for that type of business.

Do not stop between prompts — run them as one continuous build. Fix any errors as you go. When finished, the app should build cleanly with `npm run build` and run with `npm run dev`.

Commit after each phase (Phase 1, Phase 2, Phase 3) with descriptive commit messages.

If you hit any errors, fix them before moving to the next prompt. If a dependency is missing, install it. If TypeScript complains, resolve the type error. The goal is a fully working app at the end.
