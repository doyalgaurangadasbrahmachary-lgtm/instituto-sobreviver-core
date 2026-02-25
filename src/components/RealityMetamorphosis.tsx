'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

import { useView } from '../context/ViewContext';
import { FileText, ExternalLink } from 'lucide-react';

// --- HELPER: split «Parte A: Parte B» into weighted spans ---
const TitleSplit = ({
    text,
    baseColor,
}: {
    text: string;
    baseColor: string;
}) => {
    const colonIdx = text.indexOf(':');
    if (colonIdx === -1) {
        return <span className={`font-bold ${baseColor}`}>{text}</span>;
    }
    const partA = text.slice(0, colonIdx + 1);
    const partB = text.slice(colonIdx + 1).trimStart();
    return (
        <>
            <span className={`font-bold ${baseColor}`}>{partA}</span>
            <span className={`block font-extralight ${baseColor}/80 mt-1`}>{partB}</span>
        </>
    );
};

// --- DATA ---
const SECTIONS = [
    {
        id: 'fisica',
        title: 'Física',
        imgBN: '/assets/brand/donation/metamorfosis-movil/hospital.png',
        imgColor: '/assets/brand/donation/metamorfosis-movil/1.2.png',
        criticalText: "Em Divinópolis, as mortes por câncer cresceram 54% na última década. O sistema ignora a dor de quem não pode esperar.",
        hopeText: "O Instituto oferece alívio integral. Com Ozonioterapia e terapias especializadas, garantimos que a dignidade vença a dor física."
    },
    {
        id: 'social',
        title: 'Social',
        imgBN: '/assets/brand/donation/metamorfosis-movil/2.1.png',
        imgColor: '/assets/brand/donation/metamorfosis-movil/familia.png',
        criticalText: "Minas Gerais possui apenas 71 leitos paliativos para 21 milhões de pessoas. O abandono institucional é a regra nos desertos assistenciais.",
        hopeText: "Somos uma Comunidade Paliativista. Mais de 370 pessoas já foram resgatadas do isolamento para um ambiente de amor e presença ativa."
    },
    {
        id: 'juridica',
        title: 'Jurídica',
        imgBN: '/assets/brand/donation/metamorfosis-movil/3.1.png',
        imgColor: '/assets/brand/donation/metamorfosis-movil/3.2.png',
        criticalText: "A burocracia e o descaso bloqueiam o acesso a remédios vitais. Pacientes terminais são tratados como números em procesos lentos.",
        hopeText: "Justiça que cura. Já asseguramos R$ 384.000 em bloqueios judiciais para garantir medicamentos de alto custo e dignidade."
    }
];

// =============================================================================
// SCROLL BLOCK — Unified for all screen sizes
//
// Image layout:
//   - `w-full h-auto` → natural aspect ratio, no forced crop, no distortion
//   - Container `min-h-screen` defines minimum space
//   - Text overlay floats at bottom with absolute positioning
//
// Farewell Zoom:
//   - Zoom only activates in the LAST 20% of the block scroll [0.8 → 1.0]
//   - Scale [1.0 → 1.05] — subtle exit zoom, not an entrance zoom
// =============================================================================

interface ScrollBlockProps {
    imgSrc: string;
    imgAlt: string;
    isGrayscale: boolean;
    titleColor: string;
    borderColor: string;
    cardBg: string;
    title: string;
    text: string;
    showReportButton?: boolean;
    isPersistent?: boolean;
}

