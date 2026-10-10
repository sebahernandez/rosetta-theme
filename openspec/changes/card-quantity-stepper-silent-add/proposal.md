# Proposal

## Why

En las tarjetas de producto (portada con `featured-collection`, página de colección y demás listados) el botón "Agregar" solo suma una unidad por clic y, cada vez que se usa, abre el cajón del carrito encima de la página. Para una compra de supermercado, donde se agregan muchos productos y varias unidades de cada uno, eso obliga a cerrar el cajón una y otra vez y a abrirlo para corregir cantidades. Se pide que el propio botón permita subir y bajar la cantidad, que el carrito se actualice solo, y que el cajón se abra únicamente cuando el visitante pulsa el carrito del encabezado.

Revisión de viabilidad: es implementable con lo que ya tiene el theme. La tarjeta (`snippets/card-product.liquid`) ya conoce la variante y la cantidad que hay en el carrito, el carrito de Shopify acepta fijar la cantidad de una variante y devuelve en la misma respuesta el contador del encabezado y el contenido del cajón, y la apertura automática del cajón está concentrada en un solo punto (`renderContents` de `assets/cart-drawer.js`).

## What Changes

- **Botón "Agregar" con cantidad en la tarjeta**: en productos de una sola variante, al pulsar "Agregar" se añade una unidad al carrito y el botón se convierte, en el mismo lugar y con el mismo tamaño, en un control `−  cantidad  +`. Cada pulsación de `+` o `−` cambia la cantidad en el carrito sin ningún paso adicional de confirmación.
- **Volver a "Agregar"**: al bajar la cantidad a cero el producto sale del carrito y el control vuelve a mostrar "Agregar".
- **Cantidad real del carrito**: al cargar la página, una tarjeta cuyo producto ya está en el carrito muestra directamente el control con esa cantidad. Si la cantidad cambia desde el cajón, la página de carrito u otra tarjeta del mismo producto, todas las tarjetas visibles se ponen al día.
- **Límite de inventario**: si se pide más de lo disponible, la tarjeta muestra un aviso breve y la cantidad queda en el máximo permitido.
- **BREAKING — el cajón deja de abrirse solo**: agregar un producto desde cualquier punto de la tienda (tarjeta, ventana de selección de variantes, página de producto, tarjetas de ofertas con temporizador) ya no abre el cajón. El cajón solo se abre al pulsar el ícono del carrito del encabezado. El contenido del cajón y el contador del encabezado se siguen actualizando al instante.
- **Confirmación en el propio botón**: como ya no hay cajón que confirme, los botones "Agregar al carrito" que no llevan control de cantidad (página de producto, ofertas con temporizador, ventana de variantes) muestran durante un momento el texto "Agregado" tras añadir.
- **Sin cambios**: productos con varias variantes o con reglas de cantidad (mínimo, múltiplos) siguen abriendo la ventana "Seleccionar opciones"; productos agotados siguen con el botón deshabilitado; la modalidad "por cantidad" (`bulk`) de la sección y los tipos de carrito "página" y "notificación" conservan su comportamiento.

Supuestos registrados (confirmar al revisar):

1. "El botón aumente y decremente" se interpreta como un control que actúa directamente sobre el carrito (no un selector de cantidad seguido de un segundo clic en "Agregar").
2. "El cajón solo se abre cuando pulsamos el carrito del navbar" se aplica a toda la tienda, incluida la página de producto, no solo a las tarjetas.
3. Las tarjetas de ofertas con temporizador (`snippets/offer-product.liquid`) dejan de abrir el cajón, pero no reciben el control de cantidad en este cambio.
4. Las tarjetas horizontales de "productos complementarios" de la página de producto conservan su botón compacto actual (sin control de cantidad).

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `product-catalog`: se agregan requirements sobre el control de cantidad en la tarjeta de producto (paso de "Agregar" a `− cantidad +`, reflejo de la cantidad del carrito, sincronización entre tarjetas y con el cajón, y manejo del límite de inventario). El requirement "Tarjeta de producto unificada" no cambia.
- `cart`: cambia el requirement "Tipo de carrito configurable" (con tipo "cajón", agregar un producto ya no abre el cajón) y se agregan requirements sobre la apertura del cajón solo desde el encabezado y la confirmación de agregado sin cajón.

## Impact

- `snippets/card-product.liquid`: la rama de compra rápida estándar de una variante usa el nuevo control en lugar del `<product-form>` actual (salvo tarjetas horizontales).
- `snippets/card-quantity-add.liquid` (nuevo): marcado del control.
- `assets/card-quantity-add.js` (nuevo): custom element del control; se carga de forma diferida desde `layout/theme.liquid`.
- `assets/card-product-flexbox.css`: estilos del control.
- `assets/cart-drawer.js`: `renderContents` deja de abrir el cajón y pasa a gestionar el estado de carrito vacío.
- `assets/product-form.js`: confirmación "Agregado" en el botón tras añadir.
- `layout/theme.liquid`, `locales/en.default.json`, `locales/es.json`: carga del script y texto "Agregado".
- Listados que muestran la tarjeta con compra rápida estándar y deben probarse: portada (`templates/index.json`, tres colecciones destacadas), `main-collection-product-grid`, `featured-offers`, `product-card` / `templates/product.card.liquid`.
- Sin dependencias nuevas. Usa las rutas AJAX de carrito de Shopify ya expuestas en `window.routes`. El script externo de cart-handoff no se toca.
- Coincide en archivos con el cambio en curso `improve-product-card-ui` (`card-product.liquid`, `card-product-flexbox.css`); el control debe respetar su requirement de botón de ancho completo alineado al borde inferior.
