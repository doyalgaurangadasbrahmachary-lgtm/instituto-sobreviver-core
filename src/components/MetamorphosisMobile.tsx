'use client';

// =============================================================================
// MetamorphosisMobile.tsx
// Mobile-only component: 6 vertical scroll blocks with zoom+parallax.
// Fix: NO mt-[40vh] gap. Button opacity driven by Bloque 1 scroll progress
// (Opción B) — appears only after 80% of the first B&N block is scrolled.
// INDEPENDENT — changes here NEVER affect MetamorphosisDesktop.tsx.
// =============================================================================

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useView } from '../context/ViewContext';
import { FileText, ExternalLink } from 'lucide-react';
import DonationButton from './ui/DonationButton';

// --- Sections (mobile assets) ---
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
        criticalText: "A burocracia e o descaso bloqueiam o acesso a remédios vitais. Pacientes terminais são tratados como números em processos lentos.",
        hopeText: "Justiça que cura. Já asseguramos R$ 384.000 em bloqueios judiciais para garantir medicamentos de alto custo e dignidade."
    }
];

// --- TitleSplit helper (local copy — independent) ---
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

// --- MobileScrollBlock: each full-screen image section ---
interface MobileScrollBlockProps {
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

const MobileScrollBlock = ({
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
}: MobileScrollBlockProps) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const { openReport } = useView();
    const [locked, setLocked] = useState(false);

    const { scrollYProgress } = useScroll({
        target: blockRef,
        offset: ['start end', 'end start'],
    });

