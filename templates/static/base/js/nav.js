/**
 * nav.js — Mobile navigation menu
 * Handles hamburger toggle, backdrop, scroll lock, keyboard dismiss
 */

function initNav() {
  var hamburger = document.querySelector('[data-hamburger]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  var backdrop = document.querySelector('[data-mobile-backdrop]');
  var closeBtn = document.querySelector('[data-mobile-close]');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-visible');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');

    // Focus the close button
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');

    // Return focus to hamburger
    hamburger.focus();
  }

  hamburger.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close menu on link click (for same-page navigation)
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}

export { initNav };
