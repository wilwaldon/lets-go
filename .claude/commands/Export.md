The user wants to export the current project as a zip file for client handoff.

1. Determine the project name from site-data.json (business.name) or the current directory name
2. Clean the project name for use as a filename (lowercase, hyphens, no special chars)
3. Create a zip archive containing the entire project directory EXCEPT:
   - .git/
   - node_modules/
   - .DS_Store
   - thumbs.db
   - .vscode/
4. Name the zip: [project-name]-[YYYY-MM-DD].zip
5. Place the zip in the current directory
6. Print the file size and contents summary:
   - Number of HTML pages
   - Whether site-data.json is present
   - Whether images/ has any files
   - Total file count

Command to run:

```bash
PROJECT_NAME=$(node -e "try{const d=JSON.parse(require('fs').readFileSync('site-data.json','utf8'));console.log(d.business.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-+$/,''))}catch(e){console.log(require('path').basename(process.cwd()))}")
DATE=$(date +%Y-%m-%d)
ZIP_NAME="${PROJECT_NAME}-${DATE}.zip"
zip -r "$ZIP_NAME" . -x ".git/*" "node_modules/*" "*.DS_Store" "thumbs.db" ".vscode/*" "*.zip"
echo "Exported: $ZIP_NAME ($(du -h "$ZIP_NAME" | cut -f1))"
echo "Pages: $(find . -name '*.html' -not -path './.git/*' | wc -l)"
echo "Images: $(find ./images -type f -not -name '.gitkeep' 2>/dev/null | wc -l)"
```

After creating the zip, let the user know:

- The zip filename and size
- That it's ready to send to the client or upload to a host
- Remind them to replace any [PLACEHOLDER] content in site-data.json before delivering
