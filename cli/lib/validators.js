/**
 * Validation utilities for Let's Go! CLI
 *
 * Provides pre-flight checks, post-generation validation,
 * config linting, and common mistake detection.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

/**
 * Pre-flight checks to run before generation
 */
export class PreFlightChecker {
  constructor() {
    this.checks = [];
    this.warnings = [];
    this.errors = [];
  }

  /**
   * Check Node.js version
   */
  checkNodeVersion() {
    const minVersion = 18;
    const currentVersion = parseInt(process.version.slice(1).split('.')[0]);

    if (currentVersion < minVersion) {
      this.errors.push({
        type: 'node_version',
        message: `Node.js ${minVersion}+ required. Current: ${process.version}`,
        fix: `Install Node.js ${minVersion} or higher from https://nodejs.org`
      });
      return false;
    }

    this.checks.push({ name: 'Node.js version', status: 'pass', detail: process.version });
    return true;
  }

  /**
   * Check if git is installed
   */
  checkGitInstalled() {
    try {
      execSync('git --version', { stdio: 'pipe' });
      const version = execSync('git --version', { encoding: 'utf-8' }).trim();
      this.checks.push({ name: 'Git installation', status: 'pass', detail: version });
      return true;
    } catch (error) {
      this.errors.push({
        type: 'git_not_found',
        message: 'Git is not installed or not in PATH',
        fix: 'Install Git from https://git-scm.com/downloads'
      });
      return false;
    }
  }

  /**
   * Check available disk space
   */
  checkDiskSpace() {
    const minSpaceMB = 100; // 100MB minimum

    try {
      // On Windows, use fsutil (requires admin) or wmic
      // On Unix, use df
      let availableSpaceMB;

      if (process.platform === 'win32') {
        // Windows: use wmic to check free space on current drive
        const drive = process.cwd().substring(0, 2); // e.g., "C:"
        const output = execSync(`wmic logicaldisk where "DeviceID='${drive}'" get FreeSpace`, { encoding: 'utf-8' });
        const lines = output.trim().split('\n').filter(line => line.trim());
        if (lines.length > 1) {
          const freeSpaceBytes = parseInt(lines[1].trim());
          availableSpaceMB = Math.floor(freeSpaceBytes / (1024 * 1024));
        }
      } else {
        // Unix-like: use df
        const output = execSync('df -m .', { encoding: 'utf-8' });
        const lines = output.trim().split('\n');
        if (lines.length > 1) {
          const parts = lines[1].split(/\s+/);
          availableSpaceMB = parseInt(parts[3]); // Available space column
        }
      }

      if (availableSpaceMB && availableSpaceMB < minSpaceMB) {
        this.warnings.push({
          type: 'low_disk_space',
          message: `Low disk space: ${availableSpaceMB}MB available`,
          fix: `Free up at least ${minSpaceMB}MB of disk space`
        });
      } else if (availableSpaceMB) {
        this.checks.push({
          name: 'Disk space',
          status: 'pass',
          detail: `${availableSpaceMB}MB available`
        });
      }

      return true;
    } catch (error) {
      // Disk space check is optional, just warn
      this.warnings.push({
        type: 'disk_space_check_failed',
        message: 'Could not check available disk space',
        fix: 'Ensure you have at least 100MB free'
      });
      return true;
    }
  }

  /**
   * Check if npm is available (for full-stack projects)
   */
  checkNpmInstalled() {
    try {
      const version = execSync('npm --version', { encoding: 'utf-8' }).trim();
      this.checks.push({ name: 'npm installation', status: 'pass', detail: `v${version}` });
      return true;
    } catch (error) {
      this.warnings.push({
        type: 'npm_not_found',
        message: 'npm is not installed (required for full-stack projects)',
        fix: 'npm is included with Node.js. Reinstall Node.js if needed.'
      });
      return false;
    }
  }

  /**
   * Check write permissions in current directory
   */
  checkWritePermissions() {
    try {
      const testFile = path.join(process.cwd(), '.lets-go-write-test');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      this.checks.push({ name: 'Write permissions', status: 'pass', detail: 'OK' });
      return true;
    } catch (error) {
      this.errors.push({
        type: 'no_write_permission',
        message: 'Cannot write to current directory',
        fix: 'Run this command in a directory where you have write permissions'
      });
      return false;
    }
  }

