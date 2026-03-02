# create-lets-go-app

Generate production-ready local business websites instantly.

## Usage

```bash
npx create-lets-go-app
```

The CLI will ask you 4 questions:

1. **Stack type** — Static site or full-stack (Vite + React + Supabase)
2. **Business type** — Restaurant, Salon, Fitness, or Professional Services
3. **Design style** — Editorial, Modern Minimal, Bold, Warm, Classic, or Material
4. **Business name** — Your business name

Then it generates a complete, production-ready site in seconds.

## What You Get

### Static Site

- HTML/CSS/JS with no build tools
- Single JSON file for all content (site-data.json)
- 5 pages: Home, [business-specific], Contact, About, 404
- Mobile-first responsive design
- Scroll animations and lazy image loading
- Contact form with validation
- SEO-ready (sitemap, robots.txt, meta tags)
- Git repository initialized with initial commit

### Full Stack (Coming Soon)

- Vite + React + TypeScript
- Supabase backend (auth, database, storage)
- Stripe/Square payments
- Booking system
- Customer portal
- Admin dashboard

## After Generation

```bash
cd your-project-name
npx serve
```

Then open http://localhost:3000

## Customization

- **Content**: Edit `site-data.json`
- **Colors/Fonts**: Edit `css/variables.css`
- **Design**: See `README.md` in your project

## Requirements

- Node.js 18 or higher

## License

MIT
