import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface HomeQuemSomosModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HomeQuemSomosModal({ isOpen, onClose }: HomeQuemSomosModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.position = 'unset';
            document.body.style.width = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.position = 'unset';
            document.body.style.width = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4 sm:p-6"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative group bg-transparent w-full max-w-[420px] h-[85vh] max-h-[850px] shadow-2xl rounded-[32px] overflow-hidden flex flex-col"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors backdrop-blur-md shadow-lg cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="M6 6 18 18" />
                                </svg>
                            </button>

                            {/* LAYER 1: Background Wall Image */}
                            <div className="absolute top-0 left-0 w-full h-[65%] z-0">
                                <img
                                    src="/assets/brand/home/fondo_tarjeta.png"
                                    alt="Muro del Instituto"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                    style={{ objectPosition: '75% 50%' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-azure-deep"></div>
                                <motion.div
                                    className="absolute top-8 left-6 z-10"
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h2 className="text-4xl font-extrabold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-tight font-sans cursor-default">
                                        Quem somos?
                                    </h2>
                                </motion.div>
                            </div>

                            {/* LAYER 2: Blue Background */}
                            <div
                                className="absolute bottom-0 left-0 w-full bg-azure-deep z-10 rounded-t-none"
                                style={{ top: 'calc(65% - 3rem)' }}
                            >
                                <div className="absolute -top-24 left-0 w-full h-24 bg-gradient-to-t from-azure-deep to-transparent pointer-events-none"></div>
                            </div>

                            {/* LAYER 3: Scrollable Content */}
                            <div
                                className="absolute inset-0 z-30 overflow-y-auto overscroll-contain touch-pan-y [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >
                                <div className="w-full" style={{ height: 'calc(65% - 3rem)' }}></div>
                                <div className="relative px-8 pt-4 pb-6 text-white">
                                    <div className="float-right w-[150px] h-[400px] -mr-4 mt-[40px] shape-outside-box"></div>
                                    <div className="text-sm leading-relaxed font-light space-y-4">
                                        <p>
                                            Fundado por{' '}
                                            <span className="font-bold text-azure-vibrant transition-colors duration-300 cursor-pointer hover:text-[#fce7f3] hover:text-opacity-100 hover:text-pink-300" style={{ transition: 'color 0.3s' }}>
                                                Valquíria Santos
                                            </span>
                                            , em homenagem à sua filha Laura, que enfrentou 8 anos de adoecimento com dignidade, felicidade e uma força impressionante.
                                        </p>
                                        <p>
                                            Laura desafiou todas as expectativas, mostrando que o amor é mais forte que qualquer dor. O Instituto vai além de preservar sua memória; é um tributo à fé e à certeza de que o amor floresce.
                                        </p>
                                        <p>
                                            A história de Laura nos inspira a acreditar que o amor é imbatível. Conheçam mais sobre o nosso instituto e já <br /> nos siga no{' '}
                                            <motion.a
                                                href="https://instagram.com/institutosobreviver37"
                                                target="_blank"
                                                className="font-bold cursor-pointer inline-block"
                                                animate={{ color: ["#00b4d8", "#ff9ec3", "#00b4d8"] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                Instagram!
                                            </motion.a>
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* LAYER 4: Illustration */}
                            <div className="absolute bottom-[-10px] right-[-45px] w-[250px] h-[600px] z-[60] pointer-events-none filter drop-shadow-2xl">
                                <img
                                    src="/assets/brand/home/lau.png"
                                    alt="Ilustração Laura e Valquíria"
                                    className="absolute inset-0 w-full h-full object-contain object-bottom"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
