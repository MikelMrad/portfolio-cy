import AboutView from '@/components/about/AboutView';
import { site } from '@/content/site';
import { breadcrumbJsonLd, jsonLdScript } from '@/content/seo';

export const metadata = {
  title: 'About',
  description: `${site.name} is a ${site.role.toLowerCase()} based in ${site.location}, trained at ${site.education}. Experience, education, capabilities and CV.`,
  alternates: { canonical: '/about/' },
  openGraph: { url: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd([{ name: 'About', path: '/about' }]))}
      />
      <AboutView />
    </>
  );
}
