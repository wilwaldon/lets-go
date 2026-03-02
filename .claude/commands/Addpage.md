Read CLAUDE.md and ARCHITECTURE.md in this repo.

The user wants to add a new page to an existing Let's Go! project.

Ask them: "What page do you want to add? (e.g., Gallery, FAQ, Blog, Pricing, Events, Careers, Privacy Policy, Terms of Service)"

Then determine if this is a static site or full stack project by checking if package.json exists with Vite dependencies.

**If static site:**

1. Create a new .html file following the same structure as existing pages (duplicate header/footer, data-bind attributes, SEO meta tags)
2. Add a relevant section to site-data.json with realistic placeholder content for the new page
3. Add the page to the navigation[] array in site-data.json
4. Update the nav markup in ALL existing HTML files to include the new page link
5. Update sitemap.xml to include the new page
6. Add an entry to CHANGELOG.md: "Added [page name] page"
7. Commit: "feat: add [page name] page"

**If full stack:**

1. Create a new page component in the active template's pages/ directory
2. Add the route to the template's routes.ts with showInNav: true
3. Create any necessary types or hooks if the page needs data
4. Add an entry to CHANGELOG.md
5. Commit: "feat: add [page name] page"

Follow ALL design rules from CLAUDE.md — NO AI SLOP. The new page must match the existing site's style exactly.
