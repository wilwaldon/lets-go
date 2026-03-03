Read CLAUDE.md in this repo, and read .claude/commands/letsgo.md for the full design style definitions.

The user wants to switch their site to a different design style without starting over.

**Available styles:**

1. **Editorial** — Serif headings, dramatic scale, thin rules, minimal color, italic labels
2. **Modern Minimal** — Clean sans-serif, tight tracking, generous space, subtle hovers
3. **Bold & Confident** — Dark mode, massive uppercase hero, mixed type (fill + outline + accent), sharp corners
4. **Warm & Approachable** — Rounded corners, warm palette, friendly copy, soft hover shadows
5. **Classic Professional** — Conservative sizing, muted colors, no animations, text-heavy
6. **Material** — Tonal surfaces, elevation shadows, 12px card radius, light heading weights
7. **Kinetic** — Oversized variable fonts, scroll-reactive typography, dynamic scaling
8. **Glass** — Apple Liquid Glass aesthetic, translucent surfaces, frosted blur effects
9. **Brutal** — Neo-brutalism, harsh borders, intentional chaos, high contrast

**SHORTCUT CHECK:** The user may have specified the style in their message:
- "switch to editorial" or "style 1"
- "switch to bold" or "style 3"
- "material" or "6"

If detected, skip the question and go directly to applying that style.

**Step 1 — Identify current style:**

Read the current site's CSS and HTML to determine which style (if any) is currently applied. Check:
- CSS variables (colors, fonts, spacing)
- Component styles (buttons, cards, typography)
- Layout patterns
- Color palette

**Step 2 — Ask which style they want:**

"Which design style do you want?

1 — Editorial — Magazine-inspired. Big serif headings, generous whitespace, left-aligned layouts, dramatic scale contrast. Feels like a Monocle feature.

2 — Modern Minimal — Clean sans-serif, tight letter-spacing, plenty of breathing room, subtle hover states. Feels like Linear or Stripe's marketing site.

3 — Bold & Confident — FULL DARK MODE. Oversized uppercase headings (6.5rem+), strong color blocking, sharp edges, high contrast. Feels like a creative agency portfolio. Primary color background sections.

4 — Warm & Approachable — Rounded corners, warm neutral palette, friendly copy, soft shadows on hover only. Feels like a neighborhood shop you trust.

5 — Classic Professional — Conservative spacing, traditional layout, muted colors, no animations beyond hover states. Feels like a law firm or financial advisor.

6 — Material — Google-inspired. Tonal color surfaces, elevation shadows instead of borders, systematic spacing, light heading weights, filled cards. Feels like a polished Google product page.

7 — Kinetic — Oversized variable fonts with dynamic weight and width. Scroll-reactive typography that responds to user interaction. Modern and experimental.

8 — Glass — Apple Liquid Glass aesthetic. Translucent surfaces with backdrop blur, frosted glass effects, subtle depth. Premium and refined.

9 — Brutal — Neo-brutalism. Harsh black borders, intentional chaos, grid-breaking layouts, raw HTML energy. Bold and unapologetic.

Enter a number (1-9):"

**Step 3 — Read the style file:**

Once style is chosen, read the complete style CSS from:
- `templates/static/styles/style-editorial.css` (for style 1)
- `templates/static/styles/style-modern-minimal.css` (for style 2)
- `templates/static/styles/style-bold.css` (for style 3)
- `templates/static/styles/style-warm.css` (for style 4)
- `templates/static/styles/style-classic.css` (for style 5)
- `templates/static/styles/style-material.css` (for style 6)
- `templates/static/styles/style-kinetic.css` (for style 7)
- `templates/static/styles/style-glass.css` (for style 8)
- `templates/static/styles/style-brutal.css` (for style 9)

The style file contains:
1. `:root` block with CSS variable overrides (colors, fonts, spacing)
2. Complete component overrides (buttons, cards, nav, hero, footer, forms, etc.)

**Step 4 — Apply the style CSS:**

### 4A — Update CSS variables

Read the `:root` block from the style file. APPEND it to the project's `css/variables.css` (after the base tokens, so it overrides them).

Example:
```css
/* Base variables (already in variables.css) */
:root {
  --color-primary: #2563eb;
  --font-size-h1: 2.5rem;
}

/* Style overrides (appended from style file) */
:root {
  --color-primary: #ea580c; /* overrides base */
  --font-size-h1: 3.5rem;   /* overrides base */
}
```

### 4B — Update component styles

Copy EVERYTHING ELSE from the style file (all component rules) and APPEND it to the end of `css/styles.css`.

The style file's rules have equal or higher specificity than base styles, so they override automatically.

**DO NOT manually write CSS.** The style file IS the implementation. Just append it.

**Step 5 — Update site-data.json:**

Update theme colors to match the style:

```json
{
  "theme": {
    "primaryColor": "#ea580c",    // from style's --color-primary
    "secondaryColor": "#1e293b",  // from style's --color-secondary
    "bgColor": "#ffffff",         // from style's --color-bg
    "textColor": "#1a1a1a"        // from style's --color-text
  }
}
```

**Step 6 — Update favicon.svg:**

Change the rect fill to match the new `--color-primary`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="12" fill="#ea580c"/>
  <text x="50" y="70" font-size="60" font-weight="700" text-anchor="middle" fill="white">B</text>
