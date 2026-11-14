"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techFilters, techItems, type TechCategory } from "@/lib/data";

const AUTO_SCROLL_PX_PER_SEC = 28;
const USER_COOLDOWN_MS = 2500;

export function TechStack() {
  const [filter, setFilter] = useState<"all" | TechCategory>("all");
  const [paused, setPaused] = useState(false);
  const [scrollState, setScrollState] = useState({
    canLeft: false,
    canRight: false,
    progress: 0,
  });
  const listRef = useRef<HTMLUListElement>(null);
  const scrollPosRef = useRef(0);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);
  const cooldownUntilRef = useRef(0);
  const autoSteppingRef = useRef(false);

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

    const sync = () => {
      scrollPosRef.current = el.scrollLeft;
      setScrollState(readScrollState(el));
    };
    const observer = new ResizeObserver(sync);
    observer.observe(el);

    const markUserScroll = () => {
      cooldownUntilRef.current = performance.now() + USER_COOLDOWN_MS;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        if (Math.abs(e.deltaX) > 0) markUserScroll();
        return;
      }
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
      markUserScroll();
      el.scrollLeft += step;
      scrollPosRef.current = el.scrollLeft;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", markUserScroll, { passive: true });
    el.addEventListener("pointerdown", markUserScroll);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let rafId = 0;
    let lastTime = performance.now();
    let endPauseUntil = 0;
    let resettingUntil = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const userBusy =
        paused ||
        hoveringRef.current ||
        focusedRef.current ||
        now < cooldownUntilRef.current;

      if (userBusy) {
        endPauseUntil = 0;
        resettingUntil = 0;
        scrollPosRef.current = el.scrollLeft;
      } else if (!reducedMotion && maxScroll > 1) {
        if (now < resettingUntil) {
          // Wait for smooth reset back to start.
        } else if (endPauseUntil > 0) {
          if (now >= endPauseUntil) {
            endPauseUntil = 0;
            resettingUntil = now + 700;
            scrollPosRef.current = 0;
            el.scrollTo({ left: 0, behavior: "smooth" });
          }
        } else if (el.scrollLeft >= maxScroll - 1) {
          endPauseUntil = now + 1000;
        } else {
          scrollPosRef.current = Math.min(
            scrollPosRef.current + (AUTO_SCROLL_PX_PER_SEC * dt) / 1000,
            maxScroll,
          );
          autoSteppingRef.current = true;
          el.scrollLeft = scrollPosRef.current;
          autoSteppingRef.current = false;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    if (!reducedMotion && !paused) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", markUserScroll);
      el.removeEventListener("pointerdown", markUserScroll);
    };
  }, [filter, paused]);

  const handleFilterChange = (id: "all" | TechCategory) => {
    setFilter(id);
    scrollPosRef.current = 0;
    cooldownUntilRef.current = 0;
    if (listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  };

  const scrollByStep = (direction: -1 | 1) => {
    const el = listRef.current;
    if (!el) return;
    cooldownUntilRef.current = performance.now() + USER_COOLDOWN_MS;
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

      <div
        className="relative"
        onMouseEnter={() => {
          hoveringRef.current = true;
        }}
        onMouseLeave={() => {
          hoveringRef.current = false;
        }}
        onFocus={() => {
          focusedRef.current = true;
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            focusedRef.current = false;
          }
        }}
      >
        <ul
          ref={listRef}
          tabIndex={isScrollable ? 0 : undefined}
          aria-label="Tech stack carousel"
          onScroll={(e) => {
            if (!autoSteppingRef.current) {
              scrollPosRef.current = e.currentTarget.scrollLeft;
            }
            setScrollState(readScrollState(e.currentTarget));
          }}
          className="-mx-0.5 flex gap-4 overflow-x-auto overscroll-x-contain rounded-2xl px-0.5 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {visible.map((item) => (
            <li
              key={item.name}
              className="flex w-[84%] shrink-0 items-start gap-4 rounded-2xl border border-teal-500/12 bg-surface-container-low p-5 transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500/30 hover:bg-surface-container sm:w-[47%] lg:w-[32%]"
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
              aria-label={paused ? "Resume auto-scroll" : "Pause auto-scroll"}
              aria-pressed={paused}
              onClick={() => setPaused((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-500/15 bg-surface-container-high text-on-surface transition-colors hover:border-teal-500/35 hover:text-primary"
            >
              <Icon
                name={paused ? "play_arrow" : "pause"}
                className="text-[18px]"
              />
            </button>
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

