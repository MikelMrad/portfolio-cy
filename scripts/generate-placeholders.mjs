// Idempotent placeholder generator (docs/assets.md).
// Writes an SVG placeholder for every declared image that has NO real
// (.jpg/.jpeg/.png/.webp) sibling. Safe to re-run: it skips real assets and
// only ever (over)writes .svg placeholders. Deterministic output.
//
// Requires "type": "module" in package.json so this .mjs can import the ESM
// content module below. Run via: `npm run placeholders`.
import { mkdir, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/content/projects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const COLORS = { bg: '#E7E5E1', line: 'rgba(17,17,17,0.15)', text: '#5A5A5A' };
const REAL_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

// Non-project slots (about + home), hardcoded per docs/assets.md.
const extraSlots = [
  { src: '/images/about/portrait.svg', width: 1200, height: 1500, label: 'About' },
  { src: '/images/about/preview.svg', width: 1600, height: 1200, label: 'About' },
  { src: '/images/home/belief.svg', width: 1600, height: 900, label: 'Home' },
];

function collectImages() {
  const items = [];
  for (const p of projects) {
    for (const im of [p.heroImage, ...p.renders, ...p.drawings]) {
      items.push({ src: im.src, width: im.width, height: im.height, label: p.title });
    }
  }
  for (const s of extraSlots) items.push(s);
  return items;
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// '/images/projects/slug/render-01.svg' -> 'render-01'
const tokenFromSrc = (src) => path.basename(src).replace(/\.[^.]+$/, '');

function svg(width, height, label, token) {
  const cx = width / 2;
  const line1 = Math.round(height / 2 - height * 0.03);
  const line2 = Math.round(height / 2 + height * 0.06);
  const size1 = Math.round(Math.min(width, height) * 0.05);
  const size2 = Math.round(Math.min(width, height) * 0.035);
  const font = 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)} placeholder — TODO ${esc(token)}">
  <rect width="${width}" height="${height}" fill="${COLORS.bg}"/>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="${COLORS.line}" stroke-width="1"/>
  <text x="${cx}" y="${line1}" fill="${COLORS.text}" font-family="${font}" font-size="${size1}" font-weight="600" text-anchor="middle" dominant-baseline="middle">${esc(label)}</text>
  <text x="${cx}" y="${line2}" fill="${COLORS.text}" font-family="${font}" font-size="${size2}" text-anchor="middle" dominant-baseline="middle">TODO: ${esc(token)}</text>
</svg>
`;
}

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  const items = collectImages();
  let written = 0;
  let skipped = 0;
  for (const im of items) {
    const abs = path.join(PUBLIC, im.src.replace(/^\//, ''));
    const baseNoExt = abs.replace(/\.[^.]+$/, '');
    let hasReal = false;
    for (const ext of REAL_EXTS) {
      if (await exists(baseNoExt + ext)) {
        hasReal = true;
        break;
      }
    }
    if (hasReal) {
      skipped++;
      continue; // real asset present — never overwrite it
    }
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, svg(im.width, im.height, im.label, tokenFromSrc(im.src)), 'utf8');
    written++;
  }
  console.log(`placeholders: wrote ${written} svg, skipped ${skipped} (real asset present). ${items.length} declared images total.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
