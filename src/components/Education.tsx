'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Medal, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = {
    university: 'National University',
    degree: 'BS Computer Science with specialization in Machine Learning',
    specialization: '1st Year Student',
    badges: ['Dean\'s First Honor'],
};

const certificates = [
    {
        title: 'Global Nominee',
        organization: 'NASA Space Apps Challenge',
        year: '2025',
        image: '/certificates/nasa.png',
        gradient: 'from-yellow-500 to-orange-500',
        imgPosition: 'object-bottom',
    },
    {
        title: 'Harvard CS50x Certificate',
        organization: 'Harvard University',
        year: '2025',
        image: '/certificates/harvard.png',
        gradient: 'from-purple-500 to-pink-500',
        imgPosition: 'object-center',
    },
    {
        title: 'Research Excellence Award',
        organization: 'Developed a Nerve Controlled AI Powered Prosthetic Arm',
        year: '2025',
        image: '/certificates/research.jpg',
        gradient: 'from-blue-500 to-cyan-500',
        note: 'Best In Research',
        imgPosition: 'object-center',
    },
];

export default function Education() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.edu-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="education"
            className="relative py-32 bg-transparent"
        >
            {/* Global Background for the entire section (Matte Black in Light, Pure Black in Dark) */}
            <div className="absolute inset-0 -z-10 bg-[#111111] dark:bg-[#000000]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Education Section */}
                <div className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-16 text-center text-white">
                        Education
                    </h2>

                    <div className="edu-card glass-card p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 opacity-0 bg-white/5 border border-white/10">
                        {/* University Logo */}
                        <img
                            src="/nu-logo.png"
                            alt="National University Logo"
                            className="w-24 h-28 md:w-32 md:h-36 object-contain flex-shrink-0"
                        />

                        {/* Education Details */}
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                                {education.university}
                            </h3>
                            <p className="text-xl text-gray-300 mb-1">{education.degree}</p>
                            <p className="text-lg text-gray-400 mb-4">{education.specialization}</p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                {education.badges.map((badge, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full font-semibold text-yellow-300"
                                    >
                                        ⭐ {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificates Section */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-semibold mb-16 text-center text-white">
                        Honors & Certificates
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {certificates.map((cert, index) => (
                            <div
                                key={index}
                                className="edu-card glass-card overflow-hidden group cursor-pointer opacity-0 flex flex-col h-full bg-white/5 border border-white/10"
                            >
                                {/* Image Container */}
                                <div className="h-64 w-full relative overflow-hidden bg-white/5">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${cert.imgPosition || 'object-center'}`}
                                    />
                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${cert.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors text-white line-clamp-2">
                                        {cert.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-1 font-medium">{cert.organization}</p>
                                    <div className="mt-auto flex justify-between items-center text-xs text-gray-500 pt-4">
                                        <span>{cert.year}</span>
                                        {cert.note && <span className="text-emerald-400 font-semibold">{cert.note}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Patents Section */}
                <div className="mt-24">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-16 text-center text-white">
                        Documentations & Patents
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* EMG */}
                        <div className="edu-card glass-card overflow-hidden group cursor-pointer opacity-0 flex flex-col h-full bg-white/5 border border-white/10">
                            <div className="h-48 w-full relative overflow-hidden">
                                <img
                                    src="/patents/emg.png"
                                    alt="EMG Patent Document"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors text-white">
                                    EMG-Based Prosthetic Control
                                </h3>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">Research Documentation on ESP32 Myoelectric Arms</p>
                                <span className="text-xs text-emerald-500 font-medium mt-auto">Research Paper • 2025</span>
                            </div>
                        </div>

                        {/* Brain Controlled Glasses (NEW) */}
                        <div className="edu-card glass-card overflow-hidden group cursor-pointer opacity-0 flex flex-col h-full bg-white/5 border border-white/10">
                            <div className="h-48 w-full relative overflow-hidden">
                                <img
                                    src="/patents/invention.png"
                                    alt="Brain Controlled EEG Glasses"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors text-white">
                                    Brain Controlled EEG Glasses
                                </h3>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">Controlling computer devices using brainwaves</p>
                                <span className="text-xs text-purple-400 font-medium mt-auto">Patent Ongoing • 2026</span>
                            </div>
                        </div>

                        {/* Exoplanet */}
                        <div className="edu-card glass-card overflow-hidden group cursor-pointer opacity-0 flex flex-col h-full bg-white/5 border border-white/10">
                            <div className="h-48 w-full relative overflow-hidden">
                                <img
                                    src="/patents/exoplanet.png"
                                    alt="Exoplanet Detection Documentation"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors text-white">
                                    AI Exoplanet Detection
                                </h3>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">Deep Learning Algorithm for Kepler Data</p>
                                <span className="text-xs text-blue-500 font-medium mt-auto">NASA Space Apps • 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
