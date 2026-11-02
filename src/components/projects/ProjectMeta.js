'use client';
import { styled } from '@mui/material/styles';
import CategoryChip from '@/components/ui/CategoryChip';
import SpecList from '@/components/ui/SpecList';
import TextLink from '@/components/ui/TextLink';

const Chips = styled('span')({ display: 'flex', flexWrap: 'wrap', gap: 8 });

// Project fact sheet.
export default function ProjectMeta({ year, academicContext, location, tools, categories = [], published = [] }) {
  const rows = [
    ['Year', year],
    ['Context', academicContext],
    ['Location', location],
    ['Tools', tools.join(', ')],
  ];
  if (categories.length) {
    rows.push([
      'Type',
      <Chips key="type">
        {categories.map((c) => (
          <CategoryChip key={c}>{c}</CategoryChip>
        ))}
      </Chips>,
    ]);
  }
  if (published.length) {
    rows.push([
      'Published on',
      <Chips key="published">
        {published.map((pub) => (
          <TextLink key={pub.href} href={pub.href} target="_blank" rel="noopener noreferrer" style={{ minHeight: 0, paddingBlock: 0 }}>
            {pub.label}
          </TextLink>
        ))}
      </Chips>,
    ]);
  }
  return <SpecList rows={rows} />;
}
