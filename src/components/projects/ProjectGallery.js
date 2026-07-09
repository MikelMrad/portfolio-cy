'use client';
import { styled } from '@mui/material/styles';
import SectionLabel from '@/components/ui/SectionLabel';
import ImageFigure from '@/components/ui/ImageFigure';
import Reveal from '@/components/ui/Reveal';

const Grid = styled('div', { shouldForwardProp: (p) => p !== 'single' })(({ theme, single }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,
  [theme.breakpoints.up('md')]: { gridTemplateColumns: single ? '1fr' : '1fr 1fr' },
}));

// Gallery grid. `single` stacks every figure full-width in one column (best for
// detailed sheets like floor plans); otherwise two columns on md+, and
// `firstFullWidth` lets the first figure span both.
export default function ProjectGallery({ label, images, firstFullWidth = false, single = false }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <Grid single={single}>
        {images.map((im, i) => {
          const full = single || (firstFullWidth && i === 0);
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
