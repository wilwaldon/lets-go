Read CLAUDE.md in this repo — specifically the Typography rules in the Design Rules section.

The user wants to improve typography, spacing, and visual hierarchy on their site.

**Step 1 — Audit current typography:**

Read all HTML and CSS files. Check:

### Font Settings:
- h1 font-size (mobile and desktop)
- h2 font-size (mobile and desktop)
- Body font-size
- Line-height on headings and body
- Letter-spacing on headings
- Font-weight on headings vs body vs labels
- Max-width on text blocks

### Spacing Settings:
- Section padding (top/bottom)
- Card internal padding
- Grid gaps
- Heading to content spacing
- Paragraph spacing

**Step 2 — Identify typography problems:**

❌ **Headings too small:**
- h1 under 3rem on desktop
- h2 under 2rem on desktop
- All headings the same size (no hierarchy)

❌ **Letter-spacing issues:**
- Headings have default (loose) letter-spacing
- Should be tight: -0.03em for h1, -0.02em for h2

❌ **Line-height issues:**
- Body text line-height under 1.7 (feels cramped)
- Heading line-height over 1.2 (feels loose)

❌ **Weight contrast missing:**
- Same font-weight used for headings and body
- No distinction between heading (700-800), body (400), labels (500)

❌ **Text too wide:**
- Body text runs full container width (> 80 characters per line)
- No max-width on text blocks

❌ **Font scaling issues:**
- Same font-size on mobile and desktop (no responsive scaling)
- Text too large on mobile or too small on desktop

❌ **Spacing too tight:**
- Section padding under 4rem on desktop
- Card padding under 1.5rem
- Grid gaps under 2rem
- No space between heading and content below it

**Step 3 — Generate typography report:**

```markdown
# Typography & Spacing Audit Report

## 🚨 Issues Found

### Font Sizes
- **h1:** 2.5rem desktop ⚠️ Too small (should be 3.5rem+)
- **h1 mobile:** 2rem ✅ Good
- **h2:** 1.75rem ❌ Too small (should be 2rem+)
- **Body:** 1rem (16px) ✅ Good
- **Scaling:** Static sizes ❌ Needs responsive scaling

### Letter-Spacing
- **h1:** 0em (default) ❌ Too loose (should be -0.03em)
- **h2:** 0em (default) ❌ Too loose (should be -0.02em)
- **h3:** 0em ✅ Acceptable

### Line-Height
- **h1:** 1.3 ⚠️ Slightly loose (should be 1.1)
- **h2:** 1.4 ⚠️ Slightly loose (should be 1.1-1.15)
- **Body:** 1.5 ❌ Too tight (should be 1.7-1.8)

### Font-Weight
- **h1:** 700 ✅ Good
- **h2:** 700 ✅ Good
- **Body:** 400 ✅ Good
- **Nav/labels:** 400 ⚠️ Should be 500 for contrast

### Text Width
- **Body paragraphs:** Full container width (72rem) ❌ Too wide
- **Line length:** ~120 characters ❌ Should be 65-70 (36rem max-width)

### Spacing
- **Section padding:** 4rem desktop ⚠️ Should be 6rem+ for breathing room
- **Section padding mobile:** 3rem ✅ Good
- **Card padding:** 1rem ❌ Too cramped (should be 1.5rem+)
- **Grid gap:** 1rem ❌ Too tight (should be 2rem+)
- **Heading to content:** 0.5rem ❌ Too tight (should be 1.5rem)

## 📊 Typography Score

- Font sizes: ⚠️ Needs improvement
- Letter-spacing: ❌ Default (not tightened)
- Line-height: ⚠️ Suboptimal
- Font-weight: ✅ Good
- Text width: ❌ Too wide
- Spacing: ⚠️ Too tight in places

**Overall: C-**

## 🎯 Recommended Fixes

### High Priority:
1. Tighten letter-spacing on h1 (-0.03em) and h2 (-0.02em)
2. Increase body line-height to 1.7-1.8
3. Add max-width: 36rem to all text blocks
4. Increase h1 to 3.5rem+ on desktop

### Medium Priority:
5. Increase section padding to 6rem on desktop
6. Increase card padding to 1.5rem
7. Increase grid gaps to 2rem
8. Add 1.5rem spacing between headings and content

### Low Priority:
9. Responsive font scaling (fluid typography)
10. Increase nav/label weight to 500
```

**Step 4 — Ask user for confirmation:**

"I found [X] typography issues. Want me to:

1 — Fix all automatically
2 — Fix critical issues only (headings and spacing)
3 — Show recommendations only (no changes)"

**Step 5 — Apply typography fixes:**

### Fix Font Sizes

Update CSS variables in `css/variables.css`:

```css
:root {
  /* Desktop sizes */
  --font-size-h1: 3.5rem;  /* was 2.5rem */
  --font-size-h2: 2rem;    /* was 1.75rem */
  --font-size-h3: 1.5rem;
  --font-size-body: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-xs: 0.75rem;

  /* Responsive scaling */
  @media (max-width: 1024px) {
    --font-size-h1: 2.75rem;
  }

  @media (max-width: 767px) {
    --font-size-h1: 2rem;
    --font-size-h2: 1.5rem;
  }
}
```

Or add responsive typography with clamp:
```css
:root {
  --font-size-h1: clamp(2rem, 5vw, 3.5rem);
  --font-size-h2: clamp(1.5rem, 3.5vw, 2rem);
}
```

