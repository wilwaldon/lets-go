Read CLAUDE.md in this repo.

The user wants to generate site-data.json from an existing website.

Ask them: "Paste the URL of the existing business website."

(Wait for their answer)

Then ask: "What business type? Pick a number:
1 — Restaurant / Café
2 — Salon / Barbershop
3 — Fitness / Gym
4 — Professional Services"

(Wait for their answer)

Once you have both:

1. Use `curl` to fetch the HTML from the URL
2. Parse the page content to extract:
   - Business name (from <title>, <h1>, or logo text)
   - Tagline or description (from meta description, hero text, or about section)
   - Phone number (look for tel: links or common phone patterns)
   - Email (look for mailto: links or email patterns)
   - Address (look for structured address data, schema.org, or common address patterns)
   - Hours (look for hours tables, schema.org OpeningHoursSpecification)
   - Social media links (look for facebook.com, instagram.com, twitter.com, linkedin.com, yelp.com links)
   - Team/staff names and titles (from about/team pages if linked)
   - Services, menu items, or class schedules depending on business type
   - Testimonials or reviews
   - Any images that are referenced (note the URLs but don't download them)

3. If the homepage doesn't have all the info, also try fetching:
   - /about, /menu, /services, /team, /contact, /hours — whatever seems relevant for the business type

4. Generate a complete site-data.json following the structure from CLAUDE.md:
   - Merge extracted content into the correct JSON fields
   - For anything you couldn't find, use realistic placeholders clearly marked with [PLACEHOLDER] so the user knows to update them
   - Set the theme colors by extracting the dominant colors from the site (look for CSS custom properties, common brand colors in the stylesheets, or prominent hex values)

5. Also generate a favicon.svg using the first letter of the business name and the extracted primary color

6. Save site-data.json to the project root (overwriting the existing one if present)

7. Print a summary:
   - What was extracted successfully
   - What was marked as [PLACEHOLDER] and needs manual input
   - Suggested next steps

IMPORTANT:

- If the site blocks curl or returns a captcha, tell the user and ask them to paste the page content directly instead
- Do not include any content that appears to be behind a login or paywall
- Strip out any HTML/scripts — only extract clean text content
- Be conservative: if something looks ambiguous, mark it as [PLACEHOLDER] rather than guessing wrong
