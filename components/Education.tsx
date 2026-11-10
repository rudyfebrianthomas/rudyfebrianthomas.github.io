import { education } from "@/lib/data";
import { Icon } from "./Icon";
import { SectionHeading, Tag } from "./ui";

export function Education() {
  return (
    <section id="education" className="flex scroll-mt-44 md:scroll-mt-24 flex-col gap-8">
      <SectionHeading>Education</SectionHeading>
      <article className="rounded-2xl border border-teal-500/10 bg-surface-container-low/60 p-5 shadow-md backdrop-blur-xl transition-all hover:bg-surface-container-low sm:p-8">
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
          <p className="flex items-center gap-2 self-start rounded-full border border-surface-container-highest bg-surface-container px-3.5 py-1.5 font-mono text-label-sm text-on-surface-variant md:self-auto">
            <Icon name="calendar_today" className="text-[16px] text-primary" />
            {education.period}
          </p>
        </div>
        <p className="my-4 text-body-md text-on-surface-variant">
          {education.description}
        </p>
        <ul className="flex flex-wrap gap-2 border-t border-teal-500/10 pt-4">
          {education.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

