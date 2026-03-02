Read CLAUDE.md in this repo — specifically the Section Layout Recipes, Homepage Blueprint, and Inner Page Patterns.

The user wants to improve the layout variety and structure of their existing site.

**Step 1 — Audit current layouts:**

Read all HTML files and identify the layout pattern used in each section:

- Centered content with heading → grid below (the default AI pattern)
- Split layout (text left, content right or reversed)
- Staggered grid with offset
- Statement section (big text only, no cards)
- Narrow list (vertically stacked)
- Full-width feature
- Testimonial band

**Step 2 — Identify layout problems:**

Check for these specific issues:

❌ **Repetitive patterns:**
- Same layout recipe used on adjacent sections
- Every section follows "label → heading → 3-card grid"
- Homepage has no variety (all sections look the same top to bottom)

❌ **No visual tension:**
- Everything is centered
- All sections have same max-width
- No asymmetry anywhere
- Equal-width columns (50/50 splits only)

❌ **Missing layout types:**
- No split layouts (text + content side by side)
- No statement sections (big text moment with no cards)
- No staggered grids (all grids perfectly aligned)
- No narrow content sections (everything full container width)

❌ **Poor section rhythm:**
- Sections feel crammed together
- No breathing room between major content blocks
- All sections have identical padding

❌ **Homepage doesn't follow blueprint:**
Should be: Hero → Featured (grid/split) → Statement/Testimonial → Split content → Social proof → CTA banner

**Step 3 — Generate layout report:**

```markdown
# Layout Audit Report

## 🚨 Issues Found

### index.html
- **Section 1 (Hero):** ✅ Good - left-aligned hero
- **Section 2 (Services):** ❌ Centered heading + 3-card grid
- **Section 3 (About):** ❌ Centered heading + 3-card grid (SAME as section 2)
- **Section 4 (Testimonials):** ❌ Centered heading + 3-card grid (SAME AGAIN)
- **Section 5 (CTA):** ✅ Good - CTA banner

**Problem:** Sections 2-4 all use the same layout. No variety.

**Recommendation:**
- Section 2: Keep grid but add grid--offset for stagger
- Section 3: Convert to Recipe 1 (split layout) - text left, image right
- Section 4: Convert to Recipe 6 (testimonial band) - 2 column, no heading needed

### about.html
- **Section 1 (Hero):** ⚠️ Centered hero (should be left-aligned)
- **Section 2 (Story):** ❌ Centered text block (too wide, line length > 80 chars)
- **Section 3 (Team):** ❌ Centered heading + 3-card grid

**Problem:** Everything centered, no layout variety, text blocks too wide.

**Recommendation:**
- Hero: Convert to left-aligned, max-width 42rem
- Story: Use Recipe 1 (split) - story text left (60%), image/timeline right (40%)
- Team: Use Recipe 2 (staggered grid with grid--offset)

### services.html
- All sections use the same narrow list pattern
- ✅ Actually appropriate for a services page
- ⚠️ Could add one split section for featured service

## 📊 Layout Variety Score

- **index.html:** 2/6 sections unique = **33% variety** ❌ Poor
- **about.html:** 0/3 sections unique = **0% variety** ❌ Critical
- **services.html:** ✅ Consistent by design

## 🎯 Recommended Changes

### High Priority:
1. index.html: Diversify sections 2-4 using different recipes
2. about.html: Convert to split layouts and left-align hero
3. Add one statement section (Recipe 3) to index.html for breathing room

### Medium Priority:
4. Mix container widths (72rem, 48rem, 36rem)
5. Vary section padding (some 6rem, some 8rem)
6. Add one full-width feature section (Recipe 5) per page
```

**Step 4 — Ask user for confirmation:**

"I found [X] layout issues. Want me to:

1 — Fix all automatically (apply varied layout recipes)
2 — Fix homepage only
3 — Fix specific pages (tell me which)
4 — Show recommendations only (no changes)"

**Step 5 — Apply layout fixes:**

### Fix Repetitive Patterns

For each section using the same layout:

**BEFORE (all the same):**
```html
<section class="section">
  <div class="container">
    <h2>Section Heading</h2>
    <div class="grid grid--3">
      <div class="card">...</div>
      <div class="card">...</div>
      <div class="card">...</div>
    </div>
  </div>
</section>
```

**AFTER (varied):**

**Section A - Keep grid but add stagger:**
```html
<section class="section">
  <div class="container">
    <h2>Section Heading</h2>
    <p class="text-light mt-md mb-xl" style="max-width: 32rem;">Brief intro.</p>
    <div class="grid grid--3 grid--offset" data-stagger>
      <div class="card animate">...</div>
      <div class="card animate">...</div>
      <div class="card animate">...</div>
    </div>
  </div>
</section>
```

**Section B - Convert to split layout (Recipe 1):**
```html
<section class="section">
  <div class="container">
    <div class="grid grid--2" style="align-items: center; gap: 4rem;">
      <div>
        <h2>Section Heading</h2>
        <p class="text-light mt-md" style="line-height: 1.8; max-width: 32rem;">
          Body text here. Keep it to 2-3 sentences max.
        </p>
        <a href="#" class="btn btn--primary mt-lg">Action</a>
      </div>
      <div>
        <!-- Content: image, hours table, map, etc. -->
      </div>
    </div>
  </div>
</section>
```