  /**
   * Run all pre-flight checks
   */
  async runAll() {
    this.checkNodeVersion();
    this.checkGitInstalled();
    this.checkNpmInstalled();
    this.checkWritePermissions();
    this.checkDiskSpace();

    return {
      success: this.errors.length === 0,
      checks: this.checks,
      warnings: this.warnings,
      errors: this.errors
    };
  }

  /**
   * Print results to console
   */
  printResults() {
    console.log('');
    console.log(chalk.bold('Pre-flight Checks:'));
    console.log('');

    // Print passing checks
    for (const check of this.checks) {
      console.log(chalk.green('  ✓') + ` ${check.name}` + chalk.dim(` (${check.detail})`));
    }

    // Print warnings
    for (const warning of this.warnings) {
      console.log(chalk.yellow('  ⚠') + ` ${warning.message}`);
      console.log(chalk.dim(`    Fix: ${warning.fix}`));
    }

    // Print errors
    for (const error of this.errors) {
      console.log(chalk.red('  ✗') + ` ${error.message}`);
      console.log(chalk.dim(`    Fix: ${error.fix}`));
    }

    console.log('');

    if (this.errors.length > 0) {
      console.log(chalk.red('Cannot proceed due to errors. Please fix the issues above.'));
      console.log('');
      return false;
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow('Warnings detected. Generation will continue but you may encounter issues.'));
      console.log('');
    }

    return true;
  }
}

/**
 * Post-generation validation
 */
export class PostGenerationValidator {
  constructor(projectPath, stack) {
    this.projectPath = projectPath;
    this.stack = stack;
    this.errors = [];
    this.warnings = [];
    this.checks = [];
  }

  /**
   * Verify project directory was created
   */
  checkProjectDirectory() {
    if (!fs.existsSync(this.projectPath)) {
      this.errors.push({
        type: 'missing_project_dir',
        message: `Project directory not found: ${this.projectPath}`,
        fix: 'Re-run the CLI to generate the project'
      });
      return false;
    }
    this.checks.push({ name: 'Project directory', status: 'pass' });
    return true;
  }

  /**
   * Verify required files exist
   */
  checkRequiredFiles() {
    const requiredFiles = this.stack === 'static'
      ? [
          'index.html',
          'site-data.json',
          'css/styles.css',
          'js/main.js',
          'favicon.svg',
          'README.md'
        ]
      : [
          'package.json',
          'index.html',
          'src/App.tsx',
          'src/main.tsx',
          'src/config/site.config.ts',
          '.env.local',
          'README.md'
        ];

    const missingFiles = [];
    for (const file of requiredFiles) {
      const filePath = path.join(this.projectPath, file);
      if (!fs.existsSync(filePath)) {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length > 0) {
      this.errors.push({
        type: 'missing_files',
        message: `Missing required files: ${missingFiles.join(', ')}`,
        fix: 'Re-run the CLI to generate all files'
      });
      return false;
    }

    this.checks.push({
      name: 'Required files',
      status: 'pass',
      detail: `${requiredFiles.length} files verified`
    });
    return true;
  }

  /**
   * Validate site-data.json structure (static sites only)
   */
  checkSiteDataJson() {
    if (this.stack !== 'static') return true;

    const siteDataPath = path.join(this.projectPath, 'site-data.json');

    try {
      const siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf-8'));

      // Check required fields
      const requiredFields = ['business', 'navigation', 'footer'];
      const missingFields = requiredFields.filter(field => !siteData[field]);

      if (missingFields.length > 0) {
        this.warnings.push({
          type: 'incomplete_site_data',
          message: `site-data.json missing fields: ${missingFields.join(', ')}`,
          fix: 'Add missing fields to site-data.json'
        });
      }

      // Check business.name is not default
      if (siteData.business?.name === 'My Business') {
        this.warnings.push({
          type: 'default_business_name',
          message: 'Business name is still "My Business"',
          fix: 'Update business.name in site-data.json'
        });
      }

      this.checks.push({ name: 'site-data.json', status: 'pass' });
      return true;
    } catch (error) {
      this.errors.push({
        type: 'invalid_site_data',
        message: `Invalid site-data.json: ${error.message}`,
        fix: 'Ensure site-data.json is valid JSON'
      });
      return false;
    }
  }

  /**
   * Validate package.json (full-stack only)
   */
  checkPackageJson() {
    if (this.stack !== 'fullstack') return true;

    const packageJsonPath = path.join(this.projectPath, 'package.json');

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Check required scripts
      const requiredScripts = ['dev', 'build', 'preview'];
      const missingScripts = requiredScripts.filter(script => !packageJson.scripts?.[script]);

      if (missingScripts.length > 0) {
        this.warnings.push({
          type: 'missing_scripts',
          message: `package.json missing scripts: ${missingScripts.join(', ')}`,
          fix: 'Add missing scripts to package.json'
        });
      }

      // Check required dependencies
      const requiredDeps = ['react', 'react-dom', 'vite'];
      const missingDeps = requiredDeps.filter(dep =>
        !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
      );

      if (missingDeps.length > 0) {
        this.errors.push({
          type: 'missing_dependencies',
          message: `package.json missing dependencies: ${missingDeps.join(', ')}`,
          fix: 'Run npm install to install dependencies'
        });
      }

      this.checks.push({ name: 'package.json', status: 'pass' });
      return true;
    } catch (error) {
      this.errors.push({
        type: 'invalid_package_json',
        message: `Invalid package.json: ${error.message}`,
        fix: 'Ensure package.json is valid JSON'
      });
      return false;
    }
  }

