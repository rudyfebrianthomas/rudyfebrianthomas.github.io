import { navLinks, profile } from "@/lib/data";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-4 motion-safe:duration-700">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        <div className="hidden flex-1 md:block" />

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-0.5 overflow-x-auto rounded-full border border-teal-500/15 bg-surface-container-low/70 px-2 py-1.5 shadow-sm backdrop-blur-md sm:gap-1 sm:px-3 md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-2 py-1 font-mono text-label-sm text-on-surface-variant transition-colors hover:text-primary sm:px-3"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="z-10 ml-auto flex shrink-0 items-center gap-2 pl-2">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-surface-container-high px-3.5 py-1.5 text-body-sm font-medium text-on-surface transition-colors hover:bg-surface-container-highest hover:text-primary"
          >
            <Icon name="download" className="text-[16px]" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}