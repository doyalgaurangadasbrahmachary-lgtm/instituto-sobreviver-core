'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface DonationPillHeaderProps {
    onBack: () => void;
}

const NAV_LINKS = [
    { label: 'Início', href: '#hero-donation' },
    { label: 'Metamorfose', href: '#reality-metamorphosis' },
    { label: 'Programas', href: '#programs' },
    { label: 'Doar', href: '#donation-section' },
];

const DonationPillHeader: React.FC<DonationPillHeaderProps> = ({ onBack }) => {
    const handleNavClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="fixed top-4 left-0 right-0 z-[150] flex items-center justify-center px-4 pointer-events-none">

            {/* Botón Volver — fuera de la cápsula, esquina izquierda */}
            <motion.button
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={onBack}
                className="absolute left-4 md:left-8 pointer-events-auto
                           flex items-center gap-2 px-4 py-2 rounded-full
                           bg-black/10 backdrop-blur-sm border border-black/10
                           text-gray-700 hover:text-gray-900 hover:bg-black/20
                           transition-all duration-300 shadow-sm text-xs font-semibold uppercase tracking-widest"
                aria-label="Voltar ao site"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Voltar</span>
            </motion.button>

            {/* Cápsula central */}
            <motion.nav
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                className="pointer-events-auto
                           flex items-center gap-1 sm:gap-2
                           bg-white/70 backdrop-blur-md
                           border border-white/60
                           rounded-full shadow-lg shadow-black/10
                           px-3 py-2"
            >
                {NAV_LINKS.map((link) => (
                    <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest
                                   text-gray-600 hover:text-gray-900 hover:bg-black/8
                                   transition-all duration-200 whitespace-nowrap"
                    >
                        {link.label}
                    </button>
                ))}
            </motion.nav>
        </div>
    );
};

export default DonationPillHeader;
