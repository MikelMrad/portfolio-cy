import Section from '@/components/layout/Section';
import HeaderSpacer from '@/components/layout/HeaderSpacer';
import SectionLabel from '@/components/ui/SectionLabel';
import Type from '@/components/ui/Type';
import Hairline from '@/components/ui/Hairline';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { projects } from '@/content/projects';

export const metadata = {
  title: 'Projects',
  description: 'Seven academic architecture projects — civic, cultural, residential and temporary.',
};

export default function ProjectsPage() {
  return (
    <>
      <HeaderSpacer />
      <Section tone="paper">
      <SectionLabel>projects</SectionLabel>
      <Type token="display3" as="h1" style={{ maxWidth: '20ch' }}>
        A collection of academic work — civic, cultural and residential.
      </Type>
      <Hairline style={{ marginTop: 32 }} />
      <ProjectsGrid projects={projects} />
      </Section>
    </>
  );
}
