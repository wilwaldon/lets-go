# Container Queries Implementation Guide

## What Are Container Queries?

Container queries let components respond to **their container's size** instead of the viewport size. This enables true component-based responsive design where the same component can be used anywhere and will automatically adapt.

## Browser Support (2025)

✅ **Baseline: Newly Available** (since Feb 2023)

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 105+ | ✅ Full support |
| Firefox | 110+ | ✅ Full support |
| Safari | 16+ | ✅ Full support |
| Edge | 105+ | ✅ Full support |

All modern browsers support container queries. Fallback provided for older browsers.

---

## Implementation in Let's Go!

### Files Added

**`css/container-queries.css`** (new file)
- Comprehensive container query styles
- Component-based responsive design
- Fallbacks for older browsers
- Imported automatically via `styles.css`

**Components with container queries:**
1. Bento Grid
2. Testimonials
3. Generic Cards
4. Split Layouts
5. Feature Grids
6. Service Cards
7. Team Member Cards
8. Menu Items
9. CTA Blocks

---

## Usage Examples

### 1. Bento Grid (Automatic)

Already works! No HTML changes needed.

```html
<div class="bento-grid" data-template="featured">
  <template>
    <div class="bento-item glass-card scroll-fade">
      <h3 class="bento-item__title" data-bind="name"></h3>
      <p class="bento-item__text" data-bind="description"></p>
    </div>
  </template>
</div>
```

**What happens:**
- Wide container (600px+): Large padding (3rem), big text (2.75rem)
- Medium container (400-599px): Medium padding (2rem), medium text (2rem)
- Narrow container (<400px): Compact padding (1.5rem), smaller text (1.5rem)
- Featured item (800px+): Extra large text (up to 4rem)

**Magic:** The same bento item adapts based on its grid cell size, not screen size!

### 2. Testimonials (Automatic)

Already works! No HTML changes needed.

```html
<div class="testimonial-grid" data-template="testimonials">
  <template>
    <div class="testimonial glass-card scroll-fade">
      <p class="testimonial__text" data-bind="text"></p>
      <p class="testimonial__author" data-bind="name"></p>
    </div>
  </template>
</div>
```

**What happens:**
- Wide container (500px+): Large text (1.375rem), generous padding
- Medium container (300-499px): Standard text (1rem)
- Narrow container (<300px): Compact text (0.9375rem)

### 3. Reusable Cards

Use anywhere - sidebar, main content, modal, anywhere!

```html
<!-- Example 1: In main content (wide) -->
<div class="container">
  <div class="card-container">
    <div class="card">
      <img class="card__image" src="image.jpg" alt="">
      <div class="card__body">
        <h3 class="card__title">Card Title</h3>
        <p class="card__text">Description text...</p>
      </div>
    </div>
  </div>
</div>

<!-- Example 2: In sidebar (narrow) -->
<aside class="sidebar">
  <div class="card-container">
    <div class="card">
      <!-- Same HTML, different layout! -->
      <img class="card__image" src="image.jpg" alt="">
      <div class="card__body">
        <h3 class="card__title">Card Title</h3>
        <p class="card__text">Description text...</p>
      </div>
    </div>
  </div>
</aside>
```

**Result:**
- Wide container: Horizontal layout (image left, content right)
- Narrow container: Vertical stack (image top, content below)

### 4. Service Cards

Perfect for features, services, or benefits sections.

```html
<div class="feature-grid">
  <div class="service-card">
    <div class="service-card__icon">🚀</div>
    <h3 class="service-card__title">Fast Delivery</h3>
    <p class="service-card__description">Get your order in 30 minutes or less.</p>
    <a href="#" class="service-card__link">Learn more →</a>
  </div>
  <!-- More service cards... -->
</div>
```

**What happens:**
- Wide container (400px+): Full details, large icon (64px), link visible
- Narrow container (<400px): Compact, smaller icon (48px), smaller text

