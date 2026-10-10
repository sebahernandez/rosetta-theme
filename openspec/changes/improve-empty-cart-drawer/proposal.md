# Proposal

## Why

El estado vacío del cajón del carrito se ve descuidado: el botón "Seguir comprando" aparece como una franja rosa aplastada, sin alto ni forma de botón; el título tiene una falta de ortografía ("esta vacío"); el enlace "Inicia sesión" en rosa claro sobre blanco apenas se lee, y los bloques flotan sin jerarquía ni indicación de qué hacer. Es la primera pantalla que ve quien abre el carrito antes de comprar, y hoy no invita a seguir.

## What Changes

- Rediseñar el estado vacío del cajón como una composición centrada y con jerarquía: ícono de carrito, título, una línea de apoyo y el botón principal.
- Convertir "Seguir comprando" en un botón real: forma de píldora, alto táctil de al menos 44 px, ancho completo del contenido y estados de hover y foco visibles.
- Añadir una línea de apoyo bajo el título que indique qué hacer ("Agrega productos y aparecerán aquí.").
- Presentar la invitación a iniciar sesión como un bloque secundario separado del botón principal, con el enlace legible.
- Corregir el texto "Tu carrito esta vacío" a "Tu carrito está vacío".
- Sin cambios en el cajón con productos, en la página de carrito ni en la lógica del carrito.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `cart`: se añade un requirement sobre la presentación del estado vacío del cajón (contenido, botón principal, invitación a iniciar sesión y accesibilidad). Los requirements existentes no cambian.

## Impact

- `snippets/cart-drawer.liquid`: marcado del bloque `.drawer__inner-empty`.
- `assets/component-cart-drawer.css`: estilos nuevos acotados al estado vacío del cajón.
- `locales/es.json` y `locales/en.default.json`: corrección de `sections.cart.empty` (solo `es`) y clave nueva para la línea de apoyo. La corrección ortográfica también se refleja en la página de carrito, que usa la misma clave.
- Sin cambios en JavaScript (`cart.js`, `cart-drawer.js`), en ajustes del theme ni en dependencias.
