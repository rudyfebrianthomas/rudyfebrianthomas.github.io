"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const HEADER_CLEARANCE_PX = 240;

export type CardTooltipPlacement = "top" | "bottom";

/**
 * Floating tooltip state anchored to an item inside a horizontally scrollable
 * container, clamped horizontally and flipped vertically near the sticky header.
 */
export function useCardTooltip<T>(maxWidthPx = 288) {
  const [tooltip, setTooltip] = useState<{
    data: T;
    index: number;
    x: number;
    placement: CardTooltipPlacement;
    pinned: boolean;
  } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  const computePosition = (cardEl: HTMLElement) => {
    const wrapEl = wrapperRef.current;
    if (!wrapEl) return null;

    const wrapRect = wrapEl.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();
    const halfMax = Math.min(maxWidthPx / 2, wrapRect.width / 2 - 12);
    const rawCenter = cardRect.left - wrapRect.left + cardRect.width / 2;
    const x = Math.min(Math.max(rawCenter, halfMax), wrapRect.width - halfMax);
    const placement: CardTooltipPlacement =
      wrapRect.top < HEADER_CLEARANCE_PX ? "bottom" : "top";

    return { x, placement };
  };

  const show = (
    data: T,
    index: number,
    cardEl: HTMLElement,
    pinned = false,
  ) => {
    const pos = computePosition(cardEl);
    if (!pos) return;
    setTooltip({ data, index, ...pos, pinned });
  };

  const togglePin = (data: T, index: number, cardEl: HTMLElement) => {
    setTooltip((prev) => {
      if (prev?.index === index && prev.pinned) {
        return null;
      }
      const pos = computePosition(cardEl);
      return pos ? { data, index, ...pos, pinned: true } : null;
    });
  };

  const clearHover = useCallback(() => {
    setTooltip((prev) => (prev?.pinned ? prev : null));
  }, []);

  const clear = useCallback(() => setTooltip(null), []);

  useEffect(() => {
    if (!tooltip?.pinned) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") clear();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        clear();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [tooltip?.pinned, clear]);

  return {
    tooltip,
    wrapperRef,
    tooltipId,
    show,
    togglePin,
    clearHover,
    clear,
  };
}
