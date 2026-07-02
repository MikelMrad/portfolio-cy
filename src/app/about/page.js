import AboutView from '@/components/about/AboutView';
import ContactCTA from '@/components/ui/ContactCTA';
import { site } from '@/content/site';

export const metadata = {
  title: 'About',
  description: `${site.name} — ${site.role} based in ${site.location}.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutView />
      <ContactCTA />
    </>
  );
}
