import { useState, useEffect } from 'react';
import HomeHeroDesktop from './HomeHeroDesktop';
import HomeHeroMobile from './HomeHeroMobile';

export default function HomeHero() {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Renderizado Condicional por Dispositivo
    return isMobile ? <HomeHeroMobile /> : <HomeHeroDesktop />;
}
