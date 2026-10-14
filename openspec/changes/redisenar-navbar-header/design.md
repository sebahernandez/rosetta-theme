# Design

## Context

Ver `proposal.md` para la motivación. Estado actual observado:

- `sections/header.liquid` (830 líneas) renderiza una sola fila `<header class="header header--middle-left ...">` con logo, menú (`header-mega-menu` o `header-dropdown-menu`) e `header__icons` (búsqueda en modal vía `snippets/header-search.liquid`, cuenta y carrito). El bloque del logo está duplicado (rama `middle-center` y rama normal).
- `sections/header-group.json` usa `menu_type_desktop: mega`, `color_scheme: scheme-2`, `menu_color_scheme: scheme-3`, `sticky_header_type: on-scroll-up`. Sobre el header hay `announcement-bar` (esquema 3, enlaces "Seguír mi pedido" y "Ayuda"), que no se modifica.
- El contador del carrito se actualiza sustituyendo el contenido de `#cart-icon-bubble` con el HTML de `sections/cart-icon-bubble.liquid` (usado por `cart.js`, `cart-drawer.js`, `cart-notification.js`, `quick-add-bulk.js`, `card-quantity-add.js`, `quick-order-list.js`). Esa sección hoy NO renderiza el contador cuando el carrito está vacío.
- `StickyHeader` (JS en `header.liquid`) llama `closeSearchModal()` con `this.header.querySelector('details-modal')` sin comprobar `null`.
- Los botones del theme usan `scheme-*` con `button: #ff71db` (rosa), coherente con el botón "Buscar" del diseño.

## Goals / Non-Goals

**Goals:**

- Reproducir en escritorio (≥ 990px) el layout de dos filas del diseño, controlable desde el editor de temas.
- Reutilizar búsqueda predictiva, esquemas de color y mecanismo de actualización del carrito existentes.
- Conservar sticky, mega menú y accesibilidad (foco, `aria-*`, `visually-hidden`).

**Non-Goals:**

- No tocar `announcement-bar` ni su contenido.
- No rediseñar el encabezado móvil/tablet (< 990px) ni el cajón de menú.
- No cambiar el carrito (drawer, notificación) ni la página de resultados de búsqueda.
- No refactorizar la duplicación del bloque del logo (se evalúa aparte).

## Decisions

1. **Dos filas dentro del mismo `<header>`, no dos secciones.** La fila 2 (`header__nav-row`) vive dentro de `sticky-header` para que ambas filas hagan sticky juntas y compartan `--header-height`. Alternativa descartada: sección separada para el menú — rompería el sticky y obligaría a sincronizar alturas.
2. **Buscador en línea como snippet nuevo `header-search-inline`**, que renderiza el mismo `<form>` y las mismas clases/contenedores de `predictive-search` que `header-search`, sin `<details-modal>`. El icono modal se oculta en ≥ 990px con CSS y el campo en línea se oculta por debajo. Alternativa: transformar el modal existente con CSS — frágil, porque el modal es un `<details>` con overlay y foco atrapado.
3. **Grupo secundario con un ajuste de texto `secondary_menu_handle`** (handle de un menú, resuelto con `linklists[handle]`; Shopify solo permite un `link_list` por sección, por lo que un segundo selector de menú no es válido) en vez de inferirlo del menú principal (p. ej. por posición o handle). Razón: es explícito, editable por el comerciante y no se rompe al reordenar enlaces. Se renderiza tras el menú principal con un `<li>` divisor (`header__menu-divider`). Solo enlaces de primer nivel (sin submenús). Alternativa: un único menú con un enlace-separador — hackeable pero opaco para el comerciante.
4. **"Seguir mi pedido" como ajustes de la sección**: `show_order_tracking` (checkbox, default true), `order_tracking_text` (default "Seguir mi pedido") y `order_tracking_link` (`url`, default `shopify://pages/orden-de-seguimiento`, el mismo destino que ya usa la barra superior). Se oculta en < 990px, donde el enlace sigue disponible en la barra superior.
5. **Carrito como píldora con contador siempre presente.** Se extrae el marcado del contenido del carrito a un snippet `cart-icon-bubble-content` usado por `header.liquid` y por `sections/cart-icon-bubble.liquid`, y se renderiza siempre `.cart-count-bubble` con el valor (0 incluido) en escritorio. Es obligatorio tocar ambos archivos: si solo se cambia el header, la píldora perdería el "0" tras el primer refresco de sección. El estilo de la píldora (fondo verde menta, texto oscuro) se define con CSS propio del header. Colores del diseño (menta, rosa) como variables CSS con fallback, sin editar `settings_data.json`.
6. **Estilos en un asset nuevo `component-header-redesign.css`** cargado desde `header.liquid`, con media query `min-width: 990px`, en lugar de ampliar `base.css` (ya de ~2800+ líneas y heredado de Refresh) o el bloque `<style>` inline. Facilita revertir el cambio.
7. **Robustez del sticky**: `closeSearchModal()` pasa a `this.searchModal?.close(false)` para no fallar si no hay `details-modal` en el DOM de escritorio.

## Risks / Trade-offs

- [Alturas: el sticky usa `--header-height`] → la fila 2 va dentro de `sticky-header` y se verifica con scroll arriba/abajo y con el mega menú abierto.
- [Dos buscadores en el DOM (en línea + modal móvil) duplican `id` de inputs] → ids distintos (`Search-In-Inline`, `Search-In-Modal`) y verificar que la búsqueda predictiva funcione en ambos.
- [`header-group.json` lo regenera el editor de temas] → los valores por defecto viven en el esquema; los de `header-group.json` se ajustan una sola vez y se sincronizan con Shopify.
- [Cambiar el marcado de `#cart-icon-bubble` rompe los refrescos de contador] → un único snippet compartido y prueba de agregar/quitar productos desde ficha, listado y drawer.
- [Los enlaces del menú principal pueden ser más de los que caben en la fila] → permitir `flex-wrap`/scroll horizontal controlado y probar en 990–1280px.
- [Texto "Seguir mi pedido" duplicado con la barra superior] → aceptado: la barra superior no se toca; ver pregunta abierta.

## Migration Plan

1. Implementar en la rama `develop` y probar con `shopify theme dev`.
2. Tras publicar, asignar el menú secundario en el editor de temas (los enlaces Ofertas, Más vendidos, Nosotros, Contacto deben salir del menú `main-menu` y pasar a un menú nuevo para evitar duplicados).
3. Rollback: revertir el commit; los ajustes nuevos quedan sin efecto en el esquema anterior.

## Open Questions

- La barra superior actual muestra "Seguír mi pedido" (con tilde errónea) y "Ayuda"; en el diseño solo aparece "Ayuda". Se asume que la barra no se modifica, por lo que el enlace quedaría duplicado hasta que el comerciante lo desactive desde `show_info_links`/`info_link_1`, lo cual es configuración y no cambia este plan.
