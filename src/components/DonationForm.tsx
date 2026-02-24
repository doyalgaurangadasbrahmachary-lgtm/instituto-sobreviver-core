import { motion, useInView, Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useRef } from 'react';
import ParticleFlow from './ui/ParticleFlow';

const DonationForm = ({ isModal = false }: { isModal?: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Determinar Wrappers: Es crucial mantener el id="donation-section" para el Flow.
    const Wrapper = isModal ? 'div' : 'section';
    const wrapperProps = isModal
        ? { id: "donation-section", className: "w-full absolute inset-0 flex items-center justify-center p-4 md:p-8" }
        : { id: "donation-section", className: "w-full py-24 px-6 bg-brand-navy flex items-center justify-center relative overflow-hidden" };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.4,
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        }
    };

    return (
        <Wrapper {...wrapperProps}>
            <ParticleFlow targetId="btn-donation-doar" particleCount={300} />
            <div className={`w-full max-w-6xl mx-auto rounded-3xl relative z-10 p-6 md:p-14`}>
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView || isModal ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10"
                >
                    {/* Bloque Izquierdo / Central (Pagamento 60%) */}
                    <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-8">

                        {/* Título */}
                        <motion.h2
                            variants={itemVariants}
                            className="font-display text-4xl md:text-5xl font-bold text-brand-cyan leading-tight drop-shadow-[0_0_15px_rgba(52,187,206,0.3)]"
                        >
                            Faça sua doação com Pix ou Cartão
                        </motion.h2>

                        {/* Botão Principal a Mercado Pago - Estética SmartDonationButton */}
                        <motion.a
                            variants={itemVariants}
                            id="btn-donation-doar"
                            href="https://link.mercadopago.com.br/sobreviver"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center justify-center gap-3 px-10 py-4 
                                       border-2 border-brand-yellow rounded-full font-bold uppercase tracking-widest text-lg md:text-xl 
                                       text-brand-yellow hover:bg-brand-yellow hover:text-brand-navy 
                                       hover:shadow-[0_0_20px_rgba(255,189,89,0.4)] hover:animate-none
                                       animate-[pulse-yellow_3s_infinite]
                                       transition-colors duration-300 md:ml-2"
                        >
                            <span>Doe Agora</span>
                            {/* Corazón alternante: amarillo base, rojo al hover */}
                            <div className="relative w-6 h-6 flex items-center justify-center">
                                <motion.span
                                    className="absolute text-xl"
                                    initial={{ opacity: 1, scale: 1 }}
                                    animate={{ opacity: [1, 0, 0, 1], scale: [1, 0.5, 0.5, 1] }}
                                    transition={{ duration: 6, times: [0, 0.2, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
                                >
                                    💛
                                </motion.span>
                                <motion.span
                                    className="absolute text-xl"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
                                    transition={{ duration: 6, times: [0, 0.2, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
                                >
                                    ❤️
                                </motion.span>
                            </div>
                        </motion.a>
                    </div>

                    {/* Bloque Derecho (Fale Conosco 40%) */}
                    <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right space-y-6 pt-8 md:pt-0 md:pl-12">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                            className="text-3xl font-bold text-azure-vibrant"
                        >
                            Fale Conosco
                        </motion.h3>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col gap-4 items-center md:items-end w-full"
                        >
                            <a
                                href="https://instagram.com/institutosobreviver37"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-medium text-white hover:text-[#ff6b9e] transition-colors duration-300 no-underline flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                Instagram
                            </a>
                            <a
                                href="https://wa.me/553797783092"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-medium text-white hover:text-[#25D366] transition-colors duration-300 no-underline flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                Whatsapp Oficial
                            </a>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Rua+Itaguara+50+Vila+Espirito+Santo+Divinopolis+MG"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-row items-center justify-center md:justify-end gap-2 text-white/80 hover:text-azure-vibrant text-sm transition-colors duration-300 no-underline whitespace-nowrap w-full"
                            >
                                <MapPin className="w-5 h-5 shrink-0" />
                                <span>Rua Itaguara, 50 - Vila Espírito Santo, Divinópolis/MG</span>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-azure-vibrant/10 rounded-full blur-3xl pointer-events-none" />
            </div>
        </Wrapper>
    );
};

export default DonationForm;
