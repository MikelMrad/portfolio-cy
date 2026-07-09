// Rasterize PDF pages → web-resolution .webp images (docs/assets.md).
//
// Architecture portfolios arrive as PDF drawing sheets. This turns each PDF page
// into a plain .webp that drops into the SAME slots as every other project image
// (public/images/projects/<slug>/<name>.webp), so the gallery renders them with
// zero viewer chrome, correct aspect ratio, and no runtime PDF dependency.
//
// Pipeline: pdftocairo (poppler) renders each page → PNG, then cwebp compresses
// → .webp. ImageMagick can't do the PDF step here (it needs ghostscript, absent),
// so poppler is required. Dimensions are measured off the output so the printed
// im() lines carry the real pixel size the gallery needs for its frames.
//
// USAGE
//   Folder mode (default):  npm run pdf:extract
//     Drop files as   pdfs/<project-slug>/<name>.pdf   then run. Every PDF under
//     pdfs/ is converted; the parent folder name is the project slug.
//   Single mode:            npm run pdf:extract -- <file.pdf> <slug> [name]
//
// A multi-page PDF named e.g. `drawings.pdf` → drawings-01.webp, drawings-02.webp…
// (matches the repo's render-01 / drawing-01 convention). A single-page PDF keeps
// its base name. The script PRINTS ready-to-paste im() lines — it does not edit
// projects.js, so you stay in control of order, alt text, and which list they join.
//
// Tunables (env):  PDF_MAX_PX (long-edge px, default 1600) · PDF_WEBP_QUALITY (default 82)
import { execSync, execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync, rmSync, mkdtempSync, existsSync, statSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/content/projects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'pdfs');
const OUT_ROOT = path.join(ROOT, 'public', 'images', 'projects');
const MAX_PX = Number(process.env.PDF_MAX_PX || 1600);
const QUALITY = Number(process.env.PDF_WEBP_QUALITY || 82);

const rel = (p) => path.relative(ROOT, p);
const titleBySlug = new Map(projects.map((p) => [p.slug, p.title]));

const has = (cmd) => {
  try {
    execSync(`command -v ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

// Measure a raster's real pixel size (magick if present, else macOS sips).
function dims(file) {
  if (has('magick')) {
    const out = execFileSync('magick', ['identify', '-format', '%w %h', file], { encoding: 'utf8' });
    const [w, h] = out.trim().split(/\s+/).map(Number);
    if (w && h) return { w, h };
  }
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], { encoding: 'utf8' });
  return {
    w: Number(/pixelWidth:\s*(\d+)/.exec(out)?.[1]),
    h: Number(/pixelHeight:\s*(\d+)/.exec(out)?.[1]),
  };
}

// One PDF → one .webp per page under public/images/projects/<slug>/.
function convert({ pdf, slug, baseName }) {
  const tmp = mkdtempSync(path.join(os.tmpdir(), 'pdfx-'));
  try {
    execFileSync('pdftocairo', ['-png', '-scale-to', String(MAX_PX), pdf, path.join(tmp, 'page')]);
    const pages = readdirSync(tmp)
      .filter((f) => f.endsWith('.png'))
      .map((f) => ({ f, n: Number((/-(\d+)\.png$/.exec(f) || [])[1] || 1) }))
      .sort((a, b) => a.n - b.n);

    const outDir = path.join(OUT_ROOT, slug);
    mkdirSync(outDir, { recursive: true });

    return pages.map((p, i) => {
      const name = pages.length > 1 ? `${baseName}-${String(i + 1).padStart(2, '0')}` : baseName;
      const outWebp = path.join(outDir, `${name}.webp`);
      execFileSync('cwebp', ['-quiet', '-q', String(QUALITY), path.join(tmp, p.f), '-o', outWebp]);
      const { w, h } = dims(outWebp);
      return { slug, name, w, h };
    });
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// Discover pdfs/<slug>/<name>.pdf jobs.
function scanFolder() {
  if (!existsSync(SRC_DIR)) {
    console.log(`No ${rel(SRC_DIR)}/ folder yet. Create pdfs/<project-slug>/<name>.pdf and re-run.`);
    return [];
  }
  const jobs = [];
  for (const slug of readdirSync(SRC_DIR)) {
    const slugDir = path.join(SRC_DIR, slug);
    if (!statSync(slugDir).isDirectory()) {
      if (slug.toLowerCase().endsWith('.pdf')) {
        console.warn(`skip ${slug} — nest PDFs one folder deep: pdfs/<project-slug>/${slug}`);
      }
      continue;
    }
    for (const f of readdirSync(slugDir)) {
      if (f.toLowerCase().endsWith('.pdf')) jobs.push({ pdf: path.join(slugDir, f), slug, baseName: f.replace(/\.pdf$/i, '') });
    }
  }
  return jobs;
}

function run() {
  for (const tool of ['pdftocairo', 'cwebp']) {
    if (!has(tool)) {
      console.error(`Missing "${tool}". Install with:  brew install poppler webp`);
      process.exit(1);
    }
  }

  const [, , argPdf, argSlug, argName] = process.argv;
  let jobs;
  if (argPdf) {
    if (!argSlug) {
      console.error('Single mode needs a slug:  npm run pdf:extract -- <file.pdf> <slug> [name]');
      process.exit(1);
    }
    const pdf = path.resolve(argPdf);
    jobs = [{ pdf, slug: argSlug, baseName: argName || path.basename(pdf).replace(/\.pdf$/i, '') }];
  } else {
    jobs = scanFolder();
  }
  if (!jobs.length) return;

  const all = [];
  for (const job of jobs) {
    if (!titleBySlug.has(job.slug)) {
      console.warn(`note: "${job.slug}" isn't a known project slug — files will still be written to that folder.`);
    }
    const made = convert(job);
    all.push(...made);
    console.log(`✓ ${rel(job.pdf)} → ${made.length} page(s) in ${rel(path.join(OUT_ROOT, job.slug))}/`);
  }

  // Paste-ready im() lines, grouped by slug, for src/content/projects.js.
  const bySlug = all.reduce((m, e) => ((m[e.slug] ||= []).push(e), m), {});
  console.log('\nAdd these to the project(s) in src/content/projects.js (edit the alt text):\n');
  for (const [slug, entries] of Object.entries(bySlug)) {
    const title = titleBySlug.get(slug) || slug;
    console.log(`  // ${slug}`);
    for (const e of entries) {
      console.log(`  im('${slug}', '${e.name}', ${e.w}, ${e.h}, '${title} — ${e.name.replace(/-/g, ' ')}'),`);
    }
    console.log('');
  }
  console.log('Tip: set `conceptImage: \'<name>\'` on a project to show any of these beside its concept text.');
}

run();
