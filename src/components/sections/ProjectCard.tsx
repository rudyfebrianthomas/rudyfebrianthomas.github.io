import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { TagList } from "@/components/ui/Tag";
import type { ProjectItem } from "@/lib/data";
import { getHostname } from "@/lib/url";

function ProjectIconLink({
  href,
  icon,
  label,
  tabIndex,
}: {
  href: string;
  icon: string;
  label: string;
  tabIndex?: number;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      tabIndex={tabIndex}
      draggable={false}
      className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
    >
      <Icon name={icon} className="text-[18px]" />
    </a>
  );
}

export function ProjectCard({
  project,
  isDuplicate = false,
  singleItem = false,
}: {
  project: ProjectItem;
  isDuplicate?: boolean;
  singleItem?: boolean;
}) {
  const linkTabIndex = isDuplicate ? -1 : undefined;
  return (
    <li
      aria-hidden={isDuplicate || undefined}
      className={`group flex shrink-0 flex-col overflow-hidden rounded-2xl border border-teal-500/12 bg-surface-container-low transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-lg ${
        singleItem ? "w-full md:w-[calc(50%-1rem)]" : "w-[88%] md:w-[calc(50%-1rem)]"
      }`}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden border-b border-teal-500/10 bg-surface-container">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={800}
          height={500}
          draggable={false}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-surface-container-low/60 to-transparent"
        />
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            tabIndex={linkTabIndex}
            draggable={false}
            className="absolute top-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-1.5 rounded-full border border-teal-500/20 bg-surface-container-lowest/90 px-3 py-1 font-mono text-label-sm text-on-surface shadow-sm backdrop-blur-md transition-colors duration-150 hover:border-teal-500/40 hover:text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="truncate">{getHostname(project.demoUrl)}</span>
            <Icon name="north_east" className="text-[13px]" />
          </a>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-5 p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-headline-md font-semibold tracking-tight text-on-surface">
              {project.name}
            </h4>
            <div className="flex shrink-0 items-center gap-1">
              {project.repoUrl && (
                <ProjectIconLink
                  href={project.repoUrl}
                  icon="code"
                  label={`${project.name} GitHub repository`}
                  tabIndex={linkTabIndex}
                />
              )}
              {project.demoUrl && (
                <ProjectIconLink
                  href={project.demoUrl}
                  icon="open_in_new"
                  label={`Visit ${project.name} live site`}
                  tabIndex={linkTabIndex}
                />
              )}
            </div>
          </div>
          <p className="text-body-md leading-relaxed text-on-surface-variant">
            {project.description}
          </p>
        </div>
        <TagList tags={project.stack} className="pt-1" />
      </div>
    </li>
  );
}
