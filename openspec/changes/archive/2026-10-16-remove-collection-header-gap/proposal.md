## Why

En la página de colección se ve la misma franja del color de fondo del sitio (crema) entre el header y el contenedor blanco con el título y los productos (unos 52 px en escritorio y 39 px en móvil). Ya se corrigió en la página de producto (`remove-product-header-gap`); la colección quedó fuera de alcance y ahora se pide aplicar el mismo ajuste.

## What Changes

- Causa observada (medida con Playwright sobre `/collections/all`): el wrapper del header tiene `margin-bottom: 52px` en escritorio y `39px` en móvil, que viene del ajuste "Margen inferior" del header (`margin_bottom: 52` en `sections/header-group.json`) aplicado en `sections/header.liquid`. El margen es transparente y deja ver el fondo del `body` (`#faf7f2`).
- Extender la regla que ya anula el margen inferior del header en producto para que también se aplique en la plantilla de colección: el contenido de la colección queda contiguo al header, sin franja entre ambos.
- La corrección se hace en código (`sections/header.liquid`), sin modificar `sections/header-group.json` ni el ajuste del editor. En el resto de páginas el margen configurado sigue aplicándose.
- Alcance asumido: la plantilla de colección (`template.name == 'collection'`). No incluye la lista de colecciones (`list-collections`), el buscador, el carrito ni otras páginas.

## Capabilities

### New Capabilities

### Modified Capabilities
- `storefront-navigation`: se añade el requirement de que, en la página de colección, el contenido quede contiguo al header, sin franja del fondo del sitio entre ambos.

## Impact

- Código: `sections/header.liquid` (condición dentro del bloque `{% style %}`).
- Sin cambios en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`.
- Relación con `remove-product-header-gap`: ese cambio sigue activo (sin archivar) y añade un requirement propio para producto; este añade el de colección como requirement independiente, de modo que ambos se pueden sincronizar y archivar en cualquier orden.
