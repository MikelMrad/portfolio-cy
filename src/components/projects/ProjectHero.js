'use client';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import YearChip from '@/components/ui/YearChip';

// Full-bleed project hero (60–75vh) with YearChip top-left.
const Root = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 'clamp(420px, 70vh, 760px)',
  backgroundColor: theme.custom.colors.imgLoading,
  overflow: 'hidden',
}));

export default function ProjectHero({ image, year }) {
  return (
    <Root>
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      <YearChip year={year} />
    </Root>
  );
}
