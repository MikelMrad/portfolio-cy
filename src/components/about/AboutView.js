'use client';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import SpecList from '@/components/ui/SpecList';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { t } from '@/content/i18n';
import ValueCard from '@/components/ui/ValueCard';
import Capabilities from '@/components/home/Capabilities';
import { ValuesGrid } from '@/components/home/Approach';
import { site } from '@/content/site';
import { approach } from '@/content/approach';

const facts = [
  ['Education', <>{site.education}<br />Architecture Diploma, 2021–2026</>],
  ['Experience', <>Intern, Bureau Ziad Akl, Beirut (2022)<br />Intern, Bureau Raidy Architect Studio, Beirut (2024)</>],
  ['Languages', 'Arabic (native), French (C1), English (fluent)'],
  ['Based in', site.location],
];

export default function AboutView() {
  return (
    <>
      <Section tone="paper">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <Type token="display1" as="h1" sx={{ maxWidth: '15ch' }}>
            Crafting spaces that respond to people and place.
          </Type>
        </Reveal>
        <Reveal delay={0.15}>
          <Type token="intro" as="p" muted sx={{ maxWidth: '46ch', marginTop: 'clamp(24px, 4vw, 40px)' }}>
            I’m a junior architect from Beirut with hands-on experience drafting architectural plans and 3D models in
            AutoCAD, Revit and Lumion. I focus on detailed drawings and visualizations that support residential and
            commercial projects, applying technical skill and creativity toward considered architectural solutions.
          </Type>
        </Reveal>
        <Reveal delay={0.25} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px 16px', marginTop: 32 }}>
          <Button href={site.cv.href} download="Cynthia-Nahra-CV.pdf">
            {t('about.downloadCv')} <span aria-hidden="true">↓</span>
          </Button>
          <Type token="label" as="span" muted>
            {site.cv.size}
          </Type>
        </Reveal>
        <Reveal style={{ marginTop: 'clamp(48px, 7vw, 88px)' }}>
          <SpecList rows={facts} />
        </Reveal>
      </Section>

      <Capabilities />

      <Section tone="alt">
        <Reveal>
          <SectionLabel>Approach</SectionLabel>
          <Type token="display2" as="h2" sx={{ maxWidth: '20ch', marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            Observe before intervening. Refine before adding.
          </Type>
        </Reveal>
        <ValuesGrid>
          {approach.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <ValueCard icon={v.icon} title={v.title} blurb={v.blurb} />
            </Reveal>
          ))}
        </ValuesGrid>
      </Section>
    </>
  );
}
