'use client';
import { styled } from '@mui/material/styles';

// "Tech specs" style fact sheet: label column + value column, separated rows.
// rows: [label, value][] where value can be any node.
const List = styled('dl')(({ theme }) => ({
  margin: 0,
  borderTop: `1px solid ${theme.custom.colors.separator}`,
}));

const Row = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 4,
  paddingBlock: 20,
  borderBottom: `1px solid ${theme.custom.colors.separator}`,
  [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'minmax(140px, 1fr) 3fr', gap: 24 },
  '& dt': { ...theme.custom.type.body, fontWeight: 600, color: theme.custom.colors.label },
  '& dd': { ...theme.custom.type.body, margin: 0, color: theme.custom.colors.label2 },
}));

export default function SpecList({ rows }) {
  return (
    <List>
      {rows.map(([k, v]) => (
        <Row key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </Row>
      ))}
    </List>
  );
}
