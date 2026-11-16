# Rudy Febrian Thomas Portfolio

Personal portfolio and interactive resume for Frontend Web Developer Rudy Febrian Thomas. Built with Next.js App Router, React, TypeScript, and Tailwind CSS v4, and exported as a static site for GitHub Pages.

## Features

- **Profile & resume**: Hero overview with availability/timezone metadata and a downloadable PDF resume link.
- **Experience & education**: Structured timeline cards covering 6+ years of frontend engineering and Computer Science education.
- **Filterable tech stack carousel**: Category filters (`All`, `Core Skills`, `Methodologies & Tools`, `Languages`), continuous horizontal scrolling with drag and pause-on-hover, and click-pinned skill detail tooltips.
- **Professional & personal projects**: Project showcase cards with stack tags, repository links, and live demo links.
- **Bilingual & themed UI**: Persistent English/Indonesian locale switcher (`localStorage` key `locale`) and persistent dark/light theme toggle (`localStorage` key `theme`, defaulting to dark).
- **Smooth navigation & contact**: Lenis smooth scrolling with header offset handling, copy-to-clipboard email action, and a `mailto:` contact form that opens a prefilled draft in the visitor's email client.

## Tech Stack

| Category | Technology | Role |
| --- | --- | --- |
| Framework | Next.js (`16.4.5`, App Router), React (`19.3.0`) | Static site generation (`output: "export"`) and UI composition |
| Language | TypeScript (`^5`) | Strict static typing across data models, hooks, and components |
| Styling | Tailwind CSS v4 (`^4`, `@tailwindcss/postcss`) | Utility styling and CSS custom-property light/dark design tokens |
| Motion & Scroll | `lenis` (`^1.3.27`), `tw-animate-css` (`^1.4.0`) | Smooth anchor scrolling and entrance animations |
| Fonts & Icons | `next/font/google` (`Geist`, `JetBrains Mono`), Material Symbols Outlined | Typography and UI icons alongside local SVG tech icons |
| Linting | ESLint (`^9`), `eslint-config-next` (`16.4.5`) | Static lint and Next.js rule checks |

## Getting Started

Requires **Node.js 24** (matching `.github/workflows/deploy-pages.yml`) and network access to Google Fonts during production builds.

```bash
# Install dependencies
npm ci

# Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev    # Start Next.js development server
npm run build  # Build static export into out/
npm run lint   # Run ESLint across the repository
```

## Deployment

- Configured in `next.config.ts` with `output: "export"`, `trailingSlash: true`, and `images: { unoptimized: true }`, producing static HTML, CSS, JS, and assets in `out/` with `public/.nojekyll`.
- `.github/workflows/deploy-pages.yml` deploys via manual `workflow_dispatch` (`Actions -> Deploy to GitHub Pages -> Run workflow`), running `npm ci`, `npm run build`, and uploading `out/` to the `github-pages` environment.
- Update portfolio content and links in `src/lib/data.ts`, theme tokens in `src/app/globals.css`, and metadata/fonts in `src/app/layout.tsx`.

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── LICENSE
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── public/
│   ├── .nojekyll
│   ├── icons/
│   │   └── tech/            # SVG tech icons and credits manifest
│   └── images/
│       ├── avatar.webp
│       └── projects/        # Project preview images
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── layout/          # AmbientBackground, CurrentYear, Footer, Header, LanguageToggle, SmoothScroll, ThemeToggle
    │   ├── sections/        # Contact, ContactForm, CopyEmailButton, Education, Experience, Profile, ProjectCard, Projects, TechStack
    │   └── ui/              # Icon, PeriodBadge, Section, SectionHeading, Tag
    └── lib/
        ├── data.ts          # Profile, experience, education, skills, and project content
        ├── i18n.ts          # EN/ID translations and localStorage-backed locale hook
        ├── url.ts           # URL formatting and external-link attribute helpers
        ├── useCardTooltip.ts
        └── useHorizontalCarousel.ts
```

## License

This project is licensed under the [MIT License](LICENSE).
