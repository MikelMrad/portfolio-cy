'use client';
import { styled } from '@mui/material/styles';
import Type from './Type';
import ValueIcon from './ValueIcons';

// Rounded tile: line icon, title, one-line blurb.
const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  height: '100%',
  padding: 28,
  borderRadius: theme.custom.radius.card,
  backgroundColor: theme.custom.colors.tile,
  color: theme.custom.colors.label,
  transition: `transform ${theme.custom.motion.durations.base}s ${theme.custom.motion.ease}`,
  '& .value-icon': {
    display: 'inline-block',
    color: theme.custom.colors.label,
    marginBottom: 12,
    transition: `transform ${theme.custom.motion.durations.enter}s ${theme.custom.motion.ease}`,
  },
  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': { transform: 'translateY(-4px)' },
    '&:hover .value-icon': { transform: 'rotate(-12deg) scale(1.1)' },
  },
}));

export default function ValueCard({ icon, title, blurb }) {
  return (
    <Card>
      <span className="value-icon">
        <ValueIcon name={icon} />
      </span>
      <Type token="hSmall" as="h3">
        {title}
      </Type>
      <Type token="body" as="p" muted>
        {blurb}
      </Type>
    </Card>
  );
}
