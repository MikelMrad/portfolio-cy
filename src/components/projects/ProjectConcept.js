'use client';
import { styled } from '@mui/material/styles';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import ImageFigure from '@/components/ui/ImageFigure';
import Reveal from '@/components/ui/Reveal';

// Concept: prose on the left, a key render on the right (md+). On mobile the
// image stacks under the text. The image is sticky on desktop so it stays in
// view while the reader scrolls the paragraphs.
const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 32,
  alignItems: 'start',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.82fr)',
    gap: 'clamp(32px, 5vw, 72px)',
  },
}));

const Media = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    top: `calc(${theme.custom.layout.header.md}px + 24px)`,
  },
}));

export default function ProjectConcept({ paragraphs, image }) {
  return (
    <div>
      <SectionLabel>concept</SectionLabel>
      <Grid>
        <div>
          {paragraphs.map((para, i) => (
            <Type key={`concept-p${i}`} token="body" as="p" style={{ maxWidth: '60ch', marginBottom: 20 }}>
              {para}
            </Type>
          ))}
        </div>
        {image ? (
          <Media>
            <Reveal>
              <ImageFigure image={image} sizes="(min-width:900px) 40vw, 100vw" />
            </Reveal>
          </Media>
        ) : null}
      </Grid>
    </div>
  );
}
