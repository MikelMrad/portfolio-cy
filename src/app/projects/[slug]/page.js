import { notFound } from 'next/navigation';
import Section from '@/components/layout/Section';
import TextLink from '@/components/ui/TextLink';
import Reveal from '@/components/ui/Reveal';
import ScrollProgress from '@/components/motion/ScrollProgress';
import Type from '@/components/ui/Type';
import LocalNav from '@/components/projects/LocalNav';
import ProjectHero from '@/components/projects/ProjectHero';
import ProjectMeta from '@/components/projects/ProjectMeta';
import ProjectConcept from '@/components/projects/ProjectConcept';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectNav from '@/components/projects/ProjectNav';
import { projects, getProject, conceptImagesFor } from '@/content/projects';
import { site } from '@/content/site';
import { absoluteUrl, assetUrl, jsonLdScript } from '@/content/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // Next 16: params is a Promise
  const p = getProject(slug);
  if (!p) return { title: 'Project' };
  const path = `/projects/${p.slug}/`;
  const description = `${p.title}, ${p.location}. ${p.academicContext} (${p.year}) by ${site.name}, architect. ${p.summary}`;
  return {
    title: p.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title: `${p.title} — ${site.name}`,
      description,
      images: [{ url: p.heroImage.src, width: p.heroImage.width, height: p.heroImage.height, alt: p.heroImage.alt }],
    },
    twitter: { card: 'summary_large_image', images: [p.heroImage.src] },
  };
}

const sentence = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Anchor targets clear the floating nav.
const anchor = { scrollMarginTop: 76 };

const heading = { marginBottom: 'clamp(28px, 4vw, 48px)' };

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const related = project.relatedSlug ? getProject(project.relatedSlug) : null;
  const paragraphs = project.description.split('\n\n');
  // The chosen image(s) sit beside the concept prose; drop them from their gallery
  // so they aren't shown twice. Galleries only render when they have surviving
  // images, so a project with no sheets/renders/drawings shows no empty section.
  const conceptImages = conceptImagesFor(project);
  const conceptSrcs = new Set(conceptImages.map((im) => im.src));
  const withoutConcept = (list) => (list || []).filter((im) => !conceptSrcs.has(im.src));
  const sheets = withoutConcept(project.sheets);
  const renders = withoutConcept(project.renders);
  const drawings = withoutConcept(project.drawings);

  // Page sections in order; tones alternate so each reads as its own band.
  const sections = [
    {
      id: 'concept',
      nav: 'Concept',
      title: 'Concept',
      body: <ProjectConcept paragraphs={paragraphs} images={conceptImages} matchHeight={project.conceptMatchHeight} />,
    },
    sheets.length && {
      id: 'plans',
      nav: 'Plans',
      title: sentence(project.sheetsLabel || 'plans'),
      body: <ProjectGallery images={sheets} single={!project.sheetsColumns} columns={project.sheetsColumns || 0} />,
    },
    renders.length && {
      id: 'renders',
      nav: 'Renders',
      title: 'Renders & model',
      body: <ProjectGallery images={renders} firstFullWidth />,
    },
    drawings.length && {
      id: 'drawings',
      nav: 'Drawings',
      title: 'Drawings & documentation',
      // A lone drawing spans the page rather than sitting orphaned at half width;
      // `drawingsSingle` stacks every drawing full-width for projects that opt in.
      body: <ProjectGallery images={drawings} single={project.drawingsSingle} firstFullWidth={drawings.length === 1} />,
    },
    {
      id: 'details',
      nav: 'Details',
      title: 'Project details',
      body: (
        <ProjectMeta
          year={project.year}
          academicContext={project.academicContext}
          location={project.location}
          tools={project.tools}
          categories={project.categories}
        />
      ),
    },
  ].filter(Boolean);

  // schema.org CreativeWork: ties the project to its author for search engines.
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: [project.heroImage, ...project.renders].slice(0, 6).map((im) => assetUrl(im.src)),
    dateCreated: String(project.year),
    genre: 'Architecture',
    keywords: [...project.categories, ...project.tools].join(', '),
    locationCreated: { '@type': 'Place', name: project.location },
    creator: { '@type': 'Person', name: site.name, url: absoluteUrl('/') },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(projectJsonLd)} />
      <ScrollProgress />
      <LocalNav title={project.title} sections={sections.map((s) => ({ id: s.id, label: s.nav }))} />
      <ProjectHero project={project} />
      {sections.map((s, i) => (
        <Section key={s.id} id={s.id} tone={i % 2 ? 'paper' : 'alt'} style={anchor}>
          <Reveal>
            <Type token="display3" as="h2" sx={heading}>
              {s.title}
            </Type>
          </Reveal>
          {s.body}
        </Section>
      ))}
      <Section tone={sections.length % 2 ? 'paper' : 'alt'} tight>
        {related ? (
          <div style={{ marginBottom: 24 }}>
            <TextLink href={`/projects/${related.slug}/`}>Related: {related.title}</TextLink>
          </div>
        ) : null}
        <ProjectNav prev={prev} next={next} />
      </Section>
    </>
  );
}
