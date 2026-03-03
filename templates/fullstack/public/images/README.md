# Hero Images

Add hero background images to this folder using the naming convention:

```
hero-{pageName}.{extension}
```

## Supported Image Formats

Listed in order of preference (best performance to compatibility):
- `.webp` - Modern, best compression
- `.avif` - Excellent quality, newer format
- `.jpg` / `.jpeg` - Universal compatibility
- `.png` - Use only if transparency needed

## Required Images

| Page     | Filename Examples                        | Description                    |
| -------- | ---------------------------------------- | ------------------------------ |
| Home     | `hero-home.jpg`, `hero-home.webp`        | Main landing page hero         |
| Menu     | `hero-menu.jpg`, `hero-menu.webp`        | Menu page hero                 |
| About    | `hero-about.jpg`, `hero-about.webp`      | About page hero                |
| Contact  | `hero-contact.jpg`, `hero-contact.webp`  | Contact page hero              |
| Checkout | `hero-checkout.jpg`, `hero-checkout.webp`| Checkout page hero (optional)  |

## Image Requirements

- **Minimum dimensions**: 1920x800px (landscape)
- **Aspect ratio**: 21:9 or 16:9 recommended
- **File size**: Keep under 500KB for good performance
- **Subject matter**: Choose images with darker areas or good contrast for text overlay

## How It Works

1. **Automatic Detection**: The app automatically looks for hero images matching the page name
2. **Format Priority**: If multiple formats exist, WebP is preferred, then AVIF, JPG, PNG
3. **Dark Overlay**: A 80% dark overlay is automatically applied for text readability
4. **White Text**: Hero text automatically changes to white when an image is present

## Example Usage

If you add `hero-home.webp` to this folder:
- Home page will automatically display the image
- Text will turn white
- Dark overlay will be applied
- No code changes needed!

## Tips

- Use high-quality photos of your food, restaurant, team, or ambiance
- Ensure important subjects aren't at the center (where text appears)
- Test on mobile devices - images are responsive
- Compress images before uploading (use tools like TinyPNG or Squoosh)

## No Image Fallback

If no hero image is found, the page displays with:
- Clean white background
- Dark text (default colors)
- No overlay
- Full functionality maintained
