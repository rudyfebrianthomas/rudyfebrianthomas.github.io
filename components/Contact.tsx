import { profile } from "@/lib/data";
import { ContactForm } from "./ContactForm";
import { Icon } from "./Icon";
import { SectionHeading } from "./ui";

const rowClass =
  "flex w-full items-center justify-between rounded-xl bg-surface-container p-3.5";
const linkRowClass = `${rowClass} group text-left transition-colors hover:bg-surface-container-high`;

export function Contact() {
  return (
    <section id="contact" className="flex scroll-mt-24 flex-col gap-10 pb-12">
      <SectionHeading>Contact</SectionHeading>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-teal-500/10 bg-surface-container-low/70 p-6 shadow-md backdrop-blur-xl lg:col-span-5">
          <h3 className="text-headline-sm text-on-surface">Direct Reach</h3>
          <p className="text-body-sm text-on-surface-variant">
            Available for Frontend Web Developer roles, high-performance web
            applications, and collaborative engineering teams.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <a href={`mailto:${profile.email}`} className={linkRowClass}>
              <span className="flex items-center gap-3">
                <Icon name="mail" className="text-[20px] text-teal-400" />
                <span className="flex flex-col font-mono text-label-sm">
                  <span className="font-medium text-on-surface group-hover:text-teal-300">
                    {profile.email}
                  </span>
                  <span className="text-on-surface-variant">
                    Direct Primary Email
                  </span>
                </span>
              </span>
              <Icon
                name="open_in_new"
                className="text-[18px] text-on-surface-variant transition-colors group-hover:text-teal-400"
              />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={linkRowClass}
            >
              <span className="flex items-center gap-3">
                <Icon name="call" className="text-[20px] text-teal-400" />
                <span className="flex flex-col font-mono text-label-sm">
                  <span className="font-medium text-on-surface group-hover:text-teal-300">
                    {profile.phone}
                  </span>
                  <span className="text-on-surface-variant">
                    WhatsApp &amp; Direct Phone
                  </span>
                </span>
              </span>
              <Icon
                name="open_in_new"
                className="text-[18px] text-on-surface-variant transition-colors group-hover:text-teal-400"
              />
            </a>
            <div className={rowClass}>
              <span className="flex items-center gap-3">
                <Icon name="location_on" className="text-[20px] text-teal-400" />
                <span className="flex flex-col font-mono text-label-sm">
                  <span className="font-medium text-on-surface">
                    Indonesia / Jakarta
                  </span>
                  <span className="text-on-surface-variant">
                    WIB Timezone (UTC+7)
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-teal-500/10 bg-surface-container-low/70 p-8 shadow-md backdrop-blur-xl lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

