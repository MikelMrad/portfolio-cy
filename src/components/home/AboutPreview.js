'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/content/site';
import { t } from '@/content/i18n';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,
  alignItems: 'start',
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 96px)' },
}));

export default function AboutPreview() {
  return (
    <Section tone="paper">
      <Reveal>
        <Grid>
          <div>
            <SectionLabel>{t('home.about')}</SectionLabel>
            <Type token="display3" as="h2" sx={{ maxWidth: '16ch' }}>
              {site.role} based in {site.location.split(',')[0]}.
            </Type>
          </div>
          <div>
            <Type token="intro" as="p" muted>
              I draft and model in AutoCAD, Revit and Lumion, turning detailed plans and visualizations into
              residential and commercial projects, and pairing technical precision with clear, considered design.
            </Type>
            <div style={{ marginTop: 16 }}>
              <TextLink href="/about">{t('home.learnMore')}</TextLink>
            </div>
          </div>
        </Grid>
      </Reveal>
    </Section>
  );
}
