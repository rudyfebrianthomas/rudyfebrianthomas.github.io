/** Neutral architectural dot matrix and soft surface depth matching light and dark themes. */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
    >
      <div className="absolute inset-x-0 top-0 h-80 bg-linear-to-b from-surface-container-low/80 to-transparent dark:from-surface-container-low/50" />
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-on-surface)_1px,transparent_1px)] bg-size-[24px_24px] opacity-[0.045] mask-radial-at-top mask-radial-from-black mask-radial-from-15% mask-radial-to-transparent mask-radial-to-75% dark:opacity-[0.07]" />
    </div>
  );
}
