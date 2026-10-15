## Context

`sections/beneficios.liquid` define `.beneficios__item` como `display: flex; align-items: center; justify-content: center`. En móvil (una columna) eso centra horizontalmente el par ícono + texto, de modo que filas con textos de distinta longitud arrancan en posiciones distintas. `align-items: center` ya centra verticalmente ícono y texto entre sí.

## Goals / Non-Goals

**Goals:**
- Alinear a la izquierda cada beneficio en móvil (< 750px).
- Mantener ícono y texto centrados verticalmente entre sí.

**Non-Goals:**
- Cambiar tablet/escritorio.
- Agregar ajustes al editor de temas.

## Decisions

- **Cambiar el valor base (móvil) de `justify-content` a `flex-start` y restaurar `center` en `@media (min-width: 750px)`.** Alternativa: sobrescribir con `max-width: 749px`. Se descarta porque el CSS de la sección es mobile-first (los overrides ya están en `min-width`) y así se mantiene la convención.
- **Añadir `text-align: left` a `.beneficios__text` en móvil.** Evita que herede un centrado del tema; se restaura en ≥750px solo si hace falta para no cambiar el comportamiento actual (verificar en la prueba manual que tablet/escritorio quedan idénticos).
- **Mantener `align-items: center`.** Ya cumple el centrado vertical; no requiere cambio.

## Risks / Trade-offs

- [Beneficio de una sola línea ancho completo con mucho espacio a la derecha] → es el comportamiento buscado al alinear a la izquierda.
- [Regresión visual en tablet/escritorio] → los overrides en `min-width: 750px` restauran los valores actuales; verificar manualmente.
