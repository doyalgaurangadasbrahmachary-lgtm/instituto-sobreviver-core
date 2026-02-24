# Diagnóstico de Viabilidad: Modo Ambiental (ParticleFlow - Mobile)

**Fecha de Análisis:** 22 de Febrero de 2026
**Componentes Afectados:** `ParticleFlow.tsx`

---

## 1. Análisis del Requerimiento

El Director indicó que la densidad interactiva del motor de partículas satura la interfaz en móviles (breakpoints `max-md:` / `< 768px`). Se solicita instanciar un "Modo Ambiental" (Ambient Mode), que elimine la interactividad de la fuerza de toque, reduzca su densidad global, pero expanda sus conexiones estructurales. Esta lógica no debe alterar el ecosistema de partículas ni la interactividad del puntero en PC.

La intervención exige:
1. **Cero Interacción:** Ignorar/desactivar el ratón o tacto limitando los forces del Vortex en móvil (`repelRadius = 0` o evadir la función update).
2. **Reducción del 60%:** Usar un 40% del `particleCount` recibido por prop (ej. 150 a 60).
3. **Reescalado:** 
   - `radius`: Reducir un 20%.
   - `linkDistance`: Subir a un 130%.
4. **Flujo Lento:** Bajar la velocidad base para asegurar una danza pasiva y calmada.

## 2. Diagnóstico de Viabilidad Técnica

### A. Detección Condicional (`isMobile`) - VIABLE
- **Contexto:** Actualmente `ParticleFlow` es agnóstico del dispositivo y solo lee las propiedades del container local.
- **Solución Teórica:** Podemos integrar una constante derivada de `window.innerWidth < 768` (similar al tratamiento previo en otros nodos) justo en la función `resize()`, lo que permite que el *engine* regenere sus parámetros si se rota el dispositivo o se redimensiona. También afectará el re-render por react hooks (aunque aquí es preferible pasarlo directo a la clase `Particle`).

### B. Ajuste de Motor Matemático (`class Particle`) - VIABLE
- **Contexto:** La clase nativa `Particle` inicializa parámetros rígidos sin recibir inyección de configuraciones externas específicas por punto.
- **Solución Teórica:** Extenderemos el constructor de `Particle` para aceptar el flag `isMobile` e inyectar modificadores dinámicos.
- **Implementación (Concepto):**
  - *Velocidad Base:* `(Math.random() - 0.5) * (isMobile ? 0.6 : 1.2)`
  - *Radio:* `(Math.random() * 1.5 + 0.5) * (isMobile ? 0.8 : 1)`
  - *Link Distance Threshold:* Cambiar de un rígido `32400 (180^2)` a evaluar dinámicamente `distSq < (isMobile ? 54756 : 32400)`.

### C. Desactivación Interactiva - VIABLE
- **Contexto:** En la función principal del Flocking (`animate()`), el Update procesa el repulsor. Además el `useEffect` detecta movimiento de ratón.
- **Solución Teórica:** Condicionar la inyección real del mouse o anular el repelente.
- **Implementación (Concepto):**
  Al llamar al Update en la etapa de rendering, si `isMobile` es verdadero, podemos fijar `repelRadius = 0` y la simulación sencillamente rebotará orgánicamente. El listener `handleMouseMove` evitará cálculos pesados de reubicación temporal del puntero si `isMobile` es positivo.

## 3. Conclusión de Riesgos
Esta reestructuración es **100% Viable y altamente recomendable**. Las restricciones arquitecturales propuestas no solo limpiarán la estética visual demandada por la Dirección de Arte, sino que **incrementarán brutalmente el performance base (FPS) en dispositivos móviles** (menor TTI, menor calentamiento del SOC del celular) debido a la bajada simultánea de nodos procesados O(N) y cálculos de gravedad inversa.

## ESTADO DEL SISTEMA: FASE 1 (Análisis)
> [!IMPORTANT]
> El sistema `ParticleFlow` se encuentra intacto, fluyendo al 100% en todas las plataformas. Bajo el `Protocolo de Seguridad: Solo Reportes`, confírmame con "Aprobado / Procede" para inyectar este comportamiento de Modo Ambiental en **Fase 2**.
