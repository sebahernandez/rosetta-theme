# Design

## Context

`sections/productos-populares.liquid` aplica `margin_*` y `padding_*` a `#shopify-section-{{ section.id }}` mediante `{%- style -%}`. El fondo lo pinta `div.productos-populares.color-{{ color_scheme }}.gradient`, hijo de ese contenedor, que a su vez envuelve un `.page-width` con el contenido. Resultado: el relleno actual queda fuera del fondo. En `templates/index.json` no hay valores guardados de `padding_*` para esta sección (usa defaults: 40/40/0). `suscribete-rosetta.liquid` ya resolvió lo mismo con variables CSS para móvil/escritorio. Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Relleno entre el fondo y el contenido, con valores de móvil y escritorio.
- Reutilizar los ids `padding_top|bottom|x` como valores de escritorio para no crear ajustes duplicados.

**Non-Goals:**
- No cambiar grilla, filtros, JS ni tarjeta de producto.
- No tocar los márgenes ni `templates/index.json`.
- No cambiar el esquema de color ni el fondo.

## Decisions

1. **Mover el relleno a `.productos-populares`.** El `{%- style -%}` deja en `#shopify-section-*` solo `margin` y las variables de color de los filtros; define variables `--pp-pad-*` y `--pp-pad-*-lg` que `.productos-populares` consume en `padding`. Alternativa descartada: añadir un wrapper extra con fondo; no hace falta, el contenedor con fondo ya existe.
2. **Móvil primero, escritorio ≥750 px.** `padding: var(--pp-pad-top) var(--pp-pad-x) var(--pp-pad-bottom)` por defecto y un `@media screen and (min-width: 750px)` que usa las variables `-lg`. 750 px es el breakpoint ya usado por la sección y por el theme.
3. **Ajustes nuevos `padding_top_mobile`, `padding_bottom_mobile`, `padding_x_mobile`** (rango 0–120 px, paso 4, defaults 24/24/0) en un encabezado "Relleno interno (móvil)". Los existentes `padding_*` se renombran en etiqueta a "Relleno interno (escritorio)" conservando id y default (40/40/0). Mantener los ids evita perder valores guardados si los hubiera.
4. **Márgenes sin cambio.** Siguen en el contenedor exterior; documentado en el header "Margen del contenedor".
5. **Sin `!important` ni CSS fuera de la sección.**

## Risks / Trade-offs

- [El relleno ahora agranda el fondo; la sección se ve más alta que antes] → Es el efecto buscado; el comerciante puede bajar los valores o ponerlos en 0.
- [Relleno lateral + gutter de `.page-width` suman espacio en móvil] → Default lateral 0; el comerciante lo ajusta.
- [Valores guardados en otra plantilla distinta a `index.json`] → Se conservan los ids; solo cambia dónde se aplican.
