'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';

interface DonationPillHeaderProps {
    onBack: () => void;
}

// "Instant appearance" navigation:
// Instead of smooth scroll that visually travels the page,
// we briefly fade the page out, jump instantly to the target, then fade back in.
// This gives a clean "section switch" feel without the scroll travel.

const NAV_LINKS = [
    { label: 'Impacto', href: '#reality-metamorphosis' },
    { label: 'Missão', href: '#programs' },
    { label: 'Galeria', href: '#gallery' },
];

const DonationPillHeader: React.FC<DonationPillHeaderProps> = ({ onBack }) => {
    const [fading, setFading] = useState(false);

    const handleNavClick = useCallback((href: string) => {
        setFading(true);
        // After fade-out (150ms), jump instantly and fade back in
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) {
                el.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
            setFading(false);
        }, 150);
    }, []);

    const handleHome = useCallback(() => {
        setFading(true);
        setTimeout(() => {
            setFading(false);
            onBack();
        }, 150);
    }, [onBack]);

    return (
        <>
            {/* Fade overlay — covers the page briefly during section jump */}
            <AnimatePresence>
                {fading && (
                    <motion.div
                        key="nav-fade"
                        className="fixed inset-0 z-[140] bg-black/40 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    />
                )}
            </AnimatePresence>

            {/* Header container — pointer-events-none so underlying buttons remain clickable */}
            <div className="fixed top-4 left-0 right-0 z-[150] flex items-center justify-center px-4 pointer-events-none">
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    // pointer-events-auto ONLY on the pill itself
                    className="pointer-events-auto
                               flex items-center gap-0.5 sm:gap-1
                               bg-white/70 backdrop-blur-md
                               border border-white/50
                               rounded-full shadow-lg shadow-black/10
                               px-2 py-1.5"
                >
                    {/* Home — instant return to top / #hero-donation */}
                    <button
                        onClick={handleHome}
                        aria-label="Início"
                        title="Início"
                        className="flex items-center justify-center w-8 h-8 rounded-full
                                   text-gray-500 hover:text-gray-900 hover:bg-black/8
                                   transition-all duration-200"
                    >
                        <Home className="w-3.5 h-3.5" />
                    </button>

                    {/* Divider */}
                    <span className="w-px h-3.5 bg-gray-300/70 flex-shrink-0 mx-0.5" />

                    {NAV_LINKS.map((link, i) => (
                        <React.Fragment key={link.href}>
                            <button
                                onClick={() => handleNavClick(link.href)}
                                className="px-3 py-1.5 rounded-full
                                           text-[11px] font-semibold uppercase tracking-widest
                                           text-gray-600 hover:text-gray-900 hover:bg-black/8
                                           transition-all duration-200 whitespace-nowrap"
                            >
                                {link.label}
                            </button>
                            {/* Divider between nav links (not after last) */}
                            {i < NAV_LINKS.length - 1 && (
                                <span className="w-px h-3 bg-gray-200/80 flex-shrink-0" />
                            )}
                        </React.Fragment>
                    ))}
                </motion.nav>
            </div>
        </>
    );
};

export default DonationPillHeader;
