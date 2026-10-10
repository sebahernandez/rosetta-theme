# Design

## Context

Ver `proposal.md` para la motivación. Estado actual observado:

- El estado vacío vive en `snippets/cart-drawer.liquid`, dentro de `.drawer__inner-empty > .cart-drawer__warnings > .cart-drawer__empty-content`. Contiene, en este orden: `h2.cart__empty-text`, el botón de cierre, `a.button` hacia `routes.all_products_collection_url` y, si `customer == null`, `p.cart__login-title` y `p.cart__login-paragraph`.
- Los estilos de `.cart__empty-text`, `.cart__login-title` y `.cart__login-paragraph` están en `assets/component-cart.css` y los comparte la página de carrito (`sections/main-cart-items.liquid`). Solo aportan márgenes.
- `base.css` define `.button` con `min-height` de 4.5 rem y radio de 40 px (ajuste `buttons_radius`), pero en la captura el botón se ve como una franja de unos 13 px de alto y sin radio. La causa no quedó identificada en la lectura del código; se confirma en el inspector durante la implementación (tarea 1.1).
- `cart.js`, al quedar vacío el carrito, vuelve a pintar `.drawer__inner` y mueve el foco al primer `<a>` del cajón. El botón "Seguir comprando" debe seguir siendo el primer enlace del DOM.
- Color de marca usado en el theme: `#ff71db`, con `#ffd1f4` como tinte claro (ver `.product-form__submit` en `base.css`). Tipografía: Lato. El theme usa `1rem = 10px`.
- `cart_drawer_collection` está vacío en la tienda, pero el ajuste existe y el estado vacío puede mostrar una colección debajo.

## Goals / Non-Goals

**Goals:**

- Un estado vacío con jerarquía clara y un único botón principal que se vea y se sienta como botón.
- Estilos acotados al cajón, sin efecto sobre la página de carrito ni sobre otros `.button`.
- Mantener intacto el comportamiento de `cart.js` / `cart-drawer.js`.

**Non-Goals:**

- Rediseñar el cajón con productos o el estado vacío de la página de carrito.
- Añadir productos recomendados, ajustes nuevos al editor de temas o JavaScript.
- Cambiar el destino del botón o el flujo de inicio de sesión.

## Decisions

### 1. Composición

Columna centrada vertical y horizontalmente, con ancho máximo de 30 rem y texto centrado. El bloque de sesión va debajo, separado por una línea fina.

```
┌──────────────────────────────┐
│                           ✕  │
│                              │
│            ( 🛍 )            │  ícono 4 rem sobre círculo 8.8 rem, fondo #ffd1f4
│                              │
│     Tu carrito está vacío    │  h2, 2.2 rem
│  Agrega productos y          │  1.4 rem, foreground al 70 %
│  aparecerán aquí.            │
│                              │
│  ╭────────────────────────╮  │
│  │    Seguir comprando    │  │  píldora, 4.8 rem de alto, ancho 100 %
│  ╰────────────────────────╯  │
│  ──────────────────────────  │  separador, foreground al 10 %
│     ¿Tienes una cuenta?      │  1.4 rem, peso 700
│  Inicia sesión para ...      │  1.3 rem
└──────────────────────────────┘
```

El único elemento con color de marca es el círculo del ícono y el botón; el resto queda neutro para que el botón sea lo que destaca. Alternativa descartada: ilustración grande o animación de entrada; añade peso y no ayuda a la acción.

### 2. Ícono

Usar `assets/icon-cart-empty.svg` con `inline_asset_content`, como ya hace el encabezado, con `aria-hidden="true"`. Color del ícono: `#ff71db` sobre el círculo `#ffd1f4`. El trazo ocupa solo el 40 % central del `viewBox`, así que el SVG se dibuja al tamaño del círculo (8.8 rem) para que el carrito se vea de unos 3.7 rem. Alternativa descartada: un SVG nuevo; el existente ya es el ícono de carrito del theme.

### 3. Botón

Conservar la clase `.button` (hereda colores del esquema y el foco de `base.css`) y añadir un modificador `cart-drawer__empty-button` que fija de forma explícita, con selector `.cart-drawer__empty-content .cart-drawer__empty-button`:

- `display: flex`, `width: 100%`, `min-height: 4.8rem`, `padding: 0 2.4rem`
- `border-radius: 999px` (también en `::before` y `::after`, que `base.css` usa para sombra y borde)
- `font-size: 1.5rem`, `font-weight: 700`, sin `letter-spacing` heredado
- hover: fondo `#ffd1f4` y texto `#ff71db`, igual que `.product-form__submit:hover`; transición de color de 150 ms, anulada con `prefers-reduced-motion: reduce`

Fijar alto y radio de forma explícita corrige el aspecto aplastado sea cual sea la regla que hoy lo provoca. Alternativa descartada: corregir `.button` de forma global en `base.css`; afectaría a todos los botones del theme.

### 4. Bloque de inicio de sesión

Envolver título y párrafo en un `div.cart-drawer__empty-login` con `margin-top: 3.2rem`, `padding-top: 2.4rem` y borde superior. Se anulan dentro del cajón los márgenes de 5.5 rem que aporta `component-cart.css`. El enlace usa el color de texto del esquema con subrayado `#ff71db` de 2 px, en lugar del rosa claro actual, para que se lea sobre blanco. El texto y la clave `sections.cart.login.paragraph_html` no cambian; el enlace se estiliza con `.cart-drawer__empty-login a`.

### 5. Textos

- `sections.cart.empty` en `locales/es.json`: "Tu carrito está vacío".
- Clave nueva `sections.cart.empty_hint`: "Agrega productos y aparecerán aquí." en `es.json` y "Add products and they will show up here." en `en.default.json`. Los demás idiomas caen en el texto por defecto.

Alternativa descartada: escribir el texto directo en el Liquid; el snippet es heredado de Refresh y todos sus textos vienen de `locales/`.

### 6. Ubicación de los estilos

Todo en `assets/component-cart-drawer.css`, con selectores bajo `.cart-drawer__empty-content`. No se toca `component-cart.css`. El botón de cierre conserva su posición absoluta actual.

## Risks / Trade-offs

- [El texto blanco del botón sobre `#ff71db` tiene contraste bajo] → Es el color de botón que ya usa toda la tienda; se mantiene por coherencia y se compensa con peso 700 y 1.5 rem. Cambiarlo es una decisión de marca fuera de este cambio.
- [La causa del botón aplastado puede ser una regla que también afecte a otros botones] → La tarea 1.1 la identifica en el inspector; si es una regla global dañina, se informa y no se corrige aquí.
- [`shopify theme check` puede marcar la clave nueva como faltante en otros idiomas] → Comparar con las ofensas previas; si aparece una ofensa nueva de traducciones, añadir la clave con el texto en inglés a los idiomas que la reclamen.
- [Con `cart_drawer_collection` configurado, el estado vacío comparte alto con la tarjeta de colección] → Probar ese caso en el editor de temas y dejar que la columna se desplace si no cabe.
