# Design

## Context

El theme (Refresh/Dawn) no tiene carpeta `blocks/`; las secciones propias (p. ej. `destacados-home`) usan bloques de sección planos, estilos con `{% stylesheet %}` y ajustes de espaciado en el propio schema. El carrito es de tipo cajón y no se abre al agregar: `product-form.js` y `card-quantity-add.js` llaman a `cart-drawer.renderContents(...)` y publican `PUB_SUB_EVENTS.cartUpdate`; el cajón solo se abre al pulsar el ícono. Ver `proposal.md` para la motivación.

## Goals / Non-Goals

**Goals:**
- Sección totalmente editable con bloques planos, siguiendo las convenciones de `destacados-home`.
- Botón "+" que reutiliza el flujo de carrito existente sin abrir el cajón.

**Non-Goals:**
- Selector de variantes en la fila (se usa la primera variante disponible).
- Stepper de cantidad o equivalente en bolívares (no se pide en el diseño).
- Cambiar el comportamiento de `cart-drawer` o de las tarjetas de producto existentes.

## Decisions

1. **Bloques planos con asociación por orden.** Tipos: `eyebrow`, `heading`, `subtitle`, `collection` (tarjeta) y `product`. Un `product` pertenece a la tarjeta `collection` anterior; al renderizar se recorre `section.blocks` abriendo una tarjeta en cada `collection` y cerrándola al llegar a la siguiente. *Alternativa:* theme blocks anidados (`blocks/*.liquid`): modelan mejor la jerarquía, pero introducen una arquitectura que el theme no usa. Los `product` huérfanos (antes de la primera tarjeta) no se renderizan.
2. **Custom element `seleccionado-add` en `assets/seleccionado.js`.** Hace `POST` a `routes.cart_add_url + '.js'` con `{ items: [{ id, quantity: 1 }], sections: ['cart-drawer','cart-icon-bubble'], sections_url }`, llama a `cartDrawer.renderContents(state)` (sin `open()`), y publica `cartUpdate`. *Alternativa:* reutilizar `card-quantity-add`: añade un stepper no pedido en el diseño y estado por variante. *Alternativa:* `product-form`: pensado para `<form>` completos y abre el flujo de notificación/drawer según configuración.
3. **Variante:** primera variante disponible (`product.selected_or_first_available_variant`); si ninguna está disponible el botón se deshabilita.
4. **Imágenes:** `image_picker` por tarjeta, renderizado con `image_url` + `image_tag` (lazy, `sizes` y `srcset`). La miniatura del producto es `product.featured_media`.
5. **Colores y acento del título:** el título admite un segundo ajuste de texto de acento (cursiva, `--font-heading-family`/itálica del theme) con color propio; los colores de fondo por tarjeta son ajustes del bloque `collection`.
6. **Textos en español escritos en el Liquid** solo para valores por defecto y `aria-label`, como en las demás secciones propias.

## Risks / Trade-offs

- [El orden de bloques define la pertenencia y puede confundir] → Los `info` del schema y nombres de bloque claros ("Tarjeta de colección", "Producto (de la tarjeta anterior)").
- [Doble clic crea solicitudes duplicadas] → El elemento ignora clics mientras hay una solicitud en curso.
- [Cantidad máxima del inventario] → Se muestra el mensaje de error devuelto por Shopify en la fila (`aria-live`).
- [Producto con variantes] → Solo se agrega la primera variante disponible; el enlace a la página permite elegir otra.

## Migration Plan

Código nuevo y aislado: no hay migración. El comerciante añade la sección en el editor de temas y carga contenido; el flujo del repo es subir el código, guardar en el editor y hacer `git pull origin develop`. Rollback: quitar la sección del editor o revertir el commit.
