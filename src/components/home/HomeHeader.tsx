import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import SmartDonationButton from '../ui/SmartDonationButton';

// Internal Component for the Dynamic Texture
const TextureBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useGSAP(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = canvas.parentElement?.offsetHeight || 100;

        const points: { x: number; y: number; base_y: number; speed: number; offset: number; size: number; phase: number }[] = [];
        const pointCount = 55;

        for (let i = 0; i < pointCount; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                base_y: Math.random() * height,
                speed: 0.15 + Math.random() * 0.25,
                offset: Math.random() * 1000,
                size: Math.random() * 1.8 + 0.6,
                phase: Math.random() * Math.PI * 2
            });
        }

        const animate = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            // Color cycling logic (Dark Navy to Cyan) - RESTORED
            const cycle = (Math.sin(time * 0.001) + 1) / 2;
            const r = Math.floor(36 + (52 - 36) * cycle); // #24 -> 36, #34 -> 52
            const g = Math.floor(82 + (187 - 82) * cycle); // #52 -> 82, #BB -> 187
            const b = Math.floor(110 + (206 - 110) * cycle); // #6E -> 110, #CE -> 206
            const currentColor = `rgb(${r}, ${g}, ${b})`;

            // Draw connections (K-Nearest Neighbors K=3)
            ctx.beginPath();
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 0.1 + cycle * 0.15;

            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                p.x += p.speed;
                if (p.x > width) p.x = 0;

                const wave = Math.sin(time * 0.0015 + p.phase) * 12;
                p.y = p.base_y + wave;

                // Find 3 closest neighbors
                const distances: { index: number; distSq: number }[] = [];
                for (let j = 0; j < points.length; j++) {
                    if (i === j) continue;
                    const dx = p.x - points[j].x;
                    const dy = p.y - points[j].y;
                    distances.push({ index: j, distSq: dx * dx + dy * dy });
                }

                // Sort by distance and take the 3 closest
                distances.sort((a, b) => a.distSq - b.distSq);
                const nearest = distances.slice(0, 3);

                for (const neighbor of nearest) {
                    // Only draw if within a reasonable maximum distance (e.g., 200px)
                    if (neighbor.distSq < 40000) {
                        const p2 = points[neighbor.index];
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                    }
                }
            }
            ctx.stroke();

            // Draw points (Bioluminescent Glow - RESTORED COLORS)
            for (const p of points) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Outer Glow - Pulsing with brand color
                ctx.shadowBlur = 10 + cycle * 12;
                ctx.shadowColor = currentColor;

                ctx.globalAlpha = 0.6 + cycle * 0.3;
                ctx.fillStyle = currentColor;
                ctx.fill();
                ctx.restore();
            }

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = canvas.parentElement?.offsetHeight || 100;
        };

        window.addEventListener('resize', handleResize);
        const animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', handleResize);
        };
    }, { scope: canvasRef });

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-50"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
        />
    );
};

export default function HomeHeader() {
    return (
        <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-brand-navy to-brand-cyan shadow-md overflow-hidden">
            {/* Dynamic Texture Layer */}
            <TextureBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-1 md:gap-3">
                    {/* Instagram Link */}
                    <motion.a
                        href="https://instagram.com/institutosobreviver37"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, color: "#ff6caf" }}
                        className="text-white transition-colors flex items-center justify-center p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </motion.a>

                    {/* WhatsApp Mobile Icon */}
                    <motion.a
                        href="https://wa.me/553797783092"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: "#25D366" }}
                        className="text-white transition-colors flex items-center justify-center p-2 md:hidden"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </motion.a>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex flex-1 justify-center gap-12">
                    {/* NOSSA HISTORIA REMOVED */}
                    <motion.a
                        href="#impacto"
                        whileHover={{ scale: 1.1 }}
                        className="text-sm font-semibold uppercase tracking-wider text-white hover:text-stone-100 transition-all inline-block"
                    >
                        Impacto
                    </motion.a>
                    <motion.a
                        href="#servicos"
                        whileHover={{ scale: 1.1 }}
                        className="text-sm font-semibold uppercase tracking-wider text-white hover:text-stone-100 transition-all inline-block"
                    >
                        Serviços
                    </motion.a>
                </nav>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4">
                    {/* SECONDARY: WhatsApp Contact (Desktop Only) */}
                    <motion.a
                        href="https://wa.me/553797783092"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex px-6 py-2 rounded-full font-bold text-sm transition-all duration-300
                                   bg-transparent border-2 border-white text-white drop-shadow-md
                                   hover:bg-white hover:text-azure-deep hover:border-white hover:drop-shadow-none"
                    >
                        Fale Conosco
                    </motion.a>

                    {/* PRIMARY: Donation Button — CONNECTED via Smart Component */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <SmartDonationButton enableTooltip={false} className="text-sm" />
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