    const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.35]);
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const rawTextOpacity = useTransform(
        scrollYProgress,
        [0.10, 0.20, 0.80, 0.95],
        [0, 1, 1, 0]
    );
    const textY = useTransform(scrollYProgress, [0.10, 0.20], [30, 0]);

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        if (isPersistent && v >= 0.20 && !locked) setLocked(true);
    });

    const textOpacity = locked ? 1 : rawTextOpacity;

    return (
        <div
            ref={blockRef}
            className="relative w-full min-h-screen"
            style={{ touchAction: 'pan-y' }}
        >
            {/* Image layer — zoom isolated */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.img
                    src={imgSrc}
                    alt={imgAlt}
                    className={`absolute inset-0 w-full h-full object-cover will-change-transform ${isGrayscale
                            ? 'filter grayscale brightness-[1.15] contrast-[1.05]'
                            : 'brightness-110 saturate-110'
                        }`}
                    style={{ scale: imgScale, y: imgY }}
                    loading="lazy"
                    decoding="async"
                    width={390}
                    height={844}
                />
            </div>

            {/* Solid black underlay — eliminates any white flash between blocks */}
            <div className="absolute inset-0 bg-black -z-[1]" />

            {/* Color/tone overlay */}
            {isGrayscale && (
                <div className="absolute inset-0 z-[1] bg-brand-navy/40 mix-blend-multiply pointer-events-none" />
            )}
            {!isGrayscale && (
                <div className="absolute inset-0 z-[1] bg-brand-cyan/10 mix-blend-overlay pointer-events-none" />
            )}

            {/* Readability gradient */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute bottom-0 w-full h-[55vh] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            </div>

            {/* Text layer — fully decoupled from zoom */}
            <motion.div
                className="absolute bottom-[10%] left-[6%] w-[88%] z-20 pointer-events-auto"
                style={{ opacity: textOpacity, y: locked ? 0 : textY }}
            >
                <h3 className="font-display text-6xl mb-4 tracking-tighter leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)]">
                    <TitleSplit text={title} baseColor={titleColor} />
                </h3>

                {showReportButton && (
                    <button
                        onClick={openReport}
                        className="mb-4 flex items-center gap-3 bg-brand-navy/60 backdrop-blur-sm border border-brand-cyan/30 rounded-lg p-3 w-[220px] text-left hover:bg-brand-navy/80 transition-colors group shadow-lg shadow-black/40"
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

                <div className={`${cardBg} backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl`}>
                    <p className={`font-body text-base leading-relaxed tracking-normal text-left text-white/90 border-l-4 ${borderColor}/50 pl-5`}>
                        {text}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

// =============================================================================
// MetamorphosisMobile — main export
//
// Button logic (Opción B):
//   - The button wrapper is sticky top-20 (below the pill header)
//   - NO mt-[40vh] gap — gap was the source of white space
//   - Button opacity is driven by the scroll of Bloque 1 (first B&N block)
//   - Invisible until 80% of Bloque 1 is scrolled, then fades in at 100%
//   - This avoids competing with the Hero/PillHeader on first impact
// =============================================================================

// Sub-component: controls button opacity via Bloque 1 scroll
const ButtonWithDelayedAppearance: React.FC<{ bloque1Ref: React.RefObject<HTMLDivElement> }> = ({ bloque1Ref }) => {
    const { scrollYProgress: bloque1Progress } = useScroll({
        target: bloque1Ref,
        offset: ['start start', 'end end'],
    });

    // Invisible until 80% of first block, fully visible at 100%
    const btnOpacity = useTransform(bloque1Progress, [0.80, 1.0], [0, 1]);

    return (
        <motion.div
            className="sticky top-20 z-[100] h-0 overflow-visible flex justify-center"
            style={{ opacity: btnOpacity }}
        >
            <div className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <DonationButton variant="cyan" />
            </div>
        </motion.div>
    );
};

const MetamorphosisMobile: React.FC = () => {
    // Ref for Bloque 1 (first B&N) — used to trigger button appearance
    const bloque1Ref = useRef<HTMLDivElement>(null);

    const blocks = SECTIONS.flatMap((section) => [
        { key: `${section.id}-bn`, imgSrc: section.imgBN, isGrayscale: true, titleColor: 'text-white', borderColor: 'border-red-400', cardBg: 'bg-black/50', title: section.title, text: section.criticalText, isBloque1: section.id === 'fisica', showReportButton: false, isPersistent: false },
        { key: `${section.id}-color`, imgSrc: section.imgColor, isGrayscale: false, titleColor: 'text-brand-cyan', borderColor: 'border-brand-cyan', cardBg: 'bg-brand-navy/65', title: section.title, text: section.hopeText, isBloque1: false, showReportButton: section.id === 'juridica', isPersistent: section.id === 'juridica' },
    ]);

    return (
        <section className="relative w-full bg-black">
            {/* Solid black floor — prevents any white flash */}
            <div className="absolute inset-0 bg-black -z-[1]" />

            {/* Button — sticky top-20, opacity driven by bloque 1 progress */}
            <ButtonWithDelayedAppearance bloque1Ref={bloque1Ref as React.RefObject<HTMLDivElement>} />

            {blocks.map((block) => (
                block.isBloque1 ? (
                    // Bloque 1 gets the ref for scroll-driven button opacity
                    <div key={block.key} ref={bloque1Ref}>
                        <MobileScrollBlock
                            imgSrc={block.imgSrc}
                            imgAlt={block.key}
                            isGrayscale={block.isGrayscale}
                            titleColor={block.titleColor}
                            borderColor={block.borderColor}
                            cardBg={block.cardBg}
                            title={block.title}
                            text={block.text}
                            showReportButton={block.showReportButton}
                            isPersistent={block.isPersistent}
                        />
                    </div>
                ) : (
                    <MobileScrollBlock
                        key={block.key}
                        imgSrc={block.imgSrc}
                        imgAlt={block.key}
                        isGrayscale={block.isGrayscale}
                        titleColor={block.titleColor}
                        borderColor={block.borderColor}
                        cardBg={block.cardBg}
                        title={block.title}
                        text={block.text}
                        showReportButton={block.showReportButton}
                        isPersistent={block.isPersistent}
                    />
                )
            ))}
        </section>
    );
};

export default MetamorphosisMobile;
