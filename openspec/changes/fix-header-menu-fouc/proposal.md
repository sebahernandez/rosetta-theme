## Why

Al cargar la página o navegar a otro enlace, el header y el menú principal aparecen un instante "estirados" y con los enlaces en azul (estilo por defecto del navegador), y luego saltan a su diseño final. Es un destello de contenido sin estilos (FOUC) que se repite en cada navegación y da sensación de tienda rota.

## What Changes

- Causa observada: `sections/header.liquid` (líneas 1-12) carga `component-list-menu.css`, `component-search.css`, `component-menu-drawer.css`, `component-cart-notification.css`, `component-price.css` y `component-mega-menu.css` con el patrón `media="print" onload="this.media='all'"`. Esos estilos no bloquean el render, así que el header se pinta antes de que lleguen.
- Cargar de forma bloqueante (sin `media="print"`) los CSS que afectan al header visible en el primer render: lista de menú, mega menú y buscador.
- Mantener el patrón diferido solo para CSS que no se ve al cargar (drawer móvil, notificación de carrito, precios del buscador predictivo), con `<noscript>` de respaldo.
- Reservar la altura del header para evitar saltos de layout mientras carga.
- Sin cambios de diseño ni de contenido del editor de temas.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `storefront-navigation`: se añade el requisito de que el encabezado y el menú principal se muestren con su estilo final desde el primer render.

## Impact

- Código: `sections/header.liquid` (bloque de `<link>` iniciales y, si hace falta, estilos inline de altura mínima); posible ajuste menor en `assets/component-header-redesign.css`.
- Sin impacto en `templates/*.json`, `sections/*-group.json` ni `config/settings_data.json`.
- Riesgo bajo: leve aumento de CSS bloqueante (~190 líneas en total).
