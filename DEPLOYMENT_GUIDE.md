# 🚀 Cloudflare Deployment Guide

## Quick Deploy (2 Commands)

Open Terminal and run these commands:

### 1. Build the project
```bash
cd /Users/vaidasbalciunas/Desktop/Sample/website_solidstart
npm run build
```

### 2. Deploy to Cloudflare
```bash
npx wrangler pages deploy dist --commit-dirty=true
```

✅ Done! You'll get a deployment URL like: `https://[hash].website-solidstart.pages.dev`

---

## Alternative: Using npm script

We added a convenient deploy script to your package.json:

```bash
npm run deploy
```

This will build AND deploy in one command!

---

## Step-by-Step First Time Setup

If you haven't logged in to Wrangler yet:

### 1. Navigate to project
```bash
cd /Users/vaidasbalciunas/Desktop/Sample/website_solidstart
```

### 2. Login to Cloudflare (first time only)
```bash
npx wrangler login
```
- This opens your browser
- Click "Allow" to authorize Wrangler
- You're logged in!

### 3. Build your project
```bash
npm run build
```

### 4. Deploy
```bash
npx wrangler pages deploy dist --commit-dirty=true
```

---

## Understanding the Commands

### `npm run build`
- Compiles your SolidStart app
- Creates optimized production files
- Outputs to `/dist` folder
- Takes ~1-2 seconds

### `npx wrangler pages deploy dist`
- Uploads the `dist` folder to Cloudflare
- Creates a new deployment
- Gives you a live URL
- Takes ~3-5 seconds

### `--commit-dirty=true`
- Allows deployment even with uncommitted changes
- Useful during development

---

## Your Project URLs

### Main Production URL
**https://website-solidstart.pages.dev**

### Each Deployment Gets Its Own URL
When you deploy, you get: `https://[unique-hash].website-solidstart.pages.dev`

Example:
- https://541385b7.website-solidstart.pages.dev
- https://10316848.website-solidstart.pages.dev

All point to your site, but production URL is always the latest.

---

## Deploy Workflow

### When You Make Changes:

1. **Edit your files** (CSS, components, etc.)
2. **Open Terminal** in VS Code or your terminal app
3. **Run:**
   ```bash
   cd /Users/vaidasbalciunas/Desktop/Sample/website_solidstart
   npm run build
   npx wrangler pages deploy dist --commit-dirty=true
   ```
4. **Wait ~5 seconds**
5. **Get new URL** - open it to see your changes!

---

## Quick Reference Card

| Task | Command |
|------|---------|
| Build | `npm run build` |
| Deploy | `npx wrangler pages deploy dist --commit-dirty=true` |
| Build + Deploy | `npm run deploy` |
| Login | `npx wrangler login` |
| Preview locally | `npm run dev` |

---

## Troubleshooting

### Error: "Not logged in"
**Solution:**
```bash
npx wrangler login
```

### Error: "Project not found"
**Solution:** Create project first:
```bash
npx wrangler pages project create website-solidstart --production-branch main
```

### Error: "Build failed"
**Check:**
- Are you in the right directory?
- Do you have node_modules installed? (`npm install`)
- Any syntax errors in your code?

### Deploy is slow
**Normal!** First deploy uploads everything (~50 files). 
Subsequent deploys only upload changed files (much faster).

---

## Advanced: Automatic Deployments

### Option 1: Git Integration (Recommended for production)

1. Push your code to GitHub
2. Connect GitHub repo to Cloudflare Pages
3. Auto-deploys on every push to main branch

**Setup:**
1. Go to https://dash.cloudflare.com
2. Workers & Pages → website-solidstart → Settings
3. Click "Connect to Git"
4. Select your GitHub repository
5. Done! Now every git push deploys automatically

### Option 2: GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Cloudflare Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - run: npx wrangler pages deploy dist
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

---

## Environment Variables

To add your Supabase key in production:

1. Go to https://dash.cloudflare.com
2. Workers & Pages → **website-solidstart**
3. **Settings** → **Environment variables**
4. Click **"Add variable"**
5. Name: `VITE_SUPABASE_ANON_KEY`
6. Value: `your_actual_key_here`
7. Click **"Save"**
8. Redeploy for changes to take effect

---

## Preview Before Deploying

Test locally first:

```bash
npm run dev
```

Opens at http://localhost:3000

Make sure everything works before deploying!

---

## Rollback a Deployment

If something breaks:

1. Go to https://dash.cloudflare.com
2. Workers & Pages → **website-solidstart**
3. **Deployments** tab
4. Find a previous working deployment
5. Click **"..."** menu → **"Rollback to this deployment"**

---

## Your Current Setup

✅ Project: **website-solidstart**
✅ Account: Connected
✅ Build command: `npm run build`
✅ Output directory: `dist`
✅ Live URL: https://website-solidstart.pages.dev

**You're all set up!** Just run build → deploy whenever you make changes.

---

*Last updated: December 6, 2024*

