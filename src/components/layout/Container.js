'use client';
import { styled } from '@mui/material/styles';

// Max-width 1440, fluid gutter, centered.
const Container = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.custom.layout.maxWidth,
  marginInline: 'auto',
  paddingInline: theme.custom.layout.gutter,
}));

export default Container;
