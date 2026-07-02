'use client';
import { styled } from '@mui/material/styles';
import Type from './Type';
import ValueIcon from './ValueIcons';

const Card = styled('div')(({ theme }) => ({
  color: theme.custom.colors.ink,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  '& .value-icon': { color: theme.custom.colors.ink },
}));

export default function ValueCard({ icon, title, blurb }) {
  return (
    <Card>
      <span className="value-icon">
        <ValueIcon name={icon} />
      </span>
      <Type token="hSmall" as="h2">
        {title}
      </Type>
      <Type token="body" as="p" muted>
        {blurb}
      </Type>
    </Card>
  );
}
