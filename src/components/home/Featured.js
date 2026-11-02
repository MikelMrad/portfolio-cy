'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import FeaturedProjectCard from '@/components/ui/FeaturedProjectCard';
import { featuredProjects } from '@/content/projects';
import { t } from '@/content/i18n';

const Head = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: '8px 24px',
  marginBottom: 'clamp(32px, 5vw, 56px)',
}));

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 20,
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr' },
  '& > .lead': { gridColumn: '1 / -1' },
}));

// Curated editorial set (content/projects.js `featuredProjects`): one lead tile,
// then a pair, on the grouped gray background.
export default function Featured() {
  const [lead, ...rest] = featuredProjects;
  return (
    <Section tone="alt">
      <Head>
        <Reveal>
          <SectionLabel>{t('home.selectedWork')}</SectionLabel>
          <Type token="display2" as="h2" sx={{ maxWidth: '18ch' }}>
            Every project begins with understanding.
          </Type>
        </Reveal>
        <TextLink href="/projects">{t('home.exploreAll')}</TextLink>
      </Head>
      <Grid>
        {lead ? (
          <Reveal className="lead">
            <FeaturedProjectCard project={lead} large />
          </Reveal>
        ) : null}
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.12}>
            <FeaturedProjectCard project={p} />
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}
