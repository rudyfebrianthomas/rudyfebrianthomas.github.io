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

export const metadata: Metadata = {
  title: "Rudy Febrian Thomas — Frontend Web Developer",
  description:
    "Portfolio and resume of Rudy Febrian Thomas, a Frontend Web Developer with 6+ years of experience in React.js, TypeScript and modern frontend architecture.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* App Router root layout applies to every page, so the rule's single-page concern doesn't apply. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="relative flex min-h-full flex-col bg-background font-sans text-body-md text-on-surface selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
