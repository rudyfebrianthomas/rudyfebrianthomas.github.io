import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
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
  describedById,
  onInspectStart,
  onInspectEnd,
}: {
  project: ProjectItem;
  isDuplicate?: boolean;
  singleItem?: boolean;
  describedById?: string;
  onInspectStart?: (el: HTMLLIElement) => void;
  onInspectEnd?: () => void;
}) {
  const linkTabIndex = isDuplicate ? -1 : undefined;
  return (
    <li
      aria-hidden={isDuplicate || undefined}
      tabIndex={isDuplicate ? undefined : 0}
      aria-describedby={describedById}
      onMouseEnter={(e) => onInspectStart?.(e.currentTarget)}
      onMouseLeave={() => onInspectEnd?.()}
      onFocus={(e) => {
        if (!isDuplicate) onInspectStart?.(e.currentTarget);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onInspectEnd?.();
        }
      }}
      className={`group flex shrink-0 flex-col overflow-hidden rounded-2xl border border-teal-500/12 bg-surface-container-low transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        singleItem ? "w-full sm:w-84" : "w-76 sm:w-84"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-surface-container-low/60 to-transparent"
        />
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            tabIndex={linkTabIndex}
            draggable={false}
            className="absolute top-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full border border-teal-500/20 bg-surface-container-lowest/90 px-2.5 py-1 font-mono text-label-sm text-on-surface shadow-sm backdrop-blur-md transition-colors duration-150 hover:border-teal-500/40 hover:text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="truncate">{getHostname(project.demoUrl)}</span>
            <Icon name="north_east" className="text-[13px]" />
          </a>
        )}
      </div>
      <div className="flex items-start justify-between gap-2 p-4 sm:p-5">
        <h4 className="text-headline-sm font-semibold tracking-tight text-on-surface">
          {project.name}
        </h4>
        <div className="flex shrink-0 items-center gap-0.5">
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
    </li>
  );
}
