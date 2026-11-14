"use client";

import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data";
import { getPortfolioContent, useLocale } from "@/lib/i18n";
import { externalLinkProps } from "@/lib/url";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";

const rowClass =
  "flex min-w-0 flex-1 items-center justify-between rounded-xl bg-surface-container p-3 sm:p-3.5";
const linkRowClass = `${rowClass} group text-left transition-colors duration-150 hover:bg-surface-container-high`;

function ContactInfoRow({
  icon,
  title,
  subtitle,
  href,
  external,
}: {
  icon: string;
  title: string;
  subtitle: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-3">
        <Icon name={icon} className="shrink-0 text-[20px] text-primary" />
        <span className="flex min-w-0 flex-col font-mono text-label-sm">
          <span
            className={`truncate font-medium text-on-surface ${href ? "group-hover:text-primary" : ""}`}
          >
            {title}
          </span>
          <span className="truncate text-on-surface-variant">{subtitle}</span>
        </span>
      </span>
      {href && (
        <Icon
          name="open_in_new"
          className="ml-2 shrink-0 text-[18px] text-on-surface-variant transition-colors group-hover:text-primary"
        />
      )}
    </>
  );

  if (!href) {
    return <div className={rowClass}>{content}</div>;
  }

  return (
    <a href={href} {...externalLinkProps(external)} className={linkRowClass}>
      {content}
    </a>
  );
}

export function Contact() {
  const [locale] = useLocale();
  const { contactSection } = getPortfolioContent(locale);

  return (
    <Section id="contact" className="gap-6 pb-8 sm:gap-8 sm:pb-12">
      <SectionHeading>{contactSection.heading}</SectionHeading>
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-teal-500/12 bg-surface-container-low/80 p-5 shadow-md backdrop-blur-xl sm:p-6 lg:col-span-5">
          <h3 className="text-headline-sm text-on-surface">
            {contactSection.directTitle}
          </h3>
          <p className="text-body-sm leading-relaxed text-on-surface-variant">
            {contactSection.directDescription}
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:pt-2">
            <div className="flex items-stretch gap-2">
              <ContactInfoRow
                icon="mail"
                title={profile.email}
                subtitle={contactSection.emailSubtitle}
                href={`mailto:${profile.email}`}
              />
              <CopyEmailButton email={profile.email} />
            </div>
            <ContactInfoRow
              icon="call"
              title={profile.phone}
              subtitle={contactSection.phoneSubtitle}
              href={profile.whatsapp}
              external
            />
            <ContactInfoRow
              icon="location_on"
              title={profile.location}
              subtitle={contactSection.timezone}
            />
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-teal-500/12 bg-surface-container-low/80 p-5 shadow-md backdrop-blur-xl sm:p-8 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
