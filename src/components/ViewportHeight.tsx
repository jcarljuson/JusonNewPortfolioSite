'use client';

import { useEffect } from 'react';

/**
 * Sets a CSS custom property `--vh` to 1% of the actual visible viewport height.
 * This fixes the 100vh issue in in-app browsers (Facebook, Messenger, Instagram, etc.)
 * where the browser chrome (address bar, search bar) eats into the CSS viewport height.
 *
 * Usage in CSS/Tailwind: height: calc(var(--vh, 1vh) * 100)
 */
export default function ViewportHeight() {
    useEffect(() => {
        function updateVH() {
            // Use visualViewport if available (most accurate for in-app browsers)
            const height = window.visualViewport?.height ?? window.innerHeight;
            const vh = height * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        // Set immediately
        updateVH();

        // Update on resize and orientation change
        window.addEventListener('resize', updateVH);
        window.addEventListener('orientationchange', updateVH);

        // Also listen to visualViewport resize (catches in-app browser chrome changes)
        window.visualViewport?.addEventListener('resize', updateVH);

        return () => {
            window.removeEventListener('resize', updateVH);
            window.removeEventListener('orientationchange', updateVH);
            window.visualViewport?.removeEventListener('resize', updateVH);
        };
    }, []);

    return null; // This component renders nothing, just sets the CSS variable
}
