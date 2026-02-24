import { useRef, useEffect, useState } from 'react';

interface ParticleFlowProps {
    targetId?: string; // ID of the DOM element to attract particles
    className?: string; // Optional styling for the wrapper
    particleCount?: number;
}

class SpatialGrid {
    cellSize: number;
    cells: Map<string, Particle[]>;

    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.cells = new Map();
    }

    clear() {
        this.cells.clear();
    }

    insert(particle: Particle) {
        const col = Math.floor(particle.x / this.cellSize);
        const row = Math.floor(particle.y / this.cellSize);
        const key = `${col},${row}`;
        if (!this.cells.has(key)) {
            this.cells.set(key, []);
        }
        this.cells.get(key)!.push(particle);
    }

    getNearbyParticles(particle: Particle): Particle[] {
        const col = Math.floor(particle.x / this.cellSize);
        const row = Math.floor(particle.y / this.cellSize);
        const nearby: Particle[] = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const key = `${col + i},${row + j}`;
                const cellParticles = this.cells.get(key);
                if (cellParticles) {
                    for (let k = 0; k < cellParticles.length; k++) {
                        nearby.push(cellParticles[k]);
                    }
                }
            }
        }
        return nearby;
    }
}

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    id: number;
    alpha: number;
    isMobile: boolean;
    // Color components for smooth interpolation
    r: number; g: number; b: number;
    targetR: number; targetG: number; targetB: number;

    constructor(canvasWidth: number, canvasHeight: number, id: number, isMobile: boolean = false) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.isMobile = isMobile;

        // Start with Cyan
        this.r = this.targetR = 52;
        this.g = this.targetG = 187;
        this.b = this.targetB = 206;

        // Reducción de velocidad (-30% en móviles)
        const speedFactor = isMobile ? 0.84 : 1.2;
        this.vx = (Math.random() - 0.5) * speedFactor;
        this.vy = (Math.random() - 0.5) * speedFactor;
        this.radius = Math.random() * 1.5 + 0.5;
        this.id = id;
        this.alpha = 0.15 + Math.random() * 0.13; // Max 0.28 de opacidad para puntos
    }

    update(
        ctx: CanvasRenderingContext2D,
        mouseX: number,
        mouseY: number,
        canvasWidth: number,
        canvasHeight: number,
        repelRadius: number,
        nearbyParticles: Particle[],
        waveX: number,
        isTransitioningToDark: boolean
    ) {
        // 0. Update Target Color based on Wave Position
        const CYAN = { r: 52, g: 187, b: 206 };
        const WHITE = { r: 255, g: 255, b: 255 };

        if (isTransitioningToDark) {
            // Wave from Right to Left: Points to the RIGHT of waveX turn White
            if (this.x > waveX) {
                this.targetR = WHITE.r; this.targetG = WHITE.g; this.targetB = WHITE.b;
            } else {
                this.targetR = CYAN.r; this.targetG = CYAN.g; this.targetB = CYAN.b;
            }
        } else {
            // Wave from Left to Right: Points to the LEFT of waveX turn Cyan
            if (this.x < waveX) {
                this.targetR = CYAN.r; this.targetG = CYAN.g; this.targetB = CYAN.b;
            } else {
                this.targetR = WHITE.r; this.targetG = WHITE.g; this.targetB = WHITE.b;
            }
        }

        // Smooth color interpolation
        this.r += (this.targetR - this.r) * 0.05;
        this.g += (this.targetG - this.g) * 0.05;
        this.b += (this.targetB - this.b) * 0.05;
        const currentColor = `rgb(${Math.floor(this.r)}, ${Math.floor(this.g)}, ${Math.floor(this.b)})`;

        let sepX = 0, sepY = 0;
        let alignX = 0, alignY = 0;
        let cohX = 0, cohY = 0;
        let neighborCount = 0;

        for (let i = 0; i < nearbyParticles.length; i++) {
            const other = nearbyParticles[i];
            if (other === this) continue;

            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distSq = dx * dx + dy * dy;

            // Reducción de Vínculos en móvil (110px), PC (180px)
            const connDist = this.isMobile ? 110 : 180;
            const connDistSq = connDist * connDist;

            if (distSq < connDistSq) { // Threshold
                const dist = Math.sqrt(distSq) || 1;

                // Neural Line Connect
                if (other.id > this.id) {
                    const lineAlpha = (1 - dist / connDist) * 0.22; // Max 22% opacidad línea
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.lineWidth = 0.5;
                    ctx.strokeStyle = `rgba(${Math.floor(this.r)}, ${Math.floor(this.g)}, ${Math.floor(this.b)}, ${lineAlpha})`; // Cian Vibrante
                    ctx.stroke();
                }

                // 1. Separation
                const sepDist = this.isMobile ? 55 : 80;
                if (dist < sepDist) {
                    const force = (sepDist - dist) / sepDist;
                    sepX += (dx / dist) * force * 3;
                    sepY += (dy / dist) * force * 3;
                }

                // Acumular Cohesión y Alineación
                alignX += other.vx;
                alignY += other.vy;
                cohX += other.x;
                cohY += other.y;
                neighborCount++;
            }
        }

        if (neighborCount > 0) {
            // 2. Alignment
            alignX /= neighborCount;
            alignY /= neighborCount;
            this.vx += (alignX - this.vx) * 0.05;
            this.vy += (alignY - this.vy) * 0.05;

            // 3. Cohesion
            cohX /= neighborCount;
            cohY /= neighborCount;
            const cohDx = cohX - this.x;
            const cohDy = cohY - this.y;
            const cohDist = Math.sqrt(cohDx * cohDx + cohDy * cohDy) || 1;
            this.vx += (cohDx / cohDist) * 0.05;
            this.vy += (cohDy / cohDist) * 0.05;
        }

        this.vx += sepX;
        this.vy += sepY;

        // 4. Mouse Repulsion Vortex
        const dxMouse = mouseX - this.x;
        const dyMouse = mouseY - this.y;
        const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
        const repelRadiusSq = repelRadius * repelRadius;

        if (distMouseSq < repelRadiusSq && distMouseSq > 0) {
            const distMouse = Math.sqrt(distMouseSq);
            const force = (repelRadius - distMouse) / repelRadius;
            this.vx -= (dxMouse / distMouse) * force * 12;
            this.vy -= (dyMouse / distMouse) * force * 12;
        }

        // 5. Bounds Bounce
        const margin = 50;
        const turnFactor = 0.5;
        if (this.x < margin) this.vx += turnFactor;
        if (this.x > canvasWidth - margin) this.vx -= turnFactor;
        if (this.y < margin) this.vy += turnFactor;
        if (this.y > canvasHeight - margin) this.vy -= turnFactor;

        // Limite de velocidad
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = this.isMobile ? 1.05 : 1.5;
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }

        this.vx *= 0.98;
        this.vy *= 0.98;

        this.x += this.vx;
        this.y += this.vy;

        // Draw Particle (Cian Vibrante)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = currentColor;
        ctx.fill();
        ctx.closePath();
    }
}

