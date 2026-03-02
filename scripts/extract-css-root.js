#!/usr/bin/env node

/**
 * extract-css-root.js — Properly extracts :root blocks from CSS files
 *
 * Problem: Simple regex like /:root \{[^}]+\}/s fails when :root contains
 * nested braces (e.g., @media queries, calc() functions, rgb() values)
 *
 * Solution: Count braces to find the matching closing brace
 *
 * Usage:
 *   node extract-css-root.js <css-file>
 *
 * Returns: The complete :root block including all nested content
 */

const fs = require('fs');
const path = require('path');

/**
 * Extract :root block from CSS content using brace counting
 * @param {string} css - CSS file content
 * @returns {string|null} - The :root block or null if not found
 */
function extractRootBlock(css) {
  // Match :root selector (with optional whitespace before {)
  const rootMatch = css.match(/:root\s*\{/);
  if (!rootMatch) return null;

  const rootIndex = rootMatch.index;
  const openBraceIndex = rootIndex + rootMatch[0].length - 1;

  // Count braces to find matching close brace
  let braceCount = 1;
  let currentIndex = openBraceIndex + 1;

  while (braceCount > 0 && currentIndex < css.length) {
    const char = css[currentIndex];

    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
    }

    currentIndex++;
  }

  if (braceCount !== 0) {
    throw new Error('Unmatched braces in :root block');
  }

  // Extract from :root to the matching close brace (inclusive)
  return css.substring(rootIndex, currentIndex);
}

/**
 * Extract everything EXCEPT the :root block (component styles)
 * @param {string} css - CSS file content
 * @returns {string} - CSS without the :root block
 */
function extractComponentStyles(css) {
  // Match :root selector (with optional whitespace before {)
  const rootMatch = css.match(/:root\s*\{/);
  if (!rootMatch) return css;

  const rootIndex = rootMatch.index;
  const openBraceIndex = rootIndex + rootMatch[0].length - 1;

  // Count braces to find matching close brace
  let braceCount = 1;
  let currentIndex = openBraceIndex + 1;

  while (braceCount > 0 && currentIndex < css.length) {
    const char = css[currentIndex];
    if (char === '{') braceCount++;
    else if (char === '}') braceCount--;
    currentIndex++;
  }

  // Return everything before :root + everything after the close brace
  const before = css.substring(0, rootIndex).trim();
  const after = css.substring(currentIndex).trim();

  return (before + '\n\n' + after).trim();
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node extract-css-root.js <css-file> [--components]');
    console.error('');
    console.error('Options:');
    console.error('  (no flag)      Extract :root block only');
    console.error('  --components   Extract everything except :root block');
    process.exit(1);
  }

  const filePath = args[0];
  const extractComponents = args.includes('--components');

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  const css = fs.readFileSync(filePath, 'utf-8');

  try {
    if (extractComponents) {
      const components = extractComponentStyles(css);
      console.log(components);
    } else {
      const rootBlock = extractRootBlock(css);
      if (rootBlock) {
        console.log(rootBlock);
      } else {
        console.error('Error: No :root block found in file');
        process.exit(1);
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { extractRootBlock, extractComponentStyles };
