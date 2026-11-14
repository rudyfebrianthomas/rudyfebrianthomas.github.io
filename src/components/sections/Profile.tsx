import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { profile, socialLinks } from "@/lib/data";
import { externalLinkProps } from "@/lib/url";

export function Profile() {
  return (
    <Section
      id="profile"
      className="relative items-start gap-8 pt-6 pb-8 md:pt-14 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-500 motion-safe:fill-mode-both"
    >
      <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
        <div className="flex max-w-2xl flex-1 flex-col items-start gap-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-surface-container px-3.5 py-1.5 font-mono text-label-sm text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            <span>{profile.location} · 6+ Years Experience</span>
          </p>

          <h1 className="text-display-hero-mobile tracking-tight text-on-surface md:text-display-hero">
            {profile.name}
          </h1>

          <p className="text-headline-md tracking-tight text-on-surface-variant md:text-headline-lg">
            <span className="font-semibold text-primary">
              {profile.roles[0]}
            </span>
            <span className="text-on-surface-variant"> · React &amp; TypeScript</span>
          </p>

          <p className="max-w-xl text-body-lg leading-relaxed text-on-surface-variant">
            {profile.summary}
          </p>

          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-body-sm font-semibold text-white shadow-md shadow-teal-500/20 transition-[transform,background-color,box-shadow] duration-150 hover:-translate-y-px hover:bg-teal-600 active:translate-y-px active:scale-[0.985] dark:bg-teal-400 dark:text-teal-950 dark:hover:bg-teal-300"
            >
              <span>Get in Touch</span>
              <Icon
                name="arrow_forward"
                className="text-[18px] transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#projects"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-teal-500/20 bg-surface-container-high px-5 py-3 text-body-sm font-medium text-on-surface shadow-sm transition-[transform,background-color,color,border-color] duration-150 hover:-translate-y-px hover:border-teal-500/35 hover:bg-surface-container-highest hover:text-primary active:translate-y-px active:scale-[0.985]"
            >
              <Icon
                name="terminal"
                className="text-[18px] text-primary transition-transform duration-150 group-hover:scale-105"
              />
              <span>View Projects</span>
            </a>
          </div>
        </div>

        <div className="relative flex shrink-0 self-center items-center justify-center lg:self-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-teal-500/20 blur-[120px]"
          />
          <div className="relative rounded-full border border-teal-500/20 bg-surface-container-low/85 p-2.5 shadow-xl backdrop-blur-xl">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border border-teal-500/30 md:h-80 md:w-80">
              <Image
                src="/images/avatar.webp"
                alt="Rudy Febrian Thomas, Frontend Web Developer"
                width={640}
                height={640}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap items-center gap-2.5 pt-2">
        {socialLinks.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              {...externalLinkProps(s.external)}
              className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-surface-container-highest bg-surface-container-lowest/85 px-3.5 py-1.5 font-mono text-label-sm text-on-surface-variant shadow-xs transition-[transform,background-color,color,border-color] duration-150 hover:-translate-y-px hover:border-teal-500/35 hover:bg-surface-container hover:text-primary active:translate-y-px active:scale-[0.985]"
            >
              <Icon name={s.icon} className="text-[16px] text-primary" />
              <span>{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