### Fix Letter-Spacing

Add to `css/styles.css`:

```css
h1, .h1 {
  letter-spacing: -0.03em;
}

h2, .h2 {
  letter-spacing: -0.02em;
}

h3, .h3 {
  letter-spacing: -0.01em;
}
```

Or add to specific heading styles if they exist.

### Fix Line-Height

Update in `css/variables.css` or `css/styles.css`:

```css
:root {
  --line-height-tight: 1.1;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
  --line-height-loose: 1.8;
}

h1, h2, h3, h4, h5, h6 {
  line-height: var(--line-height-tight);
}

p, li {
  line-height: var(--line-height-relaxed);
}
```

### Fix Font-Weight

Ensure contrast:

```css
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}

body, p {
  font-weight: 400;
}

nav a, label, .label, .nav__link {
  font-weight: 500;
}

strong, b {
  font-weight: 600;
}
```

### Fix Text Width

Add max-width to text blocks:

**Update HTML - wrap text in max-width container:**

BEFORE:
```html
<section class="section">
  <div class="container">
    <h2>Heading</h2>
    <p>Long paragraph that runs full container width...</p>
  </div>
</section>
```

AFTER:
```html
<section class="section">
  <div class="container">
    <div class="text-content" style="max-width: 36rem;">
      <h2>Heading</h2>
      <p>Long paragraph now constrained to readable width...</p>
    </div>
  </div>
</section>
```

Or add a utility class:

```css
.text-content {
  max-width: 36rem; /* ~65 characters at 16px */
}

.text-content--wide {
  max-width: 48rem; /* for longer-form content */
}
```

Apply to:
- About page paragraphs
- Hero descriptions
- Section introductions
- Any body text that's not in a grid/split layout

### Fix Spacing

**Section padding:**

```css
.section {
  padding: 6rem 0; /* was 4rem */
}

@media (max-width: 767px) {
  .section {
    padding: 3rem 0;
  }
}

/* Optional variations */
.section--spacious {
  padding: 8rem 0;
}

.section--compact {
  padding: 4rem 0;
}
```

**Card padding:**

```css
.card {
  padding: 1.5rem; /* was 1rem */
}

@media (min-width: 768px) {
  .card {
    padding: 2rem;
  }
}
```

**Grid gaps:**

```css
.grid {
  gap: 2rem; /* was 1rem */
}

.grid--tight {
  gap: 1.5rem;
}

.grid--loose {
  gap: 3rem;
}
```

**Heading to content spacing:**

Update HTML or CSS:

```css
h2 {
  margin-bottom: 1.5rem;
}

h2 + p,
h2 + .grid,
h2 + .text-content {
  margin-top: 1.5rem;
}

/* Or use utility classes */
.mt-md { margin-top: 1rem; }
.mt-lg { margin-top: 1.5rem; }
.mt-xl { margin-top: 2rem; }
```

### Responsive Typography Scale

Add fluid typography for smooth scaling:

```css
:root {
  /* Fluid type scale */
  --font-size-h1: clamp(2rem, 4vw + 1rem, 3.5rem);
  --font-size-h2: clamp(1.5rem, 2.5vw + 1rem, 2rem);
  --font-size-h3: clamp(1.25rem, 1.5vw + 1rem, 1.5rem);
  --font-size-body: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
}
```

This scales smoothly between mobile and desktop without breakpoints.

**Step 6 — Validate typography improvements:**

After fixes, check:

1. h1 is at least 3.5rem on desktop, 2rem on mobile ✓
2. Letter-spacing is tight on all headings (-0.03em h1, -0.02em h2) ✓
3. Body text line-height is 1.7-1.8 ✓
4. All text blocks have max-width ~36rem ✓
5. Section padding is 6rem+ on desktop, 3rem on mobile ✓
6. Card padding is 1.5rem+ ✓
7. Grid gaps are 2rem+ ✓
8. Headings have 1.5rem spacing to content below ✓

**Step 7 — Visual hierarchy check:**

Open the homepage and verify:

- Hero h1 feels BIG and impactful
- Section h2 feels distinctly smaller than h1 but still prominent
- Body text feels readable and comfortable
- Clear visual distinction between headings and body
- Page feels spacious, not cramped
- Text blocks don't feel too wide

**Step 8 — Update changelog and commit:**

- Add entry to CHANGELOG.md: "Typography improvements: tightened letter-spacing, improved font scaling, increased line-height and spacing for better readability"
- Commit: "design: improve typography and spacing"

**Step 9 — Show summary:**

"✅ Typography improvements complete:
- Tightened letter-spacing on headings
- Increased h1 from [before] to [after]
- Improved body line-height to 1.7
- Constrained text blocks to 36rem max-width
- Increased section padding to 6rem
- Increased card padding to 1.5rem
- Increased grid gaps to 2rem

Typography score: [before] → [after]"

RULES:

- NEVER make headings smaller (only make them bigger for hierarchy)
- NEVER reduce line-height on body text below 1.5
- NEVER let text blocks exceed 80 characters per line (36rem max-width)
- ALWAYS tighten letter-spacing on headings (tight = premium)
- ALWAYS maintain mobile font sizes (16px minimum for body)
- ALWAYS test on multiple screen sizes (375px, 768px, 1440px)
- ALWAYS preserve existing CSS class structure (just update values)