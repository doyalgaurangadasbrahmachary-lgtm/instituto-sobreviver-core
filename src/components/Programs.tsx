'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(useGSAP);

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
    const parts = text.split(/(R\$\s[\d\.]+|[\d]+(?:\s?leitos|\s?vidas|\s?anos)?)/g);
    return parts.map((part, i) => {
        if (!part) return null;
        if (part.match(/R\$\s[\d\.]+|[\d]+(?:\s?leitos|\s?vidas|\s?anos)?/)) {
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

        timeline.current = gsap.timeline({ paused: true });

        timeline.current
            .to(imageRef.current, {
                filter: 'grayscale(0%) blur(0px)',
                scale: 1.12,
                duration: 0.8,
                ease: 'power2.out'
            }, 0)
            .to(titleRef.current, {
                top: '1rem',
                bottom: 'auto',
                duration: 0.8,
                ease: 'power3.inOut'
            }, 0.4)
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
        if (isMobile) onActivate();
    };

    return (
        <div
            ref={containerRef}
            className="group relative w-full h-[62vh] bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer select-none [-webkit-touch-callout:none] touch-pan-y"
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
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent pointer-events-none" />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-20 bg-brand-navy/35 backdrop-blur-[4px] pointer-events-none opacity-0"
                />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end p-8">
                <h3
                    ref={titleRef}
                    className="absolute left-8 right-8 bottom-8 font-display text-xl md:text-3xl text-brand-white drop-shadow-lg tracking-wide uppercase leading-tight z-40 origin-left"
                >
                    {program.title}
                </h3>
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

    return (
        <section id="programs" className="relative w-full bg-brand-cream py-20 px-6 md:px-12">

            {/* Header — slide-up al entrar en viewport (once: true) */}
            <motion.div
                className="mb-14 pointer-events-none"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <span className="text-brand-cyan font-bold tracking-widest uppercase text-sm">
                    Onde o Estado Falha
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-brand-navy font-bold mt-2">
                    Sua Doação Resgata
                </h2>
            </motion.div>

            {/* Intro quote — slide-up con delay */}
            <motion.div
                className="mb-16 max-w-2xl"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            >
                <p className="font-display text-2xl md:text-3xl text-brand-navy leading-snug">
                    "Sua <span className="text-brand-cyan">contribuição</span> é a força que preenche o vazio do descaso e dignifica cada <span className="text-brand-cyan">vida</span>."
                </p>
                <div className="mt-6 flex items-center gap-2 text-brand-navy/50 text-sm">
                    <span>Toque para explorar</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                </div>
            </motion.div>

            {/* Cards verticales — slide-up escalonado */}
            <div className="flex flex-col gap-8 max-w-2xl md:max-w-none md:grid md:grid-cols-3 md:gap-8">
                {programs.map((program, i) => (
                    <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
                    >
                        <ProgramCard
                            program={program}
                            isActive={activeCardId === program.id}
                            isMobile={isMobile}
                            onActivate={() => setActiveCardId(program.id)}
                            onDeactivate={() => setActiveCardId(null)}
                        />
                    </motion.div>
                ))}
            </div>

        </section>
    );
};

export default Programs;
