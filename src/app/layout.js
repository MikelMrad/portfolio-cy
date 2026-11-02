import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import { seo, personJsonLd, jsonLdScript } from '@/content/seo';
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
  metadataBase: new URL(site.url),
  title: {
    template: `%s — ${site.name}`,
    default: seo.title,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    url: '/',
    title: seo.title,
    description: seo.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${site.name}, architecture portfolio` }],
  },
  twitter: { card: 'summary_large_image', title: seo.title, description: seo.description, images: ['/og.jpg'] },
  robots: { index: true, follow: true },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(personJsonLd)} />
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
