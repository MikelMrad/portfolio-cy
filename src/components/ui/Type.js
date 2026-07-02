'use client';
import { styled, useTheme } from '@mui/material/styles';

// Typographic primitive — applies a theme.custom.type token to any element.
// <Type token="display1" as="h1">…</Type>. `muted` picks the tone-muted color.
// Token/tone/muted are consumed here (applied via sx) so they never leak to the DOM
// even when the `as` prop swaps the element.
const Root = styled('p')({ margin: 0 });

export default function Type({ token = 'body', as = 'p', tone, muted = false, sx, children, ...rest }) {
  const theme = useTheme();
  const base = theme.custom.type[token] || theme.custom.type.body;
  const color = muted ? (tone === 'night' ? theme.custom.colors.nightMuted : theme.custom.colors.inkMuted) : undefined;
  return (
    <Root as={as} sx={{ ...base, ...(color ? { color } : null), ...sx }} {...rest}>
      {children}
    </Root>
  );
}