  /**
   * Check .env.local configuration (full-stack only)
   */
  checkEnvFile() {
    if (this.stack !== 'fullstack') return true;

    const envPath = path.join(this.projectPath, '.env.local');

    if (!fs.existsSync(envPath)) {
      this.warnings.push({
        type: 'missing_env',
        message: '.env.local not found',
        fix: 'Create .env.local with Supabase credentials'
      });
      return true;
    }

    try {
      const envContent = fs.readFileSync(envPath, 'utf-8');

      // Check required variables
      const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
      const missingVars = requiredVars.filter(varName => !envContent.includes(varName));

      if (missingVars.length > 0) {
        this.warnings.push({
          type: 'incomplete_env',
          message: `.env.local missing variables: ${missingVars.join(', ')}`,
          fix: 'Add missing environment variables to .env.local'
        });
      }

      // Check for placeholder values
      if (envContent.includes('your-project-url') || envContent.includes('your-anon-key')) {
        this.warnings.push({
          type: 'placeholder_env_values',
          message: '.env.local contains placeholder values',
          fix: 'Replace placeholder values with real Supabase credentials'
        });
      }

      this.checks.push({ name: '.env.local', status: 'pass' });
      return true;
    } catch (error) {
      this.warnings.push({
        type: 'invalid_env',
        message: `Could not read .env.local: ${error.message}`,
        fix: 'Ensure .env.local is readable'
      });
      return true;
    }
  }

  /**
   * Verify git repository was initialized
   */
  checkGitRepo() {
    const gitPath = path.join(this.projectPath, '.git');

    if (!fs.existsSync(gitPath)) {
      this.warnings.push({
        type: 'no_git_repo',
        message: 'Git repository not initialized',
        fix: `Run: cd ${path.basename(this.projectPath)} && git init`
      });
      return false;
    }

    this.checks.push({ name: 'Git repository', status: 'pass' });
    return true;
  }

