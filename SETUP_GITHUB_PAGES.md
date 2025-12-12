# GitHub Pages Setup Instructions

## Step 1: Create the GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ux-interaction-design-brief`
3. Make sure it's set to **Public** (required for free GitHub Pages)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, run these commands:

```bash
cd /Users/steffo/Desktop/Brief_2
git push -u origin main
```

You'll be prompted for authentication. Use a Personal Access Token (not your password).

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/StefanIadt/ux-interaction-design-brief
2. Click on **Settings**
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

Your site will be available at:
**https://stefaniadt.github.io/ux-interaction-design-brief/**

Note: It may take a few minutes for the site to be live after enabling Pages.
