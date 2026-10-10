# Favoritos en el navegador: guía de reimplementación

> Documento de referencia, no normativo. Describe la lista de favoritos basada en `localStorage` que se retiró del theme con el cambio `remove-localstorage-wishlist`. La spec vigente es `spec.md` en esta misma carpeta.
>
> **Por qué se retiró**: los favoritos vivían solo en el navegador del visitante, así que la tienda no obtenía ninguna métrica. Si se retoma, conviene leer antes la sección "Debilidades conocidas".

- **Último commit con la funcionalidad completa**: `835f931`
- **Commit que la eliminó**: `0b77303`

## 1. Qué hacía (comportamiento)

Cualquier visitante, sin iniciar sesión, podía guardar productos en su navegador y verlos en una página dedicada.

- **Activación por ajustes**: el ajuste "Enable Wishlist" encendía o apagaba el botón de favoritos en las tarjetas.
- **Agregar y quitar**: las tarjetas de producto y de oferta mostraban un corazón que alternaba el producto dentro y fuera de la lista. El ícono reflejaba el estado (contorno = no guardado, relleno rosa = guardado). Si el mismo producto aparecía en varias tarjetas, todas se actualizaban a la vez. No se admitían duplicados.
- **Persistencia**: la lista se guardaba en el almacenamiento local del navegador y se conservaba entre páginas y visitas. Las entradas inválidas se descartaban al cargar.
- **Página de favoritos**: `/pages/favoritos` mostraba una tarjeta por cada producto guardado, con información y precio actuales traídos de la tienda. Mensajes: "Tu lista de favoritos está vacía", "No se pudieron cargar los productos", "Error al cargar la lista de favoritos".
- **Botón flotante**: con "Enable Floating Button" activo, todas las páginas mostraban un botón fijo que enlazaba a la página de favoritos, en la posición configurada (medio izquierda, medio derecha, abajo izquierda, abajo centro, abajo derecha), con un contador que se actualizaba al instante y se ocultaba con la lista vacía.

## 2. Restaurar el código desde git

Opción rápida, si el theme no cambió mucho desde entonces:

```bash
git revert 0b77303
```

Opción selectiva (recupera solo los archivos propios de favoritos; las ediciones en archivos compartidos se rehacen a mano con la sección 4):

```bash
git checkout 835f931 -- \
  assets/wishlist-refactored.js \
  snippets/wishlist.liquid \
  templates/page.wishlist.liquid \
  sections/product-card.liquid
```

Para ver exactamente qué se quitó de cada archivo compartido:

```bash
git show 0b77303 -- layout/theme.liquid snippets/card-product.liquid \
  snippets/offer-product.liquid assets/base.css assets/card-product-flexbox.css \
  config/settings_schema.json
```

No hace falta recuperar `assets/wishlist.js`, `assets/wishlist-utils.js` ni `templates/product.card.liquid`: eran versiones anteriores o auxiliares que ya no se cargaban.

## 3. Arquitectura

| Pieza | Archivo | Rol |
| --- | --- | --- |
| Lógica | `assets/wishlist-refactored.js` | Clase `WishlistManager` (datos, botones, página, contador) y `ProductDataFactory`. Se instancia en `DOMContentLoaded` y expone funciones globales. |
| Botón en tarjeta de producto | `snippets/card-product.liquid` | `<div class="favorito">` con el corazón, dentro de `.card__inner`. |
| Botón en tarjeta de oferta | `snippets/offer-product.liquid` | Corazón como primer hijo de `.custom-buttons`. |
| Botón flotante y carga del script | `layout/theme.liquid` | Antes de `</body>`. |
| Página de favoritos | `templates/page.wishlist.liquid` → `snippets/wishlist.liquid` | Título de la página y contenedor vacío `.js-wishlistBlock` que rellena el script. |
| Tarjeta vía AJAX | `sections/product-card.liquid` | Renderiza `card-product` para un producto; se pide con la Section Rendering API. |
| Ajustes | `config/settings_schema.json` | Grupo "Wishlist". |
| Íconos | Font Awesome 6.5.2 (CDN en `layout/theme.liquid`) | `fa-regular fa-heart` / `fa-solid fa-heart`. |

### Modelo de datos

Clave de `localStorage`: `wishlist`. Valor: arreglo JSON de objetos.

```json
[
  {
    "productTitle": "Nombre del producto",
    "productImg": "//cdn.shopify.com/.../imagen.jpg",
    "productPrice": "$10.00",
    "productUrl": "/products/handle-del-producto",
    "productId": null,
    "timestamp": 1760000000000,
    "id": "handle-del-producto"
  }
]
```

