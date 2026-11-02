'use client';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

// Inline action link: "Learn more ›". Monochrome, so the chevron and weight carry
// the affordance; underline on hover. Tone-aware.
const linkStyles = (theme, tone) => {
  const c = theme.custom.colors;
  const color = tone === 'night' ? c.nightLabel : c.label;
  const m = theme.custom.motion;
  return {
    ...theme.custom.type.body,
    fontWeight: 500,
    color,
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: '0.3em',
    minHeight: 44,
    paddingBlock: 10,
    textDecoration: 'none',
    textUnderlineOffset: '0.2em',
    '&:hover': { textDecoration: 'underline' },
    '& .chev': {
      display: 'inline-block',
      transition: `transform ${m.durations.fast}s ${m.ease}`,
    },
    '&:hover .chev': { transform: 'translateX(2px)' },
  };
};

const StyledNext = styled(Link, { shouldForwardProp: (p) => p !== 'tone' })(({ theme, tone }) => linkStyles(theme, tone));
const StyledA = styled('a', { shouldForwardProp: (p) => p !== 'tone' })(({ theme, tone }) => linkStyles(theme, tone));

export default function TextLink({ href = '#', children, arrow = true, tone = 'paper', ...rest }) {
  const internal = typeof href === 'string' && href.startsWith('/');
  const content = (
    <>
      {children}
      {arrow ? (
        <span className="chev" aria-hidden="true">
          ›
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
