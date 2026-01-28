'use client';

import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer
            id="contact"
            className="relative py-32 bg-black"
            style={{ zIndex: 60 }}
        >
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Main CTA */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 text-primary">
                    Let&apos;s Build The Future
                </h2>

                <p className="text-lg text-secondary max-w-xl mx-auto mb-12 font-normal">
                    Ready to collaborate on groundbreaking projects at the intersection of AI, neuroscience, and robotics?
                </p>

                {/* Contact */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
                    <a
                        href="mailto:jusonjcarl@gmail.com"
                        className="flex items-center gap-3 text-secondary hover:text-primary transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-[var(--glass-hover)] transition-colors">
                            <Mail className="w-4 h-4" />
                        </div>
                        <span>jusonjcarl@gmail.com</span>
                    </a>

                    <div className="flex items-center gap-3 text-secondary">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <span>Manila, Philippines</span>
                    </div>
                </div>

                {/* CTA Button */}
                <a
                    href="mailto:jusonjcarl@gmail.com"
                    className="btn-primary inline-block px-8 py-4 text-lg"
                >
                    Get in Touch
                </a>

                {/* Bottom */}
                <div className="mt-20 pt-6 border-t border-white/5">
                    <p className="text-tertiary text-sm font-normal">
                        © 2026 Jcarl Juson. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
