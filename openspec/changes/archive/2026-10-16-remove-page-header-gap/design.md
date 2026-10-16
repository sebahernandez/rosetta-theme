## Context

`sections/header.liquid` genera `.section-header { margin-bottom: <margin_bottom * 0.75>px }` y, desde 750px, `margin-bottom: <margin_bottom>px` (valor guardado: 52). Los cambios `remove-product-header-gap` y `remove-collection-header-gap` añadieron, después de la media query de 750px, `{%- if template.name == 'product' or template.name == 'collection' -%} .section-header { margin-bottom: 0; } {%- endif -%}`. En `/pages/nosotros` la prueba previa con Playwright midió 52 px (escritorio) y 39 px (móvil) entre el header y `#MainContent`, y el primer bloque es blanco, por lo que se ve el fondo crema del body. Existen las plantillas `templates/page.json`, `page.contact.json`, `page.nosotros.json` y `page.home-test.json`; todas se resuelven con `template.name == 'page'` (el sufijo no cambia el nombre).

## Goals / Non-Goals

**Goals:**
- Eliminar la franja entre el header y el contenido en las páginas personalizadas, en móvil y escritorio.
- No modificar archivos de contenido.

**Non-Goals:**
- Tocar inicio, lista de colecciones, carrito, blog, artículos, búsqueda o cuenta.
- Cambiar el ajuste "Margen inferior" del header ni el color de fondo del sitio.

## Decisions

- **Ampliar la condición existente** a `template.name == 'product' or template.name == 'collection' or template.name == 'page'`, manteniendo una sola regla con el mismo orden y especificidad que ya funcionó. Alternativa: lista de plantillas con `contains`/`case`; se descarta por no aportar claridad con solo tres valores.
- **Un solo requirement independiente** en la spec (no modificar los de producto y colección, ya sincronizados): cada plantilla tiene su propio comportamiento observable y evita acoplar deltas.
- **Verificación con Playwright**: medir la distancia entre el borde inferior del header y `#MainContent` en `/pages/nosotros`, `/pages/contacto` y la plantilla estándar, y confirmar 0 en escritorio y móvil, mientras que inicio, lista de colecciones y carrito mantienen el margen configurado.

## Risks / Trade-offs

- [Un bloque de página con fondo propio queda pegado al header] → es el mismo trade-off ya aceptado en producto y colección; se valida con capturas.
- [Páginas que dependían de la separación para respirar] → las secciones de página tienen su propio relleno superior; se revisa en la captura de `/pages/nosotros`.
- [Inicio usa un header absoluto con su propio estilo] → no se toca; la condición no incluye `index`.
