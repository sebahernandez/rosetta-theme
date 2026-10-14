# Design

## Context

Ver `proposal.md`. Estado observado:

- `.header` es una grilla `grid-template-areas: "left-icons heading icons"` con columnas `1fr 2fr 1fr` (`assets/base.css`); con `header--mobile-left` pasa a `auto 2fr 1fr`, columnas que reparten el ancho de forma proporcional y no según el contenido.
- Marcado móvil en `sections/header.liquid`: `header-drawer` (hamburguesa, `margin-left: -1.2rem`), logo `.header__heading` y `.header__icons` con búsqueda en modal, cuenta (`small-hide` cuando hay menú) y carrito (`.header__icon--cart`, 44×44px, `margin-right: -1.2rem`).
- `component-header-redesign.css` ya define la píldora verde solo en ≥ 990px; el contador en 0 se oculta con `.cart-count-bubble--zero { display: none }` global.
- Logo móvil configurado en `header-group.json`: `mobile_logo_width: 80` (home) y `other_pages_mobile_logo_width: 70`, demasiado pequeño frente al diseño. El eslogan forma parte de la imagen del logo.
- `.header` usa `padding: ... 3rem`, que en 320px deja ~260px útiles para cuatro elementos.

## Goals / Non-Goals

**Goals:**

- Reproducir en < 990px la fila del diseño: menú, logo, búsqueda, píldora del carrito.
- Cero desbordes y solapamientos desde 320px hasta 989px, con contador de 1 a 3 dígitos.

**Non-Goals:**

- No cambiar escritorio, `announcement-bar`, cajón de menú ni el modal de búsqueda.
- No rehacer el bloque duplicado del logo.

## Decisions

1. **Grilla basada en contenido**: en < 990px `.header--redesign` usa `grid-template-areas: "left-icons heading icons"` con `grid-template-columns: auto minmax(0, 1fr) auto`. Las columnas laterales miden lo que miden sus controles y el logo toma el resto con `minmax(0, 1fr)`, lo que impide que el logo empuje las acciones. Alternativa descartada: `flex` sobre un contenedor nuevo; obligaría a cambiar el marcado y a reubicar `header-drawer`.
2. **Logo fluido**: `.header__heading-logo-wrapper` con `max-width: 100%` y ancho dado por el ajuste; `justify-self: start` y `text-align: left`. Se elevan `mobile_logo_width`/`other_pages_mobile_logo_width` a un valor (≈ 150–160) calculado para que el logo más las acciones quepan a 320px; si no caben, `minmax(0, 1fr)` lo reduce proporcionalmente (`height: auto`).
3. **Píldora del carrito en móvil**: se reutilizan las reglas de la píldora de escritorio (fondo `--header-cart-pill-bg`, texto `--header-cart-pill-text`) pero compactas: altura 4rem–4.4rem, `padding: 0 1.4rem`, `gap: 0.6rem`, icono 2.2rem. El contador pasa a estático (`position: static`) con `min-width` para 1–3 dígitos, y `.cart-count-bubble--zero` se muestra también en móvil (se elimina la regla global que lo ocultaba). Las reglas de la píldora que hoy viven dentro de `@media (min-width: 990px)` se mueven fuera, dejando solo en el media query lo exclusivo de escritorio.
4. **Espaciado**: `padding` lateral del `.header` en móvil de `1.6rem`, `column-gap: 0.8rem` y `gap: 0.8rem` en `.header__icons`; se anulan los márgenes negativos (`header-drawer { margin-left }`, `.header__icon--cart { margin-right }`) que hoy compensan paddings y provocarían recortes con la píldora.
5. **Un solo punto de edición**: las reglas móviles van en `component-header-redesign.css` bajo `@media (max-width: 989px)`, junto al resto del rediseño; así se revierte con el mismo archivo. Se evita tocar `base.css`.
6. **Cuenta oculta en móvil**: se conserva `small-hide` del icono de cuenta cuando hay menú; sin menú queda visible y la fila usa el mismo espaciado.

## Risks / Trade-offs

- [El logo con eslogan es una imagen: a 320px el eslogan puede quedar ilegible] → se fija un ancho mínimo razonable y se valida a 320, 360, 390 y 768px; si no es legible, se acepta ocultar la píldora a solo icono + contador compacto.
- [Contador de 3 dígitos ensancha la píldora] → `min-width` y `white-space: nowrap`; probar con 0, 9, 10 y 99+ (el snippet no muestra el valor sobre 99).
- [Mover reglas de la píldora fuera del media query puede alterar escritorio] → verificar escritorio a 1280px antes y después.
- [Otro cambio en curso (`redisenar-navbar-header`) edita los mismos archivos] → aplicar este cambio sobre su resultado y no archivarlo antes.
- [`header-group.json` se regenera desde el editor de temas] → ajustar los anchos una vez y sincronizar con Shopify.

## Migration Plan

1. Implementar en `develop` y probar con `shopify theme dev` en las pantallas de 320, 360, 390, 768 y 989px.
2. Rollback: revertir el commit; los anchos de logo vuelven a 80/70.

## Open Questions

- Ninguna bloqueante. Supuesto registrado: el diseño móvil no incluye el icono de cuenta ni "Seguir mi pedido" en la fila; siguen disponibles en el cajón y la barra superior.
