# Proposal

## Why

La home necesita una sección de "pequeñas colecciones" (p. ej. "Imperdibles de playa", "La despensa de siempre") donde cada tarjeta agrupa una imagen, textos y una lista corta de productos con acceso rápido al carrito. Hoy no existe una sección equivalente, y el comerciante debe poder armarla y mantenerla desde el editor de temas sin tocar código.

## What Changes

- Nueva sección `sections/seleccionado.liquid` ("Seleccionado") con encabezado (etiqueta superior, título con acento en cursiva y subtítulo) y una grilla de tarjetas de colección.
- Todo el contenido es editable desde el editor de temas: textos, imágenes, colores de fondo de cada tarjeta y productos.
- Los elementos se componen con bloques: etiqueta superior, título, subtítulo, tarjeta de colección y producto. Cada bloque de producto se asocia a la tarjeta de colección que lo precede.
- Cada fila de producto muestra miniatura, nombre, precio y un botón "+" que agrega una unidad al carrito sin abrir el cajón lateral; el contador del encabezado y el contenido del cajón se actualizan.
- Nuevo asset JS con un custom element para el botón de agregar, y CSS propio de la sección.

## Capabilities

### New Capabilities
- `seleccionado-section`: sección "Seleccionado" con encabezado y tarjetas de colección compuestas por bloques editables, con productos que se agregan al carrito sin abrir el cajón.

### Modified Capabilities

(ninguna: el comportamiento del carrito descrito en `cart` no cambia; la sección lo reutiliza)

## Impact

- Código nuevo: `sections/seleccionado.liquid`, `assets/seleccionado.js` (y estilos en la propia sección o un CSS dedicado).
- Reutiliza `cart-drawer` (`renderContents`), el evento `cartUpdate` y `routes.cart_add_url`; no modifica archivos existentes.
- No toca archivos de contenido del editor (`templates/*.json`, `sections/*-group.json`, `config/settings_data.json`); el comerciante añade la sección desde el editor.
