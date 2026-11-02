'use client';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';
import Container from '@/components/layout/Container';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import { latestProject } from '@/content/projects';

// Home hero background: a dedicated raster image (not tied to any project).
const heroImage = {
  src: '/images/home/hero.webp',
  alt: 'Architectural project render at dusk, a glass building above stepped terraces and water',
};

// Headline words rise in one after another on load; the work below starts as
// an inset rounded frame and opens to the full width as the page scrolls.
const Root = styled('section')(({ theme }) => ({
  backgroundColor: theme.custom.colors.bg,
  paddingTop: 'clamp(40px, 7vw, 88px)',
  paddingBottom: 'clamp(24px, 4vw, 48px)',
}));

const Copy = styled('div')({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Actions = styled(motion.div)({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px 24px',
  marginTop: 32,
});

const Frame = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  marginTop: 'clamp(40px, 6vw, 72px)',
  height: 'min(78svh, 75vw)',
  minHeight: 320,
  overflow: 'hidden',
  backgroundColor: theme.custom.colors.imgLoading,
  '& a': { position: 'absolute', inset: 0, display: 'block' },
  '& a:focus-visible': { outline: `2px solid #ffffff`, outlineOffset: -6, borderRadius: 24 },
}));

const Badge = styled('span')(({ theme }) => ({
  ...theme.custom.type.label,
  position: 'absolute',
  left: '50%',
  bottom: 24,
  transform: 'translateX(-50%)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  minHeight: 40,
  paddingInline: 16,
  borderRadius: theme.custom.radius.pill,
  whiteSpace: 'nowrap',
  color: '#1d1d1f',
  backgroundColor: 'rgba(255,255,255,0.82)',
  backdropFilter: 'saturate(180%) blur(20px)',
  WebkitBackdropFilter: 'saturate(180%) blur(20px)',
  '& b': { fontWeight: 600 },
}));

// Present for screen readers and search engines, invisible on screen.
const VisuallyHidden = styled('span')({
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
});

const word = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function Hero() {
  const m = useTheme().custom.motion;
  const enter = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: m.durations.enter, ease: m.easeOut, delay },
  });

  // 0 → 1 over the first ~60% of a viewport of scroll.
  const { scrollY } = useScroll();
  const inset = useTransform(scrollY, [0, 520], [5, 0]); // % per side
  const radius = useTransform(scrollY, [0, 520], [28, 0]);
  const clipPath = useMotionTemplate`inset(0 ${inset}% round ${radius}px)`;
  const imgScale = useTransform(scrollY, [0, 520], [1.12, 1]);

  const headline = 'Architectural Portfolio'.split(' ');

  return (
    <Root>
      <Container>
        <Copy>
          {/* One h1 carrying the name and the headline, so search engines read
              "Cynthia Nahra, Architectural Portfolio" as the page's main heading. */}
          <Type token="display1" as="h1">
            <motion.span {...enter(0)} style={{ display: 'block' }}>
              <SectionLabel as="span" style={{ display: 'block' }}>
                {site.name}
                <VisuallyHidden>, </VisuallyHidden>
              </SectionLabel>
            </motion.span>
            <motion.span
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
              style={{ display: 'inline-block' }}
            >
              {headline.map((w, i) => (
                <Fragment key={w}>
                  {i > 0 ? ' ' : null}
                  <motion.span variants={word} transition={{ duration: m.durations.enter, ease: m.easeOut }} style={{ display: 'inline-block' }}>
                    {w}
                  </motion.span>
                </Fragment>
              ))}
            </motion.span>
          </Type>
          <motion.div {...enter(0.35)}>
            <Type token="intro" as="p" muted sx={{ maxWidth: '36ch', marginTop: '20px' }}>
              Junior architect based in {site.location}, designing civic, cultural and residential spaces rooted in their context.
            </Type>
          </motion.div>
          <Actions {...enter(0.5)}>
            <Button href="/projects">{t('home.viewProjects')}</Button>
            <TextLink href="/contact">{t('home.getInTouch')}</TextLink>
          </Actions>
        </Copy>
      </Container>
      {latestProject ? (
        <Frame style={{ clipPath }} {...enter(0.6)}>
          <Link href={`/projects/${latestProject.slug}/`} aria-label={`${t('home.latestProject')}: ${latestProject.title}, ${latestProject.year}`}>
            <motion.div style={{ position: 'absolute', inset: 0, scale: imgScale }}>
              <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
            </motion.div>
            <Badge aria-hidden="true">
              {t('home.latestProject')} <b>{latestProject.title}</b> ›
            </Badge>
          </Link>
        </Frame>
      ) : null}
    </Root>
  );
}
