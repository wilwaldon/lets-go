# Scripts

Utility and validation scripts for Let's Go! development.

## Validation Scripts

### validate-all.js

Runs all validation scripts at once. Use this before committing changes.

```bash
node scripts/validate-all.js
```

### validate-template.js

Validates the base template structure:
- All required files exist
- site-data.json is valid JSON with required fields
- HTML files have correct structure
- CSS/JS files are valid
- No broken data-bind references

```bash
node scripts/validate-template.js
```

### validate-configs.js

Validates all business config files:
- Valid JSON syntax
- Required fields present (hero, pages, additionalData)
- Correct data types and structure
- Array lengths (3 featured items, 3 testimonials, etc.)
- No AI slop (star ratings, banned phrases)

```bash
node scripts/validate-configs.js
```

### validate-styles.js

Validates all design style CSS files:
- File exists and is non-empty
- Contains :root block with CSS variables
- Contains component styles
- No syntax errors (unmatched braces)
- Reasonable file size

```bash
node scripts/validate-styles.js
```

## Utility Scripts

### extract-css-root.js

Extracts :root blocks from CSS files using proper brace counting (handles nested braces correctly).

**Extract :root block only:**
```bash
node scripts/extract-css-root.js templates/static/styles/style-modern-minimal.css
```

**Extract everything except :root (component styles):**
```bash
node scripts/extract-css-root.js templates/static/styles/style-modern-minimal.css --components
```

This fixes the bug where simple regex like `/:root \{[^}]+\}/s` fails when :root contains nested braces (e.g., `@media` queries, `calc()` functions, `rgb()` values).

## Usage in Development

Before committing changes:

```bash
# Run all validations
node scripts/validate-all.js

# If any errors, fix them and run again
# Once all validations pass, commit
```

Before publishing:

```bash
# Validate everything
node scripts/validate-all.js

# Test the CLI
cd cli
npm link
create-lets-go-app
```

## Exit Codes

- `0` - All validations passed
- `1` - Validation failed (errors found)

Scripts may output warnings (non-critical issues) but still exit with code 0.
