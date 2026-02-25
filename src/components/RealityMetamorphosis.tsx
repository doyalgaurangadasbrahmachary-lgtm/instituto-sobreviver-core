'use client';

// =============================================================================
// RealityMetamorphosis.tsx — ORCHESTRATOR ONLY
// Detects viewport and renders the correct subcomponent.
// Do NOT add logic here. Edit MetamorphosisDesktop.tsx or MetamorphosisMobile.tsx.
// =============================================================================

import React, { useState, useEffect } from 'react';
import MetamorphosisDesktop from './MetamorphosisDesktop';
import MetamorphosisMobile from './MetamorphosisMobile';

const RealityMetamorphosis: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return (
        <div id="reality-metamorphosis">
            {isMobile ? <MetamorphosisMobile /> : <MetamorphosisDesktop />}
        </div>
    );
};

export default RealityMetamorphosis;
