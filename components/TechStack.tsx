"use client";

import { useState } from "react";
import { techFilters, techItems, type TechCategory } from "@/lib/data";
import { SectionHeading } from "./ui";

export function TechStack() {
  const [filter, setFilter] = useState<"all" | TechCategory>("all");
  const visible = techItems.filter(
    (item) => filter === "all" || item.category === filter,
  );

  return (
    <section id="tech-stack" className="flex scroll-mt-24 flex-col gap-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading>Tech Stack</SectionHeading>
        <div
          role="group"
          aria-label="Filter tech stack"
          className="flex flex-wrap items-center self-start rounded-full bg-surface-container p-1 md:self-auto"
        >
          {techFilters.map(({ id, label }) => {
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(id)}
                className={`rounded-full px-4 py-1.5 font-mono text-label-sm transition-all ${
                  active
                    ? "bg-surface-container-high text-teal-300"
                    : "text-on-surface-variant hover:text-teal-300"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <li
            key={item.name}
            className="flex items-start gap-4 rounded-2xl border border-teal-500/10 bg-surface-container-low/80 p-5 shadow-sm backdrop-blur-md transition-all hover:bg-surface-container"
          >
            <div
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-high font-mono text-label-md font-bold text-teal-400"
            >
              {item.abbr}
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-headline-sm text-on-surface">
                {item.name}
              </span>
              <span className="text-body-sm text-on-surface-variant">
                {item.detail}
              </span>
              <span className="mt-1 font-mono text-label-sm text-teal-400">
                {item.badge}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

