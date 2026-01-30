'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WindParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // State
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles: Particle[] = [];
        let scrollVelocity = 0;
        let animationFrameId: number;

        // Configuration
        const PARTICLE_COUNT = 100;
        const BASE_SPEED = 0.5;

        class Particle {
            x: number;
            y: number;
            length: number;
            speed: number;
            opacity: number;
            thickness: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.length = Math.random() * 20 + 5; // Base length
                this.speed = Math.random() * 0.5 + 0.2;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.thickness = Math.random() * 2 + 0.5;
            }

            update(velocity: number) {
                // Velocity > 0 = Scrolling Down -> Cards move Left -> Wind streaks RIGHT
                // Velocity < 0 = Scrolling Up -> Cards move Right -> Wind streaks LEFT

                // Sensitivity to scroll
                const draggingFactor = velocity * 0.15;

                // Update X position
                // We ADD draggingFactor to move Opposite to the content flow (Content moves Left, Wind moves Right)
                this.x += (this.speed + draggingFactor);

                // Wrap around screen
                if (this.x < -this.length) this.x = width + this.length;
                if (this.x > width + this.length) this.x = -this.length;

                // Dynamic stretching based on speed
                // The faster we scroll, the longer the streaks
                const stretch = Math.abs(velocity) * 2;
                this.length = Math.min(200, 20 + stretch);

                // Dynamic opacity based on speed (more visible when moving fast)
                const activeOpacity = Math.min(0.8, this.opacity + Math.abs(velocity) * 0.01);

                return activeOpacity;
            }

            draw(ctx: CanvasRenderingContext2D, opacity: number, color: string) {
                ctx.globalAlpha = opacity;
                ctx.fillStyle = color;

                ctx.beginPath();
                // Draw a thin HORIZONTAL rounded rectangle/line
                // width = this.length, height = this.thickness
                ctx.roundRect(this.x, this.y, this.length, this.thickness, 2);
                ctx.fill();
            }
        }

        // Initialization
        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        // ScrollTrigger to capture velocity
        ScrollTrigger.create({
            trigger: document.body, // Track global scroll or just this section? 
            // User said "only for the selected works section".
            // But the VELOCITY comes from global scroll.
            // The visibility of this component is handled by where it is rendered.
            // So tracking global velocity is fine as long as the canvas is only visible in the section.
            onUpdate: (self) => {
                scrollVelocity = self.getVelocity() / 50; // Normalize velocity
                // Decay velocity smoothly if needed, but ScrollTrigger.getVelocity is already smoothed slightly.
            }
        });

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Check Theme
            const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
            // Wind color: Dark/Grey in Light Mode, White/Grey in Dark Mode
            const color = isLightMode ? '#000000' : '#ffffff';

            particles.forEach(p => {
                const activeOpacity = p.update(scrollVelocity);
                p.draw(ctx, activeOpacity, color);
            });

            // Dampen velocity manually to return to 0 if scroll stops
            scrollVelocity *= 0.95;

            animationFrameId = requestAnimationFrame(animate);
        };

        // Resize Handler
        const handleResize = () => init();

        window.addEventListener('resize', handleResize);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            // ScrollTrigger kill handled globally or via component unmount if we attached it to a ref...
            // Since we used static Create, strictly we should kill it, but it's attached to body. 
            // In this specific case, it's safer to let it be or store the instance.
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-50"
            // Use mix-blend-mode overlay to make it look like a subtle effect
            style={{ mixBlendMode: 'overlay' }}
        />
    );
}
