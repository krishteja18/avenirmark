# 🌌 Avenirmark | Premium Animated Digital Showcase

Welcome to the newly reborn, high-end digital agency landing page for **Avenirmark**. This website has been completely redesigned and engineered from the ground up as a premium corporate showcase. Drawing design cues from elite luxury banners, the site is designed to immediately captivate high-value prospects, project authority, and convert traffic into leads.

---

## 🎨 Design System & Color Identity

We've implemented a sophisticated **Luxury Midnight Blue & Gold** palette, completely eschewing generic styles in favor of a timeless, high-contrast, premium aesthetic:

*   **Primary Midnight Blue (`#050B14`)**: A deep, rich, luxury navy base background that provides immense spatial depth.
*   **Secondary Sapphire Space (`#091220`)**: Elegant card backgrounds and depth-separated dark panels.
*   **Primary Gold Accent (`#D4AF37`)**: True, premium metallic gold for links, hover borders, nodes, and active triggers.
*   **Secondary Amber Gold (`#E2B63B`)**: Radiant warm gold gradients for active state highlights and marquees.
*   **Ice Sapphire Highlight (`#60A5FA`)**: Cold blue radial highlights that add progressive modern depth.
*   **Pristine Silver-White (`#F8FAFC`)**: High-contrast, crystal-clear typography.
*   **Muted Titanium Slate (`#94A3B8`)**: High-readability copy text.

### ✍️ Premium Typography Pairings
*   **Display / Header Font**: **Outfit** — A sharp, modern geometric sans-serif that commands authority at large scales.
*   **Body Copy Font**: **Plus Jakarta Sans** — A highly legible geometric sans-serif that retains a clean, warm corporate feel.

---

## 🚀 The Animation & Technology Stack

To deliver an elite user experience that feels completely organic and high-end, we avoid generic frameworks in favor of absolute control:

1.  **Core Framework**: [Vite](https://vitejs.dev/) + [React](https://react.dev/) — Enabling sub-second hot reloading, lightning-fast rendering, and optimized compilation sizes.
2.  **Smooth Scroll Engine**: [Lenis (by Studio Freight)](https://github.com/darkroomengineering/lenis) — Provides buttery-smooth, hardware-accelerated inertia scroll kinematics across all browsers.
3.  **Physical Kinematic Animation**: [GSAP (GreenSock)](https://gsap.com/) + [ScrollTrigger](https://gsap.com/scroll/) — Powers complex scroll coordinate synchronization, dynamic velocity calculations, physical spring-damper cursor tracking, and custom bezier paths.
4.  **Layout Transitions**: [Framer Motion](https://www.framer.com/motion/) — Handles elegant spatial layout switches, filter fades, and staggered gallery entrances.
5.  **Vanilla CSS Custom Properties**: 100% compliant custom-built Vanilla CSS grid, flex, and glassmorphism systems — ensuring lightweight assets with **zero Tailwind utility bloat**.

---

## 💎 Elite Interactive Features

*   **Custom Spotlight Cursor**: An interactive, physical-damping circular cursor that tracks mouse movement with a luxury spring lag. It magnetically scales up and shifts boundaries when hovering over key elements, and converts the inner dot to a Gold/Sapphire glow. (Disabled automatically on touch devices).
*   **Dynamic Velocity-Skew Marquee**: An infinite, gold-saturated ribbon ticker whose speed and structural shear (`skewX`) scale dynamically in real time relative to the user's scroll speed and direction.
*   **Bento Services Grid & Spotlight Shaders**: Responsive card layouts that track internal cursor positions in real time to illuminate glassmorphic border borders and text layers, accompanied by soft, three-dimensional card tilting (`rotateX`, `rotateY`).
*   **Vertical SVG Line-Drawing Timeline**: Down the center of the process timeline is a custom SVG path that draws a glowing, molten-gold ribbon in direct proportion to your vertical scroll depth.
*   **Unified Aspect Highlights Grid**: Portfolio items are styled into a matching `16:10` golden aspect grid, eliminating erratic masonry layout jumps and ensuring clean vertical alignment.

---

## 🛠️ Local Development & Commands

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The server will boot up instantly (typically at `http://localhost:5173/`).

### 3. Compile Production Bundle
```bash
npm run build
```
This builds and bundles optimized static assets (HTML, minified JS, and CSS) into the `dist/` directory, ready to be deployed instantly on Vercel, Netlify, or any static provider.

---

## ☁️ Deployment

This project is fully ready for zero-configuration, continuous-integration hosting on **Vercel**:
1. Simply connect your GitHub repository `krishteja18/avenirmark` to your Vercel account.
2. Vercel will automatically detect Vite, configure the build commands, and deploy any changes on your `main` branch inside 30 seconds!

<!-- Deployment Test: Persistent storage architecture validation -->
