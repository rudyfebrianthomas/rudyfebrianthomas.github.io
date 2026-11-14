import { Icon } from "./Icon";

/** Pill displaying a date range for experience and education cards. */
export function PeriodBadge({ period }: { period: string }) {
  return (
    <p className="flex items-center gap-2 self-start rounded-full border border-surface-container-highest bg-surface-container px-3.5 py-1.5 font-mono text-label-sm text-on-surface-variant md:self-auto">
      <Icon name="calendar_today" className="text-[16px] text-primary" />
      {period}
    </p>
  );
}
