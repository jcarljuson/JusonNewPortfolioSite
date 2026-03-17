'use client';

import { useEffect } from 'react';

/**
 * Detects the actual usable viewport in in-app browsers (Facebook, Messenger, Instagram, etc.)
 * and sets CSS custom properties:
 * - --vh: 1% of the actual visible viewport height
 * - --safe-top: the top offset needed to clear in-app browser chrome
 * 
 * In-app browsers render their toolbar as an overlay ON TOP of the page content,
 * so we need to detect how much space to offset from the top.
 */
export default function ViewportHeight() {
    useEffect(() => {
        function update() {
            // 1. Set --vh for height calculations
            const height = window.visualViewport?.height ?? window.innerHeight;
            const vh = height * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            // 2. Detect in-app browser top chrome offset
            // In normal browsers: visualViewport.offsetTop === 0 or visualViewport doesn't report offset
            // In in-app browsers: the visible viewport may start below the chrome
            const vpOffsetTop = window.visualViewport?.offsetTop ?? 0;
            
            // Also detect the difference between screen.availHeight and innerHeight
            // In in-app browsers, there's often a significant gap
            const screenDiff = window.screen.availHeight - window.innerHeight;
            
            // Use the larger of: visualViewport offset, or the calculated safe area
            // In-app browser toolbars are typically 56-100px
            const safeTop = Math.max(vpOffsetTop, 0);
            document.documentElement.style.setProperty('--safe-top', `${safeTop}px`);
        }

        // Set immediately
        update();

        // Update on resize and orientation change
        window.addEventListener('resize', update);
        window.addEventListener('orientationchange', update);
        window.visualViewport?.addEventListener('resize', update);
        window.visualViewport?.addEventListener('scroll', update);

        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('orientationchange', update);
            window.visualViewport?.removeEventListener('resize', update);
            window.visualViewport?.removeEventListener('scroll', update);
        };
    }, []);

    return null;
}
