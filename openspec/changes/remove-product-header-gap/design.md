## Context

`sections/header.liquid` genera en su bloque `{% style %}` (líneas 99-113) `.section-header { margin-bottom: <margin_bottom * 0.75>px }` y, desde 750px, `margin-bottom: <margin_bottom>px`. El valor guardado es 52 (`sections/header-group.json`), por lo que el wrapper del header (`div#shopify-section-…__header`) mide 52px de margen en escritorio y 39px en móvil; `main#MainContent` empieza ahí. El margen no tiene fondo, así que se ve el `body.gradient` (`#faf7f2`) definido en `set-body-background-color`; el header usa el mismo color, y el contenedor del producto (esquema 1) es blanco. El resultado es una franja crema entre el header y el bloque blanco.

## Goals / Non-Goals

**Goals:**
- Eliminar la franja visible entre header y contenedor de producto en móvil y escritorio.
- No tocar archivos de contenido del editor.

**Non-Goals:**
- Cambiar el margen del header en otras páginas.
- Cambiar el color de fondo del sitio ni el del header.
- Tratar la misma franja en la página de colección (queda como seguimiento).

## Decisions

- **Anular el margen inferior del header solo en la plantilla de producto**, con `{%- if template.name == 'product' -%} .section-header { margin-bottom: 0; } {%- endif -%}` en el mismo `{% style %}`, después de las reglas existentes (incluida la media query de 750px) para ganar por orden con la misma especificidad. Alternativas:
  - Cambiar `margin_bottom` a 0 en `header-group.json`: afectaría a todas las páginas y es un archivo de contenido protegido.
  - Pintar la franja de blanco: oculta el hueco pero deja espacio muerto y depende del color de la sección.
  - Cambiar el color de fondo del body: reabriría el cambio ya archivado y afectaría a todo el sitio.
- **Sin nuevo ajuste en el editor**: el margen cero en producto es una regla de diseño, no una preferencia del comerciante; se evita añadir controles que no se pidieron.
- **Verificación con Playwright** sobre una página de producto y una de colección, en escritorio y móvil: medir la distancia entre el borde inferior del header y el inicio de `#MainContent` (0 en producto; 52/39 en colección).

## Risks / Trade-offs

- [El contenido del producto queda pegado al header] → es lo pedido; la sección de producto ya tiene su propio relleno superior.
- [`template.name` no se evalúa igual en recargas parciales de la sección del header] → el header se renderiza en el layout con la plantilla actual; se comprueba en la prueba manual y con Playwright.
- [La colección conserva la franja] → se informa como seguimiento fuera de alcance.
