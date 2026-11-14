"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  techFilters,
  techItems,
  type TechCategory,
  type TechItem,
} from "@/lib/data";
import { useCardTooltip } from "@/lib/useCardTooltip";
import { useHorizontalCarousel } from "@/lib/useHorizontalCarousel";

const TECH_ICON_MAP: Record<
  string,
  { src: string } | { material: string }
> = {
  RE: { src: "/icons/tech/react.svg" },
  NX: { src: "/icons/tech/nextjs.svg" },
  VU: { src: "/icons/tech/vue.svg" },
  RX: { src: "/icons/tech/redux.svg" },
  TW: { src: "/icons/tech/tailwindcss.svg" },
  ND: { src: "/icons/tech/nodejs.svg" },
  TS: { src: "/icons/tech/typescript.svg" },
  HC: { src: "/icons/tech/html-5.svg" },
  AG: { material: "view_kanban" },
  JC: { src: "/icons/tech/git-icon.svg" },
  TM: { material: "groups" },
  LN: { material: "translate" },
};

export function TechStack() {
  const [filter, setFilter] = useState<"all" | TechCategory>("all");
  const { tooltip, wrapperRef, tooltipId, show, clear } =
    useCardTooltip<TechItem>(288);

  const visible = techItems.filter(
    (item) => filter === "all" || item.category === filter,
  );

  const { listRef, canLoop, isDragging, reset, containerHandlers } =
    useHorizontalCarousel({
      itemCount: visible.length,
      onUserInteract: clear,
    });

  const renderedItems = canLoop ? [...visible, ...visible] : visible;

  const handleFilterChange = (id: "all" | TechCategory) => {
    setFilter(id);
    clear();
    reset();
  };

  return (
    <Section id="tech-stack" className="gap-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading>Tech Stack</SectionHeading>
        <div
          role="group"
          aria-label="Filter tech stack"
          className="flex flex-wrap items-center self-start rounded-2xl bg-surface-container p-1 md:self-auto md:rounded-full"
        >
          {techFilters.map(({ id, label }) => {
            const active = filter === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => handleFilterChange(id)}
                className={`min-h-11 rounded-full px-4 py-1.5 font-mono text-label-sm transition-all md:min-h-0 ${
                  active
                    ? "bg-surface-container-high font-semibold text-primary dark:text-teal-300"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {label}
              </button>
            );
          })}
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
          aria-label="Tech stack carousel"
          className={`-mx-0.5 flex select-none gap-4 overflow-x-auto overscroll-x-contain rounded-2xl px-0.5 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
            canLoop
              ? isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
              : ""
          }`}
        >
          {renderedItems.map((item, index) => {
            const isDuplicate = canLoop && index >= visible.length;
            const icon = TECH_ICON_MAP[item.abbr];
            const isTooltipActive = tooltip?.index === index;
            return (
              <li
                key={isDuplicate ? `${item.name}-dup` : item.name}
                aria-hidden={isDuplicate || undefined}
                tabIndex={isDuplicate ? undefined : 0}
                aria-describedby={isTooltipActive ? tooltipId : undefined}
                onMouseEnter={(e) => {
                  if (!isDragging) show(item, index, e.currentTarget);
                }}
                onMouseLeave={clear}
                onFocus={(e) => {
                  if (!isDuplicate && !isDragging) {
                    show(item, index, e.currentTarget);
                  }
                }}
                onBlur={clear}
                className="flex w-44 shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-teal-500/12 bg-surface-container-low px-4 py-6 text-center transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500/30 hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-48"
              >
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-xs ring-1 ring-black/5 dark:bg-slate-100 dark:ring-white/10"
                >
                  {icon && "src" in icon ? (
                    <Image
                      src={icon.src}
                      alt=""
                      width={36}
                      height={36}
                      draggable={false}
                      className="h-9 w-9 object-contain"
                    />
                  ) : (
                    <Icon
                      name={icon?.material ?? "code"}
                      className="text-[28px] text-teal-700"
                    />
                  )}
                </div>
                <span className="text-body-sm font-semibold leading-snug text-on-surface">
                  {item.name}
                </span>
              </li>
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
            className="pointer-events-none absolute bottom-full z-30 mb-3 w-72 -translate-x-1/2 rounded-xl border border-teal-500/20 bg-surface-container-lowest/95 px-4 py-3 text-left shadow-xl backdrop-blur-md"
          >
            <span className="block font-mono text-label-sm text-primary">
              {tooltip.data.badge}
            </span>
            <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">
              {tooltip.data.detail}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}

