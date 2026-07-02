'use client';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

// Aspect-ratio wrapper (zero CLS) + next/image fill. `image` = { src, width, height, alt, caption? }.
const Figure = styled('figure')({ margin: 0, width: '100%' });

const Frame = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: theme.custom.colors.imgLoading,
  overflow: 'hidden',
}));

const Caption = styled('figcaption')(({ theme }) => ({
  ...theme.custom.type.label,
  color: theme.custom.colors.inkMuted,
  marginTop: 12,
}));

export default function ImageFigure({ image, caption, priority = false, sizes = '100vw', className }) {
  const { src, width, height, alt } = image;
  const cap = caption ?? image.caption;
  return (
    <Figure className={className}>
      <Frame style={{ aspectRatio: `${width} / ${height}` }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
      </Frame>
      {cap ? <Caption>{cap}</Caption> : null}
    </Figure>
  );
}
