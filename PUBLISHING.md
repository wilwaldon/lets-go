# Publishing Guide

This guide covers how to publish and maintain the Let's Go! plugin on the Claude Code marketplace.

## Prerequisites

- GitHub account
- Git configured with your credentials
- Claude Code installed (for testing)

## Initial Setup (First Time Only)

### 1. Update GitHub URLs

Replace `YOUR_USERNAME` in these files with your actual GitHub username:

**Files to update:**
- `.claude-plugin/plugin.json` - Update `homepage` and `repository` fields
- `.claude-plugin/marketplace.json` - Update `homepage` and `repository` fields
- `README.md` - Update installation instructions

**Search and replace:**
```bash
# Find all instances
grep -r "YOUR_USERNAME" .

# Replace with your username
# On Unix/Mac:
find . -type f -name "*.json" -o -name "*.md" | xargs sed -i 's/YOUR_USERNAME/your-actual-username/g'

# On Windows (PowerShell):
Get-ChildItem -Recurse -Include *.json,*.md | ForEach-Object { (Get-Content $_.FullName) -replace 'YOUR_USERNAME', 'your-actual-username' | Set-Content $_.FullName }
```

### 2. Create GitHub Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial release of Let's Go! plugin"

# Create GitHub repo (using GitHub CLI)
gh repo create lets-go --public --source=. --remote=origin --push

# Or manually:
# 1. Create repo on github.com
# 2. git remote add origin https://github.com/yourusername/lets-go.git
# 3. git push -u origin main
```

### 3. Test Installation Locally

Before publishing, test the plugin installation:

```bash
# In Claude Code, add your local marketplace:
/plugin marketplace add .

# Install the plugin:
/plugin install lets-go@lets-go-marketplace

# Test a command:
/letsgo
```

If everything works, proceed to publish.

## Publishing Updates

### Version Numbering

Use semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Breaking changes (e.g., `2.0.0`)
- **MINOR**: New features, backwards compatible (e.g., `1.1.0`)
- **PATCH**: Bug fixes (e.g., `1.0.1`)

### Release Process

**1. Update Version Numbers**

Update the version in **both** files:

`.claude-plugin/plugin.json`:
```json
{
  "version": "1.1.0"
}
```

`.claude-plugin/marketplace.json`:
```json
{
  "metadata": {
    "version": "1.1.0"
  },
  "plugins": [
    {
      "version": "1.1.0"
    }
  ]
}
```

**2. Update CHANGELOG**

Add entry to `CHANGELOG.md` (create if it doesn't exist):

```markdown
## [1.1.0] - 2026-03-03

### Added
- Hero background image system
- Automatic Supabase credential prompts in CLI

### Fixed
- Database migration UUID function errors
- Tailwind CSS processing issues

### Changed
- Updated README with plugin installation instructions
```

**3. Commit and Tag**

```bash
# Commit version changes
git add .claude-plugin/plugin.json .claude-plugin/marketplace.json CHANGELOG.md
git commit -m "chore: bump version to 1.1.0"

# Create git tag
git tag -a v1.1.0 -m "Release v1.1.0"

# Push commit and tag
git push origin main
git push origin v1.1.0
```

**4. Notify Users**

Users can update with:
```bash
/plugin marketplace update
/plugin update lets-go@your-username
```

Updates happen automatically when users restart Claude Code (if auto-update is enabled).

## Release Checklist

Use this checklist for each release:

- [ ] All tests pass (`npm run type-check`, `npm run build`)
- [ ] Commands tested in Claude Code
- [ ] Version updated in both `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`
- [ ] CHANGELOG.md updated with changes
- [ ] README.md updated if needed
- [ ] Committed with semantic commit message
- [ ] Git tag created (e.g., `v1.1.0`)
- [ ] Pushed to GitHub (both commit and tag)
- [ ] Tested installation from GitHub: `/plugin marketplace add yourusername/lets-go`
- [ ] Announced in Discord/Twitter/community channels

## Troubleshooting

### Users Can't Install Plugin

**Issue**: Error when running `/plugin marketplace add`

**Solutions**:
1. Verify repository is public on GitHub
2. Check that `.claude-plugin/marketplace.json` exists at repo root
3. Validate JSON syntax: `claude plugin validate .`
4. Ensure `plugin.json` and `marketplace.json` have matching names

### Plugin Commands Don't Appear

**Issue**: Plugin installs but commands aren't available

**Solutions**:
1. Verify `.claude/commands/` directory contains `.md` files
2. Check that `commands` path in `plugin.json` is correct: `.claude/commands/`
3. Restart Claude Code after installation
4. Run `/plugin list` to verify plugin is installed

### Version Not Updating

**Issue**: Users don't see latest version

**Solutions**:
1. Ensure version was updated in both JSON files
2. Verify git tag was pushed: `git push origin v1.1.0`
3. Users need to run: `/plugin marketplace update` then `/plugin update lets-go@your-username`
4. Check that users have auto-update enabled in settings

## Testing Before Release

### Local Testing

```bash
# Test marketplace locally
/plugin marketplace add .
/plugin install lets-go@lets-go-marketplace

# Test each command
/letsgo
/addpage
/redesign
/theme
# etc.
```

### Pre-Release Branch Testing

For major changes, test from a branch first:

```bash
# Create release branch
git checkout -b release/v2.0.0

# Make changes and commit
git add .
git commit -m "feat: major feature"
git push origin release/v2.0.0

# Test from branch
/plugin marketplace add yourusername/lets-go --ref release/v2.0.0
/plugin install lets-go@yourusername

# If tests pass, merge to main
git checkout main
git merge release/v2.0.0
git push origin main
```

## Support

- **Documentation**: [Claude Code Plugins](https://code.claude.com/docs/en/plugins)
- **Issues**: https://github.com/yourusername/lets-go/issues
- **Discussions**: https://github.com/yourusername/lets-go/discussions

## Quick Reference

```bash
# Test locally
/plugin marketplace add .
/plugin install lets-go@lets-go-marketplace

# Validate structure
claude plugin validate .

# Update users' installations
/plugin marketplace update

# Check installed plugins
/plugin list

# Remove plugin (for testing reinstalls)
/plugin remove lets-go@lets-go-marketplace
```
