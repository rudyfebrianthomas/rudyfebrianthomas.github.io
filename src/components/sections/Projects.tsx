"use client";

import { useId, useState } from "react";
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
  const listId = useId();
  const hasMore = items.length > INITIAL_VISIBLE;
  const visibleItems =
    expanded || !hasMore ? items : items.slice(0, INITIAL_VISIBLE);
  const hiddenCount = items.length - INITIAL_VISIBLE;

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

      <ul id={listId} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {visibleItems.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </ul>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-teal-500/15 bg-surface-container-high/90 px-5 py-2.5 font-mono text-label-sm font-medium text-on-surface shadow-sm transition-all hover:border-teal-500/30 hover:bg-surface-container-highest hover:text-primary active:scale-[0.98]"
          >
            <span>
              {expanded ? "Show less" : `Show ${hiddenCount} more`}
            </span>
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
