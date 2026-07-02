# Cynthia Nahra — Portfolio

Calm, editorial, image-led portfolio for a junior architect. Built with **Next.js 16 (App Router, JavaScript)**, **MUI v9 + Emotion** (single token source), **Framer Motion**, **Lenis**, and **EmailJS**. Ships as a fully static site (`output: 'export'`) — deployable to Vercel or any static host as-is.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Static export → `out/` (all pages prerendered) |
| `npm run lint` | ESLint (flat config; `next build` no longer lints) |
| `npm run placeholders` | (Re)generate SVG image placeholders — idempotent, skips real assets |

## Environment (EmailJS)

The contact form sends via [EmailJS](https://www.emailjs.com/) entirely client-side. Copy the example and fill in your keys:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

These are `NEXT_PUBLIC_*` because EmailJS keys are public-by-design and are inlined into the static bundle. **Do not commit `.env.local`.** When the vars are missing the form is disabled with a visible notice (never a silent failure). Set the same vars in your Vercel project settings for production.

## Structure

```
docs/                 project brief, design direction, UI spec, content model, assets, progress
src/
  theme/theme.js      single design-token source (colors, type, motion, layout)
  content/            site.js, capabilities.js, projects.js (8 projects) + i18n (en.js + t())
  components/         layout/ (Header, MenuOverlay, Footer, Section, …) + ui/ (primitives)
  app/                App Router routes (/, /projects, /projects/[slug], /about, /contact, /style-guide, 404)
public/images/        generated SVG placeholders (see docs/assets.md for the real-asset swap-in)
scripts/              generate-placeholders.mjs
```

## Content & assets

- All content lives in `src/content/`. Adding a project = one entry in `projects.js` + an image folder, then `npm run placeholders`.
- Unknown copy/assets are surfaced as greppable `TODO:` strings (in code and in `docs/progress.md`) — never silently invented. Find them with `rg -n "TODO:" src docs`.
- Real image swap-in procedure: `docs/assets.md`.
