# Progress — master build checklist

Claude Code keeps this file current: tick items in the same change that completes them; add surfaced TODOs under **Open TODOs**.

## Milestone 1 — Scaffold & architecture (prompts/01) ✅ complete
- [x] Next.js (App Router, JS, src dir) initialized; deps installed (MUI, emotion, framer-motion, lenis, @emailjs/browser, @mui/material-nextjs)
- [x] `next.config.mjs` static export + unoptimized images; `.env.local.example` added
- [x] `theme.js` — all ui-spec §1 tokens; fonts wired via next/font CSS vars
- [x] i18n `en.js` + `t()` helper; all chrome strings externalized
- [x] `types.js`, `site.js`, `capabilities.js`, `projects.js` (8 real entries) created verbatim
- [x] Placeholder script written, run, idempotent; 76 SVGs generated (⚠ commit deferred — running in no-git mode per owner)
- [x] Layout shells: Container, Section, Header, MenuOverlay (functional), Footer, SmoothScroll (Lenis + reduced-motion guard)
- [x] UI primitives: SectionLabel, TextLink, Reveal, ImageFigure, YearChip, CategoryChip
- [x] Routes render real content: `/`, `/projects`, 8× detail (generateStaticParams + `dynamicParams=false`), `/about`, `/contact`, `/style-guide` (noindex), 404
- [x] Skip-link + `main#main`; metadata title template (`%s — Cynthia Nahra`)
- [x] Lint + static build clean; acceptance criteria of prompt 01 all true (16 routes emitted to `out/`; adversarial audit: 0 token/acceptance issues)

**M1 build/stack notes (for prompt 02):** Next **16.2.10** (Turbopack) + React **19.2.4**, React Compiler ON (`reactCompiler: true`), MUI **v9.1.2** + emotion, `@mui/material-nextjs/**v16-appRouter**`. `package.json` has `"type": "module"` (lets the `.mjs` placeholder script import the ESM content module). Architecture: route files are **server** components (own `metadata`/`generateStaticParams`); all themed presentational components are **`'use client'`** (MUI v9 `ThemeProvider` is client-only → `src/theme/ThemeRegistry.js`). Dynamic `params` is a **Promise** (awaited). `next build` no longer lints — use `npm run lint`.

## Milestone 2 — UI build (prompts/02) ✅ complete
- [x] T1 Global chrome (Header states, MenuOverlay design+motion, Footer, focus styles)
- [x] T2 Home hero (+ LatestProjectCard)
- [x] T3 Manifesto + about preview
- [x] T4 Capabilities night section
- [x] T5 Featured projects (3 cards + CursorBadge)
- [x] T6 Belief + approach values (4 SVG icons) + ToolsStrip + contact CTA
- [x] T7 Projects grid page
- [x] T8 Project detail template (galleries, related links 03↔07, prev/next)
- [x] T9 About page
- [x] T10 Contact page + EmailJS state machine
- [x] T11 404 + style-guide
- [x] T12 Motion & polish pass (reduced-motion audit)
- [x] T13 A11y + performance pass — Lighthouse (throttled mobile): `/` **P 99 / A11y 100** · `/projects` **P 99 / A11y 100** · detail **P 100 / A11y 100**
- [x] Final gate: build clean, TODO grep report appended below

**M2 motion/a11y/perf notes (T12–T13):**
- **T12** — Reduced-motion is enforced two ways: (1) every Framer component self-guards via `useReducedMotion` (Reveal, MenuOverlay, CursorBadge, FeaturedProjectCard) or `@media` query (ProjectCard); (2) a global safety net in `globals.css` neutralizes *all* CSS transitions/animations + `animation-delay` + `scroll-behavior` under `prefers-reduced-motion: reduce`, so header-bg, burger→×, hover underline/arrow, submit-button invert and skip-link produce zero animation. Lenis is never instantiated under reduced motion (`SmoothScroll` guard). Verified present in built CSS.
- **T13 a11y** — axe (via Lighthouse) **100** on all 3 pages; heading outline valid (exactly one `h1`/page, `h1→h2` with no skips — `// labels` and statement display lines are intentionally not headings); focus-visible global + tone-aware; MenuOverlay Escape/focus-trap/return-focus/`aria-expanded`+`aria-controls` intact; form labels + `aria-describedby` errors, `role=status`/`role=alert`, errors are text (not color-only).
- **T13 perf fixes** — the LCP element on each page was gated behind JS hydration by a Framer `opacity:0` initial state. Fixes: (a) Home hero mount reveal moved from Framer to a CSS `@keyframes heroRise` (above-the-fold headline paints at first paint — observed LCP 1267ms→~320ms); (b) first `/projects` card rendered un-gated with an eager (`priority`) image instead of lazy inside `Reveal` (observed LCP 704ms→~305ms). Result: FCP 0.8s · TBT 0ms · CLS 0 on all three; simulated-mobile LCP 2.1s/2.1s/1.6s.
  - *Measurement note:* scores were taken against a **brotli/gzip-serving** static server to mirror Vercel. Serving the `out/` bundle **uncompressed** (e.g. `python -m http.server`) counts ~854 KiB of raw JS and reports Performance ~76 with an inflated simulated-LCP — a measurement artifact, not a runtime regression (observed/real LCP is ≤320ms everywhere). Deploy target (Vercel) compresses by default, so the 99/99/100 figures are representative.

