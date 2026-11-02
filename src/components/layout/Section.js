'use client';
import { styled } from '@mui/material/styles';
import Container from './Container';

// Full-width tone band + text-color context; wraps a Container.
// tone: 'paper' (page bg) | 'alt' (grouped gray) | 'night' (black showcase).
const Root = styled('section', { shouldForwardProp: (p) => p !== 'tone' && p !== 'tight' })(({ theme, tone, tight }) => {
  const c = theme.custom.colors;
  const bg = { paper: c.bg, alt: c.bgAlt, night: c.night }[tone] || c.bg;
  return {
    backgroundColor: bg,
    color: tone === 'night' ? c.nightLabel : c.label,
    paddingBlock: tight ? 'clamp(40px, 6vw, 72px)' : theme.custom.layout.sectionPad,
  };
});

export default function Section({ tone = 'paper', tight = false, disableContainer = false, wide = false, children, className, id, ...rest }) {
  return (
    <Root tone={tone} tight={tight} className={className} id={id} {...rest}>
      {disableContainer ? children : <Container wide={wide}>{children}</Container>}
    </Root>
  );
}
