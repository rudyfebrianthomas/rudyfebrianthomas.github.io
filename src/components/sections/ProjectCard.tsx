import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { TagList } from "@/components/ui/Tag";
import type { ProjectItem } from "@/lib/data";
import { getHostname } from "@/lib/url";

function ProjectIconLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
    >
      <Icon name={icon} className="text-[18px]" />
    </a>
  );
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-2xl border border-teal-500/10 bg-surface-container-low/70 shadow-lg transition-all hover:border-teal-500/30 hover:shadow-xl">
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
                <ProjectIconLink
                  href={project.repoUrl}
                  icon="code"
                  label={`${project.name} GitHub repository`}
                />
              )}
              {project.demoUrl && (
                <ProjectIconLink
                  href={project.demoUrl}
                  icon="open_in_new"
                  label={`Visit ${project.name} live site`}
                />
              )}
            </div>
          </div>
          <p className="text-body-md leading-relaxed text-on-surface-variant">
            {project.description}
          </p>
        </div>
        <TagList tags={project.stack} className="pt-2" />
      </div>
    </li>
  );
}
