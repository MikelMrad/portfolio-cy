'use client';
import Link from 'next/link';
import ParallaxImage from '@/components/motion/ParallaxImage';
import { styled } from '@mui/material/styles';
import Type from './Type';
import { t } from '@/content/i18n';

// Product-style tile: copy centered at the top, the render filling the bottom.
// `large` is the full-width lead tile. The whole tile is one link.
const Tile = styled(Link, { shouldForwardProp: (p) => p !== 'large' })(({ theme, large }) => {
  const c = theme.custom.colors;
  const m = theme.custom.motion;
  return {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: theme.custom.radius.tile,
    overflow: 'hidden',
    backgroundColor: c.tile,
    color: c.label,
    textAlign: 'center',
    transition: `transform ${m.durations.base}s ${m.ease}, box-shadow ${m.durations.base}s ${m.ease}`,
    '& .tile-copy': {
      padding: large ? 'clamp(32px, 5vw, 56px) 24px 32px' : '36px 24px 28px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    },
    '& .tile-media': {
      position: 'relative',
      marginTop: 'auto',
      aspectRatio: large ? '16 / 7' : '4 / 3',
      backgroundColor: c.imgLoading,
      overflow: 'hidden',
    },
    '& .tile-img': { position: 'absolute', inset: 0, transition: `transform ${m.durations.enter}s ${m.ease}` },
    '& .tile-more': { ...theme.custom.type.body, fontWeight: 500, marginTop: 8 },
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 24px 48px rgba(0,0,0,0.14)' },
      '&:hover .tile-img': { transform: 'scale(1.04)' },
      '&:hover .tile-more': { textDecoration: 'underline', textUnderlineOffset: '0.2em' },
    },
    '&:focus-visible': { outline: `2px solid ${c.label}`, outlineOffset: 4 },
  };
});

export default function FeaturedProjectCard({ project, large = false, priority = false }) {
  return (
    <Tile href={`/projects/${project.slug}/`} large={large}>
      <div className="tile-copy">
        <Type token="label" as="p" muted>
          {project.academicContext} · {project.year}
        </Type>
        <Type token={large ? 'display3' : 'hSmall'} as="h3">
          {project.title}
        </Type>
        <Type token="body" as="p" muted sx={{ maxWidth: '44ch' }}>
          {project.summary}
        </Type>
        <span className="tile-more" aria-hidden="true">
          {t('home.viewProject')} ›
        </span>
      </div>
      <div className="tile-media">
        <div className="tile-img">
          <ParallaxImage
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            priority={priority}
            sizes={large ? '(min-width: 1200px) 1120px, 100vw' : '(min-width: 900px) 560px, 100vw'}
          />
        </div>
      </div>
    </Tile>
  );
}
