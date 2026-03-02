Read CLAUDE.md in this repo — specifically the Animation rules in the Design Rules section.

The user wants to improve animations, interactions, and micro-interactions on their site to make it feel more polished and responsive.

**Step 1 — Audit current animations:**

Read all HTML, CSS, and JavaScript files. Check for:

### Scroll Animations:
- Sections fade in on scroll (IntersectionObserver)
- Cards stagger entrance
- Hero elements have staggered entrance

### Hover States:
- Cards respond to hover (lift, shadow, border)
- Buttons respond to hover (lift, color shift)
- Navigation links show indicator on hover
- Form inputs have focus states

### Page Load:
- Hero animates in on load
- Content appears smoothly (not all at once)

### Header Behavior:
- Header changes on scroll (blur, shadow)

### Mobile Menu:
- Slides in/out with transition
- Backdrop fades in

**Step 2 — Identify animation problems:**

❌ **No scroll animations:**
- Content just sits there (no fade-in)
- Cards all appear simultaneously (no stagger)
- Sections feel static

❌ **No hover feedback:**
- Cards don't respond to hover
- Buttons have no hover state
- Navigation links have no hover indicator
- No visual feedback on interactive elements

❌ **Hero loads all at once:**
- All elements appear simultaneously (not staggered)
- No entrance animation

❌ **Header doesn't change:**
- Looks same at top and after scrolling
- No blur, no shadow change

❌ **Mobile menu snaps:**
- Just appears/disappears (no slide transition)
- Backdrop pops in (no fade)

❌ **Form inputs have no focus:**
- No focus ring
- No indication of active field

❌ **Transitions too slow/fast:**
- Animations over 500ms (feel sluggish)
- Or under 150ms (feel jarring)

**Step 3 — Generate animation report:**

```markdown
# Animation & Interaction Audit Report

## 🚨 Missing Animations

### Scroll Animations
- ❌ No scroll-triggered animations found
- ❌ No IntersectionObserver implementation
- ❌ Cards don't stagger on entrance
- ❌ Sections appear static

### Hover States
- ✅ Buttons have hover color change
- ❌ Cards have no hover response
- ❌ Navigation links have no hover indicator
- ⚠️ Card hover exists but too subtle (no lift)

### Hero Entrance
- ❌ All hero elements appear simultaneously
- ❌ No staggered fade-in
- Missing: tagline (0.1s) → title (0.2s) → desc (0.35s) → buttons (0.5s)

### Header
- ❌ Header looks same at top and scrolled
- No .is-scrolled class added on scroll
- Missing: backdrop-filter blur, box-shadow transition

### Mobile Menu
- ⚠️ Menu has transition but too fast (200ms, should be 400ms)
- ✅ Backdrop fades correctly

### Form Inputs
- ❌ No focus ring
- ❌ No border color change on focus

## 📊 Animation Score

- Scroll animations: ❌ Not implemented (0%)
- Hover states: ⚠️ Partial (40%)
- Hero entrance: ❌ Not implemented (0%)
- Header scroll: ❌ Not implemented (0%)
- Mobile menu: ✅ Good (80%)
- Form focus: ❌ Not implemented (0%)

**Overall: D**

## 🎯 Recommended Additions

### High Priority:
1. Add scroll-triggered fade-up animations to sections
2. Add card hover (lift + shadow + border change)
3. Add hero staggered entrance
4. Add header scroll effect (blur + shadow)

### Medium Priority:
5. Add navigation link hover underline
6. Add button hover lift
7. Add card grid stagger effect
8. Add form input focus ring

### Low Priority:
9. Add smooth scroll behavior
10. Add page transition fade
```

**Step 4 — Ask user for confirmation:**

"I found [X] missing animations and interactions. Want me to:

1 — Add all recommended animations
2 — Add essential animations only (scroll + hover + hero)
3 — Show recommendations only (no changes)"

**Step 5 — Add animations:**

### Add Scroll-Triggered Animations