### 5. Team Member Cards

Adapts from horizontal to vertical automatically.

```html
<div class="team-grid">
  <div class="team-card">
    <img class="team-card__photo" src="photo.jpg" alt="">
    <div class="team-card__info">
      <h3 class="team-card__name">John Doe</h3>
      <p class="team-card__role">Head Chef</p>
      <p class="team-card__bio">15 years of experience...</p>
    </div>
  </div>
</div>
```

**Result:**
- Wide container (500px+): Photo left, info right
- Narrow container (<500px): Photo top (centered), info below

### 6. Menu Items

Great for restaurant menus.

```html
<div class="menu-category">
  <h3>Appetizers</h3>
  <div class="menu-item">
    <div class="menu-item__content">
      <h4 class="menu-item__name">Bruschetta</h4>
      <p class="menu-item__description">Toasted bread with tomatoes, basil, olive oil</p>
    </div>
    <span class="menu-item__price">$12</span>
  </div>
  <!-- More items... -->
</div>
```

**Result:**
- Wide container (400px+): Name/description left, price right (flex layout)
- Narrow container (<400px): Stacked vertically, price highlighted

### 7. CTA Blocks

Call-to-action blocks that adapt.

```html
<div class="cta-block">
  <div class="cta-block__content">
    <h2 class="cta-block__title">Ready to get started?</h2>
    <p class="cta-block__text">Join thousands of happy customers.</p>
  </div>
  <div class="cta-block__actions">
    <a href="#" class="btn btn--primary">Get Started</a>
  </div>
</div>
```

**Result:**
- Wide container (600px+): Content left, button right (flex)
- Narrow container (<600px): Centered, stacked vertically

---

## Container Query Units

Use `cqi` (container inline size) for fluid typography:

```html
<div class="feature-container">
  <h2 class="responsive-heading">This heading scales with its container</h2>
</div>
```

```css
.responsive-heading {
  /* Scales from 1.5rem to 4rem based on CONTAINER width */
  font-size: clamp(1.5rem, 6cqi, 4rem);
}
```

**Available units:**
- `cqi` = container inline size (width)
- `cqb` = container block size (height)
- `cqw` = container width
- `cqh` = container height
- `cqmin` = smaller dimension
- `cqmax` = larger dimension

---

## Real-World Use Cases

### Use Case 1: Reusable Blog Post Card

```html
<!-- In main content (wide) -->
<main class="main-content">
  <div class="card">...</div> <!-- Horizontal layout -->
</main>

<!-- In sidebar (narrow) -->
<aside class="sidebar">
  <div class="card">...</div> <!-- Vertical layout -->
</aside>

<!-- In modal (medium) -->
<dialog class="modal">
  <div class="card">...</div> <!-- Adapts to modal width -->
</dialog>
```

**One component, three layouts.** No extra CSS needed.

### Use Case 2: Responsive Testimonials

```html
<!-- Homepage: 3-column grid -->
<div class="testimonial-grid">
  <div class="testimonial">...</div> <!-- Large -->
  <div class="testimonial">...</div> <!-- Large -->
  <div class="testimonial">...</div> <!-- Large -->
</div>

<!-- Sidebar: 1-column -->
<aside class="sidebar">
  <div class="testimonial">...</div> <!-- Compact, same HTML -->
</aside>
```

### Use Case 3: Dashboard Widgets

```html
<!-- Full-width widget -->
<div class="dashboard-grid">
  <div class="widget" style="grid-column: span 2">
    <div class="service-card">...</div> <!-- Shows full details -->
  </div>

  <!-- Half-width widget -->
  <div class="widget">
    <div class="service-card">...</div> <!-- Compact version -->
  </div>
</div>
```

---

## How It Works Under the Hood

### Step 1: Define Container

```css
.bento-grid {
  container-type: inline-size; /* This element is a container */
}
```

