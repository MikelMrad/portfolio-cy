'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';

// Floating section switcher pinned to the bottom of the screen once the hero is
// passed. It tracks the section in view and glides a highlight onto it.
const Dock = styled(motion.nav)({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 'max(16px, env(safe-area-inset-bottom))',
  zIndex: 900,
  display: 'flex',
  justifyContent: 'center',
  paddingInline: 12,
  pointerEvents: 'none',
});

const Capsule = styled('ul')(({ theme }) => {
  const c = theme.custom.colors;
  return {
    pointerEvents: 'auto',
    listStyle: 'none',
    margin: 0,
    padding: 5,
    display: 'flex',
    maxWidth: '100%',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
    borderRadius: theme.custom.radius.pill,
    backgroundColor: c.navBg,
    backdropFilter: 'saturate(180%) blur(24px)',
    WebkitBackdropFilter: 'saturate(180%) blur(24px)',
    boxShadow: `inset 0 0 0 1px ${c.separator}, 0 12px 40px rgba(0,0,0,0.16)`,
    '@media (prefers-reduced-transparency: reduce)': { backgroundColor: c.bg },
  };
});

const Item = styled('a')(({ theme }) => {
  const c = theme.custom.colors;
  return {
    ...theme.custom.type.label,
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: 40,
    paddingInline: 14,
    borderRadius: theme.custom.radius.pill,
    whiteSpace: 'nowrap',
    color: c.label2,
    transition: `color ${theme.custom.motion.durations.fast}s ${theme.custom.motion.ease}`,
    '&:hover': { color: c.label },
    '&[aria-current="true"]': { color: c.buttonFg },
    '& .label': { position: 'relative', zIndex: 1 },
  };
});

const Pill = styled(motion.span)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  borderRadius: theme.custom.radius.pill,
  backgroundColor: theme.custom.colors.buttonBg,
}));

export default function LocalNav({ title, sections }) {
  const theme = useTheme();
  const [active, setActive] = useState(null);
  const [shown, setShown] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > 480));

  // Scrollspy: the section crossing the upper-middle band of the viewport wins.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <Dock
      aria-label={`${title} sections`}
      initial={false}
      animate={{ y: shown ? 0 : 96, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.45, ease: theme.custom.motion.easeOut }}
      inert={!shown}
    >
      <Capsule>
        {sections.map((s) => (
          <li key={s.id}>
            <Item href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
              {active === s.id ? <Pill layoutId="local-pill" transition={theme.custom.motion.spring} /> : null}
              <span className="label">{s.label}</span>
            </Item>
          </li>
        ))}
      </Capsule>
    </Dock>
  );
}
