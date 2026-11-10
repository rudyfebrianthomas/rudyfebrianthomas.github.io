export const profile = {
  name: "Rudy Febrian Thomas",
  roles: [
    "Frontend Developer",
    "Frontend Engineer",
  ],
  summary:
    "Frontend Web Developer with 6+ years of experience delivering scalable, high-performance web applications. Skilled in React.js, TypeScript, and modern frontend architecture to build clean, maintainable systems. Strong Agile collaborator adept at transforming complex requirements into reliable user experiences.",
  email: "rudyfebrian6@gmail.com",
  phone: "+62 85155441891",
  whatsapp: "https://wa.me/6285155441891",
  github: "https://github.com/rudyfebrianthomas",
  linkedin: "https://linkedin.com/in/rudyfebrianthomas",
  location: "Indonesia / Jakarta",
  timezone: "WIB Timezone (UTC+7)",
  resumeUrl: "https://drive.google.com/uc?export=download&id=1KLzxsuzFp-kzC2-HlqaYeKcFy6Le0esp",
} as const;

export const socialLinks = [
  { href: profile.github, icon: "code", label: "GitHub", external: true },
  { href: profile.linkedin, icon: "share", label: "LinkedIn", external: true },
  { href: `mailto:${profile.email}`, icon: "mail", label: "Email", external: true },
  { href: profile.whatsapp, icon: "call", label: "WhatsApp", external: true },
] as const;

export const navLinks = [
  { href: "#hero", label: "Profile" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export const experience = {
  title: "Frontend Web Developer",
  tenure: "7 Years of Professional Experience",
  company: "CIMB Niaga · OCTO Web & Internal Configuration Portal",
  period: "Mar 2019 – Feb 2026",
  description:
    "Responsible for engineering high-scale internet banking portals and mission-critical configuration dashboards, ensuring top-tier banking security standards, rapid UX transaction completion, and uninterrupted platform availability.",
  highlights: [
    "Engineered and maintained high-availability UI features for the **OCTO Web** internet banking platform using React.js and TypeScript, optimizing transaction flows and overall UX.",
    "Built and optimized an internal enterprise configuration portal using Vue.js, centralizing administrative settings and reducing operational configuration errors.",
    "Resolved critical frontend bugs and performance bottlenecks across platforms to enhance stability, responsiveness, and resilient data-handling.",
    "Collaborated closely with Backend, QA, and Product teams in an Agile environment to consistently deliver secure, production-ready releases on schedule.",
  ],
  tags: [
    "React.js",
    "TypeScript",
    "Tailwind CSS",
    "Redux Toolkit",
    "Vue.js",
    "Agile / Scrum",
    "Jira & Confluence",
  ],
} as const;

export const education = {
  degree: "Bachelor's Degree in Computer Science / Informatics",
  school: "Universitas Indraprasta PGRI (UNINDRA) · Jakarta, Indonesia",
  period: "Sep 2014 – Aug 2018",
  description:
    "Rigorous coursework focused on core algorithms, object-oriented programming with Java, relational database engineering (MySQL), and distributed software architecture.",
  tags: [
    "Data Structures & Algorithms",
    "Java OOP",
    "MySQL Database Design",
    "Software Engineering",
  ],
} as const;

export type TechCategory = "core" | "methodology" | "languages";

export const techFilters: { id: "all" | TechCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "core", label: "Core Skills" },
  { id: "methodology", label: "Methodologies & Tools" },
  { id: "languages", label: "Languages" },
];

export const techItems: {
  abbr: string;
  name: string;
  detail: string;
  badge: string;
  category: TechCategory;
}[] = [
  {
    abbr: "RE",
    name: "React.js",
    detail:
      "Modular component architecture, custom hooks, lifecycle optimization, and high-availability UI flows for internet banking.",
    badge: "Core Expertise · 6+ Years",
    category: "core",
  },
  {
    abbr: "NX",
    name: "Next.js",
    detail:
      "App Router, Server & Client Components, static exports (SSG), SSR, and performance-focused web application architecture.",
    badge: "Modern React Framework",
    category: "core",
  },
  {
    abbr: "VU",
    name: "Vue.js",
    detail:
      "Enterprise internal configuration portals, reactive form workflows, and centralized administrative dashboards.",
    badge: "Enterprise Admin Portals",
    category: "core",
  },
  {
    abbr: "RX",
    name: "Redux Toolkit & State Management",
    detail:
      "Predictable global state slices, async thunks, normalized caching, and complex multi-step transaction state flows.",
    badge: "Scalable State Architecture",
    category: "core",
  },
  {
    abbr: "TW",
    name: "Tailwind CSS & UI Architecture",
    detail:
      "Utility-first styling, responsive mobile-first layouts, dark/light design tokens, and reusable component systems.",
    badge: "Design System & UI Craft",
    category: "core",
  },
  {
    abbr: "ND",
    name: "Node.js & Express.js",
    detail:
      "RESTful API development and integration, authentication middleware, payload validation, and backend service orchestration.",
    badge: "Fullstack Integration",
    category: "core",
  },
  {
    abbr: "TS",
    name: "TypeScript & JavaScript (ES6+)",
    detail:
      "Strict static typing, interfaces & generics, asynchronous patterns, and clean, maintainable production code.",
    badge: "Primary Programming Languages",
    category: "core",
  },
  {
    abbr: "HC",
    name: "HTML5 & CSS3",
    detail:
      "Semantic accessible markup (WCAG/ARIA), modern Flexbox & Grid layouts, custom properties, and cross-browser compatibility.",
    badge: "Web Standards & Accessibility",
    category: "core",
  },
  {
    abbr: "AG",
    name: "Agile / Scrum Delivery",
    detail:
      "End-to-end sprint execution—backlog refinement, story estimation, daily standups, sprint reviews, and retrospectives.",
    badge: "Enterprise Banking Sprints",
    category: "methodology",
  },
  {
    abbr: "JC",
    name: "Git, Jira & Confluence",
    detail:
      "Feature-branch & pull-request workflows, structured issue tracking, technical specifications, and release documentation.",
    badge: "Version Control & Docs",
    category: "methodology",
  },
  {
    abbr: "TM",
    name: "Cross-Functional Collaboration",
    detail:
      "Close alignment with Backend, QA, UI/UX, and Product teams to translate complex banking requirements into secure releases.",
    badge: "Product · QA · Backend Sync",
    category: "methodology",
  },
  {
    abbr: "LN",
    name: "Indonesian & English",
    detail:
      "Indonesian (Native) and English (Intermediate) for daily engineering collaboration, documentation, and stakeholder syncs.",
    badge: "Spoken Languages · ID & EN",
    category: "languages",
  },
];

export type ProjectItem = {
  name: string;
  status: string;
  image: string;
  imageAlt: string;
  description: string;
  stack: readonly string[];
  repoUrl?: string | null;
  demoUrl?: string | null;
};

export const professionalProjects: readonly ProjectItem[] = [
  {
    name: "CIMB Niaga · OCTO Web Internet Banking",
    status: "Live Production",
    image: "/images/projects/project-octo-web.webp",
    imageAlt:
      "Live preview of CIMB Niaga OCTO Web internet banking portal (cimbocto.co.id)",
    description:
      "Enterprise retail internet banking portal serving CIMB Niaga customers across Indonesia. Engineered and maintained high-availability frontend modules using React.js, TypeScript, and Redux Toolkit—covering account dashboards, fund transfers, bill payments, investment flows, and multi-factor transaction verification.",
    stack: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "REST APIs",
    ],
    repoUrl: null,
    demoUrl: "https://www.cimbocto.co.id/",
  },
];