### Step 2: Query Container Size

```css
/* Children respond to container, not viewport */
@container (min-width: 600px) {
  .bento-item {
    padding: 3rem;
    /* Applies when CONTAINER is 600px+, not screen */
  }
}
```

### Step 3: Use Anywhere

```html
<!-- Wide container: .bento-item gets 3rem padding -->
<div class="bento-grid" style="width: 800px">
  <div class="bento-item">...</div>
</div>

<!-- Narrow container: .bento-item gets smaller padding -->
<div class="bento-grid" style="width: 300px">
  <div class="bento-item">...</div>
</div>
```

---

## Fallback Strategy

All container queries have fallbacks:

```css
@supports not (container-type: inline-size) {
  /* Older browsers get viewport-based media queries */
  @media (min-width: 768px) {
    .card {
      display: flex;
    }
  }
}
```

**Result:**
- Modern browsers: Component-based responsive design
- Older browsers: Still responsive, just viewport-based

---

## Performance

**Container queries are faster than media queries** because:
1. Only evaluate affected components
2. Don't re-evaluate on viewport resize (only container resize)
3. Native browser feature (no JavaScript)

**No performance penalty.** Actually better performance in many cases.

---

## Migration from Media Queries

### Before (Media Queries):

```css
@media (min-width: 768px) {
  .card {
    display: flex;
  }
}
```

**Problem:** All `.card` elements change at 768px screen width.

### After (Container Queries):

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 500px) {
  .card {
    display: flex;
  }
}
```

**Solution:** Each `.card` changes based on its container width.

---

## Best Practices

### 1. Use Container Queries for Components

✅ **Good:** Component-level responsive design
```css
@container (min-width: 500px) {
  .card { display: flex; }
}
```

❌ **Bad:** Page-level layouts
```css
/* Don't use containers for page layout */
```

### 2. Use Media Queries for Layout

✅ **Good:** Overall page structure
```css
@media (min-width: 768px) {
  .page-layout {
    grid-template-columns: 250px 1fr;
  }
}
```

### 3. Combine Both

```css
/* Page layout: media query */
@media (min-width: 1024px) {
  .main-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}

/* Component: container query */
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
```

---

## Testing Container Queries

### Chrome DevTools

1. Open DevTools (F12)
2. Inspect element
3. Look for "Container" badge in Elements panel
4. Resize container to see queries trigger

### Firefox DevTools

1. Open DevTools (F12)
2. Inspector tab
3. Container badge shows active queries
4. Hover to highlight container

---

## Common Patterns

### Pattern 1: Card That Works Everywhere

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 500px) {
  .card { display: flex; }
}

@container (max-width: 499px) {
  .card { display: block; }
}
```

### Pattern 2: Fluid Typography

```css
.heading {
  font-size: clamp(1.5rem, 5cqi, 3rem);
}
```

### Pattern 3: Adaptive Grid

```css
.grid {
  container-type: inline-size;
  display: grid;
}

@container (min-width: 900px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

@container (min-width: 600px) and (max-width: 899px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@container (max-width: 599px) {
  .grid { grid-template-columns: 1fr; }
}
```

---

## Troubleshooting

### Container query not working?

**Check:**
1. Parent has `container-type: inline-size`
2. Parent has explicit width (not `width: auto`)
3. Browser supports container queries
4. Syntax is correct: `@container (min-width: 500px)`

### Element not a container?

```css
/* Add this to parent */
.parent {
  container-type: inline-size;
}
```

### Container too small?

```css
/* Check parent width */
.parent {
  min-width: 300px; /* Ensure minimum size */
}
```

---

## Further Reading

- [MDN: Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [Can I Use: Container Queries](https://caniuse.com/css-container-queries)
- [Baseline: Container Queries](https://web.dev/cq-stable/)

---

**Status:** ✅ Implemented and ready to use

All components in Let's Go! now use container queries for true component-based responsive design.
