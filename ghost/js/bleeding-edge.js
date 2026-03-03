/* ============================
   BLEEDING EDGE INTERACTIVE FEATURES
   JavaScript for magnetic cursor, text reveals, and dynamic effects
   ============================ */

(function () {
  'use strict';

  // ============================
  // MAGNETIC CURSOR EFFECTS
  // ============================

  function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic-card, .magnetic-button');

    magneticElements.forEach((element) => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        element.style.setProperty('--mouse-x', x);
        element.style.setProperty('--mouse-y', y);
        element.classList.add('is-magnetic');
      });

      element.addEventListener('mouseleave', () => {
        element.style.setProperty('--mouse-x', 0);
        element.style.setProperty('--mouse-y', 0);
        element.classList.remove('is-magnetic');
      });
    });
  }

  // ============================
  // TEXT REVEAL - Split text into characters/words
  // ============================

  function splitTextIntoChars(element) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('text-reveal');

    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  }

  function splitTextIntoWords(element) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('word-reveal');

    text.split(' ').forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      element.appendChild(span);

      if (index < text.split(' ').length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
  }

  function initTextReveals() {
    // Character reveals
    document.querySelectorAll('[data-reveal="chars"]').forEach((element) => {
      splitTextIntoChars(element);
    });

    // Word reveals
    document.querySelectorAll('[data-reveal="words"]').forEach((element) => {
      splitTextIntoWords(element);
    });
  }

  // ============================
  // INTERSECTION OBSERVER - Trigger animations on scroll
  // ============================

  function initIntersectionObserver() {
    const observeElements = document.querySelectorAll('.observe-in');

    if (!observeElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observeElements.forEach((element) => observer.observe(element));
  }

  // ============================
  // 3D TILT EFFECT - Cards tilt based on mouse position
  // ============================

  function init3DTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach((element) => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
        const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // ============================
  // CURSOR FOLLOWER - Custom cursor that follows mouse
  // ============================

  function initCursorFollower() {
    // Only on desktop
    if (window.innerWidth < 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * 0.1;
      cursorY += dy * 0.1;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Grow cursor on hover
    document.querySelectorAll('a, button, .magnetic-card').forEach((element) => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-follower--grow');
      });

      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-follower--grow');
      });
    });
  }

  // ============================
  // SCROLL PROGRESS INDICATOR
  // ============================

  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    });
  }

  // ============================
  // PARALLAX MOUSE EFFECT - Elements move based on mouse
  // ============================

  function initParallaxMouse() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (window.innerWidth < 768) return; // Desktop only

    document.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-parallax') || 20;
        const x = mouseX * speed;
        const y = mouseY * speed;

        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // ============================
  // SMOOTH SCROLL TO ANCHOR
  // ============================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }

  // ============================
  // BLOB CURSOR FOLLOWER
  // ============================

  function initBlobCursor() {
    const blob = document.querySelector('.blob-cursor');
    if (!blob) return;

    let blobX = 0;
    let blobY = 0;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateBlob() {
      const dx = mouseX - blobX;
      const dy = mouseY - blobY;

      blobX += dx * 0.05; // Slower than regular cursor
      blobY += dy * 0.05;

      blob.style.left = `${blobX}px`;
      blob.style.top = `${blobY}px`;

      requestAnimationFrame(animateBlob);
    }

    animateBlob();
  }

  // ============================
  // AUTO-ANIMATE HEIGHT CHANGES
  // ============================

  function autoAnimateHeight(element) {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        element.style.setProperty('--auto-height', `${height}px`);
      }
    });

    observer.observe(element);
  }

  // ============================
  // INITIALIZE ALL
  // ============================

  function init() {
    // Run on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🚀 Bleeding Edge features initialized');

    initMagneticElements();
    initTextReveals();
    initIntersectionObserver();
    init3DTilt();
    initScrollProgress();
    initParallaxMouse();
    initSmoothScroll();
    initBlobCursor();

    // Optional: Custom cursor (can be heavy on performance)
    // initCursorFollower();

    // Auto-animate elements with [data-auto-animate]
    document.querySelectorAll('[data-auto-animate]').forEach((element) => {
      autoAnimateHeight(element);
    });
  }

  // Start initialization
  init();
})();
