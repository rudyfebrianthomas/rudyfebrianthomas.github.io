"use client";

import { useSyncExternalStore } from "react";
import {
  education,
  experience,
  navLinks,
  personalProjects,
  professionalProjects,
  profile,
  techFilters,
  techItems,
  type EducationItem,
  type ExperienceItem,
  type NavLink,
  type ProjectItem,
  type TechFilter,
  type TechItem,
} from "./data";

export type Locale = "en" | "id";

const LOCALE_KEY = "locale";
const LOCALE_EVENT = "portfolio-locale-change";

function subscribeLocale(callback: () => void) {
  window.addEventListener(LOCALE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LOCALE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getLocaleSnapshot(): Locale {
  try {
    return localStorage.getItem(LOCALE_KEY) === "id" ? "id" : "en";
  } catch {
    return "en";
  }
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

function subscribeHydrated() {
  return () => {};
}

export function setStoredLocale(next: Locale) {
  try {
    localStorage.setItem(LOCALE_KEY, next);
  } catch {
    // Ignore storage errors in restricted environments.
  }
  document.documentElement.lang = next;
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

/**
 * Syncs with localStorage after hydration while rendering `"en"` on the initial
 * pass so static-export HTML never causes a hydration mismatch.
 */
export function useLocale(): readonly [Locale, (next: Locale) => void] {
  const isClient = useSyncExternalStore(
    subscribeHydrated,
    () => true,
    () => false,
  );
  const stored = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const locale: Locale = isClient ? stored : "en";
  return [locale, setStoredLocale] as const;
}

export type LocalizedPortfolioContent = {
  header: {
    skipToContent: string;
    mainNavLabel: string;
    resumeLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    menuTitle: string;
    themeToLight: string;
    themeToDark: string;
    languageToggleLabel: string;
  };
  navLinks: readonly NavLink[];
  profileSection: {
    badge: string;
    roles: readonly string[];
    summary: string;
    primaryCta: string;
    secondaryCta: string;
    avatarAlt: string;
  };
  experienceSection: {
    heading: string;
    item: ExperienceItem;
  };
  educationSection: {
    heading: string;
    item: EducationItem;
  };
  techStackSection: {
    heading: string;
    filterGroupLabel: string;
    carouselLabel: string;
    pauseLabel: string;
    resumeLabel: string;
    touchHint: string;
    filters: readonly TechFilter[];
    items: readonly TechItem[];
  };
  projectsSection: {
    heading: string;
    professionalTitle: string;
    professionalSubtitle: string;
    personalTitle: string;
    personalSubtitle: string;
    carouselSuffix: string;
    pausePrefix: string;
    resumePrefix: string;
    touchHint: string;
    repoLabelSuffix: string;
    visitPrefix: string;
    visitSuffix: string;
    professional: readonly ProjectItem[];
    personal: readonly ProjectItem[];
  };
  contactSection: {
    heading: string;
    directTitle: string;
    directDescription: string;
    emailSubtitle: string;
    phoneSubtitle: string;
    timezone: string;
    copyEmail: string;
    copiedEmail: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      helperNote: string;
      sentBanner: string;
    };
  };
  footer: {
    rights: string;
  };
};

const ID_TECH_TRANSLATIONS: Record<
  string,
  Pick<TechItem, "badge" | "detail"> & { name?: string }
> = {
  RE: {
    badge: "Keahlian Utama · 6+ Tahun",
    detail:
      "Arsitektur komponen modular, custom hooks, optimasi lifecycle, serta alur UI ketersediaan tinggi untuk internet banking.",
  },
  NX: {
    badge: "Framework React Modern",
    detail:
      "App Router, Server & Client Components, static export (SSG), SSR, dan arsitektur aplikasi web berfokus performa.",
  },
  VU: {
    badge: "Portal Admin Enterprise",
    detail:
      "Portal konfigurasi internal enterprise, alur formulir reaktif, dan dashboard administratif terpusat.",
  },
  RX: {
    badge: "Manajemen State Skalabel",
    detail:
      "State global terprediksi, async thunks, normalized caching, dan alur transaksi multi-langkah yang kompleks.",
  },
  TW: {
    badge: "Sistem Desain & Kerapian UI",
    detail:
      "Styling utility-first, tata letak mobile-first responsif, token tema gelap/terang, serta sistem komponen reusable.",
  },
  ND: {
    badge: "Integrasi Fullstack",
    detail:
      "Pengembangan dan integrasi RESTful API, middleware autentikasi, validasi payload, serta orkestrasi layanan backend.",
  },
  TS: {
    badge: "Bahasa Pemrograman Utama",
    detail:
      "Pengetikan statis ketat, interface & generics, pola asinkron, serta kode produksi yang bersih dan terawat.",
  },
  HC: {
    badge: "Standar Web & Aksesibilitas",
    detail:
      "Markup semantik aksesibel (WCAG/ARIA), layout Flexbox & Grid modern, CSS custom properties, dan kompatibilitas lintas browser.",
  },
  AG: {
    badge: "Sprint Perbankan Enterprise",
    detail:
      "Eksekusi sprint menyeluruh—backlog refinement, estimasi story, daily standup, sprint review, dan retrospektif.",
  },
  JC: {
    badge: "Kontrol Versi & Dokumentasi",
    detail:
      "Alur feature-branch & pull-request, pelacakan issue terstruktur, spesifikasi teknis, dan dokumentasi rilis.",
  },
  TM: {
    badge: "Sinkronisasi Product · QA · Backend",
    detail:
      "Koordinasi erat bersama tim Backend, QA, UI/UX, dan Product untuk menerjemahkan kebutuhan perbankan menjadi rilis yang aman.",
  },
  LN: {
    name: "Indonesia & Inggris",
    badge: "Bahasa Lisan & Tulis · ID & EN",
    detail:
      "Bahasa Indonesia (Asli) dan Inggris (Menengah) untuk kolaborasi harian tim engineering, dokumentasi, dan sinkronisasi stakeholder.",
  },
};

const ID_PROJECT_DESCRIPTIONS: readonly string[] = [
  "Portal internet banking ritel enterprise bagi nasabah CIMB Niaga di seluruh Indonesia. Mengembangkan dan memelihara modul frontend ketersediaan tinggi dengan React.js, TypeScript, dan Redux Toolkit—mencakup ringkasan rekening, transfer dana, pembayaran tagihan, investasi, dan verifikasi transaksi multi-faktor.",
  "Portofolio pribadi dan resume interaktif yang menampilkan pengalaman frontend, pendidikan, keahlian, dan proyek. Dilengkapi karusel teknologi dengan filter, pergantian bahasa EN/ID, tema gelap dan terang, gulir halus Lenis, unduhan CV, serta formulir kontak.",
  "Chatbot konsultan karir IT multimodal berbasis Google Gemini. Membantu pengguna merancang peta jalan karir IT, pemrograman, wawancara teknis, portofolio, dan CV, serta mendukung unggahan gambar, PDF, dan audio hingga 20 MB dengan format balasan Markdown.",
  "Portofolio dan blog dwibahasa EN/ID untuk ilustrator dan animator 2D Febrian Thomas. Didukung Supabase untuk artikel, proyek, autentikasi, dan penyimpanan langsung tanpa build ulang, dilengkapi pencarian tag, editor Tiptap, optimasi WebP/GIF, tema, dan audio.",
  "Pelacak antrean komisi, portal permintaan, dan ruang kerja admin untuk febrianthomas. Dilengkapi papan kanban 6 tahap, slot penawaran USD/IDR dengan unggahan referensi WebP/GIF, Auth/RPC Supabase, pengelolaan papan massal, antarmuka EN/ID, dan kontrol audio.",
  "Kompresor gambar dan audio sisi klien yang berjalan lokal di memori browser dengan WebAssembly tanpa unggahan ke server. Mengonversi gambar raster ke WebP, mengoptimalkan GIF animasi, mengompresi audio ke MP3 beserta pratinjau putar, dan mengekspor batch sebagai ZIP.",
];

export function getPortfolioContent(locale: Locale): LocalizedPortfolioContent {
  if (locale === "id") {
    return {
      header: {
        skipToContent: "Langsung ke konten",
        mainNavLabel: "Navigasi utama",
        resumeLabel: "Unduh CV",
        openMenuLabel: "Buka menu navigasi",
        closeMenuLabel: "Tutup menu navigasi",
        menuTitle: "Menu",
        themeToLight: "Ubah ke mode terang",
        themeToDark: "Ubah ke mode gelap",
        languageToggleLabel: "Ganti bahasa ke Inggris",
      },
      navLinks: [
        { href: "#profile", label: "Profil" },
        { href: "#experience", label: "Pengalaman" },
        { href: "#education", label: "Pendidikan" },
        { href: "#tech-stack", label: "Teknologi" },
        { href: "#projects", label: "Proyek" },
        { href: "#contact", label: "Kontak" },
      ],
      profileSection: {
        badge: `${profile.location} · 6+ Tahun Pengalaman`,
        roles: profile.roles,
        summary:
          "Frontend Web Developer dengan pengalaman 6+ tahun membangun aplikasi web yang skalabel dan berperforma tinggi. Terampil menggunakan React.js, TypeScript, serta arsitektur frontend modern untuk menghasilkan sistem yang bersih dan mudah dirawat. Kolaborator Agile yang andal dalam mengubah kebutuhan kompleks menjadi pengalaman pengguna yang nyaman.",
        primaryCta: "Hubungi Saya",
        secondaryCta: "Lihat Proyek",
        avatarAlt: "Rudy Febrian Thomas, Frontend Web Developer",
      },
      experienceSection: {
        heading: "Pengalaman Kerja",
        item: {
          ...experience,
          tenure: "6+ Tahun Pengalaman Profesional",
          description:
            "Bertanggung jawab merancang portal internet banking berskala besar dan dashboard konfigurasi internal yang krusial, memastikan standar keamanan perbankan terbaik, kelancaran alur transaksi pengguna, serta ketersediaan platform tanpa gangguan.",
          highlights: [
            "Mengembangkan dan memelihara fitur UI berketersediaan tinggi untuk platform internet banking **OCTO Web** menggunakan React.js dan TypeScript guna mengoptimalkan alur transaksi dan UX.",
            "Membangun dan mengoptimalkan portal konfigurasi internal enterprise menggunakan Vue.js untuk memusatkan pengaturan administratif dan menekan kesalahan konfigurasi operasional.",
            "Menyelesaikan bug frontend kritis serta hambatan performa di berbagai platform demi meningkatkan stabilitas, responsivitas, dan ketahanan pengelolaan data.",
            "Berkolaborasi erat dengan tim Backend, QA, dan Product dalam lingkungan Agile untuk merilis pembaruan yang aman dan siap produksi tepat waktu.",
          ],
        },
      },
      educationSection: {
        heading: "Pendidikan",
        item: {
          ...education,
          degree: "Sarjana Teknik Informatika / Ilmu Komputer",
          period: "Sep 2014 – Agu 2018",
          description:
            "Perkuliahan berfokus pada algoritma inti, pemrograman berorientasi objek dengan Java, perancangan basis data relasional (MySQL), dan arsitektur perangkat lunak terdistribusi.",
          tags: [
            "Struktur Data & Algoritma",
            "Java OOP",
            "Desain Database MySQL",
            "Rekayasa Perangkat Lunak",
          ],
        },
      },
      techStackSection: {
        heading: "Teknologi & Keahlian",
        filterGroupLabel: "Filter teknologi",
        carouselLabel: "Karusel teknologi dan keahlian",
        pauseLabel: "Jeda gulir otomatis teknologi",
        resumeLabel: "Lanjutkan gulir otomatis teknologi",
        touchHint: "Ketuk kartu untuk melihat detail",
        filters: [
          { id: "all", label: "Semua" },
          { id: "core", label: "Keahlian Utama" },
          { id: "methodology", label: "Metodologi & Alat" },
          { id: "languages", label: "Bahasa" },
        ],
        items: techItems.map((item) => {
          const translated = ID_TECH_TRANSLATIONS[item.abbr];
          return translated ? { ...item, ...translated } : item;
        }),
      },
      projectsSection: {
        heading: "Proyek",
        professionalTitle: "Proyek Profesional",
        professionalSubtitle: "Sistem Enterprise & Produksi",
        personalTitle: "Proyek Pribadi",
        personalSubtitle: "Eksplorasi Independen & Open-Source",
        carouselSuffix: "karusel",
        pausePrefix: "Jeda gulir otomatis",
        resumePrefix: "Lanjutkan gulir otomatis",
        touchHint: "Ketuk kartu untuk deskripsi & teknologi",
        repoLabelSuffix: "Repositori GitHub",
        visitPrefix: "Kunjungi situs",
        visitSuffix: "",
        professional: professionalProjects.map((project, idx) => ({
          ...project,
          description: ID_PROJECT_DESCRIPTIONS[idx] ?? project.description,
        })),
        personal: personalProjects.map((project, idx) => ({
          ...project,
          description:
            ID_PROJECT_DESCRIPTIONS[idx + professionalProjects.length] ??
            project.description,
        })),
      },
      contactSection: {
        heading: "Kontak",
        directTitle: "Kontak Langsung",
        directDescription:
          "Tersedia untuk posisi Frontend Web Developer, pengembangan aplikasi web berperforma tinggi, serta kolaborasi tim engineering produk.",
        emailSubtitle: "Email Utama",
        phoneSubtitle: "WhatsApp & Telepon Langsung",
        timezone: "Zona Waktu WIB (UTC+7)",
        copyEmail: "Salin alamat email",
        copiedEmail: "Email tersalin",
        form: {
          nameLabel: "Nama",
          namePlaceholder: "Nama Anda",
          emailLabel: "Email",
          emailPlaceholder: "anda@perusahaan.com",
          subjectLabel: "Subjek",
          subjectPlaceholder: "Lowongan Frontend atau diskusi proyek",
          messageLabel: "Pesan",
          messagePlaceholder:
            "Bagikan detail posisi, konteks tim, atau lini masa proyek...",
          submitButton: "Kirim Pesan",
          helperNote:
            "Membuka aplikasi email bawaan Anda dengan draf siap kirim.",
          sentBanner:
            "Membuka aplikasi email dengan draf siap kirim. Jika tidak terbuka, gunakan tombol salin di samping alamat email.",
        },
      },
      footer: {
        rights: "Hak cipta dilindungi.",
      },
    };
  }

  return {
    header: {
      skipToContent: "Skip to content",
      mainNavLabel: "Main navigation",
      resumeLabel: "Resume",
      openMenuLabel: "Open navigation menu",
      closeMenuLabel: "Close navigation menu",
      menuTitle: "Menu",
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
      languageToggleLabel: "Switch language to Indonesian",
    },
    navLinks,
    profileSection: {
      badge: `${profile.location} · 6+ Years Experience`,
      roles: profile.roles,
      summary: profile.summary,
      primaryCta: "Get in Touch",
      secondaryCta: "View Projects",
      avatarAlt: "Rudy Febrian Thomas, Frontend Web Developer",
    },
    experienceSection: {
      heading: "Work Experience",
      item: experience,
    },
    educationSection: {
      heading: "Education",
      item: education,
    },
    techStackSection: {
      heading: "Tech Stack",
      filterGroupLabel: "Filter tech stack",
      carouselLabel: "Tech stack carousel",
      pauseLabel: "Pause tech stack auto-scroll",
      resumeLabel: "Resume tech stack auto-scroll",
      touchHint: "Tap card for details",
      filters: techFilters,
      items: techItems,
    },
    projectsSection: {
      heading: "Projects",
      professionalTitle: "Professional Projects",
      professionalSubtitle: "Enterprise & Production Systems",
      personalTitle: "Personal Projects",
      personalSubtitle: "Independent & Open-Source Explorations",
      carouselSuffix: "carousel",
      pausePrefix: "Pause",
      resumePrefix: "Resume",
      touchHint: "Tap card for summary & stack",
      repoLabelSuffix: "GitHub repository",
      visitPrefix: "Visit",
      visitSuffix: "live site",
      professional: professionalProjects,
      personal: personalProjects,
    },
    contactSection: {
      heading: "Contact",
      directTitle: "Direct Contact",
      directDescription:
        "Available for Frontend Web Developer roles, high-performance web applications, and product engineering teams.",
      emailSubtitle: "Direct Primary Email",
      phoneSubtitle: "WhatsApp & Direct Phone",
      timezone: profile.timezone,
      copyEmail: "Copy email address",
      copiedEmail: "Email address copied",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "you@company.com",
        subjectLabel: "Subject",
        subjectPlaceholder: "Frontend role or project inquiry",
        messageLabel: "Message",
        messagePlaceholder: "Share role details, team context, or timeline...",
        submitButton: "Send Message",
        helperNote: "Opens your default email client with a pre-filled draft.",
        sentBanner:
          "Opening your email app with the draft ready. If nothing opens, use the copy button next to the email address.",
      },
    },
    footer: {
      rights: "All rights reserved.",
    },
  };
}
