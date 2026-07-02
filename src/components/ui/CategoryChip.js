'use client';
import { styled } from '@mui/material/styles';

// Small category chip. On paper: paper bg + hairline. On imagery: solid snow bg.
const Chip = styled('span', { shouldForwardProp: (p) => p !== 'onImage' })(({ theme, onImage }) => {
  const c = theme.custom.colors;
  return {
    ...theme.custom.type.label,
    display: 'inline-block',
    padding: '8px 14px',
    ...(onImage
      ? { backgroundColor: c.snow, color: c.ink }
      : { backgroundColor: c.paper, color: c.ink, border: `1px solid ${c.lineLight}` }),
  };
});

export default function CategoryChip({ children, onImage = false }) {
  return <Chip onImage={onImage}>{children}</Chip>;
}
