"use client";

import { getPortfolioContent, useLocale } from "@/lib/i18n";

export function LanguageToggle() {
  const [locale, setLocale] = useLocale();
  const content = getPortfolioContent(locale);
  const nextLocale = locale === "en" ? "id" : "en";

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      aria-label={content.header.languageToggleLabel}
      title={content.header.languageToggleLabel}
      className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-teal-500/15 bg-surface-container font-mono text-label-sm font-semibold uppercase text-on-surface-variant transition-[transform,background-color,color] duration-150 hover:-translate-y-px hover:bg-surface-container-high hover:text-on-surface active:translate-y-px active:scale-[0.985] lg:size-9"
    >
      {locale.toUpperCase()}
    </button>
  );
}