**Post-review refinement — Home featured section (T5):** reworked the 3 featured cards from a plain vertical stack into a **sticky-stack** matching the Archevo reference (page pins while each project slides up and stacks over the previous, previous card's YearChip peeking). Pure CSS `position: sticky` (`Featured.js`): cards pin just below the fixed header, full-viewport height, 24px per-card peek offset, height trimmed by header + total offset so no card bottom is clipped. Reduced motion → plain vertical stack (no pinning). Verified in-browser: cards rise → pin → stack (stacked YearChips) → release into the Belief section; header stays solid night throughout. `ui-spec.md` §4/§5 updated.

**Fix — footer wordmark overflow:** the giant `cynthia nahra.` wordmark used `font-size: clamp(4rem,16vw,15rem)` with `white-space: nowrap`; for a 14-char string that intrinsic width (~6em) exceeded the container (e.g. 1436px vs 1328px at a 1512 viewport), so it was clipped by the wrap's `overflow:hidden` (read as "bigger than 100vw"). `Footer.js` now makes the wrap a query container (`container-type: inline-size`) and sizes the wordmark `font-size: min(16cqw, 15rem)` so it fits the container width edge-to-edge at every viewport. Verified: text width ≤ container from 288px (=320px viewport) through 1328px, ~4% margin, no clip, no horizontal scroll.

**Follow-up (reference-match pass):** (1) **Dimensions** — featured stack is now **contained** (max-width 1440 + gutter) instead of full-bleed, so cards sit inset with paper margins like the reference; image `sizes` updated. (2) **CursorBadge follow** — the "View Project" badge was reading as stuck at the card's top-left because it only revealed/positioned on `mouseenter`, which can be missed when a sticky card pins under a stationary cursor. `FeaturedProjectCard.js` now positions on both enter (instant `jump`, no fly-in from origin) and move, and reveals on move too — verified in-browser that it appears under the pointer and spring-follows. (3) **Spacing** — the featured stack butted directly against the night Belief section; added `padding-bottom: clamp(64px,10vw,160px)` so sections no longer touch.

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

## Final-gate TODO grep report (owner swap-in worklist)
`rg -n "TODO:" src docs | wc -l` → **73** (39 in `src`, 34 in `docs`). All are content/asset swap-ins — none block build or deploy. The site ships with visible, greppable `TODO:` placeholders exactly per the content-model rule.

**By tag (occurrences in `src`):**
| Tag | # | Where | What the owner supplies |
|---|---|---|---|
| `TODO:confirm-years` | 9 | `content/projects.js` | Confirm/replace inferred per-project years |
| `TODO:` (image `alt`) | 8 | `projects.js`, `AboutView`, `ContactView`, `AboutPreview`, `Belief` | Real descriptive alt text once photos land (portrait, contact panel, about preview, belief bg, per-project renders/drawings/heroes) |
| `TODO:bio` | 4 | `AboutView.js` | 2–3 sentence bio (About + home preview) |
| `TODO:confirm-school-label` | 3 | `AboutView.js` | Exact wording for "USJ — ESAR" |
| `TODO:social-links` | 2 | `content/site.js` | LinkedIn/Instagram/Behance URLs (unset → hidden) |
| `TODO:confirm-email-spelling` | 2 | `content/site.js` | nahra vs nohra in email address |
| `TODO:hero-headline` / `hero-intro` | 2 | `Hero.js` | Approve/rewrite hero copy (one italic accent word) |
| `TODO:opera-summary` / `opera-description` / `opera-tools` | 3 | `content/projects.js` | Thesis content (verify 836 / 506 seat counts) |
| `TODO:manifesto` / `featured-intro` / `belief-line` / `about-headline` / `footer-line` | 5 | home sections + Footer | Approve/rewrite drafted statement copy |
| `TODO:tools-extra` | 1 | `content/site.js` | Confirm final ToolsStrip list |

Plus the EmailJS notice string in `ContactForm.js` (shown only while `NEXT_PUBLIC_EMAILJS_*` env is unset). The 34 `docs` matches are the specifications/worklist entries above and in `content-model.md`/`ui-spec.md`, not shipped strings.

## Milestone 2 sign-off
- `npm run lint` clean · `npm run build` clean (16 static routes → `out/`, deployable to Vercel as-is).
- Every M2 checkbox ticked; no checkbox converted to an open TODO (all acceptance criteria met, including Performance ≥ 95 / A11y ≥ 95).
- Remaining work is entirely the owner content/asset swap-in list above (unchanged from M1) — no engineering tasks outstanding.
