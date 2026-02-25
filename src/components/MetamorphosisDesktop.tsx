'use client';

// =============================================================================
// MetamorphosisDesktop.tsx — V24.1 (Vertical Stack + Farewell Zoom)
// Architecture: 3 independent h-[300vh] blocks (900vh total).
// Each block has its own useScroll, sticky viewport, and per-image farewell zoom.
// Texts live outside the zoom container — zero movement during zoom.
// Cyan button: h-0 sticky nomad sibling (z-[120] < DonationPillHeader z-[150]).
// INDEPENDENT — changes here NEVER affect MetamorphosisMobile.tsx
// =============================================================================

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useView } from '../context/ViewContext';
import { FileText, ExternalLink } from 'lucide-react';
import DonationButton from './ui/DonationButton';

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

// ─── Per-block component ───────────────────────────────────────────────────────
// Each block owns its own scroll progress, spring, and farewell zoom.
// No coordination with siblings — fully independent.
const VerticalBlock = ({
    section,
    isFirst,
}: {
    section: typeof SECTIONS[0];
    isFirst?: boolean;
}) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const { openReport } = useView();

    // Scroll progress for THIS block only (0 = block enters viewport top; 1 = block exits)
    const { scrollYProgress } = useScroll({
        target: blockRef,
        offset: ['start start', 'end end'],
    });

    // Smoothed progress — drives circle reveal + text cross-fades
    const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    // ── Circle Clip-Path Reveal (B&N → Color) ───────────────────────────────
    const clipPath = useTransform(
        smooth,
        [0.3, 0.7],
        ['circle(0% at 50% 50%)', 'circle(150% at 50% 50%)'],
        { ease: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
    );

    // ── Text cross-fades ────────────────────────────────────────────────────
    const opacityCritical = useTransform(smooth, [0.3, 0.45], [1, 0]);
    const opacityHope = useTransform(smooth, [0.55, 0.7], [0, 1]);
    const scaleHope = useTransform(smooth, [0.55, 0.7], [0.95, 1]);
    const yCritical = useTransform(smooth, [0.3, 0.45], [0, -20]);
    const yHope = useTransform(smooth, [0.55, 0.7], [20, 0]);

    // ── Farewell Zoom ───────────────────────────────────────────────────────
    // [0 → 0.8] = static (scale 1), [0.8 → 1] = zoom to 1.15 on exit.
    // Applied ONLY to image wrappers — texts are in a separate layer.
    const farewellScale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 1.15]);

    // Scroll indicator opacity — first block only, fades after 25% progress
    const indicatorOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);

    return (
        <div ref={blockRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* ── Layer 0: B&N Image + Farewell Zoom ─────────────────── */}
                <motion.div
                    className="absolute inset-0 z-0 origin-center"
                    style={{ scale: farewellScale }}
                >
                    <img
                        src={section.imgBN}
                        alt={`${section.title} B&N`}
                        className="w-full h-full object-cover filter grayscale brightness-[1.15] contrast-[1.05]"
                        loading={isFirst ? 'eager' : 'lazy'}
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-brand-navy/40 mix-blend-multiply" />
                </motion.div>

                {/* ── Layer 1: Color Image + Circle Reveal + Farewell Zoom ── */}
                <motion.div
                    className="absolute inset-0 z-10 origin-center"
                    style={{ scale: farewellScale, clipPath }}
                >
                    <img
                        src={section.imgColor}
                        alt={`${section.title} Color`}
                        className="w-full h-full object-cover brightness-110 saturate-110"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay" />
                </motion.div>

                {/* ── Layer 2: Texts — NOT inside zoom, always static ──────── */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 pointer-events-none" />
                    <div className="absolute bottom-[10%] left-[6%] w-full max-w-[550px] z-10 text-left flex flex-col justify-end">

                        {/* Critical text — fades out at 30-45% */}
                        <motion.div
                            style={{ opacity: opacityCritical, y: yCritical }}
                            className="absolute bottom-0 left-0 w-full z-10"
                        >
                            <h3 className="font-display text-9xl mb-6 tracking-tighter leading-none">
                                <TitleSplit text={section.title} baseColor="text-white/40" />
                            </h3>
                            <p className="font-body text-3xl leading-relaxed tracking-normal text-left text-white border-l-4 border-red-500/50 pl-8 font-light">
                                {section.criticalText}
                            </p>
                        </motion.div>

                        {/* Hope text — fades in at 55-70% */}
                        <motion.div
                            style={{ opacity: opacityHope, y: yHope, scale: scaleHope, willChange: 'transform, opacity' }}
                            className="absolute bottom-0 left-0 w-full origin-bottom-left"
                        >
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

                {/* ── Scroll indicator (first block only) ─────────────────── */}
                {isFirst && (
                    <motion.div
                        style={{ opacity: indicatorOpacity }}
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
                )}
            </div>
        </div>
    );
};

// =============================================================================
// MetamorphosisDesktop — main export
// =============================================================================
const MetamorphosisDesktop: React.FC = () => {
    return (
        <section className="relative w-full bg-brand-navy">

            {/* ── Nomad Cyan Button ─────────────────────────────────────────────
                h-0: zero layout impact — blocks are not pushed.
                sticky top-24: sticks throughout the entire section (all 900vh).
                z-[120]: above image zoom layers, below DonationPillHeader (z-150).
                absolute right-6 top-0: button floats at viewport top-24 / right-6.
            ──────────────────────────────────────────────────────────────────── */}
            <div className="sticky top-24 z-[120] h-0 pointer-events-none">
                <div className="absolute right-6 top-0 pointer-events-auto">
                    <DonationButton variant="cyan" />
                </div>
            </div>

            {/* ── 3 independent vertical blocks (300vh × 3 = 900vh total) ──── */}
            {SECTIONS.map((section, idx) => (
                <VerticalBlock
                    key={section.id}
                    section={section}
                    isFirst={idx === 0}
                />
            ))}
        </section>
    );
};

export default MetamorphosisDesktop;
