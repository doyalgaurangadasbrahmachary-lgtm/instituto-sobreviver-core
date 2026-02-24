# Reglas de Desarrollo y Arquitectura 2026

Este documento define los estándares obligatorios para el desarrollo de aplicaciones web de alto rendimiento ("Nivel Awwwards") en este proyecto.

## 1. Principios Fundamentales
*   **Reactividad Automatizada (No-Memo):** Confiamos en el **React Compiler**. No se permite el uso manual de `useMemo` o `useCallback` salvo excepciones críticas justificadas.
*   **Arquitectura CSS-First:** La configuración de diseño reside en CSS nativo (variables, `@theme`), no en configuración JS de Tailwind.
*   **Unificación Servidor-Cliente:** Lógica de datos y UI coubicada. Uso extensivo de Server Components y Server Functions.

## 2. Reglas de Codificación

### A. React 19 & Compiler
*   **Cero Memoización Manual:** Eliminar `useMemo` y `useCallback`. Dejar que el compilador optimice.
*   **Mutaciones Modernas:** Usar `useActionState` y el prop `action` en formularios. Evitar gestión manual de estados `loading`/`error`.
*   **Lectura de Datos:** Usar la API `use` para Promesas y Contextos.
*   **Refs:** Pasar `ref` como prop normal. No usar `forwardRef`.

### B. Tailwind CSS v4.0
*   **Configuración en CSS:** Todos los tokens (colores, fuentes) van en directivas `@theme` dentro del CSS principal.
*   **Espacio de Color:** Usar exclusivamente **OKLCH** para gamas P3 y consistencia perceptual.
*   **Valores Dinámicos:** Preferir valores arbitrarios (ej. `w-17`, `grid-cols-15`) sobre configuración estática excesiva.

### C. Seguridad
*   **Server Functions:** Validar estrictamente todos los argumentos en funciones `'use server'`. Son endpoints públicos.

## 3. Estructura y Convenciones
*   **Nombres:**
    *   Componentes: `PascalCase` (Crucial para detección del Compiler).
    *   Hooks: `useCamelCase`.
*   **Directorios:**
    *   `src/app/`: Rutas (Server Components).
    *   `src/components/`: UI (Server por defecto, `'use client'` solo si es necesario).
    *   `src/actions/`: Server Functions puras (`'use server'`).
    *   `src/styles/`: CSS principal con `@theme`.

## 4. Protocolo de Seguridad (Referencia)
Consultar `REPORT_ONLY_PROTOCOL.md` para reglas específicas sobre fases de análisis y auditoría.
