# Design

## Context

Ver proposal.md - Why. El theme ya tiene secciones propias con el patrón buscado: `supermercado-explora.liquid` define márgenes, relleno y fondo de sección con `{%- style -%}` sobre `#shopify-section-{{ section.id }}`, y variables CSS (`--se-*`) en el contenedor. `banner-oferta.liquid` es el antecedente visual, pero usa tres columnas, tamaños en línea y sin bloques.

Restricciones: Liquid + CSS sin build step, sin JavaScript necesario, nombres e ids de settings en español en secciones propias, y el contenido del editor (imagen, textos) vive en `templates/*.json` y no se toca desde código.

## Goals / Non-Goals

**Goals:**
- Una sola sección autocontenida (`sections/oferta-semanal.liquid`) con schema, CSS y marcado.
- Bloques para cada elemento del panel de contenido.
- Imagen por `image_picker`, espaciado de tarjeta y colores configurables.
- Layout responsive imagen izquierda (escritorio) / arriba (móvil).

**Non-Goals:**
- No crear la instancia en la portada ni subir la imagen (se hace en el editor de temas).
- No modificar `banner-oferta` ni otras secciones.
- No cargar tipografías nuevas: el título cursivo usa la fuente de encabezados del theme con `font-style: italic`.

## Decisions

1. **Fondo de la sección en `#shopify-section-{{ section.id }}`**, no en la tarjeta. Así el color cubre todo el ancho de la página, como en la referencia (fondo crema alrededor de la tarjeta). Mismo patrón que `supermercado-explora`. Alternativa descartada: fondo en un contenedor interno, que quedaría limitado al `page-width`.

2. **Margen y relleno de la tarjeta como settings `range` en px** (superior, inferior, laterales; paso 4, 0-120), aplicados con variables CSS en el elemento de la tarjeta (`--ow-margin-*`, `--ow-padding-*`). El "elemento principal" es la tarjeta completa (imagen + panel); el relleno se aplica al panel de contenido para que la imagen siga llenando su mitad. Alternativa: relleno sobre la tarjeta, que dejaría la imagen con marco; se descarta por no coincidir con la referencia.

3. **Imagen como setting de sección (`image_picker`)** y no como bloque, tal como se pidió y porque es un elemento único y obligatorio del layout. Se renderiza con `image_url` + `image_tag` (`widths`, `sizes`, `loading: lazy`) y `object-fit: cover`; sin imagen, `placeholder_svg_tag`.

4. **Cinco tipos de bloque** (`eyebrow`, `heading`, `text`, `highlight`, `button`), sin límite de cantidad por tipo, renderizados en orden con `{% case block.type %}`. Cada bloque incluye `{{ block.shopify_attributes }}` y expone color propio. El bloque `highlight` es la cifra grande ("2×1") en cursiva con color de acento. Alternativa: un único bloque genérico de texto con selector de estilo; se descarta porque el pedido es que cada elemento sea un bloque propio.

5. **Layout con CSS Grid**: `grid-template-columns: 1fr` en móvil (imagen primero por orden del DOM) y `1fr 1fr` desde 750px, con la imagen en la primera columna. No se usa `order`, para que lectura y foco sigan el orden visual. Punto de quiebre 750px, el mismo del theme (`base.css`).

6. **Bloque `button` + `highlight` en una fila**: el panel es un contenedor flex con wrap; la cifra y el botón comparten fila cuando caben, como en la referencia, sin forzarlo con un bloque contenedor extra.

7. **Textos por defecto en español escritos en el Liquid y en el preajuste**, siguiendo la convención de secciones propias. Colores de la referencia como defaults (fondo sección `#faf7f2`, panel `#ffdcf6`, acento `#f04ee0`, botón `#5cf5c9`); todos editables.

## Risks / Trade-offs

- [Los colores y la imagen de la referencia son aproximados] → Son solo valores por defecto; el comerciante los ajusta en el editor.
- [Relleno lateral alto en móvil puede comprimir el texto] → Los valores de relleno se limitan a 0-120 px y se reduce el máximo efectivo en móvil con `min()`/`clamp()` en el CSS.
- [Cifra grande desborda en pantallas estrechas] → Tamaño con `clamp()` y `overflow-wrap` en el bloque; verificar a 320 px.
- [La imagen no viaja con el código] → Se sigue el flujo documentado: código, luego imagen y textos en el editor, `git pull origin develop` y `shopify theme dev`.
