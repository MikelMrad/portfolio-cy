'use client';
import { styled } from '@mui/material/styles';

// Eyebrow above a section headline: short, sentence case, secondary color.
const Root = styled('p', { shouldForwardProp: (p) => p !== 'tone' })(({ theme, tone }) => ({
  ...theme.custom.type.eyebrow,
  color: tone === 'night' ? theme.custom.colors.nightLabel2 : theme.custom.colors.label2,
  margin: 0,
  marginBottom: 12,
  '&::first-letter': { textTransform: 'uppercase' },
}));

export default function SectionLabel({ children, tone = 'paper', ...rest }) {
  return (
    <Root tone={tone} {...rest}>
      {children}
    </Root>
  );
}
