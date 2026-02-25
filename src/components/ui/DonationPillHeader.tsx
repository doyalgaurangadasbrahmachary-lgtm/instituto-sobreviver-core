'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

interface DonationPillHeaderProps {
    onBack: () => void;
}

// Nav links: Home (back) | Impacto | Missão
// "Doar" removed — primary donation button covers that action

const DonationPillHeader: React.FC<DonationPillHeaderProps> = ({ onBack }) => {
    const handleNavClick = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="fixed top-4 left-0 right-0 z-[150] flex items-center justify-center px-4 pointer-events-none">
            {/* Cápsula central — Home link integrado como primer ítem */}
            <motion.nav
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="pointer-events-auto
                           flex items-center gap-1 sm:gap-2
                           bg-white/70 backdrop-blur-md
                           border border-white/60
                           rounded-full shadow-lg shadow-black/10
                           px-3 py-2"
            >
                {/* Home — volver al site */}
                <button
                    onClick={onBack}
                    aria-label="Voltar ao site"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                               text-[11px] sm:text-xs font-semibold uppercase tracking-widest
                               text-gray-600 hover:text-gray-900 hover:bg-black/8
                               transition-all duration-200 whitespace-nowrap"
                >
                    <Home className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Home</span>
                </button>

                {/* Divider */}
                <span className="w-px h-4 bg-gray-300/60 flex-shrink-0" />

                {/* Impacto → Metamorfose section */}
                <button
                    onClick={() => handleNavClick('#reality-metamorphosis')}
                    className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest
                               text-gray-600 hover:text-gray-900 hover:bg-black/8
                               transition-all duration-200 whitespace-nowrap"
                >
                    Impacto
                </button>

                {/* Missão → Programs section */}
                <button
                    onClick={() => handleNavClick('#programs')}
                    className="px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest
                               text-gray-600 hover:text-gray-900 hover:bg-black/8
                               transition-all duration-200 whitespace-nowrap"
                >
                    Missão
                </button>
            </motion.nav>
        </div>
    );
};

export default DonationPillHeader;
