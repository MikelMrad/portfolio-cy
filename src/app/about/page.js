import AboutView from '@/components/about/AboutView';
import { site } from '@/content/site';

export const metadata = {
  title: 'About',
  description: `${site.name} is a ${site.role.toLowerCase()} based in ${site.location}, trained at ${site.education}. Experience, education, capabilities and CV.`,
  alternates: { canonical: '/about/' },
  openGraph: { url: '/about/' },
};

export default function AboutPage() {
  return <AboutView />;
}
