/** Architectural hairline grid and top studio horizon illumination matching light/dark tokens. */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 85% 50% at 50% -6%, var(--ambient-spotlight) 0%, var(--ambient-spotlight-mid) 42%, transparent 78%),
            radial-gradient(ellipse 55% 45% at 88% 92%, var(--ambient-spotlight-mid) 0%, transparent 72%)
          `,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[78vh]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--ambient-grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--ambient-grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 0%, #000 18%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 0%, #000 18%, transparent 82%)",
        }}
      />
    </div>
  );
}
