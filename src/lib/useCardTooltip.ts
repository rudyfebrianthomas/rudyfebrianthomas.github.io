"use client";

import { useId, useRef, useState } from "react";

/**
 * Floating tooltip state anchored to an item inside a horizontally scrollable
 * container, clamped horizontally so edge cards stay inside the wrapper.
 */
export function useCardTooltip<T>(maxWidthPx = 288) {
  const [tooltip, setTooltip] = useState<{
    data: T;
    index: number;
    x: number;
  } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();

  const show = (data: T, index: number, cardEl: HTMLElement) => {
    const wrapEl = wrapperRef.current;
    if (!wrapEl) return;

    const wrapRect = wrapEl.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();
    const halfMax = Math.min(maxWidthPx / 2, wrapRect.width / 2 - 12);
    const rawCenter = cardRect.left - wrapRect.left + cardRect.width / 2;
    const x = Math.min(Math.max(rawCenter, halfMax), wrapRect.width - halfMax);

    setTooltip({ data, index, x });
  };

  const clear = () => setTooltip(null);

  return { tooltip, wrapperRef, tooltipId, show, clear };
}
