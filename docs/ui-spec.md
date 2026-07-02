# UI Spec — buildable reference

Read with the reference screenshots side-by-side. All values below are the implementation contract. Tokens live in `src/theme/theme.js` and nowhere else.

## 1. Design tokens

### Color
| Token | Value | Usage |
|---|---|---|
| `paper` | `#F6F5F2` | light section bg, page default |
| `ink` | `#111111` | headings/body on paper |
| `inkMuted` | `#5A5A5A` | secondary text on paper |
| `night` | `#0E0E0E` | dark sections, header (scrolled), footer |
| `snow` | `#FFFFFF` | headings on night |
| `nightMuted` | `#8C8C8C` | secondary/gray display text on night |
| `lineLight` | `rgba(17,17,17,0.15)` | hairlines on paper |
| `lineDark` | `rgba(255,255,255,0.16)` | hairlines on night |
| `chipDark` | `rgba(255,255,255,0.14)` | year chip bg over imagery (+ blur) |
| `scrim` | `rgba(10,10,10,0.55)` | overlay on hero/card imagery |
| `imgLoading` | `#E7E5E1` | image placeholder bg |

MUI mapping: `palette.background.default = paper`, `palette.text.primary = ink`, `palette.text.secondary = inkMuted`. Expose the full set at `theme.custom.colors` so every `styled()` component reads one source.

### Typography (Inter Tight = display, Inter = body; fluid clamps)
| Token | Font | Weight | Size | LH | Tracking | Use |
|---|---|---|---|---|---|---|
| `display1` | Inter Tight | 600 | `clamp(3rem, 8.5vw, 7.5rem)` | 1.02 | -0.02em | Home hero headline |
| `display2` | Inter Tight | 600 | `clamp(2.25rem, 5.5vw, 4.5rem)` | 1.08 | -0.015em | Manifesto/statement blocks, footer closing line |
| `display3` | Inter Tight | 600 | `clamp(1.75rem, 3.5vw, 3rem)` | 1.12 | -0.01em | Page heros (About/Contact/Projects), featured-card titles, menu links |
| `capability` | Inter Tight | 600 | `clamp(2rem, 4.5vw, 4rem)` | 1.1 | -0.01em | Numbered capability rows (nightMuted) |
| `hSmall` | Inter | 500 | `1.25rem` | 1.35 | 0 | Grid-card titles, value titles, form heading |
| `body` | Inter | 400 | `1.0625rem` | 1.65 | 0 | Paragraphs |
| `label` | Inter | 400 | `0.9375rem` | 1.4 | 0 | `// labels`, meta, chips, nav, captions |
| `wordmarkGiant` | Inter Tight | 600 | `clamp(4rem, 16vw, 15rem)` | 0.9 | -0.03em | Footer wordmark |

Italic accent: exactly one word of `display1` wrapped in `<em>` (same weight, italic). Hero draft copy: `Architecture in <em>Context</em>` — `TODO:hero-headline` confirm wording.

### Spacing / radius / elevation / breakpoints
- Base 8px. Section `padding-block: clamp(64px, 10vw, 160px)`. Heading→body gap inside a section: 32–48px.
- Radius 0 everywhere. Shadows: none — depth via scrims + hairlines only.
- MUI default breakpoints (600/900/1200/1536). Mobile-first; key reflows at `md`.

## 2. Layout primitives
- `Section({ tone: 'paper' | 'night', children })` — full-width bg + text color context, wraps a Container.
- `Container` — max-width 1440px, `padding-inline: clamp(20px, 4vw, 56px)`, margin auto.
- `SectionLabel({ children })` — renders `// {children}`, `label` type, muted per tone, margin-bottom 24–40px.
- Full-bleed rows (featured cards, project hero) escape the container to 100vw.
- `Reveal` — Framer Motion wrapper: fade-up 24px, 0.7s, ease token, `whileInView` once, `viewport={{ margin: '-10% 0px' }}`; accepts `delay`. Under reduced motion renders children statically (opacity-only, 0.2s max).

