'use client';
import Section from '@/components/layout/Section';
import ScrollText from '@/components/motion/ScrollText';

// Two-tone statement that lights up word by word on scroll.
export default function Manifesto() {
  return (
    <Section tone="paper">
      <ScrollText
        parts={[
          { text: 'I design with intention.' },
          { text: 'Every space is a dialogue between light, form, and time.', muted: true },
        ]}
        sx={{ maxWidth: '22ch', marginInline: 'auto', textAlign: 'center' }}
      />
    </Section>
  );
}
