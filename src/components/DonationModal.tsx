'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useDonation } from '../context/DonationContext';
import DonationForm from './DonationForm'; // Reusing the existing form

const DonationModal: React.FC = () => {
    const { isModalOpen, closeDonationModal } = useDonation();

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        onClick={closeDonationModal}
                        className="absolute inset-0 bg-[#051124]"
                    />

                    {/* Modal Content Integrado Fluido */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full h-full flex items-center justify-center p-0"
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            onClick={closeDonationModal}
                            className="absolute top-6 right-6 md:top-10 md:right-10 z-[200] p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <DonationForm isModal={true} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DonationModal;
