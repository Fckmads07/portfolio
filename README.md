# Madhav Ramdin · Portfolio

My personal portfolio website. I'm a Computer Science student (DEC, 3rd semester) at Cégep Marie-Victorin in Montréal, focused on networking, systems, backend and embedded development.

The design is inspired by [Parrot OS](https://parrotsec.org): deep purple-black background, cyan accents, a typing hero and a Parrot-style terminal.

## Pages

- **Home** — who I am, my history as a developer, tech stack and contact links
- **Projects** — featured projects (filterable by category), smaller builds and coursework
- **Experience** — work experience

## Stack

React 19 · TypeScript · Vite · React Router

## Run it locally

```bash
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # type-check and build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Editing content

All content lives in `src/data/`:

| File | What it holds |
|---|---|
| `profile.ts` | Intro, social links, traits, stats, tech stack and developer history |
| `projects.ts` | Featured projects, smaller builds and coursework |
| `experience.ts` | Work experience |

To show Instagram, set `INSTAGRAM_URL` and `INSTAGRAM_HANDLE` in `src/data/profile.ts`. Links without a URL are hidden.

## Deploying

`vercel.json` rewrites every path to `index.html`, so routes like `/projects` work on Vercel when you open them directly.
