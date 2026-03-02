Read CLAUDE.md in this repo — specifically the "Copy Rules — Write Like a Human, Not a Marketing Bot" section.

The user wants a comprehensive copy audit of their existing site to remove AI slop and improve the writing quality.

**Step 1 — Scan all HTML files and site-data.json:**

Read every .html file and site-data.json to collect all copy: hero headlines, section headings, body text, button labels, testimonials, team bios, form labels, footer text.

**Step 2 — Run the AI Slop Detection:**

Check EVERY piece of copy against the banned phrases list from CLAUDE.md. Flag any occurrence of these hard-banned phrases:

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
- "Learn More" as a CTA
- "Get Started" (unless it's actually a signup flow)

Also check for these AI tells:

- Every page starting with the same sentence structure
- Buzzword-heavy descriptions ("leverage", "synergy", "elevate", "optimize")
- Long paragraphs of marketing fluff with no specific details
- Generic testimonials that sound like reviews ("Absolutely phenomenal experience, exceeded all expectations!")

**Step 3 — Generate a detailed report:**

Create a markdown report with this structure:

```markdown
# Copy Audit Report

## 🚨 Critical Issues (AI Slop Detected)

### index.html
- **Line 47, Hero headline:** "Welcome to [Business Name]"
  - ❌ Banned phrase: "Welcome to"
  - ✅ Suggested fix: "[Direct statement about what they do]"

- **Line 89, CTA button:** "Learn More"
  - ❌ Generic CTA
  - ✅ Suggested fix: "View the Menu" / "Book a Haircut" / [specific action]

### about.html
- **Line 34, Opening paragraph:** "We're passionate about bringing quality service..."
  - ❌ Banned phrase: "passionate about"
  - ✅ Suggested fix: "We've been [doing specific thing] since [year]"

## ⚠️ Improvement Opportunities

### Vague descriptions
- **services.html, Service 1:** "Quality ingredients from local farms"
  - Current: Generic claim
  - Better: "Three farms in Chatham County: Miller's greens, Thompson beef, Garcia tomatoes"

### Button labels
- **index.html, Hero CTA:** "Get Started"
  - Current: Vague action
  - Better: "Book a Table" / "See Class Times" / [specific action]

### Testimonials
- **index.html, Testimonial 2:** "Amazing experience, highly recommend!"
  - Current: Generic, sounds fake
  - Better: "The haircut took 45 minutes. Jordan listened to exactly what I wanted. Best cut I've had in Savannah."

## ✅ Voice Consistency Check

### Tone Analysis
- Homepage: [Marketing voice / Friendly / Professional / etc.]
- About page: [First person / Third person / etc.]
- Services: [Descriptive / Transactional / etc.]

**Recommendation:** [Make voice consistent across pages, or explain why variation is intentional]

## 📊 Score Summary

- Banned phrases found: **X**
- Generic CTAs: **X**
- Vague descriptions: **X**
- Marketing fluff paragraphs: **X**

**Overall Copy Health: [A/B/C/D/F]**
```

**Step 4 — Present the report to the user:**

Show the complete report and ask:

"I found [X] critical issues and [Y] improvement opportunities. Want me to:

1 — Fix all critical issues automatically (replace banned phrases)
2 — Fix critical + improvement opportunities (rewrite vague copy)
3 — Just show me the report (I'll fix manually)
4 — Fix specific items (tell me which ones)"

**Step 5 — Apply fixes based on their choice:**

If they choose 1 or 2:

- Update site-data.json with new copy (preserve structure, only change text values)
- Update HTML files where copy is hardcoded
- Apply the before/after patterns from CLAUDE.md for the specific business type
- Follow the voice guidelines: short, direct, specific, conversational
- Make CTAs action-specific based on the page context

**The Rewrite Process:**

For each piece of flagged copy:

1. **Identify the purpose:** What is this text trying to communicate?
2. **Make it specific:** Replace generic claims with concrete details (dates, numbers, names, places)
3. **Make it conversational:** Write like someone talking to a neighbor, not a marketing agency pitching
4. **Cut the fluff:** Two short sentences beat one long one. Fragments are fine.
5. **Test it:** Read out loud. Would a real business owner say this to a friend?

**Business-type specific guidance:**

**Restaurant / Café:**
- Focus on: ingredients, preparation, hours, what makes it different
- Avoid: "culinary excellence", "exquisite flavors", "dining experience"
- Good: "Pasta made fresh every morning. Three farms in Chatham County. Dinner starts at 5."

**Salon / Barbershop:**
- Focus on: stylist experience, services, pricing, booking
- Avoid: "transformation", "pampering", "luxury experience"
- Good: "Jordan trained at Bumble & Bumble. Women's cut: $75. Walk-ins welcome."

**Fitness / Gym:**
- Focus on: class times, equipment, coaching, pricing
- Avoid: "fitness journey", "transform your body", "state-of-the-art"
- Good: "6 AM class has three spots left. Squat racks, kettlebells, coaches who remember your name. $99/month."

**Professional Services:**
- Focus on: experience, credentials, process, contact
- Avoid: "trusted partner", "solutions", "leverage expertise"
- Good: "Catherine's done 200+ LLC formations. We answer the phone. We explain the bill."

**Step 6 — Validate the fixes:**

After making changes:

1. Re-scan all files to ensure no banned phrases remain
2. Check that all CTAs are action-specific
3. Verify voice consistency across pages
4. Confirm specificity (numbers, dates, places mentioned)
5. Read hero headlines out loud — do they sound human?

**Step 7 — Update changelog and commit:**

- Add entry to CHANGELOG.md: "Copy improvements: removed AI slop, rewrote [X] sections for clarity and specificity"
- Commit: "content: improve copy quality and remove generic phrases"

**Step 8 — Show summary:**

"✅ Copy audit complete. Fixed:
- [X] banned phrases removed
- [X] CTAs made specific
- [X] vague descriptions rewritten
- [X] marketing fluff cut

Want me to run another audit to verify everything's clean?"

RULES:

- NEVER make the copy MORE generic — always move toward specificity
- NEVER add new buzzwords while fixing old ones
- NEVER change data structure in site-data.json — only change text values
- NEVER change business facts (hours, prices, contact info) — only change marketing copy
- ALWAYS preserve the tone appropriate to the business type (don't make a law firm sound like a café)
- ALWAYS maintain proper data-bind attributes in HTML when editing
- ALWAYS read the full Copy Rules section from CLAUDE.md before suggesting rewrites
