# Prompt 01 — Scaffold & Architecture

You are Claude Code working in this repo. Read, in order: `CLAUDE.md`, `docs/project-brief.md`, `docs/design-direction.md`, `docs/ui-spec.md`, `docs/content-model.md`, `docs/assets.md`, `docs/progress.md`. Then execute the steps below **in order**. Scope of this prompt: project skeleton, tokens, content data, routing, base layout shells. **No visual polish, no section builds, no motion beyond stubs** — that is prompt 02. Every step is idempotent: if it already exists, verify/patch instead of recreating.

## Step 1 — Init
- If no Next app exists: `npx create-next-app@latest . --js --eslint --app --src-dir --no-tailwind --import-alias "@/*"` (JavaScript, App Router, src dir, **no Tailwind**).
- Install: `npm i @mui/material @emotion/react @emotion/styled @mui/material-nextjs @fontsource-shims 2>/dev/null || true` — actually install exactly: `@mui/material @emotion/react @emotion/styled @mui/material-nextjs framer-motion lenis @emailjs/browser`. No other deps.
- `next.config.mjs`:
  ```js
  const nextConfig = { output: 'export', images: { unoptimized: true }, trailingSlash: true };
  export default nextConfig;
  ```
- Add `.env.local.example` with `NEXT_PUBLIC_EMAILJS_SERVICE_ID=`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=` and note it in README. Do NOT create `.env.local`.

## Step 2 — Theme (single token source)
Create `src/theme/theme.js` implementing **every** token table in `docs/ui-spec.md §1` exactly: `theme.custom.colors`, `theme.custom.type` (each typography token as a style object with fontFamily var, weight, clamp size, lineHeight, letterSpacing), `theme.custom.motion` (`ease: 'cubic-bezier(0.22, 1, 0.36, 1)'`, durations, stagger 0.09, revealOffset 24), `theme.custom.layout` (maxWidth 1440, gutter clamp, sectionPad clamp). Map MUI palette per spec. Radius 0 (`shape.borderRadius: 0`), disable MUI shadows you'd otherwise inherit.
Fonts in `src/app/layout.js` via `next/font/google`: `Inter_Tight` (`--font-display`, weights 600 incl. italic) and `Inter` (`--font-body`, 400/500). Theme reads `var(--font-display)` / `var(--font-body)`.
Wrap the app: `AppRouterCacheProvider` (from `@mui/material-nextjs/v15-appRouter`; if the installed major differs, use the matching subpath) → `ThemeProvider` → `CssBaseline`. Set `<html lang="en">`, body bg `paper`.

## Step 3 — i18n
`src/content/i18n/en.js` — export a nested object with ALL chrome strings: `nav` (home/projects/about/contact/menu/close), `home` (viewProjects/latestProject/exploreAll/learnMore), `contact` (title/formTitle/fullName/email/message/send/sending/success/error/required/invalidEmail), `footer` (pagesTitle/socialTitle/rights/backHome), `notFound` (line/backHome), `a11y` (skipToContent/openMenu/closeMenu).
`src/content/i18n/index.js`:
```js
import en from './en';
const LOCALE = 'en'; // adding fr later: import map + this constant. No UI for it now.
const dicts = { en };
export const t = (path) => path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : path), dicts[LOCALE]);
```
Rule: any missing key renders its own path — greppable, never silent.

## Step 4 — Content data (copy VERBATIM, including TODOs)
Create `src/content/types.js` with the JSDoc typedefs from `docs/content-model.md`.

Create `src/content/site.js`:
```js
export const site = {
  name: 'Cynthia Nahra',
  wordmark: 'cynthia nahra.',
  role: 'Junior Architect',
  location: 'Beirut, Lebanon',
  email: 'cynthianohra11@gmail.com', // TODO:confirm-email-spelling (PDF shows "nohra")
  phone: '+961 81 726 981',
  education: 'USJ — ESAR', // TODO:confirm-school-label
  socials: [
    { label: 'LinkedIn', href: '#' },  // TODO:social-links
    { label: 'Instagram', href: '#' }, // TODO:social-links
  ],
  tools: ['AutoCAD', 'Revit', 'SketchUp', 'Lumion', 'Photoshop'], // TODO:tools-extra
};
```

Create `src/content/capabilities.js`:
```js
export const capabilities = [
  { index: '01', title: 'Architectural Design', blurb: 'Concept to developed design for residential, civic and cultural programs.' },
  { index: '02', title: 'Urban & Civic Space', blurb: 'Public buildings and open space rooted in context, accessibility and community.' },
  { index: '03', title: 'Modular & Adaptive Design', blurb: 'Unit-based systems — from corridor-free housing to demountable structures.' },
  { index: '04', title: 'Technical Documentation', blurb: 'Execution drawings, 1/20 wall sections and detail packages ready for site.' },
];
```

Create `src/content/projects.js` with this helper and ALL 8 entries (copy exactly — descriptions are cleaned from the owner's portfolio PDF and are ground-truth content):
```js
const img = (slug, name, w, h, alt) => ({ src: `/images/projects/${slug}/${name}.svg`, width: w, height: h, alt });
const renders = (slug, n) => Array.from({ length: n }, (_, i) => img(slug, `render-${String(i + 1).padStart(2, '0')}`, 1920, 1080, `TODO: render ${i + 1} — ${slug}`));
const drawings = (slug, n) => Array.from({ length: n }, (_, i) => img(slug, `drawing-${String(i + 1).padStart(2, '0')}`, 1600, 1200, `TODO: drawing ${i + 1} — ${slug}`));
```
Entries (fields per `docs/content-model.md`; each gets `heroImage: img(slug,'hero',1920,1080,'TODO: hero — '+title)`, `renders: renders(slug, 5)`, `drawings: drawings(slug, 3)` unless noted):

1. `student-dorms` · '01' · **Student Dorms** · 2022 /* TODO:confirm-years */ · '2nd Year Project' · 'Mansourieh, Lebanon' · ['SketchUp','Revit','Lumion'] · ['Residential','Education'] · summary: `Student housing terraced into a hillside, balancing collective life with private retreat.` · description: `Sited on a slope in Mansourieh, the residence is distributed across multiple levels that follow the natural terrain, each level carrying its own connected program — public dining, open green spaces, shared study rooms.\n\nIndividual rooms are oriented to draw natural light without compromising the intimacy and quiet needed for rest, holding a careful balance between openness and seclusion so students can relax, focus and feel at home.` · featured: false
2. `municipality-of-beirut` · '02' · **Municipality of Beirut** · 2023 · '3rd Year Project' · 'Sodeco, Beirut' · ['SketchUp','AutoCAD','Lumion'] · ['Civic','Urban'] · summary: `A closed civic block carved open into an interactive public space for Sodeco.` · description: (verbatim from `docs/content-model.md` filled example) · featured: true
3. `convention-center` · '03' · **Convention Center** · 2023 · '3rd Year Project' · 'Sodeco, Beirut' · ['AutoCAD','Revit','Lumion'] · ['Civic','Hospitality'] · summary: `A hybrid convention center and boutique hotel in dialogue with Beit Beirut.` · description: `Positioned between two contrasting streets near the historically significant Beit Barakat — Beit Beirut — the project answers each edge in kind: a boutique hotel sits along the quieter, residential Monot side as a retreat, while the convention center opens toward active Sodeco street for accessibility, visibility and public engagement.\n\nAt the heart of the project, a green communal space weaves the two programs together and holds a visual and spatial dialogue with Beit Beirut — a mediator between past and present, calm and activity, private and public.` · featured: false · relatedSlug: 'execution-drawings'
4. `affordable-housing` · '04' · **Affordable Housing** · 2024 · '4th Year Project' · 'Adlieh, Beirut' · ['AutoCAD','Revit','Lumion'] · ['Residential'] · summary: `Corridor-free modular housing for Adlieh's working population, built from a 4×4 m unit.` · description: `Starting from a modular 4×4 m room as the core building block, the plans are reconfigured to eliminate corridors entirely, giving each apartment an open, interconnected and more generous layout while minimizing construction cost. Three unit models — a two-bedroom, a one-bedroom studio and a duplex — stack with alternating balcony orientations and studied window placements to preserve domestic intimacy.\n\nThe ground floor carries the daily needs of residents: a supermarket, a pharmacy, a gym, a restaurant, a common lobby and shared green outdoor space.` · featured: false
5. `temporary-theatre` · '05' · **Temporary Theatre** · 2024 · '4th Year Project' · 'Beit Al Shams, Sharjah, UAE' · ['AutoCAD','Revit','Lumion'] · ['Cultural','Temporary'] · summary: `A demountable wood-and-fabric theatre, assembled and dismantled within three days.` · description: `Built from a 2×2 m modular unit in wood and fabric, the theatre is joined mechanically using traditional mortise-and-tenon connections — light to handle, fast to raise, and gentle on the heritage courtyard of Beit Al Shams that it inhabits.\n\nThe units rearrange into multiple spatial prototypes, letting performers adapt the space to each piece, while a pathway of base modules ties the new structure back to the original house, integrating the theatre visually and functionally within its context.` · featured: true
6. `municipality-of-nabatieh` · '06' · **Municipality of Nabatieh** · 2024 · '4th Year Project' · 'Nabatieh, Lebanon' · ['AutoCAD','Revit','Lumion','Photoshop'] · ['Civic','Urban'] · summary: `A post-war municipality re-anchored in the urban fabric, rebuilding trust between a city and its people.` · description: `After destruction severed the bond between a neighborhood and its institutions, this project treats architecture as a tool of rapprochement rather than simple reconstruction. The new municipality is blended into the life of the quarter — accessible, visible, human — no longer closed or isolated.\n\nPublic spaces are designed for exchange, transparency and inclusion, with housing woven around the civic core as the active climate of a new dialogue between the spatial and the social: a renewed sense of belonging.` · featured: false
7. `execution-drawings` · '07' · **Execution Drawings** · 2023 · '3rd Year Project' · 'Sodeco, Beirut' · ['AutoCAD'] · ['Technical'] · summary: `Execution package for the Sodeco Convention Center — stairs, wall sections and wet-area details at 1/20.` · description: `A full execution set developed from the Convention Center project: stair details, detailed wall sections from foundation to parapet, and toilet-block details drawn at 1/20 — with complete material call-outs covering waterproofing, thermal insulation, curtain-wall fixings and finish build-ups.` · featured: false · relatedSlug: 'convention-center' · renders: **renders(slug, 5) but these are drawing-type boards — keep ratio 1600×1200 via drawings() for BOTH arrays on this project** · drawings: drawings(slug, 4)
8. `opera-de-beyrouth` · '08' · **Opera de Beyrouth** · 2026 · 'Thesis Project' · 'Beirut, Lebanon' · ['TODO:opera-tools'] · ['Cultural','Civic'] · summary: `TODO:opera-summary — thesis project for an opera house in Beirut.` · description: `TODO:opera-description — confirm program and narrative with owner. Elements to verify before writing: Grand Auditorium (~836 seats), petit auditorium (~506 seats), site, concept.` · featured: true · latest: true

