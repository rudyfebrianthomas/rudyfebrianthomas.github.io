"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techFilters, techItems, type TechCategory } from "@/lib/data";

export function TechStack() {
  const [filter, setFilter] = useState<"all" | TechCategory>("all");
  const [scrollState, setScrollState] = useState({
    canLeft: false,
    canRight: false,
    progress: 0,
  });
  const listRef = useRef<HTMLUListElement>(null);

  const visible = techItems.filter(
    (item) => filter === "all" || item.category === filter,
  );
  const isScrollable = scrollState.canLeft || scrollState.canRight;

  const readScrollState = (el: HTMLUListElement) => {
    const maxScroll = Math.max(el.scrollWidth - el.clientWidth, 0);
    return {
      canLeft: el.scrollLeft > 4,
      canRight: el.scrollLeft < maxScroll - 4,
      progress: maxScroll > 0 ? Math.min(el.scrollLeft / maxScroll, 1) : 1,
    };
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const sync = () => setScrollState(readScrollState(el));
    const observer = new ResizeObserver(sync);
    observer.observe(el);

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 1) return;

      const step =
        e.deltaMode === 1
          ? e.deltaY * 20
          : e.deltaMode === 2
            ? e.deltaY * el.clientWidth
            : e.deltaY;
      const scrollingRight = step > 0 && el.scrollLeft < maxScroll - 1;
      const scrollingLeft = step < 0 && el.scrollLeft > 1;
      if (!scrollingRight && !scrollingLeft) return;

      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += step;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      observer.disconnect();
      el.removeEventListener("wheel", onWheel);
    };
  }, [filter]);

  const handleFilterChange = (id: "all" | TechCategory) => {
    setFilter(id);
    if (listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  };

  const scrollByStep = (direction: -1 | 1) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.max(el.clientWidth * 0.75, 280),
      behavior: "smooth",
    });
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

      <div className="relative">
        <ul
          ref={listRef}
          tabIndex={isScrollable ? 0 : undefined}
          aria-label="Tech stack carousel"
          onScroll={(e) => setScrollState(readScrollState(e.currentTarget))}
          className="-mx-0.5 flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain rounded-2xl px-0.5 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {visible.map((item) => (
            <li
              key={item.name}
              className="flex w-[84%] shrink-0 snap-start items-start gap-4 rounded-2xl border border-teal-500/12 bg-surface-container-low p-5 transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500/30 hover:bg-surface-container sm:w-[47%] lg:w-[32%]"
            >
              <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-high font-mono text-label-md font-bold text-primary"
              >
                {item.abbr}
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-headline-sm text-on-surface">
                  {item.name}
                </span>
                <span className="text-body-sm leading-relaxed text-on-surface-variant">
                  {item.detail}
                </span>
                <span className="mt-1 font-mono text-label-sm text-primary">
                  {item.badge}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {scrollState.canLeft && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-background/85 to-transparent"
          />
        )}
        {scrollState.canRight && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-linear-to-l from-background via-background/70 to-transparent"
          />
        )}
      </div>

      {isScrollable && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-label-sm text-on-surface-variant">
            <Icon name="swap_horiz" className="text-[16px] text-primary" />
            <span>Scroll wheel to explore ({visible.length})</span>
            <span
              aria-hidden="true"
              className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-container-highest"
            >
              <span
                className="block h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
                style={{
                  width: `${Math.max(
                    Math.round(scrollState.progress * 100),
                    16,
                  )}%`,
                }}
              />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll tech stack left"
              disabled={!scrollState.canLeft}
              onClick={() => scrollByStep(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-500/15 bg-surface-container-high text-on-surface transition-colors hover:border-teal-500/35 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <Icon name="chevron_left" className="text-[20px]" />
            </button>
            <button
              type="button"
              aria-label="Scroll tech stack right"
              disabled={!scrollState.canRight}
              onClick={() => scrollByStep(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-500/15 bg-surface-container-high text-on-surface transition-colors hover:border-teal-500/35 hover:text-primary disabled:pointer-events-none disabled:opacity-40"
            >
              <Icon name="chevron_right" className="text-[20px]" />
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

