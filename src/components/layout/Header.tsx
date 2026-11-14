import { Icon } from "@/components/ui/Icon";
import { navLinks, profile } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-teal-500/10 bg-surface/85 backdrop-blur-xl">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:px-6 lg:h-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-12">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-60 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-label-sm focus:font-semibold focus:text-white focus:shadow-md dark:focus:text-slate-950"
        >
          Skip to content
        </a>

        <a
          href="#profile"
          className="z-10 flex h-14 min-w-0 items-center justify-self-start font-mono text-label-md font-semibold tracking-tight lg:h-auto"
        >
          <span className="truncate bg-linear-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent transition-opacity duration-150 hover:opacity-80 dark:from-teal-300 dark:to-cyan-300">
            {profile.name}
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="col-span-2 row-start-2 mb-2 grid min-w-0 grid-cols-3 items-center rounded-2xl border border-teal-500/15 bg-surface-container-low/80 px-1 backdrop-blur-md sm:grid-cols-6 sm:rounded-full sm:px-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:flex lg:gap-1 lg:px-3 lg:py-1.5"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 shrink-0 items-center justify-center rounded-full px-2 font-mono text-label-sm text-on-surface-variant transition-colors duration-150 hover:text-primary lg:min-h-0 lg:px-3 lg:py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="z-10 col-start-2 row-start-1 ml-auto flex shrink-0 items-center gap-2 justify-self-end pl-2 lg:col-start-3 lg:ml-0">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-teal-500/20 bg-surface-container-high px-3.5 py-1.5 text-body-sm font-medium text-on-surface transition-[transform,background-color,color,border-color] duration-150 hover:-translate-y-px hover:border-teal-500/35 hover:bg-surface-container-highest hover:text-primary active:translate-y-px active:scale-[0.985] lg:min-h-9"
          >
            <Icon name="download" className="text-[16px]" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
}
