## Why

El footer de Rosetta Market no comunica qué medios de pago acepta la tienda (Pago Móvil, Zelle, Stripe). Mostrarlos bajo el logo da confianza al comprador venezolano y debe ser editable por el comerciante sin tocar código.

## What Changes

- Mostrar tres imágenes de medios de pago (Pago Móvil, Zelle, Stripe) inmediatamente debajo del logo del footer, dentro del mismo bloque visual.
- Añadir al schema de `sections/footer.liquid` un grupo "Medios de pago bajo el logo" con: checkbox de visibilidad (activo por defecto), tres `image_picker` independientes, un `range` de tamaño y un `range` de separación horizontal. Los ids llevan el prefijo `medios_pago_` para no chocar con `payment_enable` (iconos nativos de pago del footer inferior).
- Resolver en Liquid un respaldo por imagen: si el `image_picker` está vacío se usa la URL CDN predeterminada de ese medio; si hay imagen elegida, reemplaza solo ese medio.
- Añadir estilos en `assets/section-footer.css`: fila flex con `flex-wrap`, proporciones originales, sin desbordamiento horizontal y alineación coherente con el logo.
- Ocultar el grupo completo sin dejar espacio vacío cuando el checkbox está desactivado.
- No se modifica el logo, los menús, ni `sections/footer-group.json` ni otro archivo de contenido.

## Capabilities

### New Capabilities

- `footer-payment-methods`: medios de pago mostrados bajo el logo del footer, con imágenes de respaldo y personalización desde el editor de temas.

### Modified Capabilities

(ninguna: no existe un spec previo del footer)

## Impact

- `sections/footer.liquid` (rama `when 'image'` del render y bloque `{% schema %}`).
- `assets/section-footer.css` (nuevas clases `footer-payment-methods*`).
- Sin dependencias nuevas. Las URLs de respaldo son recursos CDN de Shopify ya subidos por el comerciante.
- Contenido del editor (`sections/footer-group.json`) no se toca; los ajustes nuevos tomarán sus defaults hasta que el comerciante los guarde.
