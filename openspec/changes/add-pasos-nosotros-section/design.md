# Design

## Context

- Mismo patrón que `sections/nosotros-home.liquid`: bloques de sección en el schema, dos columnas por `select column`, variables CSS `--pn-*` por bloque, CSS en `{% stylesheet %}`, `font_picker` por bloque.
- Regla del proyecto: `range` necesita al menos 3 pasos ((max − min) / step ≥ 3); `theme check` no lo detecta.
- Regla de push: solo código; no tocar contenido del editor.

## Goals / Non-Goals

**Goals:**
- Cada elemento es un bloque con configuración propia; fondo opcional; Poppins por defecto; responsive.

**Non-Goals:**
- JavaScript, animaciones, theme blocks en `blocks/`, modificar `nosotros-home`.

## Decisions

1. **Bloques de sección** (`etiqueta`, `titulo`, `subtitulo`, `imagen`, `paso`), `max_blocks: 16`. Alternativa descartada: theme blocks, sin reutilización prevista.
2. **Fondo sin default**: setting `color` sin `default`; el `{% style %}` solo emite `background-color` si el valor no está en blanco.
3. **Poppins por defecto**: `font_picker` con `"default": "poppins_n4"` (títulos `poppins_n5`/`n6` si hace falta); cada bloque de texto tiene su propio selector.
4. **Línea conectora**: cada Paso lleva un `::after` vertical entre círculos; Liquid cuenta los pasos por columna y añade `pn__item--last` al último para ocultarla. El círculo, la línea y la tarjeta usan colores propios del bloque.
5. **Columnas**: igual que `nosotros-home` (izquierda/derecha por bloque; Imagen izquierda y el resto derecha por defecto, como la referencia); proporción 50/50, 45/55, 40/60; columna vacía omitida; una columna bajo 990px.
6. **Título con acento**: texto + `<span>` en cursiva con color propio (opcional).
7. **Imagen**: `image_picker`, `image_url`/`srcset`/`sizes`, proporción en `select`, radio, punto focal, `placeholder_svg_tag` sin imagen.
8. **Tamaños** en `rem` (`px / 10`) con variantes móvil/escritorio y media query a 750px.

## Risks / Trade-offs

- La línea conectora depende de que los pasos sean consecutivos; si se intercalan otros bloques entre pasos de la misma columna, la línea sigue visible entre ellos (comportamiento aceptado).
- Poppins requiere que esté en la biblioteca de fuentes de Shopify (`poppins_n4`); se valida con `shopify theme check` y en el editor.
- Muchos settings por bloque: se agrupan con `header`.