  /**
   * Check file sizes (warn if unusually large)
   */
  checkFileSizes() {
    const maxSizeKB = 5000; // 5MB warning threshold
    const largeFiles = [];

    const checkDirectory = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (entry.name !== 'node_modules' && entry.name !== '.git') {
            checkDirectory(fullPath);
          }
        } else {
          const stats = fs.statSync(fullPath);
          const sizeKB = Math.floor(stats.size / 1024);

          if (sizeKB > maxSizeKB) {
            largeFiles.push({
              file: path.relative(this.projectPath, fullPath),
              size: `${sizeKB}KB`
            });
          }
        }
      }
    };

    try {
      checkDirectory(this.projectPath);

      if (largeFiles.length > 0) {
        this.warnings.push({
          type: 'large_files',
          message: `Large files detected: ${largeFiles.map(f => `${f.file} (${f.size})`).join(', ')}`,
          fix: 'Consider optimizing or compressing large files'
        });
      }

      this.checks.push({ name: 'File sizes', status: 'pass' });
      return true;
    } catch (error) {
      // File size check is optional
      return true;
    }
  }

  /**
   * Run all post-generation validations
   */
  async runAll() {
    this.checkProjectDirectory();
    this.checkRequiredFiles();
    this.checkSiteDataJson();
    this.checkPackageJson();
    this.checkEnvFile();
    this.checkGitRepo();
    this.checkFileSizes();

    return {
      success: this.errors.length === 0,
      checks: this.checks,
      warnings: this.warnings,
      errors: this.errors
    };
  }

  /**
   * Print validation results
   */
  printResults() {
    console.log('');
    console.log(chalk.bold('Post-Generation Validation:'));
    console.log('');

    // Print passing checks
    for (const check of this.checks) {
      const detail = check.detail ? chalk.dim(` (${check.detail})`) : '';
      console.log(chalk.green('  ✓') + ` ${check.name}${detail}`);
    }

    // Print warnings
    for (const warning of this.warnings) {
      console.log(chalk.yellow('  ⚠') + ` ${warning.message}`);
      console.log(chalk.dim(`    ${warning.fix}`));
    }

    // Print errors
    for (const error of this.errors) {
      console.log(chalk.red('  ✗') + ` ${error.message}`);
      console.log(chalk.dim(`    ${error.fix}`));
    }

    console.log('');

    if (this.errors.length > 0) {
      console.log(chalk.red('Validation failed. Please check the errors above.'));
      console.log('');
      return false;
    }

    if (this.warnings.length === 0) {
      console.log(chalk.green('All validations passed!'));
      console.log('');
    }

    return true;
  }
}

/**
 * Config file linter for site-data.json and site.config.ts
 */
export class ConfigLinter {
  constructor(configPath, type = 'json') {
    this.configPath = configPath;
    this.type = type; // 'json' or 'ts'
    this.errors = [];
    this.warnings = [];
    this.suggestions = [];
  }

  /**
   * AI slop detection - common phrases that indicate AI-generated content
   */
  static AI_SLOP_PATTERNS = [
    /welcome to/i,
    /passionate about/i,
    /learn more/i,
    /click here/i,
    /don't hesitate to/i,
    /we pride ourselves/i,
    /best in class/i,
    /cutting[- ]edge/i,
    /state[- ]of[- ]the[- ]art/i,
    /world[- ]class/i,
    /premier destination/i,
    /look no further/i,
    /your one[- ]stop/i,
    /we understand that/i,
    /it's important to note/i,
    /seamless experience/i,
    /game[- ]changer/i,
    /revolutionize/i,
    /transform your/i
  ];

  /**
   * Detect AI slop in text content
   */
  detectAISlop(text, field) {
    const found = [];

    for (const pattern of ConfigLinter.AI_SLOP_PATTERNS) {
      if (pattern.test(text)) {
        found.push({
          field,
          pattern: pattern.source,
          match: text.match(pattern)[0]
        });
      }
    }

    return found;
  }

  /**
   * Check for placeholder text
   */
  detectPlaceholders(text, field) {
    const placeholders = [
      /\[.*?\]/,  // [bracket placeholders]
      /TODO/i,
      /FIXME/i,
      /REPLACE ME/i,
      /YOUR .* HERE/i,
      /lorem ipsum/i
    ];

    const found = [];
    for (const pattern of placeholders) {
      if (pattern.test(text)) {
        found.push({ field, match: text.match(pattern)[0] });
      }
    }

    return found;
  }

  /**
   * Validate phone numbers
   */
  validatePhone(phone, field) {
    // Basic phone validation (US format)
    const phonePattern = /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

    if (!phonePattern.test(phone)) {
      return {
        field,
        message: 'Invalid phone number format',
        suggestion: 'Use format: (555) 123-4567 or +1-555-123-4567'
      };
    }

    return null;
  }

