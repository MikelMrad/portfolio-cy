'use client';
import { styled } from '@mui/material/styles';

// Centered content column. `wide` widens it for full-width imagery.
const Container = styled('div', { shouldForwardProp: (p) => p !== 'wide' })(({ theme, wide }) => ({
  width: '100%',
  maxWidth: wide ? theme.custom.layout.wideMaxWidth : theme.custom.layout.maxWidth,
  marginInline: 'auto',
  paddingLeft: `max(${theme.custom.layout.gutter}, env(safe-area-inset-left))`,
  paddingRight: `max(${theme.custom.layout.gutter}, env(safe-area-inset-right))`,
}));

export default Container;
