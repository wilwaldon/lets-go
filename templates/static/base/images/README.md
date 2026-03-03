# Hero Background Images

Add hero background images to this folder to automatically display them on your pages.

## Naming Convention

```
hero-{pageName}.{extension}
```

## Page Name Mapping

| HTML File      | Page Name | Example Filename           |
| -------------- | --------- | -------------------------- |
| `index.html`   | `home`    | `hero-home.jpg`            |
| `page-2.html`  | `menu`    | `hero-menu.webp`           |
| `page-3.html`  | `about`   | `hero-about.jpg`           |
| `contact.html` | `contact` | `hero-contact.jpg`         |
| `page-4.html`  | `services`| `hero-services.webp`       |

## Supported Formats

Listed in order of performance (best to good):
1. **`.webp`** - Best compression, modern browsers
2. **`.avif`** - Excellent quality, newer format
3. **`.jpg` / `.jpeg`** - Universal compatibility
4. **`.png`** - Use only if you need transparency

**Pro Tip**: If you add multiple formats (e.g., both `hero-home.webp` and `hero-home.jpg`), the script will automatically use WebP in supported browsers and fall back to JPG in older browsers.

## Image Specifications

- **Minimum Size**: 1920x800px (landscape orientation)
- **Aspect Ratio**: 21:9 or 16:9 recommended
- **File Size**: Keep under 500KB for fast loading
- **Composition**: Choose images with good contrast or darker areas where text will appear

## Automatic Features

When you add a hero image, the following happens automatically:

✅ **Image displays** as full-bleed background
✅ **Dark overlay** (80% opacity) is applied for text readability
✅ **Text turns white** for better contrast
✅ **Responsive** - images scale beautifully on all devices
✅ **No code changes needed** - just add the image!

## Quick Start

1. Choose or create a hero image for your page
2. Name it using the convention above (e.g., `hero-home.jpg`)
3. Add it to this `/images/` folder
4. Refresh your page - the image appears automatically!

## Examples

```bash
images/
├── hero-home.webp       # Home page hero (preferred format)
├── hero-home.jpg        # Fallback for older browsers
├── hero-menu.jpg        # Menu page hero
├── hero-about.webp      # About page hero
└── hero-contact.jpg     # Contact page hero
```

## Image Optimization Tips

- **Compress before uploading**: Use tools like:
  - [TinyJPG](https://tinyjpg.com) for JPG/PNG
  - [Squoosh](https://squoosh.app) for all formats
  - [ImageOptim](https://imageoptim.com) (Mac only)

- **Choose the right format**:
  - Photos → WebP or JPG
  - Graphics with transparency → PNG
  - Maximum quality → AVIF

- **Test on mobile**: Hero images are responsive but check they look good on small screens

## No Image Fallback

If no hero image is found for a page:
- Page displays with clean, styled background
- Text uses default dark colors
- Everything works normally
- No broken images or errors

---

**Need help?** Check the main README.md in the project root for more customization options.
