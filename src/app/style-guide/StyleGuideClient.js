'use client';
import { styled, useTheme } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Button from '@/components/ui/Button';
import Type from '@/components/ui/Type';
import Hairline from '@/components/ui/Hairline';
import CategoryChip from '@/components/ui/CategoryChip';
import YearChip from '@/components/ui/YearChip';
import SpecList from '@/components/ui/SpecList';

// Live style guide: reads every value from theme.js (no copied literals). noindex.
// Toggle the OS appearance to check both light and dark tokens.
const Block = styled('div')({ marginTop: 'clamp(48px, 7vw, 88px)' });

const Swatches = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: 16,
  marginTop: 24,
});

const DarkBox = styled('div')(({ theme }) => ({
  position: 'relative',
  marginTop: 12,
  borderRadius: theme.custom.radius.card,
  backgroundColor: theme.custom.colors.night,
  color: theme.custom.colors.nightLabel,
  padding: 24,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  alignItems: 'center',
}));

const Row = styled('div')({ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: 12 });

const Caption = ({ children }) => (
  <Type token="label" as="p" muted>
    {children}
  </Type>
);

export default function StyleGuideClient() {
  const theme = useTheme();
  const { colors, type, motion, layout, radius } = theme.custom;

  return (
    <Section tone="paper">
      <SectionLabel>Style guide</SectionLabel>
      <Type token="display2" as="h1">
        Design tokens and components
      </Type>

      <Block>
        <Type token="display3" as="h2">
          Color
        </Type>
        <Swatches>
          {Object.entries(colors).map(([name, value]) => (
            <div key={name}>
              <div style={{ height: 72, background: value, borderRadius: 12, border: `1px solid ${colors.separator}` }} />
              <div style={{ ...type.label, marginTop: 8 }}>{name}</div>
              <div style={{ ...type.caption, color: colors.label2 }}>{value}</div>
            </div>
          ))}
        </Swatches>
      </Block>

      <Block>
        <Type token="display3" as="h2">
          Type
        </Type>
        {Object.entries(type).map(([name, style]) => (
          <div key={name} style={{ marginTop: 24, overflow: 'hidden' }}>
            <Caption>{name}</Caption>
            <div style={style}>The quick brown fox</div>
          </div>
        ))}
      </Block>

      <Block>
        <Type token="display3" as="h2">
          Layout, radius and motion
        </Type>
        <Row>
          {Object.entries(radius).map(([name, r]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div style={{ width: 96, height: 64, borderRadius: Math.min(r, 32), background: colors.fill }} />
              <div style={{ ...type.caption, color: colors.label2, marginTop: 6 }}>
                {name} {r}
              </div>
            </div>
          ))}
        </Row>
        <div style={{ marginTop: 24 }}>
          <Caption>
            maxWidth {layout.maxWidth} · wide {layout.wideMaxWidth} · gutter {layout.gutter} · sectionPad {layout.sectionPad} · nav{' '}
            {layout.header} · nav clearance {layout.navClearance}
          </Caption>
          <Caption>
            ease {motion.ease} ·{' '}
            {Object.entries(motion.durations)
              .map(([k, v]) => `${k} ${v}s`)
              .join(' · ')}
          </Caption>
        </div>
      </Block>

      <Block>
        <Type token="display3" as="h2">
          Components
        </Type>

        <div style={{ marginTop: 24 }}>
          <Caption>Button (filled / tinted / disabled), on page and on night</Caption>
          <Row>
            <Button href="#">View projects</Button>
            <Button href="#" variant="tinted">
              Email me
            </Button>
            <Button disabled>Disabled</Button>
          </Row>
          <DarkBox>
            <Button href="#" tone="night">
              View projects
            </Button>
            <Button href="#" tone="night" variant="tinted">
              Email me
            </Button>
          </DarkBox>
        </div>

        <div style={{ marginTop: 32 }}>
          <Caption>SectionLabel · TextLink</Caption>
          <SectionLabel style={{ marginTop: 12 }}>Selected work</SectionLabel>
          <Row>
            <TextLink href="#">Learn more</TextLink>
            <TextLink href="#" arrow={false}>
              No chevron
            </TextLink>
          </Row>
          <DarkBox>
            <SectionLabel tone="night" style={{ margin: 0 }}>
              Capabilities
            </SectionLabel>
            <TextLink href="#" tone="night">
              On night
            </TextLink>
          </DarkBox>
        </div>

        <div style={{ marginTop: 32 }}>
          <Caption>CategoryChip · YearChip (over imagery)</Caption>
          <Row>
            <CategoryChip>Civic</CategoryChip>
            <CategoryChip>Residential</CategoryChip>
          </Row>
          <DarkBox style={{ minHeight: 96 }}>
            <YearChip year={2026} />
          </DarkBox>
        </div>

        <div style={{ marginTop: 32 }}>
          <Caption>Hairline · SpecList</Caption>
          <Hairline style={{ marginBlock: 12 }} />
          <SpecList
            rows={[
              ['Year', 2026],
              ['Tools', 'AutoCAD, Revit, Lumion'],
            ]}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <Caption>Form fields: see /contact (default, error and disabled states).</Caption>
        </div>
      </Block>
    </Section>
  );
}