**Section C - Convert to testimonial band (Recipe 6):**
```html
<section class="section">
  <div class="container">
    <div class="grid grid--2" data-stagger style="gap: 2rem;">
      <div class="testimonial animate">
        <p class="testimonial__text">"Quote here."</p>
        <p class="testimonial__author">— Name, Title</p>
      </div>
      <div class="testimonial animate">
        <p class="testimonial__text">"Quote here."</p>
        <p class="testimonial__author">— Name, Title</p>
      </div>
    </div>
  </div>
</section>
```

### Fix Centered Everything

**Centered hero → Left-aligned:**

BEFORE:
```html
<section class="hero" style="text-align: center;">
  <div class="container">
    <h1>Headline</h1>
    <p>Description</p>
    <a href="#" class="btn">CTA</a>
  </div>
</section>
```

AFTER:
```html
<section class="hero">
  <div class="container">
    <div class="hero__content" style="max-width: 42rem;">
      <span class="hero__tagline">TAGLINE</span>
      <h1 class="hero__title">Headline</h1>
      <p class="hero__description">Description</p>
      <div class="hero__actions">
        <a href="#" class="btn btn--primary">Primary CTA</a>
        <a href="#" class="btn btn--secondary">Secondary CTA</a>
      </div>
    </div>
  </div>
</section>
```

### Add Statement Sections

Insert a statement section (Recipe 3) between two content-heavy sections:

```html
<section class="section" style="padding: 6rem 0;">
  <div class="container container--narrow text-center">
    <h2 style="font-size: var(--font-size-4xl); letter-spacing: -0.03em; line-height: 1.1;">
      A bold statement that captures the business ethos in one sentence.
    </h2>
    <hr class="divider divider--center mt-xl" />
  </div>
</section>
```

**Placement:** Between sections 2 and 3, or 3 and 4 on homepage.

### Mix Container Widths

Vary the container widths throughout the page:

- Hero: 72rem (container)
- Features grid: 72rem (container)
- Statement: 48rem (container--narrow)
- About split: 72rem (container)
- Testimonials: 64rem (container--medium)
- Services list: 48rem (container--narrow)

**Update HTML:**
```html
<div class="container container--narrow">
  <!-- Narrow content, max 48rem -->
</div>
```

Add these to CSS if not present:
```css
.container--narrow {
  max-width: 48rem;
}

.container--medium {
  max-width: 64rem;
}
```

### Vary Section Padding

Don't use the same padding everywhere:

```css
/* Standard section */
.section {
  padding: 6rem 0;
}

/* Breathing room section (statement, testimonials) */
.section--spacious {
  padding: 8rem 0;
}

/* Compact section (footer CTA, narrow content) */
.section--compact {
  padding: 4rem 0;
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .section { padding: 3rem 0; }
  .section--spacious { padding: 4rem 0; }
  .section--compact { padding: 2rem 0; }
}
```

### Apply Homepage Blueprint

Ensure index.html follows this structure:

```
1. HERO (left-aligned, 60vh min, staggered entrance)
2. FEATURED CONTENT (Recipe 2 staggered grid OR Recipe 5 full-width)
3. STATEMENT or TESTIMONIAL (Recipe 3 or 6) — text only, no cards
4. SPLIT CONTENT (Recipe 1) — hours+map OR team preview OR process
5. SOCIAL PROOF (Recipe 6) — if not used in position 3
6. CTA BANNER (dark bg, centered, one button)
```

**Step 6 — Validate layout variety:**

After fixes, re-scan the page:

1. Are there at least 3 different layout recipes visible on homepage?
2. Are any adjacent sections using the same layout? (should be NO)
3. Is the hero left-aligned (unless style requires centered)?
4. Is there at least one statement section (Recipe 3) for breathing room?
5. Do container widths vary throughout the page?
6. Does section padding vary (some 6rem, some 8rem)?

**Step 7 — Mobile check:**

Verify all new layouts work on mobile (375px):

- Split layouts collapse to single column
- Grid--2 and grid--3 become 1-column
- Hero text is readable
- Statement section font-size scales down
- No horizontal scroll

**Step 8 — Update changelog and commit:**

- Add entry to CHANGELOG.md: "Layout improvements: added variety using different section recipes, improved visual hierarchy"
- Commit: "design: improve layout variety and structure"

**Step 9 — Show summary:**

"✅ Layout improvements complete:
- [X] sections redesigned with varied layouts
- [X] homepage now follows blueprint structure
- Added [X] split layouts
- Added [X] statement sections
- Added [X] staggered grids

Layout variety score: [before]% → [after]%"

RULES:

- NEVER use the same layout recipe on adjacent sections
- ALWAYS use at least 3 different recipes per page
- ALWAYS include one statement section (Recipe 3) per page for breathing room
- NEVER make all sections the same width — mix 72rem, 48rem, 36rem
- ALWAYS preserve data-bind attributes and site-data.json references
- ALWAYS test on mobile (collapse grids, stack splits)
- ALWAYS follow the Homepage Blueprint from CLAUDE.md for index.html