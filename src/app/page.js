import Hero from '@/components/home/Hero';
import Manifesto from '@/components/home/Manifesto';
import AboutPreview from '@/components/home/AboutPreview';
import Featured from '@/components/home/Featured';
import Belief from '@/components/home/Belief';
import Approach from '@/components/home/Approach';
import ToolsStrip from '@/components/ui/ToolsStrip';
import ContactCTA from '@/components/ui/ContactCTA';

// Home — night hero → paper manifesto → about preview → projects intro + cards →
// night belief → approach → tools → contact CTA.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <AboutPreview />
      <Featured />
      <Belief />
      <Approach />
      <ToolsStrip />
      <ContactCTA />
    </>
  );
}
