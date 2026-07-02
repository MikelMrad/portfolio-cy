'use client';
import { styled } from '@mui/material/styles';
import SectionLabel from '@/components/ui/SectionLabel';
import ImageFigure from '@/components/ui/ImageFigure';
import Reveal from '@/components/ui/Reveal';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr' },
}));

// Gallery grid; when firstFullWidth, the first figure spans both columns on md+.
export default function ProjectGallery({ label, images, firstFullWidth = false }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <Grid>
        {images.map((im, i) => {
          const full = firstFullWidth && i === 0;
          return (
            <Reveal key={im.src} delay={(i % 3) * 0.06} style={full ? { gridColumn: '1 / -1' } : undefined}>
              <ImageFigure image={im} sizes={full ? '100vw' : '(min-width:900px) 50vw, 100vw'} />
            </Reveal>
          );
        })}
      </Grid>
    </div>
  );
}
