# Progress — master build checklist

Claude Code keeps this file current: tick items in the same change that completes them; add surfaced TODOs under **Open TODOs**.

## Milestone 1 — Scaffold & architecture (prompts/01)
- [ ] Next.js (App Router, JS, src dir) initialized; deps installed (MUI, emotion, framer-motion, lenis, @emailjs/browser, @mui/material-nextjs)
- [ ] `next.config.mjs` static export + unoptimized images; `.env.local.example` added
- [ ] `theme.js` — all ui-spec §1 tokens; fonts wired via next/font CSS vars
- [ ] i18n `en.js` + `t()` helper; all chrome strings externalized
- [ ] `types.js`, `site.js`, `capabilities.js`, `projects.js` (8 real entries) created verbatim
- [ ] Placeholder script written, run, idempotent; SVGs committed
- [ ] Layout shells: Container, Section, Header, MenuOverlay (functional), Footer, SmoothScroll (Lenis + reduced-motion guard)
- [ ] UI primitives: SectionLabel, TextLink, Reveal, ImageFigure, YearChip, CategoryChip
- [ ] Routes render real content: `/`, `/projects`, 8× detail (generateStaticParams), `/about`, `/contact`, `/style-guide` (noindex), 404
- [ ] Skip-link + `main#main`; metadata title template
- [ ] Lint + static build clean; acceptance criteria of prompt 01 all true

## Milestone 2 — UI build (prompts/02)
- [ ] T1 Global chrome (Header states, MenuOverlay design+motion, Footer, focus styles)
- [ ] T2 Home hero (+ LatestProjectCard)
- [ ] T3 Manifesto + about preview
- [ ] T4 Capabilities night section
- [ ] T5 Featured projects (3 cards + CursorBadge)
- [ ] T6 Belief + approach values (4 SVG icons) + ToolsStrip + contact CTA
- [ ] T7 Projects grid page
- [ ] T8 Project detail template (galleries, related links 03↔07, prev/next)
- [ ] T9 About page
- [ ] T10 Contact page + EmailJS state machine
- [ ] T11 404 + style-guide
- [ ] T12 Motion & polish pass (reduced-motion audit)
- [ ] T13 A11y + performance pass — Lighthouse: `/` __ · `/projects` __ · detail __
- [ ] Final gate: build clean, TODO grep report appended below

## Open TODOs (content/asset swap-ins — owner)
- [ ] `TODO:bio` — 2–3 sentence bio (About + home preview)
- [ ] `TODO:portrait` — portrait photo → `public/images/about/portrait.jpg`
- [ ] `TODO:hero-headline` / `TODO:hero-intro` / `TODO:manifesto` / `TODO:featured-intro` / `TODO:belief-line` / `TODO:about-headline` / `TODO:footer-line` — approve or rewrite drafted copy
- [ ] `TODO:confirm-years` — per-project years (currently inferred 2022/2023/2024/2026)
- [ ] `TODO:confirm-email-spelling` — nahra vs nohra in email address
- [ ] `TODO:confirm-school-label` — exact wording for "USJ — ESAR"
- [ ] `TODO:opera-summary` / `TODO:opera-description` / `TODO:opera-tools` — thesis content (verify 836 / 506 seat counts)
- [ ] `TODO:social-links` — LinkedIn/Instagram/Behance URLs (unset ones are hidden)
- [ ] `TODO:tools-extra` — confirm final ToolsStrip list
- [ ] EmailJS: create service + template, fill `.env.local` (+ Vercel env vars)
- [ ] Replace all placeholder SVGs with real exports per `docs/assets.md` (≥5 renders + drawings per project)
