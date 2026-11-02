'use client';

// ThemeProvider (and CssBaseline consumers) are client-only in MUI v9, so the
// theme context lives behind this client boundary. RootLayout stays a Server
// Component and wraps this in AppRouterCacheProvider for emotion SSR.
// MotionConfig makes every Framer animation honor the OS reduced-motion
// setting (transforms off, fades kept).
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MotionConfig } from 'framer-motion';
import theme from '@/theme/theme';

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
