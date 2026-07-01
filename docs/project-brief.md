# Project Brief — Cynthia Nahra Portfolio

**North star:** a calm, editorial, minimalist portfolio for a single junior architect, matching the visual language of the Archevo reference (screenshots are ground truth), adapted from studio → individual.

## Owner
- **Cynthia Nahra — Junior Architect, Beirut, Lebanon.**
- Recently graduated — USJ, ESAR (École Supérieure d'Architecture). `TODO:confirm-school-label`
- Bio: `TODO:bio` (2–3 sentences, restrained, first person).
- Contact (from portfolio PDF): `cynthianohra11@gmail.com` · `+961 81 726 981`. `TODO:confirm-email-spelling` (PDF email reads "nohra", name reads "Nahra" — verify before launch).

## Goals
1. Present 8 academic projects with gallery-grade imagery (renders + technical drawings, ≥5 renders each).
2. Read as a serious, hireable professional: restrained, precise, image-led.
3. Easy to extend: a new project = one data entry + one image folder.

## Audience
Employers (architecture firms in Lebanon / GCC / EU), professors, competition juries, collaborators.

## Scope
Pages: Home, Projects (grid), Project detail (`/projects/[slug]`), About, Contact, 404, `/style-guide` (utility, noindex).
Cut (explicitly out of scope): Journal/Insights, Team page, awards/achievement counters, partner-logo marquee, any template chrome ("Buy Now" widget visible in reference screenshots is Webflow UI — ignore it).

## Non-goals
- No CMS. No TypeScript. No FR content, no language switcher (i18n structure only — see below).
- No blog, no theme toggle (the site alternates dark/light **sections** by design, not by user preference).

## Success criteria
- Visual parity with the reference screenshots (layout, spacing rhythm, type hierarchy, motifs), adapted studio → individual.
- Lighthouse ≥ 95 Performance & Accessibility on Home, Projects, and one project detail page.
- WCAG AA, full keyboard nav, `prefers-reduced-motion` respected, zero CLS on image load.
- Every missing asset/fact is surfaced as `TODO:` in code **and** in `docs/progress.md` — never silently invented.

## Content inventory (real data from portfolio PDF)
| # | Project | Slug | Academic context | Location | Tools | Year* | Featured |
|---|---------|------|------------------|----------|-------|-------|----------|
| 01 | Student Dorms | `student-dorms` | 2nd Year Project | Mansourieh, Lebanon | SketchUp · Revit · Lumion | 2022 | no |
| 02 | Municipality of Beirut | `municipality-of-beirut` | 3rd Year Project | Sodeco, Beirut | SketchUp · AutoCAD · Lumion | 2023 | yes |
| 03 | Convention Center | `convention-center` | 3rd Year Project | Sodeco, Beirut | AutoCAD · Revit · Lumion | 2023 | no |
| 04 | Affordable Housing | `affordable-housing` | 4th Year Project | Adlieh, Beirut | AutoCAD · Revit · Lumion | 2024 | no |
| 05 | Temporary Theatre | `temporary-theatre` | 4th Year Project | Beit Al Shams, Sharjah, UAE | AutoCAD · Revit · Lumion | 2024 | yes |
| 06 | Municipality of Nabatieh | `municipality-of-nabatieh` | 4th Year Project | Nabatieh, Lebanon | AutoCAD · Revit · Lumion · Photoshop | 2024 | no |
| 07 | Execution Drawings | `execution-drawings` | 3rd Year Project | Sodeco, Beirut (Convention Center) | AutoCAD | 2023 | no |
| 08 | Opera de Beyrouth | `opera-de-beyrouth` | Thesis Project | Beirut, Lebanon | `TODO:opera-tools` | 2026 | yes — hero "Latest Project" |

\* Years inferred from academic level — `TODO:confirm-years`. Each project follows the portfolio's own structure: **Site Analysis & Concept → Drawings & Diagrams → Renders & Model**. All imagery ships as generated placeholders; swap-in pipeline in `docs/assets.md`.

Project 07 is the execution set **of** project 03 — the detail page must cross-link them (`relatedSlug`).

## Stack decision + rationale
- **Next.js (App Router) + JavaScript** — owner's standard toolchain; `output: 'export'` keeps hosting trivial on Vercel.
- **MUI + @emotion/styled** — the MUI theme object is the single token source; `styled()` gives full design control; MUI TextField saves time on Contact.
- **Framer Motion** — reveals, staggers, menu overlay, cursor badge.
- **Lenis** — smooth scrolling (fully disabled under `prefers-reduced-motion`).
- **EmailJS** (`@emailjs/browser`) — contact form without a server; compatible with static export.
- **Deploy:** Vercel, static export, `images: { unoptimized: true }` (assets pre-sized per `docs/assets.md`).
- **i18n:** all UI strings live in `src/content/i18n/en.js`, consumed via a `t()` helper with locale constant `'en'`. Adding FR later = add `fr.js` + flip a constant / add routing. **No switcher, no locale routing, no FR strings now — zero UI exposure.**