</svg>
```

**Step 7 — Style-specific HTML changes:**

Some styles require structural HTML changes:

### Style 3 — Bold & Confident (DARK MODE)

This is a FULL DARK MODE redesign. Make these changes:

**1. Update body background:**
```css
/* Add to the appended style CSS or update existing */
body {
  background: #0a0a0a;
  color: #ffffff;
}
```

**2. Update hero structure:**
The hero must be 90-95vh with MASSIVE uppercase title.

```html
<section class="hero" style="min-height: 90vh;">
  <div class="container">
    <div class="hero__content">
      <span class="hero__tagline">SMALL TRACKED UPPERCASE</span>
      <h1 class="hero__title">
        MASSIVE UPPERCASE HEADING
        <span class="text-accent">WITH ACCENT</span>
        <span class="text-outline">AND OUTLINE</span>
      </h1>
      <p class="hero__description">Subdued description, max-width 28rem.</p>
      <div class="hero__actions">
        <a href="#" class="btn btn--primary">Primary CTA</a>
        <a href="#" class="btn btn--secondary">Ghost CTA</a>
      </div>
    </div>
  </div>
</section>
```

**3. Add accent words:**
Wrap 1-2 key words in hero title with `<span class="text-accent">` for primary color.
Optionally wrap 1 word with `<span class="text-outline">` for outline treatment.

**4. Update section backgrounds:**
- Default sections: `background: #0a0a0a`
- Alt sections (section--alt): `background: #141414`
- Impact sections (section--impact): `background: var(--color-primary)` with black text

**5. Update all text colors:**
- Headings: `color: #ffffff`
- Body: `color: rgba(255,255,255,0.6)`
- Secondary: `color: rgba(255,255,255,0.4)`

**6. Update cards, forms, footer:**
- Cards: `background: #141414`, `border: 1px solid rgba(255,255,255,0.12)`
- Forms: `background: #141414`, white text, subdued placeholder
- Footer: `background: #000000`

**7. Team photos:**
Add grayscale filter by default, color on hover:
```css
.team-photo {
  filter: grayscale(100%);
  transition: filter 250ms ease;
}

.team-photo:hover {
  filter: grayscale(0%);
}
```

The style CSS file handles most of this, but check for inline styles or hardcoded colors in HTML that may conflict.

### Style 1 — Editorial

**1. Add horizontal rules between sections:**

```html
<section class="section">
  <!-- content -->
</section>
<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0;">
<section class="section">
  <!-- content -->
</section>
```

**2. Remove background color alternation:**
Remove `class="section--alt"` from sections. Editorial uses white background throughout with rules for separation.

### Style 6 — Material

**1. Update cards to filled style:**
Remove any `border` attributes from card elements in HTML (the CSS handles it).

**2. Use tonal surfaces:**
The style CSS applies `background: #f8f9fa` to cards automatically.

**3. Add elevation shadows:**
The style CSS adds appropriate shadows (Level 1 at rest, Level 2 on hover).

### Style 5 — Classic Professional

**1. Remove animations:**
Remove `class="animate"` and `data-stagger` from all elements.

```html
<!-- BEFORE -->
<div class="grid grid--3" data-stagger>
  <div class="card animate">...</div>
</div>

<!-- AFTER -->
<div class="grid grid--3">
  <div class="card">...</div>
</div>
```

**2. Simplify layouts:**
Classic style prefers straightforward layouts. No need for staggered grids or dramatic asymmetry.

### Style 2 — Modern Minimal & Style 4 — Warm & Approachable

No major HTML changes needed. The CSS handles everything.

**Step 8 — Run link validation:**

```bash
echo "=== Link Validation ==="
HTML_FILES=$(find . -name "*.html" -not -path "./.git/*")
for file in $HTML_FILES; do
  grep -oP 'href="([^"#]+\.html)"' "$file" | grep -oP '"[^"]+"' | tr -d '"' | while read link; do
    if [ ! -f "./$link" ]; then
      echo "BROKEN: $file links to $link"
    fi
  done
done
echo "=== Done ==="
```

Fix any broken links.

**Step 9 — Test the new style:**

1. Open index.html at different viewport widths (375px, 768px, 1440px)
2. Check that colors have updated
3. Check that typography reflects the new style
4. Check that components (buttons, cards) match the style
5. For Bold style: verify dark mode is working, all text is visible
6. For Material: verify cards have filled backgrounds and elevation
7. For Editorial: verify rules between sections, serif headings
8. For Classic: verify animations are removed
9. Test all hover states
10. Test mobile menu

**Step 10 — Update changelog and commit:**

- Add entry to CHANGELOG.md: "Style switch: Changed from [old] to [new style name] — updated colors, typography, and component styles"
- Commit: "design: switch to [style name] design style"

**Step 11 — Show summary:**

"✅ Style switched to **[Style Name]**

Changes applied:
- Updated CSS variables (colors, fonts, spacing)
- Updated component styles (buttons, cards, nav, hero, footer)
- Updated site-data.json theme colors
- Updated favicon.svg color
- [Style-specific changes if any]

The site now uses the [Style Name] design system."

**Comparison (if helpful):**

"**Before:** [description of old style or 'generic base style']
**After:** [key characteristics of new style]"

RULES:

- NEVER manually write CSS from style descriptions — USE THE STYLE FILE
- ALWAYS append the style CSS (don't replace base styles)
- ALWAYS update site-data.json theme colors to match
- ALWAYS update favicon.svg to match new primary color
- ALWAYS test at multiple viewport sizes after switching
- ALWAYS run link validation after HTML changes
- For Bold & Confident: verify FULL dark mode (all text visible on dark bg)
- For Material: don't remove borders manually — the style CSS handles it
- For Classic: remove ALL animations (class="animate", data-stagger)
- For Editorial: add <hr> rules between major sections
- ALWAYS commit with descriptive message after style switch