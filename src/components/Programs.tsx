'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const programs = [
    {
        id: 1,
        title: 'Resgate contra o Abandono',
        description: 'Minas Gerais possui apenas 71 leitos paliativos formais para 21 milhões de pessoas. O Instituto resgatou mais de 370 vidas do isolamento e do descaso em apenas dois anos. Sua doação garante a dignidade onde o sistema público falha sistematicamente.',
        image: '/assets/brand/donation/galeria/scroll-horizontal/tarjeta-1.png',
    },
    {
        id: 2,
        title: 'Escudo contra a Burocracia',
        description: 'A burocracia estatal bloqueia o acesso a remédios vitais para quem não pode esperar. Facilitamos o bloqueio judicial de R$ 384.000 para garantir tratamentos de alto custo que salvam pacientes do sofrimento. Seja a justiça que chega antes do esquecimento.',
        image: '/assets/brand/donation/galeria/scroll-horizontal/tarjeta-2.png',
    },
    {
        id: 3,
        title: 'Aliança pela Dignidade',
        description: 'Geramos R$ 145.000 em impacto social direto com serviços que o Estado não provê em domicílio. O cuidado é uma responsabilidade compartilhada pela sociedade através de alianças compassivas. Doe para sustentar esta resistência pela vida.',
        image: '/assets/brand/donation/galeria/scroll-horizontal/tarjeta-3.png',
    },
];

// Función para resaltar números en cian
const highlightNumbers = (text: string) => {
    // Regex avanzada para cantidades, porcentajes y cifras numéricas
    const parts = text.split(/(R\$\s[\d\.]+|[\d]+(?:\s?leitos|\s?vidas|\s?anos)?)/g);
    return parts.map((part, i) => {
        if (!part) return null;
        if (part.match(/R\$\s[\d\.]+|[\d]+(?:\s?leitos|\s?vidas|\s?anos)?/)) { // Resaltar cifras y contexto inmediato si es corto
            return <span key={i} className="text-brand-cyan font-bold">{part}</span>;
        }
        return part;
    });
};

interface ProgramProps {
    program: typeof programs[0];
    isActive: boolean;
    isMobile: boolean;
    onActivate: () => void;
    onDeactivate: () => void;
}

