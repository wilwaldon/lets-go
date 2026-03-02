# Design Rules

## Design Philosophy

Every generated site should look like a $5,000 custom build from a boutique agency. The aesthetic is editorial, confident, and restrained. Think Tobias van Schneider's portfolio, the Linear marketing site, or a premium Squarespace template — not a free Bootstrap theme.

## The AI Slop Checklist — If You See Any of These, Redo It

These are the dead giveaways that AI built a site. Each one is a hard ban:

**Layout tells:**

- ❌ Three equal-width cards in a row with icon + title + paragraph (the "feature grid")
- ❌ Perfectly symmetrical layouts everywhere — real sites have visual tension
- ❌ Every section centered with the same max-width and padding
- ❌ Hero with centered text, a button, and nothing else
- ❌ Sections that all follow the same pattern: label → heading → grid of cards

**Visual tells:**

- ❌ Small colored pills/tags/badges above every section heading (the "section label" pattern)
- ❌ Decorative horizontal lines, dashes, or accent bars next to or near section labels/taglines (e.g., a short colored line before "SAVANNAH STRENGTH TRAINING"). This is the #1 AI tell — a small decorative element before a label. NEVER add a ::before or ::after pseudo-element that draws a line near a label, tagline, or section header. Labels should be PLAIN TEXT ONLY.
- ❌ Rounded pill-shaped everything (buttons, badges, cards all with border-radius: 9999px)
- ❌ Cards with thick colored borders or colored left borders
- ❌ Gradient backgrounds, gradient text, gradient buttons
- ❌ Glassmorphism, frosted glass, transparency effects
- ❌ Floating blobs, orbs, abstract SVG decorations
- ❌ Icon-heavy layouts (a grid of 6 icons with labels underneath)
- ❌ Purple-to-blue or indigo as the primary color palette
- ❌ Drop shadows on everything
- ❌ Emoji as visual elements

**Copy tells:**

- ❌ "Welcome to [business]" / "Experience the difference" / "Your journey starts here"
- ❌ "We're passionate about..." / "Our mission is to..."
- ❌ Buzzword-heavy descriptions that say nothing specific
- ❌ Lorem ipsum or obviously placeholder text
- ❌ Every page starting with the same sentence structure

## What World-Class Looks Like — Specific Direction

**Layout rules:**

- Vary section layouts. Not every section is centered with a grid underneath. Mix these patterns:
  - Split layout: text left (60%), content right (40%) — or reversed
  - Full-width content with narrow text column offset to one side
  - Staggered grid with items at different vertical offsets (use `grid--offset`)
  - A text-only section with large typography — no cards, no images, just a statement
  - Alternating left-right sections down the page
- The hero should feel expansive. Left-aligned text, generous vertical padding (min 60vh on desktop). No centered hero with a background image overlay unless the business specifically warrants it.
- Let sections breathe. Use 96px–128px vertical padding between major sections on desktop, not 48px.
- Not every section needs a heading. Some sections can just be content.

**Typography rules:**

- Headings should feel BIG. Hero h1 should be 3.25rem on mobile, 4rem+ on desktop. Section h2 should be 2rem minimum.
- Tighten letter-spacing on headings: -0.03em on h1, -0.02em on h2. This alone separates amateur from professional.
- Use font-weight contrast: bold headings (700), regular body (400), medium for labels (500). Don't use semibold for everything.
- Line-height on body text should be generous: 1.7–1.8 for readability.
- Limit body text line length to 65–70 characters (max-width ~36rem on text blocks).

**Color rules:**

