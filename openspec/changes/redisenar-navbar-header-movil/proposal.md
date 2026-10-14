# Proposal

## Why

El rediseño del navbar (`redisenar-navbar-header`) cubre solo escritorio (≥ 990px) y deja el encabezado móvil con el layout heredado (logo centrado, icono de cuenta, carrito como icono sin contador cuando está vacío). El diseño móvil objetivo presenta una sola fila compacta y coherente con la identidad del escritorio: menú hamburguesa, logo con eslogan, búsqueda y carrito como píldora verde con contador. Hay que aplicarlo sin desbordes ni solapamientos en anchos desde 320px.

## What Changes

- Encabezado móvil/tablet (< 990px) en una sola fila, de izquierda a derecha: icono de menú (hamburguesa), logo con eslogan, icono de búsqueda y píldora verde del carrito con el contador (visible también en 0).
- El logo ocupa el espacio disponible entre el menú y las acciones y se reduce de forma fluida; nunca empuja ni se superpone a las acciones.
- El icono de cuenta se mantiene oculto en móvil cuando hay menú (el cajón ya ofrece el acceso a la cuenta).
- La búsqueda móvil conserva el modal actual abierto desde el icono.
- Espaciado uniforme entre los elementos de la fila, con tamaños táctiles de al menos 44px.
- Ajuste de los anchos de logo móvil en `sections/header-group.json` para que el logo se vea como en el diseño.
- No cambia el escritorio, la barra de anuncios ni el cajón de menú.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `storefront-navigation`: nuevo requisito del encabezado en móvil (composición de la fila, carrito con contador siempre visible, ausencia de desbordes y solapamientos).

## Impact

- `assets/component-header-redesign.css` (nuevas reglas `max-width: 989px`) y, si hace falta, `sections/header.liquid` (bloque `<style>` inline de móvil).
- `snippets/cart-icon-bubble-content.liquid`: el comentario indica que el contador en 0 se oculta en móvil; esa regla cambia.
- `sections/header-group.json` (`mobile_logo_width`, `other_pages_mobile_logo_width`).
- Dependencia: este cambio se apoya en los archivos nuevos de `redisenar-navbar-header` (CSS del rediseño, snippet del carrito) y debe aplicarse después o junto con él.
