import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { Services } from "@/components/services";
import { Certifications } from "@/components/certifications";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Services />
      <Certifications />
      <Footer />
    </main>
  );
}
