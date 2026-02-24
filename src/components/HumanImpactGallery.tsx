'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const galleryImages = [
    { id: 1, src: '/assets/brand/donation/galeria/ARABESCKO -4197.jpg', alt: 'Momento de Conexão', quote: "Transformamos a dor em um laço inquebrável de amor e cuidado especializado." },
    { id: 2, src: '/assets/brand/donation/galeria/ARABESCKO -4271.jpg', alt: 'Cuidado Humanizado', quote: "Onde o sistema se cala, nossa voz ecoa com força por dignidade e respeito." },
    { id: 3, src: '/assets/brand/donation/galeria/ARABESCKO -4449.jpg', alt: 'Presença e Amor', quote: "Cada história carrega uma essência que merece ser honrada até o último suspiro." },
    { id: 4, src: '/assets/brand/donation/galeria/ARABESCKO -4455.jpg', alt: 'Comunidade Solidária', quote: "Somos a ponte sólida entre o isolamento do abandono e o calor do acolhimento." },
    { id: 5, src: '/assets/brand/donation/galeria/ARABESCKO -4475.jpg', alt: 'Esperança Viva', quote: "Nossa missão é garantir que ninguém enfrente a despedida em silêncio ou solidão." },
    { id: 6, src: '/assets/brand/donation/galeria/ARABESCKO -4477.jpg', alt: 'Apoio Integral', quote: "Justiça, para nós, é assegurar que o direito à vida inclua o direito ao conforto absoluto." },
    { id: 7, src: '/assets/brand/donation/galeria/ARABESCKO -4485.jpg', alt: 'Olhares que Curam', quote: "A força da nossa comunidade é o remédio mais eficaz contra o descaso público." },
    { id: 8, src: '/assets/brand/donation/galeria/ARABESCKO -4495.jpg', alt: 'Juntos é Melhor', quote: "Resgatamos a luz da esperança naqueles que o mundo decidiu deixar nas sombras." },
    { id: 9, src: '/assets/brand/donation/galeria/ARABESCKO -4497.jpg', alt: 'Calor Humano', quote: "O cuidado paliativo não é sobre a espera, é sobre viver cada instante com valor humano." },
    { id: 10, src: '/assets/brand/donation/galeria/ARABESCKO -4513.jpg', alt: 'Sorrisos Recuperados', quote: "Sua mão estendida é o escudo necessário contra a burocracia que fere a alma." },
    { id: 11, src: '/assets/brand/donation/galeria/ARABESCKO -4525.jpg', alt: 'Atenção com Amor', quote: "A dignidade não deve ser um privilégio, mas o alicerce de toda existência humana." },
    { id: 12, src: '/assets/brand/donation/galeria/ARABESCKO -4547.jpg', alt: 'Vida Digna', quote: "Criamos um refúgio de paz em meio à tempestade da doença e da incerteza." },
    { id: 13, src: '/assets/brand/donation/galeria/IMG_1298.PNG', alt: 'Momentos Especiais', quote: "Temos a coragem de lutar incansavelmente por quem não pode mais caminhar sozinho." },
    { id: 14, src: '/assets/brand/donation/galeria/IMG_1299.PNG', alt: 'Compartilhando Alegria', quote: "Transformamos o luto em uma luta justa, e a ausência em uma presença transformadora." },
    { id: 15, src: '/assets/brand/donation/galeria/IMG_9136.PNG', alt: 'União e Força', quote: "Onde falta a estrutura do Estado, sobra a humanidade e a dedicação da nossa rede." },
    { id: 16, src: '/assets/brand/donation/galeria/WhatsApp Image 2026-02-10 at 8.19.54 AM (1).jpeg', alt: 'Dia a Dia', quote: "Protegemos a fragilidade da vida com a força inabalável do nosso compromisso social." },
    { id: 17, src: '/assets/brand/donation/galeria/el instituto sobreviver.PNG', alt: 'Nosso Instituto', quote: "Cada gesto de apoio é uma semente de alívio plantada no coração de uma família." },
    { id: 18, src: '/assets/brand/donation/galeria/instituto sobreviver.PNG', alt: 'Equipe Comprometida', quote: "Lutamos para que o alívio da dor chegue antes de qualquer barreira ou demora estatal." },
    { id: 19, src: '/assets/brand/donation/galeria/lugar instituto.PNG', alt: 'Espaço de Luz', quote: "Somos a prova viva de que a empatia verdadeira pode vencer qualquer forma de isolamento." },
    { id: 20, src: '/assets/brand/donation/galeria/seccion2.2.png', alt: 'Impacto Real', quote: "Honramos o passado, cuidamos do presente e semeamos uma nova esperança para o futuro." },
    { id: 21, src: '/assets/brand/donation/galeria/sinnombre.png', alt: 'Histórias Reais', quote: "A justiça que buscamos incansavelmente é aquela que traz o medicamento e o abraço." },
    { id: 22, src: '/assets/brand/donation/galeria/lauraanimada.png', alt: 'Laura Animada', quote: "Ninguém fica para trás quando decidimos, como comunidade, caminhar de mãos dadas." },
];

