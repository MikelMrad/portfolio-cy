'use client';
import { styled } from '@mui/material/styles';
import ImageFigure from '@/components/ui/ImageFigure';
import Reveal from '@/components/ui/Reveal';

const Grid = styled('div', { shouldForwardProp: (p) => p !== 'single' && p !== 'columns' })(
  ({ theme, single, columns }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 20,
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : single ? '1fr' : '1fr 1fr',
    },
  }),
);

// Gallery grid. `single` stacks every figure full-width in one column (best for
// detailed sheets like floor plans); `columns` lays them out N-across on md+;
// otherwise two columns on md+, and `firstFullWidth` lets the first figure span both.
export default function ProjectGallery({ images, firstFullWidth = false, single = false, columns = 0 }) {
  const colSizes = columns ? `(min-width:900px) ${Math.round(100 / columns)}vw, 100vw` : '(min-width:900px) 50vw, 100vw';
  return (
    <Grid single={single} columns={columns}>
      {images.map((im, i) => {
        const full = !columns && (single || (firstFullWidth && i === 0));
        return (
          <Reveal key={im.src} delay={full ? 0 : (i % 2) * 0.1} y={56} scale={0.96} style={full ? { gridColumn: '1 / -1' } : undefined}>
            <ImageFigure image={im} sizes={full ? '(min-width: 1200px) 1120px, 100vw' : colSizes} />
          </Reveal>
        );
      })}
    </Grid>
  );
}
