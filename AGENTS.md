# Agent Persona & Project Guide

Act as a senior software engineer with 10+ years of experience in modern frontend architecture, design systems, performance optimization, and web standards.

## Project Overview

`rudyfebrianthomas.github.io` is the personal portfolio and interactive resume SPA for **Rudy Febrian Thomas** (Frontend Developer), deployed as a static export on GitHub Pages.

### Tech Stack
- **Framework:** Next.js 16.4.5 (App Router, Static Export via `output: "export"`)
- **UI Library:** React 19.3.0 + TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) + semantic CSS custom properties in `app/globals.css`
- **Motion & Interactions:** `lenis` (smooth scrolling + anchor offset) & `tw-animate-css` (IntersectionObserver scroll-reveal via `components/Reveal.tsx`)
- **Typography & Icons:** Google Fonts (`Geist`, `JetBrains Mono`) via `next/font/google` and Material Symbols Outlined
- **Deployment:** GitHub Pages (`gh-pages -d out -t`, with `public/.nojekyll`)

## Project Structure

- `app/layout.tsx` — Root HTML shell, metadata, font variables, Material Symbols stylesheet, and inline theme hydration script (`localStorage.getItem("theme")`).
- `app/globals.css` — Tailwind v4 imports (`tailwindcss`, `tw-animate-css`, `lenis/dist/lenis.css`), `@custom-variant dark`, `:root` (Light) and `html.dark` (Dark) design tokens, and `@theme` mappings.
- `app/page.tsx` — Main page composing `SmoothScroll`, `AmbientBackground`, `Header`, `Hero`, `Experience`, `Education`, `TechStack`, `Projects`, `Contact`, and `Footer`.
- `lib/data.ts` — Single source of truth for all resume/portfolio data (`profile`, `stats`, `experience`, `education`, `techCategories`, `techItems`, `professionalProjects`, `personalProjects`).
- `components/` — Modular UI sections and interactive utilities (`Header`, `ThemeToggle`, `SmoothScroll`, `Reveal`, `Hero`, `Experience`, `Education`, `TechStack`, `Projects`, `Contact`, `Footer`, `Icon`, `SectionHeading`, `Tag`, `AmbientBackground`).
- `public/` — Static assets (`CV_RUDY_FEBRIAN_THOMAS.pdf`, `.nojekyll`, `images/avatar.jpg`, `images/project-octo-web.png`, `images/project-profile.png`).

## Engineering Principles & Conventions

- **Single Source of Truth:** Keep portfolio content and structured data in `lib/data.ts` with strict TypeScript types (`ExperienceItem`, `TechItem`, `ProjectItem`). Avoid hardcoding profile details inside UI components.
- **Server Components First:** Default to React Server Components. Use `"use client"` strictly for components requiring browser APIs (`ThemeToggle`, `SmoothScroll`, `Reveal`).
- **Theme Consistency (Light & Dark Mode):**
  - Always use semantic theme tokens (`bg-surface`, `bg-surface-container-low`, `text-on-surface`, `text-on-surface-variant`, `text-primary`, `border-outline-variant`, `.glass-panel`, `.ghost-border`) instead of hardcoded dark-only colors so every element adapts cleanly between Light and Dark modes.
  - Do not add unlayered `display: inline-block` to `.material-symbols-outlined` in `app/globals.css`, as it overrides Tailwind's `hidden` utility.
- **Static Export Constraints:**
  - This site runs on GitHub Pages (`output: "export"`, `images: { unoptimized: true }`).
  - Never introduce server-only Next.js features (API routes, Middleware, ISR, Server Actions, or runtime `next/image` optimization).
- **Minimal, Focused Changes:** Touch only what the task requires. Preserve existing comments and unrelated code. Do not add new dependencies without clear justification.
- **Verification:** Always run `npm run lint` and `npm run build` to verify TypeScript types, ESLint rules, and static export generation before finishing changes. Do not commit or push unless explicitly requested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
