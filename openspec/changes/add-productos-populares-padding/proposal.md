# Proposal

## Why

En la sección "Productos populares" los elementos (encabezado, filtros y productos) quedan pegados al borde de su fondo. Los ajustes de "Relleno" existentes se aplican al contenedor `#shopify-section-*`, que no tiene fondo propio: el fondo (esquema de color) vive en el `div.productos-populares` interior, por lo que ese relleno solo separa la sección de lo que la rodea y nunca da aire entre el fondo y el contenido. Además, un único valor sirve para móvil y escritorio, y lo que queda bien en escritorio es excesivo en móvil.

## What Changes

- El relleno superior, inferior y lateral pasa a aplicarse dentro del contenedor con fondo (`.productos-populares`), de modo que el fondo envuelve el contenido con aire a su alrededor, igual que en `suscribete-rosetta`.
- Se añaden ajustes de relleno específicos para móvil (superior, inferior y lateral), además de los de escritorio (≥750 px), todos en píxeles y editables desde el editor de temas.
- Los márgenes (superior, inferior, lateral) se mantienen en el contenedor exterior y siguen controlando la separación respecto a las demás secciones.
- Valores por defecto: escritorio 40 px arriba y abajo; móvil 24 px arriba y abajo; laterales 0 en ambos (el contenido ya tiene la separación lateral del contenedor de página).
- No se modifica el diseño de la grilla, los filtros ni la tarjeta de producto.

## Capabilities

### New Capabilities

- `productos-populares-section`: espaciado interno (relleno) configurable de la sección "Productos populares", con valores independientes para móvil y escritorio.

### Modified Capabilities

<!-- Ninguna: la sección no tenía spec previo. -->

## Impact

- Código: `sections/productos-populares.liquid` (bloque `{%- style -%}`, `{% stylesheet %}` y schema).
- Los ajustes `padding_top`, `padding_bottom` y `padding_x` conservan su id, pero ahora representan el relleno interno de escritorio; en `templates/index.json` no hay valores guardados para ellos, por lo que no se pierde configuración. Sin cambios en `templates/*.json`, `config/` ni `locales/`.
- Efecto visual: el fondo de la sección crece con el relleno; con los valores por defecto la sección es 40 px más alta arriba y abajo en escritorio que si el relleno estuviera en el contenedor exterior sin fondo.
