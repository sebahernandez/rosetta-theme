# Design

## Context

- Mismo patrón que `pasos-nosotros` y `nosotros-home`: bloques de sección en el schema, variables CSS `--nc-*` por bloque, CSS en `{% stylesheet %}`, `font_picker` por bloque.
- Regla del proyecto: `range` necesita al menos 3 pasos ((max − min) / step ≥ 3); el nombre de un bloque no puede superar 25 caracteres (Shopify lo rechaza al subir).
- Regla de push: solo código; no tocar contenido del editor.

## Goals / Non-Goals

**Goals:** cada elemento es un bloque configurable; fondo opcional; Poppins por defecto; responsive.

**Non-Goals:** JavaScript, animaciones, theme blocks en `blocks/`.

## Decisions

1. **Bloques de sección**: `etiqueta`, `titulo`, `texto`, `item`, `boton`, `imagen`, `tarjeta` (límite 6), `max_blocks: 24`. Sin selector de columna: el tipo decide la zona (imagen → derecha del panel; tarjeta → fila inferior; el resto → texto del panel).
2. **Panel**: `.nc__panel` es una cuadrícula de 2 columnas desde 990px con `overflow: hidden` y radio configurable; la imagen llena su celda (`object-fit: cover`, altura 100%). Sin Imagen, una columna. En móvil, texto y luego imagen con proporción configurable.
3. **Fondo de sección** sin `default`; el `{% style %}` solo emite `background-color` si hay valor. El fondo del panel es otro setting (default `#ffd9f5`).
4. **Ítem de lista**: círculo con check SVG, colores propios (círculo y marca) y texto con fuente propia.
5. **Tarjeta**: `<a>` (o `<div>` sin URL) con imagen absoluta de fondo, degradado inferior, etiqueta en mayúsculas pequeñas, título y botón circular con flecha (↗). Proporción y radio configurables; columnas en escritorio por `select` (2/3/4) con `grid-template-columns: repeat(n, 1fr)`; móvil una columna.
6. **Título con acento**: texto + `<span>` en cursiva con color propio.
7. **Tamaños** en `rem` (`px / 10`), con variantes móvil/escritorio y media query a 750px.
8. **Imágenes**: `image_picker`, `image_url`/`srcset`/`sizes`, `placeholder_svg_tag`, punto focal.

## Risks / Trade-offs

- La imagen a sangre depende de que el panel recorte (`overflow: hidden`); con textos muy largos la imagen crece con el panel.
- Texto sobre imagen: el degradado inferior garantiza contraste, pero imágenes muy claras pueden requerir aumentar su opacidad (setting).
- Poppins debe existir en la biblioteca de fuentes de Shopify (`poppins_n4`); ya se usa en `pasos-nosotros`.
