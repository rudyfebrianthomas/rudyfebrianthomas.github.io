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
      title={label}
      tabIndex={tabIndex}
      draggable={false}
      className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-[transform,background-color,color] duration-150 hover:bg-surface-container hover:text-primary active:scale-[0.96]"
    >
      <Icon name={icon} className="text-[18px]" />
    </a>
  );
}

export function ProjectCard({
  project,
  isDuplicate = false,
  singleItem = false,
  isInspected = false,
  describedById,
  repoLabel,
  visitLabel,
  onInspectStart,
  onInspectToggle,
  onInspectEnd,
}: {
  project: ProjectItem;
  isDuplicate?: boolean;
  singleItem?: boolean;
  isInspected?: boolean;
  describedById?: string;
  repoLabel: string;
  visitLabel: string;
  onInspectStart?: (el: HTMLLIElement) => void;
  onInspectToggle?: (el: HTMLLIElement) => void;
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
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        onInspectToggle?.(e.currentTarget);
      }}
      onFocus={(e) => {
        if (!isDuplicate) onInspectStart?.(e.currentTarget);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onInspectEnd?.();
        }
      }}
      className={`group flex shrink-0 flex-col overflow-hidden rounded-2xl border bg-surface-container-low transition-[transform,border-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:border-teal-500/35 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        isInspected ? "border-teal-500/40 shadow-lg" : "border-teal-500/12"
      } ${
        singleItem
          ? "w-full sm:w-84"
          : "w-[min(19rem,calc(100vw-2.5rem))] sm:w-84"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-surface-container-low/65 to-transparent"
        />
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            tabIndex={linkTabIndex}
            draggable={false}
            className="absolute top-3 left-3 inline-flex min-h-8 max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full border border-teal-500/25 bg-surface-container-lowest/95 px-2.5 py-1 font-mono text-label-sm text-on-surface shadow-sm backdrop-blur-md transition-colors duration-150 hover:border-teal-500/45 hover:text-primary"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span className="truncate">{getHostname(project.demoUrl)}</span>
            <Icon name="north_east" className="text-[13px]" />
          </a>
        )}
      </div>
      <div className="flex items-start justify-between gap-2 p-4 sm:p-5">
        <h4 className="min-w-0 text-headline-sm font-semibold tracking-tight text-on-surface">
          {project.name}
        </h4>
        <div className="flex shrink-0 items-center gap-0.5">
          {project.repoUrl && (
            <ProjectIconLink
              href={project.repoUrl}
              icon="code"
              label={repoLabel}
              tabIndex={linkTabIndex}
            />
          )}
          {project.demoUrl && (
            <ProjectIconLink
              href={project.demoUrl}
              icon="open_in_new"
              label={visitLabel}
              tabIndex={linkTabIndex}
            />
          )}
        </div>
      </div>
    </li>
  );
}
