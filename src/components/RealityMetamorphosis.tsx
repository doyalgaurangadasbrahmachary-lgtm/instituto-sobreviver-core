'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

import { useView } from '../context/ViewContext';
import { FileText, ExternalLink } from 'lucide-react';
import DonationButton from './ui/DonationButton';

// --- DATA ---
const SECTIONS = [
    {
        id: 'fisica',
        title: 'Física',
        imgBN: { desktop: '/assets/brand/donation/seccion-2/Sec_1_BN.png', mobile: '/assets/brand/donation/metamorfosis-movil/1.1.png' },
        imgColor: { desktop: '/assets/brand/donation/seccion-2/Sec_1_Color.png', mobile: '/assets/brand/donation/metamorfosis-movil/1.2.png' },
        criticalText: "Em Divinópolis, as mortes por câncer cresceram 54% na última década. O sistema ignora a dor de quem não pode esperar.",
        hopeText: "O Instituto oferece alívio integral. Com Ozonioterapia e terapias especializadas, garantimos que a dignidade vença a dor física."
    },
    {
        id: 'social',
        title: 'Social',
        imgBN: { desktop: '/assets/brand/donation/seccion-2/Sec_2_BN.png', mobile: '/assets/brand/donation/metamorfosis-movil/2.1.png' },
        imgColor: { desktop: '/assets/brand/donation/seccion-2/cambiarescena.png', mobile: '/assets/brand/donation/metamorfosis-movil/2.2.png' },
        criticalText: "Minas Gerais possui apenas 71 leitos paliativos para 21 milhões de pessoas. O abandono institucional é a regra nos desertos assistenciais.",
        hopeText: "Somos uma Comunidade Paliativista. Mais de 370 pessoas já foram resgatadas do isolamento para um ambiente de amor e presença ativa."
    },
    {
        id: 'juridica',
        title: 'Jurídica',
        imgBN: { desktop: '/assets/brand/donation/seccion-2/Sec_3_BN.png', mobile: '/assets/brand/donation/metamorfosis-movil/3.1.png' },
        imgColor: { desktop: '/assets/brand/donation/seccion-2/Sec_3_Color.png', mobile: '/assets/brand/donation/metamorfosis-movil/3.2.png' },
        criticalText: "A burocracia e o descaso bloqueiam o acesso a remédios vitais. Pacientes terminais são tratados como números em procesos lentos.",
        hopeText: "Justiça que cura. Já asseguramos R$ 384.000 em bloqueios judiciais para garantir medicamentos de alto custo e dignidade."
    }
];

