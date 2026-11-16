import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteTitle = "Rudy Febrian Thomas — Frontend Web Developer";
const siteDescription =
  "Portfolio and resume of Rudy Febrian Thomas, a Frontend Web Developer with 6+ years of experience in React.js, TypeScript and modern frontend architecture.";
const previewAlt =
  "Rudy Febrian Thomas — Frontend Web Developer portfolio preview";

export const metadata: Metadata = {
  metadataBase: new URL("https://rudyfebrianthomas.github.io"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Rudy Febrian Thomas",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/preview.webp",
        width: 1200,
        height: 630,
        alt: previewAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/preview.webp",
        alt: previewAlt,
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.classList.remove("dark");else if(t==="dark")document.documentElement.classList.add("dark");var l=localStorage.getItem("locale");if(l==="id")document.documentElement.lang="id"}catch(e){}`,
          }}
        />
        {/* App Router root layout applies to every page, so the rule's single-page concern doesn't apply. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="relative flex min-h-full flex-col bg-background font-sans text-body-md text-on-surface transition-colors duration-200 selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
