# Tasks

## 1. Grilla y espaciado de la fila móvil

- [x] 1.1 En `assets/component-header-redesign.css` agregar `@media (max-width: 989px)` para `.header--redesign` con `grid-template-columns: auto minmax(0, 1fr) auto`, `column-gap: 0.8rem` y padding lateral de `1.6rem`; anular los márgenes negativos de `header-drawer` y `.header__icon--cart` en móvil; verificar a 320px que no hay scroll horizontal.
- [x] 1.2 Alinear el logo a la izquierda (`justify-self: start`, `text-align: left`) con `max-width: 100%` y `height: auto`; verificar que logo y acciones no se superponen a 320, 360 y 390px.

## 2. Carrito como píldora en móvil

- [x] 2.1 Mover las reglas de la píldora verde de `.header__icon--cart` fuera del media query de escritorio y compactarlas para móvil (altura 4rem–4.4rem, padding `0 1.4rem`, icono 2.2rem, contador estático con `min-width` y `white-space: nowrap`); verificar escritorio sin cambios a 1280px.
- [x] 2.2 Mostrar el contador en 0 también en móvil (quitar la regla global `.cart-count-bubble--zero { display: none }` y actualizar el comentario de `snippets/cart-icon-bubble-content.liquid`); verificar con carrito vacío, 9, 10 y 99 artículos y tras agregar un producto sin recargar.

## 3. Logo y ajustes

- [x] 3.1 Subir `mobile_logo_width` y `other_pages_mobile_logo_width` en `sections/header-group.json` hasta que el logo con eslogan se vea como en el diseño y quepa a 320px; verificar en home y en otra página.

## 4. Verificación y entrega

- [x] 4.1 Probar el cajón de menú, el modal de búsqueda y el sticky header en móvil; comprobar que el cajón se abre desde la hamburguesa y que el icono de búsqueda responde (objetivos táctiles ≥ 44px); revisar 768px y 989px.
- [x] 4.2 Ejecutar `shopify theme check` sin errores nuevos y comparar contra el diseño en 390px.
- [x] 4.3 Hacer commit con mensaje convencional y push a `develop`.
