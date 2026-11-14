"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  personalProjects,
  professionalProjects,
  type ProjectItem,
} from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

const INITIAL_VISIBLE = 2;
const EXPANDED_VISIBLE = 4;

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
  const [expanded, setExpanded] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const hasMore = items.length > INITIAL_VISIBLE;
  const isScrollable = expanded && items.length > EXPANDED_VISIBLE;
  const visibleItems =
    expanded || !hasMore ? items : items.slice(0, INITIAL_VISIBLE);

  useEffect(() => {
    const el = listRef.current;
    if (!el || !isScrollable) return;

    const updateMaxHeight = () => {
      const fourth = el.children[EXPANDED_VISIBLE - 1] as
        | HTMLElement
        | undefined;
      if (!fourth) return;
      // Leave a small peek into the 5th item so the bottom fade signals overflow.
      el.style.maxHeight = `${fourth.offsetTop + fourth.offsetHeight + 48}px`;
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
    };

    updateMaxHeight();
    const observer = new ResizeObserver(updateMaxHeight);
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.style.maxHeight = "";
    };
  }, [isScrollable, items.length]);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
    setAtBottom(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const el = e.currentTarget;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
  };

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

      <div className="relative">
        <ul
          ref={listRef}
          id={listId}
          data-lenis-prevent={isScrollable ? true : undefined}
          tabIndex={isScrollable ? 0 : undefined}
          aria-label={isScrollable ? `${title} scrollable list` : undefined}
          onScroll={isScrollable ? handleScroll : undefined}
          className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${
            isScrollable
              ? "overflow-y-auto overscroll-contain rounded-2xl pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/60"
              : ""
          }`}
        >
          {visibleItems.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </ul>

        {isScrollable && !atBottom && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background via-background/75 to-transparent"
          />
        )}
      </div>

      {isScrollable && (
        <p className="flex items-center justify-center gap-1.5 font-mono text-label-sm text-on-surface-variant">
          <Icon
            name={atBottom ? "check" : "swipe_vertical"}
            className="text-[16px] text-primary"
          />
          <span>
            {atBottom
              ? `Showing all ${items.length} projects`
              : `Scroll list to view ${items.length - EXPANDED_VISIBLE} more`}
          </span>
        </p>
      )}

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={handleToggle}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-teal-500/15 bg-surface-container-high/90 px-5 py-2.5 font-mono text-label-sm font-medium text-on-surface shadow-sm transition-all hover:border-teal-500/30 hover:bg-surface-container-highest hover:text-primary active:scale-[0.98]"
          >
            <span>{expanded ? "Show Less" : "Show More"}</span>
            <Icon
              name="expand_more"
              className={`text-[18px] text-primary transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}
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