**Update main.js (or create if doesn't exist):**

```javascript
// Scroll-triggered animations using IntersectionObserver
const observeElements = () => {
  const animatedElements = document.querySelectorAll('.animate');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
  });

  animatedElements.forEach(el => observer.observe(el));
};

// Staggered animations for grids
const observeStaggered = () => {
  const staggerContainers = document.querySelectorAll('[data-stagger]');

  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.animate');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('is-visible');
            }, index * 100); // 100ms stagger delay
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);
  });
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  observeStaggered();
});
```

**Add to css/styles.css:**

```css
/* Scroll animations */
.animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Update HTML - add class="animate" to sections:**

```html
<section class="section">
  <div class="container animate">
    <h2>Section Heading</h2>
    <p>Content...</p>
  </div>
</section>

<!-- For grids with stagger -->
<div class="grid grid--3" data-stagger>
  <div class="card animate">...</div>
  <div class="card animate">...</div>
  <div class="card animate">...</div>
</div>
```

### Add Card Hover Effects

```css
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border-color: var(--color-primary);
}

.card:active {
  transform: translateY(-2px);
}
```

### Add Button Hover Effects

```css
.btn {
  position: relative;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn--primary:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn--secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
```

### Add Navigation Hover Indicator

```css
.nav__link {
  position: relative;
  transition: color 200ms ease;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 250ms ease;
}

.nav__link:hover::after,
.nav__link[aria-current="page"]::after {
  width: 100%;
}

.nav__link:hover {
  color: var(--color-primary);
}
```

### Add Hero Staggered Entrance

**Add to css/styles.css:**

```css
/* Hero entrance animations */
.hero__tagline {
  animation: fadeIn 0.6s ease 0.1s both;
}

.hero__title {
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.hero__description {
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
}

.hero__actions {
  animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Disable for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero__tagline,
  .hero__title,
  .hero__description,
  .hero__actions {
    animation: none;
  }
}
```

### Add Header Scroll Effect

**Update main.js:**

```javascript
// Header scroll effect
const headerScroll = () => {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScroll = currentScroll;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  headerScroll();
  // ... other initializations
});
```

**Add to css/styles.css:**

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  transition: backdrop-filter 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
}

.header.is-scrolled {
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border-bottom-color: var(--color-border);
}
```

### Add Form Input Focus States

```css
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

/* If using border-bottom only style */
input:focus,
textarea:focus {
  border-bottom-color: var(--color-primary);
  box-shadow: 0 1px 0 0 var(--color-primary);
}
```

### Add Mobile Menu Slide Animation

```css
.nav__menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 320px;
  height: 100vh;
  background: white;
  transform: translateX(100%);
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1000;
}

.nav__menu.is-open {
  transform: translateX(0);
}

.nav__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms ease, visibility 300ms ease;
  z-index: 999;
}

.nav__backdrop.is-visible {
  opacity: 1;
  visibility: visible;
}
```

### Add Smooth Scroll (Optional)

```css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

**Step 6 — Test all animations:**

1. Scroll down page - sections fade in? ✓
2. Scroll to grid - cards stagger in? ✓
3. Reload page - hero elements stagger? ✓
4. Scroll down - header changes? ✓
5. Hover over card - lifts with shadow? ✓
6. Hover over button - lifts slightly? ✓
7. Hover over nav link - underline appears? ✓
8. Focus on input - border/ring appears? ✓
9. Open mobile menu - slides in smoothly? ✓
10. All animations respect prefers-reduced-motion? ✓

**Step 7 — Performance check:**

Ensure animations don't cause jank:

- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Keep total animations per page under 20-30 elements
- Limit stagger groups to 6-8 items max
- Test on lower-end devices if possible

**Step 8 — Update changelog and commit:**

- Add entry to CHANGELOG.md: "Animation improvements: added scroll-triggered animations, improved hover states, added hero entrance, header scroll effect"
- Commit: "design: add animations and micro-interactions"

**Step 9 — Show summary:**

"✅ Animations added:
- Scroll-triggered fade-up on sections
- Card grid stagger entrance (100ms delays)
- Hero staggered entrance (tagline → title → description → buttons)
- Header scroll effect (blur + shadow)
- Card hover (lift + shadow + border)
- Button hover (lift + shadow)
- Navigation hover (underline slide)
- Form focus states (border + ring)
- Mobile menu slide transition

All animations respect prefers-reduced-motion preference."

RULES:

- NEVER animate width, height, top, left (causes layout reflow)
- ALWAYS use transform and opacity (GPU accelerated)
- ALWAYS respect prefers-reduced-motion media query
- ALWAYS keep transitions under 500ms (faster feels more responsive)
- ALWAYS unobserve IntersectionObserver elements after animating (animate once)
- NEVER animate more than necessary (subtle > excessive)
- ALWAYS test on mobile (animations should feel smooth, not janky)
- NEVER use animation-fill-mode: forwards without both (can cause FOUC)