Export `projects`, plus helpers `getProject(slug)`, `featuredProjects` (order: opera, municipality-of-beirut, temporary-theatre), `latestProject`.

## Step 5 — Placeholder script
Create `scripts/generate-placeholders.mjs` per `docs/assets.md`: import `projects.js` (plus about/home slots hardcoded), for every `ProjectImage.src` write the SVG placeholder **only if** no `.jpg`/`.png`/`.webp` sibling exists at that basename. Add npm script `placeholders`. Run it; commit generated SVGs.

## Step 6 — Layout shells & routing skeleton (unstyled-but-structured)
- `src/components/layout/`: `Container`, `Section` (tone prop switching bg/text via theme), `Header` (client; wordmark link + Menu button; scrolled-bg logic stubbed), `MenuOverlay` (client; functional open/close + focus trap + Escape; minimal styling), `Footer` (structure per spec, minimal styling), `SmoothScroll` (client; instantiate Lenis with `lerp: 0.1`; skip entirely if `matchMedia('(prefers-reduced-motion: reduce)')`).
- `src/components/ui/`: `SectionLabel`, `TextLink`, `Reveal` (Framer stub honoring reduced motion), `ImageFigure` (aspect-ratio wrapper + next/image fill), `YearChip`, `CategoryChip` — minimal but real implementations reading theme tokens.
- Routes, each rendering real content plainly (no section design yet): `/` lists site name + links; `/projects` maps all 8 titles; `/projects/[slug]` with `generateStaticParams` from `projects.js`, renders title/meta/description + galleries as plain figures; `/about`, `/contact` (static shells), `/style-guide` (noindex metadata, renders palette + type ramp from theme), `not-found.js`.
- Skip-link + `<main id="main">` in layout. Metadata: title template `%s — Cynthia Nahra`, description from role+location.

## Step 7 — Verify & record
Run `npm run lint` and `npm run build` (static export must succeed, all 8 project pages emitted). Fix until clean.

## Acceptance criteria (all must be checkable true)
- [ ] `npm run build` produces a static export with routes: `/`, `/projects`, 8× `/projects/{slug}`, `/about`, `/contact`, `/style-guide`, 404.
- [ ] JavaScript only — zero `.ts/.tsx` files.
- [ ] `theme.js` contains every token from ui-spec §1; no component hardcodes a color/font/size.
- [ ] All 8 projects render their real title, year, academicContext, location, tools, categories, summary, description; TODO strings visible where specified.
- [ ] Placeholder SVGs exist for every declared image; script is idempotent.
- [ ] `t()` powers all chrome strings; grep finds no hardcoded nav/form/footer literals in components.
- [ ] Lenis active in dev, absent under emulated reduced motion.
- [ ] Menu overlay opens/closes with mouse, Enter, Escape; focus trapped and returned.
- [ ] Lint clean.

Then update `docs/progress.md`: tick every item under "Milestone 1", append any surfaced `TODO:` under Open TODOs, and stop. Do not begin prompt 02 work.
