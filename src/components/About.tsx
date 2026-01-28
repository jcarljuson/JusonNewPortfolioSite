'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Cpu, Cog, Rocket, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const expertiseAreas = [
    {
        icon: Brain,
        title: 'Neuroscience',
        description: 'Exploring the neural basis of cognition and developing brain-computer interfaces for next-generation human-machine interaction.',
    },
    {
        icon: Cpu,
        title: 'AI / Machine Learning',
        description: 'Building intelligent systems that learn, adapt, and augment human capabilities through deep learning and neural networks.',
    },
    {
        icon: Cog,
        title: 'Robotics',
        description: 'Designing autonomous systems and prosthetics that seamlessly integrate with human physiology and intent.',
    },
];

const bioHighlights = [
    {
        icon: Rocket,
        text: 'NASA International Space Apps Global Nominee, selected among 11,500+ teams worldwide for developing an AI-powered exoplanet detection system.',
    },
    {
        icon: Cog,
        text: 'Developed a nerve-controlled prosthetic arm using EMG-based robotic control systems in high school.',
    },
    {
        icon: Brain,
        text: 'Experience with EEG brainwave interfaces that translate neural signals into robotic or computer movements.',
    },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const blurRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // 1. PINNING & LAYOUT ANIMATION (Runs immediately)
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Create a main timeline that handles the pinning for the entire duration
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=400%', // 4x screen height scroll
                    pin: true,
                    scrub: 1, // Increased from 0.1 for smoother "butter" feel
                }
            });

            // Bio Box Blur: Unblur continuously through the movement
            tl.fromTo(
                blurRef.current,
                { backdropFilter: "blur(24px)", webkitBackdropFilter: "blur(24px)" },
                { backdropFilter: "blur(0px)", webkitBackdropFilter: "blur(0px)", duration: 2, ease: "power1.inOut" },
                0
            );

            // Bio Box: Move UP (sync with unblur)
            tl.fromTo(
                contentRef.current,
                { y: 0, scale: 1 },
                { y: -100, scale: 0.95, duration: 2, ease: "power1.inOut" },
                0
            );

            // Bio Box: Fade OUT (Start later so unblur is visible first)
            tl.fromTo(
                contentRef.current,
                { opacity: 1 },
                { opacity: 0, duration: 1 },
                1 // Start fading halfway through the movement
            );

            // Expertise Cards: Fade IN and Move UP (40% - 100%)
            tl.fromTo(
                cardsRef.current,
                { opacity: 0, y: 300 }, // Start lower (was 100)
                { opacity: 1, y: 0, duration: 2.5 }, // Slower ascent (was 2)
                2.0 // Start earlier (was 2.5) so it rises slowly
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // 2. VIDEO SCRUBBING (Robust polling)
    useLayoutEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force pause immediately
        video.pause();
        video.currentTime = 0;

        let ctx: gsap.Context;
        let pollInterval: NodeJS.Timeout;

        const initVideoScrub = () => {
            // If duration is still not ready, keep waiting
            if (!video.duration || isNaN(video.duration)) {
                return;
            }

            // Stop polling once we have duration
            if (pollInterval) clearInterval(pollInterval);

            // Clean up any existing trigger/context to be safe before creating new one
            if (ctx) ctx.revert();

            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=400%', // Match main timeline
                    scrub: 0.1,    // Smooth scrubbing
                    onUpdate: (self) => {
                        try {
                            if (video.duration) {
                                const time = self.progress * video.duration;
                                if (isFinite(time)) {
                                    video.currentTime = time;
                                }
                            }
                        } catch (e) { }
                    }
                });
            }, sectionRef);
        };

        // Start polling for duration availability
        // This covers all cases: cached, hot reload, slow network, etc.
        pollInterval = setInterval(initVideoScrub, 100);

        // Also attempt immediately and on events simply to be responsive
        if (video.readyState >= 1) initVideoScrub();
        video.addEventListener('loadedmetadata', initVideoScrub);
        video.addEventListener('durationchange', initVideoScrub);

        return () => {
            if (pollInterval) clearInterval(pollInterval);
            video.removeEventListener('loadedmetadata', initVideoScrub);
            video.removeEventListener('durationchange', initVideoScrub);
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative h-screen bg-black overflow-hidden"
        >
            {/* Scroll-controlled Video Background */}
            <div className="absolute z-0 w-full h-[60%] top-1/2 -translate-y-1/2 md:h-full md:top-0 md:translate-y-0 md:inset-0">
                <video
                    ref={videoRef}
                    src="/Webp/thewebp_optimized.mp4"
                    className="w-full h-full object-cover opacity-60"
                    muted
                    playsInline
                    preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/50 to-[var(--background)] pointer-events-none" />
            </div>

            {/* 1. Main Bio Content Overlay */}
            <div
                ref={contentRef}
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-6"
            >
                <div className="w-full max-w-4xl pointer-events-auto">
                    {/* Header Group */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-primary">
                            About Me
                        </h2>
                    </div>

                    <div ref={blurRef} className="glass-card p-8 md:p-10 backdrop-blur-xl">
                        <div className="flex items-start gap-4 mb-6">
                            <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                            <p className="text-primary leading-relaxed font-normal">
                                I&apos;m a <span className="font-medium">Machine Learning and Data Science enthusiast/innovator</span>, passionate about building intelligent systems that connect humans, machines, and the universe.
                            </p>
                        </div>

                        <div className="space-y-4 mb-6">
                            {bioHighlights.map((highlight, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-lg glass flex items-center justify-center flex-shrink-0">
                                        <highlight.icon className="w-4 h-4 text-secondary" />
                                    </div>
                                    <p className="text-secondary leading-relaxed font-normal">{highlight.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <p className="text-tertiary italic text-center text-sm font-normal">
                                &quot;I thrive on projects that merge neuroscience, robotics, and artificial intelligence—building technology that&apos;s smart, adaptive, and deeply human-centered.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Expertise Cards Overlay (starts hidden) */}
            <div
                ref={cardsRef}
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6"
                style={{ opacity: 0 }} // Initial state
            >
                <div className="w-full max-w-6xl pointer-events-auto pb-10">
                    <div className="grid md:grid-cols-3 gap-6">
                        {expertiseAreas.map((area, index) => (
                            <div key={index} className="glass-card p-6 flex flex-col items-center text-center backdrop-blur-md">
                                <area.icon className="w-8 h-8 text-secondary mb-3" />
                                <h3 className="text-lg font-medium text-primary mb-2">{area.title}</h3>
                                <p className="text-sm text-secondary leading-relaxed">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
