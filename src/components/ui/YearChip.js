'use client';
import { styled } from '@mui/material/styles';

// Translucent year chip, top-left of media. Requires a positioned parent.
const Chip = styled('span')(({ theme }) => ({
  ...theme.custom.type.label,
  position: 'absolute',
  top: 24,
  left: 24,
  zIndex: 2,
  color: theme.custom.colors.snow,
  backgroundColor: theme.custom.colors.chipDark,
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  padding: '6px 12px',
}));

export default function YearChip({ year }) {
  return <Chip>{year}</Chip>;
}
