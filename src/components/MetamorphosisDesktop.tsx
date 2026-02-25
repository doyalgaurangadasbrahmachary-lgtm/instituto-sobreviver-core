'use client';

// =============================================================================
// MetamorphosisDesktop.tsx
// Desktop-only component: 900vh sticky scroll with circle clip-path reveal,
// hi-res seccion-2 assets, and original button choreography (absolute top-6 right-6).
// INDEPENDENT — changes here NEVER affect MetamorphosisMobile.tsx.
// =============================================================================

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useView } from '../context/ViewContext';
import { FileText, ExternalLink } from 'lucide-react';
import DonationButton from './ui/DonationButton';

// --- Shared data (desktop uses .desktop assets) ---
const SECTIONS = [
    {
        id: 'fisica',
        title: 'Física',
        imgBN: '/assets/brand/donation/seccion-2/Sec_1_BN.png',
        imgColor: '/assets/brand/donation/seccion-2/Sec_1_Color.png',
        criticalText: "Em Divinópolis, as mortes por câncer cresceram 54% na última década. O sistema ignora a dor de quem não pode esperar.",
        hopeText: "O Instituto oferece alívio integral. Com Ozonioterapia e terapias especializadas, garantimos que a dignidade vença a dor física."
    },
    {
        id: 'social',
        title: 'Social',
        imgBN: '/assets/brand/donation/seccion-2/Sec_2_BN.png',
        imgColor: '/assets/brand/donation/seccion-2/cambiarescena.png',
        criticalText: "Minas Gerais possui apenas 71 leitos paliativos para 21 milhões de pessoas. O abandono institucional é a regra nos desertos assistenciais.",
        hopeText: "Somos uma Comunidade Paliativista. Mais de 370 pessoas já foram resgatadas do isolamento para um ambiente de amor e presença ativa."
    },
    {
        id: 'juridica',
        title: 'Jurídica',
        imgBN: '/assets/brand/donation/seccion-2/Sec_3_BN.png',
        imgColor: '/assets/brand/donation/seccion-2/Sec_3_Color.png',
        criticalText: "A burocracia e o descaso bloqueiam o acesso a remédios vitais. Pacientes terminais são tratados como números em processos lentos.",
        hopeText: "Justiça que cura. Já asseguramos R$ 384.000 em bloqueios judiciais para garantir medicamentos de alto custo e dignidade."
    }
];

// --- TitleSplit helper ---
const TitleSplit = ({ text, baseColor }: { text: string; baseColor: string }) => {
    const colonIdx = text.indexOf(':');
    if (colonIdx === -1) return <span className={`font-bold ${baseColor}`}>{text}</span>;
    const partA = text.slice(0, colonIdx + 1);
    const partB = text.slice(colonIdx + 1).trimStart();
    return (
        <>
            <span className={`font-bold ${baseColor}`}>{partA}</span>
            <span className={`block font-extralight ${baseColor}/80 mt-1`}>{partB}</span>
        </>
    );
};

