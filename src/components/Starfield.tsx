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

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random(); // Depth: 0 to 1
                this.size = Math.random() * 1.5;
                this.opacity = Math.random();
                this.twinkleSpeed = 0.005 + Math.random() * 0.01;
            }

            draw(ctx: CanvasRenderingContext2D, width: number, height: number, mX: number, mY: number) {
                // Parallax calculation
                // Closer stars (higher z) move more than distant stars
                const offsetX = (mX - width / 2) * PARALLAX_STRENGTH * this.z;
                const offsetY = (mY - height / 2) * PARALLAX_STRENGTH * this.z;

                // Draw Star
                ctx.beginPath();
                ctx.arc(this.x + offsetX, this.y + offsetY, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();

                // Twinkle effect
                this.opacity += this.twinkleSpeed;
                if (this.opacity > 1 || this.opacity < 0.1) {
                    this.twinkleSpeed = -this.twinkleSpeed;
                }
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Re-generate stars on resize to fill screen
            stars = [];
            const count = window.innerWidth < 768 ? STAR_COUNT / 2 : STAR_COUNT; // Less stars on mobile
            for (let i = 0; i < count; i++) {
                stars.push(new Star(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.draw(ctx, canvas.width, canvas.height, mouseX, mouseY);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        // Initialize
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
                background: 'transparent', // Let CSS background show through
                mixBlendMode: 'screen' // Ensure stars blend nicely
            }}
        />
    );
}
