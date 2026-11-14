"use client";

import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import {
  personalProjects,
  professionalProjects,
  type ProjectItem,
} from "@/lib/data";
import { useCardTooltip } from "@/lib/useCardTooltip";
import { useHorizontalCarousel } from "@/lib/useHorizontalCarousel";
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
  const { tooltip, wrapperRef, tooltipId, show, clear } =
    useCardTooltip<ProjectItem>(384);

  const { listRef, canLoop, isDragging, containerHandlers } =
    useHorizontalCarousel({
      itemCount: items.length,
      onUserInteract: clear,
    });

  const renderedItems = canLoop ? [...items, ...items] : items;
  const singleItem = items.length === 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-teal-500/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Icon name={icon} className="text-[20px] text-primary" />
          <h3 className="text-headline-md font-semibold tracking-tight text-on-surface">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-3 font-mono text-label-sm text-on-surface-variant">
          <span>{subtitle}</span>
          <span className="rounded-full border border-teal-500/15 bg-surface-container px-2.5 py-0.5 tabular-nums text-primary">
            {items.length}
          </span>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="relative"
        onMouseEnter={containerHandlers.onMouseEnter}
        onMouseLeave={() => {
          containerHandlers.onMouseLeave();
          clear();
        }}
        onFocus={containerHandlers.onFocus}
        onBlur={(e) => {
          containerHandlers.onBlur(e);
          if (!e.currentTarget.contains(e.relatedTarget)) {
            clear();
          }
        }}
      >
        <ul
          ref={listRef}
          tabIndex={canLoop ? 0 : undefined}
          aria-label={`${title} carousel`}
          className={`-mx-0.5 flex select-none gap-5 overflow-x-auto overscroll-x-contain rounded-2xl px-0.5 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:gap-6 ${
            canLoop
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : ""
          }`}
        >
          {renderedItems.map((project, index) => {
            const isDuplicate = canLoop && index >= items.length;
            return (
              <ProjectCard
                key={isDuplicate ? `${project.name}-dup` : project.name}
                project={project}
                isDuplicate={isDuplicate}
                singleItem={singleItem}
                describedById={tooltip?.index === index ? tooltipId : undefined}
                onInspectStart={(cardEl) => {
                  if (!isDragging) show(project, index, cardEl);
                }}
                onInspectEnd={clear}
              />
            );
          })}
        </ul>

        {canLoop && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-background/85 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-linear-to-l from-background via-background/70 to-transparent"
            />
          </>
        )}

        {tooltip && (
          <div
            id={tooltipId}
            role="tooltip"
            style={{ left: `${tooltip.x}px` }}
            className="pointer-events-none absolute bottom-full z-30 mb-3 flex w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 flex-col gap-3 rounded-xl border border-teal-500/20 bg-surface-container-lowest/95 p-4 text-left shadow-xl backdrop-blur-md"
          >
            <p className="text-body-sm leading-relaxed text-on-surface-variant">
              {tooltip.data.description}
            </p>
            <TagList tags={tooltip.data.stack} />
          </div>
        )}
      </div>
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
