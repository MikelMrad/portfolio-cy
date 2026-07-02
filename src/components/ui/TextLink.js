'use client';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

// Underlined text link with optional ↗ arrow, tone-aware.
const linkStyles = (theme, tone) => {
  const c = theme.custom.colors;
  const color = tone === 'night' ? c.snow : c.ink;
  const m = theme.custom.motion;
  return {
    ...theme.custom.type.label,
    color,
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: '0.35em',
    textDecoration: 'underline',
    textUnderlineOffset: '6px',
    textDecorationThickness: '1px',
    transition: `text-decoration-thickness ${m.durations.reduced}s ${m.ease}`,
    '&:hover': { textDecorationThickness: '2px' },
    '& .arrow': {
      fontSize: '0.9em',
      transition: `transform ${m.durations.reduced}s ${m.ease}`,
    },
    '&:hover .arrow': { transform: 'translate(2px, -2px)' },
    '&:focus-visible': { outline: `2px solid ${color}`, outlineOffset: '4px' },
  };
};

const StyledNext = styled(Link, { shouldForwardProp: (p) => p !== 'tone' })(({ theme, tone }) =>
  linkStyles(theme, tone)
);
const StyledA = styled('a', { shouldForwardProp: (p) => p !== 'tone' })(({ theme, tone }) =>
  linkStyles(theme, tone)
);

export default function TextLink({ href = '#', children, arrow = true, tone = 'paper', ...rest }) {
  const internal = typeof href === 'string' && href.startsWith('/');
  const content = (
    <>
      {children}
      {arrow ? (
        <span className="arrow" aria-hidden="true">
          ↗
        </span>
      ) : null}
    </>
  );
  return internal ? (
    <StyledNext href={href} tone={tone} {...rest}>
      {content}
    </StyledNext>
  ) : (
    <StyledA href={href} tone={tone} {...rest}>
      {content}
    </StyledA>
  );
}
