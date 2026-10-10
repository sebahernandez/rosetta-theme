# Tasks

## 1. Diagnóstico y textos

- [x] 1.1 Con `shopify theme dev`, abrir el cajón vacío e identificar en el inspector qué regla deja el botón "Seguir comprando" sin alto ni radio; anotar el selector y el archivo en la descripción del commit, y avisar si es una regla global que afecta a otros botones
- [x] 1.2 Corregir `sections.cart.empty` en `locales/es.json` a "Tu carrito está vacío"; verificar con `grep -n '"empty": "Tu carrito está vacío"' locales/es.json`
- [x] 1.3 Añadir la clave `sections.cart.empty_hint` en `locales/es.json` ("Agrega productos y aparecerán aquí.") y en `locales/en.default.json` ("Add products and they will show up here."); verificar que ambos archivos siguen siendo JSON válido con `python3 -m json.tool` sobre cada uno

## 2. Marcado del estado vacío (`snippets/cart-drawer.liquid`)

- [x] 2.1 Añadir antes del título el ícono `icon-cart-empty.svg` con `inline_asset_content` dentro de un `span.cart-drawer__empty-icon` con `aria-hidden="true"`; verificar que el ícono aparece sobre el título en el cajón vacío
- [x] 2.2 Añadir bajo el título un `p.cart-drawer__empty-hint` con `sections.cart.empty_hint`; verificar que la línea de apoyo se muestra en español
- [x] 2.3 Añadir la clase `cart-drawer__empty-button` al enlace "Seguir comprando" sin cambiar su `href` y manteniéndolo como primer `<a>` del cajón; verificar que al eliminar la última línea con el cajón abierto el foco queda en ese botón
- [x] 2.4 Envolver `cart__login-title` y `cart__login-paragraph` en un `div.cart-drawer__empty-login` dentro de la condición `customer == null`; verificar que con sesión iniciada el bloque no se renderiza
- [x] 2.5 Ejecutar `shopify theme check` y verificar que no aparecen ofensas nuevas en `snippets/cart-drawer.liquid` ni en `locales/` respecto al estado previo (si aparece una de traducciones faltantes, aplicar la mitigación de `design.md`)

## 3. Estilos (`assets/component-cart-drawer.css`)

- [x] 3.1 Dar a `.cart-drawer__empty-content` la composición de la decisión 1 de `design.md` (columna centrada, ancho máximo 30 rem, texto centrado) y anular dentro del cajón los márgenes heredados de `.cart__empty-text` y `.cart__login-title`; verificar que el contenido queda centrado en el cajón a 1280 px
- [x] 3.2 Añadir los estilos del ícono (círculo de 8.8 rem con fondo `#ffd1f4`, ícono `#ff71db` de 4 rem), del título (2.2 rem) y de la línea de apoyo (1.4 rem, texto al 70 %); verificar las medidas en el inspector
- [x] 3.3 Añadir los estilos del botón según la decisión 3 (ancho 100 %, `min-height: 4.8rem`, radio de píldora también en `::before` y `::after`, peso 700, hover `#ffd1f4`/`#ff71db`, transición anulada con `prefers-reduced-motion`); verificar en el inspector que el botón mide al menos 44 px de alto y que el hover cambia de color
- [x] 3.4 Añadir los estilos de `.cart-drawer__empty-login` según la decisión 4 (separador superior, tamaños de texto, enlace con color de texto y subrayado `#ff71db`); verificar que "Inicia sesión" se lee sobre el fondo blanco y lleva a la página de inicio de sesión
- [x] 3.5 Verificar que la página de carrito vacía (`/cart`) se ve igual que antes salvo la tilde de "está", confirmando que los estilos nuevos no la alcanzan

## 4. Verificación integral

- [x] 4.1 Ejecutar `shopify theme check` sobre el theme completo y verificar que no hay ofensas nuevas en los archivos modificados
- [x] 4.2 Prueba manual a 375 px y a 1280 px del cajón vacío sin sesión y con sesión: orden de los elementos, botón, bloque de sesión, cierre del cajón y ausencia de desplazamiento horizontal
- [x] 4.3 Prueba manual de transición: agregar un producto, abrir el cajón, eliminarlo y comprobar que aparece el estado vacío nuevo; luego agregar otro y comprobar que el cajón con productos no cambió
- [x] 4.4 Recorrer el estado vacío con el tabulador y verificar foco visible en cierre, botón y enlace de inicio de sesión
- [x] 4.5 Prueba manual en el editor de temas: abrir el cajón vacío, y asignar temporalmente una colección en "Colección del cajón del carrito" para comprobar que el estado vacío y la tarjeta de colección conviven sin descuadrarse; dejar el ajuste como estaba
- [x] 4.6 Hacer commit en `develop` con los archivos del theme y la carpeta `openspec/changes/improve-empty-cart-drawer/`, y hacer push a `origin/develop`; verificar con `git status -sb` que la rama no queda por delante del remoto
