## Context

`sections/header.liquid` genera `.section-header { margin-bottom: <margin_bottom * 0.75>px }` y, desde 750px, `margin-bottom: <margin_bottom>px`. El valor guardado es 52. El cambio `remove-product-header-gap` añadió, después de la media query de 750px, `{%- if template.name == 'product' -%} .section-header { margin-bottom: 0; } {%- endif -%}`. En `/collections/all` la prueba con Playwright midió 52px (escritorio) y 39px (móvil) entre el header y `#MainContent`, y el primer contenedor (banner de colección, esquema 1) es blanco, lo que deja a la vista el fondo crema del body.

## Goals / Non-Goals

**Goals:**
- Eliminar la franja entre el header y el contenedor de la colección en móvil y escritorio, igual que en producto.
- No modificar archivos de contenido.

**Non-Goals:**
- Tocar la lista de colecciones, búsqueda u otras plantillas.
- Cambiar el ajuste "Margen inferior" del header ni el color de fondo.

## Decisions

- **Ampliar la condición existente** a `{%- if template.name == 'product' or template.name == 'collection' -%}`, en lugar de duplicar el bloque. Mantiene una sola regla con el mismo orden y especificidad que ya funcionó en producto.
- **Requirement independiente** en la spec (no modificar el de producto): el cambio de producto aún no está archivado, así que un delta MODIFIED sobre ese requirement no tendría base en la spec principal. Dos requirements separados evitan acoplar el orden de archivo.
- **Verificación con Playwright**: medir la distancia entre el borde inferior del header y `#MainContent` en colección (0), producto (0) y una página de contenido o la lista de colecciones (margen configurado), en escritorio y móvil; y comprobar que tras aplicar un filtro la distancia sigue siendo 0.

## Risks / Trade-offs

- [El título de la colección queda pegado al header] → el banner de colección ya tiene su propio relleno superior; se valida en la captura.
- [`list-collections` conserva la franja] → fuera de alcance; se informa como seguimiento posible.
- [Dos cambios activos tocan la misma regla de `header.liquid`] → el de producto ya está en `develop`; este solo amplía su condición.
