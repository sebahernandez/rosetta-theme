## Why

En la página de producto se ve una franja del color de fondo del sitio (crema) entre el header y el contenedor blanco del producto (unos 52 px en escritorio y 39 px en móvil). Rompe la continuidad visual: el header y el bloque blanco parecen separados por un hueco.

## What Changes

- Causa observada (medida con Playwright sobre `/products/...`): el `div.section-header` del header tiene `margin-bottom: 52px` en escritorio y `39px` en móvil. Ese valor viene del ajuste "Margen inferior" del header, guardado como `margin_bottom: 52` en `sections/header-group.json`, y lo aplica `sections/header.liquid` (líneas 104-113). El margen es transparente y deja ver el fondo del `body` (`#faf7f2`, añadido en `set-body-background-color`); antes el body era blanco y el hueco no se notaba.
- En la plantilla de producto, el header no deja margen inferior: el contenedor del producto queda pegado al header, sin franja visible entre ambos.
- La corrección se hace en código (`sections/header.liquid`, condicionada a la plantilla de producto) para no modificar `sections/header-group.json` ni el ajuste del editor. En el resto de páginas el margen configurado sigue aplicándose igual.
- Alcance: solo la página de producto, que es lo solicitado. La página de colección muestra la misma franja; se deja fuera de este cambio y puede tratarse aparte.

## Capabilities

### New Capabilities

### Modified Capabilities
- `storefront-navigation`: se añade el requirement de que, en la página de producto, el contenido principal quede contiguo al header, sin franja del fondo del sitio entre ambos.

## Impact

- Código: `sections/header.liquid` (bloque `{% style %}`).
- Sin cambios en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`. El ajuste "Margen inferior" del header se conserva y sigue rigiendo en las demás páginas.
