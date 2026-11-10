import { profile, socialLinks } from "@/lib/data";
import { Icon } from "./Icon";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-teal-500/10 bg-surface-container-low py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-12">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-mono text-label-md font-semibold tracking-tight text-on-surface">
            {profile.name} · Frontend Developer
          </span>
          <p className="text-body-sm text-on-surface-variant">
            © <CurrentYear buildYear={new Date().getFullYear()} /> {profile.name}. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              {...("external" in link
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="p-1 text-on-surface-variant transition-colors hover:text-primary"
            >
              <Icon name={link.icon} className="text-[20px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

