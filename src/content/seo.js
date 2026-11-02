import { site } from './site';

// Shared SEO copy + helpers. Descriptions use the words people actually search
// for (name, "architect", city, school) in plain sentences, not keyword lists.
export const seo = {
  title: `${site.name} — Architect in ${site.location}`,
  description: `${site.name} is a junior architect based in ${site.location}. Architecture portfolio of civic, cultural and residential projects, from concept to construction drawings. Graduate of ${site.education}.`,
  keywords: [
    site.name,
    'Cynthia Nahra architect',
    'architect Beirut',
    'architect Lebanon',
    'junior architect',
    'architecture portfolio',
    'USJ architecture',
    'ESAR',
    'Revit',
    'AutoCAD',
  ],
};

// Absolute URL for a page path, matching next.config `trailingSlash: true`.
export const absoluteUrl = (path = '/') => new URL(path.endsWith('/') ? path : `${path}/`, site.url).href;

// Absolute URL for a file (image, PDF), no trailing slash.
export const assetUrl = (path) => new URL(path, site.url).href;

// schema.org Person, rendered as JSON-LD on every page so search engines know
// who the site is about.
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: absoluteUrl('/'),
  image: assetUrl('/og.jpg'),
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Beirut', addressCountry: 'LB' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: site.education },
  knowsAbout: ['Architecture', 'Architectural design', 'Technical drawings', ...site.tools],
  sameAs: site.socials.filter((s) => s.href).map((s) => s.href),
};

// Embed JSON-LD safely (escape "<" so content can't close the script tag).
export const jsonLdScript = (data) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });
