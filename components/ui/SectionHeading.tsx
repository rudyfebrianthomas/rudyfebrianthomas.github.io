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
