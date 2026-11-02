'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import ContactForm from './ContactForm';
import { site } from '@/content/site';
import { t } from '@/content/i18n';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 20,
  alignItems: 'start',
  marginTop: 'clamp(40px, 6vw, 72px)',
  [theme.breakpoints.up('md')]: { gridTemplateColumns: '5fr 7fr' },
}));

// Grouped inset list: label over value, separated rows, one rounded group.
const Group = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  margin: 0,
  padding: '0 20px',
  borderRadius: theme.custom.radius.card,
  backgroundColor: theme.custom.colors.bgAlt,
  '& li + li': { borderTop: `1px solid ${theme.custom.colors.separator}` },
}));

const Item = styled('li')(({ theme }) => ({
  paddingBlock: 16,
  '& .k': { ...theme.custom.type.label, color: theme.custom.colors.label2, display: 'block' },
  '& .v': { ...theme.custom.type.body, color: theme.custom.colors.label },
  '& a.v': { display: 'inline-flex', alignItems: 'center', minHeight: 44, marginBlock: -10 },
  '& a.v:hover': { textDecoration: 'underline', textUnderlineOffset: '0.15em' },
}));

const FormCard = styled('div')(({ theme }) => ({
  padding: 'clamp(24px, 4vw, 40px)',
  borderRadius: theme.custom.radius.tile,
  backgroundColor: theme.custom.colors.bgAlt,
}));

export default function ContactView() {
  const telHref = `tel:${site.phone.replace(/\s+/g, '')}`;
  return (
    <Section tone="paper">
      <Reveal>
        <SectionLabel>Contact</SectionLabel>
        <Type token="display1" as="h1">
          {t('contact.title')}
        </Type>
      </Reveal>
      <Grid>
        <Reveal delay={0.1}>
          <Group>
            <Item>
              <span className="k">{t('contact.email')}</span>
              <a className="v" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </Item>
            <Item>
              <span className="k">Phone</span>
              <a className="v" href={telHref}>
                {site.phone}
              </a>
            </Item>
            {site.socials.map((s) => (
              <Item key={s.label}>
                <span className="k">{s.label}</span>
                <a className="v" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </a>
              </Item>
            ))}
            <Item>
              <span className="k">Based in</span>
              <span className="v">{site.location}</span>
            </Item>
          </Group>
        </Reveal>
        <Reveal delay={0.2}>
          <FormCard>
            <Type token="hSmall" as="h2">
              {t('contact.formTitle')}
            </Type>
            <ContactForm />
          </FormCard>
        </Reveal>
      </Grid>
    </Section>
  );
}