- La identidad del producto es **`productTitle`** (comparación exacta).
- `id` se deriva del último segmento de `productUrl`; si no hay URL, del título en minúsculas con guiones.
- Al iniciar se descartan las entradas sin `productTitle`.

### Flujo

1. **Carga de página**: `WishlistManager.init()` limpia entradas inválidas, recorre todos los `.wishlist_button`, lee su `data-product-title` y pinta el estado; si existe `.js-wishlistBlock`, renderiza la lista; actualiza el contador flotante.
2. **Clic en el corazón**: el `onclick` en línea llama a `toggleOfferWishlist(título, imagen, precio, url, event)` → `toggleProduct()` agrega o quita, guarda, actualiza todos los botones de ese título, el contador y la lista.
3. **Página de favoritos**: por cada entrada extrae el handle de `productUrl` (segmento posterior a `products`) y pide `GET /products/<handle>?section_id=product-card`; del HTML devuelto toma el contenido de `.shopify-section` y lo inserta en `<div class="wishlist-products-grid">`. Tras 100 ms reinicializa los botones.
4. **Eventos** (`CustomEvent` sobre `document`): `productAdded`, `productRemoved`, `wishlistToggled`, `wishlistCleared`, `wishlistImported`. El manager escucha además `wishlistUpdated` con `detail: { productTitle, inWishlist }`.

### Funciones globales

- `toggleOfferWishlist(productTitle, productImg, productPrice, productUrl, event)`: la que usan las tarjetas.
- `initProductWishlistState(productId, productTitle)`: sincroniza los botones de un producto con lo guardado.
- `displayWishlist()`: vuelve a pintar la página de favoritos.
- `removeFromWishlist(productTitle)`.
- `toggleWishlist(event)`: pensada para la página de producto; nunca funcionó (ver debilidades).

## 4. Puntos de integración

### 4.1 Script y botón flotante (`layout/theme.liquid`, antes de `</body>`)

```liquid
<script src="{{ 'wishlist-refactored.js' | asset_url }}" defer="defer"></script>

{% if settings.wishlist-floating-button-position %}
  <a href="/pages/favoritos" class="button-floating">
    <svg width="30px" height="30px" viewBox="0 0 24 24"><!-- corazón --></svg>
    <span class="wishlist-floating-counter" style="display: none;">0</span>
    <p class="wishlist_text">Tus Favoritos</p>
  </a>
{% endif %}
```

El script busca `.wishlist-floating-counter` y le pone `display: flex` y la clase `visible` cuando hay elementos.

### 4.2 Botón en la tarjeta de producto (`snippets/card-product.liquid`, primer hijo de `.card__inner`)

```liquid
<div class="favorito">
  {% if settings.enable-wishlist %}
    <button
      onclick="toggleOfferWishlist('{{ card_product.title | escape }}', '{{ card_product.featured_image | img_url: '' }}', '{{ card_product.price | money | remove_first: '' }}', '{{ card_product.url }}', event); return false;"
      class="custom-btn-icon wishlist_button"
      data-product-title="{{ card_product.title | escape }}"
      data-product-id="{{ card_product.id }}"
      type="button"
      aria-label="Agregar a favoritos">
      <i class="fa-regular fa-heart"></i>
    </button>
  {% endif %}
</div>
```

Contrato del marcado que el script necesita: clase `wishlist_button` y atributo `data-product-title`. El script reemplaza el `innerHTML` del botón por el ícono, alterna la clase `active` y cambia el `aria-label` entre "Agregar a favoritos" y "Quitar de favoritos".

### 4.3 Botón en la tarjeta de oferta (`snippets/offer-product.liquid`, primer hijo de `.custom-buttons`)

Mismo botón, con `featured_product` en lugar de `card_product`, imagen a `600x600` y además `data-product-handle="{{ featured_product.handle }}"`.

### 4.4 Página de favoritos

- `templates/page.wishlist.liquid`: `<div class="page-width">{% render 'wishlist' %}</div>`
- `snippets/wishlist.liquid`: título `{{ page.title }}` y `<div class="js-wishlistBlock"></div>`.
- `sections/product-card.liquid`: `{% render 'card-product', card_product: product, media_aspect_ratio: 'adapt', image_shape: 'default', show_secondary_image: false, show_vendor: false, show_rating: false, lazy_load: false, skip_styles: true, section_id: section.id, quick_add: 'standard' %}` con esquema `{ "name": "Product Card", "settings": [] }`.
- **En el admin de Shopify**: crear la página con título "Favoritos", handle `favoritos` y plantilla `wishlist`. Si existe la redirección `/pages/favoritos` → `/`, eliminarla.

