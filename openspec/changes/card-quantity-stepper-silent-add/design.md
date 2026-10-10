# Design

## Context

Motivación y alcance: ver `proposal.md`. Estado actual observado en el código:

- **Tarjeta** (`snippets/card-product.liquid`, líneas 329-431): con `quick_add == 'standard'` y una sola variante sin reglas de cantidad, renderiza un `<product-form>` con un `<form>` de producto y el botón `.quick-add__submit` "Agregar". Con varias variantes o reglas de cantidad abre `<quick-add-modal>`. Agotado: botón `disabled`.
- **Envío al carrito** (`assets/product-form.js`): hace `POST` a `routes.cart_add_url` pidiendo las secciones `cart-drawer` y `cart-icon-bubble`, publica `PUB_SUB_EVENTS.cartUpdate` y llama a `this.cart.renderContents(response)`.
- **Apertura del cajón** (`assets/cart-drawer.js`): `renderContents` reemplaza `#CartDrawer` y `#cart-icon-bubble` y termina con `this.open()`. Es el único punto que abre el cajón tras agregar; el otro `open()` es el clic/teclado sobre `#cart-icon-bubble` del encabezado (`setHeaderCartIconAccessibility`). `renderContents` solo lo llama `product-form.js`.
- **Refresco del cajón**: `cart-drawer-items` (`assets/cart.js`) escucha `cartUpdate` y, si el origen no es `cart-items`, vuelve a pedir la sección `cart-drawer`. Los cambios hechos dentro del cajón publican `cartUpdate` con `source: 'cart-items'` y el estado completo del carrito.
- **Modalidad `bulk` existente** (`assets/quick-add-bulk.js` + `snippets/quantity-input.liquid`): ya es un selector de cantidad que escribe en el carrito sin abrir el cajón, pero no sirve tal cual: muestra siempre `− 0 +` en vez de "Agregar", depende de un ancestro `.collection-quick-add-bulk` con `data-id`, lee `this.dataset.id` cuando el marcado solo define `data-index`, y usa `this.cart` sin definirlo. Arrastra además `quick-order-list.js`, `quantity-popover.js` y `price-per-item.js`.
- **Uso en la tienda**: `templates/index.json` (tres `featured-collection`) y `templates/collection.json` usan `quick_add: "standard"`; `config/settings_data.json` tiene `cart_type: "drawer"`.
- **Estilos**: el botón es una píldora rosa (`#ff71db`) de 4.4 rem de alto y ancho completo, definida en `assets/circular-add-to-cart.css` (global, con `!important`) y `assets/card-product-flexbox.css` (acotada a `.product-card-wrapper`).
- El cambio en curso `improve-product-card-ui` tiene tareas pendientes sobre los mismos dos archivos de la tarjeta.

## Goals / Non-Goals

**Goals:**

- Un único componente nuevo, autocontenido, que no dependa de la sección que renderiza la tarjeta.
- La cantidad mostrada es siempre la del carrito (fuente de verdad: Shopify), con respuesta visual inmediata.
- Quitar la apertura automática del cajón tocando un solo punto.
- No romper la modalidad `bulk` ni los tipos de carrito "página" y "notificación".

**Non-Goals:**

- Arreglar o retirar la modalidad `bulk`.
- Control de cantidad en `snippets/offer-product.liquid` ni en las tarjetas horizontales de productos complementarios.
- Nuevo ajuste en el editor de temas para activar/desactivar el control o la apertura del cajón.
- Cambios en la página de carrito, en el contenido del cajón o en el script de cart-handoff.

## Decisions

### 1. Custom element nuevo `card-quantity-add` en vez de reutilizar `quick-add-bulk`

Marcado en `snippets/card-quantity-add.liquid`, lógica en `assets/card-quantity-add.js` (vanilla, mismo patrón `if (!customElements.get(...))` del theme).

- *Alternativa descartada — activar `quick_add: bulk`*: no ofrece el estado "Agregar", tiene los defectos descritos en Context y solo funciona dentro de secciones con la clase `collection-quick-add-bulk`.
- *Alternativa descartada — añadir un `quantity-input` dentro del `<product-form>`*: sería "elegir cantidad y luego Agregar" (dos pasos), contrario a lo pedido.

### 2. Marcado y estados

