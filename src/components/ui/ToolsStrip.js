'use client';
import { styled } from '@mui/material/styles';
import Container from '@/components/layout/Container';
import { site } from '@/content/site';

// Static hairline-bounded row of tool wordmarks (no marquee). ui-spec §ToolsStrip.
const Band = styled('div')(({ theme }) => ({ backgroundColor: theme.custom.colors.paper }));

const Row = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.custom.colors.lineLight}`,
  borderBottom: `1px solid ${theme.custom.colors.lineLight}`,
  paddingBlock: 32,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 'clamp(24px, 5vw, 64px)',
}));

const Tool = styled('span')(({ theme }) => ({
  ...theme.custom.type.label,
  color: theme.custom.colors.inkMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}));

export default function ToolsStrip() {
  return (
    <Band>
      <Container>
        <Row>
          {site.tools.map((tool) => (
            <Tool key={tool}>{tool}</Tool>
          ))}
        </Row>
      </Container>
    </Band>
  );
}