const ScrollBlock = ({
    imgSrc,
    imgAlt,
    isGrayscale,
    titleColor,
    borderColor,
    cardBg,
    title,
    text,
    showReportButton = false,
    isPersistent = false,
}: ScrollBlockProps) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const { openReport } = useView();
    const [locked, setLocked] = useState(false);

    const { scrollYProgress } = useScroll({
        target: blockRef,
        offset: ['start end', 'end start'],
    });

    // Farewell zoom: only in the last 20% of the block scroll
    const imgScale = useTransform(scrollYProgress, [0.8, 1.0], [1.0, 1.05]);

    // Text fade-in/out
    const rawTextOpacity = useTransform(
        scrollYProgress,
        [0.10, 0.20, 0.80, 0.95],
        [0, 1, 1, 0]
    );
    const textY = useTransform(scrollYProgress, [0.10, 0.20], [30, 0]);

    // Last block persistence
    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (isPersistent && v >= 0.20 && !locked) setLocked(true);
    });

    const textOpacity = locked ? 1 : rawTextOpacity;

    return (
        <div
            ref={blockRef}
            className="relative w-full min-h-screen overflow-hidden"
            style={{ touchAction: 'pan-y' }}
        >
            {/* IMAGE — natural aspect ratio (w-full h-auto), not forced to fill/crop */}
            <motion.div
                className="relative w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                style={{ scale: imgScale, transformOrigin: 'center center' }}
            >
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    className={`w-full h-auto ${isGrayscale
                            ? 'filter grayscale brightness-[1.15] contrast-[1.05]'
                            : 'brightness-110 saturate-110'
                        }`}
                    loading="lazy"
                    decoding="async"
                />
            </motion.div>

            {/* Extend block to at least full viewport height with dark fill below image */}
            <div className="absolute inset-0 -z-[1] bg-black" />

            {/* Color/tone overlay */}
            {isGrayscale && (
                <div className="absolute inset-0 bg-brand-navy/40 mix-blend-multiply pointer-events-none" />
            )}
            {!isGrayscale && (
                <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay pointer-events-none" />
            )}

            {/* Readability gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 w-full h-[55vh] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            </div>

            {/* TEXT LAYER — decoupled from zoom transform */}
            <motion.div
                className="absolute bottom-[10%] left-[6%] w-[88%] md:max-w-[600px] z-20 pointer-events-auto"
                style={{ opacity: textOpacity, y: locked ? 0 : textY }}
            >
                <h3 className="font-display text-6xl md:text-8xl mb-4 tracking-tighter leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)]">
                    <TitleSplit text={title} baseColor={titleColor} />
                </h3>

                {showReportButton && (
                    <button
                        onClick={openReport}
                        className="mb-4 flex items-center gap-3 bg-brand-navy/60 backdrop-blur-sm border border-brand-cyan/30 rounded-lg p-3 w-[220px] md:w-[280px] text-left hover:bg-brand-navy/80 transition-colors group shadow-lg shadow-black/40"
                    >
                        <div className="p-2 rounded-lg bg-brand-cyan/10">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-brand-cyan text-[10px] font-bold uppercase tracking-widest mb-0.5">Relatório Técnico</h4>
                            <p className="text-white/70 text-[9px] font-light italic leading-tight line-clamp-1">Dados da nossa luta no SUS.</p>
                        </div>
                        <ExternalLink className="w-3 h-3 text-brand-cyan/50 group-hover:text-brand-cyan transition-colors" />
                    </button>
                )}

                <div className={`${cardBg} backdrop-blur-md p-5 md:p-7 rounded-2xl border border-white/10 shadow-2xl`}>
                    <p className={`font-body text-base md:text-xl leading-relaxed tracking-normal text-left text-white/90 border-l-4 ${borderColor}/50 pl-5`}>
                        {text}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

// =============================================================================
// MAIN COMPONENT — Unified vertical flow for all screen sizes
// NOTE: DonationButton is now rendered in App.tsx as a fixed element,
//       positioned top-right on desktop and below pill header on mobile.
// =============================================================================

const RealityMetamorphosis: React.FC = () => {
    return (
        <section id="reality-metamorphosis" className="relative w-full bg-black">
            {SECTIONS.flatMap((section) => [
                // B&N block — problem text
                <ScrollBlock
                    key={`${section.id}-bn`}
                    imgSrc={section.imgBN}
                    imgAlt={`${section.title} B&N`}
                    isGrayscale={true}
                    titleColor="text-white"
                    borderColor="border-red-400"
                    cardBg="bg-black/50"
                    title={section.title}
                    text={section.criticalText}
                />,
                // Color block — hope text
                <ScrollBlock
                    key={`${section.id}-color`}
                    imgSrc={section.imgColor}
                    imgAlt={`${section.title} Color`}
                    isGrayscale={false}
                    titleColor="text-brand-cyan"
                    borderColor="border-brand-cyan"
                    cardBg="bg-brand-navy/65"
                    title={section.title}
                    text={section.hopeText}
                    showReportButton={section.id === 'juridica'}
                    isPersistent={section.id === 'juridica'}
                />,
            ])}
        </section>
    );
};

export default RealityMetamorphosis;
