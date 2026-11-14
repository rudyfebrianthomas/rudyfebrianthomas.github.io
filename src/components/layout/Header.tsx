"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/lib/data";
import { getPortfolioContent, useLocale } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale] = useLocale();
  const content = getPortfolioContent(locale);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-teal-500/10 bg-surface/85 backdrop-blur-xl">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:px-6 lg:h-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-8 xl:px-12">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-60 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-label-sm focus:font-semibold focus:text-white focus:shadow-md dark:focus:text-slate-950"
        >
          {content.header.skipToContent}
        </a>

        <a
          href="#profile"
          onClick={() => setMenuOpen(false)}
          className="z-10 flex h-14 min-w-0 items-center justify-self-start font-mono text-xs font-semibold tracking-tight sm:text-label-md lg:h-auto"
        >
          <span className="truncate bg-linear-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent transition-opacity duration-150 hover:opacity-80 dark:from-teal-300 dark:to-cyan-300">
            {profile.name}
          </span>
        </a>

        <nav
          aria-label={content.header.mainNavLabel}
          className="col-span-2 row-start-2 mb-2 hidden min-w-0 items-center rounded-full border border-teal-500/15 bg-surface-container-low/80 px-2 backdrop-blur-md md:grid md:grid-cols-6 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:flex lg:gap-1 lg:px-2.5 lg:py-1.5 xl:px-3"
        >
          {content.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 shrink-0 items-center justify-center rounded-full px-2 font-mono text-label-sm text-on-surface-variant transition-colors duration-150 hover:text-primary lg:min-h-0 lg:px-2.5 lg:py-1 xl:px-3"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="z-10 col-start-2 row-start-1 ml-auto flex shrink-0 items-center gap-1.5 justify-self-end pl-2 sm:gap-2 lg:col-start-3 lg:ml-0">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            className="hidden min-h-10 items-center gap-1.5 rounded-full border border-teal-500/20 bg-surface-container-high px-3.5 py-1.5 text-body-sm font-medium text-on-surface transition-[transform,background-color,color,border-color] duration-150 hover:-translate-y-px hover:border-teal-500/35 hover:bg-surface-container-highest hover:text-primary active:translate-y-px active:scale-[0.985] md:inline-flex lg:min-h-9"
          >
            <Icon name="download" className="text-[16px]" />
            <span>{content.header.resumeLabel}</span>
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={
              menuOpen
                ? content.header.closeMenuLabel
                : content.header.openMenuLabel
            }
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-teal-500/15 bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface md:hidden"
          >
            <Icon
              name={menuOpen ? "close" : "menu"}
              className="text-[20px]"
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-teal-500/10 bg-surface/95 px-4 pt-3 pb-5 shadow-lg backdrop-blur-xl sm:px-6 md:hidden"
        >
          <nav
            aria-label={content.header.menuTitle}
            className="flex flex-col gap-1"
          >
            {content.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-between rounded-xl px-3.5 py-2.5 font-mono text-body-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
              >
                <span>{link.label}</span>
                <Icon
                  name="arrow_forward"
                  className="text-[16px] text-primary/70"
                />
              </a>
            ))}
          </nav>
          <a
            href={profile.resumeUrl}
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-4 py-2.5 text-body-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600 dark:bg-teal-400 dark:text-teal-950 dark:hover:bg-teal-300"
          >
            <Icon name="download" className="text-[18px]" />
            <span>{content.header.resumeLabel}</span>
          </a>
        </div>
      )}
    </header>
  );
}
