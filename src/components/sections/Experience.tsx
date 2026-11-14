"use client";

import { Icon } from "@/components/ui/Icon";
import { PeriodBadge } from "@/components/ui/PeriodBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { getPortfolioContent, useLocale } from "@/lib/i18n";

/** Renders `**bold**` segments from trusted, static copy as <strong>. */
function Highlight({ text }: { text: string }) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  );
}

export function Experience() {
  const [locale] = useLocale();
  const { experienceSection } = getPortfolioContent(locale);
  const { item } = experienceSection;

  return (
    <Section id="experience" className="gap-6 sm:gap-8">
      <SectionHeading>{experienceSection.heading}</SectionHeading>
      <article className="relative overflow-hidden rounded-2xl border border-teal-500/12 bg-surface-container-low/80 p-5 shadow-md backdrop-blur-xl sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-teal-500/10 pb-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <h3 className="text-[22px] leading-snug font-semibold tracking-tight text-on-surface sm:text-headline-md">
                {item.title}
              </h3>
              <span className="rounded-full border border-teal-500/20 bg-teal-500/15 px-3 py-1 font-mono text-label-sm font-semibold text-teal-800 dark:bg-teal-500/20 dark:text-teal-300">
                {item.tenure}
              </span>
            </div>
            <p className="flex items-start gap-2 text-body-md font-medium text-primary sm:items-center">
              <Icon name="account_balance" className="mt-0.5 text-[18px] sm:mt-0" />
              <span>{item.company}</span>
            </p>
          </div>
          <PeriodBadge period={item.period} />
        </div>
        <p className="my-5 text-body-md leading-relaxed text-on-surface-variant">
          {item.description}
        </p>
        <ul className="flex flex-col gap-3 pb-6">
          {item.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-3 text-[14px] leading-relaxed text-on-surface sm:text-body-sm"
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
          tags={item.tags}
          className="border-t border-teal-500/10 pt-4"
        />
      </article>
    </Section>
  );
}
