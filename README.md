# 🪐 Solaris

Solaris is an immersive, interactive journey through our solar system. Built with modern web technologies, it features realistic planetary visualizations, smooth physics-based interactions, and a cinematic user experience.


<div align="center">
  <video src="public/videos/demo.mp4" width="100%" controls autoplay muted loop>
    Your browser does not support the video tag.
  </video>
</div>


## ✨ Features

- **Interactive 3D Planets**: High-fidelity planetary rendering with dynamic lighting and hover effects.
- **Immersive Starfield**: CPU-optimized procedural star background with realistic Milky Way layers.
- **Physics-Based Interactions**: Custom cursor mechanics with zero-latency input tracking.
- **Cinematic Audio**: Integrated ambient background music with user controls and autoplay handling.
- **Responsive Design**: Fully responsive layout adapting to all device sizes.
- **Performance Optimized**: Leveraging GPU acceleration and efficient rendering techniques for 60fps performance using standard web technologies.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Native CSS
- **Language**: TypeScript

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/solaris.git
    cd solaris
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/app/components`: Reusable UI components (Planet3D, Starfield, InfoPanel, etc.)
- `/src/app/data`: Static data definitions for celestial bodies.
- `/public`: Static assets (textures, audio, images).

## 🎨 Credits

- Planet Textures: [Solar System Scope](https://www.solarsystemscope.com/textures/)
- Icons: [Lucide React](https://lucide.dev/)
- Fonts: Space Grotesk & Inter (Google Fonts)

---

Developed with ❤️ for space enthusiasts.
