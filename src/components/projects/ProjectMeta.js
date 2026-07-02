'use client';
import { Fragment } from 'react';
import { styled } from '@mui/material/styles';

// Project fact list. Mobile: a scannable label/value grid. Desktop: the original
// single `·`-joined line. One is shown per breakpoint via CSS (no JS, no flash).
const Wrap = styled('div')({ marginTop: 16 });

const Inline = styled('p')(({ theme }) => ({
  ...theme.custom.type.label,
  color: theme.custom.colors.inkMuted,
  margin: 0,
  display: 'none',
  [theme.breakpoints.up('md')]: { display: 'block' },
}));

const Stack = styled('dl')(({ theme }) => ({
  ...theme.custom.type.label,
  margin: 0,
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: 20,
  rowGap: 8,
  '& dt': { color: theme.custom.colors.inkMuted },
  '& dd': { margin: 0, color: theme.custom.colors.ink },
  [theme.breakpoints.up('md')]: { display: 'none' },
}));

export default function ProjectMeta({ year, academicContext, location, tools }) {
  const rows = [
    ['Year', year],
    ['Context', academicContext],
    ['Location', location],
    ['Tools', tools.join(', ')],
  ];
  return (
    <Wrap>
      <Inline>{[year, academicContext, location, tools.join(' · ')].join(' · ')}</Inline>
      <Stack>
        {rows.map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </Fragment>
        ))}
      </Stack>
    </Wrap>
  );
}
