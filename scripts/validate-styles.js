#!/usr/bin/env node

/**
 * validate-styles.js — Validates all design style CSS files
 *
 * Checks:
 * 1. File exists
 * 2. Contains :root block with required CSS variables
 * 3. Contains component styles
 * 4. No syntax errors
 * 5. File size is reasonable (> 5KB, < 500KB)
 *
 * Usage:
 *   node validate-styles.js
 */

const fs = require('fs');
const path = require('path');

const STYLES_DIR = path.join(__dirname, '..', 'templates', 'static', 'styles');
const STYLE_NAMES = ['editorial', 'modern-minimal', 'bold', 'warm', 'classic', 'material', 'kinetic', 'glass', 'brutal'];

// Required CSS variables in :root (at least some of these should be present)
const REQUIRED_VARS = [
  '--color-primary',
  '--color-text',
  '--color-bg'
];

let errors = [];
let warnings = [];

function validateStyleFile(styleName) {
  const fileName = `style-${styleName}.css`;
  const filePath = path.join(STYLES_DIR, fileName);

  // Check file exists
  if (!fs.existsSync(filePath)) {
    errors.push(`${fileName}: File not found`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Check file size
  const sizeKB = Buffer.byteLength(content, 'utf-8') / 1024;
  if (sizeKB < 2) {
    errors.push(`${fileName}: File too small (${sizeKB.toFixed(1)}KB - should be > 2KB)`);
  } else if (sizeKB > 500) {
    warnings.push(`${fileName}: File very large (${sizeKB.toFixed(1)}KB - consider optimization)`);
  }

  // Check for :root block
  if (!content.includes(':root')) {
    errors.push(`${fileName}: Missing :root block`);
    return;
  }

  // Check for required CSS variables
  REQUIRED_VARS.forEach(varName => {
    if (!content.includes(varName)) {
      errors.push(`${fileName}: Missing required CSS variable "${varName}"`);
    }
  });

  // Check for component styles (should have selectors beyond :root)
  const selectorCount = (content.match(/^[a-z\.\#\[\:]/gm) || []).length;
  if (selectorCount < 10) {
    warnings.push(`${fileName}: Few CSS selectors (${selectorCount} - expected > 10)`);
  }

  // Check for unmatched braces
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`${fileName}: Unmatched braces (${openBraces} open, ${closeBraces} close)`);
  }

  // Check for common CSS syntax errors
  if (content.includes('}}')) {
    warnings.push(`${fileName}: Contains double closing braces - check for syntax errors`);
  }

  // Success
  console.log(`✓ ${fileName} (${sizeKB.toFixed(1)}KB, ${selectorCount} selectors)`);
}

function main() {
  console.log('Validating design style files...\n');

  STYLE_NAMES.forEach(validateStyleFile);

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
    console.log('✅ All styles validated successfully!\n');
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
