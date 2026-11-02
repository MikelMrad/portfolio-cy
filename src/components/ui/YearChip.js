'use client';
import { styled } from '@mui/material/styles';

// Year badge over imagery (top-left). Requires a positioned parent.
const Chip = styled('span')(({ theme }) => ({
  ...theme.custom.type.caption,
  fontWeight: 600,
  position: 'absolute',
  top: 16,
  left: 16,
  zIndex: 2,
  paddingBlock: 6,
  paddingInline: 10,
  borderRadius: theme.custom.radius.pill,
  color: '#1d1d1f',
  backgroundColor: 'rgba(255,255,255,0.82)',
  backdropFilter: 'saturate(180%) blur(20px)',
  WebkitBackdropFilter: 'saturate(180%) blur(20px)',
}));

export default function YearChip({ year }) {
  return <Chip>{year}</Chip>;
}
