'use client';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import { t } from '@/content/i18n';

// Night contact CTA band (ui-spec §4.10).
export default function ContactCTA() {
  return (
    <Section tone="night">
      <SectionLabel tone="night">contact</SectionLabel>
      <Reveal>
        <Type token="display2" as="p" style={{ marginBottom: 28 }}>
          {t('contact.title')}.
        </Type>
        <TextLink href="/contact" tone="night">
          {t('home.getInTouch')}
        </TextLink>
      </Reveal>
    </Section>
  );
}
