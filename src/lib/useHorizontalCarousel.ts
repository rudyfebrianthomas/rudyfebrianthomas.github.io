"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_SPEED_PX_PER_SEC = 56;
const DEFAULT_COOLDOWN_MS = 2500;

type UseHorizontalCarouselOptions = {
  itemCount: number;
  speedPxPerSec?: number;
  cooldownMs?: number;
  onUserInteract?: () => void;
};

/**
 * Infinite-loop horizontal carousel with smooth eased wheel scrolling,
 * mouse pointer drag (suppressing accidental link clicks), and slow idle drift.
 */
export function useHorizontalCarousel({
  itemCount,
  speedPxPerSec = DEFAULT_SPEED_PX_PER_SEC,
  cooldownMs = DEFAULT_COOLDOWN_MS,
  onUserInteract,
}: UseHorizontalCarouselOptions) {
  const [canLoop, setCanLoop] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const scrollPosRef = useRef(0);
  const targetScrollRef = useRef(0);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const cooldownUntilRef = useRef(0);
  const onInteractRef = useRef(onUserInteract);

  useEffect(() => {
    onInteractRef.current = onUserInteract;
  }, [onUserInteract]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const getLoopWidth = () => {
      if (!canLoop) return 0;
      const duplicateStart = el.children[itemCount] as HTMLElement | undefined;
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
      cooldownUntilRef.current = performance.now() + cooldownMs;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        if (Math.abs(e.deltaX) > 0) {
          onInteractRef.current?.();
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
      onInteractRef.current?.();
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
      didDragRef.current = false;
      setIsDragging(true);
      onInteractRef.current?.();
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
      if (Math.abs(dx) > 5) {
        didDragRef.current = true;
      }

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

    const onClickCapture = (e: MouseEvent) => {
      if (!didDragRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      didDragRef.current = false;
    };

    const onTouchStart = () => {
      markUserScroll();
      scrollPosRef.current = el.scrollLeft;
      targetScrollRef.current = el.scrollLeft;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("click", onClickCapture, true);
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
          scrollPosRef.current += (speedPxPerSec * dt) / 1000;
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
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [canLoop, cooldownMs, itemCount, speedPxPerSec]);

  const reset = () => {
    setCanLoop(false);
    scrollPosRef.current = 0;
    targetScrollRef.current = 0;
    cooldownUntilRef.current = 0;
    if (listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  };

  const containerHandlers = {
    onMouseEnter: () => {
      hoveringRef.current = true;
    },
    onMouseLeave: () => {
      hoveringRef.current = false;
    },
    onFocus: () => {
      focusedRef.current = true;
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        focusedRef.current = false;
      }
    },
  };

  return {
    listRef,
    canLoop,
    isDragging,
    reset,
    containerHandlers,
  };
}
