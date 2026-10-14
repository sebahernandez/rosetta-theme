# Proposal

## Why

La portada de Rosetta necesita una sección "Destacados home": un encabezado con etiqueta y título, una tarjeta promocional oscura (p. ej. "Club del Ahorro") y 4 productos de una colección. Hoy no existe una sección que combine contenido editable con productos reales, y el comerciante no puede cambiar la colección, los textos ni el espaciado sin tocar código.

## What Changes

- Nueva sección `sections/destacados-home.liquid` que reproduce el diseño de referencia: encabezado arriba, y debajo una fila con la tarjeta promocional a la izquierda y 4 productos a la derecha.
- Los **4 productos** salen de la **colección elegida en los settings** (`collection` picker) y se renderizan con las **tarjetas actuales** del tema (`snippets/card-product.liquid`), sin crear una tarjeta nueva.
- El resto de elementos son **bloques configurables**: etiqueta superior (eyebrow), título (con salto de línea) y tarjeta promocional (icono, título, texto y nota con enlace opcional). El comerciante puede añadir, quitar y reordenar los bloques.
- **Margen y relleno** configurables (superior, inferior y laterales) en los contenedores de la sección.
- **Color de fondo de la sección** configurable.
- Diseño **responsive**: en móvil la tarjeta promocional va arriba y los productos se apilan en 2 columnas; en escritorio es una fila de 5 columnas (1 promo + 4 productos).

## Capabilities

### New Capabilities
- `home-featured-section`: sección "Destacados home" con encabezado y tarjeta promocional administrables por bloques, 4 productos de una colección configurable, y espaciado y fondo editables.

### Modified Capabilities

## Impact

- Código nuevo: `sections/destacados-home.liquid` (schema, CSS en `{% stylesheet %}` y marcado). Reutiliza `snippets/card-product.liquid` sin modificarlo.
- Sin cambios en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`: la sección se agrega a la portada desde el editor de temas (ver spec `theme-content-protection`). El icono de la tarjeta promocional no va al repositorio; sigue el flujo documentado para secciones con multimedia.
- Sin dependencias nuevas ni JavaScript propio.
