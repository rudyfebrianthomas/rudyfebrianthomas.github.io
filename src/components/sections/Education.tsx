"use client";

import { Icon } from "@/components/ui/Icon";
import { PeriodBadge } from "@/components/ui/PeriodBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { getPortfolioContent, useLocale } from "@/lib/i18n";

export function Education() {
  const [locale] = useLocale();
  const { educationSection } = getPortfolioContent(locale);
  const { item } = educationSection;

  return (
    <Section id="education" className="gap-6 sm:gap-8">
      <SectionHeading>{educationSection.heading}</SectionHeading>
      <article className="rounded-2xl border border-teal-500/12 bg-surface-container-low/80 p-5 shadow-md backdrop-blur-xl sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-teal-500/10 pb-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[22px] leading-snug font-semibold tracking-tight text-on-surface sm:text-headline-md">
              {item.degree}
            </h3>
            <p className="flex items-start gap-2 text-body-md font-medium text-primary sm:items-center">
              <Icon name="school" className="mt-0.5 text-[18px] sm:mt-0" />
              <span>{item.school}</span>
            </p>
          </div>
          <PeriodBadge period={item.period} />
        </div>
        <p className="my-4 text-body-md leading-relaxed text-on-surface-variant">
          {item.description}
        </p>
        <TagList
          tags={item.tags}
          className="border-t border-teal-500/10 pt-4"
        />
      </article>
    </Section>
  );
}
