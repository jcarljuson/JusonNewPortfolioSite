'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
    onComplete: () => void;
}

const BOOT_SEQUENCE = [
    "Initializing Neural Interface...",
    "Loading Core Modules...",
    "Calibrating Exoplanet Sensors...",
    "Establishing Uplink...",
    "Access Granted."
];

export default function Preloader({ onComplete }: PreloaderProps) {
    const [lineIndex, setLineIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable scrolling during load
        document.body.style.overflow = 'hidden';

        // 1. Progress Bar Animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 5; // Random speed increments
            });
        }, 100);

        // 2. Text Sequence Animation
        const textInterval = setInterval(() => {
            setLineIndex(prev => {
                if (prev >= BOOT_SEQUENCE.length - 1) {
                    clearInterval(textInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 600); // New line every 600ms

        // 3. Exit Animation (when both are done)
        const totalDuration = BOOT_SEQUENCE.length * 600 + 500;

        const exitTimeout = setTimeout(() => {
            const ctx = gsap.context(() => {
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: 'expo.inOut',
                    onComplete: () => {
                        document.body.style.overflow = ''; // Re-enable scroll
                        onComplete();
                    }
                });
            }, containerRef);

            return () => ctx.revert();
        }, totalDuration);

        return () => {
            clearInterval(progressInterval);
            clearInterval(textInterval);
            clearTimeout(exitTimeout);
            document.body.style.overflow = ''; // Safety cleanup
        };
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-green-500 font-mono"
        >
            <div className="w-full max-w-md px-6">
                {/* Boot Log */}
                <div ref={textRef} className="h-48 flex flex-col justify-end mb-8 space-y-2">
                    {BOOT_SEQUENCE.slice(0, lineIndex + 1).map((line, idx) => (
                        <p key={idx} className="text-sm md:text-base opacity-0 animate-fade-in-up">
                            <span className="opacity-50 mr-2">{`>`}</span>
                            {line}
                        </p>
                    ))}
                    <p className="animate-pulse">_</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-green-900/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-100 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs mt-2 opacity-60">
                    <span>SYSTEM_BOOT</span>
                    <span>{Math.floor(Math.min(progress, 100))}%</span>
                </div>
            </div>

            {/* Inline styles for one-off animation */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
