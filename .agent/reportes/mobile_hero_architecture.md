# REPORTE DE SISTEMA: AUDIT_ONLY / HERO_ARCHITECTURE
**Subsistema:** HomeHero - `HomeHero.tsx`
**Asunto:** Viabilidad de bifurcación de experiencia (Desktop vs Mobile)

---

## DIAGNÓSTICO DE ARQUITECTURA ACTUAL

He auditado el componente `HomeHero.tsx` para comprender las barreras actuales que impiden una composición natural en dispositivos móviles. Los hallazgos son:

### 1. Lógica de Orquestación (GSAP)
*   **Estado Actual:** El componente **NO** utiliza `gsap.matchMedia()`. 
*   **Problema:** Toda la orquestación cinética (el *Cinematic Loop* que mueve el texto y encoge el logo) se ejecuta uniformemente sin importar si la pantalla es de 4000px o 320px de ancho.
*   *Desviación detectada:* Las posiciones iniciales inyectadas por `gsap.set()` están *hardcodeadas* (ej. `x: 200` para empujar el texto a la derecha), lo cual en móvil físicamente arroja el elemento fuera del puerto de visión (viewport) en lugar de ocultarlo elegantemente, creando un scroll horizontal fantasma si no hubiese un `overflow-hidden` estricto.

### 2. Anclaje de Elementos (Markup y CSS)
*   **Estado Actual:** No se está utilizando un modelo de caja `flex` flexible. Tanto la caja de Texto como el Logo operan bajo **Posicionamiento Absoluto Estático**.
*   **Texto (`textRef`):** Está anclado matemáticamente usando `top-1/2` y un calculo rígido por breakpoints de Tailwind: `left-[5%] md:left-[8%]`. Su transformación en Y se soluciona vía `yPercent: -50` en GSAP.
*   **Logo (`logoRef`):** Igualmente anclado de forma absoluta: `top-1/2` y `left-[50.5%] md:left-[60.5%]`.
*   **Problema para centrar en Móvil:** Como ambos elementos dependen de coordenadas `left` que los empujan físicamente a porcentajes del lado derecho o izquierdo, es imposible apilarlos perfectamente centrados (como una columna vertical) en teléfonos móviles solo ajustando opacidades, porque físicamente el CSS absoluto impide que respeten el espacio uno del otro.

### 3. Video Background
*   **Estado Actual:** El video `<video src="/assets/brand/home/video/marmol1.mp4">` está perfectamente configurado con `w-full h-full object-cover`.
*   **Solución nativa:** Esto significa que el video ya tiene la capacidad inherente de recortarse verticalmente (crop) para rellenar la pantalla de un móvil de forma armónica sin deformarse. El problema estético actual de compresión o saturación no proviene del video, sino del Texto y el Logo compitiendo por espacio vital horizontal en una pantalla vertical.

---

## PROPUESTA DE ESTRUCTURA Y VIABILIDAD

Existen dos vías para ejecutar este Fork Lógico:

**A. Condicional de Renderizado Interno (El camino del "Componente Engordado")**
Inyectar un hook `isMobile` basado en estado/matchMedia y renderizar dos bloques JSX distintos dentro de `HomeHero.tsx`.
*   *Pros:* Mantienes un solo archivo.
*   *Contras:* Tienes que duplicar o ensuciar las referencias de GSAP (`logoRefMobile`, `textRefDesktop`), creando una maraña de animaciones `useGSAP` que evalúan qué refs existen para no fallar. El archivo pasaría de 200 líneas a ~400 de código denso.

**B. Separación por Componentes (El camino de la "Composición Limpia" - RECOMENDADO)**
Crear `HomeHeroDesktop.tsx` y `HomeHeroMobile.tsx`, y hacer que `HomeHero.tsx` sea simplemente un enrutador inteligente:
```tsx
// CONCEPTO (Layout Router)
export default function HomeHero() {
    const isMobile = useIsMobile(); // Hook personalizado
    return isMobile ? <HomeHeroMobile /> : <HomeHeroDesktop />;
}
```
*   *Pros:* 
    *   **Desktop Intacto:** El componente actual se renombra a `Desktop` y su GSAP complejo queda blindado a regresiones.
    *   **Mobile Libre:** Se crea `HomeHeroMobile.tsx` con un lienzo en blanco para apilar el Logo y el Texto de manera simple (con `flex-col`, `items-center` y `justify-center`) y una coreografía GSAP diseñada de cero para vertical.
*   *Contras:* Creación de dos archivos adicionales en el árbol.

---
## CONCLUSIÓN TÉCNICA
El anclaje absoluto y el GSAP `hardcodeado` impiden adaptar el diseño actual a móviles solo con utilidades de Tailwind (CSS). 

Se concluye que la experiencia debe **bifurcarse** arquitectónicamente. Recomiendo proceder con la Vía B (Separación por Componentes) para garantizar el control total de la orquestación en Móvil sin arriesgar la estabilidad probada de la versión Desktop.

*Fin del Diagnóstico.*
