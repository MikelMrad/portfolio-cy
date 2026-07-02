'use client';
import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import YearChip from './YearChip';
import CategoryChip from './CategoryChip';
import Type from './Type';

// Grid card: 3:2 media (YearChip) → title → summary → chips. Whole card is one link.
const Card = styled(Link)(({ theme }) => {
  const m = theme.custom.motion;
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    color: 'inherit',
    '& .pc-media': {
      position: 'relative',
      width: '100%',
      aspectRatio: '3 / 2',
      overflow: 'hidden',
      backgroundColor: theme.custom.colors.imgLoading,
    },
    '& .pc-img': { position: 'absolute', inset: 0, transition: `transform ${m.durations.image}s ${m.ease}` },
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover .pc-img': { transform: 'scale(1.04)' },
      '&:hover .pc-title': { textDecoration: 'underline', textUnderlineOffset: '4px' },
    },
    '@media (prefers-reduced-motion: reduce)': { '&:hover .pc-img': { transform: 'none' } },
    '&:focus-visible': { outline: `2px solid ${theme.custom.colors.ink}`, outlineOffset: 4 },
  };
});

const Chips = styled('div')({ display: 'flex', flexWrap: 'wrap', gap: 8 });

export default function ProjectCard({ project, priority = false }) {
  return (
    <Card href={`/projects/${project.slug}/`} aria-label={`${project.title} — ${project.summary}`}>
      <div className="pc-media">
        <div className="pc-img">
          <Image src={project.heroImage.src} alt="" fill priority={priority} sizes="(min-width:900px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
        </div>
        <YearChip year={project.year} />
      </div>
      <Type token="hSmall" as="h2" className="pc-title">
        {project.title}
      </Type>
      <Type token="body" as="p" muted>
        {project.summary}
      </Type>
      <Chips>
        {project.categories.map((c) => (
          <CategoryChip key={c}>{c}</CategoryChip>
        ))}
      </Chips>
    </Card>
  );
}