  /**
   * Validate email addresses
   */
  validateEmail(email, field) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return {
        field,
        message: 'Invalid email address format',
        suggestion: 'Use format: name@example.com'
      };
    }

    return null;
  }

  /**
   * Validate URLs
   */
  validateUrl(url, field) {
    try {
      new URL(url);
      return null;
    } catch (error) {
      return {
        field,
        message: 'Invalid URL format',
        suggestion: 'Use format: https://example.com'
      };
    }
  }

  /**
   * Lint JSON config file (site-data.json)
   */
  async lintJsonConfig() {
    try {
      const content = fs.readFileSync(this.configPath, 'utf-8');
      const config = JSON.parse(content);

      // Check business info
      if (config.business) {
        const { name, tagline, description, contact } = config.business;

        // Check for AI slop
        if (name) {
          const slopInName = this.detectAISlop(name, 'business.name');
          slopInName.forEach(slop => {
            this.warnings.push({
              type: 'ai_slop',
              message: `AI slop detected in business.name: "${slop.match}"`,
              fix: 'Replace with natural, human-written copy'
            });
          });
        }

        if (tagline) {
          const slopInTagline = this.detectAISlop(tagline, 'business.tagline');
          slopInTagline.forEach(slop => {
            this.warnings.push({
              type: 'ai_slop',
              message: `AI slop detected in business.tagline: "${slop.match}"`,
              fix: 'Replace with natural, human-written copy'
            });
          });
        }

        if (description) {
          const slopInDesc = this.detectAISlop(description, 'business.description');
          slopInDesc.forEach(slop => {
            this.warnings.push({
              type: 'ai_slop',
              message: `AI slop detected in business.description: "${slop.match}"`,
              fix: 'Replace with natural, human-written copy'
            });
          });

          // Check for placeholders
          const placeholders = this.detectPlaceholders(description, 'business.description');
          placeholders.forEach(ph => {
            this.errors.push({
              type: 'placeholder',
              message: `Placeholder found in business.description: "${ph.match}"`,
              fix: 'Replace with actual content'
            });
          });
        }

        // Validate contact info
        if (contact) {
          if (contact.phone) {
            const phoneError = this.validatePhone(contact.phone, 'business.contact.phone');
            if (phoneError) this.warnings.push(phoneError);
          }

          if (contact.email) {
            const emailError = this.validateEmail(contact.email, 'business.contact.email');
            if (emailError) this.errors.push(emailError);
          }

          if (contact.website) {
            const urlError = this.validateUrl(contact.website, 'business.contact.website');
            if (urlError) this.warnings.push(urlError);
          }
        }
      }

      // Check navigation structure
      if (!config.navigation || config.navigation.length === 0) {
        this.warnings.push({
          type: 'missing_navigation',
          message: 'No navigation items defined',
          fix: 'Add navigation array with menu items'
        });
      }

      // Check for empty sections
      if (config.sections) {
        config.sections.forEach((section, index) => {
          if (!section.heading && !section.content) {
            this.warnings.push({
              type: 'empty_section',
              message: `Section ${index} has no content`,
              fix: 'Add heading and content to the section'
            });
          }
        });
      }

      return {
        valid: this.errors.length === 0,
        errors: this.errors,
        warnings: this.warnings,
        suggestions: this.suggestions
      };

    } catch (error) {
      this.errors.push({
        type: 'parse_error',
        message: `Failed to parse config: ${error.message}`,
        fix: 'Ensure file is valid JSON'
      });

      return {
        valid: false,
        errors: this.errors,
        warnings: this.warnings,
        suggestions: this.suggestions
      };
    }
  }

  /**
   * Print linting results
   */
  printResults() {
    console.log('');
    console.log(chalk.bold(`Config Linter: ${path.basename(this.configPath)}`));
    console.log('');

    if (this.errors.length === 0 && this.warnings.length === 0 && this.suggestions.length === 0) {
      console.log(chalk.green('  ✓ No issues found'));
      console.log('');
      return true;
    }

    // Print errors
    for (const error of this.errors) {
      console.log(chalk.red('  ✗ Error:') + ` ${error.message}`);
      if (error.field) console.log(chalk.dim(`    Field: ${error.field}`));
      if (error.fix) console.log(chalk.dim(`    Fix: ${error.fix}`));
    }

    // Print warnings
    for (const warning of this.warnings) {
      console.log(chalk.yellow('  ⚠ Warning:') + ` ${warning.message}`);
      if (warning.field) console.log(chalk.dim(`    Field: ${warning.field}`));
      if (warning.fix || warning.suggestion) {
        console.log(chalk.dim(`    Fix: ${warning.fix || warning.suggestion}`));
      }
    }

    // Print suggestions
    for (const suggestion of this.suggestions) {
      console.log(chalk.cyan('  ℹ Suggestion:') + ` ${suggestion.message}`);
    }

    console.log('');
    return this.errors.length === 0;
  }
}

