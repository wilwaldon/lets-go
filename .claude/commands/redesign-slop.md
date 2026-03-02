Read CLAUDE.md in this repo — specifically the AI Slop Checklist in the Design Rules section.

The user wants to remove all AI slop (telltale signs that AI built the site) to make it look like a professional, human-designed site.

**Step 1 — Scan for AI slop:**

Read all HTML and CSS files. Check for EVERY item on the AI slop checklist:

### Layout Tells:
- ❌ Three equal-width cards in a row with icon + title + paragraph
- ❌ Perfectly symmetrical layouts everywhere
- ❌ Every section centered with same max-width and padding
- ❌ Hero with centered text, button, nothing else
- ❌ Sections all follow: label → heading → grid of cards

### Visual Tells:
- ❌ Small colored pills/badges above section headings
- ❌ Decorative horizontal lines, dashes, accent bars next to labels (::before/::after pseudo-elements drawing lines)
- ❌ Rounded pill-shaped everything (border-radius: 9999px)
- ❌ Cards with thick colored borders or colored left borders
- ❌ Gradient backgrounds, gradient text, gradient buttons
- ❌ Glassmorphism, frosted glass, transparency effects
- ❌ Floating blobs, orbs, abstract SVG decorations
- ❌ Icon-heavy layouts (grid of 6 icons with labels)
- ❌ Purple-to-blue or indigo as primary color
- ❌ Drop shadows on everything
- ❌ Emoji as visual elements

### Copy Tells:
- ❌ "Welcome to [business]"
- ❌ "Experience the difference"
- ❌ "Your journey starts here"
- ❌ "We're passionate about..."
- ❌ "Our mission is to..."
- ❌ Buzzword-heavy descriptions
- ❌ Lorem ipsum

**Step 2 — Generate detailed slop report:**

```markdown
# AI Slop Audit Report

## 🚨 Critical Slop Detected

### Layout Slop

**index.html, Section 2 (Services):**
- ❌ Three equal-width cards with icon + title + paragraph
- **Location:** Lines 89-145
- **Fix:** Remove icons, use staggered grid (grid--offset), or convert to narrow list

**index.html, Section 3 (About):**
- ❌ Centered hero with button only
- **Location:** Lines 67-82
- **Fix:** Convert to left-aligned, add tagline above, description below

**about.html, All sections:**
- ❌ Every section centered with identical padding
- **Location:** Multiple sections
- **Fix:** Alternate left-aligned, split, and centered layouts

### Visual Slop

**All pages, Section labels:**
- ❌ Small colored pills above headings: `<span class="label">SERVICES</span>`
- **Location:** Lines 91, 156, 203 (index.html)
- **Fix:** Remove pills entirely OR convert to plain uppercase text inline (no background, no border-radius)

**index.html, Line 91:**
- ❌ Decorative line before label: `.label::before { content: ''; width: 40px; height: 2px; background: primary; }`
- **Location:** CSS styles.css line 234
- **Fix:** Remove the ::before pseudo-element completely. Labels must be PLAIN TEXT ONLY.

**All pages, Team section:**
- ❌ Circular headshot photos: `border-radius: 50%`
- **Location:** CSS .team-photo line 456
- **Fix:** Change to `border-radius: 0.5rem` and aspect-ratio 3:4 or 1:1

**index.html, Section 4:**
- ❌ Star ratings as emoji: ★★★★★
- **Location:** Lines 178, 189, 201
- **Fix:** Remove stars entirely. Testimonials should be editorial text only.

**CSS variables.css:**
- ❌ Purple-blue primary: `--color-primary: #6366f1` (indigo)
- **Location:** Line 12
- **Fix:** Change to a more distinctive color (not indigo/violet/purple)

**CSS styles.css:**
- ❌ Pill-shaped buttons: `border-radius: 9999px`
- **Location:** .btn line 89
- **Fix:** Change to `border-radius: 0.5rem` (8px)

