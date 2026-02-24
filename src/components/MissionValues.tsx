'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Shield, Heart, Sun } from 'lucide-react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import DonationButton from './ui/DonationButton';

gsap.registerPlugin(ScrollTrigger, useGSAP, ScrollToPlugin);

const values = [
    {
        title: 'Humanidad',
        description: 'Cuidamos de personas, no solo de pacientes. Cada historia de vida importa y merece ser escuchada y respetada hasta el último momento.',
        icon: Sun,
    },
    {
        title: 'Dignidad',
        description: 'Defendemos el derecho a vivir sin sufrimiento innecesario. Protegemos la integridad física, emocional y espiritual de cada ser humano.',
        icon: Shield,
    },
    {
        title: 'Amor',
        description: 'El motor que impulsa cada acción. Creemos que el amor trasciende la medicina y es la herramienta más poderosa para el consuelo.',
        icon: Heart,
    },
];

const MissionValues: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);



    useGSAP(() => {
        // 1. Parallax inverso en bloque Misión
        if (missionRef.current) {
            gsap.to(missionRef.current, {
                yPercent: -10, // Se mueve ligeramente hacia arriba mientras scrolleas
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }

        // 2. Staggered Reveal de Valores
        if (valuesRef.current) {
            gsap.fromTo(
                valuesRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2, // Retraso entre cada tarjeta
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: valuesRef.current,
                        start: 'top 80%', // Inicia cuando el top del contenedor está al 80% del viewport
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative z-50 w-full py-24 px-6 md:px-12 bg-brand-cream overflow-hidden">



            // ... inside component ...

            {/* Blue CTA Button (Transición Mascara) */}
            <div className="absolute top-6 right-6 z-50 block">
                <DonationButton variant="navy" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 lg:gap-16 items-center">

                {/* Bloque Misión - Asimétrico (5 col) */}
                <div
                    ref={missionRef}
                    className="col-span-12 lg:col-span-5 bg-brand-navy text-brand-white p-12 rounded-2xl shadow-xl z-10 relative"
                >
                    <span className="block text-brand-cyan font-bold tracking-widest uppercase mb-4 text-sm">Nuestra Misión</span>
                    <h2 className="font-display text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                        Brindar cuidados paliativos <span className="text-brand-cyan">humanizados</span>.
                    </h2>
                    <p className="font-body text-lg text-white/80 leading-relaxed">
                        Nuestra misión es llevar dignidad y amor a pacientes con enfermedades graves.
                        Entendemos que curar a veces no es posible, pero aliviar y consolar es un deber siempre presente.
                    </p>
                    <div className="absolute -bottom-6 -right-6 text-9xl text-white/5 opacity-20 font-display select-none">
                        "Fe"
                    </div>
                </div>

                {/* Bloque Valores - Asimétrico (7 col) */}
                <div
                    ref={valuesRef}
                    className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {values.map((val, index) => (
                        <motion.div
                            key={val.title}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className={`bg-brand-cream p-8 rounded-xl shadow-sm border border-transparent hover:border-brand-cyan/20 transition-colors ${index === 2 ? 'md:col-span-2' : 'col-span-1'
                                }`} // El tercer valor ocupa todo el ancho en desktop
                        >
                            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <val.icon className="w-6 h-6 text-brand-navy" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">{val.title}</h3>
                            <p className="font-body text-brand-navy/70 leading-relaxed">
                                {val.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default MissionValues;
