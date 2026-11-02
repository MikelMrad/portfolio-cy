'use client';
import { styled } from '@mui/material/styles';
import ProjectCard from '@/components/ui/ProjectCard';
import Reveal from '@/components/ui/Reveal';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  columnGap: 'clamp(20px, 3vw, 40px)',
  rowGap: 'clamp(40px, 5vw, 64px)',
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr' },
}));

export default function ProjectsGrid({ projects }) {
  return (
    <Grid>
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 2) * 0.12}>
          <ProjectCard project={p} priority={i < 2} />
        </Reveal>
      ))}
    </Grid>
  );
}
