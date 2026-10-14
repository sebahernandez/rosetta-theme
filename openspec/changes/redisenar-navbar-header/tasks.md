# Tasks

## 1. Carrito como píldora con contador siempre visible

- [x] 1.1 Crear el snippet `snippets/cart-icon-bubble-content.liquid` con el icono, el texto `visually-hidden` y `.cart-count-bubble` que muestra siempre `cart.item_count` (0 incluido); verificar que el HTML renderizado contiene el contador con el carrito vacío.
- [ ] 1.2 Usar el snippet en `sections/header.liquid` (`#cart-icon-bubble`) y en `sections/cart-icon-bubble.liquid`; verificar en `shopify theme dev` que al agregar y quitar un producto (ficha, listado y drawer) el contador se actualiza sin recargar y vuelve a 0 al vaciar el carrito.

## 2. Buscador en línea

- [ ] 2.1 Crear `snippets/header-search-inline.liquid` con el campo "¿Qué estás buscando?", icono y botón "Buscar", reutilizando el formulario y los contenedores de `predictive-search`, con id de input propio; verificar que escribir muestra sugerencias y que enviar lleva a `/search?q=`.
- [x] 2.2 Hacer que `StickyHeader.closeSearchModal()` en `header.liquid` tolere la ausencia de `details-modal`; verificar que no hay errores en consola al hacer scroll arriba/abajo.

## 3. Estructura de dos filas y ajustes del esquema

- [x] 3.1 Agregar al esquema de `sections/header.liquid` los ajustes `show_order_tracking`, `order_tracking_text`, `order_tracking_link` y `secondary_menu_handle` (con etiquetas); verificar que aparecen en el editor de temas y que `shopify theme check` no reporta errores nuevos.
- [ ] 3.2 Reorganizar el marcado del `<header>`: fila 1 (logo, buscador en línea, "Seguir mi pedido", cuenta, carrito) y fila 2 (`header__nav-row` con el menú); verificar en escritorio que ambas filas quedan dentro de `sticky-header` y que el sticky y `--header-height` siguen funcionando.
- [ ] 3.3 Renderizar el menú secundario con divisor vertical en `snippets/header-mega-menu.liquid` y `snippets/header-dropdown-menu.liquid`; verificar con y sin menú secundario asignado.

## 4. Estilos

- [ ] 4.1 Crear `assets/component-header-redesign.css` (media query ≥ 990px) con el layout de dos filas, campo y botón de búsqueda, enlace "Seguir mi pedido", píldora verde del carrito y franja del menú, y cargarlo desde `header.liquid`; verificar visualmente contra el diseño a 1280px y 1440px.
- [ ] 4.2 Ocultar el buscador en línea y el enlace "Seguir mi pedido" por debajo de 990px y mantener el icono de búsqueda modal y el cajón de menú; verificar en móvil y tablet que el encabezado es idéntico al actual.

## 5. Integración y entrega

- [x] 5.1 Ajustar los valores en `sections/header-group.json` (menú secundario, enlace de seguimiento) y confirmar que `announcement-bar` no cambió (`git diff` sin cambios en sus líneas).
- [ ] 5.2 Recorrer el menú con teclado y con el mega menú abierto, y probar el hover de los enlaces; verificar foco visible y `aria-*` correctos; ejecutar `shopify theme check` sin errores nuevos.
- [ ] 5.3 Hacer commit con mensaje convencional y push a `develop`.
