'use client';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import SectionLabel from '@/components/ui/SectionLabel';
import TextLink from '@/components/ui/TextLink';
import Type from '@/components/ui/Type';
import ContactForm from './ContactForm';
import { site } from '@/content/site';
import { t } from '@/content/i18n';

const Split = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr', minHeight: '86vh' },
}));

const Panel = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  color: theme.custom.colors.snow,
  backgroundColor: theme.custom.colors.night,
  paddingBlock: 'clamp(32px, 6vw, 88px)',
  paddingLeft: `max(clamp(32px, 6vw, 88px), env(safe-area-inset-left))`,
  paddingRight: `max(clamp(32px, 6vw, 88px), env(safe-area-inset-right))`,
  // Clear the fixed header (mobile height here; desktop height at md+).
  paddingTop: `calc(${theme.custom.layout.header.xs}px + clamp(24px, 6vw, 88px))`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 40,
  // Shorter on mobile so the form is reachable sooner; desktop keeps the tall panel.
  minHeight: 360,
  [theme.breakpoints.up('md')]: {
    paddingTop: `calc(${theme.custom.layout.header.md}px + clamp(32px, 6vw, 88px))`,
    gap: 48,
    minHeight: 480,
  },
}));

const Scrim = styled('div')({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  backgroundColor: 'rgba(10,10,10,0.6)',
});

const Layer = styled('div')({ position: 'relative', zIndex: 2 });

const ContactList = styled('ul')(({ theme }) => ({
  ...theme.custom.type.label,
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}));

const FormCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.custom.colors.paper,
  color: theme.custom.colors.ink,
  paddingBlock: 'clamp(32px, 6vw, 88px)',
  paddingLeft: `max(clamp(32px, 6vw, 88px), env(safe-area-inset-left))`,
  paddingRight: `max(clamp(32px, 6vw, 88px), env(safe-area-inset-right))`,
  // Only the desktop split places this card under the header; on mobile it sits
  // below the panel and needs no header offset.
  [theme.breakpoints.up('md')]: {
    paddingTop: `calc(${theme.custom.layout.header.md}px + clamp(24px, 4vw, 56px))`,
  },
}));

const panelImage = {
  src: '/images/home/belief.svg',
  alt: 'Atmospheric architectural render in the contact panel',
};

export default function ContactView() {
  const telHref = `tel:${site.phone.replace(/\s+/g, '')}`;
  return (
    <Split>
      <Panel>
        <Image src={panelImage.src} alt={panelImage.alt} fill sizes="(min-width:900px) 50vw, 100vw" style={{ objectFit: 'cover', zIndex: 0 }} />
        <Scrim />
        <Layer>
          <SectionLabel tone="night">contact</SectionLabel>
          <Type token="display3" as="h1">
            {t('contact.title')}
          </Type>
        </Layer>
        <Layer>
          <ContactList>
            <li>
              <TextLink href={`mailto:${site.email}`} tone="night" arrow={false}>
                {site.email}
              </TextLink>
            </li>
            <li>
              <TextLink href={telHref} tone="night" arrow={false}>
                {site.phone}
              </TextLink>
            </li>
            <li>{site.location}</li>
          </ContactList>
        </Layer>
      </Panel>

      <FormCard>
        <Type token="hSmall" as="h2">
          {t('contact.formTitle')}
        </Type>
        <ContactForm />
      </FormCard>
    </Split>
  );
}