**CSS styles.css:**
- ❌ Cards have drop shadow at rest
- **Location:** .card line 234
- **Fix:** Remove box-shadow from default state, add only on :hover

**index.html, Hero section:**
- ❌ Dark overlay on background image with centered white text
- **Location:** Lines 45-67
- **Fix:** Remove background image + overlay. Use clean white/light bg with left-aligned text. If image needed, use split layout.

**CSS styles.css:**
- ❌ Gradient button background
- **Location:** .btn--primary line 95
- **Fix:** Use solid color only: `background: var(--color-primary)`

**index.html, Hero section:**
- ❌ Floating blob decorations (SVG)
- **Location:** Lines 50-55
- **Fix:** Remove completely

**CSS styles.css:**
- ❌ Cards with colored left border accent
- **Location:** .card--highlight line 267
- **Fix:** Remove or change to subtle full border that changes color on hover

**index.html, Features section:**
- ❌ Icon grid: 6 icons in a row with labels
- **Location:** Lines 123-178
- **Fix:** Convert to narrow list (Recipe 4) with text descriptions, no icons

### Copy Slop

**index.html, Hero headline:**
- ❌ "Welcome to Savannah Coffee House"
- **Location:** Line 48
- **Fix:** "Fresh-roasted coffee. Open 6 AM daily."

**about.html, Opening paragraph:**
- ❌ "We're passionate about bringing quality coffee to our community"
- **Location:** Line 89
- **Fix:** "We've been roasting beans in Savannah since 2018."

**index.html, CTA button:**
- ❌ "Learn More"
- **Location:** Lines 65, 134, 189
- **Fix:** Make specific: "View the Menu", "See Hours", "Book a Table"

**services.html, Service descriptions:**
- ❌ Multiple buzzwords: "curated", "elevate", "premium experience"
- **Location:** Lines 67, 89, 112
- **Fix:** Rewrite with specific details, no buzzwords

## 📊 Slop Density Score

- Layout slop: 4 instances ❌ High
- Visual slop: 12 instances ❌ Very High
- Copy slop: 8 instances ❌ High

**Overall Slop Level: F (Obvious AI)**

This site would be immediately recognized as AI-generated.

## 🎯 Priority Fixes

### Immediate (Do First):
1. Remove all decorative lines/dashes next to labels (::before/::after)
2. Remove or convert colored pills to plain text
3. Remove star emoji ratings
4. Make team photos square (not circular)
5. Remove "Welcome to..." from hero
6. Fix "Learn More" buttons to be specific

### High Priority:
7. Diversify layouts (currently all the same)
8. Remove icon grid, replace with text list
9. Remove pill-shaped buttons (change to 8px radius)
10. Remove card shadows at rest (hover only)
11. Change primary color (currently generic indigo)
12. Remove dark overlay hero

### Medium Priority:
13. Remove gradient backgrounds/buttons
14. Remove floating blob decorations
15. Remove colored left borders on cards
16. Fix all buzzword copy
17. Left-align hero (currently centered)
18. Alternate section layouts (currently all centered)
```

**Step 3 — Ask user for confirmation:**

"I found [X] AI slop indicators (this site looks AI-generated). Want me to:

1 — Remove all slop automatically (comprehensive cleanup)
2 — Remove critical visual slop only (pills, stars, circles, decorative lines)
3 — Show report only (no changes)"

**Step 4 — Remove AI slop systematically:**

### Remove Decorative Lines Next to Labels

**THE #1 AI TELL — Find and destroy these:**

Search CSS for any of these patterns:
```css
/* SLOP - REMOVE THIS */
.label::before,
.section-label::before,
.hero__tagline::before {
  content: '';
  width: 40px;
  height: 2px;
  background: var(--color-primary);
  margin-right: 1rem;
}
```

**Delete the entire rule.** Labels must be PLAIN TEXT ONLY. No decorative elements whatsoever.

Also check HTML for manual decorative elements:
```html
<!-- SLOP - REMOVE THIS -->
<span class="label"><span class="label-dash">—</span> SERVICES</span>

