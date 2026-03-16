```
 _          _   _       ____       _
| |    ___| |_( )___  / ___| ___ | |
| |   / _ \ __|// __| | |  _ / _ \| |
| |__|  __/ |_  \__ \ | |_| | (_) |_|
|_____\___|\__| |___/  \____|\___/(_)
```

# LetsGo!

**Production-ready static websites for local businesses in minutes with Claude Code.**

LetsGo! is a static site generator that creates beautiful, professional websites tailored to specific business types with Claude Code. No build tools, no npm, no frameworks—just clean HTML, CSS, and vanilla JavaScript that you can edit directly.

## Features

- 🎨 **4 Business Templates** - Restaurant, Salon, Fitness, Professional Services
- 📱 **Mobile-First Design** - Looks great on all devices
- ⚡ **Zero Dependencies** - Pure HTML/CSS/JS, no build step needed
- 🎯 **JSON-Driven Content** - Edit one file to update your entire site
- 🎨 **Easy Theming** - Change colors instantly via JSON
- ♿ **Accessible** - Semantic HTML, ARIA labels, keyboard navigation
- 🚀 **Deploy Anywhere** - Works on any static host (Vercel, Netlify, GitHub Pages)
- 🔒 **SEO-Ready** - Meta tags, Open Graph, sitemaps included
- 📝 **Real Content** - Pre-filled with realistic-ish business content (no Lorem Ipsum)

## Quick Start

### Option 1: Using Claude Code (Fastest)

