import Hero from '@/components/home/Hero';
import Manifesto from '@/components/home/Manifesto';
import Featured from '@/components/home/Featured';
import Belief from '@/components/home/Belief';
import AboutPreview from '@/components/home/AboutPreview';
import Approach from '@/components/home/Approach';

// Home: hero + work frame → manifesto → selected work tiles (gray) → black
// belief statement → about → approach + tools (gray). The footer closes with
// the contact call to action.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Featured />
      <Belief />
      <AboutPreview />
      <Approach />
    </>
  );
}
