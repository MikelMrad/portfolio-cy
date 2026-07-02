import { createTheme } from '@mui/material/styles';

// ─────────────────────────────────────────────────────────────────────────
// Single design-token source (docs/ui-spec.md §1). Every styled() component
// reads from here — no component hardcodes a color / font / size.
// ─────────────────────────────────────────────────────────────────────────

const colors = {
  paper: '#F6F5F2',
  ink: '#111111',
  inkMuted: '#5A5A5A',
  night: '#0E0E0E',
  snow: '#FFFFFF',
  nightMuted: '#8C8C8C',
  lineLight: 'rgba(17,17,17,0.15)',
  lineDark: 'rgba(255,255,255,0.16)',
  chipDark: 'rgba(255,255,255,0.14)',
  scrim: 'rgba(10,10,10,0.55)',
  imgLoading: '#E7E5E1',
};

// CSS variables injected by next/font on <html> (see src/app/layout.js).
const DISPLAY = 'var(--font-display)'; // Inter Tight 600 (+ italic)
const BODY = 'var(--font-body)'; // Inter 400 / 500

// Each typography token is a full style object — spread directly into sx/styled.
const type = {
  display1: { fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(3rem, 8.5vw, 7.5rem)', lineHeight: 1.02, letterSpacing: '-0.02em' },
  display2: { fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', lineHeight: 1.08, letterSpacing: '-0.015em' },
  display3: { fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.12, letterSpacing: '-0.01em' },
  capability: { fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.01em' },
  hSmall: { fontFamily: BODY, fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.35, letterSpacing: 0 },
  body: { fontFamily: BODY, fontWeight: 400, fontSize: '1.0625rem', lineHeight: 1.65, letterSpacing: 0 },
  label: { fontFamily: BODY, fontWeight: 400, fontSize: '0.9375rem', lineHeight: 1.4, letterSpacing: 0 },
  wordmarkGiant: { fontFamily: DISPLAY, fontWeight: 600, fontSize: 'clamp(4rem, 16vw, 15rem)', lineHeight: 0.9, letterSpacing: '-0.03em' },
};

const motion = {
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)', // CSS transitions
  easeArray: [0.22, 1, 0.36, 1], // Framer Motion `ease`
  durations: { header: 0.3, base: 0.5, reveal: 0.7, image: 0.8, hero: 0.9, reduced: 0.2 },
  stagger: 0.09,
  revealOffset: 24,
  hoverScale: 1.05,
  cardHoverScale: 1.04,
};

const layout = {
  maxWidth: 1440,
  gutter: 'clamp(20px, 4vw, 56px)',
  sectionPad: 'clamp(64px, 10vw, 160px)',
  header: { xs: 72, md: 88 }, // fixed Header height; HeaderSpacer clears it on non-hero pages
};

export const theme = createTheme({
  // cssVariables defaults to false (classic v5-style theme) — kept for simplest static export.
  palette: {
    mode: 'light',
    primary: { main: colors.ink, contrastText: colors.snow },
    background: { default: colors.paper, paper: colors.paper },
    text: { primary: colors.ink, secondary: colors.inkMuted },
    common: { black: colors.ink, white: colors.snow },
    divider: colors.lineLight,
  },
  shape: { borderRadius: 0 }, // radius 0 everywhere
  shadows: Array(25).fill('none'), // depth via scrims + hairlines only; must be length 25
  typography: {
    fontFamily: BODY,
    htmlFontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    body1: { fontSize: type.body.fontSize, lineHeight: type.body.lineHeight },
    button: { textTransform: 'none', fontWeight: 500, letterSpacing: 0 },
  },
  components: {
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiAppBar: { defaultProps: { elevation: 0, color: 'transparent' } },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
  // Arbitrary namespace — survives createTheme's deepmerge; read via useTheme()/styled(({theme})).
  custom: { colors, type, motion, layout },
});

export default theme;
