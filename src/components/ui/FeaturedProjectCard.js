'use client';
import { useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { styled } from '@mui/material/styles';
import YearChip from './YearChip';
import CategoryChip from './CategoryChip';
import Type from './Type';
import CursorBadge from './CursorBadge';

// SSR-safe pointer:fine detection (no setState-in-effect) via useSyncExternalStore.
const FINE_QUERY = '(hover: hover) and (pointer: fine)';
const subscribeFine = (cb) => {
  const mq = window.matchMedia(FINE_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const getFineSnapshot = () => window.matchMedia(FINE_QUERY).matches;
const getFineServer = () => false;

const Card = styled(Link)(({ theme }) => {
  const m = theme.custom.motion;
  return {
    position: 'relative',
    display: 'block',
    width: '100%',
    minHeight: '60vh',
    overflow: 'hidden',
    color: theme.custom.colors.snow,
    backgroundColor: theme.custom.colors.night,
    [theme.breakpoints.up('md')]: { minHeight: '70vh' },
    '& .fp-media': {
      position: 'absolute',
      inset: 0,
      transition: `transform ${m.durations.image}s ${m.ease}`,
    },
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover .fp-media': { transform: 'scale(1.05)' },
    },
    '@media (prefers-reduced-motion: reduce)': {
      '&:hover .fp-media': { transform: 'none' },
    },
    '&:focus-visible': { outline: `2px solid ${theme.custom.colors.snow}`, outlineOffset: -2 },
  };
});

const Scrim = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  backgroundColor: theme.custom.colors.scrim,
  backgroundImage: 'linear-gradient(to top, rgba(10,10,10,0.7), rgba(10,10,10,0.1))',
}));

const Content = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  bottom: 0,
  zIndex: 2,
  padding: 'clamp(24px, 4vw, 48px)',
  maxWidth: '58ch',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const Chips = styled('div')({ display: 'flex', flexWrap: 'wrap', gap: 8 });

export default function FeaturedProjectCard({ project }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fine = useSyncExternalStore(subscribeFine, getFineSnapshot, getFineServer);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });

  const enableBadge = fine && !reduce;

  // Position the badge at the cursor. `instant` snaps the spring (via jump) so it
  // appears exactly under the pointer on entry instead of flying in from (0,0).
  const setPos = (e, instant) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    x.set(px);
    y.set(py);
    if (instant) {
      sx.jump(px);
      sy.jump(py);
    }
  };

  const onEnter = (e) => {
    if (!enableBadge) return;
    setPos(e, true);
    setHovered(true);
  };
  // Track + reveal on move too: if a card pins under a stationary cursor while
  // scrolling, mouseenter may not fire — the first move still shows the badge.
  const onMove = (e) => {
    if (!enableBadge) return;
    setPos(e, !hovered);
    if (!hovered) setHovered(true);
  };

  return (
    <Card
      ref={ref}
      href={`/projects/${project.slug}/`}
      aria-label={`${project.title} — ${project.summary}`}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="fp-media">
        <Image src={project.heroImage.src} alt="" fill sizes="(min-width: 1536px) 1440px, 100vw" style={{ objectFit: 'cover' }} />
      </div>
      <Scrim />
      <YearChip year={project.year} />
      <Content>
        <Type token="display3" as="h2">
          {project.title}
        </Type>
        <Type token="body" as="p" style={{ opacity: 0.9 }}>
          {project.summary}
        </Type>
        <Chips>
          {project.categories.map((c) => (
            <CategoryChip key={c} onImage>
              {c}
            </CategoryChip>
          ))}
        </Chips>
      </Content>
      {enableBadge ? <CursorBadge style={{ x: sx, y: sy }} visible={hovered} /> : null}
    </Card>
  );
}
