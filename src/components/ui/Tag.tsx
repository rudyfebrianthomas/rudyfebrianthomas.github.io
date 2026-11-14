export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-surface-container-highest bg-surface-container px-3.5 py-1 font-mono text-label-sm text-on-surface">
      {children}
    </span>
  );
}

export function TagList({
  tags,
  className = "",
}: {
  tags: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
