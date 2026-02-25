'use client';

// =============================================================================
// MetamorphosisDesktop.tsx — V25.0 (Hero-Style Natural Zoom)
// Pattern: identical to Hero.tsx GSAP scrub — continuous scale 1→1.12
//          across the entire block height, no locking, no snap.
// 6 blocks × 600vh = 3600vh total.
// DonationButton: fixed top-4 right-6, z-[145] — aligns with DonationPillHeader pill.
// INDEPENDENT — changes here NEVER affect MetamorphosisMobile.tsx
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
        label: 'Física',
        accent: 'border-red-500/60',
        textColor: 'text-white/70',
        text: "Em Divinópolis, as mortes por câncer cresceram 54% na última década. O sistema ignora a dor de quem não pode esperar.",
    },
    {
        src: '/assets/brand/donation/seccion-2/Sec_1_Color.png',
        alt: 'Física — esperança',
        label: 'Física',
        accent: 'border-brand-cyan/60',
        textColor: 'text-brand-cyan',
        text: "O Instituto oferece alívio integral. Com Ozonioterapia e terapias especializadas, garantimos que a dignidade vença a dor física.",
    },
    {
        src: '/assets/brand/donation/seccion-2/Sec_2_BN.png',
        alt: 'Social — realidade',
        label: 'Social',
        accent: 'border-red-500/60',
        textColor: 'text-white/70',
        text: "Minas Gerais possui apenas 71 leitos paliativos para 21 milhões de pessoas. O abandono institucional é a regra nos desertos assistenciais.",
    },
    {
        src: '/assets/brand/donation/seccion-2/cambiarescena.png',
        alt: 'Social — esperança',
        label: 'Social',
        accent: 'border-brand-cyan/60',
        textColor: 'text-brand-cyan',
        text: "Somos uma Comunidade Paliativista. Mais de 370 pessoas já foram resgatadas do isolamento para um ambiente de amor e presença ativa.",
    },
    {
        src: '/assets/brand/donation/seccion-2/Sec_3_BN.png',
        alt: 'Jurídica — realidade',
        label: 'Jurídica',
        accent: 'border-red-500/60',
        textColor: 'text-white/70',
        text: "A burocracia e o descaso bloqueiam o acesso a remédios vitais. Pacientes terminais são tratados como números em processos lentos.",
    },
    {
        src: '/assets/brand/donation/seccion-2/Sec_3_Color.png',
        alt: 'Jurídica — esperança',
        label: 'Jurídica',
        accent: 'border-brand-cyan/60',
        textColor: 'text-brand-cyan',
        text: "Justiça que cura. Já asseguramos R$ 384.000 em bloqueios judiciais para garantir medicamentos de alto custo e dignidade.",
        showReport: true,
    },
];

// ─── ImageBlock ───────────────────────────────────────────────────────────────
// Mirrors Hero.tsx's GSAP scrub pattern:
//   scale: 1.0 → 1.12, continuous across the full block height (scrub=true equivalent).
//   yPercent: 0 → 5  (very subtle vertical drift, same as Hero).
// The image wrapper has overflow-hidden so the zoom never bleeds out.
const ImageBlock = ({
    block,
    isFirst,
}: {
    block: typeof BLOCKS[0];
    isFirst?: boolean;
}) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const { openReport } = useView();

    // Tracks exact scroll position relative to this block
    const { scrollYProgress } = useScroll({
        target: blockRef,
        offset: ['start start', 'end end'], // 0 = block top at viewport top; 1 = block bottom at viewport bottom
    });

    // Continuous zoom: 1.0 → 1.12 across the FULL block (no flat zone — mirrors Hero scrub)
    const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);
    // Subtle vertical drift (identical to Hero yPercent: 5)
    const yPercent = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
    // Text & overlay fade out gently as the block exits
    const textOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

    return (
        <div ref={blockRef} className="relative h-[600vh]">
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* ── Zooming image (Hero-style: continuous scale 1→1.12 + 5% y drift) ── */}
                <motion.img
                    src={block.src}
                    alt={block.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center origin-center"
                    style={{
                        scale,
                        y: yPercent,
                    }}
                    loading={isFirst ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={isFirst ? 'high' : 'auto'}
                />

                {/* ── Gradient vignette ──────────────────────────────────────── */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10 pointer-events-none" />

                {/* ── Text card ─────────────────────────────────────────────── */}
                <motion.div
                    className="absolute bottom-[8%] left-[5%] z-20 max-w-[520px]"
                    style={{ opacity: textOpacity }}
                >
                    {/* Label */}
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-3">
                        {block.label}
                    </p>

                    {/* Description */}
                    <div className={`border-l-4 ${block.accent} pl-6`}>
                        <p className={`font-body text-2xl md:text-3xl leading-relaxed font-light text-white`}>
                            {block.text}
                        </p>
                    </div>

                    {/* Relatório button — Jurídica hope card only */}
                    {block.showReport && (
                        <button
                            onClick={openReport}
                            className="mt-8 flex items-center gap-4 bg-brand-navy/60 backdrop-blur-md border border-brand-cyan/30 rounded-xl p-4 w-[320px] text-left hover:bg-brand-navy/80 transition-colors group shadow-lg shadow-black/50 pointer-events-auto"
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
                </motion.div>

                {/* ── Scroll hint (first block only) ────────────────────────── */}
                {isFirst && (
                    <motion.div
                        className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-1 pointer-events-none"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
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
        <section className="relative w-full bg-black">

            {/* ── Fixed Cyan Button ─────────────────────────────────────────────
                fixed top-4 right-6 — aligns vertically with DonationPillHeader pill.
                z-[145]: above block images (z-10/20), below pill header (z-150).
            ──────────────────────────────────────────────────────────────────── */}
            <div className="fixed top-4 right-6 z-[145] pointer-events-auto">
                <DonationButton variant="cyan" />
            </div>

            {/* ── 6 autonomous image blocks (600vh × 6 = 3600vh total) ──────── */}
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
