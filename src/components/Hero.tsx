'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import DonationButton from './ui/DonationButton';
import SmartDonationButton from './ui/SmartDonationButton';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollToPlugin);

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    // wrapperRef removed, simplified logic

    const [showButton, setShowButton] = useState(true);


    // Removed handleScrollToDonation - Using Modal instead

    // Manual Scroll Listener for Visibility (Robust & Simple)
    useEffect(() => {
        const handleScroll = () => {
            const donationSection = document.getElementById('donation-section');
            const metamorphosisSection = document.getElementById('reality-metamorphosis');

            let shouldHide = false;

            // 1. Ocultar si estamos cerca del Footer (Donation Section)
            if (donationSection) {
                const rect = donationSection.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    shouldHide = true;
                }
            }

            // 2. Ocultar si estamos dentro de Reality Metamorphosis
            if (metamorphosisSection) {
                const rect = metamorphosisSection.getBoundingClientRect();
                // Si la sección está visible en el viewport (cualquier parte)
                // Usamos un buffer de 100px para suavizar la transición
                if (rect.top < window.innerHeight - 50 && rect.bottom > 50) {
                    shouldHide = true;
                }
            }

            setShowButton(!shouldHide);
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();

        if (logoRef.current) {
            // Animar el Logo (Fade In + Scale + Color Reveal)
            tl.fromTo(
                logoRef.current,
                { opacity: 0, scale: 0.8, filter: "brightness(15%) grayscale(100%)" },
                {
                    opacity: 1,
                    scale: 1,
                    filter: "brightness(100%) grayscale(0%)",
                    duration: 3.5,
                    ease: 'power2.inOut'
                }
            );

            // Animación Loop del Logo (Latido Constante)
            gsap.to(logoRef.current, {
                scale: 1.05,
                repeat: -1,
                yoyo: true,
                duration: 1.2,
                ease: "power1.inOut",
                delay: 3.5 // Esperar a que termine la intro
            });
        }



        // Animar Fondo (Intro Dramática: Oscuridad Parcial -> Color)
        if (bgRef.current) {
            gsap.fromTo(bgRef.current,
                { filter: "brightness(15%) grayscale(100%)" }, // Inicia al 15% de luz (no negro total)
                { filter: "brightness(100%) grayscale(0%)", duration: 3.5, ease: "power2.inOut" }
            );
        }

        // ScrollTrigger Fondo (Zoom Exit - Sin oscurecer)
        if (bgRef.current && containerRef.current) {
            gsap.to(bgRef.current, {
                scale: 1.35, // Zoom más pronunciado (More marked zoom)
                yPercent: 5,
                // filter eliminada: Ya no oscurece al bajar
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-brand-navy">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <picture>
                    <source media="(max-width: 767px)" srcSet="/assets/brand/donation/donacionhero.png" />
                    <source media="(min-width: 768px)" srcSet="/assets/brand/donation/hero-setion.png" />
                    <img
                        ref={bgRef}
                        src="/assets/brand/donation/hero-setion.png" // Fallback fallback PC
                        alt="Background Muro Verde"
                        // Eliminada la escala para evitar bordes azules
                        className="h-full w-full object-cover object-center origin-center"
                    />
                </picture>
                {/* Overlay sutil para garantizar lectura si el fondo es claro, pero muy ligero */}
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Contenedor */}
            <div className="relative z-10 w-full h-full container mx-auto pointer-events-none">

                {/* Logo Centrado (Móvil) +7% y Top Z-index / Derecha (PC) -15% */}
                <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 md:left-auto md:right-6 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 pointer-events-auto z-[100]">
                    <img
                        ref={logoRef}
                        src="/assets/brand/donation/logo.png"
                        alt="Instituto Sobre'Viver Logo"
                        className="w-[300px] md:w-[29.75rem] drop-shadow-2xl"
                    />
                </div>
            </div>



            {/* Capa de Degradado Inferior Súper Tenue (Exclusivo Móvil - anclado al Hero) */}
            <div
                className={`absolute md:hidden bottom-0 left-0 w-full h-[22rem] bg-gradient-to-t from-purple-900/30 via-purple-900/5 to-transparent z-30 pointer-events-none transition-all duration-500 ${showButton ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* CTA Móvil (Selector Abajo Centrado) */}
            <div
                className={`fixed md:hidden bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto transition-all duration-500 w-full max-w-[340px] px-6 flex flex-col items-center gap-4 ${showButton ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            >
                {/* Botón Selector de Método (Pix, Transferencia) con el tamaño del azul */}
                <SmartDonationButton enableTooltip={true} className="w-full flex justify-center [&>button]:w-full [&>button]:justify-center" />
            </div>

            {/* CTA PC (Tradicional Abajo Derecha) */}
            <div
                className={`hidden md:block fixed bottom-6 right-6 z-40 pointer-events-auto transition-all duration-500 transform ${showButton ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            >
                <DonationButton variant="yellow" />
            </div>
        </div>
    );
};

export default Hero;
