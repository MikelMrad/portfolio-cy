# Prompt 02 — UI Build

Prerequisite: prompt 01 complete (`docs/progress.md` Milestone 1 fully ticked; `npm run build` clean). Read, in order: `CLAUDE.md`, `docs/ui-spec.md` (primary contract), `docs/design-direction.md`, reference screenshots, `docs/content-model.md`. Build the site to match the spec and screenshots, **section by section, in the sequence below**. After each numbered task: run lint+build, do a keyboard + reduced-motion check, tick the matching boxes in `docs/progress.md`. Idempotent: refine existing components, never fork duplicates.

## Task 1 — Global chrome
Header per spec (transparent-over-hero → night after scrollY>40 on Home; solid night elsewhere), MenuOverlay full design + stagger motion, Footer full design (closing line, link columns, giant wordmark, meta row), skip-link styled, focus-visible styles global.
- [ ] Header states (top/scrolled/open) match spec; 44px targets
- [ ] Overlay motion 0.5s, links stagger 90ms, Escape/trap/return-focus intact
- [ ] Footer wordmark scales `clamp(4rem,16vw,15rem)` without horizontal scroll at 320px

## Task 2 — Home hero
Full-viewport night hero: bg = Opera hero image + scrim, `// cynthia nahra`, `display1` headline with one italic word (`TODO:hero-headline` copy from ui-spec draft), intro paragraph (`TODO:hero-intro` draft), `View Projects ↗`, LatestProjectCard bottom-right (md+; below content on xs). Staggered mount animation.
- [ ] Zero CLS (image sized, priority); headline breaks across 2 lines at lg like reference
- [ ] Latest card links to `/projects/opera-de-beyrouth/`

## Task 3 — Home: manifesto + about preview
Statement section (paper, `display2`, draft copy w/ TODO) and 2-col about preview (`// about`, paragraph, `Learn more ↗`, image 4:3).
- [ ] Reveal on scroll; reduced-motion static
- [ ] Line length of statement ≈ 3 lines at 1440 like reference

## Task 4 — Home: capabilities (night)
`// capabilities` + 4 CapabilityRows from content: numbered gray display rows, hairlines, hover→snow.
- [ ] `ul/li` semantics; contrast of `nightMuted` on `night` ≥ 4.5:1

## Task 5 — Home: featured projects
Editorial intro (`display2`, TODO draft), `// featured projects` + `Explore all projects ↗` header row with hairline, then 3 FeaturedProjectCards (opera, municipality-of-beirut, temporary-theatre) with YearChip, overlay text stack, chips, hover scale + CursorBadge (spring follow), keyboard fallback.
- [ ] Badge only on `pointer: fine`; `aria-hidden`; card = single link with visible focus style
- [ ] Cards full-bleed, min-height 70vh md+ / 60vh xs

## Task 6 — Home: belief + approach + tools + CTA
Night belief statement over `home/belief` image + scrim (`display2`, TODO draft). Approach section: `// approach`, lead line, 4 ValueCards with the four inline-SVG line icons (waves/starburst/concentric/rings — draw them, 56px, stroke 1.5). ToolsStrip (static, hairlines). Contact CTA band (night): "Let's talk." + `Get in touch ↗`.
- [ ] Icons are inline SVG with `aria-hidden`; 4→1 column collapse at md→xs
- [ ] ToolsStrip renders the 5 confirmed tools, no marquee

## Task 7 — Projects page
`// projects` + intro line, hairline, grid (2-col md / 1-col xs, 64px row gap) of all 8 ProjectCards ordered 01→08, staggered reveal.
- [ ] Hover: image 1.04 scale + title underline; whole card focusable link

## Task 8 — Project detail
Full-bleed hero + YearChip; title + meta row (year / academicContext / location / tools joined ' · ' / chips); `// concept` + description paragraphs (split on `\n\n`); `// renders & model` gallery (first image full-width, rest 2-col); `// drawings & documentation` gallery; related link when `relatedSlug`; ProjectNav prev/next with wraparound.
- [ ] All 8 pages visually consistent; `execution-drawings` galleries use 4:3 ratio boards
- [ ] Related links: 03 ↔ 07 both directions; opera page renders its TODO copy visibly

## Task 9 — About page
Hero (`// about` + `display3` headline TODO), portrait figure (`TODO:portrait` placeholder), bio block (`TODO:bio` visible), education (`USJ — ESAR` + TODO note) + location, capabilities recap (light numbered list), CTA band → contact.
- [ ] No Team/awards/counters anywhere

## Task 10 — Contact page + EmailJS
Split layout per spec. Wire `@emailjs/browser`: `emailjs.send(serviceId, templateId, { from_name, reply_to, message }, { publicKey })` from env; client-side validation (required, email format) before send; full state machine (idle/submitting/success/error). Missing env → disabled form + visible TODO notice.
- [ ] Labels + `aria-describedby` errors; error not color-only; success replaces button area
- [ ] mailto/tel links on the panel work

## Task 11 — 404 + style-guide
404 per spec. `/style-guide`: palette swatches with hex, full type ramp, spacing scale, and every component in default/hover/focus/disabled/error states; noindex.
- [ ] Style-guide reflects theme.js live (imports tokens, no copied values)

## Task 12 — Motion & polish pass
Audit against ui-spec §5: consistent ease/durations, stagger only where specified, Lenis `lerp 0.1`, header transition, no scroll-jank (test CPU 4× throttle). Reduced-motion audit across every animated component.
- [ ] `prefers-reduced-motion` leaves zero transform animations and no Lenis

## Task 13 — Accessibility & performance pass
Keyboard-only full-site walkthrough; heading outline valid; axe (or manual WCAG AA checklist from ui-spec §7) zero criticals. Lighthouse on `/`, `/projects`, one detail page: Performance ≥ 95, A11y ≥ 95 (throttled mobile). Fix images `sizes`, font loading (`display: swap` via next/font default), and any CLS to 0.
- [ ] Record the three Lighthouse scores in `docs/progress.md`

## Final gate
- [ ] Every checkbox in `docs/progress.md` Milestone 2 ticked or converted to an explicit Open TODO with reason
- [ ] `npm run build` clean; export deployable to Vercel as-is
- [ ] Grep report appended to progress.md: `rg -n "TODO:" src docs | wc -l` + list — this is the owner's swap-in worklist
