'use client';
import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { styled } from '@mui/material/styles';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import { pages, contactPage } from './nav';

// Dark closing section: a call to action (skipped on /contact), quick links,
// live Beirut time, back to top, and the name rising into view at the end.
const Root = styled('footer')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.custom.colors.night,
  color: theme.custom.colors.nightLabel,
  paddingTop: 'clamp(72px, 10vw, 128px)',
  paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
  borderTop: `1px solid ${theme.custom.colors.nightSeparator}`,
}));

const Inner = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.custom.layout.maxWidth,
  marginInline: 'auto',
  paddingLeft: `max(${theme.custom.layout.gutter}, env(safe-area-inset-left))`,
  paddingRight: `max(${theme.custom.layout.gutter}, env(safe-area-inset-right))`,
}));

const Cta = styled('div')({ marginBottom: 'clamp(64px, 9vw, 112px)' });

const Actions = styled('div')({ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 });

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px 24px',
  paddingTop: 32,
  borderTop: `1px solid ${theme.custom.colors.nightSeparator}`,
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '2fr 1fr 1fr 1fr' },
}));

const Column = styled('div')({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' });

const ColTitle = styled('p')(({ theme }) => ({
  ...theme.custom.type.label,
  color: theme.custom.colors.nightLabel2,
  margin: 0,
  marginBottom: 8,
}));

// Links slide a hairline underline in from the left on hover.
const linkStyles = (theme) => ({
  ...theme.custom.type.body,
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 36,
  color: theme.custom.colors.nightLabel,
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 6,
    height: 1,
    backgroundColor: 'currentColor',
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: `transform ${theme.custom.motion.durations.base}s ${theme.custom.motion.ease}`,
  },
  '&:hover::after': { transform: 'scaleX(1)', transformOrigin: 'left' },
  [theme.breakpoints.down('md')]: { minHeight: 44 },
});
const FooterLink = styled(Link)(({ theme }) => linkStyles(theme));
const ExternalLink = styled('a')(({ theme }) => linkStyles(theme));

const TopButton = styled('button')(({ theme }) => ({
  ...theme.custom.type.body,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  minHeight: 44,
  padding: 0,
  background: 'none',
  border: 'none',
  color: theme.custom.colors.nightLabel,
  cursor: 'pointer',
  '& .disc': {
    display: 'inline-grid',
    placeItems: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.12)',
    transition: `transform ${theme.custom.motion.durations.base}s ${theme.custom.motion.ease}, background-color ${theme.custom.motion.durations.fast}s ${theme.custom.motion.ease}`,
  },
  '&:hover .disc': { transform: 'translateY(-3px)', backgroundColor: 'rgba(255,255,255,0.2)' },
}));

// Container-query sized so the name spans the footer width at any viewport.
const NameWrap = styled(motion.div)({ containerType: 'inline-size', overflow: 'hidden', marginTop: 'clamp(48px, 8vw, 96px)' });

const BigName = styled(motion.p)(({ theme }) => ({
  ...theme.custom.type.display1,
  margin: 0,
  fontSize: 'min(14.2cqw, 13rem)',
  lineHeight: 0.92,
  letterSpacing: '-0.04em',
  whiteSpace: 'nowrap',
  color: theme.custom.colors.nightLabel,
}));

const Legal = styled('div')(({ theme }) => ({
  ...theme.custom.type.caption,
  color: theme.custom.colors.nightLabel2,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  justifyContent: 'space-between',
  marginTop: 24,
}));

// Designer credit: same caption size, brighter, underline on hover.
const CreditLink = styled('a')(({ theme }) => ({
  color: theme.custom.colors.nightLabel,
  textDecoration: 'underline',
  textDecorationColor: 'rgba(255,255,255,0.3)',
  textUnderlineOffset: '0.2em',
  transition: `text-decoration-color ${theme.custom.motion.durations.fast}s ${theme.custom.motion.ease}`,
  '&:hover': { textDecorationColor: 'currentColor' },
}));

// Live Beirut clock, minute precision. Empty on the server (no hydration mismatch).
const formatTime = () =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Beirut', hour: '2-digit', minute: '2-digit' }).format(new Date());
const subscribeClock = (cb) => {
  const id = setInterval(cb, 15000);
  return () => clearInterval(id);
};

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <Button tone="night" variant="tinted" onClick={onCopy} aria-live="polite">
      {copied ? 'Email copied ✓' : `Copy ${site.email}`}
    </Button>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const time = useSyncExternalStore(subscribeClock, formatTime, () => '');
  const socials = site.socials.filter((s) => s.href && s.href !== '#'); // render only confirmed links

  const lenis = useLenis();
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (lenis && !reduce) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0 });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    // data-nosnippet: keep footer contact details (phone, email) out of Google's
    // search result snippets. Links here are still crawled.
    <Root data-nosnippet="">
      <Inner>
        {pathname !== contactPage.href ? (
          <Cta>
            <Reveal>
              <SectionLabel tone="night">{t('nav.contact')}</SectionLabel>
              <Type token="display1" as="h2">
                {t('contact.title')}.
              </Type>
              <Actions>
                <Button href={contactPage.href} tone="night">
                  {t('home.getInTouch')}
                </Button>
                <CopyEmail />
              </Actions>
            </Reveal>
          </Cta>
        ) : null}

        <Grid>
          <Column>
            <ColTitle>{site.role}</ColTitle>
            <span style={{ fontWeight: 600, fontSize: '1.3125rem' }}>{site.name}</span>
          </Column>
          <Column as="nav" aria-label="Footer">
            <ColTitle>{t('footer.pagesTitle')}</ColTitle>
            {[{ href: '/', key: 'home' }, ...pages, contactPage].map((p) => (
              <FooterLink key={p.key} href={p.href}>
                {t(`nav.${p.key}`)}
              </FooterLink>
            ))}
          </Column>
          <Column>
            <ColTitle>{t('nav.contact')}</ColTitle>
            <ExternalLink href={`mailto:${site.email}`}>Email</ExternalLink>
            <ExternalLink href={`tel:${site.phone.replace(/\s+/g, '')}`}>{site.phone}</ExternalLink>
            {socials.map((s) => (
              <ExternalLink key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </ExternalLink>
            ))}
          </Column>
          <Column>
            <ColTitle>Local time</ColTitle>
            <span style={{ fontSize: '1.0625rem', minHeight: 36, display: 'inline-flex', alignItems: 'center', fontVariantNumeric: 'tabular-nums' }}>
              {time ? `Beirut ${time}` : site.location}
            </span>
            <TopButton type="button" onClick={toTop} style={{ marginTop: 12 }}>
              <span className="disc" aria-hidden="true">
                ↑
              </span>
              Back to top
            </TopButton>
          </Column>
        </Grid>

        {/* The clipping wrapper triggers the reveal; the name rises inside it. */}
        <NameWrap aria-hidden="true" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          <BigName
            variants={{ hidden: { y: '70%', opacity: 0 }, visible: { y: '0%', opacity: 1 } }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {site.name}
          </BigName>
        </NameWrap>

        <Legal>
          <span>
            © {year} {site.name}. {t('footer.rights')}
          </span>
          <span>
            {t('footer.siteBy')}{' '}
            <CreditLink href={site.credit.href} target="_blank" rel="noopener noreferrer">
              {site.credit.name}
            </CreditLink>
          </span>
        </Legal>
      </Inner>
    </Root>
  );
}