```
<card-quantity-add data-variant-id data-quantity data-max? data-product-title>
  <button class="quick-add__submit button button--secondary card-qty__add">Agregar</button>
  <div class="card-qty__stepper" role="group" aria-label="Cantidad de {título}">
    <button name="minus" aria-label="Reducir cantidad para {título}">−</button>
    <span class="card-qty__value" aria-live="polite">N</span>
    <button name="plus"  aria-label="Aumentar cantidad para {título}">+</button>
  </div>
  <p class="card-qty__message" role="status" hidden></p>
</card-quantity-add>
```

- `data-quantity` se renderiza con `cart | item_count_for_variant: variant.id` (mismo filtro que ya usa `quantity-input.liquid`), de modo que la tarjeta nace en el estado correcto sin esperar a JavaScript.
- El estado se expresa con un atributo en el elemento (`data-state="add" | "stepper"`) y CSS; no se inserta ni se quita marcado, así no hay salto de altura.
- El botón "Agregar" conserva las clases `.quick-add__submit.button.button--secondary` para heredar el estilo actual.
- `data-max` se emite solo si la variante tiene inventario gestionado por Shopify con política `deny` (`inventory_quantity`), o si existe `quantity_rule.max`; sirve para deshabilitar `+` por adelantado. El límite real lo decide el servidor.
- Las etiquetas de `−` y `+` reutilizan las claves existentes `products.product.quantity.decrease` / `increase`. "Agregar" sigue escrito en el Liquid, como hoy.
- La cantidad es texto, no un `<input>`: en tarjetas de 2 columnas en móvil evita abrir el teclado y el zoom de iOS. Escribir una cantidad exacta sigue siendo posible en el cajón.

### 3. Dónde se usa en `card-product.liquid`

Solo se sustituye el contenido de la rama `{%- else -%}` de `quick_add == 'standard'` (una variante, sin reglas de cantidad, disponible) cuando `horizontal_quick_add` no está activo. Se mantienen sin tocar: la rama del modal, la rama `bulk`, el botón deshabilitado de agotado y la tarjeta horizontal (que conserva su `<product-form>`). El contenedor `.quick-add.no-js-hidden` se mantiene, así que sin JavaScript el control no aparece, igual que hoy.

### 4. Escritura en el carrito: cantidad absoluta con `cart/update.js`

Cada cambio envía `POST routes.cart_update_url` con `updates: { [variantId]: N }` y `sections: ['cart-icon-bubble', 'cart-drawer']` (esta última solo si existe `<cart-drawer>` en la página).

- Un solo endpoint cubre agregar (0→1), cambiar y eliminar (N→0).
- Enviar la cantidad absoluta hace las peticiones idempotentes: si se pierde o se reordena una, la siguiente corrige el estado. Con `cart/add.js` (incremental) habría que serializar estrictamente y un reintento duplicaría unidades.
- *Alternativa descartada — `cart/change.js`*: requiere la clave de línea, que la tarjeta no tiene hasta consultar el carrito.

Flujo: la interfaz cambia al instante (optimista); las pulsaciones se agrupan con `debounce` de `ON_CHANGE_DEBOUNCE_TIMER` (300 ms, ya definido en `constants.js`); solo hay una petición en vuelo por tarjeta y, si llegan más cambios mientras tanto, al terminar se envía únicamente el último valor.

### 5. Pintado de la respuesta sin abrir el cajón

- `CartDrawer.renderContents` deja de llamar a `this.open()` y pasa a fijar la clase `is-empty` del `<cart-drawer>` según el estado recibido (hoy esa clase solo se quita, desde el `finally` de `product-form.js`; con el control nuevo el carrito puede volver a quedar vacío sin recargar). Conserva el re-enlace del clic sobre `#CartDrawer-Overlay`.
- `card-quantity-add` llama a `renderContents` del cajón si existe; el contador del encabezado lo actualiza el propio cajón con la misma respuesta. Si no hay cajón (tipos "página" o "notificación"), el elemento reemplaza él mismo `#cart-icon-bubble` con la sección devuelta y no navega ni abre nada.
- *Alternativa descartada — parámetro `open` en `renderContents` con apertura por defecto*: la petición es que nada abra el cajón salvo el encabezado; un valor por defecto que abre invita a regresiones.
- `cart-notification.js` no se toca: con tipo "notificación", `product-form.js` sigue mostrando la notificación.

### 6. Sincronización entre tarjetas y con el cajón

