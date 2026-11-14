"use client";

import { getPortfolioContent, useLocale, type Locale } from "@/lib/i18n";

const LOCALES: readonly { code: Locale; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "id", label: "ID", name: "Bahasa Indonesia" },
];

export function LanguageToggle() {
  const [locale, setLocale] = useLocale();
  const content = getPortfolioContent(locale);

  return (
    <div
      role="group"
      aria-label={content.header.languageGroupLabel}
      className="inline-flex h-10 shrink-0 items-center rounded-full border border-teal-500/15 bg-surface-container p-0.5 lg:h-9"
    >
      {LOCALES.map(({ code, label, name }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-label={name}
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={`inline-flex h-8.5 min-w-8 cursor-pointer items-center justify-center rounded-full px-2 font-mono text-[11px] leading-none transition-colors duration-150 lg:h-7.5 ${
              active
                ? "bg-surface-container-highest font-semibold text-primary dark:bg-teal-400/20 dark:text-teal-300"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
