'use client';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';
import Type from '@/components/ui/Type';

// Paper manifesto statement (ui-spec §4.2). Draft copy — TODO:manifesto.
export default function Manifesto() {
  return (
    <Section tone="paper">
      <Reveal>
        <Type token="display2" as="p" style={{ maxWidth: '20ch' }}>
          I design with intention. Every space is a dialogue between light, form, and time.
        </Type>
      </Reveal>
    </Section>
  );
}
