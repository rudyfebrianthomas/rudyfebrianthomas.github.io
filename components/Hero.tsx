import Image from "next/image";
import { profile, socialLinks } from "@/lib/data";
import { Icon } from "./Icon";
import { TypingText } from "./TypingText";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex scroll-mt-44 md:scroll-mt-24 flex-col items-start gap-8 pt-6 pb-8 md:pt-14"
    >
      <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
        <div className="flex max-w-2xl flex-1 flex-col items-start gap-6">
          <h1 className="text-display-hero-mobile tracking-tight text-on-surface md:text-display-hero">
            {profile.name}
          </h1>
          <p className="flex min-h-11 flex-wrap items-center gap-x-2 text-headline-lg tracking-tight text-on-surface md:text-[36px]">
            <span className="font-normal text-on-surface-variant">I&apos;m a</span>
            <span>
              <TypingText words={profile.roles} />
              <span
                aria-hidden="true"
                className="ml-0.5 animate-pulse font-light text-primary select-none"
              >
                |
              </span>
            </span>
          </p>
          <p className="text-body-lg text-on-surface-variant">
            {profile.summary}
          </p>
          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-linear-to-r from-teal-500 to-teal-600 px-6 py-3 text-body-sm font-semibold text-white shadow-md shadow-teal-500/20 transition-all hover:from-teal-600 hover:to-teal-700 active:scale-[0.98] dark:from-teal-400 dark:to-secondary dark:text-teal-950 dark:hover:from-teal-300 dark:hover:to-teal-400"
            >
              Start Collaboration
              <Icon name="arrow_forward" className="text-[18px]" />
            </a>
            <a
              href="#projects"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-teal-500/15 bg-surface-container-high/90 px-5 py-3 text-body-sm font-medium text-on-surface shadow-sm transition-all hover:bg-surface-container-highest hover:text-primary"
            >
              <Icon
                name="terminal"
                className="text-[18px] text-primary transition-transform group-hover:scale-105"
              />
              View My Work
            </a>
          </div>
        </div>

        <div className="relative flex shrink-0 self-center items-center justify-center lg:self-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-teal-500/20 blur-[120px]"
          />
          <div className="group relative rounded-full border border-teal-500/20 bg-surface-container-low/80 p-2.5 shadow-xl backdrop-blur-xl">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border border-teal-500/30 md:h-80 md:w-80">
              <Image
                src="/images/avatar.webp"
                alt="Rudy Febrian Thomas - Frontend Web Developer"
                width={640}
                height={640}
                priority
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap items-center gap-3 pt-2">
        {socialLinks.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              {...("external" in s
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-surface-container-highest bg-surface-container-lowest/80 px-3.5 py-1.5 font-mono text-label-sm text-on-surface-variant shadow-sm transition-colors hover:bg-surface-container hover:text-primary"
            >
              <Icon name={s.icon} className="text-[16px] text-primary" />
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

