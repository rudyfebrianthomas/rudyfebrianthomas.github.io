import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Profile } from "@/components/sections/Profile";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <AmbientBackground />
      <Header />
      <main
        id="main-content"
        className="relative z-10 w-full flex-1 pt-38.5 sm:pt-28 lg:pt-16"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-8 sm:px-6 md:gap-28 md:py-12 lg:px-12">
          <Profile />
          <Experience />
          <Education />
          <TechStack />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
