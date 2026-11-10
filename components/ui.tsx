type SectionHeadingProps = {
  children: string;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-headline-lg tracking-tight text-on-surface">
      {children}
    </h2>
  );
}

export function Tag({
  children,
}: {
  children: string;
}) {
  return (
    <span
      className="rounded-full border border-surface-container-highest bg-surface-container px-3.5 py-1 font-mono text-label-sm text-on-surface"
    >
      {children}
    </span>
  );
}

