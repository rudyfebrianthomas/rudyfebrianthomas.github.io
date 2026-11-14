import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data";
import { externalLinkProps } from "@/lib/url";
import { ContactForm } from "./ContactForm";

const rowClass =
  "flex w-full items-center justify-between rounded-xl bg-surface-container p-3.5";
const linkRowClass = `${rowClass} group text-left transition-colors hover:bg-surface-container-high`;

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
      <span className="flex items-center gap-3">
        <Icon name={icon} className="text-[20px] text-primary" />
        <span className="flex flex-col font-mono text-label-sm">
          <span
            className={`font-medium text-on-surface ${href ? "group-hover:text-primary" : ""}`}
          >
            {title}
          </span>
          <span className="text-on-surface-variant">{subtitle}</span>
        </span>
      </span>
      {href && (
        <Icon
          name="open_in_new"
          className="text-[18px] text-on-surface-variant transition-colors group-hover:text-primary"
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
  return (
    <Section id="contact" className="gap-10 pb-12">
      <SectionHeading>Contact</SectionHeading>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-teal-500/10 bg-surface-container-low/70 p-6 shadow-md backdrop-blur-xl lg:col-span-5">
          <h3 className="text-headline-sm text-on-surface">Direct Reach</h3>
          <p className="text-body-sm text-on-surface-variant">
            Available for Frontend Web Developer roles, high-performance web
            applications, and collaborative engineering teams.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <ContactInfoRow
              icon="mail"
              title={profile.email}
              subtitle="Direct Primary Email"
              href={`mailto:${profile.email}`}
            />
            <ContactInfoRow
              icon="call"
              title={profile.phone}
              subtitle="WhatsApp & Direct Phone"
              href={profile.whatsapp}
              external
            />
            <ContactInfoRow
              icon="location_on"
              title={profile.location}
              subtitle={profile.timezone}
            />
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-teal-500/10 bg-surface-container-low/70 p-5 shadow-md backdrop-blur-xl sm:p-8 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
