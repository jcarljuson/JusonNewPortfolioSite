'use client';

import { useEffect, useState } from 'react';
import { Facebook, Linkedin, Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
];

const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/jcarlciocsonjuson', icon: Facebook },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jcarl-juson-565796360/', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/jcarljuson', icon: Github },
    { name: 'ResearchGate', href: 'https://www.researchgate.net/profile/Jcarl-Juson?ev=hdr_xprf', icon: ResearchGateIcon },
];

function ResearchGateIcon({ className }: { className?: string }) {
    // Custom 'RG' icon
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* R */}
            <path d="M3 5v14" />
            <path d="M3 5h5a4 4 0 0 1 0 8H3" />
            <path d="M8 13l4 6" />

            {/* G */}
            <path d="M21 5a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5v-5h-3" />
        </svg>
    );
}

export default function Navigation() {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > window.innerHeight * 0.5);
            setIsScrolled(scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
                } w-[95%] md:w-auto`}
        >
            <div
                className={`mx-auto px-6 py-3 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                    rounded-full border border-white/10 shadow-2xl backdrop-blur-2xl
                    ${isScrolled
                        ? 'bg-black/40 shadow-black/20 md:min-w-[700px]'
                        : 'bg-black/20 md:min-w-[600px] border-white/5'
                    }
                `}
            >
                <div className="relative flex items-center justify-between">
                    {/* Left: Logo + Theme Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                            <img
                                src="/profile_pixel.png"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <ThemeToggle />
                    </div>

                    {/* Nav Links (Centered Absolutely) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.href)}
                                className="text-sm font-medium text-secondary hover:text-primary transition-all duration-200 hover:-translate-y-1 hover:scale-110"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    import ViewCounter from './ViewCounter';

                    // ... (existing imports)

                    // ...

                    {/* Right side: Social Icons + View Counter */}
                    <div className="flex items-center gap-4 shrink-0">
                        <ViewCounter />
                        <div className="h-4 w-px bg-white/10 hidden sm:block" /> {/* Separator */}
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary hover:text-primary transition-all duration-200 hover:-translate-y-1 hover:scale-110"
                                aria-label={social.name}
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