### 4.5 Ajustes (`config/settings_schema.json`)

```json
{
  "name": "Wishlist",
  "settings": [
    { "type": "checkbox", "id": "enable-wishlist", "label": "Enable Wishlist", "default": true },
    { "type": "checkbox", "id": "wishlist-floating-button-position", "label": "Enable Floating Button", "default": true },
    {
      "type": "select",
      "id": "floating_button-position",
      "label": "Floating Button Position",
      "default": "middle-right",
      "options": [
        { "value": "middle-left", "label": "Middle Left" },
        { "value": "middle-right", "label": "Middle Right" },
        { "value": "bottom-left", "label": "Bottom Left" },
        { "value": "bottom-center", "label": "Bottom Center" },
        { "value": "bottom-right", "label": "Bottom Right" }
      ]
    }
  ]
}
```

### 4.6 Estilos

- **Corazón en la tarjeta** (`assets/card-product-flexbox.css`): `.product-card-wrapper .card__inner > .favorito` en `position: absolute; top: 0.8rem; right: 0.8rem; z-index: 2`; botón blanco de 4 rem (3,6 rem en móvil, con pseudo-elemento que amplía el área táctil a 44 px), borde fino, sin sombra. La pila de insignias arriba a la derecha bajaba 4,8 rem para no chocar con el corazón.
- **Estado activo** (`layout/theme.liquid`): `.custom-btn-icon i.fa-solid, .custom-btn-icon.active i { color: #e91e63 }` y hover `#c2185b`.
- **Botón flotante** (`layout/theme.liquid`): `.button-floating` fijo con `z-index: 9999`, fondo `#efefef` que pasa a negro en hover; la posición sale de `settings.floating_button-position` con un `if/elsif` dentro del bloque `{% style %}`.
- **Contador** (`layout/theme.liquid` y `assets/base.css`): `.wishlist-floating-counter`, círculo rojo `#e74c3c` con animaciones `wishlist-counter-pulse` y `wishlist-counter-bounce`.
- **Página** (`assets/base.css`): `.wishlist-products-grid` en cuadrícula de 2 / 3 / 4 columnas (base, ≥750 px, ≥990 px), y `.wishlist-empty` / `.wishlist-error`.

## 5. Debilidades conocidas (corregir si se retoma)

1. **Sin métricas ni sincronización**: el motivo del retiro. Nada llega al servidor; la lista no se comparte entre dispositivos ni se asocia al cliente.
2. **Identidad por título**: dos productos con el mismo título colisionan y renombrar un producto deja huérfano el favorito. Usar el id o el handle del producto.
3. **`onclick` en línea con el título interpolado**: un título con apóstrofo rompe el JavaScript del atributo (`escape` protege el HTML, no la cadena JS). Usar atributos `data-*` y un listener delegado.
4. **Un `<script>` en línea por tarjeta**: `card-product.liquid` emitía un bloque de inicialización por producto, redundante con `initializeButtons()`. El de `offer-product.liquid` duplicaba la lógica y además leía `localStorage` directamente.
5. **`debug: true` en producción**: el manager se creaba con depuración activa y llenaba la consola de mensajes.
6. **Script global incondicional**: se cargaba en todas las páginas aunque "Enable Wishlist" estuviera apagado.
7. **Ajuste apagado no ocultaba el botón**: mostraba un corazón gris sin función (`aria-label="No disponible"`).
8. **`toggleWishlist` roto**: `ProductDataFactory.createFromPDP()` contenía etiquetas Liquid dentro de un `.js` estático, que Shopify no procesa. La página de producto nunca tuvo botón de favoritos.
9. **Estilos duplicados**: el contador estaba definido dos veces con valores distintos (`theme.liquid` y `base.css`), y el botón flotante mezclaba `!important` con reglas condicionales.
10. **Una petición por producto**: la página de favoritos hacía un `fetch` por cada favorito, sin límite ni caché.
11. **Nombres de ajustes confusos**: `wishlist-floating-button-position` es un checkbox de activación, no la posición; los ids mezclan guiones y guiones bajos.
12. **Textos fijos en español** dentro del JS y del Liquid, sin pasar por `locales/`.
