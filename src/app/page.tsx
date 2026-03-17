'use client';

import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";
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
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  // Detect in-app browsers (Facebook, Messenger, Instagram, etc.)
  // Their browser chrome overlays the top of the page content
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const inApp = /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger|Line\/|Twitter|Snapchat|TikTok|Pinterest/i.test(ua);
    setIsInAppBrowser(inApp);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* System Preloader - Blocks view until done */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* In-App Browser Spacer: pushes ALL content below the browser chrome overlay */}
      {/* Facebook/Messenger/Instagram in-app browsers render their toolbar ON TOP of content */}
      {isInAppBrowser && (
        <div
          className="w-full"
          style={{ height: 'env(safe-area-inset-top, 0px)' }}
          aria-hidden="true"
        />
      )}

      {/* Interactive Background (Canvas) */}
      <Starfield />

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
