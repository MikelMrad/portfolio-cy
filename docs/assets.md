# Assets — placeholders, naming, swap-in

Rationale for this file: 8 projects × (1 hero + ≥5 renders + ≥2 drawings) ≈ 65+ images, all arriving later from Cynthia's archives/PDF exports — the pipeline must be deterministic or the build stalls.

## Naming convention (strict)
```
public/images/projects/{slug}/hero.{jpg|svg}
public/images/projects/{slug}/render-01.{jpg|svg} ... render-NN
public/images/projects/{slug}/drawing-01.{jpg|svg} ... drawing-NN
public/images/about/portrait.{jpg|svg}
public/images/about/preview.{jpg|svg}
public/images/home/belief.{jpg|svg}
```

## Placeholder generation
`scripts/generate-placeholders.mjs` (created in prompt 01) reads `src/content/projects.js` and writes an SVG for every image path that does not already exist as `.jpg`/`.png`:
- Hero/renders: 1920×1080. Drawings: 1600×1200. About/home slots: 1600×1200 / 1600×900.
- SVG: `imgLoading` (#E7E5E1) background, hairline border, centered two-line label — `{Project title}` / `TODO: render-03`. Text in system sans, `#5A5A5A`. Deterministic — safe to re-run (idempotent: skips existing real assets, overwrites only `.svg` placeholders).
- npm script: `"placeholders": "node scripts/generate-placeholders.mjs"`.

## Real asset specs (for export from archives / the PDF's source files)
| Slot | Format | Size | Quality |
|---|---|---|---|
| Hero / featured | JPG | 1920px wide min, 16:9 crop | q80, ≤ 450KB |
| Renders | JPG | 1600px wide min | q80, ≤ 350KB |
| Drawings (plans/sections/details) | PNG (linework) or JPG | 1600px wide min, 4:3 crop or padded | ≤ 500KB |
| Portrait | JPG | 1200×1500 (4:5) | q80 |
Export renders from Lumion originals where possible — **not** screenshots of the PDF (compression artifacts). Drawings: re-export from AutoCAD/Revit to PDF→PNG at 150dpi+, white background.

## Swap-in procedure
1. Drop the real file at the exact placeholder path with `.jpg`/`.png` extension.
2. Update that image's `src` extension + real `width`/`height` in `projects.js`; delete the `.svg`.
3. Write a real `alt` (discipline below). Re-run build; `ImageFigure` aspect-ratio prevents CLS regardless of file swap.

## Alt-text discipline
Describe subject + medium, no "image of": ✅ `Courtyard render of the Temporary Theatre's wooden modules at Beit Al Shams` · ✅ `Wall section detail at 1/20 showing parapet waterproofing build-up` · ❌ `render1`. Placeholders keep `TODO:` alts so they're greppable: `rg "alt: 'TODO" src/content`.