/**
 * Common mistakes detector
 */
export class MistakesDetector {
  constructor(projectPath, stack) {
    this.projectPath = projectPath;
    this.stack = stack;
    this.mistakes = [];
  }

  /**
   * Check for .env.local committed to git (security issue)
   */
  checkEnvInGit() {
    if (this.stack !== 'fullstack') return;

    const gitignorePath = path.join(this.projectPath, '.gitignore');

    if (!fs.existsSync(gitignorePath)) {
      this.mistakes.push({
        severity: 'high',
        type: 'missing_gitignore',
        message: '.gitignore file is missing',
        risk: 'Sensitive files like .env.local may be committed to git',
        fix: 'Create .gitignore with .env.local and other sensitive files'
      });
      return;
    }

    const gitignore = fs.readFileSync(gitignorePath, 'utf-8');

    if (!gitignore.includes('.env.local')) {
      this.mistakes.push({
        severity: 'high',
        type: 'env_not_ignored',
        message: '.env.local is not in .gitignore',
        risk: 'API keys and secrets may be committed to git',
        fix: 'Add .env.local to .gitignore'
      });
    }
  }

  /**
   * Check for hardcoded API keys or secrets
   */
  checkHardcodedSecrets() {
    const patterns = [
      /VITE_SUPABASE_URL\s*=\s*['"](https?:\/\/[^'"]+)['"]/,
      /VITE_SUPABASE_ANON_KEY\s*=\s*['"](ey[^'"]+)['"]/,
      /STRIPE_SECRET_KEY\s*=\s*['"](sk_[^'"]+)['"]/
    ];

    const checkFile = (filePath) => {
      if (path.basename(filePath) === '.env.local') return; // .env files are OK

      try {
        const content = fs.readFileSync(filePath, 'utf-8');

        for (const pattern of patterns) {
          if (pattern.test(content)) {
            this.mistakes.push({
              severity: 'critical',
              type: 'hardcoded_secret',
              message: `Potential hardcoded secret in ${path.relative(this.projectPath, filePath)}`,
              risk: 'Secrets should never be in source code',
              fix: 'Move secrets to .env.local and use environment variables'
            });
            break; // One warning per file is enough
          }
        }
      } catch (error) {
        // Skip files that can't be read
      }
    };

    const scanDirectory = (dir) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== '.git') {
              scanDirectory(fullPath);
            }
          } else if (entry.name.match(/\.(js|ts|jsx|tsx)$/)) {
            checkFile(fullPath);
          }
        }
      } catch (error) {
        // Skip directories that can't be read
      }
    };

    scanDirectory(this.projectPath);
  }

  /**
   * Check for missing alt text in images (accessibility)
   */
  checkMissingAltText() {
    const imgWithoutAlt = /<img(?![^>]*\balt=)/gi;

    const checkFile = (filePath) => {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.match(imgWithoutAlt);

        if (matches && matches.length > 0) {
          this.mistakes.push({
            severity: 'medium',
            type: 'missing_alt_text',
            message: `${matches.length} image(s) without alt text in ${path.relative(this.projectPath, filePath)}`,
            risk: 'Poor accessibility for screen readers',
            fix: 'Add descriptive alt="" attributes to all <img> tags'
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    };

    const scanDirectory = (dir) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== '.git') {
              scanDirectory(fullPath);
            }
          } else if (entry.name.match(/\.(html|jsx|tsx)$/)) {
            checkFile(fullPath);
          }
        }
      } catch (error) {
        // Skip directories that can't be read
      }
    };

    scanDirectory(this.projectPath);
  }

  /**
   * Check for console.log statements (code quality)
   */
  checkConsoleLogStatements() {
    let totalLogs = 0;

    const checkFile = (filePath) => {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.match(/console\.(log|debug|info|warn)/g);

        if (matches) {
          totalLogs += matches.length;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    };

    const scanDirectory = (dir) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== '.git') {
              scanDirectory(fullPath);
            }
          } else if (entry.name.match(/\.(js|ts|jsx|tsx)$/)) {
            checkFile(fullPath);
          }
        }
      } catch (error) {
        // Skip directories that can't be read
      }
    };

    scanDirectory(this.projectPath);

    if (totalLogs > 5) {
      this.mistakes.push({
        severity: 'low',
        type: 'console_statements',
        message: `${totalLogs} console statements found`,
        risk: 'Development logs should be removed before production',
        fix: 'Remove or replace with proper logging library'
      });
    }
  }

  /**
   * Check for TODO/FIXME comments
   */
  checkTodoComments() {
    let totalTodos = 0;

    const checkFile = (filePath) => {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.match(/\/\/.*?(TODO|FIXME|HACK|XXX)/gi);

        if (matches) {
          totalTodos += matches.length;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    };

    const scanDirectory = (dir) => {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== '.git') {
              scanDirectory(fullPath);
            }
          } else if (entry.name.match(/\.(js|ts|jsx|tsx|html|css)$/)) {
            checkFile(fullPath);
          }
        }
      } catch (error) {
        // Skip directories that can't be read
      }
    };

    scanDirectory(this.projectPath);

    if (totalTodos > 0) {
      this.mistakes.push({
        severity: 'low',
        type: 'todo_comments',
        message: `${totalTodos} TODO/FIXME comments found`,
        risk: 'Unfinished work or known issues',
        fix: 'Complete or remove TODO items before deployment'
      });
    }
  }

  /**
   * Run all mistake detection checks
   */
  async detectAll() {
    this.checkEnvInGit();
    this.checkHardcodedSecrets();
    this.checkMissingAltText();
    this.checkConsoleLogStatements();
    this.checkTodoComments();

    return {
      mistakes: this.mistakes,
      critical: this.mistakes.filter(m => m.severity === 'critical').length,
      high: this.mistakes.filter(m => m.severity === 'high').length,
      medium: this.mistakes.filter(m => m.severity === 'medium').length,
      low: this.mistakes.filter(m => m.severity === 'low').length
    };
  }

  /**
   * Print detected mistakes
   */
  printResults() {
    console.log('');
    console.log(chalk.bold('Common Mistakes Check:'));
    console.log('');

    if (this.mistakes.length === 0) {
      console.log(chalk.green('  ✓ No common mistakes detected'));
      console.log('');
      return true;
    }

    // Group by severity
    const critical = this.mistakes.filter(m => m.severity === 'critical');
    const high = this.mistakes.filter(m => m.severity === 'high');
    const medium = this.mistakes.filter(m => m.severity === 'medium');
    const low = this.mistakes.filter(m => m.severity === 'low');

    // Print critical
    for (const mistake of critical) {
      console.log(chalk.red.bold('  ✗ CRITICAL:') + ` ${mistake.message}`);
      console.log(chalk.dim(`    Risk: ${mistake.risk}`));
      console.log(chalk.dim(`    Fix: ${mistake.fix}`));
      console.log('');
    }

    // Print high
    for (const mistake of high) {
      console.log(chalk.red('  ✗ HIGH:') + ` ${mistake.message}`);
      console.log(chalk.dim(`    Risk: ${mistake.risk}`));
      console.log(chalk.dim(`    Fix: ${mistake.fix}`));
      console.log('');
    }

    // Print medium
    for (const mistake of medium) {
      console.log(chalk.yellow('  ⚠ MEDIUM:') + ` ${mistake.message}`);
      console.log(chalk.dim(`    Risk: ${mistake.risk}`));
      console.log(chalk.dim(`    Fix: ${mistake.fix}`));
      console.log('');
    }

    // Print low
    for (const mistake of low) {
      console.log(chalk.cyan('  ℹ LOW:') + ` ${mistake.message}`);
      console.log(chalk.dim(`    ${mistake.fix}`));
      console.log('');
    }

    // Summary
    const hasCritical = critical.length > 0;
    const hasHigh = high.length > 0;

    if (hasCritical || hasHigh) {
      console.log(chalk.red.bold(`Found ${critical.length + high.length} critical/high severity issues that should be fixed before deployment.`));
      console.log('');
    }

    return !hasCritical && !hasHigh;
  }
}
