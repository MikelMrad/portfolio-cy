# Design Direction — locked decisions & checklist

Screenshots of the Archevo reference are ground truth. Where this doc and screenshots conflict, **screenshots win**. Claude Code ticks each `- [ ]` when the decision is implemented and visually verified against the screenshots.

## Narrative
Calm, editorial, image-led minimalism. The site alternates **paper-light** content sections with **near-black** statement sections. Type does the branding: oversized grotesque display lines breaking across rows, one italic accent word in the hero, and tiny `// section-label` markers introducing every section. Color comes only from photography. Motion is quiet: soft fade-ups, gentle staggers, slow image scale on hover. Nothing bounces, nothing flashes.

Adaptation to an individual: voice is restrained and mostly neutral ("I design…" used sparingly). No team, no metrics, no partner logos — the work carries the page. A small tools strip (AutoCAD, Revit, SketchUp, Lumion, Photoshop) replaces the reference's client-logo marquee.

## Checklist

### Foundations
- [ ] Palette locked (paper `#F6F5F2`, ink `#111111`, ink-muted `#5A5A5A`, night `#0E0E0E`, night-muted `#8C8C8C`, hairlines at 14–16% opacity) — verify against screenshots, adjust ±1 step max.
- [ ] Type locked: `Inter Tight` (display, 600) + `Inter` (body, 400/500) via `next/font/google`, exposed as CSS vars `--font-display` / `--font-body`. Italic accent = display italic. `TODO:` optional later swap to a licensed Helvetica-class face — the swap must be a one-line change in `theme.js`.
- [ ] Type scale locked (fluid clamp scale; see ui-spec table).
- [ ] Spacing locked: 8px base; section vertical padding `clamp(64px, 10vw, 160px)`.
- [ ] Radius locked: **0** everywhere. Underline-only form fields.
- [ ] Grid/container locked: max-width 1440px, gutter `clamp(20px, 4vw, 56px)`; full-bleed media rows allowed to escape the container.
- [ ] Motion principles locked: durations 0.5–0.9s, ease `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 90ms, reveal offset 24px, image hover scale 1.05 @ 0.8s. Reduced motion: no transforms, no Lenis, opacity-only ≤ 0.2s.

### Signature motifs (all required)
- [ ] `// label` section markers before every section (lowercase-leaning, body size).
- [ ] Underlined text links with ↗ arrow (`View Projects ↗`, `Explore all projects ↗`).
- [ ] Year chip (small translucent box, top-left of project imagery).
- [ ] Circular "View Project" cursor badge on featured-card hover (pointer: fine only).
- [ ] Numbered rows `01–04` for Capabilities on night background — gray display text, hairline dividers.
- [ ] Giant footer wordmark `cynthia nahra.` on night background.

### Per-page direction
- [ ] **Home:** dark hero (image + scrim, `// cynthia nahra` label, display headline with italic accent, intro paragraph, `View Projects ↗`, "Latest Project" mini-card → Opera de Beyrouth) → light manifesto statement → about preview (text + image + `Learn more ↗`, **no counters**) → night Capabilities list (01–04) → light editorial line + `// featured projects` header row → 3 full-bleed FeaturedProjectCards (Opera, Municipality of Beirut, Temporary Theatre) → night belief statement over image → light Approach/values (4 columns, line icons) → ToolsStrip → contact CTA band → footer.
- [ ] **Projects:** light; short editorial intro; grid of all 8 ProjectCards (2-col md, 1-col xs). No filtering (out of scope — keep it quiet).
- [ ] **Project detail:** full-bleed hero (YearChip), meta row (year / academic context / location / tools / categories), narrative (concept text), "Renders & model" gallery (≥5), "Drawings & documentation" gallery, related-project link when `relatedSlug` exists, prev/next project nav.
- [ ] **About:** light hero headline (`// about`), portrait `TODO:portrait`, bio `TODO:bio`, education line (USJ — ESAR), capabilities recap, approach values, CTA to contact. (Reference's Team/Achievements sections are NOT reproduced.)
- [ ] **Contact:** split layout — night image panel (heading `Let's Discuss Your Project`-style, adapted: "Let's talk", email/phone/location list) + paper form card ("Get in touch!", underlined fields, black submit block).
- [ ] **404:** night, huge `404` in display type, one `TextLink` home.
- [ ] **/style-guide:** tokens, type ramp, every component in all states; `robots: noindex`.
