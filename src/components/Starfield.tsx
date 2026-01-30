'use client';

import { useEffect, useRef } from 'react';

/**
 * Interactive Starfield Background
 * Uses HTML5 Canvas for performance.
 * Features:
 * - Parallax effect on mouse move
 * - Random twinkling
 * - Responsive sizing
 */
export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let mouseX = 0;
        let mouseY = 0;

        // Configuration
        const STAR_COUNT = 800; // Total stars
        const PARALLAX_STRENGTH = 0.02; // How much stars move with mouse

        class Star {
            x: number;
            y: number;
            z: number; // Depth factor (closest = 1, furthest = 0)
            size: number;
            opacity: number;
            twinkleSpeed: number;
            vx: number; // Velocity X
            vy: number; // Velocity Y

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random();
                this.size = Math.random() * 1.5;
                this.opacity = Math.random();
                this.twinkleSpeed = 0.005 + Math.random() * 0.01;
                // Random slow drift
                this.vx = (Math.random() - 0.5) * 0.15; // Slow horizontal drift
                this.vy = (Math.random() - 0.5) * 0.15; // Slow vertical drift
            }

            update(width: number, height: number) {
                // Apply velocity
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Twinkle
                this.opacity += this.twinkleSpeed;
                if (this.opacity > 1 || this.opacity < 0.1) {
                    this.twinkleSpeed = -this.twinkleSpeed;
                }
            }

            draw(ctx: CanvasRenderingContext2D, width: number, height: number, mX: number, mY: number, color: string) {
                // Parallax calculation
                const offsetX = (mX - width / 2) * PARALLAX_STRENGTH * this.z;
                const offsetY = (mY - height / 2) * PARALLAX_STRENGTH * this.z;

                // Draw Star
                ctx.beginPath();
                ctx.arc(this.x + offsetX, this.y + offsetY, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
                ctx.fill();
            }
        }

        const resize = () => {
            // ... existing resize logic ...
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = [];
            const count = window.innerWidth < 768 ? STAR_COUNT / 2 : STAR_COUNT;
            for (let i = 0; i < count; i++) {
                stars.push(new Star(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Stars always White (Difference mode handles color)
            const starColorRaw = '255, 255, 255';

            stars.forEach(star => {
                star.update(canvas.width, canvas.height); // Update position
                star.draw(ctx, canvas.width, canvas.height, mouseX, mouseY, starColorRaw);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleOrientation = (e: DeviceOrientationEvent) => {
            // Gamma: Left/Right tilt (-90 to 90)
            // Beta: Front/Back tilt (-180 to 180)
            // We map these angles to screen coordinates to mimic mouse movement
            if (e.gamma !== null && e.beta !== null) {
                // Amplify the tilt effect slightly for better responsiveness
                const xTilt = Math.min(Math.max(e.gamma, -45), 45); // Clamp to +/- 45 degrees
                const yTilt = Math.min(Math.max(e.beta, -45), 45);  // Clamp to +/- 45 degrees

                // Map tilt to screen coordinates
                // Center (0 tilt) = Center of screen
                // AMPLIFIED by 5x to ensure visible movement on small screens (since PARALLAX_STRENGTH is low)
                const amplification = 5;
                mouseX = ((xTilt / 45) * (window.innerWidth / 2) * amplification) + (window.innerWidth / 2);
                mouseY = ((yTilt / 45) * (window.innerHeight / 2) * amplification) + (window.innerHeight / 2);
            }
        };

        // Initialize
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('deviceorientation', handleOrientation);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('deviceorientation', handleOrientation);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-1000"
            style={{
                zIndex: 60, // Force on top of everything to ensure blend mode works globally
                mixBlendMode: 'difference' // Magic: White stars -> Black on White BG, White on Black BG
            }}
        />
    );
}
