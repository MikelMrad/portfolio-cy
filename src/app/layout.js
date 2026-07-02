import { Inter_Tight, Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import ThemeRegistry from '@/theme/ThemeRegistry';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import './globals.css';

// next/font self-hosts at build time (export-safe, offline). Exposed as CSS vars
// consumed by theme.js (var(--font-display) / var(--font-body)).
const display = Inter_Tight({
  subsets: ['latin'],
  weight: '600',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: {
    template: `%s — ${site.name}`,
    default: `${site.name} — ${site.role}`,
  },
  description: `Portfolio of ${site.name}, ${site.role} based in ${site.location}.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <SmoothScroll>
              <a className="skip-link" href="#main">
                {t('a11y.skipToContent')}
              </a>
              <Header />
              <main id="main" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </SmoothScroll>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
