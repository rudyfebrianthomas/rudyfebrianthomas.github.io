"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Space for the mobile header and breathing room. */
const ANCHOR_OFFSET = -176;

/**
 * Inertial page scrolling, and eased scrolling to `#section` links.
 *
 * Intentionally not gated on `prefers-reduced-motion`: on Windows that flag is
 * set whenever "Animation effects" is off, and smooth scrolling was explicitly
 * requested for this site. Other (decorative) animations still honor it.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: ANCHOR_OFFSET },
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