## 3. Component inventory (props / states)

### Header
Fixed, height 88px desktop / 72px mobile, z-index above Lenis content. **Transparent over the Home hero (snow text); after `scrollY > 40` gains `night` bg** (0.3s bg transition). On light pages (Projects/About) it starts `night` solid — one consistent dark bar, matching reference. Left: wordmark `cynthia nahra.` (Inter Tight 600, 22px, lowercase, trailing period) → links home. Right: `Menu` label + 2-line hamburger (24×12, 2px lines), one button, ≥44px hit area. States: hover — lines converge 2px; focus-visible — 2px `snow` outline, offset 4px; open — label `Close`, lines rotate to ×.

### MenuOverlay
Full-screen `night`, Framer `AnimatePresence`: fade + clip-path reveal 0.5s. Column of page links (Home / Projects / About / Contact) in `display3` snow, staggered 90ms fade-up; hairline; then email + location in `label nightMuted`. Link hover: translateX 8px + `nightMuted → snow`. Escape closes; focus trapped; body scroll locked (pause Lenis); `aria-expanded` + `aria-controls` wired; focus returns to trigger on close.

### TextLink `({ href, children, arrow = true, tone })`
Underline 1px, offset 6px; ↗ at 0.9em. Hover: underline 2px, arrow translates 2px up-right, 0.25s. Focus-visible: 2px outline offset 4px, color per tone.

### YearChip `({ year })`
`label` snow on `chipDark`, padding 6px 12px, `backdrop-filter: blur(4px)`, absolute 24px top-left of media.

### CategoryChip `({ children, onImage })`
Padding 8px 14px, `label`. On paper: paper bg + hairline border + ink text. On imagery: solid snow bg, ink text.

### FeaturedProjectCard `({ project })` — Home
Full-bleed, min-height 70vh desktop / 60vh mobile, image cover under `scrim`. YearChip top-left. Bottom-left stack: title `display3` snow → one-line summary `body` snow/90 → CategoryChips. Whole card = one `<Link>`. Hover (pointer: fine): image scale 1.05 @0.8s + **CursorBadge** — 176px circle, `rgba(120,120,120,0.55)` + blur(6px), snow `View Project` label, follows cursor via `useMotionValue` + spring (stiffness 150, damping 20); `aria-hidden`. Keyboard focus-visible: 2px inset outline, badge shown centered. Touch: no badge, card is a plain link.

### ProjectCard `({ project })` — grid
Column: media 3:2 (YearChip) → title `hSmall` ink → one-line summary `inkMuted` → chips. Hover: image scale 1.04; title underlines. Entire card one link, focus-visible outline on wrapper.

### CapabilityRow `({ index, title, blurb })`
Night rows: `0{index}` label (nightMuted, top-aligned) + title `capability` nightMuted; optional one-line blurb `body nightMuted` under title; hairline `lineDark` between rows; padding-block 48–64px. Hover/focus-within: title → `snow` 0.3s. Plain list semantics (`ul/li`) — rows are not links.

### ValueCard `({ icon, title, blurb })`
Light, 4-up grid `md` / 1-up xs. Inline-SVG line icon 56px (stroke 1.5, ink) — recreate the reference's four abstract motifs: waves, starburst, concentric circles, overlapping rings. Title `hSmall`, blurb `body inkMuted`.

### ToolsStrip
One hairline-bounded row, centered gray wordmarks in `label`+ size, static (no marquee). Content: AutoCAD · Revit · SketchUp · Lumion · Photoshop (`TODO:tools-extra` — add Rhino/Adobe if confirmed).

### ContactForm
Fields: Full Name, Email, Message (multiline, 4 rows). MUI `TextField variant="standard"`: underline `lineLight` → 2px `ink` on focus; floating label in `label` type. Submit: full-width black block, snow `Send Message ↗`; hover inverts (paper bg, ink text, hairline border). States: MUI error + helperText per field; submitting → disabled + `Sending…`; success → inline confirmation line replaces button; failure → inline error + retry. Sends via EmailJS (`service`, `template`, `publicKey` from `NEXT_PUBLIC_EMAILJS_*` env). If env vars missing: fields disabled + visible `TODO: configure EmailJS env` notice (never a silent failure).

