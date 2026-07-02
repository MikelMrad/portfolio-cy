'use client';
import { styled } from '@mui/material/styles';

// Clears the fixed Header on pages that don't have a full-bleed hero behind it.
const HeaderSpacer = styled('div')(({ theme }) => ({
  height: theme.custom.layout.header.xs,
  [theme.breakpoints.up('md')]: { height: theme.custom.layout.header.md },
}));

export default HeaderSpacer;
