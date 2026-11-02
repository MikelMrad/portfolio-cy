'use client';
import { styled } from '@mui/material/styles';
import CategoryChip from '@/components/ui/CategoryChip';
import SpecList from '@/components/ui/SpecList';

const Chips = styled('span')({ display: 'flex', flexWrap: 'wrap', gap: 8 });

// Project fact sheet.
export default function ProjectMeta({ year, academicContext, location, tools, categories = [] }) {
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
  return <SpecList rows={rows} />;
}
