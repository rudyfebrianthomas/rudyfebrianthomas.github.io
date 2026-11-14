/** Subtle static radial teal glow matching light and dark surfaces with zero runtime loop cost. */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute -top-44 left-1/2 h-96 w-180 -translate-x-1/2 rounded-full bg-teal-500/8 blur-[120px] dark:bg-teal-500/12" />
      <div className="absolute top-1/3 -right-32 h-112 w-112 rounded-full bg-teal-400/5 blur-[130px] dark:bg-teal-400/7" />
      <div className="absolute bottom-16 -left-24 h-96 w-96 rounded-full bg-cyan-500/6 blur-[120px] dark:bg-cyan-500/10" />
    </div>
  );
}
