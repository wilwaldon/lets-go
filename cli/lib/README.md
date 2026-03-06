# Validation System

Comprehensive validation and quality tools for the Let's Go! CLI.

## Overview

The validation system provides four main components:

1. **PreFlightChecker** - System requirements validation before generation
2. **PostGenerationValidator** - Verify generated project structure and files
3. **ConfigLinter** - Content quality and format validation for configuration files
4. **MistakesDetector** - Common mistake and security issue detection

## Components

### 1. PreFlightChecker

Validates the development environment before project generation.

**Checks:**
- ✓ Node.js version (requires v18+)
- ✓ Git installation
- ✓ npm availability
- ✓ Write permissions in current directory
- ✓ Available disk space (warns if < 100MB)

**Usage:**
```javascript
import { PreFlightChecker } from './lib/validators.js';

const checker = new PreFlightChecker();
const result = await checker.runAll();
checker.printResults();

if (!result.success) {
  process.exit(1);
}
```

**Output:**
```
Pre-flight Checks:

  ✓ Node.js version (v24.13.0)
  ✓ Git installation (git version 2.53.0)
  ✓ npm installation (v10.9.0)
  ✓ Write permissions (OK)
  ✓ Disk space (1484810MB available)
```

---

### 2. PostGenerationValidator

Validates the generated project after creation.

**Checks:**
- ✓ Project directory exists
- ✓ All required files are present
- ✓ site-data.json structure (static sites)
- ✓ package.json structure (full-stack)
- ✓ .env.local configuration (full-stack)
- ✓ Git repository initialized
- ✓ File sizes (warns if > 5MB)

**Usage:**
```javascript
import { PostGenerationValidator } from './lib/validators.js';

const validator = new PostGenerationValidator(projectPath, 'static');
// or for full-stack: new PostGenerationValidator(projectPath, 'fullstack')

const result = await validator.runAll();
validator.printResults();
```

**Output:**
```
Post-Generation Validation:

  ✓ Project directory
  ✓ Required files (6 files verified)
  ✓ site-data.json
  ✓ Git repository
  ✓ File sizes
  ⚠ Business name is still "My Business"
    Update business.name in site-data.json
```

---

### 3. ConfigLinter

Lints configuration files for content quality, AI slop detection, and format validation.

**AI Slop Detection:**

Detects common AI-generated phrases that should be replaced with human-written copy:

- "Welcome to..."
- "Passionate about..."
- "Learn more"
- "Don't hesitate to..."
- "We pride ourselves..."
- "Best in class"
- "Cutting-edge"
- "State-of-the-art"
- "World-class"
- "Premier destination"
- "Look no further"
- "Your one-stop..."
- "Seamless experience"
- "Game-changer"
- "Revolutionary"
- And more...

**Validation Checks:**
- ✓ AI slop pattern detection
- ✓ Placeholder text detection ([brackets], TODO, FIXME, etc.)
- ✓ Phone number format validation
- ✓ Email address validation
- ✓ URL format validation
- ✓ Required fields presence
- ✓ Empty section detection

**Usage:**
```javascript
import { ConfigLinter } from './lib/validators.js';

const linter = new ConfigLinter('path/to/site-data.json', 'json');
const result = await linter.lintJsonConfig();
linter.printResults();
```

**Output:**
```
Config Linter: site-data.json

  ✗ Error: Invalid email address format
    Field: business.contact.email
    Fix: Use format: name@example.com
  ⚠ Warning: AI slop detected in business.tagline: "passionate about"
    Fix: Replace with natural, human-written copy
  ⚠ Warning: Invalid phone number format
    Field: business.contact.phone
    Fix: Use format: (555) 123-4567 or +1-555-123-4567
```

---

### 4. MistakesDetector

Scans the generated project for common mistakes, security issues, and quality problems.

**Security Checks:**
- ✗ Missing .gitignore (HIGH severity)
- ✗ .env.local not in .gitignore (HIGH severity)
- ✗ Hardcoded secrets in source code (CRITICAL severity)

**Accessibility Checks:**
- ⚠ Missing alt text on images (MEDIUM severity)

**Code Quality Checks:**
- ℹ Console.log statements (LOW severity, warns if > 5)
- ℹ TODO/FIXME comments (LOW severity)

**Usage:**
```javascript
import { MistakesDetector } from './lib/validators.js';

const detector = new MistakesDetector(projectPath, 'fullstack');
const result = await detector.detectAll();
detector.printResults();
```

**Output:**
```
Common Mistakes Check:

  ✗ HIGH: .gitignore file is missing
    Risk: Sensitive files like .env.local may be committed to git
    Fix: Create .gitignore with .env.local and other sensitive files

  ⚠ MEDIUM: 2 image(s) without alt text in index.html
    Risk: Poor accessibility for screen readers
    Fix: Add descriptive alt="" attributes to all <img> tags

  ℹ LOW: 6 console statements found
    Remove or replace with proper logging library

Found 1 critical/high severity issues that should be fixed before deployment.
```

---

## Severity Levels

The validation system uses four severity levels:

| Level | Icon | Color | Meaning |
|-------|------|-------|---------|
| CRITICAL | ✗ | Red Bold | Security vulnerabilities that MUST be fixed |
| HIGH | ✗ | Red | Important issues that should be fixed before deployment |
| MEDIUM | ⚠ | Yellow | Quality issues that affect user experience |
| LOW | ℹ | Cyan | Minor issues and suggestions |

---

## Integration with CLI

The validators are automatically integrated into the CLI flow:

