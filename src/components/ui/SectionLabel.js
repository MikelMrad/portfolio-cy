'use client';
import { styled } from '@mui/material/styles';

// `// {children}` marker before every section — `label` type, muted per tone.
const Root = styled('p', { shouldForwardProp: (p) => p !== 'tone' })(({ theme, tone }) => ({
  ...theme.custom.type.label,
  color: tone === 'night' ? theme.custom.colors.nightMuted : theme.custom.colors.inkMuted,
  margin: 0,
  marginBottom: 32,
}));

export default function SectionLabel({ children, tone = 'paper', ...rest }) {
  return (
    <Root tone={tone} {...rest}>
      {`// ${children}`}
    </Root>
  );
}
