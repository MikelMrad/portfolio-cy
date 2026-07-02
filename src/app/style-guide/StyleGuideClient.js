'use client';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Section from '@/components/layout/Section';
import HeaderSpacer from '@/components/layout/HeaderSpacer';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import Hairline from '@/components/ui/Hairline';
import CategoryChip from '@/components/ui/CategoryChip';
import YearChip from '@/components/ui/YearChip';

// Live style guide — reads every value from theme.js (no copied literals). noindex.
const Block = styled('div')({ marginTop: 'clamp(48px, 7vw, 88px)' });

const Swatches = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: 16,
  marginTop: 24,
});

const DarkBox = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: 160,
  backgroundColor: theme.custom.colors.night,
  color: theme.custom.colors.snow,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  justifyContent: 'flex-end',
}));

const Row = styled('div')({ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: 16 });

export default function StyleGuideClient() {
  const theme = useTheme();
  const { colors, type, motion, layout } = theme.custom;
  const spacing = [8, 16, 24, 32, 48, 64, 96, 160];

  return (
    <>
      <HeaderSpacer />
      <Section tone="paper">
        <SectionLabel>style guide</SectionLabel>
        <Type token="display3" as="h1">
          Design tokens & components
        </Type>

        {/* Palette */}
        <Block>
          <Type token="hSmall" as="h2">
            Palette
          </Type>
          <Swatches>
            {Object.entries(colors).map(([name, value]) => (
              <div key={name}>
                <div style={{ height: 80, background: value, border: `1px solid ${colors.lineLight}` }} />
                <div style={{ ...type.label, marginTop: 8 }}>{name}</div>
                <div style={{ ...type.label, color: colors.inkMuted }}>{value}</div>
              </div>
            ))}
          </Swatches>
        </Block>

        {/* Type ramp */}
        <Block>
          <Type token="hSmall" as="h2">
            Type ramp
          </Type>
          {Object.entries(type).map(([name, style]) => (
            <div key={name} style={{ marginTop: 24, overflow: 'hidden' }}>
              <div style={{ ...type.label, color: colors.inkMuted }}>{name}</div>
              <div style={style}>{name} — The quick brown fox</div>
            </div>
          ))}
        </Block>

        {/* Spacing + layout */}
        <Block>
          <Type token="hSmall" as="h2">
            Spacing & layout
          </Type>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {spacing.map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ ...type.label, color: colors.inkMuted, width: 48 }}>{s}</span>
                <span style={{ height: 16, width: s, background: colors.ink }} />
              </div>
            ))}
          </div>
          <div style={{ ...type.label, color: colors.inkMuted, marginTop: 24 }}>
            maxWidth {layout.maxWidth} · gutter {layout.gutter} · sectionPad {layout.sectionPad} · header {layout.header.xs}/{layout.header.md}
          </div>
        </Block>

        {/* Motion */}
        <Block>
          <Type token="hSmall" as="h2">
            Motion
          </Type>
          <div style={{ ...type.label, color: colors.inkMuted, marginTop: 16 }}>
            ease {motion.ease} · stagger {motion.stagger}s · revealOffset {motion.revealOffset}px · durations{' '}
            {Object.entries(motion.durations)
              .map(([k, v]) => `${k} ${v}s`)
              .join(' · ')}
          </div>
        </Block>

        {/* Components */}
        <Block>
          <Type token="hSmall" as="h2">
            Components
          </Type>

          <div style={{ marginTop: 24 }}>
            <div style={{ ...type.label, color: colors.inkMuted }}>SectionLabel (paper / night)</div>
            <SectionLabel>paper label</SectionLabel>
            <DarkBox style={{ minHeight: 0 }}>
              <SectionLabel tone="night">night label</SectionLabel>
            </DarkBox>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ ...type.label, color: colors.inkMuted }}>TextLink (default · hover/focus interactive)</div>
            <Row>
              <TextLink href="#">View Projects</TextLink>
              <TextLink href="#" arrow={false}>
                No arrow
              </TextLink>
            </Row>
            <DarkBox style={{ minHeight: 0 }}>
              <TextLink href="#" tone="night">
                On night
              </TextLink>
            </DarkBox>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ ...type.label, color: colors.inkMuted }}>CategoryChip · YearChip</div>
            <Row>
              <CategoryChip>Civic</CategoryChip>
              <CategoryChip>Residential</CategoryChip>
            </Row>
            <DarkBox>
              <YearChip year={2026} />
              <Row style={{ marginTop: 0 }}>
                <CategoryChip onImage>On image</CategoryChip>
              </Row>
            </DarkBox>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ ...type.label, color: colors.inkMuted }}>Hairline (paper / night)</div>
            <Hairline style={{ marginTop: 12 }} />
            <DarkBox style={{ minHeight: 0, justifyContent: 'center' }}>
              <Hairline tone="night" />
            </DarkBox>
          </div>

          <div style={{ marginTop: 24, maxWidth: 420 }}>
            <div style={{ ...type.label, color: colors.inkMuted }}>Form field — default / error / disabled</div>
            <TextField fullWidth variant="standard" label="Default" defaultValue="" sx={{ marginTop: 12 }} />
            <TextField fullWidth variant="standard" label="Error" error helperText="This field is required." sx={{ marginTop: 12 }} />
            <TextField fullWidth variant="standard" label="Disabled" disabled defaultValue="Unavailable" sx={{ marginTop: 12 }} />
          </div>
        </Block>
      </Section>
    </>
  );
}
