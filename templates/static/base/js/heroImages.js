/**
 * Hero Image Detection for Static Sites
 *
 * Automatically detects and applies hero background images
 * based on the current page name.
 *
 * Image naming convention: hero-{pageName}.{ext}
 * Supported formats: webp, avif, jpg, jpeg, png
 */

const IMAGE_FORMATS = ['webp', 'avif', 'jpg', 'jpeg', 'png'];

/**
 * Get page name from current URL
 */
function getPageName() {
  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '') || 'index';

  // Map file names to page names
  const pageMap = {
    'index': 'home',
    'contact': 'contact',
    'page-2': 'menu',
    'page-3': 'about',
    'page-4': 'services',
  };

  return pageMap[page] || page;
}

/**
 * Check if image exists
 */
function imageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/**
 * Find hero image for current page
 */
async function findHeroImage(pageName) {
  for (const format of IMAGE_FORMATS) {
    const imagePath = `images/hero-${pageName}.${format}`;
    if (await imageExists(imagePath)) {
      return imagePath;
    }
  }
  return null;
}

/**
 * Apply hero background image
 */
function applyHeroImage(imagePath) {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  // Create background container
  const bgContainer = document.createElement('div');
  bgContainer.className = 'hero__background';
  bgContainer.style.cssText = `
    position: absolute;
    inset: 0;
    z-index: 0;
  `;

  // Create image element
  const bgImage = document.createElement('div');
  bgImage.className = 'hero__background-image';
  bgImage.style.cssText = `
    position: absolute;
    inset: 0;
    background-image: url('${imagePath}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'hero__overlay';
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);
  `;

  bgContainer.appendChild(bgImage);
  bgContainer.appendChild(overlay);

  // Make hero section relative and add background
  heroSection.style.position = 'relative';
  heroSection.insertBefore(bgContainer, heroSection.firstChild);

  // Make content relative so it's above background
  const heroContent = heroSection.querySelector('.hero__content');
  if (heroContent) {
    heroContent.style.position = 'relative';
    heroContent.style.zIndex = '10';
  }

  // Change text colors to white
  heroSection.classList.add('hero--has-image');

  // Add CSS for white text
  if (!document.getElementById('hero-image-styles')) {
    const style = document.createElement('style');
    style.id = 'hero-image-styles';
    style.textContent = `
      .hero--has-image .hero__tagline {
        color: rgba(255, 255, 255, 0.9) !important;
      }
      .hero--has-image .hero__title {
        color: #ffffff !important;
      }
      .hero--has-image .hero__description {
        color: rgba(255, 255, 255, 0.85) !important;
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Initialize hero images
 */
async function initHeroImages() {
  const pageName = getPageName();
  const heroImage = await findHeroImage(pageName);

  if (heroImage) {
    applyHeroImage(heroImage);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroImages);
} else {
  initHeroImages();
}
