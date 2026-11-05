"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/lib/data";
import { Icon } from "./Icon";

const fieldClass =
  "rounded-xl border border-surface-container-highest bg-surface-container px-4 py-2.5 text-body-sm text-on-surface shadow-sm placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-teal-400 focus:outline-none";
const labelClass = "font-mono text-label-sm font-medium text-on-surface";

/**
 * The site is a static export with no backend, so submitting opens the
 * visitor's mail client with a pre-filled message instead of posting anywhere.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");

    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Elena Rostova"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Work Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="elena@enterprise.org"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className={labelClass}>
          Project Scope / Position Title
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Staff Frontend Role / Design System Overhaul"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Specifications &amp; Overview
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell me about your product requirements, current architecture hurdles, and timeline..."
          className={`${fieldClass} resize-none`}
        />
      </div>
      {sent && (
        <p
          role="status"
          className="flex items-center gap-2 rounded-xl border border-teal-500/20 bg-teal-500/10 p-3 font-mono text-label-sm text-teal-300"
        >
          <Icon name="done_all" className="text-[18px] text-teal-400" />
          Opening your email app with the message ready to send.
        </p>
      )}
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-body-sm font-semibold text-teal-950 shadow-md shadow-teal-500/20 transition-all hover:bg-teal-300 active:scale-[0.99]"
      >
        <Icon name="send" className="text-[18px]" />
        Transmit Message
      </button>
    </form>
  );
}

