'use client';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';

// Night belief statement over a full-bleed image + scrim (ui-spec §4.7).
const Root = styled('section')(({ theme }) => ({
  position: 'relative',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.custom.colors.night,
  color: theme.custom.colors.snow,
  overflow: 'hidden',
}));

const Scrim = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  backgroundColor: 'rgba(10,10,10,0.62)',
}));

const Inner = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  maxWidth: theme.custom.layout.maxWidth,
  marginInline: 'auto',
  paddingInline: theme.custom.layout.gutter,
  paddingBlock: theme.custom.layout.sectionPad,
  textAlign: 'center',
}));

const beliefImage = {
  src: '/images/home/belief.svg',
  alt: 'Full-bleed atmospheric architectural render behind the belief statement',
};

export default function Belief() {
  return (
    <Root>
      <Image src={beliefImage.src} alt={beliefImage.alt} fill sizes="100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
      <Scrim />
      <Inner>
        <Reveal>
          <Type token="display2" as="p" style={{ maxWidth: '24ch', marginInline: 'auto' }}>
            Architecture is the art of what remains — the space between materials, the quiet that allows a place to breathe.
          </Type>
        </Reveal>
      </Inner>
    </Root>
  );
}
