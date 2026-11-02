'use client';
import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

const Row = styled('nav')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 20,
  [theme.breakpoints.up('sm')]: { gridTemplateColumns: '1fr 1fr' },
}));

const Card = styled(Link, { shouldForwardProp: (p) => p !== 'end' })(({ theme, end }) => {
  const c = theme.custom.colors;
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: end ? 'row-reverse' : 'row',
    textAlign: end ? 'right' : 'left',
    gap: 16,
    padding: 16,
    borderRadius: theme.custom.radius.card,
    backgroundColor: c.fill,
    color: c.label,
    transition: `background-color ${theme.custom.motion.durations.fast}s ${theme.custom.motion.ease}`,
    '&:hover': { backgroundColor: c.fillHover },
    '& .pn-thumb': {
      position: 'relative',
      flex: 'none',
      width: 88,
      aspectRatio: '4 / 3',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: c.imgLoading,
    },
    '& .pn-label': { ...theme.custom.type.label, color: c.label2 },
    '& .pn-title': { ...theme.custom.type.hSmall, fontSize: '1.1875rem' },
    '@media (hover: hover) and (pointer: fine)': { '&:hover .pn-title': { textDecoration: 'underline', textUnderlineOffset: '0.15em' } },
    '&:focus-visible': { outline: `2px solid ${c.label}`, outlineOffset: 3 },
  };
});

// Prev / next with wraparound (last → first), as two thumbnail cards.
export default function ProjectNav({ prev, next }) {
  return (
    <Row aria-label="Project navigation">
      {[
        { p: prev, label: '‹ Previous project', end: false },
        { p: next, label: 'Next project ›', end: true },
      ].map(({ p, label, end }) => (
        <Card key={label} href={`/projects/${p.slug}/`} end={end}>
          <span className="pn-thumb">
            <Image src={p.heroImage.src} alt="" fill sizes="88px" style={{ objectFit: 'cover' }} />
          </span>
          <span>
            <span className="pn-label" style={{ display: 'block' }}>
              {label}
            </span>
            <span className="pn-title">{p.title}</span>
          </span>
        </Card>
      ))}
    </Row>
  );
}
