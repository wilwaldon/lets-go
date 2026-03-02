# {{business.name}}

A modern, production-ready static website built with Let's Go!.

## Quick Start

This is a static HTML/CSS/JavaScript site with no build tools required. To view it locally:

**Option 1 — Using npx serve (recommended):**
```bash
npx serve
```
Then open http://localhost:3000

**Option 2 — Using VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` and select "Open with Live Server"

**Option 3 — Using Python:**
```bash
python -m http.server 8000
```
Then open http://localhost:8000

**Important:** Opening `index.html` directly with `file://` will NOT work because the site loads data from `site-data.json`, which requires a server due to CORS restrictions.

## Project Structure

```
├── index.html              # Homepage
├── about.html              # About page (or business-specific page)
├── [menu|services].html    # Menu/services page (business-specific)
├── [order|book].html       # Order/booking page (business-specific)
├── contact.html            # Contact page
├── 404.html                # Error page
├── site-data.json          # ALL site content (single source of truth)
├── sitemap.xml             # Search engine sitemap
├── robots.txt              # Crawler instructions
├── favicon.svg             # Site icon
├── css/
│   ├── reset.css           # CSS reset
│   ├── variables.css       # Design tokens (colors, fonts, spacing)
│   └── styles.css          # All site styles
├── js/
│   ├── data.js             # Loads site-data.json and populates content
│   ├── nav.js              # Mobile menu functionality
│   ├── forms.js            # Form validation and submission
│   └── main.js             # Initialization and scroll effects
├── images/                 # Your images go here
├── CHANGELOG.md            # Version history
└── README.md               # This file
```

## Editing Content

**All site content lives in `site-data.json`** — this is the single source of truth.

To update text, hours, contact info, menu items, testimonials, or any content:

1. Open `site-data.json`
2. Edit the values you want to change
3. Save the file
4. Refresh your browser — changes appear automatically

Example:
```json
{
  "business": {
    "name": "Your Business Name",
    "phone": "(555) 123-4567"
  }
}
```

The HTML files use `data-bind` attributes to pull content from this JSON file. You rarely need to edit HTML directly.

## Customizing Design

### Colors
Edit `theme.primaryColor` and `theme.secondaryColor` in `site-data.json`:

```json
{
  "theme": {
    "primaryColor": "#2563EB",
    "secondaryColor": "#1e293b"
  }
}
```

Colors update automatically when you refresh the page.

### Fonts
To change fonts, edit `--font-family` in `css/variables.css`:

```css
:root {
  --font-family: 'Your Font', -apple-system, sans-serif;
}
```

Use system-safe fonts or web fonts already installed. Avoid adding Google Fonts CDN links (increases load time).

### Spacing & Layout
Design tokens in `css/variables.css` control spacing, borders, shadows, and more. Edit these values to adjust the design system:

```css
:root {
  --spacing-xl: 2rem;
  --border-radius: 0.5rem;
}
```

## Adding Images

1. Place images in the `images/` folder
2. Reference them in `site-data.json` or HTML:

```json
{
  "team": [
    {
      "name": "Team Member",
      "photo": "images/team-1.jpg"
    }
  ]
}
```

Or in HTML:
```html
<img src="images/hero.jpg" alt="Description">
```

For better performance, use `data-src` for lazy loading:
```html
<img data-src="images/hero.jpg" alt="Description">
```

## Contact Form

The contact form is pre-configured with validation. To make it functional:

**Option 1 — Formspree (easiest):**
1. Sign up at https://formspree.io
2. Get your form endpoint
3. Edit `js/forms.js` and add your endpoint:
```javascript
const formEndpoint = 'https://formspree.io/f/YOUR-FORM-ID';
```

**Option 2 — Netlify Forms:**
1. Deploy to Netlify
2. Add `netlify` attribute to the form in `contact.html`:
```html
<form data-contact-form netlify>
```

**Option 3 — Custom backend:**
Edit `js/forms.js` and update the submission logic to point to your API.

## Deployment

### Vercel (recommended)
1. Push to GitHub
2. Import project at https://vercel.com
3. Deploy (zero config needed)
4. Update `robots.txt` sitemap URL to your live domain

### Netlify
1. Drag and drop your project folder at https://app.netlify.com
2. Or connect your GitHub repo
3. Update `robots.txt` sitemap URL

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select branch and root directory
4. Update `robots.txt` sitemap URL

### Custom Server
Upload all files via FTP/SFTP to your web host. Ensure:
- `index.html` is in the root directory
- Server can serve static files
- MIME types are set correctly (`.svg`, `.json`, `.js`)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Samsung Internet 15+

## Performance

This site is optimized for speed:
- No external dependencies
- Lazy image loading
- Minimal JavaScript (~15KB total)
- Modern CSS with design tokens
- No jQuery, Bootstrap, or heavy frameworks

Expected Lighthouse scores:
- Performance: 95-100
- Accessibility: 90-100
- Best Practices: 95-100
- SEO: 90-100

## Updating the Site

When you make changes:

1. **Content changes** (text, images, data):
   - Edit `site-data.json`
   - Save and refresh — done

2. **Design changes** (colors, fonts, spacing):
   - Edit `css/variables.css` or `css/styles.css`
   - Save and refresh

3. **Adding new pages**:
   - Copy an existing HTML file (e.g., `page-2.html`)
   - Update the page title and content
   - Add the page to `navigation` array in `site-data.json`
   - Add the page to `sitemap.xml`

4. **Major updates**:
   - Document changes in `CHANGELOG.md`
   - Commit to git:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```

## Troubleshooting

**Content not loading:**
- Make sure you're using a local server (npx serve), not opening files directly
- Check browser console for errors (F12 → Console tab)
- Verify `site-data.json` is valid JSON (no trailing commas, proper quotes)

**Styles not applying:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check that CSS files are loading in Network tab (F12 → Network)

**Images not showing:**
- Verify image paths are correct in `site-data.json`
- Check that images exist in the `images/` folder
- Ensure image file names match exactly (case-sensitive on some servers)

**Form not submitting:**
- Check console for JavaScript errors
- Verify form endpoint is configured in `js/forms.js`
- Check that honeypot field is working (bots should be caught)

## Support

This site was generated by Let's Go!. For questions:
- Documentation: https://github.com/yourusername/lets-go
- Issues: https://github.com/yourusername/lets-go/issues

## License

See LICENSE file for details.
