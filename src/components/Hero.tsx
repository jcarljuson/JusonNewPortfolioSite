'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface HeroProps {
    startAnimation?: boolean;
}

export default function Hero({ startAnimation = true }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const [text, setText] = useState('');
    const fullText = "Jcarl Juson";

    useEffect(() => {
        if (!startAnimation) return;

        // Typing effect loop
        let currentIndex = 0;
        let intervalId: NodeJS.Timeout;

        const typingDelay = setTimeout(() => {
            intervalId = setInterval(() => {
                if (currentIndex <= fullText.length) {
                    setText(fullText.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                }
            }, 100); // Typing speed
        }, 500); // Initial delay before typing starts

        const ctx = gsap.context(() => {
            // REMOVED: Old GSAP name animation
            // Subtitle animation
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 2.0 } // Delayed to finish after typing
            );

            // Buttons animation
            gsap.fromTo(
                buttonsRef.current?.children || [],
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                    stagger: 0.1,
                    delay: 2.5, // Delayed to finish after typing
                }
            );
        }, containerRef);

        return () => {
            ctx.revert();
            clearTimeout(typingDelay);
            if (intervalId) clearInterval(intervalId);
        };
    }, [startAnimation]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ zIndex: 10 }}
        >
            {/* Subtle Orbs */}
            <div className="orb orb-primary w-[800px] h-[800px] -top-[300px] -left-[300px]" />
            <div className="orb orb-secondary w-[600px] h-[600px] top-1/2 -right-[200px]" style={{ animationDelay: '3s' }} />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                {/* Name with Typing Effect */}
                <h1
                    ref={nameRef}
                    className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6 text-primary h-[1.2em]" // Fixed height to prevent layout shift
                    style={{ perspective: '1000px' }}
                >
                    {text}
                    <span className="animate-cursor-blink">|</span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-secondary mb-12 max-w-2xl mx-auto opacity-0 font-normal"
                >
                    AI Engineering & Neurotechnology Enthusiast who&apos;s building the future at the intersection of artificial and biological intelligence.
                </p>

                {/* Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#projects"
                        className="btn-primary px-8 py-4 text-lg"
                    >
                        View Projects
                    </a>
                    <a
                        href="mailto:jusonjcarl@gmail.com"
                        className="btn-secondary px-8 py-4 text-lg"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white/30 rounded-full" />
                </div>
            </div>
        </section>
    );
}
