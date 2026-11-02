'use client';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

// Pill button. `variant`: 'filled' (primary action) | 'tinted' (secondary).
// `tone="night"` inverts for black showcase sections. Renders a Next <Link> for
// internal page hrefs, a plain <a> for external hrefs and file downloads, and a
// <button> without href.
const buttonStyles = (theme, variant, tone) => {
  const c = theme.custom.colors;
  const m = theme.custom.motion;
  const night = tone === 'night';
  const filled = variant !== 'tinted';
  const palette = filled
    ? night
      ? { bg: c.nightLabel, fg: c.night, hover: '#ffffff' }
      : { bg: c.buttonBg, fg: c.buttonFg, hover: c.buttonBg }
    : night
      ? { bg: 'rgba(255,255,255,0.12)', fg: c.nightLabel, hover: 'rgba(255,255,255,0.2)' }
      : { bg: c.fill, fg: c.label, hover: c.fillHover };
  return {
    ...theme.custom.type.body,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 44,
    paddingInline: 22,
    borderRadius: theme.custom.radius.pill,
    border: 'none',
    backgroundColor: palette.bg,
    color: palette.fg,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: `background-color ${m.durations.fast}s ${m.ease}, opacity ${m.durations.fast}s ${m.ease}, transform ${m.durations.fast}s ${m.ease}`,
    '&:hover': { backgroundColor: palette.hover, ...(filled ? { opacity: 0.86 } : null) },
    '&:active': { transform: 'scale(0.98)' },
    '&:disabled': { opacity: 0.4, cursor: 'not-allowed', transform: 'none' },
    '&:focus-visible': { outline: `2px solid ${night ? c.nightLabel : c.label}`, outlineOffset: 3 },
  };
};

const opts = { shouldForwardProp: (p) => p !== 'variant' && p !== 'tone' };
const AsLink = styled(Link, opts)(({ theme, variant, tone }) => buttonStyles(theme, variant, tone));
const AsA = styled('a', opts)(({ theme, variant, tone }) => buttonStyles(theme, variant, tone));
const AsButton = styled('button', opts)(({ theme, variant, tone }) => buttonStyles(theme, variant, tone));

export default function Button({ href, variant = 'filled', tone = 'paper', type = 'button', ...rest }) {
  if (!href) return <AsButton variant={variant} tone={tone} type={type} {...rest} />;
  const Comp = href.startsWith('/') && !rest.download ? AsLink : AsA;
  return <Comp href={href} variant={variant} tone={tone} {...rest} />;
}
