import { experience } from "@/lib/data";
import { Icon } from "./Icon";
import { SectionHeading, Tag } from "./ui";

/** Renders `**bold**` segments from trusted, static copy as <strong>. */
function Highlight({ text }: { text: string }) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  );
}

export function Experience() {
  return (
    <section id="experience" className="flex scroll-mt-44 md:scroll-mt-24 flex-col gap-10">
      <SectionHeading>Work Experience</SectionHeading>
      <article className="relative overflow-hidden rounded-2xl border border-teal-500/10 bg-surface-container-low/70 p-5 shadow-lg backdrop-blur-xl transition-all hover:border-teal-500/30 hover:bg-surface-container-low sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-teal-500/10 pb-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-headline-md tracking-tight text-on-surface">
                {experience.title}
              </h3>
              <span className="rounded-full border border-teal-500/20 bg-teal-500/15 px-3 py-1 font-mono text-label-sm font-semibold text-teal-700 dark:bg-teal-500/20 dark:text-teal-300">
                {experience.tenure}
              </span>
            </div>
            <p className="flex items-center gap-2 text-body-md font-medium text-primary">
              <Icon name="account_balance" className="text-[18px]" />
              {experience.company}
            </p>
          </div>
          <p className="flex items-center gap-2 self-start rounded-full border border-surface-container-highest bg-surface-container px-3.5 py-1.5 font-mono text-label-sm text-on-surface-variant md:self-auto">
            <Icon name="calendar_today" className="text-[16px] text-primary" />
            {experience.period}
          </p>
        </div>
        <p className="my-5 text-body-md text-on-surface-variant">
          {experience.description}
        </p>
        <ul className="flex flex-col gap-3 pb-6">
          {experience.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-3 text-body-sm text-on-surface"
            >
              <Icon
                name="verified"
                className="mt-0.5 shrink-0 text-[18px] text-primary"
              />
              <span>
                <Highlight text={h} />
              </span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2 border-t border-teal-500/10 pt-4">
          {experience.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

