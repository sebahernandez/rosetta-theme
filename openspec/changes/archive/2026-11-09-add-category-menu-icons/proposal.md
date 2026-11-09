# Proposal

## Why

En el panel de categorías (escritorio) y en el cajón móvil cada categoría principal ya reserva un hueco de 24px para un icono, pero hoy está vacío porque no hay bloques `category_icon` configurados y los iconos disponibles en el theme son rellenos y se pintan en rosa. El resultado es un espacio en blanco a la izquierda de cada categoría que no aporta nada y dificulta escanear la lista.

## What Changes

- Añadir 9 iconos de línea (trazo, sin relleno) de una librería open source (Lucide, licencia ISC), uno por categoría principal: Panadería y pastelería, Bebidas sin alcohol, Cigarrillos y tabaco, Confitería y snacks, Cuidado personal, Lácteos y refrigerados, Licores y cervezas, Limpieza y hogar, Víveres y despensa.
- Mostrar esos iconos por defecto junto a cada categoría principal, sin que el comerciante tenga que crear bloques, tanto en el panel de escritorio como en el cajón móvil.
- Pintar los iconos de categoría en negro (no en el rosa de acento), también en hover y en la categoría seleccionada.
- Mantener el hueco y los espacios actuales: el icono ocupa exactamente el espacio reservado (24px) con la misma separación respecto al texto; no cambia el alto de las filas ni el layout responsive.
- Los bloques `category_icon` existentes siguen funcionando y, si existen, tienen prioridad sobre el icono por defecto; los 9 iconos nuevos se añaden a su selector.

## Capabilities

### New Capabilities

_(ninguna)_

### Modified Capabilities

- `storefront-navigation`: el requirement "Iconos de categoría configurables" pasa a incluir iconos de línea negros por defecto para las 9 categorías principales, con los bloques como sobrescritura.

## Impact

- Código: `snippets/header-categories-icon.liquid` (icono por defecto por handle), `assets/component-categories-menu.css` (color negro y tamaño del trazo), `sections/header.liquid` (nuevas opciones en el select del bloque `category_icon`), 9 SVG nuevos en `assets/`.
- Sin cambios en contenido del editor (`sections/header-group.json`, `templates/*.json`, `config/settings_data.json`).
- Sin dependencias externas en runtime: los SVG se copian al repo e inyectan con `inline_asset_content`.
