#!/usr/bin/env node

/**
 * validate-configs.js — Validates all business config files
 *
 * Checks:
 * 1. Valid JSON syntax
 * 2. Required fields present
 * 3. Correct data types
 * 4. Array lengths (3 featured items, 3 testimonials, etc.)
 * 5. No AI slop (star ratings, banned phrases)
 *
 * Usage:
 *   node validate-configs.js
 */

const fs = require('fs');
const path = require('path');

const CONFIGS_DIR = path.join(__dirname, '..', 'templates', 'static', 'configs');
const BUSINESS_TYPES = ['restaurant', 'salon', 'fitness', 'professional'];

// Required fields in every config
// Note: Configs are partial - they merge with base site-data.json
// So we only require fields that should be in the config itself
const REQUIRED_FIELDS = {
  hero: ['tagline', 'headline', 'subheadline', 'ctaText', 'ctaLink', 'ctaSecondary'],
  pages: true, // Should be object with page-2, page-3, page-4
  additionalData: true // Should be object
};

// Banned phrases (AI slop indicators)
const BANNED_PHRASES = [
  'Welcome to',
  'Learn More',
  'Get Started',
  'Click Here',
  'passionate about',
  'dedicated to excellence',
  'committed to quality',
  'state-of-the-art',
  'world-class',
  'cutting-edge',
  'one-stop shop',
  'your one-stop',
  '24/7',
  'lorem ipsum'
];

// Banned fields (AI slop)
const BANNED_FIELDS = ['rating', 'ratingStars', 'stars'];

let errors = [];
let warnings = [];

function validateJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    errors.push(`${path.basename(filePath)}: Invalid JSON - ${error.message}`);
    return null;
  }
}

function validateRequiredFields(config, businessType) {
  // Check hero fields
  if (!config.hero) {
    errors.push(`${businessType}: Missing "hero" object`);
    return;
  }

  REQUIRED_FIELDS.hero.forEach(field => {
    if (!config.hero[field]) {
      errors.push(`${businessType}: Missing required field "hero.${field}"`);
    }
  });

  // Check pages object (not array - it's an object with page-2, page-3, page-4)
  if (!config.pages || typeof config.pages !== 'object') {
    errors.push(`${businessType}: "pages" should be an object`);
  } else {
    const requiredPages = ['page-2', 'page-3', 'page-4'];
    requiredPages.forEach(page => {
      if (!config.pages[page]) {
        errors.push(`${businessType}: Missing "${page}" in pages object`);
      } else {
        // Check page has required fields
        if (!config.pages[page].filename || !config.pages[page].label || !config.pages[page].title) {
          errors.push(`${businessType}: "${page}" missing required fields (filename, label, title)`);
        }
      }
    });
  }

  // Check additionalData
  if (!config.additionalData || typeof config.additionalData !== 'object') {
    errors.push(`${businessType}: Missing "additionalData" object`);
  }
}

function validateNoAISlop(config, businessType) {
  const jsonString = JSON.stringify(config, null, 2);

  // Check for banned fields
  BANNED_FIELDS.forEach(field => {
    if (jsonString.includes(`"${field}"`)) {
      errors.push(`${businessType}: Contains banned field "${field}" (AI slop)`);
    }
  });

  // Check for banned phrases
  BANNED_PHRASES.forEach(phrase => {
    if (jsonString.toLowerCase().includes(phrase.toLowerCase())) {
      errors.push(`${businessType}: Contains banned phrase "${phrase}" (AI slop)`);
    }
  });

  // Check testimonials for ratings
  if (config.additionalData?.testimonials) {
    config.additionalData.testimonials.forEach((testimonial, index) => {
      if (testimonial.rating || testimonial.ratingStars || testimonial.stars) {
        errors.push(`${businessType}: Testimonial ${index + 1} contains rating field (AI slop - use editorial text only)`);
      }
    });
  }
}

function validateArrayLengths(config, businessType) {
  const { additionalData } = config;
  if (!additionalData) return;

  // Featured items should be 3
  const featuredKey = Object.keys(additionalData).find(k =>
    k.includes('featured') || k.includes('menu') || k.includes('service')
  );
  if (featuredKey && Array.isArray(additionalData[featuredKey])) {
    const count = additionalData[featuredKey].length;
    if (count !== 3) {
      warnings.push(`${businessType}: "${featuredKey}" should have 3 items (has ${count})`);
    }
  }

  // Testimonials should be 3
  if (additionalData.testimonials) {
    const count = additionalData.testimonials.length;
    if (count !== 3) {
      warnings.push(`${businessType}: "testimonials" should have 3 items (has ${count})`);
    }
  }

  // Team members should be 2-3
  if (additionalData.team) {
    const count = additionalData.team.length;
    if (count < 2 || count > 3) {
      warnings.push(`${businessType}: "team" should have 2-3 items (has ${count})`);
    }
  }
}

function validateConfig(businessType) {
  const filePath = path.join(CONFIGS_DIR, `${businessType}.json`);

  if (!fs.existsSync(filePath)) {
    errors.push(`${businessType}: Config file not found`);
    return;
  }

  const config = validateJSON(filePath);
  if (!config) return; // JSON parse error already logged

  validateRequiredFields(config, businessType);
  validateNoAISlop(config, businessType);
  validateArrayLengths(config, businessType);
}

function main() {
  console.log('Validating business configs...\n');

  BUSINESS_TYPES.forEach(validateConfig);

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
    console.log('✅ All configs validated successfully!\n');
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