// =============================================================================
// DESKTOP: MetamorphosisSlide — efecto visual (SIN CAMBIOS respecto al original)
// =============================================================================

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
            {/* Fondo B&N */}
            <div className="absolute inset-0 z-0">
                <picture>
                    <source media="(max-width: 767px)" srcSet={section.imgBN.mobile} />
                    <source media="(min-width: 768px)" srcSet={section.imgBN.desktop} />
                    <motion.img
                        src={section.imgBN.desktop}
                        alt={`${section.title} B&N`}
                        className="w-full h-full object-cover filter grayscale brightness-[1.15] contrast-[1.05]"
                    />
                </picture>
                <div className="absolute inset-0 bg-brand-navy/40 mix-blend-multiply" />
            </div>

            {/* Capa Color (clip-path) */}
            <motion.div className="absolute inset-0 z-10" style={{ clipPath }}>
                <picture>
                    <source media="(max-width: 767px)" srcSet={section.imgColor.mobile} />
                    <source media="(min-width: 768px)" srcSet={section.imgColor.desktop} />
                    <img
                        src={section.imgColor.desktop}
                        alt={`${section.title} Color`}
                        className="w-full h-full object-cover brightness-110 saturate-110"
                        loading="lazy"
                        decoding="async"
                    />
                </picture>
                <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay" />
            </motion.div>

            {/* Textos */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0 pointer-events-none" />
                <div className="absolute bottom-[12%] md:bottom-[10%] left-[6%] w-[88%] md:w-full max-w-[550px] z-10 text-left flex flex-col justify-end">
                    <motion.div style={{ opacity: opacityCritical, y: yCritical }} className="absolute bottom-0 left-0 w-full z-10">
                        <h3 className="font-display text-6xl md:text-9xl font-bold mb-4 md:mb-6 text-white md:text-white/40 tracking-tighter leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] md:drop-shadow-none">
                            {section.title}
                        </h3>
                        <p className="font-body text-lg md:text-3xl leading-relaxed text-white border-l-4 border-red-500/50 pl-6 md:pl-8 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            {section.criticalText}
                        </p>
                    </motion.div>

                    <motion.div style={{ opacity: opacityHope, y: yHope, scale: scaleHope, willChange: "transform, opacity" }} className="absolute bottom-0 left-0 w-full origin-bottom-left">
                        {section.id === 'juridica' && (
                            <motion.button onClick={openReport} className="mb-2 md:absolute md:bottom-full md:mb-12 md:left-0 md:top-auto pointer-events-auto flex items-center gap-3 md:gap-4 bg-brand-navy/30 md:bg-brand-navy/60 backdrop-blur-sm md:backdrop-blur-md border border-brand-cyan/20 md:border-brand-cyan/30 rounded-lg md:rounded-xl p-2 md:p-4 w-[220px] md:w-[320px] text-left hover:bg-brand-navy/50 md:hover:bg-brand-navy/80 transition-colors group shadow-lg shadow-black/30 md:shadow-black/50 origin-bottom-left">
                                <div className="p-2 md:p-3 rounded-lg bg-brand-cyan/10">
                                    <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-brand-cyan text-[10px] md:text-sm font-bold uppercase tracking-wide mb-0.5 md:mb-1">Relatório Técnico</h4>
                                    <p className="text-white/70 text-[9px] md:text-xs leading-tight md:leading-snug hidden md:block">Conheça os dados por trás da nossa luta pela dignidade no SUS.</p>
                                    <p className="text-white/70 text-[9px] md:hidden leading-tight line-clamp-1">Dados da nossa luta no SUS.</p>
                                </div>
                                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-brand-cyan/50 group-hover:text-brand-cyan transition-colors" />
                            </motion.button>
                        )}
                        <h3 className="font-display text-6xl md:text-9xl font-bold mb-3 md:mb-4 text-brand-cyan tracking-tighter leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                            {section.title}
                        </h3>
                        <div className="bg-brand-navy/60 md:bg-brand-navy/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
                            <p className="font-body text-lg md:text-2xl leading-relaxed text-white font-medium border-l-4 border-brand-cyan pl-5 md:pl-6 text-shadow-sm">
                                {section.hopeText}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// =============================================================================
// DESKTOP: DesktopSlideWrapper — wrapper que aísla el useTransform de opacidad
// FIX V8.4: Este componente extrae el hook del .map() del padre, respetando las
// reglas de hooks de React (nunca condicionales, nunca dentro de loops).
// =============================================================================

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

    // ✅ Hook llamado SIEMPRE en el nivel superior de este subcomponente
    const sectionOpacity = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 1]);

    return (
        <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
                zIndex: index * 10,
                opacity: index === 0 ? 1 : sectionOpacity,
            }}
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
// MOBILE: Sticky Scroll-Stasis (V9.1) — 300vh por bloque, useScroll nativo
// Arquitectura: div contenedor 300vh + sticky h-screen + useScroll progress
// Fases narrativas: B&N(0-15%) → REPOSO(15-45%) → FadeOut(45-50%)
//                  → Color(50-85%) → REPOSO COLOR(85-100%)
// =============================================================================

