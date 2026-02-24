# Auditoría Técnica de Evolución: Galería Inmersiva (Fase 1)

**Componente Objetivo:** `src/components/HumanImpactGallery.tsx`
**Objetivo:** Expansión a Galería Inmersiva (Geometría Adaptativa, Navegación y UI Avanzada).

## 1. Geometría Adaptativa (`layoutId` + Aspect Ratio)

### Análisis de Viabilidad
Mantener la fluidez del `layoutId` mientras la imagen cambia de tamaño (aspect ratio) es técnicamente posible pero requiere **preservación de dimensiones**.

-   **Estrategia Propuesta:**
    -   El contenedor padre del Lightbox (`motion.div layoutId="card-container-{id}"`) debe tener dimensiones dinámicas pero restringidas (`max-w-5xl`, `max-h-[90vh]`).
    -   `object-fit: contain` en la imagen es insuficiente por sí solo porque el contenedor padre "salta" de tamaño.
    -   **Solución:** Usar `aspect-ratio` dinámico en el contenedor padre, calculado pre-renderizado o forzando `width: auto` y `height: auto` con restricciones máximas para que el contenedor abrace la imagen. Framer Motion interpolará automáticamente entre las dimensiones de la miniatura (`cover`) y el Lightbox (`contain`).

## 2. Capa de Texto y Degradado (Overlay Inferior)

### Implementación Tailwind v4.1
-   **Técnica:** Gradiente lineal vertical.
-   **Clases:** `bg-gradient-to-t from-black/80 via-black/40 to-transparent`.
-   **Posicionamiento:**
    -   `absolute bottom-0 left-0 w-full h-[33%] pointer-events-none`.
    -   Esto asegura que el degradado ocupe exactamente el tercio inferior, garantizando legibilidad del texto blanco sin oscurecer el centro o la parte superior de la foto (rostros).

## 3. Sistema de Navegación (Carrusel)

### Lógica de Transición (Slide vs. Pop)
-   **Reto:** `AnimatePresence` maneja bien la entrada/salida de componentes *completos*, pero cambiar el `src` de una imagen dentro del mismo componente Lightbox requiere lógica adicional para animación de deslizamiento.
-   **Estrategia de Animación (Deslizamiento Continuo):**
    -   Utilizar un componente `motion.img` con `key={selectedId}` dentro de `AnimatePresence`.
    -   Definir `variants` para dirección: entrar desde derecha (+100%) si es `next`, desde izquierda (-100%) si es `prev`.
    -   **Importante:** Desactivar temporalmente `layoutId` durante la navegación interna (slideshow) y reactivarlo solo para cerrar/abrir, o usar `crossfade`.

### Teclas de Dirección
-   **Viabilidad:** Alta y recomendada (Accesibilidad).
-   **Implementación:** `useEffect` con `window.addEventListener('keydown')` detectando `ArrowLeft` y `ArrowRight`.
-   **Lógica:**
    ```typescript
    const nextImage = () => {
        const currentIndex = images.findIndex(img => img.id === selectedId);
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedId(images[nextIndex].id);
    };
    ```

## Conclusión
La evolución es viable. El mayor desafío técnico es la transición híbrida: usar `layoutId` para abrir/cerrar (zoom) y `x-translation` para navegar entre fotos (slide). Se recomienda separar la lógica:
1.  **Entrada/Salida:** Zoom (Magic Motion).
2.  **Navegación Interna:** Slide horizontal.
