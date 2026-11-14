"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const ANCHOR_BREATHING_PX = 24;

/**
 * Inertial page scrolling and eased scrolling to `#section` links using
 * the rendered header height so anchor offsets stay accurate across viewports.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: false,
    });

    const onDocumentClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const href = anchor?.getAttribute("href");
      if (!href || href.length < 2) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      const headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ?? 0;

      lenis.scrollTo(target, {
        offset: -(headerHeight + ANCHOR_BREATHING_PX),
        immediate: reducedMotion,
      });

      if (window.location.hash !== href) {
        history.pushState(null, "", href);
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