If you have [Claude Code](https://github.com/anthropics/claude-code) installed:

```bash
cd ~/projects
```

Then in Claude Code, run:

```
/letsgo
```

The command will:

1. Ask for your business type (restaurant, salon, fitness, or professional)
2. Ask for your business name
3. Generate a complete, customized static website
4. Set up git repository

### Option 2: Manual Setup

**1. Clone this repository**

```bash
git clone https://github.com/wilwaldon/lets-go.git
cd lets-go
```

**2. Copy the base template to your project folder**

```bash
cp -r templates/static/base/ my-business-site/
```

**3. Choose and apply your business type**

```bash
# For a restaurant:
cp templates/static/configs/restaurant.json my-business-site/site-data.json

# For a salon/barbershop:
cp templates/static/configs/salon.json my-business-site/site-data.json

# For a gym/fitness studio:
cp templates/static/configs/fitness.json my-business-site/site-data.json

# For professional services (law, consulting, etc.):
cp templates/static/configs/professional.json my-business-site/site-data.json
```

**4. Customize your content**

Edit `site-data.json`:

- Change business name, description, contact info
- Update hours of operation
- Add your social media links
- Customize hero text and CTAs
- Add your menu items/services/classes/etc.

**5. Add your images**

Place your photos in the `images/` directory and reference them in `site-data.json`:

```json
{
  "team": [
    {
      "name": "Your Name",
      "photo": "images/team-photo.jpg"
    }
  ]
}
```

**6. Preview locally**

```bash
cd my-business-site
npx serve
```

Open http://localhost:3000 in your browser.

**Note:** You need a local server because the site uses `fetch()` to load JSON. Files won't work if opened directly with `file://`.

Alternative local servers:

```bash
# Python
python -m http.server 8000

# VS Code
# Install "Live Server" extension and click "Go Live"
```

## Business Templates Included

### 🍝 Restaurant / Café

**5 Pages:** Home, Menu, Order/Reservations, About, Contact

Pre-built with:

- Menu display with categories (Appetizers, Mains, Desserts, Drinks)
- Item pricing and dietary tags (vegetarian, gluten-free, etc.)
- Featured dishes section
- Customer testimonials
- Hours and location

### 💇 Salon / Barbershop

**5 Pages:** Home, Services, Book Appointment, Team, Contact

Pre-built with:

- Service list with prices and durations
- Staff profiles with photos and specialties
- Booking call-to-action
- Customer testimonials
- Hours and location

### 💪 Fitness / Gym

**5 Pages:** Home, Class Schedule, Membership Plans, Trainers, Contact

Pre-built with:

- Weekly class schedule
- Membership tier comparison (Basic, Unlimited, Premium)
- Trainer profiles with certifications
- Featured class highlights
- Hours and location

### 💼 Professional Services

**5 Pages:** Home, Services, Team, Client Portal Info, Contact

Pre-built with:

- Service descriptions
- Credentials and qualifications
- Partner/staff bios
- Client portal information
- Contact form with intake fields

All templates include a 404 error page, sitemap.xml, and robots.txt.

## How It Works

LetsGo! uses a simple data-binding system:

1. **All content lives in `site-data.json`** - This is your single source of truth
2. **HTML pages use `data-bind` attributes** - Elements automatically populate from JSON
3. **JavaScript loads the JSON on page load** - `js/data.js` handles everything
4. **CSS custom properties for theming** - Colors update instantly from JSON

Example:

```html
<h1 data-bind="business.name"></h1>
<!-- Automatically becomes: -->
<h1>Your Business Name</h1>
```

## Site Structure

```
your-site/
├── index.html              # Homepage
├── menu.html              # Business-specific page 2
├── order.html             # Business-specific page 3
├── about.html             # Business-specific page 4
├── contact.html           # Contact form + info
├── 404.html               # Error page
├── robots.txt             # SEO configuration
├── sitemap.xml            # Search engine sitemap
├── site-data.json         # ALL your content (edit this!)
├── CHANGELOG.md           # Version history
├── README.md              # Setup instructions
├── css/
│   ├── reset.css         # CSS normalization
│   ├── variables.css     # Theme colors/fonts
│   └── styles.css        # All site styles
├── js/
│   ├── data.js           # JSON loader & data binding
│   ├── nav.js            # Mobile menu
│   ├── forms.js          # Contact form validation
│   └── main.js           # Initialization
└── images/               # Your images
```

Page names (menu.html, order.html, etc.) vary by business type.

## Customizing Your Site

### Change Business Info

Edit `site-data.json`:

```json
{
  "business": {
    "name": "Your Business Name",
    "tagline": "Your tagline",
    "description": "What your business does",
    "phone": "(555) 123-4567",
    "email": "hello@yourbusiness.com",
    "address": {
      "street": "123 Main St",
      "city": "Your City",
      "state": "CA",
      "zip": "12345"
    }
  }
}
```

### Change Colors

Update the theme section:

```json
{
  "theme": {
    "primaryColor": "#2563EB", // Your brand color
    "secondaryColor": "#1e293b" // Accent color
  }
}
```

Colors are applied automatically throughout the entire site via CSS custom properties.

### Update Navigation

Edit the navigation array:

```json
{
  "navigation": [
    { "label": "Home", "href": "index.html" },
    { "label": "Menu", "href": "menu.html" },
    { "label": "Order", "href": "order.html" },
    { "label": "About", "href": "about.html" },
    { "label": "Contact", "href": "contact.html" }
  ]
}
```

### Add More Pages

**With Claude Code:**

```
/addpage
```

**Manually:**

1. Copy an existing HTML page
2. Customize the content
3. Add to `navigation` array in `site-data.json`
4. Update `sitemap.xml`
5. Add entry to `CHANGELOG.md`

## Deployment

Your site is just static files. Upload to any host.

### Vercel (Easiest)

```bash
npm install -g vercel
cd my-business-site
vercel
```

Follow the prompts. Your site will be live at `yoursite.vercel.app` (free).

### Netlify

**Option 1: Drag and Drop**

- Go to [app.netlify.com/drop](https://app.netlify.com/drop)
- Drag your site folder
- Done!

**Option 2: CLI**

```bash
npm install -g netlify-cli
cd my-business-site
netlify deploy
```

### GitHub Pages

```bash
cd my-business-site
git init
git add .
git commit -m "Initial site"
git remote add origin https://github.com/yourusername/yoursite.git
git push -u origin main
```

Then:

1. Go to repo Settings → Pages
2. Set source to "main branch / root"
3. Your site will be live at `https://yourusername.github.io/yoursite/`

### Traditional Web Host

Upload all files via FTP/SFTP to your web host's public directory (`public_html/` or `www/`).

## Design Philosophy

LetsGo! creates sites that look like a professional developer built them, not AI.

**✅ What You Get:**

- Clean, restrained color palettes
- Real typographic hierarchy
- Generous white space
- Content-first layouts
- Subtle, purposeful animations
- Professional, modern aesthetic

**❌ What You DON'T Get:**

- Gradient backgrounds everywhere
- Glassmorphism effects
- Over-rounded corners on everything
- Generic "synergy" marketing speak
- Floating blob decorations
- Excessive drop shadows
- Animation overload

The goal is Squarespace/Stripe quality, not a Canva template.

## Browser Support

- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ iOS Safari (last 2 versions)
- ✅ Chrome Android (last 2 versions)

Works on screens from 320px (small phone) to 4K desktop displays.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid
- **Vanilla JavaScript** (ES6+) - No libraries, no frameworks
- **Zero build tools** - No webpack, no bundlers, no compilation

## Additional Claude Code Commands

Once you have a site generated:

- `/addpage` - Add a new page (Gallery, FAQ, Blog, etc.)
- `/update` - Update business content
- `/theme` - Change theme colors

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ideas for contributions:**

- Additional business type templates (Dentist, Spa, Auto Shop, etc.)
- Accessibility improvements
- New page templates (Blog, Gallery, etc.)
- Documentation improvements
- Bug fixes

## License

MIT License - see [LICENSE](LICENSE) for details.

Free to use for personal and commercial projects.

## Support

- 📖 [Full Documentation](ARCHITECTURE.md)
- 🐛 [Report Issues](https://github.com/wilwaldon/lets-go/issues)
- 💬 [Discussions](https://github.com/wilwaldon/lets-go/discussions)

## Credits

Built with [Claude Code](https://github.com/anthropics/claude-code).
Built by [Wil Waldon](https://wilwaldon.com).

---

**Let's Go!**
