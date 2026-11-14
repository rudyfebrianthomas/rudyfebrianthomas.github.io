"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { getPortfolioContent, useLocale } from "@/lib/i18n";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return true;
}

export function ThemeToggle() {
  const [locale] = useLocale();
  const content = getPortfolioContent(locale);
  const isDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function toggleTheme() {
    const nextDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      // Ignore storage errors in restricted environments.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark ? content.header.themeToLight : content.header.themeToDark
      }
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-teal-500/15 bg-surface-container text-on-surface-variant transition-[transform,background-color,color] duration-150 hover:-translate-y-px hover:bg-surface-container-high hover:text-on-surface active:translate-y-px active:scale-[0.985] lg:h-9 lg:w-9"
    >
      <Icon name={isDark ? "dark_mode" : "light_mode"} className="text-[18px]" />
    </button>
  );
}
