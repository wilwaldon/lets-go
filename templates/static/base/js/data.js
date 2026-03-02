/**
 * data.js — Fetches site-data.json and populates page content
 * Uses data-bind attributes for text, data-bind-href for links,
 * data-bind-src for images, and <template> tags for repeated elements.
 */

let siteData = null;

/**
 * Get a nested value from an object using dot notation
 * e.g., getNestedValue(obj, "business.name") => obj.business.name
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

/**
 * Populate all elements with data-bind attributes
 */
function bindText(data) {
  document.querySelectorAll('[data-bind]').forEach(function (el) {
    const path = el.getAttribute('data-bind');
    const value = getNestedValue(data, path);
    if (value !== null && value !== undefined) {
      el.textContent = value;
    }
  });
}

/**
 * Populate all elements with data-bind-href attributes
 */
function bindHrefs(data) {
  document.querySelectorAll('[data-bind-href]').forEach(function (el) {
    const path = el.getAttribute('data-bind-href');
    const value = getNestedValue(data, path);
    if (value) {
      el.setAttribute('href', value);
    }
  });
}

/**
 * Populate all elements with data-bind-src attributes
 */
function bindSrcs(data) {
  document.querySelectorAll('[data-bind-src]').forEach(function (el) {
    const path = el.getAttribute('data-bind-src');
    const value = getNestedValue(data, path);
    if (value) {
      el.setAttribute('src', value);
    }
  });
}

/**
 * Process <template> elements for array data
 * Parent element should have data-template="path.to.array"
 */
function bindTemplates(data) {
  document.querySelectorAll('[data-template]').forEach(function (container) {
    const path = container.getAttribute('data-template');
    const items = getNestedValue(data, path);
    const template = container.querySelector('template');

    if (!items || !Array.isArray(items) || !template) return;

    items.forEach(function (item) {
      const clone = template.content.cloneNode(true);

      // Bind text
      clone.querySelectorAll('[data-bind]').forEach(function (el) {
        const bindPath = el.getAttribute('data-bind');
        const value = getNestedValue(item, bindPath);
        if (value !== null && value !== undefined) {
          el.textContent = value;
        }
      });

      // Bind hrefs
      clone.querySelectorAll('[data-bind-href]').forEach(function (el) {
        const bindPath = el.getAttribute('data-bind-href');
        const value = getNestedValue(item, bindPath);
        if (value) el.setAttribute('href', value);
      });

      // Bind srcs
      clone.querySelectorAll('[data-bind-src]').forEach(function (el) {
        const bindPath = el.getAttribute('data-bind-src');
        const value = getNestedValue(item, bindPath);
        if (value) el.setAttribute('src', value);
      });

      // Bind arrays within templates (e.g., dietary tags, features)
      clone.querySelectorAll('[data-template-array]').forEach(function (arrayContainer) {
        const arrayPath = arrayContainer.getAttribute('data-template-array');
        const arrayItems = getNestedValue(item, arrayPath);
        const arrayTemplate = arrayContainer.querySelector('template');

        if (!arrayItems || !Array.isArray(arrayItems) || !arrayTemplate) return;

        arrayItems.forEach(function (arrayItem) {
          const arrayClone = arrayTemplate.content.cloneNode(true);
          // For simple string arrays, populate the first text element
          const textEl = arrayClone.querySelector('[data-bind="value"]');
          if (textEl) {
            textEl.textContent = typeof arrayItem === 'string' ? arrayItem : arrayItem.value || '';
          }
          arrayContainer.appendChild(arrayClone);
        });
      });

      container.appendChild(clone);
    });
  });
}

/**
 * Generate navigation from the navigation array in site-data.json
 */
function buildNavigation(data) {
  if (!data.navigation || !Array.isArray(data.navigation)) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('[data-nav]').forEach(function (nav) {
    nav.innerHTML = '';
    data.navigation.forEach(function (item) {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      if (item.href === currentPage) {
        a.classList.add('active');
      }
      nav.appendChild(a);
    });
  });
}

