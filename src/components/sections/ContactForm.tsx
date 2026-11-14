"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/lib/data";
import { getPortfolioContent, useLocale } from "@/lib/i18n";

const fieldClass =
  "min-w-0 rounded-xl border border-surface-container-highest bg-surface-container px-4 py-2.5 text-base text-on-surface shadow-xs transition-colors duration-150 placeholder:text-on-surface-variant/75 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:outline-none md:text-body-sm";

function FormField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-label-sm font-medium text-on-surface"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * The site is a static export with no backend, so submitting opens the
 * visitor's mail client with a pre-filled message instead of posting anywhere.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [locale] = useLocale();
  const { contactSection } = getPortfolioContent(locale);
  const { form } = contactSection;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField id="name" label={form.nameLabel}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={form.namePlaceholder}
            className={fieldClass}
          />
        </FormField>
        <FormField id="email" label={form.emailLabel}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={form.emailPlaceholder}
            className={fieldClass}
          />
        </FormField>
      </div>
      <FormField id="subject" label={form.subjectLabel}>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder={form.subjectPlaceholder}
          className={fieldClass}
        />
      </FormField>
      <FormField id="message" label={form.messageLabel}>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder={form.messagePlaceholder}
          className={`${fieldClass} resize-none`}
        />
      </FormField>
      {sent && (
        <p
          role="status"
          className="flex items-start gap-2 rounded-xl border border-teal-500/20 bg-teal-500/10 p-3 font-mono text-label-sm leading-relaxed text-teal-800 dark:text-teal-300"
        >
          <Icon name="done_all" className="mt-0.5 shrink-0 text-[18px] text-primary" />
          <span>{form.sentBanner}</span>
        </p>
      )}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="submit"
          className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-body-sm font-semibold text-white shadow-md shadow-teal-500/20 transition-[transform,background-color] duration-150 hover:-translate-y-px hover:bg-teal-600 active:translate-y-px active:scale-[0.985] dark:bg-teal-400 dark:text-teal-950 dark:hover:bg-teal-300"
        >
          <Icon name="send" className="text-[18px]" />
          <span>{form.submitButton}</span>
        </button>
        <p className="text-center font-mono text-label-sm text-on-surface-variant">
          {form.helperNote}
        </p>
      </div>
    </form>
  );
}
