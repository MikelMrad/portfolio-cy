import { projects } from '@/content/projects';
import { absoluteUrl, assetUrl } from '@/content/seo';

// Static export: pre-render at build time.
export const dynamic = 'force-static';

export default function sitemap() {
  const pages = [
    { path: '/', priority: 1 },
    { path: '/projects', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    { path: '/contact', priority: 0.6 },
  ].map(({ path, priority }) => ({ url: absoluteUrl(path), changeFrequency: 'monthly', priority }));

  const projectPages = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    changeFrequency: 'yearly',
    priority: 0.7,
    images: [assetUrl(p.heroImage.src)],
  }));

  return [...pages, ...projectPages];
}