- One accent color. ONE. Used sparingly: links, hover states, the primary CTA button, and maybe one small accent element. That's it.
- The background is white (#ffffff) or very light gray (#fafafa / #f8fafc). Not both alternating every section.
- Text is near-black (#1a1a1a or #0f172a), not medium gray. Secondary text is #64748b.
- Don't color section backgrounds to create visual separation. Use spacing, borders, or typography changes instead.
- If alternating backgrounds are used, the contrast should be minimal: #ffffff vs #fafafa, not white vs light blue.

**Spacing rules:**

- Generous whitespace is the single most important design quality. When in doubt, add more space.
- Section padding: 6rem top/bottom minimum on desktop, 3rem on mobile.
- Card padding: 1.5rem–2rem internal padding. Not 1rem.
- Grid gaps: 2rem between cards, not 1rem.
- Text blocks: 1.5rem between paragraphs, 2rem between a heading and its content.

**Component-specific rules:**

- BUTTONS: Solid fill for primary action, subtle border for secondary. Small, tight padding (0.625rem 1.5rem). Never huge pill-shaped buttons. Hover lifts 1px with subtle shadow.
- CARDS: 1px border (#e2e8f0), small border-radius (8px max). No colored backgrounds inside cards. Image at top with 16:10 aspect ratio if image exists, text below. No drop shadow at rest — only on hover.
- NAVIGATION: Clean, minimal. Logo left, links center or right, CTA right. Links are plain text with underline on hover — no backgrounds, no pills, no colored highlights.
- TESTIMONIALS: Just the quote, the name, and maybe a role. No star ratings displayed as emoji. No headshot circles. Keep it editorial — large quote marks (the " character) as a visual accent, rest is clean text.
- CONTACT FORMS: Simple stacked fields, no side-by-side columns on mobile. Minimal labels above fields. No icons inside inputs. Border-bottom-only inputs look more refined than fully bordered, but either works. No field groups with backgrounds.
- FOOTER: Dark background (#0f172a), light text (rgba white). Three columns: brand/description, links, contact. Small type (14px). No gradients, no decorative elements. Simple and informational.

**Animation rules:**

- Hero content animates in on page load — staggered fade-up with 100ms delays between elements
- Section content animates on scroll — fade-up triggered by IntersectionObserver, once
- Cards in a grid stagger their entrance using `data-stagger` attribute
- Hover transitions: 150ms ease for color changes, 250ms ease for transforms
- No bouncing, no spring animations, no elastic easing
- Total page should have maybe 5-8 animated moments, not 50

**Image rules:**

- Use `data-src` for lazy loading with blur-up
- Image aspect ratios should be consistent within a section (16:10 for cards, 1:1 for team headshots)
- If no real images are available, use solid colored placeholder divs with the alt-bg color — NOT stock photo placeholders or placeholder services

## Copy Rules — Write Like a Human, Not a Marketing Bot

This is just as important as the visual design. Bad copy is AI slop even if the CSS is perfect.

**The voice:** Write like a confident small business owner talking to a neighbor. Not a marketing agency writing a pitch deck. Not a LinkedIn post. Not a press release.

**The structure:** Short. Direct. Specific. If a sentence doesn't add information, cut it.

### Banned Phrases — Hard List

Every one of these is an instant tell that AI wrote the copy. NEVER use them:

- "Welcome to [business name]"
- "Experience the difference"
- "Your journey starts here"
- "We're passionate about..."
- "Our mission is to..."
- "We believe in..."
- "Elevate your..."
- "Curated selection of..."
- "Nestled in the heart of..."
- "Where quality meets..."
- "Discover the art of..."
- "Redefine / reimagine / reinvent..."
- "World-class / best-in-class / top-notch / cutting-edge"
- "Solutions for your needs"
- "Tailored to your unique..."
- "Embark on a..."
- "Crafted with care"
- "Your trusted partner in..."
- "Seamless experience"
- "We pride ourselves on..."
- "Lorem ipsum" or any placeholder text
- "Learn More" as a CTA (always use a specific action)
- "Get Started" (unless it's a signup flow)

### Before & After — Restaurant

| ❌ AI slop                                                                                  | ✅ Human copy                                                                                                       |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| "Welcome to Bella's Kitchen, where culinary excellence meets warm hospitality."             | "Dinner starts at 5. The pasta's made fresh every morning."                                                         |
| "Our passionate chefs craft exquisite dishes using the finest locally-sourced ingredients." | "We buy from three farms in Chatham County. You can taste the difference."                                          |
| "Experience the art of fine dining in our elegant atmosphere."                              | "Twelve tables, one menu, no substitutions. We keep it simple."                                                     |
| "Explore our carefully curated menu"                                                        | "View the Menu"                                                                                                     |
| "Begin your culinary journey"                                                               | "Make a Reservation"                                                                                                |
| "At Bella's, we believe food brings people together."                                       | "Open Tuesday through Saturday. Closed when the fish isn't fresh."                                                  |
| "Our Story: Founded with a passion for bringing authentic flavors to the community..."      | "Marco opened the kitchen in 2019 with a pasta roller and a wood-burning oven. The menu hasn't changed much since." |

### Before & After — Salon

| ❌ AI slop                                                                              | ✅ Human copy                                                                                                      |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| "Welcome to Luxe Salon, your premier destination for hair transformation."              | "Good haircuts. No small talk required."                                                                           |
| "Our team of expert stylists are passionate about helping you look and feel your best." | "Adriana's been cutting hair for 12 years. Jordan trained at Bumble & Bumble. Sam does the best fade in Savannah." |
| "Experience the ultimate in hair care and pampering."                                   | "Walk-ins welcome. Online booking is faster."                                                                      |
| "Discover your perfect look"                                                            | "Book a Haircut"                                                                                                   |
| "Book your transformation today"                                                        | "Book Now"                                                                                                         |
| "We believe everyone deserves to feel beautiful."                                       | "Women's cut: $75. Men's cut: $45. Kids: $30. No hidden fees."                                                     |

### Before & After — Fitness

| ❌ AI slop                                                                        | ✅ Human copy                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| "Welcome to Peak Fitness, where your fitness journey begins!"                     | "The 6 AM class has three spots left this week."                                        |
| "Our state-of-the-art facility offers world-class equipment and expert trainers." | "Squat racks, pull-up bars, kettlebells, and coaches who remember your name."           |
| "Transform your body and mind with our innovative fitness programs."              | "Three classes a day, open gym all day, and Marcus will write your program if you ask." |
| "Start your fitness journey"                                                      | "Try a Free Class"                                                                      |
| "Join our community of fitness enthusiasts"                                       | "See the Schedule"                                                                      |
| "We're passionate about helping you achieve your fitness goals."                  | "$99/month. Unlimited classes. Cancel anytime."                                         |

### Before & After — Professional Services

| ❌ AI slop                                                                                                              | ✅ Human copy                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| "Welcome to Harlow & Park, your trusted partner in legal solutions."                                                    | "Business law for people who'd rather be running their business."                                                               |
| "Our experienced team of attorneys is dedicated to providing exceptional legal services tailored to your unique needs." | "Catherine's done 200+ LLC formations. David's won three jury trials this year. Maria closed $40M in real estate last quarter." |
| "We leverage our extensive expertise to deliver results-driven solutions."                                              | "We answer the phone. We explain the bill. We don't charge for five-minute questions."                                          |
| "Schedule a consultation to discuss your legal needs"                                                                   | "Schedule a Consultation"                                                                                                       |
| "Discover how we can help you navigate complex legal challenges"                                                        | "Call (912) 555-0147"                                                                                                           |
| "At Harlow & Park, we pride ourselves on our commitment to excellence and integrity."                                   | "Savannah Bar Association board member since 2020. Martindale-Hubbell AV rated. Ask around."                                    |

### CTA Button Copy Rules

| ❌ Never             | ✅ Instead                                          |
| -------------------- | --------------------------------------------------- |
| Learn More           | View the Menu / See Services / Read More About Us   |
| Get Started          | Book a Haircut / Try a Free Class / Schedule a Call |
| Submit               | Send Message                                        |
| Click Here           | (never use this anywhere)                           |
| Discover More        | See the Full Menu / View All Classes                |
| Explore              | See Pricing / Check Availability                    |
| Contact Us (in hero) | Make a Reservation / Book Now / Call (912) 555-0147 |

### Page-Specific Voice

**Homepage hero:** One bold statement. Not a paragraph. Not a welcome message. What does this business DO, said in 8 words or fewer?

**Menu / Services page:** Functional. Item name, brief description, price. No marketing copy between items. Category headers are just the category name — no "Explore our delicious appetizers."

**About page:** This is the ONE page where longer copy is fine. Tell the real story. When did they open? Why? What's the thing regulars know that new customers don't? Write it like a short magazine profile, not a corporate bio.

**Team page:** Name, title, one sentence. "Jordan trained at Bumble & Bumble in New York. Her balayage work has a six-week waitlist." That's it. No "passionate about empowering clients through transformative hair experiences."

**Contact page:** No intro paragraph needed. The form IS the content. Hours, address, phone on the side. Done.

### The Final Test

Before committing any copy, read it out loud. If it sounds like a brochure, rewrite it. If you can imagine a real person saying it to a friend, it's good.

## Responsive Design

- Mobile-first approach — design for 375px first, then scale up
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Navigation collapses to hamburger menu below 768px
- All layouts work on 320px minimum width
- Single column on mobile, two columns at 640px, three at 1024px for grids
- Touch targets: minimum 44px height for buttons and links on mobile

## Page Structure

Every page follows this skeleton, but the content between header and footer should VARY in layout per the layout rules above:

```
Header (sticky, frosted glass on scroll)
├── Logo / Business Name (left)
├── Navigation Links (center or right)
└── CTA Button (right)

Main Content
├── Hero Section (left-aligned text, generous height)
├── Content Sections (VARIED layouts — not all the same)
└── CTA Section (dark background, centered text, single button)

Footer (dark, 3-column)
├── Brand + Description
├── Quick Links
├── Contact Info + Social
└── Copyright (small, centered, bottom)
```

## Section Layout Recipes

Claude Code should pick from these layout patterns when building page sections. NEVER use the same layout twice in a row. A great homepage uses 4-5 different patterns.

**Recipe 1 — The Split (text + content side by side)**

```html
<section class="section">
  <div class="container">
    <div class="grid grid--2" style="align-items: center; gap: 4rem;">
      <div>
        <h2>Section heading here</h2>
        <p class="text-light mt-md" style="line-height: 1.8; max-width: 32rem;">
          Body text here. Keep it to 2-3 sentences max.
        </p>
        <a href="#" class="btn btn--primary mt-lg">Action</a>
      </div>
      <div>
        <!-- Content: image, card stack, hours table, map, etc. -->
      </div>
    </div>
  </div>
</section>
```

Use for: Hours & location, about preview, featured content + image. Alternate which side the text is on (left then right then left).

**Recipe 2 — The Staggered Grid (offset cards)**

```html
<section class="section">
  <div class="container">
    <h2>Section heading</h2>
    <p class="text-light mt-md mb-xl" style="max-width: 32rem;">
      Optional subtitle.
    </p>
    <div class="grid grid--3 grid--offset" data-stagger>
      <!-- Cards with class="animate" for staggered entrance -->
    </div>
  </div>
</section>
```

Use for: Services, menu highlights, team members. The `grid--offset` makes even children shift down 2rem for visual interest.

**Recipe 3 — The Statement (big text, no cards)**

```html
<section class="section" style="padding: 6rem 0;">
  <div class="container container--narrow text-center">
    <h2
      style="font-size: var(--font-size-4xl); letter-spacing: -0.03em; line-height: 1.1;"
    >
      A bold statement that captures the business ethos in one sentence.
    </h2>
    <hr class="divider divider--center mt-xl" />
  </div>
</section>
```

Use for: Breaking up content-heavy pages. One per page maximum. Place between two content-heavy sections as a breath.

**Recipe 4 — The Narrow List (vertically stacked items)**

```html
<section class="section">
  <div class="container container--narrow">
    <h2>Section heading</h2>
    <div class="mt-xl">
      <!-- List items with class="list-item" for consistent spacing -->
    </div>
  </div>
</section>
```

Use for: Services with prices, menu items, FAQ, credentials. The narrow container (48rem) makes text scannable.

**Recipe 5 — The Full-Width Feature**

```html
<section class="section section--alt">
  <div class="container">
    <div class="grid grid--2" style="gap: 4rem; align-items: center;">
      <div
        style="aspect-ratio: 4/3; background: var(--color-bg-alt); border-radius: var(--border-radius-lg);"
      ></div>
      <div>
        <span
          class="text-primary"
          style="font-weight: 600; font-size: var(--font-size-sm); letter-spacing: 0.05em; text-transform: uppercase;"
          >Label</span
        >
        <h2 class="mt-sm">Feature heading</h2>
        <p class="text-light mt-md" style="line-height: 1.8;">
          Description with specific details.
        </p>
      </div>
    </div>
  </div>
</section>
```

Use for: About sections, featured offerings, process explanation. Note: the label here is INLINE with the content, not a floating pill.

**Recipe 6 — The Testimonial Band**

```html
<section class="section">
  <div class="container">
    <div class="grid grid--2" data-stagger style="gap: 2rem;">
      <div class="testimonial animate">
        <p class="testimonial__text">Quote here.</p>
        <p class="testimonial__author">— Name, Title</p>
      </div>
      <!-- 2 testimonials max per row. 2-4 total. -->
    </div>
  </div>
</section>
```

Use for: Social proof. Keep it to 2-4 testimonials. No star ratings. No photos. Just words and names. The em dash before names is a nice editorial touch.

## Homepage Blueprint

Every homepage should follow this approximate pattern. Sections can be swapped but the VARIETY of layouts is mandatory:

```
1. HERO (Recipe: left-aligned text, 60vh min-height, staggered fade-in)
   - Tagline (small, uppercase, primary color — plain text only, NO decorative line or border)
   - Large headline (h1, tight letter-spacing)
   - 1-2 sentence description (text-light, max 36rem)
   - Primary CTA + Secondary CTA

2. FEATURED CONTENT (Recipe 2 — staggered grid OR Recipe 5 — full-width feature)
   - 3 items showing what the business offers
   - Use cards with the animate class for staggered entrance

3. STATEMENT or TESTIMONIAL (Recipe 3 or Recipe 6)
   - Break the rhythm. No cards here. Just text.

4. SPLIT CONTENT (Recipe 1 — text + content)
   - Hours & location with map, or team preview, or process explanation
   - Text on one side, visual on the other

5. SOCIAL PROOF (Recipe 6 — if not used in position 3)
   - 2-4 testimonials in a 2-column grid

6. CTA BANNER (dark background, centered text, one button)
   - Specific CTA text, not "Get Started"
```

## Inner Page Patterns

**Menu / Services page:**

- Short hero (just h1 + 1 sentence, less padding than homepage hero)
- Use Recipe 4 (narrow list) for services/menu items grouped by category
- Category names as h3 with a thin bottom border — not tabs, not pills
- Prices right-aligned on the same line as the item name

**Team page:**

- Short hero
- Recipe 2 (staggered grid) with team cards
- No circular headshots — use square or 3:4 aspect ratio with small border-radius
- Name, title, and 1-2 sentence bio. That's it.

**About page:**

- Can use Recipe 1 (split) for the main story
- Recipe 3 (statement) for a mission/values pullquote
- Recipe 5 (full-width feature) for history or process
- This page can be longer and more narrative than others

**Contact page:**

- Recipe 1 (split) — form on left, info on right
- Hours table, address, phone, email on the right side
- Map below as full-width within the container
- No section heading needed above the form — it's obvious
