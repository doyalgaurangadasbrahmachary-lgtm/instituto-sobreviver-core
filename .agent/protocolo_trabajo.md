# Protocolo de Trabajo "Agente"

Este protocolo define el flujo de trabajo estándar para la implementación de nuevas funcionalidades en el proyecto.

## Flujo de Implementación

### Paso 1: Definición de Tokens (CSS Layer)
*   Antes de escribir React, definir variables y tokens necesarios en el bloque `@theme` del CSS principal.
*   Asegurar disponibilidad de colores (OKLCH) y espaciados.

### Paso 2: Construcción de Datos (Server Layer)
*   Crear Server Components para la obtención de datos.
*   Definir Server Functions (`'use server'`) para cualquier mutación de datos requerida.

### Paso 3: Implementación de UI (React Layer)
*   **Esqueleto:** Usar Server Components para la estructura estática.
*   **Interactividad:** Islas de Client Components estrictamente donde sea necesario.
*   **Formularios:** Conectar Server Functions usando `action={serverFn}` o `useActionState`.

### Paso 4: Capa "Awwwards" (Animación)
*   **Micro-interacciones:** Usar `<AnimatePresence>` de Framer Motion.
*   **Narrativa de Scroll:** Implementar GSAP ScrollTrigger con `useGSAP`.

### Paso 5: Despliegue y Verificación
*   Verificar que el **React Compiler** esté activo (badge "Memo ✨" en DevTools).
*   Probar en navegadores móviles para validar toques y gestos.

## Integración con Protocolo de Reportes
Si la tarea es una auditoría o análisis, seguir estrictamente `rules/REPORT_ONLY_PROTOCOL.md`:
*   **Fase 1:** Solo diagnóstico/plan.
*   **Fase 2:** Ejecución solo tras aprobación explícita en el chat por el usuario.
tu idioma de respuesta es siempre el español de latinoamerica.
