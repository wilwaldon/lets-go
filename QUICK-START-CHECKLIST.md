# Quick Start Checklist

Follow these steps to publish your Let's Go! plugin to GitHub.

## ✅ Pre-Publishing Checklist

### 1. Update GitHub Username

Replace `YOUR_USERNAME` with your actual GitHub username in these files:

- [ ] `.claude-plugin/plugin.json` (2 places: `homepage` and `repository`)
- [ ] `.claude-plugin/marketplace.json` (2 places: `homepage` and `repository`)
- [ ] `README.md` (multiple places in installation instructions)

**Quick find command:**
```bash
grep -r "YOUR_USERNAME" .
```

### 2. Test Locally

- [ ] Test the plugin locally:
  ```bash
  # In Claude Code:
  /plugin marketplace add .
  /plugin install lets-go@lets-go-marketplace
  /letsgo
  ```

- [ ] Verify all commands work:
  - [ ] `/letsgo` - Creates a new site
  - [ ] `/addpage` - Adds pages
  - [ ] `/redesign` - Improves design
  - [ ] `/theme` - Changes colors/fonts
  - [ ] `/switch-style` - Changes design style
  - [ ] `/copy` - Audits copy
  - [ ] `/accessibility` - Checks accessibility

### 3. Validate Plugin Structure

- [ ] Run validation:
  ```bash
  claude plugin validate .
  ```
  Or in Claude Code:
  ```bash
  /plugin validate .
  ```

## 🚀 Publishing Steps

### 1. Create GitHub Repository

**Option A: Using GitHub CLI (Recommended)**
```bash
gh repo create lets-go --public --source=. --remote=origin --push
```

**Option B: Manual**
1. [ ] Go to https://github.com/new
2. [ ] Create repository named `lets-go`
3. [ ] Make it **public**
4. [ ] Don't initialize with README (you already have one)
5. [ ] Click "Create repository"
6. [ ] Run these commands:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/lets-go.git
   git branch -M main
   git push -u origin main
   ```

### 2. Verify on GitHub

- [ ] Visit `https://github.com/YOUR_USERNAME/lets-go`
- [ ] Confirm `.claude-plugin/plugin.json` is visible
- [ ] Confirm `.claude-plugin/marketplace.json` is visible
- [ ] Confirm `.claude/commands/` directory is visible

### 3. Test Installation from GitHub

- [ ] Remove local version:
  ```bash
  /plugin remove lets-go@lets-go-marketplace
  ```

- [ ] Install from GitHub:
  ```bash
  /plugin marketplace add YOUR_USERNAME/lets-go
  /plugin install lets-go@YOUR_USERNAME
  ```

- [ ] Test commands work:
  ```bash
  /letsgo
  ```

## 📢 Share Your Plugin

### Share the Installation Instructions

```markdown
## Install Let's Go!

In Claude Code, run:

/plugin marketplace add YOUR_USERNAME/lets-go
/plugin install lets-go@YOUR_USERNAME

Then start building:

/letsgo
```

### Where to Share

- [ ] Twitter/X
- [ ] Reddit (r/ClaudeAI, r/webdev)
- [ ] Discord communities
- [ ] Your blog/website
- [ ] LinkedIn
- [ ] Hacker News (Show HN)

## 🔄 Making Updates Later

When you update the plugin:

1. [ ] Update version in both JSON files
2. [ ] Commit changes
3. [ ] Create git tag: `git tag -a v1.1.0 -m "Release v1.1.0"`
4. [ ] Push: `git push origin main && git push origin v1.1.0`

Users update with:
```bash
/plugin marketplace update
/plugin update lets-go@YOUR_USERNAME
```

## 🆘 Troubleshooting

**Can't find plugin after installation?**
- Restart Claude Code
- Run `/plugin list` to verify it's installed

**Commands don't appear?**
- Check `.claude/commands/` has `.md` files
- Verify `plugin.json` has correct path: `.claude/commands/`

**Installation fails?**
- Ensure repository is **public**
- Run `claude plugin validate .` to check for errors
- Check JSON syntax is valid

## 📚 Documentation

- Full publishing guide: `PUBLISHING.md`
- Plugin docs: https://code.claude.com/docs/en/plugins
- Marketplace docs: https://code.claude.com/docs/en/plugin-marketplaces

---

## Next Steps

Once published:

1. ✅ Star your own repo on GitHub
2. ✅ Add topics to your GitHub repo: `claude-code`, `plugin`, `website-generator`
3. ✅ Create a GitHub release (optional but recommended)
4. ✅ Share on social media
5. ✅ Monitor GitHub issues for feedback

**Ready to publish?** Follow the checklist above! 🚀
