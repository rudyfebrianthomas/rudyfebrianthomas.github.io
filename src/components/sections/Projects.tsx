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
  const [scrollState, setScrollState] = useState({
    progress: 0,
    atTop: true,
    atBottom: false,
  });
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const hasMore = items.length > INITIAL_VISIBLE;
  const isScrollable = expanded && items.length > EXPANDED_VISIBLE;
  const visibleItems =
    expanded || !hasMore ? items : items.slice(0, INITIAL_VISIBLE);
  const extraCount = items.length - EXPANDED_VISIBLE;

  const readScrollState = (el: HTMLUListElement) => {
    const maxScroll = Math.max(el.scrollHeight - el.clientHeight, 0);
    const progress = maxScroll > 0 ? Math.min(el.scrollTop / maxScroll, 1) : 1;
    return {
      progress,
      atTop: el.scrollTop <= 4,
      atBottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 4,
    };
  };

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
      setScrollState(readScrollState(el));
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
    if (expanded && listRef.current) {
      listRef.current.scrollTop = 0;
    }
    setExpanded((prev) => !prev);
    setScrollState({ progress: 0, atTop: true, atBottom: false });
  };

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    setScrollState(readScrollState(e.currentTarget));
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
        <div className="flex items-center gap-3 font-mono text-label-sm text-on-surface-variant">
          <span>{subtitle}</span>
          <span className="rounded-full border border-teal-500/15 bg-surface-container px-2.5 py-0.5 tabular-nums text-primary">
            {visibleItems.length}/{items.length}
          </span>
        </div>
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
              ? "-mx-0.5 overflow-y-auto overscroll-contain rounded-2xl px-0.5 pt-1 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              : ""
          }`}
        >
          {visibleItems.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </ul>

        {isScrollable && !scrollState.atTop && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-background/85 to-transparent"
          />
        )}

        {isScrollable && !scrollState.atBottom && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background via-background/80 to-transparent"
          />
        )}
      </div>

      {hasMore && (
        <div className="flex flex-col items-center gap-3 pt-1">
          {isScrollable && (
            <div className="flex items-center gap-3 rounded-full border border-teal-500/12 bg-surface-container-low px-3.5 py-1.5 font-mono text-label-sm text-on-surface-variant">
              <Icon
                name={scrollState.atBottom ? "check" : "swipe_vertical"}
                className="text-[15px] text-primary"
              />
              <span>
                {scrollState.atBottom
                  ? `All ${items.length} projects viewed`
                  : `Scroll list · ${extraCount} more below`}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-12 overflow-hidden rounded-full bg-surface-container-highest"
              >
                <span
                  className="block h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
                  style={{
                    width: `${Math.max(
                      Math.round(scrollState.progress * 100),
                      18,
                    )}%`,
                  }}
                />
              </span>
            </div>
          )}

          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={handleToggle}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-teal-500/20 bg-surface-container-high px-6 py-2.5 font-mono text-label-sm font-medium text-on-surface transition-[transform,background-color,border-color,color] duration-150 ease-out hover:-translate-y-px hover:border-teal-500/40 hover:bg-surface-container-highest hover:text-primary active:translate-y-px active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>{expanded ? "Show Less" : "Show More"}</span>
            <Icon
              name="expand_more"
              className={`text-[18px] text-primary transition-transform duration-200 ease-out ${
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
