'use client';

// =============================================================================
// MetamorphosisDesktop.tsx — HEXA_STACK V1.0
// 6 independent image blocks (200vh each = 1200vh total).
// Each image: 100% static for first 80% of its scroll → Farewell Zoom [0.8→1] = [1→1.15].
// Zero circle-reveal logic. Zero shared opacity. Zero cross-fade.
// Nomad cyan button: sticky top-24 h-0 sibling across all 6 blocks.
// INDEPENDENT — changes here NEVER affect MetamorphosisMobile.tsx
// =============================================================================

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DonationButton from './ui/DonationButton';

const IMAGES = [
    { src: '/assets/brand/donation/seccion-2/Sec_1_BN.png', alt: 'Física — realidade' },
    { src: '/assets/brand/donation/seccion-2/Sec_1_Color.png', alt: 'Física — esperança' },
    { src: '/assets/brand/donation/seccion-2/Sec_2_BN.png', alt: 'Social — realidade' },
    { src: '/assets/brand/donation/seccion-2/cambiarescena.png', alt: 'Social — esperança' },
    { src: '/assets/brand/donation/seccion-2/Sec_3_BN.png', alt: 'Jurídica — realidade' },
    { src: '/assets/brand/donation/seccion-2/Sec_3_Color.png', alt: 'Jurídica — esperança' },
];

// ─── ImageBlock ───────────────────────────────────────────────────────────────
// Fully autonomous unit. Owns its own useScroll and farewell zoom.
// Image is 100% visible from entry. No reveal, no colour transition.
// Zoom fires ONLY in the last 20% of the block's scroll range.
const ImageBlock = ({
    src,
    alt,
    isFirst,
}: {
    src: string;
    alt: string;
    isFirst?: boolean;
}) => {
    const blockRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: blockRef,
        offset: ['start start', 'end end'],
    });

    // S(p): static [0 → 0.8] → farewell zoom [0.8 → 1] = scale 1 → 1.15
    const scale = useTransform(scrollYProgress, [0.8, 1], [1, 1.15]);

    return (
        <div ref={blockRef} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover origin-center"
                    style={{ scale }}
                    loading={isFirst ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={isFirst ? 'high' : 'auto'}
                />
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

            {/* ── Nomad Cyan Button ─────────────────────────────────────────────
                h-0: zero layout impact.
                sticky top-24: escorts user across all 6 blocks (1200vh).
                z-[120]: above image layers, below DonationPillHeader (z-150).
            ──────────────────────────────────────────────────────────────────── */}
            <div className="sticky top-24 z-[120] h-0 pointer-events-none">
                <div className="absolute right-6 top-0 pointer-events-auto">
                    <DonationButton variant="cyan" />
                </div>
            </div>

            {/* ── 6 autonomous image blocks (200vh × 6 = 1200vh total) ──────── */}
            {IMAGES.map((img, idx) => (
                <ImageBlock
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    isFirst={idx === 0}
                />
            ))}
        </section>
    );
};

export default MetamorphosisDesktop;
