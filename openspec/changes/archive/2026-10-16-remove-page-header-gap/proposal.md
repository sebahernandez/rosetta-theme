## Why

En las páginas personalizadas (por ejemplo "Nosotros") se ve la misma franja del color de fondo del sitio (crema) entre el header y el primer bloque blanco de contenido (unos 52 px en escritorio y 39 px en móvil). Ya se corrigió en producto y colección (`remove-product-header-gap`, `remove-collection-header-gap`); las páginas quedaron sin ajustar.

## What Changes

- Causa observada (medida con Playwright sobre `/pages/nosotros`, 52 px en escritorio y 39 px en móvil entre el header y `#MainContent`): el wrapper del header conserva `margin-bottom` del ajuste "Margen inferior" del header (`margin_bottom: 52` en `sections/header-group.json`), aplicado en `sections/header.liquid`. El margen es transparente y deja ver el fondo del `body` (`#faf7f2`).
- Extender la regla que ya anula ese margen en producto y colección a la plantilla de páginas (`template.name == 'page'`), que cubre todas las páginas personalizadas, incluidas las que usan una plantilla alternativa (`page.nosotros`, `page.contact`, `page.home-test`).
- La corrección es de código en `sections/header.liquid`, sin modificar `sections/header-group.json` ni el ajuste del editor. En las demás páginas (inicio, lista de colecciones, carrito, blog, búsqueda, cuenta) el margen configurado sigue aplicándose.

## Capabilities

### New Capabilities

### Modified Capabilities
- `storefront-navigation`: se añade el requirement de que, en las páginas personalizadas, el contenido quede contiguo al header, sin franja del fondo del sitio entre ambos.

## Impact

- Código: `sections/header.liquid` (condición dentro del bloque `{% style %}`).
- Sin cambios en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`.
- Las páginas cuyo primer bloque tenga fondo propio (por ejemplo una franja de color) quedarán pegadas al header, igual que ya ocurre en producto y colección.
