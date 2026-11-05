import { navLinks } from "@/lib/data";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/80 backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-4 motion-safe:duration-700">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-center px-6 lg:px-12">
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1 rounded-full border border-teal-500/10 bg-surface-container-low/70 px-3 py-1.5 shadow-sm backdrop-blur-md"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-2 py-1 font-mono text-label-sm text-on-surface-variant transition-colors hover:text-teal-300 sm:px-3"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

