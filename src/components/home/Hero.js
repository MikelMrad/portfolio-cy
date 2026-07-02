'use client';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import LatestProjectCard from '@/components/ui/LatestProjectCard';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import { latestProject } from '@/content/projects';

// Home hero background — a dedicated raster image (not tied to any project).
// Drop the real file at public/images/home/hero.webp; next/image serves it as-is
// (images are unoptimized). WebP keeps the photographic texture (a traced SVG
// posterizes it).
const heroImage = {
  src: '/images/home/hero.webp',
  alt: 'TODO: home hero background image',
};

const Root = styled('section')(({ theme }) => ({
  position: 'relative',
  minHeight: 'max(640px, 100svh)',
  display: 'flex',
  backgroundColor: theme.custom.colors.night,
  color: theme.custom.colors.snow,
  overflow: 'hidden',
}));

const Scrim = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundColor: theme.custom.colors.scrim,
  // deepen toward the bottom-left where the copy sits
  backgroundImage: 'linear-gradient(to top, rgba(10,10,10,0.65), rgba(10,10,10,0.15))',
  zIndex: 1,
}));

const Inner = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  maxWidth: theme.custom.layout.maxWidth,
  marginInline: 'auto',
  paddingInline: theme.custom.layout.gutter,
  paddingTop: 120,
  paddingBottom: 48,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}));

const Actions = styled('div')({ marginTop: 32 });

// Staggered fade-up on mount, CSS-driven (see @keyframes heroRise in globals.css).
// Pure CSS keeps the above-the-fold LCP headline out of the JS-hydration path;
// reduced motion is handled globally (animation neutralized → static, visible).
const Rise = styled('div', { shouldForwardProp: (p) => p !== 'step' })(({ theme, step }) => {
  const m = theme.custom.motion;
  return {
    '@media (prefers-reduced-motion: no-preference)': {
      opacity: 0,
      animation: `heroRise ${m.durations.hero}s ${m.ease} both`,
      animationDelay: `${0.15 + step * m.stagger}s`,
    },
  };
});

const CardSlot = styled('div')(({ theme }) => ({
  marginTop: 40,
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    right: theme.custom.layout.gutter,
    bottom: 48,
    marginTop: 0,
    zIndex: 3,
  },
}));

export default function Hero() {
  return (
    <Root>
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', zIndex: 0 }}
      />
      <Scrim />
      <Inner>
        <Rise step={0}>
          <SectionLabel tone="night">{site.wordmark.replace(/\.$/, '')}</SectionLabel>
        </Rise>
        {/* TODO:hero-headline — confirm wording (one italic accent word) */}
        <Rise step={1}>
          <Type token="display1" as="h1" sx={{ maxWidth: '14ch', '& em': { fontStyle: 'italic' } }}>
            Architecture in <em>Context</em>
          </Type>
        </Rise>
        {/* TODO:hero-intro — draft */}
        <Rise step={2}>
          <Type token="body" as="p" sx={{ maxWidth: '62ch', opacity: 0.9, marginTop: 24 }}>
            Junior architect based in {site.location}, designing civic, cultural and residential spaces rooted in their context.
          </Type>
        </Rise>
        <Rise step={3}>
          <Actions>
            <TextLink href="/projects" tone="night">
              {t('home.viewProjects')}
            </TextLink>
          </Actions>
        </Rise>
      </Inner>
      <CardSlot>
        <LatestProjectCard project={latestProject} />
      </CardSlot>
    </Root>
  );
}
