'use client';
import { styled } from '@mui/material/styles';

// Small pill tag on a quiet fill.
const Chip = styled('span')(({ theme }) => ({
  ...theme.custom.type.label,
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 28,
  paddingInline: 12,
  borderRadius: theme.custom.radius.pill,
  backgroundColor: theme.custom.colors.fill,
  color: theme.custom.colors.label,
}));

export default function CategoryChip({ children }) {
  return <Chip>{children}</Chip>;
}
