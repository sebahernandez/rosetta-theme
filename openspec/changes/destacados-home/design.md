# Design

## Context

Referencia visual: encabezado (etiqueta + título de dos líneas), y una fila con tarjeta oscura "Club del Ahorro" y 4 tarjetas de producto sobre fondo menta. Ver proposal.md para la motivación.

Estado actual observado:
- `sections/oferta-semanal.liquid` ya resuelve el patrón de espaciado y fondo: `{% style %}` para el fondo sobre `#shopify-section-{{ section.id }}`, variables CSS (`--os-margin-*`, `--os-padding-*`) inyectadas por `style` inline, CSS en `{% stylesheet %}` y bloques con `{% case block.type %}` + `block.shopify_attributes`.
- `sections/featured-collection.liquid` renderiza productos con `{% render 'card-product' %}` pasando `skip_styles` para cargar los estilos del snippet una sola vez.
- `snippets/card-product.liquid` es la tarjeta actual; su atributo `sizes` asume 4 columnas, que coincide con este caso.

## Goals / Non-Goals

**Goals:**
- Una sola sección nueva, sin tocar snippets ni plantillas.
- Reutilizar `card-product` tal cual para los productos.
- Reutilizar el patrón de espaciado/fondo de `oferta-semanal` para mantener consistencia.

**Non-Goals:**
- No se modifica la apariencia de `card-product`; los botones "Agregar" y la etiqueta "Oferta" salen de la tarjeta actual y de la configuración global del tema.
- No se crea slider ni paginación de productos.
- No se añade la sección a `templates/index.json`; lo hace el comerciante en el editor.

## Decisions

**1. Tres tipos de bloque: `eyebrow`, `heading`, `promo_card`.**
Los textos del encabezado son bloques independientes (reordenables) y la tarjeta oscura es un único bloque con sus campos (icono, título, texto, nota, enlace, colores). Alternativa descartada: un bloque por cada línea de la tarjeta oscura; añade complejidad al editor sin valor real, y el diseño de la nota (recuadro con icono) se rompe si se reordena.

**2. Colección y cantidad fijas a 4.**
Un `collection` picker en los settings y `limit: 4` en el bucle. No se expone un ajuste de cantidad porque el layout de 5 columnas está pensado para 4 productos. Sin colección, se renderizan 4 `placeholder` con `card-product` sin `card_product`, como hace `featured-collection`.

**3. Layout con CSS grid.**
Escritorio (≥990px): `grid-template-columns` de 5 columnas (`1.15fr` para la tarjeta promocional y `1fr` por producto). Si se elimina el bloque `promo_card`, se aplica una clase modificadora que deja 4 columnas. Móvil: tarjeta promocional en `grid-column: 1 / -1` y productos en 2 columnas. Tablet (750–989px): promoción a todo el ancho y productos en 4 columnas si caben, de lo contrario 2.

**4. Espaciado y fondo.**
- Fondo de sección: `{% style %}` sobre `#shopify-section-{{ section.id }}` (cubre el ancho completo).
- Margen y relleno: `range` en px (superior, inferior, lateral) inyectados como variables CSS en el contenedor `.destacados-home`, igual que en `oferta-semanal`. El margen se aplica al contenedor y el relleno al área interna que envuelve encabezado y fila.

**5. Estilos de la tarjeta promocional en la sección.**
Colores de fondo y texto por settings del bloque, radio fijo vía variable CSS. El recuadro de nota usa borde sutil con `currentColor` en baja opacidad para adaptarse a cualquier fondo.

## Risks / Trade-offs

- [`card-product` carga sus CSS con `skip_styles`; si se omite el flag en la primera tarjeta, faltan estilos] → La primera iteración pasa `skip_styles: false` y las demás `true`, como `featured-collection`.
- [La etiqueta "Oferta" y el botón "Agregar" dependen de `settings.card_style` y `quick_add` globales] → Se pasa `quick_add: 'standard'` si el tema lo soporta; verificar en la prueba manual y documentar en tasks si hace falta ajuste.
- [Imagen/icono del bloque requiere multimedia que no va al repo] → Seguir el flujo documentado: subir código, cargar en el editor, `git pull origin develop`.
- [Con 5 columnas, las tarjetas son estrechas en 990–1200px] → Verificar visualmente y, si es necesario, pasar a 2 filas bajo 1200px.
