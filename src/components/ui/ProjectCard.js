'use client';
import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Type from './Type';

// Grid card: rounded 3:2 render → context line → title → summary. One link.
const Card = styled(Link)(({ theme }) => {
  const m = theme.custom.motion;
  const c = theme.custom.colors;
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    color: c.label,
    '& .pc-media': {
      position: 'relative',
      width: '100%',
      aspectRatio: '3 / 2',
      marginBottom: 14,
      borderRadius: theme.custom.radius.image,
      overflow: 'hidden',
      backgroundColor: c.imgLoading,
    },
    '& .pc-img': { position: 'absolute', inset: 0, transition: `transform ${m.durations.reveal}s ${m.ease}` },
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover .pc-img': { transform: 'scale(1.03)' },
      '&:hover .pc-title': { textDecoration: 'underline', textUnderlineOffset: '0.15em' },
    },
    '&:focus-visible': { outline: `2px solid ${c.label}`, outlineOffset: 4, borderRadius: theme.custom.radius.image },
  };
});

export default function ProjectCard({ project, priority = false }) {
  return (
    <Card href={`/projects/${project.slug}/`}>
      <div className="pc-media">
        <div className="pc-img">
          <Image src={project.heroImage.src} alt={project.heroImage.alt} fill priority={priority} sizes="(min-width:900px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
        </div>
      </div>
      <Type token="label" as="p" muted>
        {project.year} · {project.academicContext}
      </Type>
      <Type token="hSmall" as="h2" className="pc-title">
        {project.title}
      </Type>
      <Type token="body" as="p" muted>
        {project.summary}
      </Type>
    </Card>
  );
}
