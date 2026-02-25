'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface DonationButtonProps {
    variant?: 'yellow' | 'cyan' | 'navy';
    className?: string;
}

const DonationButton: React.FC<DonationButtonProps> = ({ variant = 'yellow', className = '' }) => {

    // Configuración base de estilos por variante
    const variants = {
        yellow: {
            base: "animate-[pulse-yellow_3s_infinite] border-brand-yellow text-brand-yellow",
            hover: "hover:bg-brand-yellow hover:text-brand-navy hover:shadow-[0_0_20px_rgba(255,189,89,0.4)]"
        },
        cyan: {
            base: "animate-[pulse-cyan_3s_infinite] border-brand-cyan text-brand-cyan",
            hover: "hover:bg-brand-cyan hover:text-brand-navy hover:shadow-[0_0_20px_rgba(52,187,206,0.6)] hover:text-shadow-none"
        },
        navy: {
            base: "animate-[pulse-navy_3s_infinite] border-brand-navy text-brand-navy",
            hover: "hover:bg-brand-navy hover:text-white hover:shadow-[0_0_20px_rgba(36,82,110,0.4)]"
        }
    };

    const selectedVariant = variants[variant];

    return (
        <motion.a
            href="https://link.mercadopago.com.br/sobreviver"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                group flex flex-row items-center justify-center gap-3 px-6 md:px-8 py-3 
                border-2 rounded-full whitespace-nowrap
                font-bold uppercase tracking-widest text-[13px] md:text-base
                transition-all duration-300 cursor-pointer w-auto max-w-full
                hover:animate-none
                ${selectedVariant.base}
                ${selectedVariant.hover}
                ${className}
            `}
        >
            <span>Faça sua doação</span>
            <Heart
                className={`
                    w-5 h-5 fill-current transition-transform group-hover:scale-110
                `}
            />
        </motion.a>
    );
};

export default DonationButton;