- Tras cada actualización correcta, el elemento publica `PUB_SUB_EVENTS.cartUpdate` con `source: 'card-quantity-add'` y el estado completo del carrito.
- Cada `card-quantity-add` se suscribe a `cartUpdate`:
  - si el origen es `card-quantity-add` o `cart-items`, `cartData.items` es el carrito completo: la cantidad es la suma de las líneas con su `variant_id` (0 si no hay ninguna);
  - para cualquier otro origen (`product-form`, `quick-add`), `cartData` es una respuesta parcial, así que se consulta `cart.js` una sola vez para todas las tarjetas (promesa compartida a nivel de módulo).
- Una tarjeta con una petición propia pendiente ignora los eventos entrantes hasta que su petición termina, para no pisar el valor optimista.
- En `pageshow` con `event.persisted` (volver atrás desde bfcache) se vuelve a consultar `cart.js`.
- Efecto conocido: `cart-drawer-items` reacciona al evento pidiendo otra vez la sección del cajón. Es una petición redundante por actualización (ya agrupada por el debounce); se acepta para no modificar `cart.js`.

### 7. Errores

- Respuesta `422` (inventario insuficiente, regla de cantidad): se muestra `description`/`message` del servidor en `.card-qty__message` durante unos segundos y se resincroniza la cantidad con `cart.js`.
- Fallo de red: se restaura la última cantidad confirmada y se muestra `window.cartStrings.error`.
- Si `data-max` está presente, `+` se deshabilita al alcanzarlo y el caso `422` queda como red de seguridad.

### 8. Confirmación "Agregado" en `product-form.js`

Tras una respuesta correcta y solo cuando el carrito es un cajón, el botón de envío cambia su texto a "Agregado" durante ~2 s y luego recupera el texto que tenía (se guarda antes de cambiarlo, porque en tarjetas es "Agregar" y en la página de producto es "Agregar al carrito"). Texto nuevo `products.product.added_to_cart` en `locales/en.default.json` y `locales/es.json`, expuesto como `window.variantStrings.addedToCart` en `layout/theme.liquid`. Se retira además el `aria-haspopup="dialog"` que `product-form.js` pone al botón cuando hay cajón, y el del botón de `offer-product.liquid`, porque ya no abren un diálogo.

### 9. Carga del script

`assets/card-quantity-add.js` se carga una vez, con `defer`, en `layout/theme.liquid` junto a `cart-drawer.js`. La tarjeta se renderiza desde seis secciones y dos plantillas con criterios distintos de carga de scripts; una carga global evita tarjetas sin comportamiento en algún listado. Coste: un archivo pequeño en todas las páginas.

- *Alternativa descartada — `<script>` dentro del snippet*: se repetiría por cada tarjeta.

### 10. Estilos

En `assets/card-product-flexbox.css` (ya lo carga el snippet y ya está acotado a `.product-card-wrapper`): el control es una píldora de 4.4 rem de alto y ancho 100 %, mismo radio y color de marca que el botón; `−` y `+` de 44 px como mínimo; cantidad centrada con `font-variant-numeric: tabular-nums`; `:focus-visible` igual al del botón; estado deshabilitado de `+`/`−` atenuado. El mensaje de error se posiciona en absoluto sobre el borde del control para no cambiar la altura de la tarjeta.

## Risks / Trade-offs

- [El visitante no nota que agregó desde la página de producto] → confirmación "Agregado" en el botón (decisión 8) y contador del encabezado actualizado; verificación manual explícita en tareas.
- [Petición redundante de la sección del cajón por cada actualización] → acotada por el debounce; si pesa, se puede filtrar el origen en `cart.js` en un cambio posterior.
- [Varias líneas de la misma variante con propiedades distintas] → `cart/update.js` por id de variante fija la cantidad total de la variante; hoy ningún flujo del theme crea líneas con propiedades, así que no aplica.
- [Páginas servidas desde caché del navegador con cantidades viejas] → resincronización en `pageshow` persistido.
- [Solape con `improve-product-card-ui`] → este cambio solo sustituye el bloque `<product-form>` de la rama estándar y añade reglas nuevas con prefijo `card-qty`; no reescribe reglas existentes. Si aquel cambio modifica esa rama antes, se resuelve al aplicar.
- [Otros scripts que dependieran de que `renderContents` abra el cajón] → verificado: solo lo llama `product-form.js`; el script de cart-handoff es externo y no puede inspeccionarse, se cubre con prueba manual del checkout.

## Migration Plan

Sin migración de datos ni cambios de ajustes. Reversión: `git revert` del commit; ningún ajuste de `settings_data.json` ni de plantillas cambia.

## Open Questions

- Duración exacta de la confirmación "Agregado" y del aviso de error (se parte de 2 s y 4 s; ajustable al probar).
