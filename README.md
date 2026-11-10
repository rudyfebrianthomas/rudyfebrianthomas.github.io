# Rudy Febrian Thomas — Portfolio

A personal portfolio and interactive resume for frontend developer Rudy Febrian Thomas. The site presents his experience, education, technical skills, and projects in a responsive, statically exported website.

**Live site:** [rudyfebrianthomas.github.io](https://rudyfebrianthomas.github.io/)

## Features

- Profile, work experience, education, and professional and personal projects.
- Filterable technology stack and a downloadable PDF resume.
- Light and dark themes, with the selected theme saved in the browser.
- Smooth scrolling, section navigation, and scroll-triggered reveals.
- Contact form that opens a prefilled message in the visitor's email app; it does not send messages from a server.

## Technology

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 App Router and React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 and semantic CSS custom properties |
| Motion | Lenis and `tw-animate-css` |
| Fonts and icons | Geist, JetBrains Mono, and Material Symbols Outlined |
| Hosting | GitHub Pages via GitHub Actions |

## Getting started

Use Node.js 24 and npm, matching the deployment workflow. Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Next.js fetches the configured Google Fonts during a production build, so the build needs network access to Google Fonts.

## Commands

```bash
npm run dev    # Start the development server
npm run lint   # Run ESLint
npm run build  # Build the static site into out/
```

## Project structure

```text
app/                     Page composition, metadata, global styles, and theme setup
components/              Portfolio sections and interactive components
lib/data.ts              Profile, navigation, experience, skills, and project content
public/                  Images and other static assets
next.config.ts           Static export configuration
.github/workflows/       GitHub Pages deployment workflow
```

Edit `lib/data.ts` to update portfolio content and links, including the Google Drive resume download URL. Replace images in `public/` when their source files change. Theme tokens live in `app/globals.css`; page metadata and fonts are configured in `app/layout.tsx`.

## Deployment

The site uses Next.js static export (`output: "export"`), with trailing slashes enabled and image optimization disabled. The generated `out/` directory contains the HTML, CSS, JavaScript, and public assets; no runtime server is required.

GitHub Pages is configured to use GitHub Actions. To deploy, push the desired changes to the repository's default branch, open **Actions → Deploy to GitHub Pages → Run workflow**, and select that branch. The workflow installs dependencies, builds the site, uploads `out/`, and deploys the artifact to the `github-pages` environment. It runs manually and does not deploy automatically on push.

## Contact

- [GitHub](https://github.com/rudyfebrianthomas)
- [LinkedIn](https://linkedin.com/in/rudyfebrianthomas)
- Email: [rudyfebrian6@gmail.com](mailto:rudyfebrian6@gmail.com)
