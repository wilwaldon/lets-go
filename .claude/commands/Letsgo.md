# /letsgo — Build or Update Let's Go! Sites

## Step 1: Detect Context

First, determine where we are:

```bash
# Check what kind of directory we're in
```

**Context A: Templates Repository** (has `templates/static/base/` + `PROMPTS.md`)
- We're inside the Let's Go! templates repo itself
- Ask: "You're in the templates repo. Do you want to:
  1 — Create a test build in _test-builds/
  2 — Exit and run /letsgo from a project directory"

**Context B: Existing Site** (has `site-data.json` or `package.json` with "vite")
- We're in an existing Let's Go! site
- Skip to "Update Existing Site" flow below

**Context C: New Directory** (empty or no site files)
- We're in a fresh directory ready for a new site
- Continue to "Build New Site" flow below

---

## Build New Site (Context C)

Read CLAUDE.md, ARCHITECTURE.md, and PROMPTS.md from the Let's Go! repo.

**Locate Templates:**
Check these locations for the templates repo (in order):
1. `./` (current directory if we're in the templates repo)
2. `../auto/` (sibling directory)
3. `~/Projects/auto/`
4. `$CLAUDE_CODE_WORKSPACE/auto/`

If templates not found, tell user: "I can't find the Let's Go! templates. Please run this command from:
- A subdirectory of the templates repo, OR
- A new project directory with the templates repo nearby, OR
- Tell me the path to the Let's Go! templates repo"

**Check Base Template:**
If `templates/static/base/` does NOT exist in the templates repo, run Prompt 0 from PROMPTS.md to build it first.

**Build Process:**

Ask these questions ONE AT A TIME. Wait for each answer before asking the next.

**Question 1:** "Pick a stack:
1 — Full stack (Vite + React + TypeScript + Supabase)
2 — Static site (HTML / CSS / JS only)"

(Wait for their answer)

**Question 2:** "Pick a business type:
1 — Restaurant / Café
2 — Salon / Barbershop
3 — Fitness / Gym
4 — Professional Services"

(Wait for their answer)

**Question 3:** "Pick a design style:
1 — Editorial — Magazine-inspired. Serif headings, generous whitespace, dramatic scale
2 — Modern Minimal — Clean sans-serif, Linear/Stripe feel
3 — Bold & Confident — Oversized headings, high contrast, creative agency vibe
4 — Warm & Approachable — Rounded corners, warm palette, neighborhood shop
5 — Classic Professional — Conservative, muted, law firm feel
6 — Material — Google-inspired tonal surfaces, elevation shadows
7 — Kinetic — Oversized variable fonts, scroll-reactive typography
8 — Glass — Apple Liquid Glass aesthetic, translucent surfaces
9 — Brutal — Neo-brutalism, harsh borders, intentional chaos"

(Wait for their answer)

**Question 4:** "What's the business name?"

(Wait for their answer, then start building)

### Build Execution

**If Static Site (2):**

1. Copy `templates/static/base/` to current directory
2. Read `templates/static/configs/[business_type].json`
3. Merge config into `site-data.json` with their business name
4. Rename page-2/3/4.html to correct names for business type
5. Update all internal links, titles, meta descriptions
6. Customize `<main>` content for business type
7. Apply design style:
   - Read `templates/static/styles/style-[chosen].css`
   - Copy `:root` block → append to `css/variables.css`
   - Copy everything else → append to `css/styles.css`
8. Update `favicon.svg` with first letter + primary color
9. Generate `sitemap.xml` with all pages
10. Generate `CHANGELOG.md` with v1.0.0 entry
11. Generate `README.md`
12. `git init` + commit

**Follow all rules from CLAUDE.md:**
- Layout: Use 3+ different recipes per page, no repeated patterns
- Copy: No banned phrases, write like a human
- Typography: Style-specific settings
- Spacing: Generous whitespace
- Animations: Staggered entrances (skip for Classic style)
- Run the 20-point self-check before committing
- Validate all links

**If Full Stack (1):**
Execute Prompts 1-14 from PROMPTS.md for the chosen business type.

### Post-Build

Present summary:
```
Your site has been built with these pages:
1. Home (index.html)
2. [Page 2 name]
3. [Page 3 name]
4. [Page 4 name]
5. Contact (contact.html)
+ 404 error page

Design style: [chosen style]

Do you need any additional pages?
Examples: Gallery, FAQ, Blog, Pricing, Events, Careers, Privacy, Terms

Type page names separated by commas, or type 'done' to finish.
```

---

## Update Existing Site (Context B)

Detected an existing Let's Go! site. Ask:

"What would you like to do?

1 — Add new pages
2 — Change design style
3 — Update content (from site-data.json or business brief)
4 — Redesign layout (keep content, improve design)
5 — Change colors/fonts only
6 — Add/update testimonials, team members, menu items, etc.
7 — Something else (describe it)"

(Wait for their answer)

### Option 1: Add New Pages

Ask: "What pages do you want to add? Examples: Gallery, FAQ, Blog, Pricing, Events, Careers, Privacy, Terms, About Us, Services

Type page names separated by commas."

(Wait for answer)

For each page:
1. Create new HTML file using base template structure
2. Add page-specific content sections
3. Update `site-data.json` with new page data
4. Add to `navigation[]` array
5. Update `sitemap.xml`
6. Update nav in ALL existing HTML files
7. Apply current design style
8. Commit changes

### Option 2: Change Design Style

Ask: "Pick a new design style:
1 — Editorial
2 — Modern Minimal
3 — Bold & Confident
4 — Warm & Approachable
5 — Classic Professional
6 — Material
7 — Kinetic
8 — Glass
9 — Brutal"

(Wait for answer)

1. Read current `site-data.json` to preserve content
2. Read `templates/static/styles/style-[chosen].css`
3. **REPLACE** entire `css/variables.css` with new `:root` block
4. **REPLACE** style-specific sections in `css/styles.css` (everything after core base styles)
5. Update `favicon.svg` with new primary color
6. If switching to/from Bold style, update text colors (dark/light mode)
7. Review HTML for style-specific classes (e.g., `.text-accent`, `.text-outline` for Bold)
8. Commit with message: "Redesign: Switch to [style name] style"

### Option 3: Update Content

Ask: "Do you have:
1 — A new business brief (text description)
2 — A URL to scrape content from
3 — Direct updates to site-data.json (I'll help you edit it)"

(Wait for answer)

**If business brief (1):** Ask them to paste it, then update site-data.json fields accordingly

**If URL (2):** Use web scraping (if available) or ask them to paste the content, then update site-data.json

**If direct updates (3):**
- Read current `site-data.json`
- Ask: "What do you want to update? (e.g., 'business hours', 'menu items', 'testimonials', 'team members', 'hero text')"
- Guide them through updating specific fields
- Validate JSON
- Commit changes

### Option 4: Redesign Layout

This is more extensive - improve the design while keeping content.

1. Read current `site-data.json` (preserve all content)
2. Read current style from `css/variables.css` (preserve colors/fonts)
3. Read CLAUDE.md design rules
4. Ask: "What's wrong with the current design? What would you like improved?"
5. Based on their feedback:
   - Update HTML structure for better layouts
   - Apply different layout recipes from CLAUDE.md
   - Fix AI slop issues (pills, badges, generic layouts)
   - Improve spacing and visual hierarchy
   - Add bleeding edge features if not present
6. Run 20-point self-check from letsgo.md
7. Commit with descriptive message

### Option 5: Change Colors/Fonts Only

1. Read current `css/variables.css`
2. Ask: "What would you like to change?
   1 — Primary color
   2 — Fonts (headings and/or body)
   3 — Both"
3. Based on answer:
   - For color: Ask for hex value, update `--color-primary` and related shades
   - For fonts: Ask for font family, update `--font-family` / `--font-family-heading`
4. Update `favicon.svg` with new primary color if changed
5. Commit changes

### Option 6: Add/Update Specific Content

Ask: "What content do you want to add or update?
1 — Testimonials
2 — Team members
3 — Menu items (restaurant)
4 — Services (salon/professional)
5 — Classes (fitness)
6 — Featured items
7 — Business info (hours, address, phone)"

(Wait for answer)

Guide them through adding/editing the specific section in `site-data.json`. Validate and commit.

### Option 7: Something Else

Ask them to describe what they need, then determine the best approach.

---

## Context A: Test Build from Templates Repo

If they chose option 1 (create test build):

1. Create `_test-builds/` directory if it doesn't exist
2. Ask for a project name (or generate one: `test-site-[timestamp]`)
3. Create subdirectory: `_test-builds/[project-name]/`
4. Run the full "Build New Site" flow, outputting to that directory
5. When done: "Test site created at `_test-builds/[project-name]/`

   To view it:
   ```bash
   cd _test-builds/[project-name]
   open index.html
   ```"

---

## Error Handling

**If templates not found:**
"I can't find the Let's Go! templates repo. Please:
1. Make sure you're running this from a directory that has access to the templates, OR
2. Tell me the path to the Let's Go! templates directory"

**If files are missing:**
"Some required template files are missing. Let me rebuild the base template first..."
Then run Prompt 0 from PROMPTS.md.

**If site-data.json is invalid:**
"Your site-data.json has syntax errors. Let me fix them..."
Attempt to fix common JSON errors, show them the issue, ask if they want to proceed with fixes.

---

## Summary

This command now handles 3 contexts:
- **New site:** Full build process with questions
- **Existing site:** 7 update options (add pages, change style, update content, etc.)
- **Templates repo:** Offer to create test build or exit

The user can use `/letsgo` at any stage to build or improve their site.
