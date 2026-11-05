import Image from "next/image";
import { projects } from "@/lib/data";
import { Icon } from "./Icon";
import { SectionHeading, Tag } from "./ui";

export function Projects() {
  return (
    <section id="projects" className="flex scroll-mt-24 flex-col gap-8">
      <SectionHeading>Projects</SectionHeading>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.name}
            className="group flex flex-col overflow-hidden rounded-2xl border border-teal-500/10 bg-surface-container-low/70 shadow-lg transition-all hover:border-teal-500/30 hover:shadow-xl"
          >
            <div className="relative h-56 w-full overflow-hidden bg-surface-container">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={800}
                height={448}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"
              />
              <span className="absolute top-4 right-4 rounded-full border border-teal-500/20 bg-surface-container-lowest/80 px-3 py-1 font-mono text-label-sm font-semibold text-teal-300 shadow-sm backdrop-blur-md">
                {project.status}
              </span>
            </div>
            <div className="flex flex-col gap-4 p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-headline-md font-bold text-on-surface">
                  {project.name}
                </h3>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} GitHub repository`}
                  className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-teal-300"
                >
                  <Icon name="code" className="text-[18px]" />
                </a>
              </div>
              <p className="text-body-md text-on-surface-variant">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2 pt-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

