# Design

## Context

`.suscribete` es un grid de dos columnas desde 990px. La columna derecha (`.suscribete__form-wrap`) tiene hoy `align-self: end` (`sections/suscribete-rosetta.liquid`, media query `min-width: 990px`), por lo que el formulario se pega al borde inferior y deja el hueco sobre él. Desde 750px `.suscribete__row` ya es `flex-direction: row; align-items: center`, así que campo y botón están alineados entre sí. Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Centrar verticalmente el formulario en la tarjeta en escritorio (≥990px).
- Mantener campo y botón con la misma altura y alineados en la fila.

**Non-Goals:**
- Cambiar el layout de tablet/móvil, los settings, los tamaños de fuente o los rellenos de la tarjeta.
- Tocar el contenido del editor de temas.

## Decisions

- **`align-self: center` en `.suscribete__form-wrap`** (en lugar de `end`). Es un cambio de una línea, no añade wrappers ni settings y deja que el formulario siga la altura de la columna de texto.
  - Alternativa descartada: `align-items: center` en `.suscribete`. Afectaría también a la columna de texto y cambiaría su posición cuando el formulario sea más alto (p. ej. con mensaje de error), sin necesidad.
  - Alternativa descartada: nuevo setting de alineación. Añade configuración que nadie pidió.
- **Fila del formulario sin cambios**: `.suscribete__row` ya usa `align-items: center` y ambos controles comparten `min-height: 48px`. Se verifica que el mensaje de éxito/error (`.suscribete__message`) no desplace el campo fuera del centro de forma notoria.

## Risks / Trade-offs

- [Al aparecer el mensaje de éxito/error el bloque crece y el campo sube ligeramente al mantenerse centrado] → Aceptable; el mensaje queda dentro de `.suscribete__form-wrap` y no rompe el layout.
