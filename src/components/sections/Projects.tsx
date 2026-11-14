"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import type { ProjectItem } from "@/lib/data";
import {
  getPortfolioContent,
  type LocalizedPortfolioContent,
  useLocale,
} from "@/lib/i18n";
import { useCardTooltip } from "@/lib/useCardTooltip";
import { useHorizontalCarousel } from "@/lib/useHorizontalCarousel";
import { ProjectCard } from "./ProjectCard";

function ProjectGroup({
  title,
  subtitle,
  icon,
  items,
  labels,
}: {
  title: string;
  subtitle: string;
  icon: string;
  items: readonly ProjectItem[];
  labels: LocalizedPortfolioContent["projectsSection"];
}) {
  const [paused, setPaused] = useState(false);
  const { tooltip, wrapperRef, tooltipId, show, togglePin, clearHover, clear } =
    useCardTooltip<ProjectItem>(384);

  const { listRef, canLoop, isDragging, containerHandlers } =
    useHorizontalCarousel({
      itemCount: items.length,
      paused,
      onUserInteract: clear,
    });

  const renderedItems = canLoop ? [...items, ...items] : items;
  const singleItem = items.length === 1;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col justify-between gap-2 border-b border-teal-500/10 pb-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <Icon name={icon} className="text-[20px] text-primary" />
          <h3 className="text-[20px] font-semibold tracking-tight text-on-surface sm:text-headline-md">
            {title}
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2.5 font-mono text-label-sm text-on-surface-variant sm:justify-end">
          <span>{subtitle}</span>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-teal-500/15 bg-surface-container px-2.5 py-0.5 tabular-nums text-primary">
              {items.length}
            </span>
            {canLoop && (
              <button
                type="button"
                aria-pressed={paused}
                aria-label={
                  paused
                    ? `${labels.resumePrefix} ${title}`
                    : `${labels.pausePrefix} ${title}`
                }
                title={
                  paused
                    ? `${labels.resumePrefix} ${title}`
                    : `${labels.pausePrefix} ${title}`
                }
                onClick={() => setPaused((p) => !p)}
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-teal-500/15 bg-surface-container text-on-surface-variant transition-[transform,background-color,color] duration-150 hover:-translate-y-px hover:bg-surface-container-high hover:text-primary active:translate-y-px active:scale-[0.985]"
              >
                <Icon
                  name={paused ? "play_arrow" : "pause"}
                  className="text-[16px]"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="-mt-2 font-mono text-label-sm text-on-surface-variant sm:hidden">
        {labels.touchHint}
      </p>

      <div
        ref={wrapperRef}
        className="relative"
        onMouseEnter={containerHandlers.onMouseEnter}
        onMouseLeave={() => {
          containerHandlers.onMouseLeave();
          clearHover();
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
          aria-label={`${title} ${labels.carouselSuffix}`}
          className={`-mx-0.5 flex select-none gap-4 overflow-x-auto overscroll-x-contain rounded-2xl px-0.5 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:gap-6 ${
            canLoop
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : ""
          }`}
        >
          {renderedItems.map((project, index) => {
            const isDuplicate = canLoop && index >= items.length;
            const isInspected = tooltip?.index === index;
            const visitLabel = labels.visitSuffix
              ? `${labels.visitPrefix} ${project.name} ${labels.visitSuffix}`
              : `${labels.visitPrefix} ${project.name}`;
            return (
              <ProjectCard
                key={isDuplicate ? `${project.name}-dup` : project.name}
                project={project}
                isDuplicate={isDuplicate}
                singleItem={singleItem}
                isInspected={isInspected}
                describedById={isInspected ? tooltipId : undefined}
                repoLabel={`${project.name} ${labels.repoLabelSuffix}`}
                visitLabel={visitLabel}
                onInspectStart={(cardEl) => {
                  if (!isDragging) show(project, index, cardEl);
                }}
                onInspectToggle={(cardEl) => {
                  if (!isDragging) togglePin(project, index, cardEl);
                }}
                onInspectEnd={clearHover}
              />
            );
          })}
        </ul>

        {canLoop && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-background/85 to-transparent sm:w-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-background via-background/70 to-transparent sm:w-14"
            />
          </>
        )}

        {tooltip && (
          <div
            id={tooltipId}
            role="tooltip"
            style={{ left: `${tooltip.x}px` }}
            className={`pointer-events-none absolute z-30 flex w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 flex-col gap-3 rounded-xl border border-teal-500/25 bg-surface-container-lowest/95 p-4 text-left shadow-xl backdrop-blur-md ${
              tooltip.placement === "bottom"
                ? "top-full mt-3"
                : "bottom-full mb-3"
            }`}
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
  const [locale] = useLocale();
  const { projectsSection } = getPortfolioContent(locale);

  return (
    <Section id="projects" className="gap-6 sm:gap-8">
      <SectionHeading>{projectsSection.heading}</SectionHeading>
      <div className="flex flex-col gap-10 sm:gap-12">
        <ProjectGroup
          title={projectsSection.professionalTitle}
          subtitle={projectsSection.professionalSubtitle}
          icon="domain"
          items={projectsSection.professional}
          labels={projectsSection}
        />
        <ProjectGroup
          title={projectsSection.personalTitle}
          subtitle={projectsSection.personalSubtitle}
          icon="terminal"
          items={projectsSection.personal}
          labels={projectsSection}
        />
      </div>
    </Section>
  );
}