// --- MetamorphosisSlide: the full circle-reveal animation per section ---
const MetamorphosisSlide = ({
    section,
    scrollYProgress,
    index,
    total,
}: {
    section: typeof SECTIONS[0];
    scrollYProgress: MotionValue<number>;
    index: number;
    total: number;
}) => {
    const step = 1 / total;
    const start = index * step;
    const end = start + step;
    const { openReport } = useView();

    const slideProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
    const smoothProgress = useSpring(slideProgress, { stiffness: 50, damping: 20 });

    const clipPath = useTransform(
        smoothProgress,
        [0.3, 0.7],
        ['circle(0% at 50% 50%)', 'circle(150% at 50% 50%)'],
        { ease: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
    );

    const opacityCritical = useTransform(smoothProgress, [0.3, 0.45], [1, 0]);
    const opacityHope = useTransform(smoothProgress, [0.55, 0.7], [0, 1]);
    const scaleHope = useTransform(smoothProgress, [0.55, 0.7], [0.95, 1]);
    const yCritical = useTransform(smoothProgress, [0.3, 0.45], [0, -20]);
    const yHope = useTransform(smoothProgress, [0.55, 0.7], [20, 0]);

    return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
            {/* B&N background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={section.imgBN}
                    alt={`${section.title} B&N`}
                    className="w-full h-full object-cover filter grayscale brightness-[1.15] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-brand-navy/40 mix-blend-multiply" />
            </div>

            {/* Color layer — circle clip-path reveal */}
            <motion.div className="absolute inset-0 z-10" style={{ clipPath }}>
                <img
                    src={section.imgColor}
                    alt={`${section.title} Color`}
                    className="w-full h-full object-cover brightness-110 saturate-110"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay" />
            </motion.div>

            {/* Text layer */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 pointer-events-none" />
                <div className="absolute bottom-[10%] left-[6%] w-full max-w-[550px] z-10 text-left flex flex-col justify-end">

                    {/* Critical text — fades out */}
                    <motion.div style={{ opacity: opacityCritical, y: yCritical }} className="absolute bottom-0 left-0 w-full z-10">
                        <h3 className="font-display text-9xl mb-6 tracking-tighter leading-none">
                            <TitleSplit text={section.title} baseColor="text-white/40" />
                        </h3>
                        <p className="font-body text-3xl leading-relaxed tracking-normal text-left text-white border-l-4 border-red-500/50 pl-8 font-light">
                            {section.criticalText}
                        </p>
                    </motion.div>

                    {/* Hope text — fades in */}
                    <motion.div style={{ opacity: opacityHope, y: yHope, scale: scaleHope, willChange: "transform, opacity" }} className="absolute bottom-0 left-0 w-full origin-bottom-left">
                        {section.id === 'juridica' && (
                            <motion.button
                                onClick={openReport}
                                className="mb-2 absolute bottom-full mb-12 left-0 pointer-events-auto flex items-center gap-4 bg-brand-navy/60 backdrop-blur-md border border-brand-cyan/30 rounded-xl p-4 w-[320px] text-left hover:bg-brand-navy/80 transition-colors group shadow-lg shadow-black/50 origin-bottom-left"
                            >
                                <div className="p-3 rounded-lg bg-brand-cyan/10">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-brand-cyan text-sm font-bold uppercase tracking-widest mb-1">Relatório Técnico</h4>
                                    <p className="text-white/70 text-xs font-light italic leading-snug">Conheça os dados por trás da nossa luta pela dignidade no SUS.</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-brand-cyan/50 group-hover:text-brand-cyan transition-colors" />
                            </motion.button>
                        )}
                        <h3 className="font-display text-9xl mb-4 tracking-tighter leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                            <TitleSplit text={section.title} baseColor="text-brand-cyan" />
                        </h3>
                        <div className="bg-brand-navy/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
                            <p className="font-body text-2xl leading-relaxed tracking-normal text-left text-white font-medium border-l-4 border-brand-cyan/50 pl-6">
                                {section.hopeText}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// --- DesktopSlideWrapper: isolates useTransform per slide (Fix V8.4) ---
const DesktopSlideWrapper = ({
    section,
    scrollYProgress,
    index,
    total,
}: {
    section: typeof SECTIONS[0];
    scrollYProgress: MotionValue<number>;
    index: number;
    total: number;
}) => {
    const step = 1 / total;
    const start = index * step;
    const fadeStart = index === 0 ? 0 : start - 0.05;
    const fadeEnd = index === 0 ? 0.05 : start;
    const sectionOpacity = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 1]);

    return (
        <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: index * 10, opacity: index === 0 ? 1 : sectionOpacity }}
        >
            <MetamorphosisSlide
                section={section}
                scrollYProgress={scrollYProgress}
                index={index}
                total={total}
            />
        </motion.div>
    );
};

// =============================================================================
// MetamorphosisDesktop — main export
// Button: absolute top-6 right-6 (original choreography, inside sticky container)
// Header: DonationPillHeader lives above this in App.tsx (z-[150]), no conflict
//         because button right-6 ≠ center where pill lives.
// =============================================================================

const MetamorphosisDesktop: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-[900vh] bg-brand-navy">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <div className="relative w-full h-full">
                    {SECTIONS.map((section, index) => (
                        <DesktopSlideWrapper
                            key={section.id}
                            section={section}
                            scrollYProgress={scrollYProgress}
                            index={index}
                            total={SECTIONS.length}
                        />
                    ))}
                </div>

                {/* Blue donation button — original position: top-6 right-6, no conflict with centered pill header */}
                <div className="absolute top-6 right-6 z-[100] pointer-events-auto">
                    <DonationButton variant="cyan" />
                </div>

                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-8 right-8 z-[100] flex flex-col items-center gap-1 pointer-events-none"
                >
                    <motion.p
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        className="text-brand-cyan text-xs tracking-widest uppercase drop-shadow-md"
                    >
                        Desliza para transformar
                    </motion.p>
                    <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-[2px] h-6 rounded-full bg-gradient-to-b from-brand-cyan to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default MetamorphosisDesktop;
