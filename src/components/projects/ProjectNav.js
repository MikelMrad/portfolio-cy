'use client';
import { styled } from '@mui/material/styles';
import TextLink from '@/components/ui/TextLink';

const Row = styled('nav')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 16,
  flexWrap: 'wrap',
  borderTop: `1px solid ${theme.custom.colors.lineLight}`,
  paddingTop: 32,
  marginTop: 'clamp(48px, 8vw, 96px)',
}));

// Prev / next with wraparound (last → first). Literal arrow glyphs.
export default function ProjectNav({ prev, next }) {
  return (
    <Row aria-label="Project navigation">
      <TextLink href={`/projects/${prev.slug}/`} arrow={false}>
        ← {prev.title}
      </TextLink>
      <TextLink href={`/projects/${next.slug}/`} arrow={false}>
        {next.title} →
      </TextLink>
    </Row>
  );
}