export default function ParticleFlow({ className = '', particleCount = 300 }: ParticleFlowProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position relative to canvas
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    // 1. Intersection Observer for Performance (CRITICAL)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.01 } // Very slight margin to trigger
        );

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // 2. Canvas and Animation Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width;
        let height = canvas.height;
        // Spatial hash grid initialized to 180px cells to cover Neural connections
        const grid = new SpatialGrid(180);

        const resize = () => {
            if (wrapperRef.current) {
                const rect = wrapperRef.current.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                width = rect.width;
                height = rect.height;

                const isMobile = window.innerWidth < 768;
                // Densidad Controlada: exactly 75 on mobile to avoid whitespace clustering mass
                const activeCount = isMobile ? 75 : particleCount;

                // Re-init particles on resize to fit bounds naturally
                particlesRef.current = Array.from({ length: activeCount }, (_, i) => new Particle(width, height, i, isMobile));
            }
        };

        window.addEventListener('resize', resize);
        resize();

        // Animation Loop Core Engine
        const animate = () => {
            if (!isVisible) {
                // Suspends the loop while preserving the request reference
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // High Performance Update: Populate Spatial Grid O(N)
            grid.clear();
            for (let i = 0; i < particlesRef.current.length; i++) {
                grid.insert(particlesRef.current[i]);
            }

            // 30-second Wave Cycle Calculation
            const currentTime = Date.now();
            const cycleDuration = 30000;
            const cycleTime = currentTime % cycleDuration;
            const halfCycle = cycleDuration / 2;

            let waveX: number;
            let isTransitioningToDark: boolean;

            if (cycleTime < halfCycle) {
                // Phase 1: 0-15s - Wave from Right to Left (width to 0)
                isTransitioningToDark = true;
                const progress = cycleTime / halfCycle;
                waveX = width - (progress * width);
            } else {
                // Phase 2: 15-30s - Wave from Left to Right (0 to width)
                isTransitioningToDark = false;
                const progress = (cycleTime - halfCycle) / halfCycle;
                waveX = progress * width;
            }

            // High Performance Update: Flocking and Neural Network
            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                const nearby = grid.getNearbyParticles(p);

                p.update(
                    ctx,
                    mouseRef.current.x,
                    mouseRef.current.y,
                    width,
                    height,
                    350,
                    nearby,
                    waveX,
                    isTransitioningToDark
                );
            }

            // Hygiene logic to avoid polluting external contexts
            ctx.globalAlpha = 1.0;

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle Mouse Move over the general window bounds gracefully
        const handleMouseMove = (e: MouseEvent) => {
            if (!canvasRef.current) return;
            const rect = canvasRef.current.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isVisible, particleCount]);

    return (
        <div
            ref={wrapperRef}
            className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
            />
        </div>
    );
}