### Footer
Night. Top: closing line `display2` snow — draft `Designing with context.` `TODO:footer-line`. Right: two link columns — Pages (Home/Projects/About/Contact) · Social (`TODO:social-links`, render only confirmed ones). Bottom: giant wordmark `cynthia nahra.` in `wordmarkGiant` — **fit-to-width**: the wrap is a query container and the wordmark uses `font-size: min(16cqw, 15rem)` so the fixed 14-char string fills the container edge-to-edge and never clips/overflows at any width (a plain `16vw` clamp overflowed the container for this string). Then hairline, then `© {year} Cynthia Nahra` + `Junior Architect — Beirut` in `label nightMuted`.

### ImageFigure `({ image, caption, priority })`
Wrapper enforcing CSS `aspect-ratio` from image data (zero CLS), bg `imgLoading`, `next/image` fill + `object-fit: cover`, `sizes` set per context. Optional caption `label inkMuted` below. All images require non-empty `alt` (see assets.md discipline).

### ProjectGallery `({ title, images })`
`SectionLabel` (`// renders & model`, `// drawings & documentation`) + responsive grid: renders 2-col md (first image full-width), drawings 2-col md; 1-col xs. Staggered `Reveal` per figure.

### ProjectNav `({ prev, next })`
Hairline-topped row: left `← {prev.title}`, right `{next.title} →` as TextLinks (no arrow glyph reuse — literal arrows here). Wraps around (last → first).

## 4. Page assembly specs

### Home (`/`)
1. **Hero** (night, 100svh min 640px): bg image `home/hero.webp` (dedicated home hero raster — use WebP, not a traced SVG, to preserve photographic texture) under scrim; `// cynthia nahra`; `display1` headline w/ italic accent; intro `body` snow/90 max-width 62ch — draft: "Junior architect based in Beirut, designing civic, cultural and residential spaces rooted in their context." `TODO:hero-intro`; `View Projects ↗`. Bottom-right (md+): **LatestProjectCard** — small paper-on-scrim card: thumb 96px, `Latest Project ↗` label, `Opera de Beyrouth · 2026`, links to detail.
2. **Manifesto** (paper): `display2`, ink, max-width 24ch-per-line feel — draft: "I design with intention. Every space is a dialogue between light, form, and time." `TODO:manifesto`.
3. **About preview** (paper, 2-col md): left — `// about`, short paragraph (from bio TODO), `Learn more ↗` → /about; right — image `about/preview` 4:3.
4. **Capabilities** (night): `// capabilities`; 4 CapabilityRows from content.
5. **Featured intro** (paper): `display2` editorial line — draft: "Every project begins with understanding — observe before intervening, refine before adding." `TODO:featured-intro`; then header row `// featured projects` + `Explore all projects ↗` (right-aligned), hairline.
6. **Featured cards**: 3 FeaturedProjectCards (order: Opera de Beyrouth, Municipality of Beirut, Temporary Theatre) as a **sticky stack** (matches reference), **contained** (not full-bleed) — the stack sits inside the max-width 1440 container with the standard gutter, so cards are inset with paper margins on the sides. Each card `position: sticky` pinned just below the header, near-full-viewport height; as you scroll, each project slides up and stacks over the pinned previous one, with a small per-card top offset (24px) so the previous card's top (YearChip) peeks. CSS-only (no JS/scroll-listener). The stack has bottom padding (`clamp(64px,10vw,160px)`) so it doesn't butt against the Belief section. Under `prefers-reduced-motion: reduce` it degrades to a plain vertical stack with 24px gaps (no pinning).
7. **Belief statement** (night, full-bleed image + scrim): centered `display2` snow — draft: "Architecture is the art of what remains — the space between materials, the quiet that allows a place to breathe." `TODO:belief-line`.
8. **Approach** (paper): `// approach`; lead `display3`; 4 ValueCards — Human-Centered Design / Context & Continuity / Modular Thinking / Precision & Craft, blurbs from content file.
9. **ToolsStrip**.
10. **Contact CTA** (night): `// contact`; `display2` "Let's talk." + `Get in touch ↗` → /contact.
11. **Footer**.

