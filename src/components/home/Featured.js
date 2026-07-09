'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import FeaturedProjectCard from '@/components/ui/FeaturedProjectCard';
import { projects } from '@/content/projects';
import { t } from '@/content/i18n';

const HeaderRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 24,
  marginTop: 'clamp(48px, 8vw, 96px)',
  paddingBottom: 20,
  borderBottom: `1px solid ${theme.custom.colors.lineLight}`,
}));

// Sticky-stacked featured cards (matches reference): each full-viewport card
// pins at the top while the next project slides up and stacks over it. A small
// per-card top offset (--i) lets the previous card peek; card height is trimmed
// by the total offset (--max) so no card's bottom content is clipped off-screen.
// Reduced motion falls back to a plain vertical stack (no pinning, no transform).
const STEP = 24;

// Contained (not full-bleed) so the cards sit inset with paper margins on the
// sides, matching the reference. Bottom padding keeps the stack off the next
// section.
const Stack = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.custom.colors.paper,
  maxWidth: theme.custom.layout.maxWidth,
  marginInline: 'auto',
  paddingInline: theme.custom.layout.gutter,
  paddingTop: 24,
  paddingBottom: 'clamp(64px, 10vw, 160px)',
}));

const Sticky = styled('div')(({ theme }) => {
  const h = theme.custom.layout.header; // { xs: 72, md: 88 } fixed-header height
  // Pin below the fixed header so the YearChip + card top aren't occluded, and
  // trim height by (header + total peek offset) so no card bottom is clipped.
  const rule = (hdr) => ({
    top: `calc(${hdr}px + var(--i) * ${STEP}px)`,
    height: `calc(100svh - ${hdr}px - var(--max) * ${STEP}px)`,
  });
  return {
    position: 'sticky',
    ...rule(h.xs),
    [theme.breakpoints.up('md')]: rule(h.md),
    '& > a': { height: '100%', minHeight: 0 },
    '@media (prefers-reduced-motion: reduce)': {
      position: 'static',
      height: 'auto',
      '& > a': { height: 'auto', minHeight: '60vh' },
      '&:not(:first-of-type)': { marginTop: 24 },
    },
  };
});

export default function Featured() {
  const max = projects.length - 1;
  return (
    <>
      <Section tone="paper">
        {/* TODO:featured-intro — draft */}
        <Reveal>
          <Type token="display2" as="p" style={{ maxWidth: '22ch' }}>
            Every project begins with understanding — observe before intervening, refine before adding.
          </Type>
        </Reveal>
        <HeaderRow>
          <SectionLabel style={{ marginBottom: 0 }}>all projects</SectionLabel>
          <TextLink href="/projects">{t('home.exploreAll')}</TextLink>
        </HeaderRow>
      </Section>
      <Stack>
        {projects.map((p, i) => (
          <Sticky key={p.slug} style={{ '--i': i, '--max': max }}>
            <FeaturedProjectCard project={p} />
          </Sticky>
        ))}
      </Stack>
    </>
  );
}
