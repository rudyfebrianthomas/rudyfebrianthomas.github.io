const NOISE_SVG_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

/** Multi-stop studio mesh wash with a tactile static grain finish for light and dark themes. */
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
            radial-gradient(ellipse 75% 55% at 84% 6%, var(--ambient-glow-primary) 0%, transparent 70%),
            radial-gradient(ellipse 65% 50% at 12% 16%, var(--ambient-glow-secondary) 0%, transparent 68%),
            radial-gradient(ellipse 70% 55% at 24% 88%, var(--ambient-glow-tertiary) 0%, transparent 72%),
            linear-gradient(135deg, var(--ambient-glow-secondary) 0%, transparent 45%, var(--ambient-glow-primary) 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: NOISE_SVG_DATA_URI,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
