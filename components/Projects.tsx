import Image from "next/image";
import {
  personalProjects,
  professionalProjects,
  type ProjectItem,
} from "@/lib/data";
import { Icon } from "./Icon";
import { SectionHeading, Tag } from "./ui";

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <li
      className="group flex flex-col overflow-hidden rounded-2xl border border-teal-500/10 bg-surface-container-low/70 shadow-lg transition-all hover:border-teal-500/30 hover:shadow-xl"
    >
      <div className="relative h-56 w-full overflow-hidden bg-surface-container">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={800}
          height={500}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-surface-container-low via-transparent to-transparent"
        />
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute top-4 left-4 inline-flex max-w-[calc(100%-7rem)] items-center gap-1.5 rounded-full border border-teal-500/20 bg-surface-container-lowest/85 px-3 py-1 font-mono text-label-sm text-on-surface shadow-sm backdrop-blur-md transition-colors hover:border-teal-500/40 hover:text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="truncate">{getHostname(project.demoUrl)}</span>
            <Icon name="north_east" className="text-[13px]" />
          </a>
        )}
        <span className="absolute top-4 right-4 rounded-full border border-teal-500/20 bg-surface-container-lowest/85 px-3 py-1 font-mono text-label-sm font-semibold text-teal-700 shadow-sm backdrop-blur-md dark:text-teal-300">
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-headline-md font-bold text-on-surface">
              {project.name}
            </h4>
            <div className="flex shrink-0 items-center gap-1.5">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} GitHub repository`}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
                >
                  <Icon name="code" className="text-[18px]" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${project.name} live site`}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
                >
                  <Icon name="open_in_new" className="text-[18px]" />
                </a>
              )}
            </div>
          </div>
          <p className="text-body-md leading-relaxed text-on-surface-variant">
            {project.description}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

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
    <section id="projects" className="flex scroll-mt-44 md:scroll-mt-24 flex-col gap-12">
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
    </section>
  );
}
