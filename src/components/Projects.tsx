'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: 'Exoplanet Detection',
        category: 'NASA Space Apps',
        description: 'AI-powered analysis of Kepler telescope data to detect exoplanets using deep learning neural networks.',
        image: '/projects/exoplanet.png',
        tags: ['Python', 'TensorFlow', 'NASA Data'],
        gradient: 'from-blue-600 to-purple-600',
    },
    {
        id: 2,
        title: 'Neural Prosthetics',
        category: 'Robotics',
        description: 'Non-invasive EMG interface for controlling robotic prosthetics through muscle electrical signals.',
        image: '/projects/prosthetics.png',
        tags: ['Arduino', 'EMG Sensors', 'C++'],
        gradient: 'from-purple-600 to-pink-600',
    },
    {
        id: 3,
        title: 'Brain-Computer Interface',
        category: 'Neuroscience',
        description: 'Direct EEG-to-Cursor control system enabling paralyzed patients to interact with computers using thought.',
        image: '/projects/bci.png',
        tags: ['EEG', 'Signal Processing', 'Python'],
        gradient: 'from-cyan-600 to-blue-600',
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.matchMedia({
                // Desktop: Horizontal Pinning & 3D Effect
                "(min-width: 768px)": function () {
                    const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
                    const cardWidth = 450;
                    const gap = 40;
                    const totalWidth = cards.length * (cardWidth + gap);
                    const screenCenter = window.innerWidth / 2;
                    const initialOffset = screenCenter - cardWidth / 2;

                    // Set initial state
                    gsap.set(containerRef.current, {
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center'
                    });
                    gsap.set(sectionRef.current, {
                        overflow: 'hidden',
                        height: '100vh'
                    });
                    gsap.set(cardsRef.current, {
                        x: initialOffset,
                        flexDirection: 'row',
                        gap: gap + 'px',
                        padding: 0
                    });

                    const updateCards = (progress: number) => {
                        const scrollDistance = totalWidth - cardWidth;
                        const xOffset = initialOffset - progress * scrollDistance;

                        gsap.set(cardsRef.current, { x: xOffset });

                        cards.forEach((card, index) => {
                            const cardCenterX = initialOffset + index * (cardWidth + gap) + cardWidth / 2 + xOffset - initialOffset;
                            const offset = (cardCenterX - screenCenter) / screenCenter;

                            const rotateY = offset * 25;
                            const scale = 1 - Math.abs(offset) * 0.12;
                            const opacity = 1 - Math.abs(offset) * 0.35;
                            const zIndex = Math.round((1 - Math.abs(offset)) * 10);

                            gsap.set(card, {
                                rotateY: rotateY,
                                scale: Math.max(0.7, scale),
                                opacity: Math.max(0.3, opacity),
                                zIndex: zIndex,
                                width: '450px',
                            });
                        });
                    };

                    // Set initial state immediately to prevent "snap"
                    updateCards(0);

                    const scrollTrigger = ScrollTrigger.create({
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=' + window.innerHeight * 4,
                        pin: true,
                        scrub: 1.5, // Even smoother
                        onUpdate: (self) => updateCards(self.progress),
                    });
                },

                // Mobile: Vertical Stack (Native Scrolling)
                "(max-width: 767px)": function () {
                    // Reset styling for natural flow
                    gsap.set(sectionRef.current, {
                        height: 'auto',  // Let content dictate height
                        overflow: 'visible'
                    });
                    gsap.set(containerRef.current, {
                        position: 'relative',
                        inset: 'auto',
                        display: 'block'
                    });
                    gsap.set(cardsRef.current, {
                        x: 0,
                        flexDirection: 'column',
                        gap: '2rem',
                        padding: '6rem 1.5rem 4rem 1.5rem' // Add padding for header/spacing
                    });

                    // Reset card styles
                    const cards = gsap.utils.toArray('.project-card') as HTMLElement[];
                    cards.forEach(card => {
                        gsap.set(card, {
                            rotateY: 0,
                            scale: 1,
                            opacity: 1,
                            zIndex: 1,
                            width: '100%', // Full width on mobile
                            x: 0
                        });
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative min-h-screen bg-black"
            style={{ zIndex: 0 }}
        >
            {/* Section Title */}
            <div className="absolute top-20 left-0 right-0 z-10 text-center px-6 pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-primary">
                    Selected Works
                </h2>
                <p className="text-secondary max-w-lg mx-auto font-normal">
                    Projects at the intersection of AI, neuroscience, and robotics.
                </p>
            </div>

            {/* Container */}
            <div ref={containerRef} style={{ perspective: '1200px' }}>
                <div ref={cardsRef} className="flex" style={{ transformStyle: 'preserve-3d' }}>
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card glass-card overflow-hidden cursor-pointer group flex-shrink-0 relative"
                            style={{
                                aspectRatio: '16/10',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            {/* Project Image */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80" />

                            {/* Content */}
                            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
                                {/* Category */}
                                <span className="inline-block px-3 py-1 text-xs font-medium glass backdrop-blur-sm rounded-full mb-3 w-fit text-white border border-white/20">
                                    {project.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors text-white">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors mb-4 line-clamp-3 md:line-clamp-none">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 text-xs glass backdrop-blur-sm rounded-full text-gray-300 border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover border glow */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-3xl transition-colors duration-300" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator (Desktop Only) */}
            <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary text-sm items-center gap-2">
                <span>Scroll to explore</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </section>
    );
}
