# Auditoría de Pasarela de Pagos (Fase 1 - REPORT_ONLY)

**Objetivo:** Integración de Checkout Embebido (Custom Card & Dynamic Pix) para maximizar la conversión sin redirecciones.

## 1. Integración de Pix Dinámico (Modal Confirmación)

### Arquitectura "Copia y Cola" & QR Code
Para mantener al usuario en el sitio, la generación del Pix debe ocurrir en el backend (vía API segura) y retornarse al frontend para su renderizado inmediato.

-   **Flujo Técnico:**
    1.  `DonationFlow` envía `amount` y `payer_email` al backend.
    2.  Backend solicita a la API (Mercado Pago/Stripe) la creación de un `PaymentIntent` tipo Pix.
    3.  Backend retorna:
        -   `qr_code_base64`: Imagen del QR para mostrar en `<img src="...">`.
        -   `qr_code`: String de texto para el botón "Copiar Código Pix".
        -   `payment_id`: Identificador para el pooling/webhook.

-   **Componente Visual (Modal):**
    -   Mostrar QR Code centrado.
    -   Botón con icono `Copy` que escribe el string en el portapapeles.
    -   Temporizador visual (ej: 15:00 min) para urgencia.

### Detección en Tiempo Real (Webhooks)
No obligar al usuario a enviar comprobante. El sistema debe "sentir" el pago.

-   **Implementación:**
    -   **Server-Side:** Endpoint `/api/webhooks/payments` escuchando notificaciones de la pasarela. Al recibir `status: approved`, actualiza la base de datos y/o emite evento.
    -   **Client-Side (Polling Inteligente):**
        -   El frontend consulta `/api/check-payment/{id}` cada 3 segundos.
        -   *Opción Superior:* Usar `WebSockets` (Pusher/Socket.io) para push notification inmediato al frontend.
-   **UX:** Al confirmarse, el modal se transforma automáticamente (sin refresh) en la pantalla de "¡Gracias por tu Corazón!".

## 2. Procesamiento de Tarjetas (PCI Compliance)

### Evaluación de Tecnologías
Para Brasil, la robustez es clave.

| Característica | Stripe Elements | Mercado Pago SDK v2 (Brick) |
| :--- | :--- | :--- |
| **Seguridad** | **Extrema** (iFrame aislado) | Alta (Secure Fields) |
| **Conversión BR** | Alta | **Muy Alta** (Líder en recusas falsas) |
| **Parcelamento** | Sí (Configurable) | **Nativo/Cultural** (Mejor UX visual de cuotas) |
| **Implementación** | React Wrapper Oficial | Payment Brick Oficial |

**Recomendación:** **Mercado Pago Payment Brick** para donaciones en BRL. Su manejo de errores de tarjetas locales y la interfaz nativa de cuotas (parcelamento) es superior culturalmente.

-   **Seguridad:** Los datos sensibles (PAN, CVV) se ingresan en campos controlados por el SDK de MP. Nuestro servidor solo recibe un `token` opaco para realizar el cobro. **PCI DSS Compliance delegado.**

### Parcelamento (Cuotas)
-   **Viabilidad:** Total y recomendada para donaciones > R$ 100.
-   **Configuración:** Habilitar `installments` en la configuración del Brick. Mostrar "1x R$ 50,00" por defecto, pero permitir desplegable para montos mayores.

## 3. Flujo de Usuario (UX - DonationFlow.tsx)

Arquitectura de Componente Único con Máquina de Estados Finita (FSM).

**Estados:** `AMOUNT_SELECT` -> `METHOD_SELECT` -> `PROCESSING` -> `SUCCESS`

1.  **AMOUNT_SELECT (Paso 1):**
    -   Grid de valores (como el actual).
    -   Input manual "Outro valor".
    -   Botón "Continuar" (deshabilitado si no hay valor).

2.  **METHOD_SELECT (Paso 2):**
    -   Tabs o Acordeón: [PIX (Instantáneo)] | [TARJETA].
    -   *Si Pix:* Botón "Gerar Pix".
    -   *Si Tarjeta:* Formulario seguro embebido (Brick/Element). Opción "Doar Mensalmente" (Recurrencia).

3.  **PROCESSING (Estado de Carga):**
    -   Spinner personalizado (Corazón latiendo).
    -   Mensaje empático: "Conectando con tu banco..." / "Gerando QR Code...".

4.  **SUCCESS (Estado Final):**
    -   Confeti virtual.
    -   Resumen de la donación.
    -   Botón para compartir en WhatsApp.

Esta estructura mantiene al usuario enfocado ("Tunnel Vision") y reduce drásticamente el abandono al eliminar cargas de página completas.
