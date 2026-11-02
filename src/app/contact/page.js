import ContactView from '@/components/contact/ContactView';
import { site } from '@/content/site';

export const metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.name}, ${site.role.toLowerCase()} in ${site.location}, by email, phone or the contact form.`,
  alternates: { canonical: '/contact/' },
  openGraph: { url: '/contact/' },
};

export default function ContactPage() {
  return <ContactView />;
}
