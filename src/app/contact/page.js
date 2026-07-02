import ContactView from '@/components/contact/ContactView';
import { site } from '@/content/site';

export const metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.name}, ${site.role} in ${site.location}.`,
};

export default function ContactPage() {
  return <ContactView />;
}
