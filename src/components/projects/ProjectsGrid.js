'use client';
import { styled } from '@mui/material/styles';
import ProjectCard from '@/components/ui/ProjectCard';
import Reveal from '@/components/ui/Reveal';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  columnGap: 'clamp(24px, 4vw, 56px)',
  rowGap: 64,
  marginTop: 'clamp(40px, 6vw, 72px)',
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr' },
}));

export default function ProjectsGrid({ projects }) {
  return (
    <Grid>
      {projects.map((p, i) =>
        // The first card is the above-the-fold LCP: render it un-gated (no framer
        // opacity:0) with an eager image so it paints at first paint, not after
        // hydration. Remaining cards fade up on scroll.
        i === 0 ? (
          <ProjectCard key={p.slug} project={p} priority />
        ) : (
          <Reveal key={p.slug} delay={(i % 2) * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        )
      )}
    </Grid>
  );
}
