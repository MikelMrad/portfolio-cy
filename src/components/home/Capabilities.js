'use client';
import { styled } from '@mui/material/styles';
import Section from '@/components/layout/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import CapabilityRow from '@/components/ui/CapabilityRow';
import Reveal from '@/components/ui/Reveal';
import { capabilities } from '@/content/capabilities';

const List = styled('ul')(({ theme }) => ({
  margin: 0,
  padding: 0,
  borderBottom: `1px solid ${theme.custom.colors.lineDark}`,
}));

export default function Capabilities() {
  return (
    <Section tone="night">
      <SectionLabel tone="night">capabilities</SectionLabel>
      <Reveal>
        <List>
          {capabilities.map((cap) => (
            <CapabilityRow key={cap.index} index={cap.index} title={cap.title} blurb={cap.blurb} />
          ))}
        </List>
      </Reveal>
    </Section>
  );
}
