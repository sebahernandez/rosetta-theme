## Context

El header del theme (`sections/header.liquid`) carga seis CSS con `media="print" onload="this.media='all'"`, patrón heredado de Refresh para diferir CSS no crítico. Para el header visible esto es contraproducente: el navegador pinta HTML con solo `base.css` y `component-header-redesign.css`, y los estilos de menú/buscador llegan después. Resultado: enlaces azules por defecto y layout estirado, en cada navegación.

## Goals / Non-Goals

**Goals:**
- Eliminar el FOUC del header y el menú principal.
- Mantener el rendimiento: diferir solo lo que no se ve en el primer render.

**Non-Goals:**
- Rediseñar el header ni cambiar contenido del editor.
- Introducir build step o bundling.

## Decisions

1. **Bloquear `component-list-menu.css`, `component-mega-menu.css` y `component-search.css`** (usar `<link rel="stylesheet">` normal). Son los que estilan menú y buscador visibles. Alternativa descartada: inlinear CSS crítico; añade duplicación y mantenimiento sin build.
2. **Mantener diferidos** `component-menu-drawer.css`, `component-cart-notification.css` y `component-price.css` (solo aparecen tras interacción), añadiendo `<noscript>` con el `<link>` normal.
3. **Reservar altura del header** con `min-height` en el contenedor, si tras (1) aún hay salto por el logo. Se decide al verificar en el navegador.
4. Hipótesis a confirmar al implementar: el azul podría venir también de otra fuente (p. ej. barra de carga de Shopify/preview). Se verifica con "Slow 3G" y con la hoja bloqueada antes de dar el fix por bueno.

## Risks / Trade-offs

- Más CSS bloqueante (~190 líneas) → retraso mínimo del primer render; aceptable frente al destello.
- `component-mega-menu.css` solo se carga si `menu_type_desktop == 'mega'`; se conserva esa condición.
