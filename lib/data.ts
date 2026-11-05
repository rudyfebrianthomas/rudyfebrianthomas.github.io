export const profile = {
  name: "Rudy Febrian Thomas",
  roles: [
    "Frontend Developer",
    "Frontend Engineer",
    "Fullstack Developer",
    "Fullstack Engineer",
  ],
  summary:
    "Frontend Web Developer with 6+ years of experience delivering scalable, high-performance web applications. Skilled in React.js, TypeScript, and modern frontend architecture to build clean, maintainable systems. Strong Agile collaborator adept at transforming complex requirements into reliable user experiences.",
  email: "rudyfebrian6@gmail.com",
  phone: "+62 85155441891",
  whatsapp: "https://wa.me/6285155441891",
  github: "https://github.com/rudyfebrian",
  linkedin: "https://linkedin.com/in/rudy-febrian-thomas",
} as const;

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
  tenure: "7 Years Tenure",
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
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
    "Banking Security",
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
    detail: "Component Architecture, Hooks, State",
    badge: "Core Expertise · 6+ Years",
    category: "core",
  },
  {
    abbr: "TS",
    name: "TypeScript & JavaScript",
    detail: "Strict Typing, ES6+, Clean Code",
    badge: "Daily Production Standard",
    category: "core",
  },
  {
    abbr: "NX",
    name: "Next.js & Vue.js",
    detail: "SSR, Hybrid Architecture, Admin Portals",
    badge: "Framework Precision",
    category: "core",
  },
  {
    abbr: "TW",
    name: "Tailwind CSS, HTML & CSS",
    detail: "Responsive Layouts, Design Systems",
    badge: "Pixel-Perfect UI",
    category: "core",
  },
  {
    abbr: "ND",
    name: "Node.js & Express.js",
    detail: "REST APIs, Backend Integration",
    badge: "Fullstack Proficiency",
    category: "core",
  },
  {
    abbr: "AG",
    name: "Agile / Scrum",
    detail: "Sprint planning, standups, retro",
    badge: "Iterative Delivery",
    category: "methodology",
  },
  {
    abbr: "JC",
    name: "Jira & Confluence",
    detail: "Task tracking, sprint documentation",
    badge: "Project Management",
    category: "methodology",
  },
  {
    abbr: "TM",
    name: "Cross-Functional Collaboration",
    detail: "Seamless alignment with Backend, QA & Product",
    badge: "Team Synergy",
    category: "methodology",
  },
  {
    abbr: "LN",
    name: "Languages",
    detail: "Indonesian (Native) · English (Intermediate)",
    badge: "Bilingual Communication",
    category: "languages",
  },
];

export const projects = [
  {
    name: "Chronos Telemetry Cloud",
    status: "Live Production",
    image: "/images/project-chronos.jpg",
    imageAlt:
      "Dark analytics dashboard with data visualization cards and purple sparklines",
    description:
      "Real-time distributed tracing platform with sub-second aggregate graphs for multi-region microservices. Processes over 50,000 metrics per second.",
    stack: ["Next.js 14", "ClickHouse", "Apache Kafka", "Tailwind"],
    repoUrl: "https://github.com/rudyfebrian",
    demoUrl: null,
  },
  {
    name: "Stratos Token Engine",
    status: "Open Source",
    image: "/images/project-stratos.jpg",
    imageAlt:
      "Code editor with a design token configurator and live component previews",
    description:
      "Automated CLI and AST analyzer that parses Figma Variables and compiles them directly into typed Tailwind plugins and CSS custom properties.",
    stack: ["TypeScript", "Node CLI", "Figma REST API", "Turborepo"],
    repoUrl: "https://github.com/rudyfebrian",
    demoUrl: null,
  },
] as const;

