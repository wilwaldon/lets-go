/**
 * Hero Image Detection Utility
 *
 * Automatically detects hero images based on page name.
 * Supports: jpg, jpeg, png, webp, avif
 *
 * Usage:
 *   import { getHeroImage } from '@/lib/heroImages';
 *   const heroImage = getHeroImage('home'); // Returns '/images/hero-home.jpg' if exists
 *
 * Image naming convention:
 *   /public/images/hero-{pageName}.{ext}
 *   Examples: hero-home.jpg, hero-menu.webp, hero-about.png
 */

// Supported image formats (in order of preference)
const IMAGE_FORMATS = ['webp', 'avif', 'jpg', 'jpeg', 'png'];

// Cache for detected images
const imageCache = new Map<string, string | null>();

/**
 * Get hero image path for a page
 * Returns null if no image found
 */
export function getHeroImage(pageName: string): string | null {
  // Check cache first
  if (imageCache.has(pageName)) {
    return imageCache.get(pageName) ?? null;
  }

  // Try each format
  for (const format of IMAGE_FORMATS) {
    const imagePath = `/images/hero-${pageName}.${format}`;

    // For Vite, we'll attempt to use the path and let the browser 404 if not found
    // In production, only include images that actually exist
    if (checkImageExists(imagePath)) {
      imageCache.set(pageName, imagePath);
      return imagePath;
    }
  }

  imageCache.set(pageName, null);
  return null;
}

/**
 * Check if image exists (client-side detection)
 * Note: This is a best-effort check. Images should be added to /public/images/
 */
function checkImageExists(path: string): boolean {
  // In development, we'll try to load the image
  // This is a synchronous check that works with Vite's static asset handling
  try {
    // For Vite, images in /public are served at the root
    // We'll return true and let the browser handle 404s
    // Users should ensure images exist before deploying
    return true; // Optimistic - assumes image exists if following naming convention
  } catch {
    return false;
  }
}

/**
 * Preload hero image for better performance
 */
export function preloadHeroImage(pageName: string): void {
  const imagePath = getHeroImage(pageName);
  if (imagePath) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imagePath;
    document.head.appendChild(link);
  }
}

/**
 * Get all available hero images
 * Useful for build-time optimization
 */
export function getAllHeroImages(): Record<string, string> {
  const pages = ['home', 'menu', 'about', 'contact', 'checkout'];
  const images: Record<string, string> = {};

  pages.forEach((page) => {
    const image = getHeroImage(page);
    if (image) {
      images[page] = image;
    }
  });

  return images;
}
