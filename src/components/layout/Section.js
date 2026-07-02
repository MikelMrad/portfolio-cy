'use client';
import { styled } from '@mui/material/styles';
import Container from './Container';

// Full-width tone background + text-color context; wraps a Container.
const Root = styled('section', { shouldForwardProp: (p) => p !== 'tone' })(({ theme, tone }) => {
  const c = theme.custom.colors;
  const night = tone === 'night';
  return {
    backgroundColor: night ? c.night : c.paper,
    color: night ? c.snow : c.ink,
    paddingBlock: theme.custom.layout.sectionPad,
  };
});

export default function Section({ tone = 'paper', disableContainer = false, children, className, id }) {
  return (
    <Root tone={tone} className={className} id={id}>
      {disableContainer ? children : <Container>{children}</Container>}
    </Root>
  );
}
