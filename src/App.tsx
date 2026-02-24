// @ts-expect-error — Activity is a React 19 experimental API (exists at runtime, not in TS defs)
import { Activity } from 'react';
import { useEffect } from 'react';
import RealityMetamorphosis from './components/RealityMetamorphosis';
import Programs from './components/Programs';
import HumanImpactGallery from './components/HumanImpactGallery';
import { DonationProvider } from './context/DonationContext';
import './styles/theme.css';

import { ViewProvider, useView } from './context/ViewContext';
import ImperativoDignidade from './components/imperativo/ImperativoDignidade';
import Hero from './components/Hero';
import DonationModal from './components/DonationModal';

// Home Components (converted from Next.js)
import HomeHeader from './components/home/HomeHeader';
import HomeHero from './components/home/HomeHero';
import HomeBentoGrid from './components/home/HomeBentoGrid';
import HomeServices from './components/home/HomeServices';
import HomeFooter from './components/home/HomeFooter';

const AppContent = () => {
    const { view, setView, isReportOpen, closeReport } = useView();

    // Scroll reset on every view change
    useEffect(() => {
        // Only reset scroll when switching MAIN views (home <-> donation)
        // Report overlay does not trigger this.
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [view]);

    return (
        <main className="bg-brand-cream text-brand-navy min-h-screen relative">
            {/* === VISTA HOME: display:none cuando no está activa === */}
            <Activity mode={view === 'home' ? 'visible' : 'hidden'}>
                <div className="font-outfit">
                    <HomeHeader />
                    <HomeHero />
                    <HomeBentoGrid />
                    <HomeServices />
                </div>

                <div className="font-outfit">
                    <HomeFooter />
                </div>
            </Activity>

            {/* === VISTA DONATION: 100% viewport, portal completo === */}
            <Activity mode={view === 'donation' ? 'visible' : 'hidden'}>
                {/* Floating back arrow — centered top */}
                <button
                    onClick={() => setView('home')}
                    className="fixed top-6 right-6 md:right-auto md:left-1/2 md:transform md:-translate-x-1/2 z-[100] 
                               p-3 bg-black/10 backdrop-blur-md rounded-full 
                               shadow-md hover:bg-black/20 hover:scale-110
                               transition-all duration-300 cursor-pointer
                               border border-black/15 text-gray-700 hover:text-gray-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                </button>
                <Hero />
                <RealityMetamorphosis />
                <Programs />
                <HumanImpactGallery />
            </Activity>

            {/* === REPORT OVERLAY: Rendered on top, preserving underlying scroll === */}
            {isReportOpen && (
                <div className="fixed inset-0 z-[200] overflow-y-auto bg-brand-cream animate-in fade-in duration-300">
                    <ImperativoDignidade onBack={closeReport} />
                </div>
            )}

            {/* Global Donation Modal Overlay */}
            <DonationModal />
        </main>
    );
};

function App() {
    return (
        <DonationProvider>
            <ViewProvider>
                <AppContent />
            </ViewProvider>
        </DonationProvider>
    )
}

export default App
