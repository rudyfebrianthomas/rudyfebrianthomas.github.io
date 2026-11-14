import { Icon } from "@/components/ui/Icon";
import { PeriodBadge } from "@/components/ui/PeriodBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { experience } from "@/lib/data";

/** Renders `**bold**` segments from trusted, static copy as <strong>. */
function Highlight({ text }: { text: string }) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  );
}

export function Experience() {
  return (
    <Section id="experience" className="gap-10">
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
          <PeriodBadge period={experience.period} />
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
        <TagList
          tags={experience.tags}
          className="border-t border-teal-500/10 pt-4"
        />
      </article>
    </Section>
  );
}

