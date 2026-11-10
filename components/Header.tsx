import { navLinks, profile } from "@/lib/data";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-4 motion-safe:duration-700">
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:px-6 md:flex md:h-16 md:justify-between lg:px-12">
        <a href="#hero" className="flex h-14 min-w-0 items-center font-mono text-label-md font-semibold text-on-surface md:hidden">
          <span className="truncate">{profile.name}</span>
        </a>
        <div className="hidden flex-1 md:block" />

        <nav
          aria-label="Main navigation"
          className="col-span-2 row-start-2 mb-2 grid min-w-0 grid-cols-3 items-center rounded-2xl border border-teal-500/15 bg-surface-container-low/70 px-1 shadow-sm backdrop-blur-md md:absolute md:left-1/2 md:mb-0 md:flex md:-translate-x-1/2 md:gap-1 md:rounded-full md:px-3 md:py-1.5"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 shrink-0 items-center justify-center rounded-full px-2 font-mono text-label-sm text-on-surface-variant transition-colors hover:text-primary md:min-h-0 md:px-3 md:py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="z-10 col-start-2 row-start-1 ml-auto flex shrink-0 items-center gap-2 pl-2">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-teal-500/20 bg-surface-container-high px-3.5 py-1.5 text-body-sm font-medium text-on-surface transition-colors hover:bg-surface-container-highest hover:text-primary md:min-h-0"
          >
            <Icon name="download" className="text-[16px]" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}
