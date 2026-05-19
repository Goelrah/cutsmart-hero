#!/bin/bash
# Run this AFTER creating the public repo at github.com/Goelrah/cutsmart-hero
# (Create it empty — no README, no .gitignore)

set -e

cd "$(dirname "$0")"

# Create a temp folder, init git, push
TEMP_DIR=$(mktemp -d)
cp index.html README.md "$TEMP_DIR/"
cd "$TEMP_DIR"

git init
git add .
git commit -m "CutSmart download page — Hero Steels"
git branch -M main
git remote add origin https://github.com/Goelrah/cutsmart-hero.git
git push -u origin main

echo ""
echo "✅ Done! Now go to:"
echo "   https://github.com/Goelrah/cutsmart-hero/settings/pages"
echo ""
echo "   Set Source: Deploy from branch → main → / (root)"
echo "   Your page will be live at: https://goelrah.github.io/cutsmart-hero"

# Cleanup
rm -rf "$TEMP_DIR"