### Projects (`/projects`)
`// projects` + `display3` intro line; hairline; grid of all 8 ProjectCards ordered 01→08.

### Project detail (`/projects/[slug]`)
1. Full-bleed hero (60–75vh) `heroImage`, YearChip. 2. Title `display3` + meta list (`label`): Year / {academicContext} / {location} / Tools / chips. 3. `// concept` + `description` in `body`, max-width 70ch. 4. ProjectGallery renders. 5. ProjectGallery drawings. 6. If `relatedSlug`: `TextLink` "Related: {title} ↗". 7. ProjectNav. `generateStaticParams` from data.

### About (`/about`)
`// about` + `display3` headline — draft: "Crafting spaces that respond to people and place." `TODO:about-headline`; portrait `about/portrait` (`TODO:portrait`) beside bio; education + location lines; capabilities recap (light variant, simple numbered list); values row reuse; CTA band → contact.

### Contact (`/contact`)
Split `md`: left night panel with bg image + scrim — `display3` "Let's talk", then Contact list (email, phone, `Beirut, Lebanon`) as TextLinks (mailto/tel); right paper card — `hSmall` "Get in touch!", ContactForm.

### 404
Night, centered: `display1` "404", `body nightMuted` line, TextLink "Back home ↗".

### /style-guide
Paper; sections: palette swatches, type ramp (every token), spacing demo, each component rendered in default/hover/focus/disabled/error states. `export const metadata = { robots: { index: false, follow: false } }`.

## 5. Motion spec
| Element | Trigger | Effect | Duration/Ease |
|---|---|---|---|
| Section content | in-view (once) | fade-up 24px, stagger 90ms | 0.7s / `cubic-bezier(0.22,1,0.36,1)` |
| Hero content | mount | staggered fade-up | 0.9s, delay 0.15s steps |
| Card image | hover | scale 1 → 1.05 | 0.8s |
| CursorBadge | hover move | spring-follow | stiffness 150 / damping 20 |
| Menu overlay | toggle | fade + clip, links stagger | 0.5s |
| Featured cards | scroll | sticky-stack: each pins below header, next slides up & stacks over it (24px peek) | CSS `position: sticky`, scroll-linked |
| Header bg | scroll > 40px | transparent → night | 0.3s |
| Lenis | global | `lerp: 0.1` | disabled on reduced motion |

`prefers-reduced-motion: reduce` → Reveal renders static, hover scales off, Lenis not instantiated, overlay uses 0.2s opacity fade, featured cards fall back to a plain vertical stack (no sticky pinning).

## 6. Image rules
Aspect ratios: hero 16:9 (min-height rules above), featured 16:9, grid-card + about 3:2 or 4:3 (fixed per slot), drawings 4:3. Every image declares width/height/alt in data. `priority` only on the first hero image per page. `sizes`: full-bleed `100vw`; 2-col `(min-width:900px) 50vw, 100vw`. Zero-CLS enforced by `ImageFigure` aspect-ratio. Placeholder + swap pipeline: `docs/assets.md`.

## 7. Accessibility contract
Semantic landmarks (`header/nav/main/footer`), one `h1` per page, headings never skip levels. Skip-link to `#main` as first focusable. Focus-visible on every interactive element (2px outline offset 4px, tone-aware). Contrast: `inkMuted` on paper 7.0:1 ✓; `nightMuted` on night ≥ 4.6:1 ✓ — never lighten below AA. Menu overlay: focus trap + Escape + return focus. Forms: labels, `aria-describedby` errors, error text not color-only. All motion honors reduced-motion. Touch targets ≥ 44px.
