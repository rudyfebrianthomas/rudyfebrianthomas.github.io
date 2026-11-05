# Rudy Febrian Thomas — Interactive Portfolio & Resume SPA

Personal portfolio and interactive resume website for **Rudy Febrian Thomas** (Frontend Developer), engineered as a high-performance static Single-Page Application (SPA) and deployed on GitHub Pages.

- **Live Site:** [https://rudyfebrianthomas.github.io/](https://rudyfebrianthomas.github.io/)
- **Author:** Rudy Febrian Thomas ([GitHub](https://github.com/rudyfebrianthomas) · [LinkedIn](https://linkedin.com/in/rudy-febrian-thomas-234263119))

---

## Built with Vibe Coding

This project was built end-to-end using a modern **Vibe Coding** workflow—combining frontend engineering principles with AI-native design and agentic coding tools:

1. **UI/UX Design Generation with Google Stitch (MCP)**
   - The visual direction (*"Technical Atelier"* aesthetic, glassmorphism panels, monospace metadata typography, and bento-style sections) was generated and inspected directly through the **Stitch MCP** integration.
2. **Agentic Pair Programming with Google Antigravity**
   - Guided by a custom [`AGENTS.md`](./AGENTS.md) persona (Senior Software Engineer standards, strict TypeScript, Server Components first, and static export constraints), the raw design was translated into modular, production-grade **Next.js 16** and **React 19** components.
3. **Conversational Iteration & Engineering Polish**
   - Every interactive detail was refined iteratively via natural-language prompts:
     - **Adaptive Light & Dark Theme:** Semantic CSS custom properties (`:root` and `html.dark`) in [`app/globals.css`](./app/globals.css) paired with an inline hydration script and a `useSyncExternalStore`-powered [`ThemeToggle`](./components/ThemeToggle.tsx) to prevent theme flash (FOUC).
     - **Motion & Smooth Scrolling:** Inertial smooth scrolling and anchor offset navigation using **Lenis** ([`SmoothScroll.tsx`](./components/SmoothScroll.tsx)) combined with `IntersectionObserver` scroll-reveal animations powered by **tw-animate-css** ([`Reveal.tsx`](./components/Reveal.tsx)).
     - **Single Source of Truth:** All profile details, career milestones, technical stack categories, and project showcases (Professional & Personal) are strictly typed and centralized in [`lib/data.ts`](./lib/data.ts).
     - **Static Export Ready:** Configured for zero-runtime-server deployment on GitHub Pages (`output: "export"`, `trailingSlash: true`, `.nojekyll`, and `gh-pages`).

---

## Key Features

- **Dual Theme System (Light & Dark Mode):** Seamless theme switching persisted in `localStorage` with semantic design tokens.
- **Inertial Smooth Scroll & Reveal Animations:** Fluid page scrolling via `lenis` and viewport-triggered entrance animations via `tw-animate-css`.
- **Categorized Technical Stack:** Structured breakdown across *Core Engineering & Architecture*, *Delivery, Tooling & Agile Workflow*, and *Communication & Languages*.
- **Dual Project Showcase:** Dedicated sections for **Professional Projects** (*CIMB Niaga · OCTO Web Internet Banking*) and **Personal Projects** (*Interactive Portfolio & Resume SPA*) with live preview links.
- **One-Click CV Download:** Direct resume PDF download (`CV_RUDY_FEBRIAN_THOMAS.pdf`) accessible from the sticky top header.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.4.5](https://nextjs.org/) (App Router, Static Export) |
| **UI Library** | [React 19.3.0](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`) + CSS Custom Properties |
| **Smooth Scroll & Motion** | [Lenis](https://lenis.darkroom.engineering/) + [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) |
| **Typography & Icons** | Google Fonts (`Geist`, `JetBrains Mono`) & Material Symbols Outlined |
| **Deployment** | GitHub Pages via [`gh-pages`](https://github.com/tschaub/gh-pages) |

---

## Project Structure

```text
├── app/
│   ├── globals.css          # Tailwind v4 imports, Light/Dark CSS tokens, & utility classes
│   ├── layout.tsx           # Root HTML shell, SEO metadata, fonts, & theme hydration script
│   └── page.tsx             # Main portfolio composition
├── components/
│   ├── AmbientBackground.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Icon.tsx
│   ├── Projects.tsx         # Professional & Personal project sections
│   ├── Reveal.tsx           # IntersectionObserver scroll-reveal wrapper
│   ├── SectionHeading.tsx
│   ├── SmoothScroll.tsx     # Lenis smooth scrolling provider
│   ├── Tag.tsx
│   ├── TechStack.tsx
│   └── ThemeToggle.tsx      # Single-icon Light/Dark mode toggle
├── lib/
│   └── data.ts              # Centralized, typed portfolio & resume data
├── public/
│   ├── .nojekyll            # Bypasses Jekyll processing on GitHub Pages
│   ├── CV_RUDY_FEBRIAN_THOMAS.pdf
│   └── images/              # Profile avatar & project preview screenshots
└── AGENTS.md                # AI coding agent persona, architecture guide, & rules
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Lint & Build Static Export

```bash
npm run lint
npm run build
```

The static site will be generated in the `out/` directory.

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

---

## License

© Rudy Febrian Thomas. All rights reserved.
