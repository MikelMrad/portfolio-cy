'use client';
import Section from '@/components/layout/Section';
import ScrollText from '@/components/motion/ScrollText';

// Black showcase statement, lighting up word by word like the manifesto.
export default function Belief() {
  return (
    <Section tone="night">
      <ScrollText
        tone="night"
        parts={[
          { text: 'Architecture is the art of what remains.' },
          { text: 'The space between materials, the quiet that allows a place to breathe.', muted: true },
        ]}
        sx={{ maxWidth: '24ch', marginInline: 'auto', textAlign: 'center' }}
      />
    </Section>
  );
}
