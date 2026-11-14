import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <AmbientBackground />
      <Header />
      <main className="relative z-10 w-full flex-1 pt-38.5 md:pt-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 py-8 sm:px-6 md:gap-28 md:py-12 lg:px-12">
          <Reveal>
            <Hero />
          </Reveal>
          <Reveal>
            <Experience />
          </Reveal>
          <Reveal>
            <Education />
          </Reveal>
          <Reveal>
            <TechStack />
          </Reveal>
          <Reveal>
            <Projects />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
