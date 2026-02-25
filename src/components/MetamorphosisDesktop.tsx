'use client';

// =============================================================================
// MetamorphosisDesktop.tsx — Visual Essence Recovery
// Radical simplification: 
// 1. Identity: Restored massive 9xl typography and original card styles. Cards are fully static.
// 2. Button Opacity: Cyan button fades in only when entering the BN section (absolute zero in Hero).
// 3. Pruning: Zero zoom, zero continuous scale. Sharp 100% static images.
// 4. Height: 150vh per block for agile, lightweight scrolling (900vh total).
// =============================================================================

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useView } from '../context/ViewContext';
import { FileText, ExternalLink } from 'lucide-react';
import DonationButton from './ui/DonationButton';

// ─── Content data ─────────────────────────────────────────────────────────────
const BLOCKS = [
    {
        src: '/assets/brand/donation/seccion-2/Sec_1_BN.png',
        alt: 'Física — realidade',
        title: 'Física',
        titleColor: 'text-white/40',
        accent: 'border-red-500/50',
        text: "Em Divinópolis, as mortes por câncer cresceram 54% na última década. O sistema ignora a dor de quem não pode esperar.",
        isHope: false,
    },
    {
        src: '/assets/brand/donation/seccion-2/Sec_1_Color.png',
        alt: 'Física — esperança',
        title: 'Física',
        titleColor: 'text-brand-cyan',
        accent: 'border-brand-cyan/50',
        text: "O Instituto oferece alívio integral. Com Ozonioterapia e terapias especializadas, garantimos que a dignidade vença a dor física.",
        isHope: true,
    },
    {
        src: '/assets/brand/donation/seccion-2/Sec_2_BN.png',
        alt: 'Social — realidade',
        title: 'Social',
        titleColor: 'text-white/40',
        accent: 'border-red-500/50',
        text: "Minas Gerais possui apenas 71 leitos paliativos para 21 milhões de pessoas. O abandono institucional é a regra nos desertos assistenciais.",
        isHope: false,
    },
    {
        src: '/assets/brand/donation/seccion-2/cambiarescena.png',
        alt: 'Social — esperança',
        title: 'Social',
        titleColor: 'text-brand-cyan',
        accent: 'border-brand-cyan/50',
        text: "Somos uma Comunidade Paliativista. Mais de 370 pessoas já foram resgatadas do isolamento para um ambiente de amor e presença ativa.",
        isHope: true,
    },
    {
        src: '/assets/brand/donation/seccion-2/Sec_3_BN.png',
        alt: 'Jurídica — realidade',
        title: 'Jurídica',
        titleColor: 'text-white/40',
        accent: 'border-red-500/50',
        text: "A burocracia e o descaso bloqueiam o acesso a remédios vitais. Pacientes terminais são tratados como números em processos lentos.",
        isHope: false,
    },
    {
        src: '/assets/brand/donation/seccion-2/Sec_3_Color.png',
        alt: 'Jurídica — esperança',
        title: 'Jurídica',
        titleColor: 'text-brand-cyan',
        accent: 'border-brand-cyan/50',
        text: "Justiça que cura. Já asseguramos R$ 384.000 em bloqueios judiciais para garantir medicamentos de alto custo e dignidade.",
        isHope: true,
        showReport: true,
    },
];

// Helper for title splitting (preserves V24 logic)
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

