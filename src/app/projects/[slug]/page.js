import { notFound } from 'next/navigation';
import Section from '@/components/layout/Section';
import HeaderSpacer from '@/components/layout/HeaderSpacer';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import CategoryChip from '@/components/ui/CategoryChip';
import ProjectHero from '@/components/projects/ProjectHero';
import ProjectMeta from '@/components/projects/ProjectMeta';
import ProjectConcept from '@/components/projects/ProjectConcept';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectNav from '@/components/projects/ProjectNav';
import { projects, getProject, conceptImageFor } from '@/content/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // Next 16: params is a Promise
  const p = getProject(slug);
  if (!p) return { title: 'Project' };
  return { title: p.title, description: p.summary };
}

const block = { marginTop: 'clamp(48px, 8vw, 96px)' };

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const related = project.relatedSlug ? getProject(project.relatedSlug) : null;
  const paragraphs = project.description.split('\n\n');
  // The chosen image sits beside the concept prose; drop it from its gallery so
  // it isn't shown twice. Galleries only render when they have surviving images,
  // so a project with no sheets/renders/drawings shows no empty section.
  const conceptImage = conceptImageFor(project);
  const withoutConcept = (list) => (list || []).filter((im) => im.src !== conceptImage?.src);
  const sheets = withoutConcept(project.sheets);
  const renders = withoutConcept(project.renders);
  const drawings = withoutConcept(project.drawings);

  return (
    <>
      <HeaderSpacer />
      <ProjectHero image={project.heroImage} year={project.year} />
      <Section tone="paper">
        <SectionLabel>{project.number}</SectionLabel>
        <Type token="display3" as="h1">
          {project.title}
        </Type>
        <ProjectMeta
          year={project.year}
          academicContext={project.academicContext}
          location={project.location}
          tools={project.tools}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {project.categories.map((c) => (
            <CategoryChip key={c}>{c}</CategoryChip>
          ))}
        </div>

        <div style={block}>
          <ProjectConcept paragraphs={paragraphs} image={conceptImage} />
        </div>

        {sheets.length ? (
          <div style={block}>
            <ProjectGallery label="plans & axonometric" images={sheets} single />
          </div>
        ) : null}

        {renders.length ? (
          <div style={block}>
            <ProjectGallery label="renders & model" images={renders} firstFullWidth />
          </div>
        ) : null}

        {drawings.length ? (
          <div style={block}>
            <ProjectGallery label="drawings & documentation" images={drawings} />
          </div>
        ) : null}

        {related ? (
          <div style={block}>
            <TextLink href={`/projects/${related.slug}/`}>Related: {related.title}</TextLink>
          </div>
        ) : null}

        <ProjectNav prev={prev} next={next} />
      </Section>
    </>
  );
}
