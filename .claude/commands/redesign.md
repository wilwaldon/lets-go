Read CLAUDE.md in this repo — specifically the entire UI/Design Rules section.

The user wants to improve the design of their existing site.

**SHORTCUT DETECTION:**

The user may have specified what to fix:

- "/redesign style-name" or "/redesign 1-6" → Run `/switch-style` with that style
- "/redesign layout" → Run `/redesign-layout`
- "/redesign typography" → Run `/redesign-typography`
- "/redesign animations" → Run `/redesign-animations`
- "/redesign slop" → Run `/redesign-slop`
- "/redesign copy" → Run `/copy`
- "/redesign 1,2,4" → Run multiple sub-skills
- "/redesign everything" or "/redesign all" → Run all sub-skills

If shortcut detected, execute immediately. Otherwise continue below.

**Step 1 — Quick diagnostic scan:**

Read the homepage (index.html) and do a 30-second visual scan:

1. Are there 3+ different layout patterns? If NO → layout problem
2. Are headings tight letter-spacing (-0.03em)? If NO → typography problem
3. Do sections fade in on scroll? Do cards lift on hover? If NO → animation problem
4. Are there colored pills above headings? Decorative lines next to labels? Star emojis? If YES → slop problem
5. Does copy say "Welcome to..." or "Learn More"? If YES → copy problem

**Step 2 — Present focused options:**

"What do you want to improve? Pick any that apply (e.g., 1,2,4):

1 — Layouts are repetitive or boring
• Same layout pattern on every section
• No variety (all grids, or all centered)
• No split layouts, statement sections, or staggered grids
• Homepage feels like a vertical stack of identical boxes

**Fix:** Run `/redesign-layout`

2 — Too much AI slop (obvious tells)
• Colored pills/badges above section headings
• Decorative lines next to labels (the #1 AI tell)
• Three equal-width cards with icon + title + paragraph
• Circular team photos
• Star emoji ratings (★★★★★)
• Pill-shaped buttons (border-radius: 9999px)
• "Welcome to..." / "Learn More" / generic copy

**Fix:** Run `/redesign-slop` for visual slop, `/copy` for copy slop

3 — Typography and spacing need work
• Headings too small or same size
• Letter-spacing not tightened on headings
• Body text too wide or line-height too tight
• Sections feel cramped
• Grid gaps too small

**Fix:** Run `/redesign-typography`

4 — Animations and interactions feel flat
• No scroll-triggered animations
• Cards don't respond to hover
• Hero loads all at once (not staggered)
• No header scroll effect
• Mobile menu snaps (doesn't slide)

**Fix:** Run `/redesign-animations`

5 — Everything (full redesign pass)
Run all of the above systematically.

6 — Switch design style
Change to a different style (Editorial, Modern Minimal, Bold & Confident, etc.)

**Fix:** Run `/switch-style`

7 — Something specific (describe it)"

**Step 3 — Execute based on selection:**

### If they pick 1 (Layouts):
Execute the `/redesign-layout` skill.

### If they pick 2 (AI Slop):
Execute both `/redesign-slop` (for visual slop) AND `/copy` (for copy slop).

### If they pick 3 (Typography):
Execute the `/redesign-typography` skill.

### If they pick 4 (Animations):
Execute the `/redesign-animations` skill.

### If they pick 5 (Everything):
Execute ALL sub-skills in this order:
1. `/redesign-slop` (remove visual clutter first)
2. `/copy` (fix copy quality)
3. `/redesign-layout` (establish variety)
4. `/redesign-typography` (refine hierarchy and spacing)
5. `/redesign-animations` (add polish)

After each sub-skill completes, show progress: "[X/5] complete — [skill name] done"

### If they pick 6 (Switch style):
Execute the `/switch-style` skill.

### If they pick 7 (Something specific):
Read their description and determine which sub-skill(s) to run, or handle the specific request manually if it doesn't fit a sub-skill.

### If they pick multiple (e.g., "1,2,4"):
Parse their response and execute the corresponding sub-skills in sequence.

**Step 4 — After completion:**

Run these final checks:

**Layout check:**
1. index.html has 3+ different layout recipes? ✓
2. No adjacent sections with same layout? ✓
3. At least one statement section (Recipe 3)? ✓

**Slop check:**
4. No decorative lines next to labels (::before/::after)? ✓
5. No colored pills above headings? ✓
6. No star emoji ratings? ✓
7. No circular team photos? ✓

**Typography check:**
8. h1 letter-spacing: -0.03em? ✓
9. Body line-height: 1.7+? ✓
10. Text blocks max-width: ~36rem? ✓

**Animation check:**
11. Sections fade in on scroll? ✓
12. Cards lift on hover? ✓
13. Hero has staggered entrance? ✓

**Copy check:**
14. No "Welcome to..." anywhere? ✓
15. No "Learn More" buttons? ✓
16. CTAs are specific actions? ✓

**Step 5 — Link validation:**

Run this script to check for broken links:

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

if [ -f "site-data.json" ]; then
  node -e "
    const data = JSON.parse(require('fs').readFileSync('site-data.json','utf8'));
    if (data.navigation) {
      data.navigation.forEach(item => {
        if (!require('fs').existsSync(item.href)) {
          console.log('BROKEN: site-data.json nav has ' + item.href);
        }
      });
    }
  " 2>/dev/null
fi
echo "=== Done ==="
```

Fix any broken links before finishing.

**Step 6 — Commit changes:**

If changes were made:
- Update CHANGELOG.md: "Design improvements: [what changed]"
- Commit: "design: [brief description of changes]"

**Step 7 — Show final summary:**

"✅ Redesign complete!

**Changes made:**
- [Summary of what each sub-skill fixed]

**Before → After scores:**
- Layout variety: [X]% → [Y]%
- AI slop removed: [X] items
- Typography improvements: [X] fixes
- Animations added: [X] interactions

Want me to run another pass, or does this look good?"

If they want more, ask which areas need additional work and iterate.

RULES:

- ALWAYS delegate to sub-skills rather than duplicating their logic
- NEVER skip the final checks (steps 4-5)
- NEVER commit without updating CHANGELOG.md
- ALWAYS run link validation after making changes
- ALWAYS show before/after comparison when possible
- If running multiple sub-skills, show progress between each one
- If user says "everything" or "all", run ALL five sub-skills in order