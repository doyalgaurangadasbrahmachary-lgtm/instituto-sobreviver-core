import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const RibbonTitle = () => {
    return (
        <div className="relative inline-block mb-4">
            <motion.h2
                className="text-4xl font-bold relative z-0"
                initial={{ color: "#003366" }}
                whileInView={{
                    color: "#00BFFF",
                    scale: 1.15,
                    transition: { delay: 1.8, duration: 0.5, ease: "backOut" }
                }}
                viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            >
                Nosso Impacto
            </motion.h2>

            <motion.div
                className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{
                    clipPath: ["inset(0 100% 0 0)", "inset(0 0 0 0)", "inset(0 0 0 100%)"],
                    transition: { duration: 1.8, ease: "easeInOut" }
                }}
                viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00BFFF] to-[#00BFFF] opacity-90"></div>
                <h2 className="text-4xl font-bold text-white relative z-20">
                    Nosso Impacto
                </h2>
            </motion.div>
        </div>
    );
};

export default function HomeBentoGrid() {
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const items = [
        {
            id: 1,
            image: "/assets/brand/home/seccion2.1.png",
            title: "IMPACTO SOCIAL SUPERIOR R$145 MIL COM SERVIÇOS PALIATIVOS",
            subtitle: "21 Pacientes ativos mensalmente",
            description: "Recebendo cuidados integrais e atenção multidisciplinar personalizada.",
        },
        {
            id: 2,
            image: "/assets/brand/home/seccion2.2.png",
            title: "BLOQUEIO JUDICIAL DE R$384 MIL PARA TRATAMENTOS DE PACIENTES TERMINAIS",
            subtitle: "370+ Pessoas Atendidas",
            description: "Nos últimos dois anos, oferecendo suporte contínuo e humano.",
        }
    ];

    return (
        <section id="impacto" className="py-24 bg-[#f8f7f4]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 flex flex-col items-center">
                    <RibbonTitle />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 2.0, duration: 0.8 }}
                        className="text-xl text-azure-deep/70 max-w-2xl mx-auto font-light"
                    >
                        Transformando realidades através do cuidado integral.
                    </motion.p>
                </div>

                <div className="flex flex-col gap-16">
                    {items.map((item, index) => {
                        const isActive = activeCardId === item.id;
                        return (
                            <motion.div
                                key={item.id}
                                onMouseEnter={!isMobile ? () => setActiveCardId(item.id) : undefined}
                                onMouseLeave={!isMobile ? () => setActiveCardId(null) : undefined}
                                onTouchStart={isMobile ? () => setActiveCardId(item.id) : undefined}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="flex flex-col md:flex-row items-center gap-8 md:gap-16 group select-none [-webkit-touch-callout:none] touch-pan-y"
                            >
                                {/* Image Container */}
                                <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                                    <motion.div
                                        className="relative w-full h-full"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 1.05 }}
                                        animate={isActive ? { scale: 1.05 } : undefined}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 group-active:grayscale-0'}`}
                                            loading="lazy"
                                            decoding="async"
                                            width={800}
                                            height={600}
                                        />
                                    </motion.div>
                                </div>

                                {/* Text Content Card */}
                                <motion.div
                                    className={`w-full md:w-1/2 p-8 bg-white rounded-3xl shadow-xl border border-white/50 relative overflow-hidden group/card ${isActive ? 'shadow-2xl' : ''}`}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ y: -5, scale: 1.02 }}
                                    animate={isActive ? { y: -5, scale: 1.02 } : undefined}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="flex flex-col items-start text-left space-y-4 relative z-10">
                                        <h3 className="text-2xl md:text-3xl font-black text-azure-vibrant leading-tight uppercase tracking-tight drop-shadow-sm">
                                            {item.title}
                                        </h3>
                                        <div className="w-20 h-1.5 bg-gradient-to-r from-azure-vibrant to-azure-deep/20 rounded-full opacity-50"></div>
                                        <h4 className="text-xl font-bold text-azure-deep">
                                            {item.subtitle}
                                        </h4>
                                        <p className="text-lg text-azure-deep/80 leading-relaxed font-normal">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 pointer-events-none transform -translate-x-full transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 translate-x-full' : 'opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-full'}`}></div>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
