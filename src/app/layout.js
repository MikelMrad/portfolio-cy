import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import './globals.css';

// The type stack leads with the system font (SF Pro on Apple devices). Inter is
// self-hosted at build time as the fallback everywhere else, exposed as
// var(--font-inter) and consumed by theme.js.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    template: `%s — ${site.name}`,
    default: `${site.name} — ${site.role}`,
  },
  description: `Portfolio of ${site.name}, ${site.role} based in ${site.location}.`,
};

// `viewport-fit=cover` opts the page into the device safe-area insets that the
// nav/menu/footer consume via env(safe-area-inset-*). `themeColor` tints the
// mobile browser chrome to match the page in each appearance.
/** @type {import('next').Viewport} */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
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