<!-- CLEAN -->
<span class="label">SERVICES</span>
```

### Remove or Fix Colored Pills

**BEFORE (slop):**
```html
<span class="label">SERVICES</span>
```

```css
.label {
  display: inline-block;
  padding: 0.25rem 1rem;
  background: var(--color-primary);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

**AFTER (clean):**

Option 1 - Plain inline text (recommended):
```html
<span class="label">SERVICES</span>
```

```css
.label {
  display: inline;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  /* NO background, NO border, NO border-radius */
}
```

Option 2 - Remove label entirely (often better):
```html
<!-- Just use the heading -->
<h2>Services</h2>
```

### Remove Star Emoji Ratings

**Find and remove:**
```html
<!-- SLOP -->
<div class="testimonial">
  <p>"Great service!"</p>
  <div class="rating">★★★★★</div>
  <p>— Customer Name</p>
</div>

<!-- CLEAN -->
<div class="testimonial">
  <p>"Great service!"</p>
  <p class="testimonial__author">— Customer Name</p>
</div>
```

Testimonials should be editorial: quote text, attribution with em-dash. No stars.

### Fix Team Photos

**BEFORE (slop):**
```css
.team-photo {
  border-radius: 50%; /* circular */
  aspect-ratio: 1/1;
}
```

**AFTER (clean):**
```css
.team-photo {
  border-radius: 0.5rem; /* subtle rounded corners */
  aspect-ratio: 3/4; /* or 1/1 if square */
}
```

### Remove Icon Grids

**BEFORE (slop):**
```html
<div class="grid grid--3">
  <div class="feature">
    <div class="icon">🎯</div>
    <h3>Feature Name</h3>
    <p>Description</p>
  </div>
  <!-- repeated -->
</div>
```

**AFTER (clean - use Recipe 4 narrow list):**
```html
<div class="container container--narrow">
  <h2>What We Offer</h2>
  <div class="list mt-xl">
    <div class="list-item">
      <h3>Feature Name</h3>
      <p>Detailed description with specifics.</p>
    </div>
    <!-- repeated -->
  </div>
</div>
```

Or use Recipe 2 (staggered grid) WITHOUT icons.

### Fix Pill-Shaped Buttons

```css
/* BEFORE (slop) */
.btn {
  border-radius: 9999px;
}

/* AFTER (clean) */
.btn {
  border-radius: 0.5rem; /* 8px */
}
```

Exception: Material design style allows pill buttons for chips/tags only.

### Remove Card Shadows at Rest

```css
/* BEFORE (slop) */
.card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* AFTER (clean) */
.card {
  border: 1px solid var(--color-border);
  /* No shadow at rest */
}

.card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: var(--color-primary);
}
```

### Fix Primary Color (if indigo/violet/purple)

```css
/* BEFORE (slop - generic indigo) */
:root {
  --color-primary: #6366f1; /* indigo-500 */
}

/* AFTER (clean - distinctive color for business type) */
:root {
  /* Restaurant: warm orange or red */
  --color-primary: #ea580c;

  /* Salon: elegant rose or teal */
  --color-primary: #be123c;

  /* Fitness: energetic green or blue */
  --color-primary: #0891b2;

  /* Professional: navy or forest green */
  --color-primary: #1e40af;
}
```

### Remove Dark Overlay Hero

**BEFORE (slop):**
```html
<section class="hero" style="background-image: url('hero-bg.jpg');">
  <div class="hero__overlay"></div>
  <div class="container" style="text-align: center;">
    <h1 style="color: white;">Headline</h1>
    <a href="#" class="btn">CTA</a>
  </div>
</section>
```

```css
.hero {
  position: relative;
  min-height: 600px;
  background-size: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
```

**AFTER (clean):**
```html
<section class="hero">
  <div class="container">
    <div class="hero__content" style="max-width: 42rem;">
      <span class="hero__tagline">TAGLINE</span>
      <h1 class="hero__title">Headline</h1>
      <p class="hero__description">Description.</p>
      <div class="hero__actions">
        <a href="#" class="btn btn--primary">Primary CTA</a>
      </div>
    </div>
  </div>
</section>
```

Clean white/light background, left-aligned text. If you need an image, use a split layout (text left, image right).

### Remove Gradients

```css
/* BEFORE (slop) */
.btn--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero {
  background: linear-gradient(to bottom, #6366f1, #8b5cf6);
}

/* AFTER (clean) */
.btn--primary {
  background: var(--color-primary); /* solid color */
}

.hero {
  background: var(--color-bg); /* solid color */
}
```

### Remove Floating Decorations

```html
<!-- SLOP - DELETE THIS -->
<div class="blob blob-1"></div>
<div class="blob blob-2"></div>
<svg class="decoration">...</svg>
```

Remove all floating orbs, blobs, abstract shapes. Clean design doesn't need decorative elements.

### Fix Three-Card Grids

**Don't just remove — redesign using Layout Recipes:**

If you have three equal cards with icon + title + paragraph:
- Option 1: Remove icons, use Recipe 2 (staggered grid with grid--offset)
- Option 2: Convert to Recipe 4 (narrow list) with more detailed descriptions
- Option 3: Use Recipe 1 (split layout) for the featured item, then a 2-card grid for supporting items

### Left-Align Hero

If hero is centered:

```html
<!-- BEFORE (slop) -->
<section class="hero" style="text-align: center;">

<!-- AFTER (clean) -->
<section class="hero">
  <div class="container">
    <div class="hero__content" style="max-width: 42rem;"> <!-- left-aligned by default -->
```

### Diversify Section Layouts

See `/redesign-layout` for full guidance. Never use the same layout on adjacent sections.

**Step 5 — Re-scan for remaining slop:**

After fixes, check:

1. No decorative lines next to labels (::before/::after) ✓
2. No colored pills/badges ✓
3. No star emoji ratings ✓
4. No circular team photos ✓
5. No "Welcome to..." ✓
6. No "Learn More" buttons ✓
7. No three-card icon grids ✓
8. No pill-shaped buttons (border-radius 9999px) ✓
9. No shadows on cards at rest ✓
10. Primary color is not indigo/violet/purple ✓
11. No dark overlay heroes ✓
12. No gradients ✓
13. No floating decorations ✓
14. Hero is left-aligned ✓
15. Layouts are varied ✓

**Step 6 — Final slop check:**

Open the site and ask:
- Does it look like a $5,000 custom build or a free AI template?
- Can you immediately tell AI made it?
- Does it have distinctive character or generic polish?

If it still feels AI-generated, keep removing elements until it doesn't.

**Step 7 — Update changelog and commit:**

- Add entry to CHANGELOG.md: "Design improvements: removed AI slop (decorative elements, generic patterns, obvious tells)"
- Commit: "design: remove AI slop and generic patterns"

**Step 8 — Show summary:**

"✅ AI slop removed:
- [X] decorative lines next to labels
- [X] colored pills/badges
- [X] star emoji ratings
- [X] circular team photos
- [X] icon grids
- [X] pill-shaped buttons
- [X] card shadows at rest
- [X] dark overlay hero
- [X] gradient backgrounds
- [X] floating decorations
- [X] generic indigo color
- [X] 'Welcome to' / 'Learn More' copy

This site no longer looks AI-generated."

RULES:

- NEVER leave decorative lines next to labels (the #1 AI tell)
- NEVER keep colored pills above headings (remove or convert to plain text)
- NEVER keep star emoji ratings (testimonials are editorial text only)
- NEVER keep circular team photos (square or 3:4 aspect ratio)
- NEVER keep pill-shaped buttons unless Material style
- NEVER keep shadows on cards at rest (hover only)
- ALWAYS remove, don't just reduce (half-slop is still slop)
- ALWAYS check for ALL items on the slop checklist
- ALWAYS make layouts asymmetric and varied (symmetry = AI)