'use client';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import { t } from '@/content/i18n';

export default function AboutPreview() {
  return (
    <Section tone="paper">
      <Reveal>
        <SectionLabel>about</SectionLabel>
        <Type token="hSmall" as="p" style={{ maxWidth: '32ch' }}>
          A junior architect who drafts and models in AutoCAD, Revit and Lumion — turning
          detailed plans and visualizations into residential and commercial projects, and
          pairing technical precision with clear, considered design.
        </Type>
        <div style={{ marginTop: 24 }}>
          <TextLink href="/about">{t('home.learnMore')}</TextLink>
        </div>
      </Reveal>
    </Section>
  );
}
