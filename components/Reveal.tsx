"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Animation delay in ms, for staggering sibling blocks. */
  delay?: number;
  className?: string;
};

/**
 * Fades and slides content in once it scrolls into view, using the shadcn
 * `tw-animate-css` utilities. Gated by `motion-safe:` so users who prefer
 * reduced motion always see the content immediately.
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
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
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={`${
        visible
          ? "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-6 motion-safe:duration-700 motion-safe:fill-mode-both"
          : "motion-safe:opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

