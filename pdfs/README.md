# PDF drawing sheets → images

Drop project PDFs here, one folder per project (folder name = the project's
`slug` from `src/content/projects.js`):

```
pdfs/
  convention-center/
    drawings.pdf      # multi-page → drawings-01.webp, drawings-02.webp, …
    site-plan.pdf     # single page → site-plan.webp
```

Then run:

```bash
npm run pdf:extract
```

Each page is rasterized to a web-resolution `.webp` under
`public/images/projects/<slug>/`, exactly like the other project images. The
script prints ready-to-paste `im(...)` lines (with real pixel dimensions) to add
to that project's `renders` or `drawings` array in `src/content/projects.js`.

- Convert a single file: `npm run pdf:extract -- path/to/file.pdf <slug> [name]`
- Tune output: `PDF_MAX_PX=2000 PDF_WEBP_QUALITY=85 npm run pdf:extract`
- Requires `pdftocairo` + `cwebp`: `brew install poppler webp`

The PDFs in this folder are source assets, not shipped to the site — only the
generated `.webp` files under `public/` are.
