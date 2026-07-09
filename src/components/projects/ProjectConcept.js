'use client';
import { styled } from '@mui/material/styles';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import ImageFigure from '@/components/ui/ImageFigure';
import Reveal from '@/components/ui/Reveal';

// Concept: prose on the left, a key render on the right (md+). On mobile the
// image stacks under the text. The image is sticky on desktop so it stays in
// view while the reader scrolls the paragraphs.
const Grid = styled('div', { shouldForwardProp: (p) => p !== 'matchHeight' })(({ theme, matchHeight }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 32,
  alignItems: matchHeight ? 'stretch' : 'start',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.82fr)',
    gap: 'clamp(32px, 5vw, 72px)',
  },
}));

// Default: image sticks while the prose scrolls. `matchHeight`: the image instead
// fills the column so it's exactly as tall as the text block, its width following
// the aspect ratio (so the drawing is scaled, never cropped) and centered.
const Media = styled('div', { shouldForwardProp: (p) => p !== 'matchHeight' })(({ theme, matchHeight }) => ({
  // matchHeight: the grid stretches this cell to the text's height; positioning the
  // Reveal wrapper absolutely gives the figure a definite box to resolve against, so
  // the aspect frame can take that full height and derive its width (no crop, no gaps).
  [theme.breakpoints.up('md')]: matchHeight
    ? {
        position: 'relative',
        height: '100%',
        '& > div': { position: 'absolute', inset: 0 }, // Reveal wrapper
        '& figure': { height: '100%' },
        '& figure > div': { height: '100%', width: 'auto', maxWidth: '100%', marginInline: 'auto' }, // aspect frame
      }
    : {
        position: 'sticky',
        top: `calc(${theme.custom.layout.header.md}px + 24px)`,
      },
}));

export default function ProjectConcept({ paragraphs, images = [], image, matchHeight = false }) {
  const list = images.length ? images : image ? [image] : [];
  // Fill-to-text-height only makes sense for a single image; with several we stack
  // them naturally in the (sticky) column instead.
  const fill = matchHeight && list.length === 1;
  return (
    <div>
      <SectionLabel>concept</SectionLabel>
      <Grid matchHeight={fill}>
        <div>
          {paragraphs.map((para, i) => (
            <Type key={`concept-p${i}`} token="body" as="p" style={{ maxWidth: '60ch', marginBottom: 20 }}>
              {para}
            </Type>
          ))}
        </div>
        {list.length ? (
          <Media matchHeight={fill}>
            {list.map((img, i) => {
              // Tall/portrait images would otherwise stretch to the full column width
              // and become enormous. Cap their height and let the width follow the
              // aspect ratio, centered. (Skipped in fill mode, where the column
              // height drives the size.)
              const portrait = img.height > img.width;
              const cap =
                portrait && !fill
                  ? { maxWidth: `calc(clamp(340px, 60vh, 600px) * ${(img.width / img.height).toFixed(4)})`, marginInline: 'auto' }
                  : undefined;
              const sizes = !fill && portrait ? '(min-width:900px) 220px, 60vw' : '(min-width:900px) 40vw, 100vw';
              return (
                <Reveal key={img.src} delay={i * 0.06} style={{ ...cap, ...(i > 0 ? { marginTop: 28 } : null) }}>
                  <ImageFigure image={img} sizes={sizes} />
                </Reveal>
              );
            })}
          </Media>
        ) : null}
      </Grid>
    </div>
  );
}
