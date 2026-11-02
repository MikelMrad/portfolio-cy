'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import ValueCard from '@/components/ui/ValueCard';
import ToolsStrip from '@/components/ui/ToolsStrip';
import { approach } from '@/content/approach';
import { t } from '@/content/i18n';

export const ValuesGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 20,
  [theme.breakpoints.up('sm')]: { gridTemplateColumns: '1fr 1fr' },
  [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
}));

export default function Approach() {
  return (
    <Section tone="alt">
      <Reveal>
        <SectionLabel>{t('home.approach')}</SectionLabel>
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
      <ToolsStrip />
    </Section>
  );
}
