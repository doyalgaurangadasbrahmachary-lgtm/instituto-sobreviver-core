# Diagnóstico de Viabilidad: Persistencia Táctil en Tarjetas (Mobile)

**Fecha de Análisis:** 22 de Febrero de 2026
**Componentes Afectados:** `Programs.tsx`, `HomeServices.tsx`

---

## 1. Análisis del Requerimiento

El Director solicitó resolver el problema de fricción táctil en la versión móvil, donde el cambio de color (B&W a color) se pierde inmediatamente al levantar el dedo. La directriz innegociable es **no alterar la experiencia en PC**, utilizando `isMobile` o media queries en JS para separar la lógica de los handlers.

La intervención propuesta exige:
1. Eliminar la reacción al levantar el dedo en Mobile (`onPointerUp`, `onMouseLeave`, `touchend`).
2. Usar un disparador rápido (`onTouchStart`) para cambiar el estado.
3. Lógica de Persistencia (Árbitro): Activar al tocar y sólo desactivar (revertir) cuando se toque _otra_ tarjeta.
4. Limpieza Visual: Remover la caja gris nativa del toque.

## 2. Diagnóstico de Viabilidad Técnica

### A. Eliminar Reacción al Levantar (Mobile Only) - VIABLE
- **Contexto:** Actualmente, los eventos `onPointerLeave` en `Programs.tsx` y `HomeServices.tsx` remueven el `activeCardId`.
- **Solución Teórica:** Condicionar la suscripción a los eventos JS mediante una variable `isMobile` (la cual ya existe en `HomeServices.tsx` y puede derivarse del media query `(pointer: coarse)` o el ancho de pantalla en `Programs.tsx`).
- **Implementación (Concepto):**
  Solo asignar `onMouseLeave={!isMobile ? () => handleLeave() : undefined}` asegura que el móvil ignore el escape del dedo.

### B. Disparador Rápido (`onTouchStart`) - VIABLE
- **Contexto:** `onPointerDown` o `onClick` sufren de la latencia estándar de retardo tap (300ms histórico, aunque mitigado) y fricciones con el scroll nativo.
- **Solución Teórica:** `onTouchStart` es ideal porque captura el touch event en el milisegundo 0 del contacto en el DOM.
- **Implementación (Concepto):**
  Desactivar `onPointerDown` en móvil y habilitar `onTouchStart`.
  ```tsx
  // PSEUDOCODIGO - Handler Switcher
  <div 
     onMouseEnter={!isMobile ? () => setActive(index) : undefined}
     onTouchStart={isMobile ? () => handleTouchPersist(index) : undefined}
  >
  ```

### C. Sistema de Persistencia (Árbitro) - VIABLE
- **Contexto:** Actualmente el seteo tiene lógica de *toggle* (`isActive ? null : index`).
- **Solución Teórica:** Reemplazar el handler del toque de forma que solo asigne el ID sin condiciones de borrado. La tarjeta se declara a sí misma "El foco central".
- **Implementación (Concepto):**
  - Cambiar en el componente padre a: `() => setActiveCardId(index)`.
  - El GSAP en `Programs.tsx` respetará el flag `isActive`. Al dejar de ser focus, hará el `.reverse()`. La tarjeta activa actual se quedará pausada al final de la linea de tiempo.

### D. Limpieza Visual (CSS `-webkit-tap-highlight-color`) - VIABLE
- **Contexto:** Un artefacto visual de Webkit en Safari y Chrome móvil.
- **Solución Teórica:** Agregar un config de tailwind arbitrario.
- **Implementación (Concepto):**
  Agregar clase `[-webkit-tap-highlight-color:transparent]` a los *Cards*.

---

## 3. Conclusión de Riesgos
El requerimiento planteado por el Director es **100% Viable Técnico y Arquitecturalmente**. Las restricciones cruzadas entre el mouse y el touch pueden resolverse inyectando la variable `isMobile` para bifurcar los Listeners del DOM React de forma limpia sin generar renders adicionales, conservando exactamente el estado actual en computadoras de escritorio.

## ESTADO DEL SISTEMA: FASE 1 (Análisis)
> [!IMPORTANT]
> Las tarjetas y la base de código están intactas. Bajo el `Protocolo de Seguridad: Solo Reportes`, aguardo tu comando directo ("Proceder con la Implementación", "Aprobado", o similar) para pasar a **Fase 2 (Ejecución)** y aplicar los cambios.
