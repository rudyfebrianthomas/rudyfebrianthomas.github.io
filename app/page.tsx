import { AmbientBackground } from "@/components/AmbientBackground";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Reveal } from "@/components/Reveal";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TechStack } from "@/components/TechStack";

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
