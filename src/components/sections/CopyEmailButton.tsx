"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { getPortfolioContent, useLocale } from "@/lib/i18n";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [locale] = useLocale();
  const { contactSection } = getPortfolioContent(locale);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard API unavailable in restricted contexts.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={
        copied ? contactSection.copiedEmail : contactSection.copyEmail
      }
      title={copied ? contactSection.copiedEmail : contactSection.copyEmail}
      className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-teal-500/15 bg-surface-container text-on-surface-variant transition-[transform,background-color,color,border-color] duration-150 hover:border-teal-500/35 hover:bg-surface-container-high hover:text-primary active:scale-[0.96]"
    >
      <Icon
        name={copied ? "check" : "content_copy"}
        className={`text-[18px] ${copied ? "text-primary" : ""}`}
      />
    </button>
  );
}
