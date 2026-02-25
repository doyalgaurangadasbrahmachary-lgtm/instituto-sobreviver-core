import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import HomeQuemSomosModal from './HomeQuemSomosModal';

export default function HomeHeroDesktop() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Refs
    const container = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // Animation Refs
    const heartbeatTween = useRef<gsap.core.Tween | null>(null);

    const { contextSafe } = useGSAP({ scope: container });

    useGSAP(() => {
        const overlay = overlayRef.current;
        const text = textRef.current;
        const logo = logoRef.current;
        if (!overlay || !text || !logo) return;

        // 1. INITIAL SETUP
        gsap.set(overlay, { opacity: 1 }); // Comienza totalmente negro
        gsap.set(logo, { opacity: 0, scale: 1, yPercent: -50 });
        gsap.set(text, { opacity: 0, x: -100, yPercent: -50 });  // Desplazado a la izquierda (-100px)

        // 2. TIMELINE INTRODUCCIÓN COORDINADA
        const introTl = gsap.timeline({
            defaults: { ease: "power2.out", duration: 2.5 }
        });

        // Inicio inmediato del latido para vitalidad instantánea
        startHeartbeat();

        // Todos inician al mismo tiempo con la etiqueta "intro", pero logo dura el doble
        introTl.to(overlay, { opacity: 0 }, "intro");
        introTl.to(logo, { opacity: 1, duration: 5.0 }, "intro");
        introTl.to(text, { x: 0, opacity: 1 }, "intro");

    }, { scope: container });

    // --- HEARTBEAT LOGIC ---
    const startHeartbeat = contextSafe(() => {
        if (heartbeatTween.current) heartbeatTween.current.kill();

        // Pulsación sutil y fluida (0.98 a 1.04) iniciada desde la carga
        heartbeatTween.current = gsap.fromTo(logoRef.current,
            { scale: 0.98 },
            {
                scale: 1.04,
                duration: 2.0,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        ).vars.tween; // Asignación de la instancia para control posterior si es necesario
    });

    // --- TEXT INTERACTION ---
    const handleTextHover = contextSafe(() => {
        // Only affects Scale, not X position (handled by Loop)
        gsap.to(textRef.current, {
            scale: 1.07,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });
    });

    const handleTextLeave = contextSafe(() => {
        gsap.to(textRef.current, {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            overwrite: "auto"
        });
    });

    return (
        <section ref={container} className="relative w-full h-screen overflow-hidden bg-bone">
            <HomeQuemSomosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Fade In Opaque Overlay */}
            <div ref={overlayRef} className="absolute inset-0 z-[100] bg-black pointer-events-none"></div>

            {/* Background Minimalista */}
            <div className="absolute inset-0 z-0 select-none bg-bone">
            </div>

            {/* 2. Content Container */}
            <div className="absolute inset-0 z-20 w-full h-full">

                {/* 3. Text & Button Area - Left Side */}
                <div
                    ref={textRef}
                    className="absolute top-1/2 left-[5%] md:left-[22%] max-w-lg flex flex-col items-start text-left z-30 will-change-transform opacity-0"
                    onMouseEnter={handleTextHover}
                    onMouseLeave={handleTextLeave}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-azure-deep mb-6 drop-shadow-sm leading-tight">
                        Instituto <br />
                        Sobre&apos;Viver
                    </h1>
                    <p className="text-xl md:text-2xl text-azure-deep/80 mb-8 leading-relaxed font-light drop-shadow-sm">
                        &quot;Para quem tem fé, a vida nunca acaba.&quot; <br />
                        Cuidamos de pessoas que enfrentam doenças graves, progressivas e sem possibilidade de cura, oferecendo cuidados paliativos com respeito, dignidade e acolhimento.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-3 bg-azure-vibrant text-bone rounded-full font-bold text-lg hover:bg-azure-deep hover:text-white transition-all transform hover:scale-105 shadow-lg text-center cursor-pointer"
                    >
                        Nossa história
                    </button>
                </div>

                {/* 4. LOGO (The Star) */}
                <div
                    ref={logoRef}
                    className="absolute top-1/2 left-[50.5%] md:left-[60.5%] w-auto h-auto flex justify-center items-center cursor-pointer z-50"
                >
                    <img
                        src="/assets/brand/home/logo.png"
                        alt="Instituto Sobre'Viver Logo"
                        className="w-[236px] md:w-[422px] h-auto object-contain drop-shadow-2xl"
                        draggable={false}
                        fetchPriority="high"
                        loading="eager"
                        decoding="sync"
                        width={422}
                        height={422}
                    />
                </div>

            </div>
        </section >
    );
}