const HumanImpactGallery: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);

    // --- TAP vs SCROLL Detection (Mobile Only) ---
    const touchStartPos = useRef<{ x: number; y: number } | null>(null);
    const TAP_THRESHOLD = 10; // px

    const handleTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touchStartPos.current = { x: t.clientX, y: t.clientY };
    };

    const handleTouchEnd = (id: number) => (e: React.TouchEvent) => {
        if (!touchStartPos.current) return;
        const t = e.changedTouches[0];
        const dx = Math.abs(t.clientX - touchStartPos.current.x);
        const dy = Math.abs(t.clientY - touchStartPos.current.y);
        touchStartPos.current = null;
        // Solo abre si el dedo no se movió (es un tap intencional)
        if (dx < TAP_THRESHOLD && dy < TAP_THRESHOLD) {
            setSelectedId(id);
        }
    };

    useGSAP(() => {
        if (!galleryRef.current) return;

        // Staggered Fade-in Animation for images - SMOOTHED for V12
        gsap.fromTo(
            galleryRef.current.children, // Targetting image wrappers
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2, // Increased from 0.8s
                stagger: 0.2, // Slightly increased for more rhythmic entry
                ease: 'expo.out', // More premium feeling ease
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%', // Earlier start for smoother lead-in
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, { scope: containerRef });

    const selectedImage = galleryImages.find(img => img.id === selectedId);

    // Navigation Logic
    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedId === null) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedId);
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedId(galleryImages[nextIndex].id);
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedId === null) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedId);
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedId(galleryImages[prevIndex].id);
    };

    // Keyboard Support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedId) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedId(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId]);

    return (
        <section ref={containerRef} className="w-full py-24 px-6 md:px-12 bg-white relative">
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <span className="text-brand-cyan font-bold tracking-widest uppercase text-sm">Nosso Impacto</span>
                <h2 className="font-display text-4xl md:text-5xl text-brand-navy font-bold mt-2">
                    Histórias de <span className="text-brand-cyan">Vida</span>
                </h2>
                <p className="mt-4 text-brand-navy/70 max-w-2xl mx-auto font-body text-lg">
                    Cada imagem captura um momento de conexão humana, onde a dor se transforma em amor e companhia.
                </p>
            </div>

            {/* Masonry Grid using Tailwind Columns */}
            <div ref={galleryRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
                {galleryImages.map((img) => (
                    <motion.div
                        key={img.id}
                        layoutId={`card-container-${img.id}`}
                        // Desktop: click abre la imagen directamente
                        onClick={() => setSelectedId(img.id)}
                        // Móvil: detecta tap vs scroll (sólo abre si no hay movimiento > 10px)
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd(img.id)}
                        className="relative group overflow-hidden rounded-2xl break-inside-avoid shadow-sm cursor-zoom-in select-none [-webkit-touch-callout:none] touch-pan-y"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <motion.img
                            layoutId={`image-${img.id}`}
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-auto object-cover transition-all duration-500 group-hover:brightness-110 group-hover:saturate-[0.8]"
                            loading="lazy"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }} // Effectively scales up when parent becomes visible (hover)
                                className="bg-white/20 p-4 rounded-full"
                            >
                                <Heart className="w-8 h-8 text-brand-white fill-current animate-pulse" />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedId && selectedImage && (
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Backdrop (Deep Black & Blur) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                        />

                        {/* Card Container (Adaptive Geometry) */}
                        <motion.div
                            layoutId={`card-container-${selectedId}`}
                            className="relative w-auto max-w-5xl h-auto max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl bg-transparent cursor-default z-20 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                layoutId={`image-${selectedId}`}
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-auto h-auto max-h-[85vh] object-contain"
                            />

                            {/* Gradient Overlay (Readability Filter - Bottom Third -> Half) */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20" />

                            {/* Navigation Buttons (Integrated & Positioned) */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 sm:left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/70 hover:text-white transition-all z-50 group border border-white/5"
                            >
                                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-4 sm:right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/70 hover:text-white transition-all z-50 group border border-white/5"
                            >
                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors z-50 border border-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Narrative Text (Synced Transition) */}
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={selectedId} // Trigger animation on change
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute bottom-6 md:bottom-12 left-0 right-0 px-8 md:px-16 text-center z-30 pointer-events-none"
                                >
                                    <p className="font-display text-xl md:text-3xl text-white tracking-wide drop-shadow-xl leading-tight md:leading-relaxed max-w-3xl mx-auto">
                                        "{selectedImage.quote}"
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default HumanImpactGallery;
