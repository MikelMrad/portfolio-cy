'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import ValueCard from '@/components/ui/ValueCard';
import { approach } from '@/content/approach';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 40,
  [theme.breakpoints.up('sm')]: { gridTemplateColumns: '1fr 1fr' },
  [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
}));

export default function Approach() {
  return (
    <Section tone="paper">
      <SectionLabel>approach</SectionLabel>
      <Reveal>
        <Type token="display3" as="p" sx={{ maxWidth: '20ch', marginTop: 8, marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          Observe before intervening. Refine before adding.
        </Type>
        <Grid>
          {approach.map((v) => (
            <ValueCard key={v.title} icon={v.icon} title={v.title} blurb={v.blurb} />
          ))}
        </Grid>
      </Reveal>
    </Section>
  );
}
