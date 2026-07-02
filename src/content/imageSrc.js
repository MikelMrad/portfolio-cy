import manifest from './image-manifest.js';

// Resolve an image BASE path (no extension) to the real file present on disk,
// decided at build time by scripts/resolve-images.mjs (webp/jpg/png photo wins
// over the .svg placeholder). Falls back to .svg when a slot has no asset yet.
// This is why every image slot on the site accepts svg OR webp interchangeably.
//
//   imageSrc('/images/home/hero')  ->  '/images/home/hero.webp'  (real photo present)
//   imageSrc('/images/about/portrait') -> '/images/about/portrait.svg' (placeholder)
export function imageSrc(base) {
  const key = base.startsWith('/') ? base : `/${base}`;
  const ext = manifest[key] ?? 'svg';
  return `${key}.${ext}`;
}
