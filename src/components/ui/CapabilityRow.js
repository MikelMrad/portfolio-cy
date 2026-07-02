'use client';
import { styled } from '@mui/material/styles';

// Numbered capability row on night: `0X` index + display title (nightMuted → snow on hover).
// Plain list semantics — rows are not links. Hairline divider via border-top.
const Row = styled('li')(({ theme }) => {
  const c = theme.custom.colors;
  const m = theme.custom.motion;
  return {
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
    gap: 24,
    alignItems: 'start',
    paddingBlock: 'clamp(40px, 6vw, 64px)',
    borderTop: `1px solid ${c.lineDark}`,
    '& .cap-index': { ...theme.custom.type.label, color: c.nightMuted, paddingTop: 8 },
    '& .cap-title': {
      ...theme.custom.type.capability,
      color: c.nightMuted,
      transition: `color ${m.durations.header}s ${m.ease}`,
    },
    '& .cap-blurb': { ...theme.custom.type.body, color: c.nightMuted, marginTop: 16, maxWidth: '48ch' },
    '&:hover .cap-title, &:focus-within .cap-title': { color: c.snow },
  };
});

export default function CapabilityRow({ index, title, blurb }) {
  return (
    <Row>
      <span className="cap-index">{index}</span>
      <div>
        <div className="cap-title">{title}</div>
        {blurb ? <div className="cap-blurb">{blurb}</div> : null}
      </div>
    </Row>
  );
}