```
User runs: npx create-lets-go-app
    ↓
1. PreFlightChecker runs
    ├── If errors: exit with error message
    └── If warnings: continue with notice
    ↓
2. User answers questions
    ↓
3. Project generation
    ↓
4. PostGenerationValidator runs
    ├── Verify all files created
    └── Check structure and configuration
    ↓
5. ConfigLinter runs (static sites only)
    ├── Check for AI slop
    └── Validate contact info
    ↓
6. MistakesDetector runs
    ├── Security checks
    ├── Accessibility checks
    └── Code quality checks
    ↓
7. Display final success message
```

---

## Testing

Run the test scripts to verify validators:

```bash
# Basic test (pre-flight checks only)
cd cli
node test-validators.js

# Comprehensive test (all validators with test data)
node test-validators-full.js
```

---

## Extending the Validators

### Adding New AI Slop Patterns

Edit `validators.js` and add patterns to `ConfigLinter.AI_SLOP_PATTERNS`:

```javascript
static AI_SLOP_PATTERNS = [
  /welcome to/i,
  /your new pattern here/i,
  // ... more patterns
];
```

### Adding New Mistake Checks

Create a new method in `MistakesDetector`:

```javascript
checkYourNewCheck() {
  // Your validation logic
  if (problemFound) {
    this.mistakes.push({
      severity: 'high', // or 'critical', 'medium', 'low'
      type: 'descriptive_type',
      message: 'What was detected',
      risk: 'Why this matters',
      fix: 'How to fix it'
    });
  }
}
```

Then call it in the `detectAll()` method:

```javascript
async detectAll() {
  this.checkEnvInGit();
  this.checkHardcodedSecrets();
  this.checkYourNewCheck(); // Add your check here
  // ... other checks
}
```

---

## API Reference

### PreFlightChecker

```typescript
class PreFlightChecker {
  checks: Array<{name: string, status: string, detail: string}>
  warnings: Array<{type: string, message: string, fix: string}>
  errors: Array<{type: string, message: string, fix: string}>

  checkNodeVersion(): boolean
  checkGitInstalled(): boolean
  checkNpmInstalled(): boolean
  checkWritePermissions(): boolean
  checkDiskSpace(): boolean

  async runAll(): Promise<{
    success: boolean,
    checks: Array,
    warnings: Array,
    errors: Array
  }>

  printResults(): boolean
}
```

### PostGenerationValidator

```typescript
class PostGenerationValidator {
  constructor(projectPath: string, stack: 'static' | 'fullstack')

  checkProjectDirectory(): boolean
  checkRequiredFiles(): boolean
  checkSiteDataJson(): boolean
  checkPackageJson(): boolean
  checkEnvFile(): boolean
  checkGitRepo(): boolean
  checkFileSizes(): boolean

  async runAll(): Promise<{
    success: boolean,
    checks: Array,
    warnings: Array,
    errors: Array
  }>

  printResults(): boolean
}
```

### ConfigLinter

```typescript
class ConfigLinter {
  static AI_SLOP_PATTERNS: Array<RegExp>

  constructor(configPath: string, type: 'json' | 'ts')

  detectAISlop(text: string, field: string): Array
  detectPlaceholders(text: string, field: string): Array
  validatePhone(phone: string, field: string): Object | null
  validateEmail(email: string, field: string): Object | null
  validateUrl(url: string, field: string): Object | null

  async lintJsonConfig(): Promise<{
    valid: boolean,
    errors: Array,
    warnings: Array,
    suggestions: Array
  }>

  printResults(): boolean
}
```

### MistakesDetector

```typescript
class MistakesDetector {
  constructor(projectPath: string, stack: 'static' | 'fullstack')

  checkEnvInGit(): void
  checkHardcodedSecrets(): void
  checkMissingAltText(): void
  checkConsoleLogStatements(): void
  checkTodoComments(): void

  async detectAll(): Promise<{
    mistakes: Array,
    critical: number,
    high: number,
    medium: number,
    low: number
  }>

  printResults(): boolean
}
```

---

## Best Practices

1. **Always run pre-flight checks first** - Catch environment issues before generation
2. **Show all validation results** - Users should see what was checked and what passed
3. **Provide actionable fix suggestions** - Every error/warning should include a fix
4. **Use appropriate severity levels** - Reserve CRITICAL for security issues only
5. **Make validation fast** - Run checks concurrently where possible
6. **Don't block on warnings** - Only errors should prevent generation
7. **Test edge cases** - Invalid emails, missing files, hardcoded secrets, etc.

---

## Troubleshooting

### "Cannot find package 'chalk'"
Run `npm install` in the `cli` directory to install dependencies.

### Disk space check fails
This check is optional and will only warn. It uses platform-specific commands that may fail on some systems.

### Validator doesn't detect my mistake
Check the source code in `validators.js` to see which patterns are being checked. You may need to add custom validation logic.

---

## Future Enhancements

Potential additions to the validation system:

- [ ] Lighthouse score check (requires running dev server)
- [ ] Image optimization validation (check for oversized images)
- [ ] CSS/JS bundle size validation
- [ ] Automated fix suggestions with auto-apply option
- [ ] Integration with external linters (ESLint, Prettier, Stylelint)
- [ ] Performance budget validation
- [ ] Security vulnerability scanning (via npm audit)
- [ ] WCAG compliance checker
- [ ] SEO meta tag validation
- [ ] Link checking (detect broken links)
- [ ] Spell checking for content

---

## License

MIT
