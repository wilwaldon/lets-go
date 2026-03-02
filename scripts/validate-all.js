#!/usr/bin/env node

/**
 * validate-all.js — Runs all validation scripts
 *
 * Runs:
 * 1. validate-template.js - Base template structure
 * 2. validate-configs.js - Business configs
 * 3. validate-styles.js - Design style files
 *
 * Usage:
 *   node validate-all.js
 */

const { execSync } = require('child_process');
const path = require('path');

const SCRIPTS = [
  { name: 'Base Template', file: 'validate-template.js' },
  { name: 'Business Configs', file: 'validate-configs.js' },
  { name: 'Design Styles', file: 'validate-styles.js' }
];

let totalErrors = 0;
let totalWarnings = 0;

function runScript(scriptName, scriptFile) {
  console.log('\n' + '='.repeat(60));
  console.log(`Running: ${scriptName}`);
  console.log('='.repeat(60) + '\n');

  const scriptPath = path.join(__dirname, scriptFile);

  try {
    execSync(`node "${scriptPath}"`, {
      stdio: 'inherit',
      cwd: __dirname
    });
  } catch (error) {
    // Script exited with non-zero code (validation failed)
    totalErrors++;
  }
}

function main() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         Let\'s Go! — Full Template Validation              ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  SCRIPTS.forEach(script => {
    runScript(script.name, script.file);
  });

  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60) + '\n');

  if (totalErrors === 0) {
    console.log('✅ All validations passed!\n');
    process.exit(0);
  } else {
    console.log(`❌ ${totalErrors} validation(s) failed\n`);
    console.log('Please fix the errors above and run validation again.\n');
    process.exit(1);
  }
}

main();
