#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: ./scripts/publish-to-github.sh <github-repo-url> [branch]"
  echo "Example: ./scripts/publish-to-github.sh git@github.com:YOUR-USER/azoe-afh-site.git main"
  exit 1
fi

REPO_URL="$1"
BRANCH="${2:-main}"

echo "Running handoff preflight..."
npm run handoff:check

if [[ -d .git ]]; then
  echo "A Git repository already exists here."
else
  git init
fi

git add .

if git rev-parse --verify HEAD >/dev/null 2>&1; then
  git commit --allow-empty -m "Prepare AZOE site for Cloudflare Pages launch" || true
else
  git commit -m "Prepare AZOE site for Cloudflare Pages launch"
fi

git branch -M "$BRANCH"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

git push -u origin "$BRANCH"

echo ""
echo "Published to GitHub:"
echo "  $REPO_URL"
echo ""
echo "Next:"
echo "1. Open Cloudflare Pages in the owner's account"
echo "2. Connect this GitHub repository"
echo "3. Deploy and verify the phone and email contact details on the live site"
