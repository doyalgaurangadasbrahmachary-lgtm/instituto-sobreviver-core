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
import DonationPillHeader from './components/ui/DonationPillHeader';
import DonationButton from './components/ui/DonationButton';

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
                <DonationPillHeader onBack={() => setView('home')} />
                {/* Donation CTA — fixed top-right on desktop, below pill on mobile */}
                <div className="fixed z-[149] top-[72px] left-1/2 -translate-x-1/2 md:top-6 md:left-auto md:right-6 md:translate-x-0 pointer-events-auto">
                    <DonationButton variant="cyan" />
                </div>
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
