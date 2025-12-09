# Push to GitHub - Quick Reference

## Push New Project

```bash
cd /path/to/your/project
git init
git add -A
git commit -m "Initial commit"
git remote add origin https://github.com/vaidasLHQ/REPO-NAME.git
git push -u origin main
```

## Push with Tag (Snapshot)

```bash
git add -A
git commit -m "Snapshot description"
git tag -a v2025.MM.DD.N -m "Version description"
git push origin main --tags
```

## Push Existing Changes

```bash
git add -A
git commit -m "What changed"
git push
```

---

## ✅ DO

- Use HTTPS URLs: `https://github.com/vaidasLHQ/repo.git`
- Create repo on GitHub first before pushing
- Use meaningful commit messages
- Tag important snapshots with date format: `vYYYY.MM.DD.N`

## ❌ DON'T

- Don't use SSH URLs (start with `git@github.com:`)
- Don't commit `.env` files or secrets
- Don't force push (`--force`) unless you know what you're doing
- Don't commit `node_modules/` (already in .gitignore)

---

## Tag Format

`v2025.12.05.1` = Year.Month.Day.Version

- Increment last number for multiple snapshots same day
- Example: `v2025.12.05.1`, `v2025.12.05.2`, `v2025.12.05.3`


