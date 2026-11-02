'use client';
import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import MenuOverlay from './MenuOverlay';
import { pages, contactPage, isActive } from './nav';

// Floating glass capsule centered at the top. It slides away while scrolling
// down and returns on any scroll up. A pill highlight glides between links,
// following the hovered link and resting on the current page.
const Shell = styled(motion.header)(({ theme }) => ({
  position: 'fixed',
  top: `max(${theme.custom.layout.navTop}px, env(safe-area-inset-top))`,
  left: 0,
  right: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  paddingInline: 12,
  pointerEvents: 'none',
}));

const Capsule = styled('div')(({ theme }) => {
  const c = theme.custom.colors;
  return {
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    maxWidth: 560,
    height: theme.custom.layout.header,
    padding: 6,
    borderRadius: theme.custom.radius.pill,
    color: c.label,
    backgroundColor: c.navBg,
    backdropFilter: 'saturate(180%) blur(24px)',
    WebkitBackdropFilter: 'saturate(180%) blur(24px)',
    // Hairline edge + soft lift so the glass reads over both photos and flat color.
    boxShadow: `inset 0 0 0 1px ${c.separator}, 0 8px 32px rgba(0,0,0,0.10)`,
    '@media (prefers-reduced-transparency: reduce)': { backgroundColor: c.bg },
  };
});

const Wordmark = styled(Link)(({ theme }) => ({
  ...theme.custom.type.body,
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  height: '100%',
  paddingInline: 14,
  marginRight: 'auto',
  whiteSpace: 'nowrap',
  color: 'inherit',
  borderRadius: theme.custom.radius.pill,
}));

const Links = styled('nav')(({ theme }) => ({
  display: 'none',
  height: '100%',
  [theme.breakpoints.up('sm')]: { display: 'flex' },
}));

const NavLink = styled(Link)(({ theme }) => {
  const c = theme.custom.colors;
  return {
    ...theme.custom.type.label,
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    paddingInline: 16,
    borderRadius: theme.custom.radius.pill,
    color: c.label2,
    transition: `color ${theme.custom.motion.durations.fast}s ${theme.custom.motion.ease}`,
    '&:hover, &[aria-current="page"]': { color: c.label },
    '& .label': { position: 'relative', zIndex: 1 },
  };
});

const Highlight = styled(motion.span)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  borderRadius: theme.custom.radius.pill,
  backgroundColor: theme.custom.colors.fill,
}));

const ContactButton = styled(Link)(({ theme }) => {
  const c = theme.custom.colors;
  return {
    ...theme.custom.type.label,
    fontWeight: 500,
    display: 'none',
    alignItems: 'center',
    height: '100%',
    paddingInline: 18,
    marginLeft: 4,
    borderRadius: theme.custom.radius.pill,
    backgroundColor: c.buttonBg,
    color: c.buttonFg,
    whiteSpace: 'nowrap',
    transition: `opacity ${theme.custom.motion.durations.fast}s ${theme.custom.motion.ease}, transform ${theme.custom.motion.durations.fast}s ${theme.custom.motion.ease}`,
    '&:hover': { opacity: 0.86 },
    '&:active': { transform: 'scale(0.97)' },
    [theme.breakpoints.up('sm')]: { display: 'inline-flex' },
  };
});

const MenuButton = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  padding: 0,
  borderRadius: '50%',
  background: theme.custom.colors.fill,
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  [theme.breakpoints.up('sm')]: { display: 'none' },
}));

// 16×7 two-line glyph that rotates to an × when open.
const Glyph = styled('span', { shouldForwardProp: (p) => p !== 'open' })(({ theme, open }) => {
  const { fast } = theme.custom.motion.durations;
  const ease = theme.custom.motion.ease;
  return {
    position: 'relative',
    width: 16,
    height: 7,
    '& i': {
      position: 'absolute',
      left: 0,
      width: '100%',
      height: 1.5,
      borderRadius: 1,
      backgroundColor: 'currentColor',
      transition: `top ${fast}s ${ease}, transform ${fast}s ${ease}`,
    },
    '& i:nth-of-type(1)': { top: open ? 2.75 : 0, transform: open ? 'rotate(45deg)' : 'none' },
    '& i:nth-of-type(2)': { top: open ? 2.75 : 5.5, transform: open ? 'rotate(-45deg)' : 'none' },
  };
});

export default function Header() {
  const theme = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(null);
  const triggerRef = useRef(null);
  const closeMenu = useCallback(() => setOpen(false), []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) < 4) return; // ignore jitter
    setHidden(y > prev && y > 160);
  });

  const activeKey = pages.find((p) => isActive(pathname, p.href))?.key ?? null;
  const pillKey = hovered ?? activeKey;

  return (
    <>
      <Shell
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden && !open ? -96 : 0, opacity: hidden && !open ? 0 : 1 }}
        transition={{ duration: 0.45, ease: theme.custom.motion.easeOut }}
      >
        <Capsule>
          <Wordmark href="/" onClick={closeMenu}>
            {site.name}
          </Wordmark>
          <Links aria-label="Primary" onMouseLeave={() => setHovered(null)}>
            {pages.map((p) => (
              <NavLink
                key={p.key}
                href={p.href}
                aria-current={isActive(pathname, p.href) ? 'page' : undefined}
                onMouseEnter={() => setHovered(p.key)}
                onFocus={() => setHovered(p.key)}
                onBlur={() => setHovered(null)}
              >
                {pillKey === p.key ? <Highlight layoutId="nav-pill" transition={theme.custom.motion.spring} /> : null}
                <span className="label">{t(`nav.${p.key}`)}</span>
              </NavLink>
            ))}
          </Links>
          <ContactButton href={contactPage.href} aria-current={isActive(pathname, contactPage.href) ? 'page' : undefined}>
            {t('nav.contact')}
          </ContactButton>
          <MenuButton
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-overlay"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <Glyph open={open} aria-hidden="true">
              <i />
              <i />
            </Glyph>
          </MenuButton>
        </Capsule>
      </Shell>
      <MenuOverlay open={open} onClose={closeMenu} triggerRef={triggerRef} />
    </>
  );
}