const MobileMetamorphosisSection = ({ section }: { section: typeof SECTIONS[0] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { openReport } = useView();

    // Scroll progress del bloque completo (0 → 1 al recorrer los 300vh)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // ── Fase 2: Texto del problema — umbral de aparición en el 30% ──────────
    // Invisible 0→28%, entra 28→32%, reposo 32→43%, sale 43→50%
    const textOpacity = useTransform(
        scrollYProgress,
        [0.28, 0.32, 0.43, 0.50],
        [0, 1, 1, 0]
    );
    const textY = useTransform(scrollYProgress, [0.28, 0.32], [30, 0]);

    // ── Fase 3: Revelado de color via clipPath (50% → 85%) ─────────────────
    const clipPath = useTransform(
        scrollYProgress,
        [0.50, 0.85],
        ['circle(0% at 50% 50%)', 'circle(150% at 50% 50%)']
    );

    // ── Fase 4: Texto de esperanza aparece con el color (80% → 92%) ─────────
    const hopeOpacity = useTransform(scrollYProgress, [0.80, 0.92], [0, 1]);
    const hopeY = useTransform(scrollYProgress, [0.80, 0.92], [20, 0]);

    return (
        // Contenedor de 300vh — define el "tubo" de scroll de cada bloque
        <div ref={containerRef} className="relative w-full" style={{ height: '300vh' }}>

            {/* Sticky h-screen — el contenido permanece fijo mientras el usuario recorre los 300vh */}
            {/* overflow:clip en lugar de overflow:hidden — no rompe sticky ni interfiere con IntersectionObserver */}
            <div
                className="sticky top-0 w-full h-screen"
                style={{ overflow: 'clip', touchAction: 'pan-y' }}
            >
                {/* SUELO ESTÁTICO — Imagen B&N fija, sin animación, opacity 1 siempre */}
                {/* Elimina el flash blanco: nunca habrá un fotograma sin fondo */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={section.imgBN.mobile}
                        alt={`${section.title} B&N`}
                        className="w-full h-full object-cover filter grayscale brightness-[1.15] contrast-[1.05]"
                        loading="lazy"
                        decoding="async"
                        width={390}
                        height={844}
                    />
                    <div className="absolute inset-0 bg-brand-navy/40 mix-blend-multiply" />
                </div>

                {/* Fase 3 — Imagen Color (clipPath nace en 50% del scroll) */}
                <motion.div className="absolute inset-0 z-10" style={{ clipPath }}>
                    <img
                        src={section.imgColor.mobile}
                        alt={`${section.title} Color`}
                        className="w-full h-full object-cover brightness-110 saturate-110"
                        loading="lazy"
                        decoding="async"
                        width={390}
                        height={844}
                    />
                    <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay" />
                </motion.div>

                {/* Gradiente de legibilidad (siempre activo) */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute bottom-0 w-full h-[55vh] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                </div>

                {/* Fase 1-2 — Texto del PROBLEMA (criticalText): entra con B&N, sale antes del color */}
                <motion.div
                    className="absolute bottom-[10%] left-[6%] w-[88%] z-30 pointer-events-none"
                    style={{ opacity: textOpacity, y: textY }}
                >
                    <h3 className="font-display text-6xl font-bold mb-4 text-white tracking-tighter leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                        {section.title}
                    </h3>
                    <div className="bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl">
                        <p className="font-body text-base leading-relaxed text-white/90 border-l-4 border-red-400/70 pl-5">
                            {section.criticalText}
                        </p>
                    </div>
                </motion.div>

                {/* Fase 4 — Texto de ESPERANZA (hopeText): aparece con la imagen color */}
                <motion.div
                    className="absolute bottom-[10%] left-[6%] w-[88%] z-30 pointer-events-auto"
                    style={{ opacity: hopeOpacity, y: hopeY }}
                >
                    <h3 className="font-display text-6xl font-bold mb-4 text-brand-cyan tracking-tighter leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]">
                        {section.title}
                    </h3>

                    {section.id === 'juridica' && (
                        <button
                            onClick={openReport}
                            className="mb-4 flex items-center gap-3 bg-brand-navy/60 backdrop-blur-sm border border-brand-cyan/30 rounded-lg p-3 w-[220px] text-left hover:bg-brand-navy/80 transition-colors group shadow-lg shadow-black/40 pointer-events-auto"
                        >
                            <div className="p-2 rounded-lg bg-brand-cyan/10">
                                <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-brand-cyan text-[10px] font-bold uppercase tracking-wide mb-0.5">Relatório Técnico</h4>
                                <p className="text-white/70 text-[9px] leading-tight line-clamp-1">Dados da nossa luta no SUS.</p>
                            </div>
                            <ExternalLink className="w-3 h-3 text-brand-cyan/50 group-hover:text-brand-cyan transition-colors" />
                        </button>
                    )}

                    <div className="bg-brand-navy/65 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
                        <p className="font-body text-lg leading-relaxed text-white font-medium border-l-4 border-brand-cyan pl-5">
                            {section.hopeText}
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

// =============================================================================
// COMPONENTE PRINCIPAL — Bifurcación con hooks correctamente aislados
// =============================================================================

const RealityMetamorphosis: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // ✅ useScroll siempre en nivel superior (hooks invariant)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // ✅ FIX V8.5: Todos los useTransform DEBEN estar aquí, antes de cualquier
    // return condicional. Nunca dentro de un if/else o JSX inline.
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.9, 0.95], [1, 0]);

    // ─── RENDER MÓVIL (< 768px) ────────────────────────────────────────────
    if (isMobile) {
        return (
            <section id="reality-metamorphosis" className="relative w-full bg-black">
                {/* Botón CTA — Spaceless Sticky: h-0 overflow-visible no impacta el flujo del documento */}
                <div className="sticky top-4 z-[100] h-0 overflow-visible flex justify-center">
                    <div className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                        <DonationButton variant="cyan" />
                    </div>
                </div>
                {SECTIONS.map((section) => (
                    <MobileMetamorphosisSection key={section.id} section={section} />
                ))}
            </section>
        );
    }

    // ─── RENDER DESKTOP (>= 768px) — lógica original con wrapper corregido ──
    return (
        <section id="reality-metamorphosis" ref={containerRef} className="relative w-full h-[900vh] bg-brand-navy">

            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <div className="relative w-full h-full">
                    {/* ✅ FIX V8.4: useTransform vive en DesktopSlideWrapper, NO aquí */}
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

                <div className="absolute top-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:top-6 md:right-6 z-[100] block pointer-events-auto">
                    <DonationButton variant="cyan" />
                </div>

                <motion.div
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute top-[88px] left-1/2 -translate-x-1/2 md:bottom-8 md:right-8 md:top-auto md:left-auto md:translate-x-0 z-[100] flex flex-col items-center gap-1 pointer-events-none"
                >
                    <motion.p
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        className="text-brand-cyan text-[10px] md:text-xs tracking-widest uppercase drop-shadow-md"
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

export default RealityMetamorphosis;