const ProgramCard: React.FC<ProgramProps> = ({ program, isActive, isMobile, onActivate, onDeactivate }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const timeline = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!containerRef.current || !imageRef.current || !titleRef.current || !textRef.current || !overlayRef.current) return;

        // Crear Timeline pausado
        timeline.current = gsap.timeline({ paused: true });

        // Definición del Timeline (Secuencia Editorial Fluida 1.4s)
        timeline.current
            // Paso 1 (0s - 0.8s): Revelación de Imagen y Preparación
            .to(imageRef.current, {
                filter: 'grayscale(0%) blur(0px)',
                scale: 1.12,
                duration: 0.8,
                ease: 'power2.out'
            }, 0)

            // Paso 2 (0.4s - 1.2s): Movimiento del Título
            .to(titleRef.current, {
                top: '1rem', // top-4 equivalente (extremo superior)
                bottom: 'auto',
                duration: 0.8,
                ease: 'power3.inOut' // Movimiento suave
            }, 0.4)

            // Desenfoque suave & Overlay
            .to(imageRef.current, {
                filter: 'grayscale(0%) blur(4px)',
                duration: 0.8,
                ease: 'power2.inOut'
            }, 0.5)

            .to(overlayRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.inOut'
            }, 0.5)

            // Paso 3 (0.7s - 1.4s): Aparición del Texto Centrado
            // Se asegura que empiece tarde para que en reversa sea lo primero en irse
            .fromTo(textRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
                0.7
            );

    }, { scope: containerRef });

    useEffect(() => {
        if (!timeline.current) return;
        if (isActive) {
            timeline.current.timeScale(1).play();
        } else {
            timeline.current.timeScale(1).reverse();
        }
    }, [isActive]);

    const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isMobile && e.pointerType === 'mouse') onActivate();
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isMobile && e.pointerType === 'mouse') onDeactivate();
    };

    const handleTouchStart = () => {
        if (isMobile) onActivate(); // En móvil solo activamos, nunca desactivamos (Persistencia Árbitro)
    };

    return (
        <div
            ref={containerRef}
            className="group relative w-[85vw] md:w-[40vw] h-[60vh] shrink-0 bg-white rounded-3xl overflow-hidden shadow-xl cursor-cursor select-none [-webkit-touch-callout:none] touch-pan-y"
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onTouchStart={handleTouchStart}
        >
            {/* Image Container */}
            <div className="absolute inset-0 z-0 bg-brand-navy overflow-hidden">
                <img
                    ref={imageRef}
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover z-10 filter grayscale scale-100 blur-0 transform-gpu"
                />

                {/* Overlay Base (Siempre visible para contraste) */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent pointer-events-none" />

                {/* Overlay Hover Suave */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-20 bg-brand-navy/35 backdrop-blur-[4px] pointer-events-none opacity-0"
                />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end p-8">

                {/* Título (Se mueve independientemente) */}
                <h3
                    ref={titleRef}
                    className="absolute left-8 right-8 bottom-8 font-display text-xl md:text-3xl text-brand-white drop-shadow-lg tracking-wide uppercase leading-tight z-40 origin-left"
                >
                    {program.title}
                </h3>

                {/* Contenedor de Texto Centrado */}
                {/* top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 con width 85% */}
                <div
                    ref={textRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] opacity-0 z-30"
                >
                    <p className="font-body text-lg text-white/90 leading-relaxed drop-shadow-md text-justify md:text-left
                                  first-letter:text-7xl first-letter:font-bold first-letter:text-brand-cyan 
                                  first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8]">
                        {highlightNumbers(program.description)}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Programs: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!wrapperRef.current || !sectionRef.current) return;

        // Lifecycle Robustness: Refresh ScrollTrigger on load and after slight delay
        const refreshScrollTrigger = () => ScrollTrigger.refresh();
        window.addEventListener('load', refreshScrollTrigger);

        // Manual refresh to handle layout shifts from previous heavy sections (150ms as requested)
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 150);

        // Horizontal Scroll Logic (Quirúrgicamente Ajustada)
        // Horizontal Scroll Logic (Con Buffers de Amortiguación)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                pinSpacing: true,
                scrub: 1, // Suavizado general
                start: 'top top',
                // End extendido (+1000px) para acomodar los buffers sin acelerar el scroll
                end: () => "+=" + (wrapperRef.current ? wrapperRef.current.scrollWidth - window.innerWidth + 1000 : window.innerWidth + 1000),
                invalidateOnRefresh: true,
                anticipatePin: 1,
                fastScrollEnd: true,
            }
        });

        // 1. Buffer Inicial (500px virtuales de "pausa")
        tl.to({}, { duration: 500 });

        // 2. Movimiento Horizontal (Ease Suave)
        tl.to(wrapperRef.current, {
            x: () => {
                if (!wrapperRef.current) return 0;
                return -(wrapperRef.current.scrollWidth - window.innerWidth);
            },
            ease: 'power1.inOut', // Arranque y frenado suave
            duration: () => wrapperRef.current ? wrapperRef.current.scrollWidth - window.innerWidth : 1000 // Duración proporcional
        });

        // 3. Buffer Final (500px virtuales de "pausa")
        tl.to({}, { duration: 500 });

        return () => {
            window.removeEventListener('load', refreshScrollTrigger);
            clearTimeout(timer);
        };

    }, { scope: sectionRef });

    return (
        <section id="programs" ref={sectionRef} className="relative h-screen w-full bg-brand-cream overflow-hidden flex items-center">

            {/* Header Flotante */}
            <div className="absolute top-12 left-12 z-20 pointer-events-none">
                <span className="text-brand-cyan font-bold tracking-widest uppercase text-sm">Onde o Estado Falha</span>
                <h2 className="font-display text-4xl text-brand-navy font-bold mt-2">Sua Doação Resgata</h2>
            </div>

            <div
                ref={wrapperRef}
                className="flex gap-12 px-12 items-center h-full w-[300vw] md:w-[200vw]"
            >
                {/* Intro Text Block */}
                <div className="w-[80vw] md:w-[30vw] shrink-0 text-brand-navy">
                    <p className="font-display text-3xl md:text-5xl leading-tight">
                        "Sua <span className="text-brand-cyan">contribuição</span> é a força que preenche o vazio do descaso e dignifica cada <span className="text-brand-cyan">vida</span>."
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-brand-navy/60">
                        <span>Desliza para explorar</span>
                        <ArrowRight className="w-5 h-5 animate-pulse" />
                    </div>
                </div>

                {programs.map((program) => (
                    <ProgramCard
                        key={program.id}
                        program={program}
                        isActive={activeCardId === program.id}
                        isMobile={isMobile}
                        onActivate={() => setActiveCardId(program.id)}
                        onDeactivate={() => setActiveCardId(null)}
                    />
                ))}

                {/* End spacer */}
                <div className="w-[10vw] shrink-0" />
            </div>
        </section>
    );
};

export default Programs;
