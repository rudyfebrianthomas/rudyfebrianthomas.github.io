"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
};

/**
 * Fades and slides content in once it scrolls into view, using the shadcn
 * `tw-animate-css` utilities. Gated by `motion-safe:` so users who prefer
 * reduced motion always see the content immediately.
 */
export function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        visible
          ? "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-6 motion-safe:duration-700 motion-safe:fill-mode-both"
          : undefined
      }
    >
      {children}
    </div>
  );
}

