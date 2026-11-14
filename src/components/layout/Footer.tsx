"use client";

import { Icon } from "@/components/ui/Icon";
import { profile, socialLinks } from "@/lib/data";
import { getPortfolioContent, useLocale } from "@/lib/i18n";
import { externalLinkProps } from "@/lib/url";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  const [locale] = useLocale();
  const content = getPortfolioContent(locale);

  return (
    <footer className="relative z-10 w-full border-t border-teal-500/10 bg-surface-container-low py-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-4 text-center sm:px-6 md:flex-row md:gap-6 md:text-left lg:px-8 xl:px-12">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-mono text-label-md font-semibold tracking-tight text-on-surface">
            {profile.name} · Frontend Developer
          </span>
          <p className="text-body-sm text-on-surface-variant">
            © <CurrentYear buildYear={new Date().getFullYear()} />{" "}
            {profile.name}. {content.footer.rights}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...externalLinkProps(link.external)}
              className="inline-flex size-11 items-center justify-center rounded-full text-on-surface-variant transition-[transform,background-color,color] duration-150 hover:-translate-y-px hover:bg-surface-container hover:text-primary active:translate-y-px active:scale-[0.985]"
            >
              <Icon name={link.icon} className="text-[20px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
