Read CLAUDE.md in this repo — specifically the Coding Conventions section on Accessibility.

The user wants a comprehensive accessibility (a11y) audit of their site to ensure it meets WCAG AA standards and is usable by everyone.

**Step 1 — Collect all files:**

Read all .html files (or React components if full-stack) and CSS files to audit accessibility.

**Step 2 — Run comprehensive accessibility checks:**

### 2A — Color Contrast Audit

Scan CSS variables and site-data.json theme colors. Check all text/background combinations:

**Required ratios (WCAG AA):**
- Normal text (< 18px): 4.5:1 minimum
- Large text (≥ 18px or ≥ 14px bold): 3:1 minimum
- UI components (buttons, borders): 3:1 minimum

**Check these combinations:**
- Body text on white background
- Body text on alt background (var(--color-bg-alt))
- Heading text on backgrounds
- Button text on button background (primary and secondary)
- Link color vs background
- Navigation text on header background
- Footer text on footer background
- Form placeholder text
- Disabled/secondary text colors

**Generate contrast report:**
```
Color A (#hexcode) on Color B (#hexcode): X.X:1
Status: ✅ Pass AA / ⚠️ Pass but close / ❌ Fail
```

### 2B — Semantic HTML Structure

Check for proper semantic HTML:

**Required elements:**
- [ ] `<header>` wraps site header/nav
- [ ] `<nav>` wraps navigation links
- [ ] `<main>` wraps main content (one per page)
- [ ] `<section>` for major content sections
- [ ] `<article>` for self-contained content
- [ ] `<aside>` for sidebars/tangential content
- [ ] `<footer>` wraps site footer

**Heading hierarchy:**
- [ ] One `<h1>` per page (usually hero headline)
- [ ] Headings follow sequential order (h1 → h2 → h3, no skipping)
- [ ] No heading used for styling purposes only

**Lists:**
- [ ] Navigation uses `<ul>` and `<li>`
- [ ] Content lists use `<ul>`, `<ol>`, or `<dl>` appropriately

### 2C — Images & Media

Check every `<img>` tag:
- [ ] Has `alt` attribute (not just alt="")
- [ ] Alt text is descriptive and meaningful
- [ ] Decorative images use alt=""
- [ ] No text content in images (or alt describes the text)

Check every `<video>` and `<audio>`:
- [ ] Has captions/transcripts available
- [ ] Has controls attribute
- [ ] Doesn't autoplay with sound

### 2D — Forms

Check every form element:
- [ ] Every `<input>`, `<select>`, `<textarea>` has associated `<label>`
- [ ] Labels use `for` attribute matching input `id`, OR wrap the input
- [ ] Required fields marked with `required` attribute and visual indicator
- [ ] Error messages associated via `aria-describedby`
- [ ] Placeholder text NOT used as label replacement
- [ ] Input types are semantic (type="email", type="tel", type="number")
- [ ] Field groups use `<fieldset>` and `<legend>` where appropriate

### 2E — Interactive Elements

**Keyboard navigation:**
- [ ] All interactive elements keyboard accessible (links, buttons, form fields)
- [ ] Logical tab order (matches visual order)
- [ ] Focus visible on all interactive elements (focus ring visible)
- [ ] No keyboard traps (can tab in and out)
- [ ] Skip to main content link (optional but recommended)

**Buttons vs Links:**
- [ ] `<button>` used for actions (submit, open modal, toggle menu)
- [ ] `<a>` used for navigation (going to another page/section)
- [ ] No `<div>` or `<span>` used as buttons without proper ARIA

**Touch targets:**
- [ ] All interactive elements ≥ 44px × 44px (mobile)
- [ ] Adequate spacing between adjacent touch targets

### 2F — ARIA & Landmarks

**ARIA labels:**
- [ ] Icon-only buttons have `aria-label` (e.g., hamburger menu, close button)
- [ ] External links indicate they open new window (`aria-label` or visible text)
- [ ] Current page indicated in nav (`aria-current="page"`)

**Live regions:**
- [ ] Form errors announced via `aria-live="polite"` or `role="alert"`
- [ ] Loading states announced

**Modal/Dialog:**
- [ ] Uses `role="dialog"` or `<dialog>` element
- [ ] Has `aria-labelledby` pointing to modal title
- [ ] Traps focus inside modal when open
- [ ] Closes on Escape key
- [ ] Returns focus to trigger element on close

### 2G — Language & Readability

- [ ] `<html lang="en">` attribute set
- [ ] Content written at appropriate reading level
- [ ] Jargon and abbreviations explained or avoided
- [ ] Font size ≥ 16px for body text (mobile)
- [ ] Line height ≥ 1.5 for body text
- [ ] Paragraph width ≤ 80 characters for readability

### 2H — Motion & Animations