/**
 * Set CSS custom properties from theme values
 */
function applyTheme(data) {
  if (!data.theme) return;

  const root = document.documentElement;

  if (data.theme.primaryColor) {
    root.style.setProperty('--color-primary', data.theme.primaryColor);

    // Generate hover color (slightly darker)
    const hex = data.theme.primaryColor.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 20);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 20);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 20);
    root.style.setProperty('--color-primary-hover', '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0'));

    // Generate light variant
    root.style.setProperty('--color-primary-light', data.theme.primaryColor + '10');
  }

  if (data.theme.secondaryColor) {
    root.style.setProperty('--color-secondary', data.theme.secondaryColor);
  }

  if (data.theme.fontFamily) {
    root.style.setProperty('--font-family', data.theme.fontFamily);
  }
}

/**
 * Build hours table from hours data
 */
function buildHoursTable(data) {
  if (!data.hours) return;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  document.querySelectorAll('[data-hours]').forEach(function (table) {
    const tbody = table.querySelector('tbody') || table;
    tbody.innerHTML = '';

    days.forEach(function (day, index) {
      const tr = document.createElement('tr');
      if (day === today) tr.classList.add('is-today');

      const tdDay = document.createElement('td');
      tdDay.textContent = dayLabels[index];

      const tdHours = document.createElement('td');
      const hours = data.hours[day];
      if (hours === 'closed') {
        tdHours.textContent = 'Closed';
      } else if (hours && hours.open && hours.close) {
        tdHours.textContent = hours.open + ' – ' + hours.close;
      } else {
        tdHours.textContent = '—';
      }

      tr.appendChild(tdDay);
      tr.appendChild(tdHours);
      tbody.appendChild(tr);
    });
  });
}

/**
 * Build social links
 */
function buildSocialLinks(data) {
  if (!data.social) return;

  document.querySelectorAll('[data-social]').forEach(function (container) {
    container.innerHTML = '';
    var platforms = Object.entries(data.social);

    platforms.forEach(function (entry) {
      var platform = entry[0];
      var url = entry[1];
      if (!url) return;

      var a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
      container.appendChild(a);
    });
  });
}

/**
 * Hide sections with empty bound arrays
 */
function hideEmptySections(data) {
  document.querySelectorAll('[data-hide-empty]').forEach(function (el) {
    var path = el.getAttribute('data-hide-empty');
    var value = getNestedValue(data, path);
    if (!value || (Array.isArray(value) && value.length === 0)) {
      el.style.display = 'none';
    }
  });
}

/**
 * Set page title and meta tags
 */
function setMeta(data) {
  if (!data.business) return;

  // Update title if data-bind-title exists on a meta-like element
  var pageTitle = document.querySelector('title');
  if (pageTitle && data.business.name) {
    var currentTitle = pageTitle.textContent;
    if (currentTitle.includes('{{business.name}}')) {
      pageTitle.textContent = currentTitle.replace('{{business.name}}', data.business.name);
    }
  }
}

/**
 * Initialize — fetch data and populate everything
 */
async function initData() {
  try {
    var response = await fetch('site-data.json');
    if (!response.ok) throw new Error('Failed to load site-data.json');

    siteData = await response.json();

    applyTheme(siteData);
    setMeta(siteData);
    bindText(siteData);
    bindHrefs(siteData);
    bindSrcs(siteData);
    bindTemplates(siteData);
    buildNavigation(siteData);
    buildHoursTable(siteData);
    buildSocialLinks(siteData);
    hideEmptySections(siteData);

    // Dispatch event for other scripts that need the data
    window.dispatchEvent(new CustomEvent('siteDataLoaded', { detail: siteData }));

  } catch (error) {
    console.error('Let's Go!: Could not load site data.', error);
    console.info('Let's Go!: Make sure you are serving files via a local server (npx serve), not opening directly with file://');
  }
}

// Export for other scripts
window.siteData = null;
window.addEventListener('siteDataLoaded', function (e) {
  window.siteData = e.detail;
});

export { initData, siteData };
