import { motion, Variants } from 'framer-motion';
import { Droplet, Heart, Scale, Sun, Home, Activity, Brain } from 'lucide-react';

const ImpactFlowSvg = () => {
    // Animaciones Framer Motion
    const drawLine: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 0.3,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    const popIn: Variants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, delay: 0.5 }
        }
    };

    const pulse: Variants = {
        animate: {
            scale: [1, 1.05, 1],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
    };

    return (
        <div className="w-full relative py-12 px-4 md:px-0">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                {/* TÍTULO IZQUIERDO (Opcional según layout, pero en ref está integrado) */}
                <div className="md:w-1/4 text-center md:text-left mb-8 md:mb-0">
                    <h3 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                        Fluxo de<br />
                        Atendimento<br />
                        <span className="text-[#34BBCE]">e Terapias</span>
                    </h3>
                </div>

                {/* GRÁFICO CENTRAL */}
                <div className="relative w-full md:w-1/2 aspect-square max-w-[500px]">
                    {/* Capa SVG para Conectores */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" style={{ overflow: 'visible' }}>
                        {/* Centro a Arriba-Izq (Física) */}
                        <motion.line x1="250" y1="250" x2="120" y2="120" stroke="#34BBCE" strokeWidth="2" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
                        {/* Centro a Arriba-Der (Emocional) */}
                        <motion.line x1="250" y1="250" x2="380" y2="120" stroke="#34BBCE" strokeWidth="2" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
                        {/* Centro a Abajo-Izq (Social) */}
                        <motion.line x1="250" y1="250" x2="120" y2="380" stroke="#34BBCE" strokeWidth="2" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
                        {/* Centro a Abajo-Der (Espiritual) */}
                        <motion.line x1="250" y1="250" x2="380" y2="380" stroke="#34BBCE" strokeWidth="2" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />

                        {/* Conector a Bloque Derecho (Texto) */}
                        <motion.line x1="290" y1="250" x2="520" y2="250" stroke="#34BBCE" strokeWidth="2" strokeDasharray="4 4" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
                        <motion.circle cx="250" cy="250" r="140" stroke="#34BBCE" strokeWidth="1" fill="transparent" opacity="0.1" />
                    </svg>

                    {/* NODO CENTRAL: PACIENTE (CASA) */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[#34BBCE] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(52,187,206,0.5)] z-20"
                        variants={popIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={pulse} animate="animate" className="bg-white p-3 rounded-full">
                            <Home className="w-8 h-8 text-[#34BBCE]" />
                        </motion.div>
                    </motion.div>
                    <div className="absolute top-[42%] left-[68%] text-white text-base font-bold leading-tight w-24">
                        Paciente em<br />seu Hogar
                    </div>

                    {/* SATÉLITES */}

                    {/* Arriba-Izq: FÍSICA - REPOSITIONED */}
                    <motion.div
                        className="absolute top-[20%] left-[24%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        variants={popIn} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
                    >
                        <div className="text-center mb-2">
                            <p className="text-[#F9F7F2] text-sm font-bold uppercase">Física</p>
                            <p className="text-gray-400 text-xs leading-tight">Ozonioterapia/<br />Fisioterapia</p>
                        </div>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-[#34BBCE] shadow-lg">
                            <Droplet className="w-8 h-8 text-[#34BBCE] fill-current" />
                        </div>
                    </motion.div>

                    {/* Arriba-Der: EMOCIONAL - REPOSITIONED */}
                    <motion.div
                        className="absolute top-[20%] left-[76%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        variants={popIn} initial="hidden" whileInView="visible" custom={2} viewport={{ once: true }}
                    >
                        <div className="text-center mb-2">
                            <p className="text-[#F9F7F2] text-sm font-bold uppercase">Emocional</p>
                            <p className="text-gray-400 text-xs leading-tight">Psicologia/<br />Reiki</p>
                        </div>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-[#34BBCE] shadow-lg">
                            <Brain className="w-8 h-8 text-[#34BBCE]" />
                            <Heart className="w-4 h-4 text-[#34BBCE] absolute bottom-4 right-4 fill-current" />
                        </div>
                    </motion.div>

                    {/* Abajo-Izq: SOCIAL/JURÍDICO */}
                    <motion.div
                        className="absolute top-[76%] left-[24%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        variants={popIn} initial="hidden" whileInView="visible" custom={3} viewport={{ once: true }}
                    >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-[#34BBCE] mb-2 shadow-lg">
                            <Scale className="w-8 h-8 text-[#34BBCE]" />
                        </div>
                        <div className="text-center">
                            <p className="text-[#F9F7F2] text-sm font-bold uppercase">Social/Jurídico</p>
                            <p className="text-gray-400 text-xs leading-tight">Garantia de direitos/<br />Medicamentos</p>
                        </div>
                    </motion.div>

                    {/* Abajo-Der: ESPIRITUAL */}
                    <motion.div
                        className="absolute top-[76%] left-[76%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        variants={popIn} initial="hidden" whileInView="visible" custom={4} viewport={{ once: true }}
                    >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-4 border-[#34BBCE] mb-2 shadow-lg">
                            <Sun className="w-8 h-8 text-[#34BBCE] fill-current" />
                        </div>
                        <div className="text-center">
                            <p className="text-[#F9F7F2] text-sm font-bold uppercase">Espiritual</p>
                            <p className="text-gray-400 text-xs leading-tight">Consolo<br />e Dignidade</p>
                        </div>
                    </motion.div>

                </div>

                {/* BLOQUE DERECHO: RESULTADO */}
                <div className="md:w-1/4 mt-8 md:mt-0 relative">
                    <motion.div
                        className="bg-[#34BBCE] p-6 rounded-r-2xl border-l-4 border-white shadow-xl relative overflow-hidden"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="absolute right-0 top-0 opacity-10">
                            <Activity className="w-24 h-24 text-white" />
                        </div>
                        <h4 className="text-[#24526E] text-4xl font-bold font-serif mb-1">R$ 145,000</h4>
                        <p className="text-white text-sm uppercase tracking-wider font-medium">de impacto social direto</p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default ImpactFlowSvg;