- [ ] Respects `prefers-reduced-motion` media query
- [ ] Critical content not hidden behind animations
- [ ] No auto-playing animations > 5 seconds
- [ ] Parallax scrolling effects optional (or disabled for reduced motion)

**Step 3 — Generate detailed accessibility report:**

```markdown
# Accessibility Audit Report

## 🔴 Critical Issues (WCAG AA Failures)

### Color Contrast
- **Body text (#64748b) on white (#ffffff):** 6.8:1 ✅ Pass
- **Primary button text (#ffffff) on button bg (#2563EB):** 4.5:1 ✅ Pass
- **Secondary button text (#64748b) on white (#ffffff):** 6.8:1 ✅ Pass
- **Link color (#2563EB) on white (#ffffff):** 8.2:1 ✅ Pass
- **Footer text (#9ca3af) on footer bg (#1f2937):** 2.9:1 ❌ FAIL (needs 4.5:1)

### Missing Alt Text
- **index.html, line 147:** `<img src="team-1.jpg">` has no alt attribute
- **services.html, line 89:** `<img src="service-icon.svg" alt="">` — should describe icon

### Form Labels
- **contact.html, line 234:** Email input has no associated label
- **contact.html, line 241:** Message textarea uses placeholder as label

### Keyboard Navigation
- **index.html, line 67:** Mobile menu toggle has no focus ring (check CSS)
- **index.html, line 203:** Card links missing visible focus state

## ⚠️ Warnings (Best Practice Improvements)

### Heading Hierarchy
- **about.html:** Skips from h2 to h4 (line 156)
- **services.html:** Multiple h1 tags found (should be one per page)

### Touch Targets
- **index.html, line 89:** Navigation links are 38px tall on mobile (recommend 44px)
- **contact.html, line 193:** Social media icons are 32×32px (recommend 44×44)

### ARIA Labels
- **All pages:** Hamburger menu button missing `aria-label="Open navigation menu"`
- **All pages:** External links don't indicate they open in new window

### Motion
- No `prefers-reduced-motion` media query found
- Hero animations play for all users

## ✅ Passed Checks

- Semantic HTML structure ✓
- One main element per page ✓
- Navigation uses proper list markup ✓
- Forms use semantic input types ✓
- Modal focus trap implemented ✓
- Language attribute set ✓

## 📊 Accessibility Score

- Color Contrast: 6/7 pass (85.7%)
- Semantic HTML: ✅ Pass
- Images: 4/12 missing alt text (66.7%)
- Forms: 2/3 proper labels (66.7%)
- Keyboard Nav: ⚠️ Needs improvement
- ARIA: ⚠️ Some missing

**Overall WCAG AA Compliance: 75% (C)**

## 🎯 Priority Fixes

### High Priority (Do First):
1. Fix footer text contrast (#9ca3af → #d1d5db)
2. Add alt attributes to all images
3. Add labels to email and message form fields
4. Add aria-label to mobile menu button

### Medium Priority:
5. Fix heading hierarchy (no skipping levels)
6. Increase touch targets to 44px minimum
7. Add visible focus states to all interactive elements
8. Add prefers-reduced-motion support

### Low Priority (Nice to Have):
9. Add skip to main content link
10. Indicate external links with icon or text
11. Add aria-current to active nav item
```

**Step 4 — Present the report and ask:**

"I found [X] critical accessibility issues and [Y] warnings. Want me to:

