# REPORTE DE SISTEMA: AUDIT_ONLY / PHYSICS_DIAGNOSIS
**Subsistema:** Flocking Engine (Boids) - `ParticleFlow.tsx`
**Asunto:** Parámetros Físicos de Simulación Orgánica

---

## DIAGNÓSTICO DE PARÁMETROS ACTUALES

A continuación, presento el volcado (dump) exacto de las fuerzas que rigen el ecosistema actual de partículas basándome en el código fuente de `ParticleFlow.tsx`:

### 1. Fuerza de Separación (Separation Weight & Distance)
*   **Umbral de Distancia (`dist`):** `80px`
*   **Fuerza Aplicada (`force * weight`):**
    *   Fórmula: `((80 - dist) / 80) * 3`
    *   **Peso Relativo (Magnitud):** `3.0`
*   *Análisis:* La fuerza repulsiva de separación es masivamente dominante (multiplicador x3). Esto hace que las partículas luchen severamente por mantener 80 píxeles de "espacio personal". Combinado con la cantidad de nodos y los límites cerrados, este es el principal culpable del efecto de "**malla rígida**", ya que su propia repulsión empuja la estructura forzosamente hacia afuera, llenando todos los vacíos disponibles como un gas a presión constante.

### 2. Fuerza de Cohesión (Cohesion Weight)
*   **Fuerza Aplicada:**
    *   Fórmula: `(cohDx / cohDist) * 0.05`
    *   **Peso Relativo (Magnitud):** `0.05`
*   *Análisis:* El deseo de buscar el centro de masa vecino es increíblemente débil. La separación (3.0) es **60 veces más fuerte** que la cohesión (0.05). Por consecuente, el organismo no tiene el más mínimo interés en mantenerse unido como un "cuerpo" orgánico compacto o un enjambre (flock/school). Simplemente se toleran vagamente.

### 3. Fuerza de Alineación (Alignment Weight)
*   **Fuerza Aplicada:**
    *   Fórmula: `(align - this.v) * 0.05`
    *   **Peso Relativo (Magnitud):** `0.05`
*   *Análisis:* Igualmente débil (0.05). Las partículas se ven poco influenciadas por la dirección de sus vecinas, impidiendo esos cambios armónicos direccionales ("swoops" coordinados como aves en el cielo).

### 4. Manejo de Límites (Boundary Behavior)
*   **Modo Actual (Desktop):** `this.v += turnFactor` o `this.v -= turnFactor` (donde `turnFactor = 0.5`) al rebasar el margen de `50px`.
*   *Análisis:* El choque contra los límites es un **rebote elástico semi-rígido** (Bounce/Force). Al tener una fuerza de Separación (3.0) masiva, las partículas se repelen a sí mismas hacia los extremos de la pantalla donde son rechazadas bruscamente (0.5), aplastándolas contra las "paredes invisibles" y afianzando la estética estructural geométrica (la "malla") que recubre todo el contenedor y de la que no pueden escapar para fluctuar en el vacío central.

---
## CONCLUSIÓN TÉCNICA
El cardumen no se comporta como un organismo cohesivo porque la **Separación** rige tiránicamente todo el clúster. Reajustar la simulación Boids requerirá invertir polaridades: subir agresivamente la Cohesión/Alineación, bajar dramáticamente la Separación (y su radio) y, sobre todo, ablandar el límite envolvente empleando factores *Steering* o una pseudo-gravedad al centro, en vez de paredes de rebote.

*Fin del Diagnóstico.*
