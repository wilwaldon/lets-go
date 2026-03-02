Read CLAUDE.md in this repo.

The user wants to update the site content from a new business brief.

Ask them: "Paste or describe the updated business information. This can include: business name, hours, services, menu items, team members, contact info, tagline — whatever has changed."

Then determine if this is a static site or full stack project.

**If static site:**

1. Read the current site-data.json
2. Update ONLY the fields the user mentioned — do not overwrite or remove existing content they didn't mention
3. If they provide new team members, services, menu items, etc., add them to the existing arrays (don't replace unless they explicitly say to)
4. Verify all data-bind references still work after the update
5. Update meta descriptions if the business description changed
6. Add an entry to CHANGELOG.md: "Updated [list what changed]"
7. Commit: "content: update [brief description of changes]"

**If full stack:**

1. Read the current site.config.ts and any relevant seed data
2. Update the config and seed files based on the new brief
3. If database schema needs to change, create a new migration file
4. Add an entry to CHANGELOG.md
5. Commit: "content: update [brief description of changes]"

IMPORTANT: Never delete existing content unless the user explicitly asks. Always add or modify, not replace.
