"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { profile, socialLinks } from "@/lib/data";
import { getPortfolioContent, useLocale } from "@/lib/i18n";
import { externalLinkProps } from "@/lib/url";

export function Profile() {
  const [locale] = useLocale();
  const content = getPortfolioContent(locale);
  const { profileSection } = content;

  return (
    <Section
      id="profile"
      className="relative items-start gap-6 pt-2 pb-4 sm:gap-8 sm:pt-6 sm:pb-8 md:pt-14 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-500 motion-safe:fill-mode-both"
    >
      <div className="flex w-full flex-col items-center justify-between gap-8 sm:gap-10 lg:flex-row lg:gap-12">
        <div className="flex w-full max-w-2xl flex-1 flex-col items-start gap-4 sm:gap-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-surface-container px-3.5 py-1.5 font-mono text-label-sm text-primary">
            <span
              className="h-2 w-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span>{profileSection.badge}</span>
          </p>

          <h1 className="text-display-hero-mobile tracking-tight text-on-surface md:text-display-hero">
            {profile.name}
          </h1>

          <p className="text-[20px] leading-snug font-normal tracking-tight text-on-surface-variant sm:text-headline-md md:text-headline-lg">
            <span className="font-semibold text-primary">
              {profileSection.roles[0]}
            </span>
            {profileSection.roles[1] && (
              <span className="text-on-surface-variant">
                {" "}
                · {profileSection.roles[1]}
              </span>
            )}
          </p>

          <p className="max-w-xl text-body-md leading-relaxed text-on-surface-variant sm:text-body-lg">
            {profileSection.summary}
          </p>

          <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-2">
            <a
              href="#contact"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-body-sm font-semibold text-white shadow-md shadow-teal-500/20 transition-[transform,background-color,box-shadow] duration-150 hover:-translate-y-px hover:bg-teal-600 active:translate-y-px active:scale-[0.985] dark:bg-teal-400 dark:text-teal-950 dark:hover:bg-teal-300"
            >
              <span>{profileSection.primaryCta}</span>
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
              <span>{profileSection.secondaryCta}</span>
            </a>
          </div>
        </div>

        <div className="relative flex shrink-0 self-center items-center justify-center lg:self-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-56 w-56 rounded-full bg-teal-500/15 blur-[96px] sm:h-72 sm:w-72"
          />
          <div className="relative rounded-full border border-teal-500/20 bg-surface-container-low/85 p-2 shadow-xl backdrop-blur-xl sm:p-2.5">
            <div className="relative h-48 w-48 overflow-hidden rounded-full border border-teal-500/30 sm:h-64 sm:w-64 lg:h-80 lg:w-80">
              <Image
                src="/images/avatar.webp"
                alt={profileSection.avatarAlt}
                width={640}
                height={640}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap items-center gap-2 pt-1 sm:gap-2.5 sm:pt-2">
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
