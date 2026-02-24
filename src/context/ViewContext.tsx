
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'home' | 'donation' | 'report';

interface ViewContextProps {
    view: ViewMode;
    setView: (view: ViewMode) => void;
    // Overlay State for Report
    isReportOpen: boolean;
    openReport: () => void;
    closeReport: () => void;
    // Overlay State for Donation
    isDonationOpen: boolean;
    openDonation: () => void;
    closeDonation: () => void;
}

const ViewContext = createContext<ViewContextProps | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [view, setView] = useState<ViewMode>('home');
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isDonationOpen, setIsDonationOpen] = useState(false);

    const openReport = () => setIsReportOpen(true);
    const closeReport = () => setIsReportOpen(false);

    const openDonation = () => setIsDonationOpen(true);
    const closeDonation = () => setIsDonationOpen(false);

    return (
        <ViewContext.Provider value={{
            view, setView,
            isReportOpen, openReport, closeReport,
            isDonationOpen, openDonation, closeDonation
        }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useView = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error('useView must be used within a ViewProvider');
    }
    return context;
};
