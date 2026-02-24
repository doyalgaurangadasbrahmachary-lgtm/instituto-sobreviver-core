'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DonationContextType {
    isModalOpen: boolean;
    openDonationModal: () => void;
    closeDonationModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDonationModal = () => setIsModalOpen(true);
    const closeDonationModal = () => setIsModalOpen(false);

    return (
        <DonationContext.Provider value={{ isModalOpen, openDonationModal, closeDonationModal }}>
            {children}
        </DonationContext.Provider>
    );
};

export const useDonation = () => {
    const context = useContext(DonationContext);
    if (!context) {
        throw new Error('useDonation must be used within a DonationProvider');
    }
    return context;
};
