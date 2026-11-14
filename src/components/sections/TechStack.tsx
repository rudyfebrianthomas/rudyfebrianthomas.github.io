"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  techFilters,
  techItems,
  type TechCategory,
  type TechItem,
} from "@/lib/data";

const AUTO_SCROLL_PX_PER_SEC = 28;
const USER_COOLDOWN_MS = 2500;

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
  const [canLoop, setCanLoop] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [tooltip, setTooltip] = useState<{
    item: TechItem;
    index: number;
    x: number;
  } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const tooltipId = useId();
  const scrollPosRef = useRef(0);
  const targetScrollRef = useRef(0);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);
  const draggingRef = useRef(false);
  const cooldownUntilRef = useRef(0);

  const visible = techItems.filter(
    (item) => filter === "all" || item.category === filter,
  );
  const renderedItems = canLoop ? [...visible, ...visible] : visible;

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const getLoopWidth = () => {
      if (!canLoop) return 0;
      const duplicateStart = el.children[visible.length] as
        | HTMLElement
        | undefined;
      return duplicateStart ? duplicateStart.offsetLeft : 0;
    };

    const checkOverflow = () => {
      if (!canLoop && el.scrollWidth > el.clientWidth + 1) {
        setCanLoop(true);
      } else if (canLoop) {
        const lw = getLoopWidth();
        if (lw > 0 && lw <= el.clientWidth + 1) {
          setCanLoop(false);
        }
      }
    };

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);

    const markUserScroll = () => {
      cooldownUntilRef.current = performance.now() + USER_COOLDOWN_MS;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        if (Math.abs(e.deltaX) > 0) {
          markUserScroll();
          scrollPosRef.current = el.scrollLeft;
          targetScrollRef.current = el.scrollLeft;
        }
        return;
      }

      const lw = getLoopWidth();
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 1) return;

      const step =
        e.deltaMode === 1
          ? e.deltaY * 20
          : e.deltaMode === 2
            ? e.deltaY * el.clientWidth
            : e.deltaY;

      if (!canLoop || lw <= 0) {
        const scrollingRight = step > 0 && el.scrollLeft < maxScroll - 1;
        const scrollingLeft = step < 0 && el.scrollLeft > 1;
        if (!scrollingRight && !scrollingLeft) return;
      }

      e.preventDefault();
      e.stopPropagation();
      setTooltip(null);
      markUserScroll();

      let nextTarget = targetScrollRef.current + step;
      if (canLoop && lw > 0 && nextTarget < 0) {
        scrollPosRef.current += lw;
        nextTarget += lw;
        el.scrollLeft = scrollPosRef.current;
      } else if (!canLoop) {
        nextTarget = Math.min(Math.max(nextTarget, 0), maxScroll);
      }
      targetScrollRef.current = nextTarget;
    };

    let dragStartX = 0;
    let dragStartScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if (el.scrollWidth <= el.clientWidth + 1) return;

      draggingRef.current = true;
      setIsDragging(true);
      setTooltip(null);
      dragStartX = e.clientX;
      dragStartScroll = el.scrollLeft;
      scrollPosRef.current = el.scrollLeft;
      targetScrollRef.current = el.scrollLeft;
      markUserScroll();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const lw = getLoopWidth();
      const dx = e.clientX - dragStartX;
      let next = dragStartScroll - dx;

      if (canLoop && lw > 0) {
        while (next < 0) {
          dragStartScroll += lw;
          next += lw;
        }
        while (next >= lw) {
          dragStartScroll -= lw;
          next -= lw;
        }
      }

      el.scrollLeft = next;
      scrollPosRef.current = el.scrollLeft;
      targetScrollRef.current = el.scrollLeft;
      markUserScroll();
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setIsDragging(false);
      markUserScroll();
    };

    const onTouchStart = () => {
      markUserScroll();
      scrollPosRef.current = el.scrollLeft;
      targetScrollRef.current = el.scrollLeft;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;

      const lw = getLoopWidth();
      const maxScroll = el.scrollWidth - el.clientWidth;
      const wheelDiff = targetScrollRef.current - scrollPosRef.current;
      const wheelActive = Math.abs(wheelDiff) > 0.5;

      if (draggingRef.current) {
        // Pointer drag directly drives scrollLeft.
      } else if (wheelActive) {
        const factor = 1 - Math.exp((-12 * dt) / 1000);
        scrollPosRef.current += wheelDiff * factor;
        if (canLoop && lw > 0) {
          while (scrollPosRef.current >= lw) {
            scrollPosRef.current -= lw;
            targetScrollRef.current -= lw;
          }
          while (scrollPosRef.current < 0) {
            scrollPosRef.current += lw;
            targetScrollRef.current += lw;
          }
        }
        el.scrollLeft = scrollPosRef.current;
      } else {
        const userBusy =
          hoveringRef.current ||
          focusedRef.current ||
          now < cooldownUntilRef.current;

        if (userBusy || reducedMotion || maxScroll <= 1) {
          scrollPosRef.current = el.scrollLeft;
          targetScrollRef.current = el.scrollLeft;
        } else {
          scrollPosRef.current += (AUTO_SCROLL_PX_PER_SEC * dt) / 1000;
          if (canLoop && lw > 0) {
            while (scrollPosRef.current >= lw) {
              scrollPosRef.current -= lw;
            }
          } else if (scrollPosRef.current >= maxScroll) {
            scrollPosRef.current = 0;
          }
          targetScrollRef.current = scrollPosRef.current;
          el.scrollLeft = scrollPosRef.current;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [canLoop, filter, visible.length]);

  const handleFilterChange = (id: "all" | TechCategory) => {
    setFilter(id);
    setCanLoop(false);
    setTooltip(null);
    scrollPosRef.current = 0;
    targetScrollRef.current = 0;
    cooldownUntilRef.current = 0;
    if (listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  };

  const showTooltipForCard = (
    item: TechItem,
    index: number,
    cardEl: HTMLLIElement,
  ) => {
    if (draggingRef.current) return;
    const wrapEl = wrapperRef.current;
    if (!wrapEl) return;

    const wrapRect = wrapEl.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();
    const halfMaxWidth = Math.min(144, wrapRect.width / 2 - 12);
    const rawCenter = cardRect.left - wrapRect.left + cardRect.width / 2;
    const clampedX = Math.min(
      Math.max(rawCenter, halfMaxWidth),
      wrapRect.width - halfMaxWidth,
    );

    setTooltip({ item, index, x: clampedX });
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
        onMouseEnter={() => {
          hoveringRef.current = true;
        }}
        onMouseLeave={() => {
          hoveringRef.current = false;
          setTooltip(null);
        }}
        onFocus={() => {
          focusedRef.current = true;
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            focusedRef.current = false;
            setTooltip(null);
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
                onMouseEnter={(e) =>
                  showTooltipForCard(item, index, e.currentTarget)
                }
                onMouseLeave={() => setTooltip(null)}
                onFocus={(e) => {
                  if (!isDuplicate) {
                    showTooltipForCard(item, index, e.currentTarget);
                  }
                }}
                onBlur={() => setTooltip(null)}
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
              {tooltip.item.badge}
            </span>
            <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">
              {tooltip.item.detail}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}

