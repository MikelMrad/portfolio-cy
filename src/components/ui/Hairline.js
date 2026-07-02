'use client';
import { styled } from '@mui/material/styles';

// Tone-aware 1px hairline rule.
const Hairline = styled('hr', { shouldForwardProp: (p) => p !== 'tone' })(({ theme, tone }) => ({
  border: 0,
  height: 1,
  margin: 0,
  backgroundColor: tone === 'night' ? theme.custom.colors.lineDark : theme.custom.colors.lineLight,
}));

export default Hairline;
