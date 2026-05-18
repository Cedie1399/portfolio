# Portfolio — Cyrus Daniel Santos

Personal portfolio site. Hybrid 3D landing with a Bento-grid content section.

**Live:** [portfolio-eight-nu-g8zb6rz3vq.vercel.app](https://portfolio-eight-nu-g8zb6rz3vq.vercel.app/)

## Stack

- **Build:** Vite
- **UI:** React + TypeScript
- **3D:** React Three Fiber (`@react-three/fiber`) + `drei` (Three.js)
- **Styling:** Tailwind CSS

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## Project layout

```
src/
├── data/portfolioData.ts   # Single source of truth for all content
├── components/             # Reusable UI + section composers
│   ├── BentoCard.tsx       # Generic Bento card primitive
│   ├── BentoGrid.tsx       # Grid container with col/row span helpers
│   ├── CaseStudyDialog.tsx # Slide-in <dialog> drawer for project deep-dives
│   ├── Header.tsx / Footer.tsx
│   ├── Hero.tsx            # DOM wrapper around the lazy 3D scene
│   └── sections/           # About, Projects, Experience, Education, Skills, Contact
├── scene/HeroScene.tsx     # Lazy-loaded R3F scene (geometric polyhedra)
├── hooks/useReducedMotion.ts
└── lib/cn.ts               # Classnames helper
```

## Architectural notes

- **Content lives in one file.** `src/data/portfolioData.ts` is the only place to edit copy — every component reads from there.
- **3D is lazy.** The R3F scene is split into its own chunk via `React.lazy`. The main bundle stays small (~68 kB gzip); the 3D chunk loads after first paint.
- **Reduced-motion friendly.** Users with `prefers-reduced-motion: reduce` skip the canvas entirely and see a static gradient backdrop with full DOM content underneath.
- **Hybrid layout.** 3D is restricted to the Hero — all content sections (Projects, Experience, Skills, etc.) are accessible DOM rendered as a Bento grid.

## Deployment

Auto-deploys to Vercel on push to `main` (preview deploys on every other branch). See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full details.
