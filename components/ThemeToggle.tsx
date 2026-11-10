"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "./Icon";

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
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-teal-500/15 bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface md:h-9 md:w-9"
    >
      <Icon name={isDark ? "dark_mode" : "light_mode"} className="text-[18px]" />
    </button>
  );
}
