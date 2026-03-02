#!/usr/bin/env node

/**
 * validate-template.js — Validates the base template structure
 *
 * Checks:
 * 1. All required files exist
 * 2. site-data.json is valid JSON with required fields
 * 3. HTML files have correct structure
 * 4. CSS/JS files exist and are non-empty
 * 5. No broken data-bind references
 *
 * Usage:
 *   node validate-template.js
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..', 'templates', 'static', 'base');

// Required files
const REQUIRED_FILES = [
  'index.html',
  'page-2.html',
  'page-3.html',
  'page-4.html',
  'contact.html',
  '404.html',
  'site-data.json',
  'sitemap.xml',
  'robots.txt',
  'favicon.svg',
  'README.md',
  'CHANGELOG.md',
  '.gitignore',
  'css/reset.css',
  'css/variables.css',
  'css/styles.css',
  'js/data.js',
  'js/nav.js',
  'js/forms.js',
  'js/main.js',
  'images/.gitkeep'
];

// Required fields in site-data.json
const REQUIRED_DATA_FIELDS = {
  business: ['name', 'tagline', 'phone', 'phoneLink', 'email', 'address'],
  hero: ['tagline', 'headline', 'subheadline', 'ctaText', 'ctaLink', 'ctaSecondary'],
  navigation: true,
  theme: ['primaryColor', 'secondaryColor']
};

let errors = [];
let warnings = [];

function validateFileExists(relativePath) {
  const fullPath = path.join(BASE_DIR, relativePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return false;
  }

  // Check file is not empty
  const stats = fs.statSync(fullPath);
  if (stats.size === 0 && !relativePath.includes('.gitkeep')) {
    warnings.push(`File is empty: ${relativePath}`);
  }

  return true;
}

function validateSiteData() {
  const dataPath = path.join(BASE_DIR, 'site-data.json');

  try {
    const content = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(content);

    // Check required fields
    Object.entries(REQUIRED_DATA_FIELDS).forEach(([section, fields]) => {
      if (!data[section]) {
        errors.push(`site-data.json: Missing "${section}" section`);
        return;
      }

      if (Array.isArray(fields)) {
        fields.forEach(field => {
          if (!data[section][field]) {
            errors.push(`site-data.json: Missing required field "${section}.${field}"`);
          }
        });
      } else if (fields === true) {
        if (typeof data[section] !== 'object') {
          errors.push(`site-data.json: "${section}" should be an object or array`);
        }
      }
    });

    return data;
  } catch (error) {
    errors.push(`site-data.json: Invalid JSON - ${error.message}`);
    return null;
  }
}

function validateHTMLFiles(siteData) {
  const htmlFiles = ['index.html', 'page-2.html', 'page-3.html', 'page-4.html', 'contact.html', '404.html'];

  htmlFiles.forEach(file => {
    const filePath = path.join(BASE_DIR, file);
    if (!fs.existsSync(filePath)) return; // Already reported as missing

    const content = fs.readFileSync(filePath, 'utf-8');

    // Check for doctype
    if (!content.includes('<!DOCTYPE html>')) {
      warnings.push(`${file}: Missing <!DOCTYPE html>`);
    }

    // Check for required meta tags
    if (!content.includes('<meta charset')) {
      errors.push(`${file}: Missing charset meta tag`);
    }

    if (!content.includes('<meta name="viewport"')) {
      errors.push(`${file}: Missing viewport meta tag`);
    }

    // Check for data-bind attributes
    const dataBinds = content.match(/data-bind="([^"]+)"/g) || [];

    // Validate data-bind paths against site-data.json
    if (siteData) {
      dataBinds.forEach(bind => {
        const path = bind.match(/data-bind="([^"]+)"/)[1];
        const value = getNestedValue(siteData, path);
        if (value === null || value === undefined) {
          warnings.push(`${file}: data-bind="${path}" references non-existent field in site-data.json`);
        }
      });
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

function validateCSSFiles() {
  const cssFiles = ['css/reset.css', 'css/variables.css', 'css/styles.css'];

  cssFiles.forEach(file => {
    const filePath = path.join(BASE_DIR, file);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf-8');

    // Check for unmatched braces
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push(`${file}: Unmatched braces (${openBraces} open, ${closeBraces} close)`);
    }
  });

  // Check variables.css has :root
  const variablesPath = path.join(BASE_DIR, 'css/variables.css');
  if (fs.existsSync(variablesPath)) {
    const content = fs.readFileSync(variablesPath, 'utf-8');
    if (!content.includes(':root')) {
      errors.push('css/variables.css: Missing :root block');
    }
  }
}

function validateJSFiles() {
  const jsFiles = ['js/data.js', 'js/nav.js', 'js/forms.js', 'js/main.js'];

  jsFiles.forEach(file => {
    const filePath = path.join(BASE_DIR, file);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf-8');

    // Basic syntax check - look for common issues
    const openParens = (content.match(/\(/g) || []).length;
    const closeParens = (content.match(/\)/g) || []).length;
    const openBraces = (content.match(/\{/g) || []).length;
    const closeBraces = (content.match(/\}/g) || []).length;

    if (openParens !== closeParens) {
      errors.push(`${file}: Unmatched parentheses (${openParens} open, ${closeParens} close)`);
    }

    if (openBraces !== closeBraces) {
      errors.push(`${file}: Unmatched braces (${openBraces} open, ${closeBraces} close)`);
    }
  });
}

function main() {
  console.log('Validating base template...\n');

  // Check all required files exist
  console.log('Checking required files...');
  REQUIRED_FILES.forEach(validateFileExists);

  // Validate site-data.json
  console.log('Validating site-data.json...');
  const siteData = validateSiteData();

  // Validate HTML files
  console.log('Validating HTML files...');
  validateHTMLFiles(siteData);

  // Validate CSS files
  console.log('Validating CSS files...');
  validateCSSFiles();

  // Validate JS files
  console.log('Validating JavaScript files...');
  validateJSFiles();

  console.log('');

  // Report results
  if (errors.length > 0) {
    console.log('❌ ERRORS:\n');
    errors.forEach(error => console.log(`  - ${error}`));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:\n');
    warnings.forEach(warning => console.log(`  - ${warning}`));
    console.log('');
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Base template validated successfully!\n');
    process.exit(0);
  }

  if (errors.length > 0) {
    console.log(`Found ${errors.length} error(s) and ${warnings.length} warning(s)\n`);
    process.exit(1);
  } else {
    console.log(`Found ${warnings.length} warning(s) (non-critical)\n`);
    process.exit(0);
  }
}

main();
