import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SmartDonationButton from '../ui/SmartDonationButton';
import ParticleFlow from '../ui/ParticleFlow';

export default function HomeFooter() {
    return (
        <motion.footer
            className="bg-azure-deep text-white py-16 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <ParticleFlow targetId="btn-home-doa" particleCount={150} />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* === MAIN GRID: Logo | Center CTA | Right Contact === */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">

                    {/* LEFT: Animated Face Logo */}
                    <motion.div
                        className="relative w-32 h-32 md:w-40 md:h-40 shrink-0"
                        animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img
                            src="/assets/brand/home/rostro logo.png"
                            alt="Instituto Sobre'Viver"
                            className="w-full h-full object-contain"
                            loading="lazy"
                            decoding="async"
                            width={160}
                            height={160}
                        />
                    </motion.div>

                    {/* CENTER: TRANSFORME VIDAS + Donation Button */}
                    <div className="flex flex-col items-center text-center gap-6 relative">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            TRANSFORME{' '}
                            <span className="text-azure-vibrant">VIDAS</span>
                        </motion.h2>

                        {/* Donation Button Component */}
                        <SmartDonationButton id="btn-home-doa" enableTooltip={false} />
                    </div>

                    {/* RIGHT: Fale Conosco + Social Links */}
                    <div className="text-center md:text-right flex flex-col items-center md:items-end space-y-4 shrink-0">
                        <motion.h3
                            className="text-3xl font-bold text-azure-vibrant"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Fale Conosco
                        </motion.h3>

                        <motion.a
                            href="https://www.google.com/maps/search/?api=1&query=Rua+Itaguara+50+Vila+Espirito+Santo+Divinopolis+MG"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-azure-vibrant text-sm md:text-base transition-colors duration-300 no-underline flex items-center justify-center md:justify-end gap-2"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <MapPin className="w-5 h-5 shrink-0" />
                            <span>Rua Itaguara, 50 - Vila Espírito Santo, Divinópolis/MG</span>
                        </motion.a>

                        <motion.div
                            className="flex flex-col gap-2 items-center md:items-end"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
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
                        </motion.div>
                    </div>
                </div>

                {/* Copyright */}
                <motion.div
                    className="mt-12 pt-8 text-center text-sm text-white/40"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p>&copy; 2026 Instituto Sobre&apos;Viver. Todos os direitos reservados.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
