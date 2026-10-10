# Proposal

## Why

La lista de favoritos actual guarda los productos únicamente en el `localStorage` del navegador del visitante, así que la tienda no recibe ningún dato: no se puede medir qué productos se guardan, cuántos visitantes la usan ni cruzarla con clientes o ventas. Los favoritos se van a reconstruir con otra solución que sí entregue métricas, y mantener mientras tanto la integración actual solo agrega un botón en cada tarjeta, un botón flotante en todas las páginas y ~1.900 líneas de JavaScript sin utilidad para el negocio.

## What Changes

- **BREAKING** Se retira el botón de favoritos (corazón) de la tarjeta de producto y de la tarjeta de oferta.
- **BREAKING** Se retira el botón flotante "Tus Favoritos" con su contador de todas las páginas.
- **BREAKING** Se retira la página de favoritos (`/pages/favoritos`, plantilla de página `wishlist`); la URL pasa a redirigir a la portada.
- **BREAKING** Se retira el grupo de ajustes "Wishlist" del theme (`Enable Wishlist`, `Enable Floating Button`, `Floating Button Position`).
- Se eliminan los scripts, snippets, plantillas, sección y estilos que solo existían para favoritos, incluidos dos scripts que ya no se cargaban (`wishlist.js`, `wishlist-utils.js`).
- La pila de insignias de la tarjeta deja de reservar el hueco del corazón cuando se ubica arriba a la derecha.
- Se deja una guía de reimplementación junto a la spec de favoritos (`openspec/specs/wishlist/reimplementacion.md`) con el comportamiento que tenía, el modelo de datos, los puntos de integración, cómo recuperar el código desde git y las debilidades conocidas, por si en el futuro se quiere volver a esta solución.
- Los favoritos que los visitantes ya tienen guardados en su navegador no se borran: quedan sin uso y sin efecto visible.

Fuera de alcance: la nueva solución de favoritos con métricas (será un cambio aparte).

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `wishlist`: se retiran los cinco requirements de la lista de favoritos basada en el navegador (activación por ajustes, agregar/quitar, persistencia, página de favoritos y botón flotante) y se agrega uno que deja explícito que la tienda no ofrece favoritos hasta que exista la nueva solución.
- `product-catalog`: la tarjeta de producto unificada deja de incluir el botón de favoritos; se ajustan los requirements de la tarjeta que lo mencionan (ubicación de insignias, tamaños táctiles y componentes preservados).

## Impact

- **Se eliminan**: `assets/wishlist-refactored.js`, `assets/wishlist.js`, `assets/wishlist-utils.js`, `snippets/wishlist.liquid`, `templates/page.wishlist.liquid`, `templates/product.card.liquid`, `sections/product-card.liquid`.
- **Se editan**: `layout/theme.liquid` (carga del script, botón flotante y estilos en línea), `snippets/card-product.liquid`, `snippets/offer-product.liquid`, `assets/base.css`, `assets/card-product-flexbox.css`, `config/settings_schema.json`, `config/settings_data.json`.
- **Se conserva**: Font Awesome (lo usan otros íconos del theme) y la clase `.custom-btn-icon` (la usa el botón "Vista rápida" de la tarjeta de oferta).
- **Admin de Shopify (manual)**: eliminar la página "Favoritos", crear la redirección `/pages/favoritos` → `/` y quitar cualquier enlace a favoritos de los menús de navegación.
- **Dependencia con otro cambio**: `improve-product-card-ui` (activo, 21/24 tareas) agrega a `product-catalog` requirements que mencionan favoritos y su tarea 4.3 prueba el corazón. Debe archivarse antes de aplicar este cambio.
- **Specs**: `openspec/specs/wishlist/` y `openspec/specs/product-catalog/`.
