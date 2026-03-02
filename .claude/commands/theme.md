Read CLAUDE.md in this repo.

The user wants to change the site's theme (colors, fonts, or both).

Ask them:

"What do you want to change? Pick a number:
1 — Primary color only
2 — Primary + secondary colors
3 — Fonts only
4 — Full theme (colors + fonts)
5 — Give me a vibe (describe the feel and I'll pick for you)"

If they pick 1-4, ask for the specific values:

- Colors: ask for hex codes, or accept color names and convert to hex
- Fonts: ask for font family name (must be a system-safe font or one available via standard OS installs — no Google Fonts CDN links)

If they pick 5, ask: "Describe the vibe in a few words (e.g., 'warm and rustic', 'clean and corporate', 'bold and modern', 'earthy and calm')"
Then select appropriate colors and fonts that match, and show them what you chose before applying.

**If static site:**

1. Update theme.primaryColor and theme.secondaryColor in site-data.json
2. Update the fallback values in css/variables.css to match (these are defaults before JS loads)
3. If fonts changed, update --font-family in variables.css and the system font stack
4. Verify the site still looks good — check contrast ratios between text and backgrounds
5. Add an entry to CHANGELOG.md: "Updated theme: [what changed]"
6. Commit: "style: update theme"

**If full stack:**

1. Update theme values in site.config.ts
2. Update tailwind.config.ts if custom colors are defined there
3. Verify the build still passes
4. Add an entry to CHANGELOG.md
5. Commit: "style: update theme"

RULES:

- Maintain WCAG AA contrast ratio (4.5:1 for text, 3:1 for large text)
- Never use Tailwind's default indigo/violet as primary
- Follow all NO AI SLOP rules from CLAUDE.md
- If the user picks colors with poor contrast, warn them and suggest alternatives
