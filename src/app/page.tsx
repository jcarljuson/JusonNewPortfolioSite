import Navigation from "@/components/Navigation";
import Particles from "@/components/Particles";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Background Particles */}
      <Particles />

      {/* Navigation */}
      <Navigation />

      {/* Sections with proper z-indexing */}
      <Hero />
      <About />
      <Projects />
      <Education />
      <Footer />
    </main>
  );
}
