import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  personalProjects,
  professionalProjects,
  type ProjectItem,
} from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

function ProjectGroup({
  title,
  subtitle,
  icon,
  items,
}: {
  title: string;
  subtitle: string;
  icon: string;
  items: readonly ProjectItem[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-teal-500/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Icon name={icon} className="text-[20px] text-primary" />
          <h3 className="text-headline-md font-semibold tracking-tight text-on-surface">
            {title}
          </h3>
        </div>
        <span className="font-mono text-label-sm text-on-surface-variant">
          {subtitle}
        </span>
      </div>

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {items.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </ul>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="gap-12">
      <SectionHeading>Projects</SectionHeading>
      <ProjectGroup
        title="Professional Projects"
        subtitle="Enterprise & Production Systems"
        icon="domain"
        items={professionalProjects}
      />
      <ProjectGroup
        title="Personal Projects"
        subtitle="Independent & Open-Source Explorations"
        icon="terminal"
        items={personalProjects}
      />
    </Section>
  );
}
