import { Icon } from "@/components/ui/Icon";
import { PeriodBadge } from "@/components/ui/PeriodBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { education } from "@/lib/data";

export function Education() {
  return (
    <Section id="education" className="gap-8">
      <SectionHeading>Education</SectionHeading>
      <article className="rounded-2xl border border-teal-500/12 bg-surface-container-low/80 p-5 shadow-md backdrop-blur-xl sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-teal-500/10 pb-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-headline-md tracking-tight text-on-surface">
              {education.degree}
            </h3>
            <p className="flex items-center gap-2 text-body-md font-medium text-primary">
              <Icon name="school" className="text-[18px]" />
              {education.school}
            </p>
          </div>
          <PeriodBadge period={education.period} />
        </div>
        <p className="my-4 text-body-md text-on-surface-variant">
          {education.description}
        </p>
        <TagList
          tags={education.tags}
          className="border-t border-teal-500/10 pt-4"
        />
      </article>
    </Section>
  );
}

