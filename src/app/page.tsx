'use client';

import { useState } from 'react';
import Navigation from "@/components/Navigation";
import Particles from "@/components/Particles"; // Keeping old particles as a layer if needed, or replacing? I'll keep both for depth.
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import Preloader from "@/components/Preloader";
import ViewCounter from "@/components/ViewCounter";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* System Preloader - Blocks view until done */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Interactive Background (Canvas) */}
      <Starfield />

      {/* Legacy Particles (Optional: remove if too chaotic, but blending might be nice) */}
      {/* <Particles /> */}

      {/* Navigation */}
      <Navigation />

      {/* Global View Counter (Top Right) */}
      <div className="fixed top-6 right-6 z-[60] hidden md:block">
        <ViewCounter />
      </div>

      {/* Sections with proper z-indexing */}
      <Hero startAnimation={!isLoading} />
      <About />
      <Projects />
      <Education />
      <Footer />
    </main>
  );
}
