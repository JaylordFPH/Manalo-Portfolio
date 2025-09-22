import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { TechStack } from "@/components/tech-stack";
import { Projects } from "@/components/projects";
import { Certifications } from "@/components/certifications";
import { Services } from "@/components/services";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#00010D] text-white overflow-x-hidden">
      <Hero />
      <About />
      <TechStack />
      <section id="projects">
        <Projects />
      </section>
      <Certifications />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
