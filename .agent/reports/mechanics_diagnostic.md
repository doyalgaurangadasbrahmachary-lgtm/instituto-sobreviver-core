# Análisis de Mecánicas de Scroll y Transiciones

## 1. Mecanismo de Zoom en Hero
**Diagnóstico:**
El `Hero` utiliza **GSAP ScrollTrigger** con `scrub: true`.
- **Lógica:** Interpolación lineal vinculada directamente al scroll.
- **Valores:** Escala de `1` a `1.35` (y `yPercent: 5`) desde `top top` hasta `bottom top`.
- **Conclusión:** No es una animación de tiempo fijo, es 100% dependiente de la posición de la barra de desplazamiento (scrub).

## 2. Análisis de Interferencia (Metamorphosis → Programs)
**Pregunta del Director:** ¿Aplicar scale progresivo en Metamorphosis afecta el `start: 'top top'` de Programs?

**Evaluación Técnica:**
- **Calculo de Triggers:** La propiedad CSS `transform: scale()` **NO afecta el flujo del documento** (layout flow). El navegador calcula la posición `top` del contenedor `Programs` basándose en su caja original (border-box), ignorando transformaciones visuales de los elementos anteriores.
- **Resultado:** El disparador `start: 'top top'` **se mantendrá matemáticamente exacto**. No habrá desfase lógico.

**Riesgo Visual (Jumps):**
- **Sí existe riesgo visual.** Si la última diapositiva de Metamorphosis termina escalada (ej: 1.1x) justo cuando `Programs` hace contacto (`top top`), habrá un corte abrupto si `Programs` no cubre inmediatamente el contenido o si el contenido escalado "sangra" por detrás/delante de `Programs`.
- **Z-Index:** `RealityMetamorphosis` tiene `z-index` configurados. Si `Programs` no tiene un z-index superior explícito (o un contexto de apilamiento nuevo), podría haber solapamientos extraños.

## 3. Propuesta de "Aire" Visual
**Objetivo:** Transición cinematográfica (Zoom Out) antes de entrar al contenido de Programs.

**Análisis de Soluciones:**

### Opción A: Mismo Disparador (Trigger Programs)
Usar el `ScrollTrigger` de `Programs` para animar la salida de `Metamorphosis`.
- **Pros:** Sincronización perfecta.
- **Contras (Crítico):** `Metamorphosis` usa **Framer Motion** y `Programs` usa **GSAP**. Controlar el estado de un componente de Framer desde un timeline de GSAP externo es técnicamente sucio y propenso a conflictos de reactividad (fighting).

### Opción B: Buffer de Scroll (Recomendada)
Crear un espacio físico o virtual entre las secciones.

**Propuesta Técnica ("Connector Spacer"):**
1.  **Ajuste en Metamorphosis:** Reservar el último tramo de sus `900vh` (ej: los últimos `100vh`) *exclusivamente* para la animación de salida (Zoom Out / Fade).
2.  **Lógica:**
    - Del 0% al 90% del scroll: Lógica actual de diapositivas.
    - Del 90% al 100% del scroll: La última diapositiva hace la transición (Zoom Out/Blur) hacia el estado "neutro".
3.  **Resultado:** Cuando el usuario llega a `Programs`, la sección anterior ya "aterrizó" visualmente, eliminando el riesgo de saltos. `Programs` luego se pinea limpiamente.

**Veredicto:** Evitar mezclar controladores (Opción A). Implementar la transición de salida dentro de la propia lógica de `Metamorphosis` (Opción B) o mediante un pequeño componente espaciador `div` (buffer físico) si se prefiere una separación más drástica.
