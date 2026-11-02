# Design

## Context

- Theme Refresh 15.2.0 con secciones propias. Referencias: `contact-rosetta.liquid` (variables CSS `--*` desde el schema, CSS en `{% stylesheet %}`, `font_picker`) y `contact-cards.liquid` + `blocks/contact-card.liquid` (theme blocks).
- Ya existe `nosotros-content.liquid` con otro propósito; la nueva sección es independiente y no lo modifica.
- Lección del cambio anterior: Shopify rechaza `range` con menos de 3 pasos y `theme check` no lo detecta. Se valida cada `range` ((max − min) / step ≥ 3) y se usa `select` para opciones cortas.
- Regla del proyecto: no tocar contenido del editor (`templates/*.json`, `*-group.json`, `settings_data.json`).

## Goals / Non-Goals

**Goals:**
- Cada elemento es un bloque con configuración propia; el comerciante compone y ordena la sección.
- Responsive desde 320px sin overflow; tarjeta flotante sobre la imagen en todos los tamaños.

**Non-Goals:**
- JavaScript, animaciones y modificar `nosotros-content`.
- Theme blocks reutilizables en `blocks/` (ver decisión 1).

## Decisions

1. **Bloques de sección, no theme blocks.** Los elementos son bloques definidos en el schema de `sections/nosotros-home.liquid` (`insignia`, `titulo`, `texto`, `boton`, `imagen`, `tarjeta`). Son específicos de esta composición y no se reutilizan en otras secciones, y mantenerlos dentro del archivo evita sincronizar archivos nuevos en `blocks/`. Alternativa: theme blocks (como `contact-card`); se descarta por no haber reutilización. Máximo 16 bloques.
2. **Columnas por bloque.** Cada bloque tiene un `select` `column` (izquierda/derecha; Imagen y Tarjeta por defecto derecha, el resto izquierda). La sección hace dos pasadas sobre `section.blocks` y renderiza cada bloque en su columna con un snippet-less `case`. Si una columna queda vacía, no se renderiza y la otra ocupa el ancho completo.
3. **Columna izquierda en flujo flex.** `display: flex; flex-wrap: wrap; align-items: center; column-gap` para que los botones consecutivos queden en fila; los demás bloques llevan `flex: 0 0 100%`. En móvil el botón se estira a `flex: 1 1 100%`.
4. **Tarjeta flotante.** La columna derecha es `position: relative`; la tarjeta es `position: absolute` abajo a la derecha (o izquierda) con offset relativo (`-16px` móvil/ `-20px` escritorio en el eje vertical que sobresale se limita para no desbordar: en móvil queda dentro de la imagen con offset de 12px). Su ancho es `max-width: calc(100% - 24px)`.
5. **Orden en móvil.** Una columna: izquierda primero y derecha después. Para evitar que la imagen quede enterrada tras mucho texto, el orden es configurable por el orden de los bloques; no se invierte con CSS.
6. **Títulos con acento.** Mismo patrón que `contact-rosetta`: texto + `<span>` en cursiva con color propio, fuente por `font_picker` por bloque Título y por bloque Texto.
7. **Estilos por bloque.** Cada bloque recibe sus variables `--nh-*` en `style` (colores, tamaños móvil/escritorio, espaciado inferior), con el patrón `--x-m` / `--x-d` y media query 750px para el escritorio. Los tamaños de fuente en `rem` (`px / 10`).
8. **Botón.** `<a>` con `href` de un setting `url` (acepta enlaces de la tienda y externos); estilo `primary` (relleno) o `secondary` (borde); flecha SVG opcional; sin texto o sin enlace no se renderiza.
9. **Imagen.** `image_picker` + `image_url`/`srcset`/`sizes`; proporción en `select`; `focal_point` en `object-position`; `placeholder_svg_tag` sin imagen.
10. **Proporción de columnas.** `select` 50/50, 45/55, 40/60 mapeado a `grid-template-columns` con `fr`.

## Risks / Trade-offs

- Dos pasadas sobre los bloques complican un poco el Liquid; se mitiga con un `case` único por tipo reutilizado en ambas columnas.
- `block.shopify_attributes` solo permite seleccionar el bloque en el editor si cada bloque tiene un elemento raíz; los bloques sin contenido (texto vacío) no son seleccionables (comportamiento aceptado).
- ~25 settings por bloque Título/Texto: se agrupan con `header`.
- La tarjeta flotante en pantallas de 320px puede cubrir parte de la imagen; se limita su ancho y se reduce su relleno en móvil.
