# Design

## Context

El theme ya tiene secciones propias con el patrón de `seleccionado.liquid`: un `{%- style -%}` que aplica fondo, márgenes y rellenos a `#shopify-section-{{ section.id }}` desde settings `range`, más `{% stylesheet %}` para el CSS base y schema en español. Existe `icon-features.liquid`, pero solo admite imagen como ícono, sin colores, márgenes ni separadores; no se reutiliza ni modifica. Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Una sola sección autocontenida (`sections/beneficios.liquid`), sin JS ni assets nuevos.
- Todo configurable desde el editor: ícono, textos, colores, márgenes y rellenos.
- Responsive con CSS puro (grid + media queries).

**Non-Goals:**
- No migrar ni eliminar `icon-features`.
- No añadir enlaces por beneficio ni animaciones.
- No modificar archivos de contenido (`templates/*.json`, `settings_data.json`).

## Decisions

1. **Íconos: set SVG integrado + imagen opcional.** Un setting `select` (`icon`) con ~10 íconos (camión, escudo, auriculares, devolución, regalo, reloj, corazón, estrella, tarjeta, check), renderizados como SVG inline con `stroke="currentColor"`, de modo que el color del ícono sea un setting `color` aplicado vía `color`. Un `image_picker` (`icon_image`) tiene prioridad si está cargado. Alternativa descartada: solo `image_picker` (como `icon-features`), porque no permite recolorear el ícono desde el editor.
2. **Colores por bloque vía variables CSS inline.** Cada bloque escribe `--ben-icon`, `--ben-circle`, `--ben-title`, `--ben-text` en su `style`; el CSS de `{% stylesheet %}` los consume. Alternativa: un `{%- style -%}` con selectores por `block.id`; se descarta por más verbosidad sin beneficio.
3. **Márgenes/rellenos como en `seleccionado`.** Mismos ids (`margin_top|bottom|x`, `padding_top|bottom|x`), mismo rango 0–120 px, paso 4, aplicados en `#shopify-section-{{ section.id }}`. Mantiene consistencia entre secciones.
4. **Grid con separadores por borde.** Contenedor `display: grid` con `grid-template-columns: repeat(var(--ben-cols), 1fr)`; escritorio hasta 4 columnas (según número de bloques, máx. 6 → se usa `min(blocks, 4)`), ≥750px, 2 columnas en 750–989px, 1 columna <750px. Separadores con `border-left` en cada celda excepto la primera de cada fila; en móvil pasan a `border-top`. Color y visibilidad del separador son settings de sección (`show_dividers`, `divider_color`). Se acepta el costo de reglas `:nth-child` por breakpoint a cambio de no depender de JS.
5. **Contenido protegido.** Defaults de textos en español escritos en el schema (preset con 4 bloques); sin tocar JSON de contenido.
6. **Accesibilidad.** Íconos SVG con `aria-hidden="true"`; la imagen propia lleva `alt` vacío (decorativa) porque el título ya describe el beneficio.

## Risks / Trade-offs

- [Separadores incorrectos al cambiar de breakpoint con 5–6 bloques] → Definir reglas por breakpoint con `:nth-child` y verificar con 3, 4, 5 y 6 bloques en el editor.
- [Set de íconos limitado] → La imagen propia cubre cualquier otro caso.
- [Contraste bajo si el comerciante elige colores claros] → Defaults con contraste suficiente; la elección final es del comerciante.
- [Ancho de texto en tablet con 2 columnas] → `min-width: 0` y `overflow-wrap: anywhere` en el texto.
