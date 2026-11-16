# rudyfebrianthomas.github.io

Personal portfolio and interactive resume for Frontend Web Developer Rudy Febrian Thomas. Built with Next.js App Router, React, TypeScript, and Tailwind CSS v4, and compiled as a static export for GitHub Pages.

## Features

- **Profile & Resume**: Hero introduction with availability/timezone details, social links, and a downloadable PDF resume link.
- **Experience & Education**: Structured timeline sections detailing 6+ years of frontend engineering experience and Computer Science education.
- **Filterable Tech Stack Carousel**: Filter pills (`All`, `Core Skills`, `Methodologies & Tools`, `Languages`), continuous horizontal marquee with drag and pause-on-hover controls, and click-pinned detail tooltips.
- **Projects Showcase**: Separate professional and personal project cards with preview images, tech stack tags, repository links, and live demo links.
- **Bilingual & Themed UI**: Persistent English/Indonesian language toggle (`localStorage` key `locale`) and persistent dark/light theme toggle (`localStorage` key `theme`, defaulting to dark).
- **Smooth Navigation & Contact**: Lenis smooth anchor scrolling, copy-to-clipboard email button, and a `mailto:` contact form that opens a prefilled draft in the visitor's email client.

## Tech Stack

| Category | Technology | Role |
| --- | --- | --- |
| Framework | Next.js (`16.4.5`), React (`19.3.0`) | App Router static export (`output: "export"`) and UI rendering |
| Language | TypeScript (`^5`) | Strict static typing across content models, hooks, and components |
| Styling | Tailwind CSS v4 (`^4`), `@tailwindcss/postcss` | Utility classes and `:root` / `html.dark` design tokens |
| Motion & Scroll | `lenis` (`^1.3.27`), `tw-animate-css` (`^1.4.0`) | Smooth scrolling and CSS entrance animations |
| Typography & Icons | `next/font/google` (`Geist`, `JetBrains Mono`), Material Symbols Outlined | Loaded fonts and UI icons alongside local SVG tech icons |
| Linting | ESLint (`^9`), `eslint-config-next` (`16.4.5`) | Static lint and Next.js rule checks |

## Getting Started

Requires **Node.js 24** (matching `.github/workflows/deploy-pages.yml`) and internet access to Google Fonts during production builds.

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
npm run lint   # Run ESLint
```

## Deployment

- Configured in `next.config.ts` with `output: "export"`, `trailingSlash: true`, and `images: { unoptimized: true }`, outputting static files to `out/` alongside `public/.nojekyll`.
- `.github/workflows/deploy-pages.yml` runs on manual `workflow_dispatch`, executing `npm ci`, `npm run build`, and deploying `out/` to the `github-pages` environment.
- Content and links live in `src/lib/data.ts`, theme tokens in `src/app/globals.css`, and metadata/fonts in `src/app/layout.tsx`.

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
        ├── data.ts          # Portfolio content, projects, and TypeScript types
        ├── i18n.ts          # EN/ID translations and localStorage locale hook
        ├── url.ts           # URL formatting and external-link attribute helpers
        ├── useCardTooltip.ts
        └── useHorizontalCarousel.ts
```

## License

Licensed under the [MIT License](LICENSE).
