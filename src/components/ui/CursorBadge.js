'use client';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Circular "View Project" badge that spring-follows the cursor inside a featured card.
// Purely decorative → aria-hidden. Rendered only on pointer:fine + motion allowed.
const Badge = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 176,
  height: 176,
  marginLeft: -88,
  marginTop: -88,
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  backgroundColor: 'rgba(120,120,120,0.55)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  color: theme.custom.colors.snow,
  ...theme.custom.type.label,
  pointerEvents: 'none',
  zIndex: 3,
}));

export default function CursorBadge({ style, visible, label = 'View Project' }) {
  return (
    <Badge
      aria-hidden="true"
      style={style}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </Badge>
  );
}