export const personalProjects: readonly ProjectItem[] = [
  {
    name: "Rudy Febrian Thomas — Portfolio & Resume",
    status: "Live Site",
    image: "/images/projects/project-profile.webp",
    imageAlt:
      "Rudy Febrian Thomas's frontend developer portfolio and interactive resume",
    description:
      "A responsive portfolio and interactive resume showcasing frontend experience, education, skills, and projects. Features a filterable tech stack, light and dark themes, smooth scrolling, a downloadable resume, and an email contact form.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "Lenis",
      "tw-animate-css",
      "GitHub Pages",
    ],
    repoUrl: "https://github.com/rudyfebrianthomas/rudyfebrianthomas.github.io",
    demoUrl: "https://rudyfebrianthomas.github.io/",
  },
  {
    name: "Tech Career Buddy - Konsultan Karir IT AI",
    status: "Live Site",
    image: "/images/projects/project-tech-buddy.webp",
    imageAlt:
      "Tech Career Buddy chat interface with a conversation about IT careers",
    description:
      "Gemini-powered IT career chatbot offering career guidance, learning roadmaps, and CV and portfolio reviews. Supports PDF, image, and audio uploads for feedback, including mock interview practice.",
    stack: [
      "Node.js",
      "Express",
      "Google Gemini AI",
      "JavaScript",
      "HTML & CSS",
      "Multer",
      "marked.js",
    ],
    repoUrl: "https://github.com/rudyfebrianthomas/final-project-maju-bareng-AI",
    demoUrl: "https://final-project-maju-bareng-ai.vercel.app/",
  },
  {
    name: "Febrian Thomas — Illustrator Portfolio",
    status: "Live Site",
    image: "/images/projects/project-ft.webp",
    imageAlt: "Preview of Febrian Thomas's illustration portfolio website",
    description:
      "A bilingual portfolio for illustrator and 2D animator Febrian Thomas, showcasing illustrations, projects, and posts. Includes search, tags, light and dark themes, and an owner-managed rich-text editor.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Tiptap",
      "Motion",
      "Lenis",
      "GitHub Pages",
    ],
    repoUrl: "https://github.com/febrianthomas/febrianthomas.github.io",
    demoUrl: "https://febrianthomas.github.io/",
  },
];

