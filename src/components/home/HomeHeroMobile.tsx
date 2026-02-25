import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeQuemSomosModal from './HomeQuemSomosModal';

export default function HomeHeroMobile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogoLoaded, setIsLogoLoaded] = useState(false);

    // Ancla de Sincronía universal
    const globalProgress = useRef(0);

    // Refs
    const container = useRef<HTMLDivElement>(null);
    const uiContentRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const logo = logoRef.current;
        if (logo) {
            // Latido Eterno GSAP (Mantenido constante)
            gsap.to(logo, {
                scale: 1.08,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }

        const stContainer = container.current;
        const uiContent = uiContentRef.current;

        if (uiContent && stContainer && logo) {
            // Sincronía Atómica V5.5: ScrollTrigger Sensor Universal
            ScrollTrigger.create({
                trigger: stContainer,
                pin: true,
                pinSpacing: true,
                start: "top top",
                end: "+=900", // V7: Acortamiento de Latencia (Antes +=2000)
                scrub: true,
                onUpdate: (self) => {
                    globalProgress.current = self.progress;

                    // Cálculo local del UI (Reloj del 50% = 0.5 tope de visibilidad inmediata)
                    const p = Math.min(self.progress / 0.5, 1.0);

                    // Sincronía Matemática 1-a-1 sin GSAP Animations paralelas:
                    gsap.set(logo, { opacity: p });
                    gsap.set(uiContent, { y: `${p * 16}vh` });
                }
            });
        }

    }, { scope: container });

    return (
        <section ref={container} className="relative w-full h-screen overflow-hidden bg-[#FFFFFF] flex flex-col items-center justify-center">

            {/* Capa de Fase-In Inicial (Cortina Blanca Global hasta cargar imagen) */}
            <div
                className={`absolute inset-0 z-[100] bg-white transition-opacity duration-1000 ease-in-out pointer-events-none ${isLogoLoaded ? 'opacity-0' : 'opacity-100'}`}
            />

            <HomeQuemSomosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Content Container (z-20) */}
            <div className="relative z-20 w-full h-full pointer-events-none">

                {/* LOGO (Aparece justo encima del lugar final del texto, Ajustado a la Cúpula 12%) */}
                <div ref={logoRef} className="absolute left-1/2 -translate-x-1/2 w-[280px] h-auto flex flex-col justify-center items-center drop-shadow-2xl opacity-0" style={{ top: '12%' }}>
                    <img
                        src="/assets/brand/home/logo.png"
                        alt="Instituto Sobre'Viver Logo"
                        className="w-full h-auto object-contain pointer-events-auto"
                        draggable={false}
                        onLoad={() => setIsLogoLoaded(true)}
                        fetchPriority="high"
                        loading="eager"
                        decoding="sync"
                        width={280}
                        height={280}
                    />
                </div>

                {/* TEXT & CTA (Posición Ajustada: 51% para evitar solapamiento) */}
                <div ref={uiContentRef} className="absolute left-1/2 -translate-x-1/2 w-full px-6 flex flex-col items-center text-center" style={{ top: '51%', transform: 'translateY(-50%)' }}>
                    <h1 className="text-4xl font-bold text-azure-deep mb-4 drop-shadow-sm leading-tight pointer-events-auto">
                        Instituto <br />
                        Sobre&apos;Viver
                    </h1>
                    <p className="text-lg text-azure-deep/80 mb-8 leading-relaxed font-light drop-shadow-sm max-w-sm pointer-events-auto">
                        &quot;Para quem tem fé, a vida nunca acaba.&quot; <br />
                        Cuidamos de pessoas que enfrentam doenças graves, oferecendo cuidados paliativos com respeto e acolhimento.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-3 bg-azure-vibrant text-bone rounded-full font-bold text-lg hover:bg-azure-deep hover:text-white transition-all transform hover:scale-105 shadow-lg text-center cursor-pointer select-none touch-manipulation pointer-events-auto"
                    >
                        Nossa História
                    </button>
                </div>

            </div>
        </section>
    );
}
