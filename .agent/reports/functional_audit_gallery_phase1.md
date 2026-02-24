# Auditoría de Funcionalidad: Galería Interactiva (Fase 1)

**Componente Objetivo:** `src/components/HumanImpactGallery.tsx`
**Estado Actual:** Grid estático con hover simple.
**Objetivo:** Evolucionar hacia una experiencia inmersiva (Lightbox con Narrativa).

## 1. Lógica de Pantalla Completa (Lightbox)

### Estrategia Técnica: Layout Animation (Framer Motion)
Para asegurar una transición fluida sin romper el layout, la mejor estrategia es **Shared Layout Animation** (`layoutId`):

-   **Mecánica:**
    1.  Al hacer clic, el item del grid no se "mueve", sino que un **nuevo componente Overlay** (con el mismo `layoutId`) se renderiza *encima* del contenido.
    2.  `AnimatePresence` gestionará la entrada/salida del Overlay.
    3.  El `layoutId` compartido permite a Framer Motion interpolar automáticamente la posición y tamaño desde la miniatura hasta la pantalla completa.

### Portal vs Overlay
-   **Recomendación:** **React Portal** (`createPortal`).
-   **Justificación:**
    -   **Accesibilidad:** Evita conflictos de `z-index` con el header sticky o el botón de donación flotante.
    -   **Contexto de Apilamiento:** Garantiza que el Lightbox cubra *realmente* toda la viewport, independientemente de los contenedores padres (`section`, `main`) que puedan tener `overflow: hidden` o transformaciones CSS.

## 2. Interfaz de Títulos Sugerentes (Captions)

### Ubicación y Diseño
-   **Propuesta:** **Barra Inferior Flotante (Bottom Bar) con Backdrop Blur**.
-   **Estilo Visual (Tailwind v4.1):**
    -   Contenedor: `absolute bottom-8 left-0 w-full flex justify-center`
    -   Caja de Texto: `bg-brand-navy/60 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 shadow-2xl`
    -   Tipografía: `text-white font-display text-xl tracking-wide`
    -   Legibilidad: `drop-shadow-lg` o `text-shadow-sm` para asegurar contraste sobre fotos claras.

### Justificación
Colocar el texto en una "cápsula" flotante inferior mantiene el foco en la imagen (centro) y eleva la percepción de calidad ("premium/museo"), evitando bloquear el rostro de los protagonistas.

## 3. Propuesta de Narrativa (Placeholders)

A continuación, 5 opciones de textos breves que conectan la imagen con la misión institucional:
1.  *"Donde el sistema abandona, nosotros abrazamos."*
2.  *"La dignidad no espera: recuperando el valor de cada instante."*
3.  *"Más que medicina: presencia, consuelo y humanidad."*
4.  *"Transformando el aislamiento en comunidad y afecto."*
5.  *"Tu apoyo reescribe el final de esta historia con amor."*

Estos textos servirán de base para que el Director asigne el copy final a cada imagen específica.
