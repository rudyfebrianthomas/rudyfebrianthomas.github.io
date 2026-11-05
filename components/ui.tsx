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
  accent = false,
}: {
  children: string;
  accent?: boolean;
}) {
  return (
    <span
      className={`rounded-full border px-3.5 py-1 text-label-sm font-mono ${
        accent
          ? "border-teal-500/20 bg-surface-container text-teal-300"
          : "border-surface-container-highest bg-surface-container text-on-surface"
      }`}
    >
      {children}
    </span>
  );
}

