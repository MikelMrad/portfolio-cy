import Section from '@/components/layout/Section';
import Type from '@/components/ui/Type';
import Reveal from '@/components/ui/Reveal';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { projects } from '@/content/projects';

export const metadata = {
  title: 'Projects',
  description: 'Seven academic architecture projects — civic, cultural, residential and temporary.',
};

export default function ProjectsPage() {
  return (
    <Section tone="paper">
      <Reveal>
        <Type token="display1" as="h1">
          Projects
        </Type>
        <Type token="intro" as="p" muted sx={{ maxWidth: '34ch', marginTop: '16px', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          A collection of academic work: civic, cultural and residential.
        </Type>
      </Reveal>
      <ProjectsGrid projects={projects} />
    </Section>
  );
}
