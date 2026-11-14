import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

/** Page section with consistent sticky-header anchor offset. */
export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`flex scroll-mt-44 flex-col md:scroll-mt-24 ${className}`}
    >
      {children}
    </section>
  );
}
