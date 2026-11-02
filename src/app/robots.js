import { site } from '@/content/site';

// Static export: pre-render at build time.
export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/style-guide/'] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