// ─── ImageBlock ───────────────────────────────────────────────────────────────
// Static, agile scroll block (150vh). No zoom. Stable text.
const ImageBlock = ({
    block,
    isFirst,
}: {
    block: typeof BLOCKS[0];
    isFirst?: boolean;
}) => {
    const { openReport } = useView();

    return (
        <div className="relative h-[150vh]">
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* ── 100% Static Image ─────────────────────────────────────────── */}
                <img
                    src={block.src}
                    alt={block.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading={isFirst ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={isFirst ? 'high' : 'auto'}
                />

                {/* ── Original Overlay (B&N vs Color) ─────────────────────────── */}
                {!block.isHope && <div className="absolute inset-0 bg-brand-navy/40 mix-blend-multiply pointer-events-none" />}
                {block.isHope && <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay pointer-events-none" />}

                {/* ── Gradient vignette for text readability ──────────────────── */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

                {/* ── Original Text Cards (Stable & anchored) ─────────────────── */}
                <div className="absolute bottom-[10%] left-[6%] z-20 w-full max-w-[550px] text-left flex flex-col justify-end">

                    {/* Realidade (BN) Text */}
                    {!block.isHope && (
                        <div>
                            <h3 className="font-display text-9xl mb-6 tracking-tighter leading-none">
                                <TitleSplit text={block.title} baseColor={block.titleColor} />
                            </h3>
                            <p className={`font-body text-3xl leading-relaxed tracking-normal text-left text-white border-l-4 ${block.accent} pl-8 font-light`}>
                                {block.text}
                            </p>
                        </div>
                    )}

                    {/* Esperança (Color) Text */}
                    {block.isHope && (
                        <div>
                            {block.showReport && (
                                <button
                                    onClick={openReport}
                                    className="mb-8 pointer-events-auto flex items-center gap-4 bg-brand-navy/60 backdrop-blur-md border border-brand-cyan/30 rounded-xl p-4 w-[320px] text-left hover:bg-brand-navy/80 transition-colors group shadow-lg shadow-black/50"
                                >
                                    <div className="p-3 rounded-lg bg-brand-cyan/10">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-brand-cyan text-sm font-bold uppercase tracking-widest mb-1">Relatório Técnico</h4>
                                        <p className="text-white/70 text-xs font-light italic leading-snug">Conheça os dados por trás da nossa luta pela dignidade no SUS.</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-brand-cyan/50 group-hover:text-brand-cyan transition-colors" />
                                </button>
                            )}
                            <h3 className="font-display text-9xl mb-4 tracking-tighter leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                                <TitleSplit text={block.title} baseColor={block.titleColor} />
                            </h3>
                            <div className="bg-brand-navy/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
                                <p className={`font-body text-2xl leading-relaxed tracking-normal text-left text-white font-medium border-l-4 ${block.accent} pl-6`}>
                                    {block.text}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Scroll hint (first block only) ────────────────────────── */}
                {isFirst && (
                    <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-1 pointer-events-none">
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
                    </div>
                )}
            </div>
        </div>
    );
};

// =============================================================================
// MetamorphosisDesktop — main export
// =============================================================================
const MetamorphosisDesktop: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    // Track when this section enters the viewport to fade the button in and out.
    // 'start end': top of section touches bottom of viewport.
    // 'end start': bottom of section touches top of viewport.
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    // Opacity: 
    // 0.0 -> 0.05: fade in as section enters
    // 0.05 -> 0.9: solid during section
    // 0.9 -> 0.95: fade out as section leaves
    const buttonOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 0.95], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative w-full bg-black">

            {/* ── Guarded Cyan Button ───────────────────────────────────────────
                fixed top-4 right-6 — aligns vertically with DonationPillHeader pill.
                Opacity strictly controlled by scrollYProgress to prevent Hero bleeding.
            ──────────────────────────────────────────────────────────────────── */}
            <motion.div
                style={{ opacity: buttonOpacity }}
                className="fixed top-4 right-6 z-[145] pointer-events-auto"
            >
                <DonationButton variant="cyan" />
            </motion.div>

            {/* ── 6 autonomous agile blocks (150vh × 6 = 900vh total) ──────── */}
            {BLOCKS.map((block, idx) => (
                <ImageBlock
                    key={block.src}
                    block={block}
                    isFirst={idx === 0}
                />
            ))}
        </section>
    );
};

export default MetamorphosisDesktop;
