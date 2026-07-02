'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import ImageFigure from '@/components/ui/ImageFigure';
import Reveal from '@/components/ui/Reveal';
import { t } from '@/content/i18n';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 40,
  alignItems: 'center',
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr', gap: 64 },
}));

const previewImage = {
  src: '/images/about/preview.svg',
  width: 1600,
  height: 1200,
  alt: 'TODO: portrait-adjacent studio/work image for the About preview',
};

export default function AboutPreview() {
  return (
    <Section tone="paper">
      <Reveal>
        <Grid>
          <div>
            <SectionLabel>about</SectionLabel>
            {/* TODO:bio — short about paragraph (first person) */}
            <Type token="hSmall" as="p" style={{ maxWidth: '40ch' }}>
              TODO:bio — I’m a junior architect from Beirut, drawn to work that is calm,
              contextual and precise. This is a placeholder until the real bio is confirmed.
            </Type>
            <div style={{ marginTop: 24 }}>
              <TextLink href="/about">{t('home.learnMore')}</TextLink>
            </div>
          </div>
          <ImageFigure image={previewImage} sizes="(min-width:900px) 50vw, 100vw" />
        </Grid>
      </Reveal>
    </Section>
  );
}
