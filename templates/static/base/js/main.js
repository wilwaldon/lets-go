/**
 * main.js — Entry point, initializes all modules
 */

import { initData } from './data.js';
import { initNav } from './nav.js';
import { initForms } from './forms.js';

document.addEventListener('DOMContentLoaded', async function () {
  // Load site data first — other modules depend on it
  await initData();

  // Remove skeleton loading states
  document.querySelectorAll('.skeleton').forEach(function (el) {
    el.classList.remove('skeleton');
    el.classList.remove('skeleton--text');
    el.classList.remove('skeleton--circle');
    el.classList.remove('skeleton--rect');
  });
  document.body.classList.add('is-loaded');

  // Initialize navigation
  initNav();

  // Initialize forms
  initForms();

  // Set current year in footer copyright
  var yearEls = document.querySelectorAll('[data-year]');
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

  // Highlight active nav link
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav a, .mobile-menu__nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ============================
  // Lazy image loading with blur-up
  // ============================

  var lazyImages = document.querySelectorAll('img[data-src]');

  if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
    var imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          var src = img.getAttribute('data-src');

          if (src) {
            // Create a new image to preload
            var preload = new Image();
            preload.onload = function () {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('lazy--loaded');
            };
            preload.src = src;
          }

          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px 0px'
    });

    lazyImages.forEach(function (img) {
      img.classList.add('lazy');
      imageObserver.observe(img);
    });
  } else {
    // Fallback — load all images immediately
    lazyImages.forEach(function (img) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }

  // ============================
  // Scroll-triggered animations
  // ============================

  var animateElements = document.querySelectorAll('.animate');

  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback — just show everything
    animateElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ============================
  // Header scroll state
  // ============================

  var header = document.querySelector('.header');

  if (header) {
    var scrollThreshold = 20;

    function updateHeader() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }
});