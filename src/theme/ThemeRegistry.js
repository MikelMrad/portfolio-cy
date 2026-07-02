'use client';

// ThemeProvider (and CssBaseline consumers) are client-only in MUI v9, so the
// theme context lives behind this client boundary. RootLayout stays a Server
// Component and wraps this in AppRouterCacheProvider for emotion SSR.
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
