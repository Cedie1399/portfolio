# Deployment & Production Release Playbook

## Target Platform

- **Host:** Vercel
- **Framework preset:** Vite (auto-detected)
- **Package manager:** `npm`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm ci` (Vercel uses this when a `package-lock.json` is committed)
- **Node version:** Pinned via `"engines"` in `package.json` (Node 20 LTS recommended)
- **Custom domain:** _deferred_ — use the default `<project>.vercel.app` URL for now.

---

## Pre-Deployment Build Sequence

Before pushing to production, verify the build runs cleanly locally:

```bash
# Clean install from lockfile
npm ci

# Production build
npm run build

# Smoke-test the production bundle
npm run preview
```

Both `npm run build` and `npm run preview` must complete without errors. The `preview` step serves `dist/` on a local port — load it in a browser and confirm the 3D hero renders, fonts load, and DOM sections look correct.

---

## Vercel Setup (first-time)

1. Push the repo to GitHub.
2. In the Vercel dashboard: **Add New → Project → Import** the GitHub repo.
3. Vercel should auto-detect Vite. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci` (or leave default)
4. Add any environment variables under **Project Settings → Environment Variables** (none required at scaffold time; revisit if analytics or a contact form backend gets added).
5. Deploy. The first build provisions the production URL.

---

## Branch → Environment Mapping

| Branch        | Environment | URL pattern                              |
| ------------- | ----------- | ---------------------------------------- |
| `main`        | Production  | `<project>.vercel.app`                   |
| Other branches | Preview    | `<project>-git-<branch>-<scope>.vercel.app` |

Every push triggers an automatic deploy. Preview deploys are shareable — useful for review before merging to `main`.

---

## Post-Deployment Validation

After each production deploy:

1. Open the live URL in an incognito window (cold cache).
2. Run Lighthouse against the **deployed** URL (not localhost). Targets:
   - Performance: ≥ 90 (desktop), ≥ 80 (mobile)
   - Accessibility / Best Practices / SEO: 100
3. Verify the 3D hero loads and the static fallback renders for `prefers-reduced-motion`.
4. Spot-check on a real mobile device (3D perf often differs from devtools throttling).

---

## Rollback

Every deploy is immutable on Vercel. To roll back: dashboard → **Deployments** → pick a previous successful build → **Promote to Production**.
