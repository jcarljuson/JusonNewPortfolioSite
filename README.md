# Jcarl Juson's Interstellar Portfolio

A high-performance, cinematic portfolio website built to showcase innovations in Machine Learning, Neuroscience, and Engineering. Designed with an "Interstellar" aesthetic, it features deep space themes, fluid physics-based animations, and a premium "Apple-like" feel.

![Hero Section](./public/screenshots/hero.png)

## 🌌 Key Highlights

### 1. Interactive Starfield Core
A custom-built HTML5 Canvas starfield that serves as the visual backbone of the site.
*   **Ambient Drift:** Stars possess individual velocity vectors, slowly drifting like cosmic dust even when idle.
*   **Mouse Parallax:** Reacts to mouse movement (desktop) and device gyroscope (mobile) for a 3D depth effect.
*   **Smart Blending:** Uses `mix-blend-mode: difference` to automatically invert star colors based on the background—**White Stars** in the vacuum of space, **Black Stars** on clean white pages.

### 2. "Zebra" Theme Architecture
A sophisticated hybrid theme system that breaks the monotony of traditional Dark/Light modes.
*   **Dark Islands:** Key sections like "Education" and "Patents" maintain a cinematic **Dark Mode** appearance (Pure Black or Matte Black) even when the global theme is Light.
*   **Matte vs. Pure:** In Light Mode, dark sections use a premium **Matte Black (#111111)** "satin" finish. In Dark Mode, they shift to **Pure Black (#000000)** for seamless OLED integration.
*   **Global Consistency:** The "About Me" section mirrors this aesthetic, creating a cohesive rhythm of light and dark chapters throughout the scroll.

### 3. Neural Boot Sequence
An immersive site preloader mimicking a sci-fi system boot.
*   **Theme-Aware:**
    *   **Dark Mode:** Classic "Matrix" aesthetic (Green text on Black).
    *   **Light Mode:** Modern clean aesthetic (Black text on White).
*   **Sequenced Logging:** "Initializing Neural Interface...", "Calibrating Sensors..." with progress bar synchronization.

### 4. 3D Cylindrical Projects Carousel
The **Selected Works** section features a custom 3D rotary carousel powered by GSAP.
*   **Physics-based Interaction:** Cards rotate along a Y-axis curve based on scroll progress.
*   **Wind Particle Effect:** A high-speed canvas particle system trails behind project cards during rapid scrolling, adding a sense of speed and motion.

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) - React framework for performance and SEO.
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling with custom glassmorphism, gradients, and animations.
*   **Animation:** [GSAP (GreenSock)](https://greensock.com/) - Complex scroll triggers, timelines, and physics-based interactions.
*   **Smooth Scroll:** [Lenis](https://lenis.studiofreight.com/) - Butter-smooth scroll interpolation.
*   **Icons:** [Lucide React](https://lucide.dev/) - Clean, consistent vector icons.
*   **Fonts:** SF Pro Display (System fallback) & Inter.

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jcarljuson/JusonNewPortfolioSite.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open [http://localhost:3000](http://localhost:3000)** with your browser to launch the interface.

---

## 📦 Deployment

Deployed on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
