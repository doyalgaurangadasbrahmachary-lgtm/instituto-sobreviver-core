import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useView } from '../../context/ViewContext';
import { useDonation } from '../../context/DonationContext';

interface SmartDonationButtonProps {
    enableTooltip?: boolean;
    className?: string;
    id?: string;
}

export default function SmartDonationButton({ enableTooltip = false, className = '', id }: SmartDonationButtonProps) {
    const { setView } = useView();
    const { openDonationModal } = useDonation();
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [_isLocked, setIsLocked] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    // Mobile Auto-Open Logic (Only if tooltip is enabled)
    useEffect(() => {
        if (!enableTooltip) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Eliminada la lógica de Auto-Open en móvil (window.innerWidth < 768)
                    // pues en móvil ahora es un botón de link directo.
                    if (!entry.isIntersecting) {
                        if (openTimerRef.current) clearTimeout(openTimerRef.current);
                        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                        setIsTooltipVisible(false);
                        setIsLocked(false);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (buttonRef.current) observer.observe(buttonRef.current);
        return () => observer.disconnect();
    }, [enableTooltip]);

    // Desktop Handlers
    const handleMouseEnterBtn = () => {
        if (enableTooltip && window.innerWidth >= 768) {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
            setIsTooltipVisible(true);
        }
    };

    const handleMouseLeaveBtn = () => {
        if (enableTooltip && window.innerWidth >= 768) {
            closeTimerRef.current = setTimeout(() => setIsTooltipVisible(false), 2000);
        }
    };

    const handleMouseEnterCard = () => {
        if (enableTooltip && window.innerWidth >= 768) {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        }
    };

    const handleMouseLeaveCard = () => {
        if (enableTooltip && window.innerWidth >= 768) setIsTooltipVisible(false);
    };

    const handleTapCard = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setIsLocked(true);
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };

    const handleTapText = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();

        if (enableTooltip) {
            if (window.innerWidth < 768) {
                // Comportamiento Exclusivo Móvil (Solo para Botón Selector del Hero de Donación):
                // Abre modal de pago sin redirigir vista y sin abrir tooltip.
                openDonationModal();
                return;
            } else {
                // Funcionalidad PC original (o tablets grandes)
                setIsTooltipVisible((prev) => !prev);
                setIsLocked(true);
                if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
            }
        }

        // Comportamiento estricto nativo para Botones del Home (Header/Footer):
        // Siempre navegaban a la ventana de donación.
        setView('donation');
    };

    // Global click close
    useEffect(() => {
        if (!enableTooltip) return;

        const handleDocClick = (e: MouseEvent | TouchEvent) => {
            const target = e.target as Node;
            if (buttonRef.current && !buttonRef.current.contains(target)) {
                setIsTooltipVisible(false);
                setIsLocked(false);
            }
        };
        document.addEventListener("touchstart", handleDocClick);
        document.addEventListener("mousedown", handleDocClick);
        return () => {
            document.removeEventListener("touchstart", handleDocClick);
            document.removeEventListener("mousedown", handleDocClick);
        };
    }, [enableTooltip]);

    // Clipboard
    const copyToClipboard = async (text: string, fieldId: string) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                throw new Error("Clipboard API unavailable");
            }
        } catch (_err) {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                textArea.setAttribute("readonly", "");
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                if (!successful) throw new Error("Fallback copy failed");
            } catch (fallbackErr) {
                console.error("Copy failed:", fallbackErr);
                return;
            }
        }
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
    };

    // Copy Button SVG Helper
    const CopyIcon = ({ fieldId }: { fieldId: string }) => (
        copiedField === fieldId ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        )
    );

    return (
        <div id={id} className={`relative group ${className}`} ref={buttonRef}>
            <motion.button
                className={`group flex items-center justify-center gap-3 px-8 py-3 border-2 rounded-full font-bold uppercase tracking-widest text-sm md:text-base transition-all duration-300 cursor-pointer overflow-hidden transform origin-center animate-[pulse-yellow_3s_infinite] border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-navy hover:shadow-[0_0_20px_rgba(255,189,89,0.4)] hover:animate-none`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={handleMouseEnterBtn}
                onMouseLeave={handleMouseLeaveBtn}
                onClick={handleTapText}
            >
                FAÇA SUA DOAÇÃO
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <motion.span
                        className="absolute text-xl"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{
                            opacity: [1, 0, 0, 1],
                            scale: [1, 0.5, 0.5, 1]
                        }}
                        transition={{
                            duration: 6,
                            times: [0, 0.2, 0.8, 1],
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        💛
                    </motion.span>
                    <motion.span
                        className="absolute text-xl"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1, 1, 0.5]
                        }}
                        transition={{
                            duration: 6,
                            times: [0, 0.2, 0.8, 1],
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ❤️
                    </motion.span>
                </div>
            </motion.button>

            {/* Smart Tooltip Card (Bank Details) */}
            <AnimatePresence>
                {enableTooltip && (
                    <div
                        className={`absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-80 bg-white text-azure-deep p-6 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 z-[9999] border border-azure-deep/5 backdrop-blur-sm transform origin-bottom ${isTooltipVisible ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-4 scale-95'}`}
                        onMouseEnter={handleMouseEnterCard}
                        onMouseLeave={handleMouseLeaveCard}
                        onClick={handleTapCard}
                    >
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-[10px] border-transparent border-t-white drop-shadow-sm"></div>

                        <div className="text-center relative z-10">
                            <h4 className="font-bold text-xl mb-3 border-b border-azure-deep/10 pb-2 text-azure-vibrant">Dados Bancários</h4>

                            <div className="space-y-3 text-sm font-medium">
                                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <span className="text-azure-deep/70">Banco</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-base">748</span>
                                        <button onClick={(e) => { e.stopPropagation(); copyToClipboard("748", "banco"); }} className="text-azure-vibrant hover:text-azure-deep transition-colors p-1" title="Copiar Banco">
                                            <CopyIcon fieldId="banco" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                    <span className="text-azure-deep/70">Cooperativa</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-base">0221</span>
                                        <button onClick={(e) => { e.stopPropagation(); copyToClipboard("0221", "coop"); }} className="text-azure-vibrant hover:text-azure-deep transition-colors p-1" title="Copiar Agência">
                                            <CopyIcon fieldId="coop" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-azure-deep/10 p-2 rounded-lg border border-azure-deep/20 hover:bg-azure-deep/20 transition-colors">
                                    <span className="text-azure-deep/80">Conta</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-lg text-azure-deep">06909-8</span>
                                        <button onClick={(e) => { e.stopPropagation(); copyToClipboard("06909-8", "conta"); }} className="text-azure-vibrant hover:text-azure-deep transition-colors p-1" title="Copiar Conta">
                                            <CopyIcon fieldId="conta" />
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-2 mt-2">
                                    <p className="text-xs uppercase tracking-wider text-azure-deep/50 mb-1">Chave Pix (CNPJ)</p>
                                    <div className="flex justify-center items-center gap-2">
                                        <p className="font-bold text-lg select-all cursor-text text-azure-deep">52.966.894/0001-72</p>
                                        <button onClick={(e) => { e.stopPropagation(); copyToClipboard("52.966.894/0001-72", "pix"); }} className="text-azure-vibrant hover:text-azure-deep transition-colors p-1" title="Copiar PIX">
                                            <CopyIcon fieldId="pix" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
