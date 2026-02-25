import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const services = [
    {
        title: "Terapias integrativas",
        description: "Ozonioterapia, Acupuntura, Auriculoterapia, Reiki e Massoterapia para alívio da dor e bem-estar.",
        image: "/assets/brand/home/tarjeta1.png",
        className: "object-center"
    },
    {
        title: "Suporte profissional",
        description: "Equipe multidisciplinar com Psicologia e Suporte Jurídico para garantir direitos e saúde mental.",
        image: "/assets/brand/home/tarjeta2.png",
        className: "object-center"
    },
    {
        title: "Atividades & inclusão",
        description: "Aulas de Artes e eventos comunitários (Bazar, Feijuca) para integração social e angariação de fundos.",
        image: "/assets/brand/home/tarjeta3.png",
        className: "object-center"
    }
];


export default function HomeServices() {
    const [isMobile, setIsMobile] = useState(false);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="servicos" className="pb-24 bg-white/40">
            {/* Full Width Ribbon Header */}
            <div className="w-full mb-16 group relative cursor-default transition-all duration-500 ease-in-out py-10 shadow-lg">
                <motion.div
                    className="absolute inset-0 bg-azure-vibrant md:group-hover:bg-azure-deep transition-colors duration-500"
                    animate={isMobile ? {
                        backgroundColor: ["#24526e", "#24526e", "#34bbce", "#34bbce", "#24526e"],
                    } : {}}
                    transition={{
                        duration: 9,
                        times: [0, 0.44, 0.45, 0.99, 1],
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-azure-deep mb-2 transition-colors duration-500 group-hover:text-white md:group-hover:text-white relative">
                        <motion.span
                            animate={isMobile ? {
                                color: ["#ffffff", "#ffffff", "#24526e", "#24526e", "#ffffff"],
                            } : {}}
                            transition={{
                                duration: 9,
                                times: [0, 0.44, 0.45, 0.99, 1],
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="md:group-hover:text-white"
                        >
                            Nossos Serviços
                        </motion.span>
                    </h2>
                    <p className="text-xl text-gray-600 font-medium italic transition-colors duration-500 group-hover:text-azure-vibrant relative">
                        <motion.span
                            animate={isMobile ? {
                                color: ["#34bbce", "#34bbce", "#4b5563", "#4b5563", "#34bbce"],
                            } : {}}
                            transition={{
                                duration: 9,
                                times: [0, 0.44, 0.45, 0.99, 1],
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="md:group-hover:text-azure-vibrant"
                        >
                            &quot;Curar algumas vezes, aliviar frequentemente, confortar sempre.&quot;
                        </motion.span>
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, index) => {
                        const isActive = activeCardId === index;
                        return (
                            <div
                                key={index}
                                onMouseEnter={!isMobile ? () => setActiveCardId(index) : undefined}
                                onMouseLeave={!isMobile ? () => setActiveCardId(null) : undefined}
                                onTouchStart={isMobile ? () => setActiveCardId(index) : undefined}
                                className={`group relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full select-none [-webkit-touch-callout:none] touch-pan-y ${isActive ? 'shadow-2xl -translate-y-2' : 'hover:shadow-2xl hover:-translate-y-2'}`}
                            >
                                <div className="relative h-80 w-full overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className={`absolute inset-0 w-full h-full object-cover ${service.className} transition-all duration-700 ${isActive ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}`}
                                        loading="lazy"
                                        decoding="async"
                                        width={600}
                                        height={320}
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-azure-deep mb-3 group-hover:text-azure-vibrant transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                                <div className="h-1 bg-azure-deep w-0 group-hover:w-full transition-all duration-500" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
