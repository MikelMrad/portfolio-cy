'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import HeaderSpacer from '@/components/layout/HeaderSpacer';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import ValueCard from '@/components/ui/ValueCard';
import { site } from '@/content/site';
import { capabilities } from '@/content/capabilities';
import { approach } from '@/content/approach';

const Recap = styled('ol')(({ theme }) => ({
  margin: '24px 0 0',
  padding: 0,
  listStyle: 'none',
  borderBottom: `1px solid ${theme.custom.colors.lineLight}`,
}));

const RecapItem = styled('li')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '48px 1fr',
  gap: 24,
  paddingBlock: 28,
  borderTop: `1px solid ${theme.custom.colors.lineLight}`,
  '& .ri-index': { ...theme.custom.type.label, color: theme.custom.colors.inkMuted },
}));

const Values = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 40,
  marginTop: 32,
  [theme.breakpoints.up('sm')]: { gridTemplateColumns: '1fr 1fr' },
  [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
}));

export default function AboutView() {
  return (
    <>
      <HeaderSpacer />
      <Section tone="paper">
        <SectionLabel>about</SectionLabel>
        {/* TODO:about-headline — draft */}
        <Type token="display3" as="h1" style={{ maxWidth: '18ch' }}>
          Crafting spaces that respond to people and place.
        </Type>
        <Reveal>
          <div style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            <Type token="body" as="p" style={{ maxWidth: '52ch' }}>
              I’m a junior architect from Beirut with hands-on experience drafting architectural
              plans and 3D models in AutoCAD, Revit and Lumion — working to improve design
              precision and client communication. I focus on detailed drawings and visualizations
              that support residential and commercial projects, applying technical skill and
              creativity toward considered, innovative architectural solutions.
            </Type>
            <div style={{ marginTop: 32 }}>
              <Type token="label" as="p" muted>
                Education
              </Type>
              <Type token="body" as="p">
                {site.education}
              </Type>
              <Type token="body" as="p" muted style={{ marginTop: 4 }}>
                Architecture Diploma · 2021–2026
              </Type>

              <Type token="label" as="p" muted style={{ marginTop: 16 }}>
                Experience
              </Type>
              <Type token="body" as="p">
                Intern, Bureau Ziad Akl — Beirut (2022)
              </Type>
              <Type token="body" as="p">
                Intern, Bureau Raidy Architect Studio — Beirut (2024)
              </Type>

              <Type token="label" as="p" muted style={{ marginTop: 16 }}>
                Languages
              </Type>
              <Type token="body" as="p">
                Arabic (native) · French (C1) · English (fluent)
              </Type>

              <Type token="label" as="p" muted style={{ marginTop: 16 }}>
                Based in
              </Type>
              <Type token="body" as="p">
                {site.location}
              </Type>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="paper">
        <SectionLabel>capabilities</SectionLabel>
        <Recap>
          {capabilities.map((c) => (
            <RecapItem key={c.index}>
              <span className="ri-index">{c.index}</span>
              <div>
                <Type token="hSmall" as="h2">
                  {c.title}
                </Type>
                <Type token="body" as="p" muted style={{ marginTop: 8 }}>
                  {c.blurb}
                </Type>
              </div>
            </RecapItem>
          ))}
        </Recap>

        <div style={{ marginTop: 'clamp(48px, 8vw, 96px)' }}>
          <SectionLabel>approach</SectionLabel>
          <Values>
            {approach.map((v) => (
              <ValueCard key={v.title} icon={v.icon} title={v.title} blurb={v.blurb} />
            ))}
          </Values>
        </div>
      </Section>
    </>
  );
}
