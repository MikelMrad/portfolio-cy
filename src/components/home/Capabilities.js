'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import { capabilities } from '@/content/capabilities';

const Grid = styled('ol')(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 20,
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr' },
  '& > li': {
    padding: 'clamp(24px, 3vw, 36px)',
    borderRadius: theme.custom.radius.card,
    backgroundColor: theme.custom.colors.nightTile,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
}));

// Black showcase: four numbered capabilities as dark tiles, rising in pairs.
export default function Capabilities() {
  return (
    <Section tone="night">
      <Reveal>
        <SectionLabel tone="night">Capabilities</SectionLabel>
        <Type token="display2" as="h2" sx={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          From concept to construction set.
        </Type>
      </Reveal>
      <Grid>
        {capabilities.map((cap, i) => (
          <Reveal as="li" key={cap.index} delay={(i % 2) * 0.1}>
            <Type token="label" as="span" tone="night" muted>
              {cap.index}
            </Type>
            <Type token="hSmall" as="h3">
              {cap.title}
            </Type>
            <Type token="body" as="p" tone="night" muted>
              {cap.blurb}
            </Type>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}