1 — Fix all critical issues automatically
2 — Fix critical + warnings (comprehensive)
3 — Just show me the report (I'll fix manually)
4 — Fix specific items (tell me which ones)"

**Step 5 — Apply fixes based on their choice:**

### Fix Color Contrast Issues

For each failing color combination:

**Calculate the required color:**
Use the contrast ratio formula to find the minimum darkness/lightness needed.

**Common fixes:**
- Text too light on white: darken from #94a3b8 → #64748b → #475569
- Footer text too light on dark: lighten from #9ca3af → #d1d5db → #e5e7eb
- Button text on brand color: if primary color fails, lighten text or darken background

**Apply the fix:**
- Update CSS variables in `css/variables.css` (static sites)
- Update `site-data.json` theme colors if affected
- Update tailwind.config.ts colors (full-stack)

### Fix Missing Alt Text

For each image without alt:

**Determine image purpose:**
1. **Decorative** (just visual interest) → `alt=""`
2. **Informative** (conveys meaning) → descriptive alt text
3. **Functional** (link/button image) → describe action
4. **Text in image** → alt text matches the text

**Write good alt text:**
- Describe what's in the image, not "image of" or "picture of"
- Keep it concise (< 125 characters ideally)
- Include context if it matters
- Team photos: "Jordan Smith, Lead Stylist" not "A person smiling"
- Hero images: Often decorative, alt=""
- Menu item photos: "Margherita pizza with fresh basil and mozzarella"

**Apply the fix:**
Add or update alt attributes in all HTML files.

### Fix Form Labels

For each unlabeled input:

**Add proper label:**
```html
<!-- BEFORE (wrong) -->
<input type="email" placeholder="Your email">

<!-- AFTER (correct) -->
<label for="email">Email</label>
<input type="email" id="email" name="email" placeholder="you@example.com">
```

Or wrap the input:
```html
<label>
  Email
  <input type="email" name="email" placeholder="you@example.com">
</label>
```

**For required fields:**
```html
<label for="email">
  Email <span aria-label="required">*</span>
</label>
<input type="email" id="email" name="email" required>
```

**For fields with error messages:**
```html
<label for="email">Email</label>
<input type="email" id="email" name="email" aria-describedby="email-error" aria-invalid="true">
<span id="email-error" role="alert">Please enter a valid email address</span>
```

### Fix Keyboard Navigation

**Add focus rings to all interactive elements:**

In `css/styles.css`, ensure these exist:
```css
/* Visible focus for all interactive elements */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove default outline only when custom is present */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Specific focus states */
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  transform: translateY(-4px);
}
```

### Fix ARIA Labels

**Mobile menu button:**
```html
<!-- BEFORE -->
<button class="nav__toggle">
  <span></span>
  <span></span>
  <span></span>
</button>

<!-- AFTER -->
<button class="nav__toggle" aria-label="Open navigation menu" aria-expanded="false">
  <span></span>
  <span></span>
  <span></span>
</button>
```

**Icon-only buttons:**
```html
<button aria-label="Close">
  <svg><!-- close icon --></svg>
</button>
```

**Active navigation item:**
```html
<nav>
  <ul>
    <li><a href="index.html" aria-current="page">Home</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
</nav>
```

**External links:**
```html
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
  Facebook <span class="sr-only">(opens in new window)</span>
</a>
```

Add this CSS for screen-reader-only text:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Fix Touch Targets

**Increase button/link size on mobile:**

In `css/styles.css`:
```css
@media (max-width: 767px) {
  /* Navigation links */
  .nav__link {
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  /* Buttons */
  .btn {
    min-height: 44px;
    padding: 0.75rem 1.5rem;
  }

  /* Icon buttons (social, menu) */
  .icon-btn {
    min-width: 44px;
    min-height: 44px;
    padding: 0.625rem;
  }

  /* Card links */
  .card a {
    min-height: 44px;
  }
}
```

### Fix Heading Hierarchy

**Scan the page structure and renumber headings:**

If you find:
```html
<h2>About Us</h2>
<h4>Our Story</h4>
```

Fix to:
```html
<h2>About Us</h2>
<h3>Our Story</h3>
```

**Ensure one h1 per page:**
- Usually the hero headline
- If multiple h1s found, demote extras to h2

### Add Reduced Motion Support

**Add to css/styles.css:**

```css
/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Still allow some subtle transitions */
  a:hover,
  button:hover,
  .btn:hover {
    transition-duration: 150ms !important;
  }
}
```

### Add Skip to Main Content Link

**Add at the very top of <body> in every HTML file:**

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <header>...</header>

  <main id="main">...</main>
</body>
```

**Add to css/styles.css:**

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

**Step 6 — Re-run the audit:**

After applying fixes, run all checks again to verify:
- All color contrasts now pass
- All images have alt text
- All forms have labels
- Focus visible on all interactive elements
- Heading hierarchy is sequential
- Touch targets meet 44px minimum
- ARIA labels added where needed

**Step 7 — Update changelog and commit:**

- Add entry to CHANGELOG.md: "Accessibility improvements: fixed color contrast, added alt text, improved keyboard navigation, WCAG AA compliance"
- Commit: "a11y: improve accessibility to WCAG AA standards"

**Step 8 — Show summary:**

"✅ Accessibility audit complete. Fixed:
- [X] color contrast issues
- [X] missing alt text
- [X] form labels
- [X] keyboard navigation
- [X] touch targets
- [X] ARIA labels

**New WCAG AA Compliance Score: [X]% ([grade])**

Want me to run a full audit again to verify everything passes?"

**Optional Step 9 — Generate accessibility statement:**

Offer to create an `accessibility.html` page with:
- Commitment to accessibility
- Current compliance level (WCAG AA)
- Known issues (if any remain)
- Contact for accessibility concerns
- Last audit date

RULES:

- NEVER reduce color contrast below WCAG AA minimums
- NEVER use color alone to convey information (use icons, text, patterns too)
- NEVER remove focus indicators (just style them nicely)
- NEVER use placeholder as label replacement
- ALWAYS test with keyboard (Tab, Enter, Escape, Arrow keys)
- ALWAYS use semantic HTML before adding ARIA
- ALWAYS prefer visible text over aria-label when possible
- ALWAYS maintain logical tab order (matches visual order)
