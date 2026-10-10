# Design

## Context

Motivación en `proposal.md` (Why). Estado observado en el código (commit `835f931`):

- **Script activo**: `layout/theme.liquid:716` carga `assets/wishlist-refactored.js` en todas las páginas, sin condición. Define `WishlistManager` y las funciones globales `toggleOfferWishlist`, `initProductWishlistState`, `displayWishlist`, `toggleWishlist` y `removeFromWishlist`.
- **Scripts muertos**: `assets/wishlist.js` y `assets/wishlist-utils.js` no se cargan desde ningún Liquid.
- **Botones**: `snippets/card-product.liquid:62-78` (contenedor `.favorito`) y `snippets/offer-product.liquid:233-249` (dentro de `.custom-buttons`). Ambos llaman a `toggleOfferWishlist(...)` con `onclick` en línea. Con el ajuste desactivado no se ocultan: muestran un corazón gris inerte.
- **Scripts en línea de inicialización**: `card-product.liquid:683-693` (uno por tarjeta) y `offer-product.liquid:373-492`.
- **Botón flotante**: `layout/theme.liquid:719-730`, enlaza a `/pages/favoritos`.
- **Página**: `templates/page.wishlist.liquid` → `snippets/wishlist.liquid` (contenedor `.js-wishlistBlock`). El script pide cada tarjeta a `/products/<handle>?section_id=product-card`, que resuelve `sections/product-card.liquid`.
- **Plantilla huérfana**: `templates/product.card.liquid` (vista alternativa `card` de producto, `section_id: 'wishlist-card'`); ningún archivo la referencia.
- **Estilos** repartidos en tres sitios: bloque `{% style %}` de `layout/theme.liquid` (295-316, 318-458, 504-541), `assets/base.css` (3712-3844) y `assets/card-product-flexbox.css` (51-54, 69-97, 209-223).
- **Ajustes**: grupo "Wishlist" en `config/settings_schema.json:23-63` y dos valores en `config/settings_data.json:12-13`.

Restricciones: sin build step; `settings_data.json` lo reescribe el editor de temas de Shopify; la página "Favoritos" y los menús viven en el admin de Shopify, no en el repositorio.

## Goals / Non-Goals

**Goals:**

- Que no quede ningún rastro visible ni ningún código de favoritos cargándose en la tienda.
- Que el retiro no altere el resto de la tarjeta de producto, la tarjeta de oferta ni el botón "Vista rápida".
- Que volver a esta solución sea cuestión de seguir una guía, sin tener que redescubrir cómo estaba hecha.

**Non-Goals:**

- Diseñar o implementar la nueva solución de favoritos con métricas.
- Borrar la clave `wishlist` del `localStorage` de los visitantes.
- Retirar Font Awesome o reordenar los estilos en línea de `layout/theme.liquid` que no son de favoritos.

## Decisions

### 1. Eliminar el código en lugar de apagarlo con el ajuste

Se borran archivos, marcado, estilos y ajustes. Alternativa descartada: dejar todo y poner `enable-wishlist` en `false`. No sirve porque el script se carga igual en cada página, el corazón gris sigue apareciendo y el botón flotante depende de otro ajuste; además deja ~1.900 líneas sin dueño que la próxima solución tendría que esquivar.

### 2. La guía de reimplementación vive junto a la spec, como documento aparte

Se guarda en `openspec/specs/wishlist/reimplementacion.md`. La `spec.md` de `wishlist` sigue describiendo solo comportamiento observable (regla del proyecto) y pasa a decir que no hay favoritos; el "cómo se hacía" va en el archivo vecino, que no se pierde al archivar el cambio. El borrador ya está escrito en este cambio (`reimplementacion.md`) para redactarlo con el código a la vista; la implementación lo mueve a su ubicación final y completa el SHA del commit de eliminación.

Alternativas descartadas:
- Meter los detalles de implementación en `spec.md`: contradice la regla de specs del proyecto y dejaría requirements normativos (SHALL) de algo que la tienda no hace.
- Dejarlo solo en este `design.md`: al archivar queda enterrado en `openspec/changes/archive/`, lejos de la capability.

### 3. La recuperación se apoya en git, no en copias del código

La guía indica el commit de referencia (`835f931`, último con la funcionalidad completa) y el comando para restaurar los archivos, y documenta lo que git no explica por sí solo: modelo de datos, contrato del marcado, puntos de integración, ajustes y debilidades conocidas. Alternativa descartada: guardar copia de los archivos en una carpeta del repo; Shopify sube todo lo que haya en `assets/`, `snippets/`, etc., y fuera de esas carpetas sería código duplicado que se desactualiza.

### 4. Qué se conserva de lo que rodea a los favoritos

- **`.custom-btn-icon`** (reglas base, hover y media query en `layout/theme.liquid`): la usa el botón "Vista rápida" de `offer-product.liquid:292`. Solo se quitan las reglas de estado de favorito (`i.fa-solid`, `.active`), las de `.wishlist_button` y la mención a `.wishlist_text`.
- **Font Awesome** (`layout/theme.liquid:8`): lo usan `fa-ban`, `fa-eye`, `fa-bag-shopping` y `fa-arrow-down`.
- **`.custom-buttons` en la tarjeta de oferta**: usa `justify-content: space-between` con tres hijos (corazón, agregar, vista rápida). Al quedar dos, "Agregar" queda a la izquierda y "Vista rápida" a la derecha. Se acepta ese resultado si se ve equilibrado; si no, se ajusta el contenedor en la misma tarea.

### 5. Insignias sin hueco reservado

`assets/card-product-flexbox.css:51-54` baja 4,8 rem la pila de insignias cuando está arriba a la derecha, para no chocar con el corazón. Se elimina esa regla junto con las de `.favorito`.

### 6. Sección y plantilla auxiliares se eliminan

`sections/product-card.liquid` y `templates/product.card.liquid` solo existían para pintar la página de favoritos. Se eliminan tras confirmar con `grep` que nada más las usa y, en el admin, que ningún producto tiene asignada la plantilla `card`.

### 7. Ajustes: se quitan del esquema y de los datos

Se elimina el grupo "Wishlist" de `settings_schema.json` y las claves `enable-wishlist` y `wishlist-floating-button-position` de `settings_data.json`. Shopify ignora valores sin definición en el esquema, pero dejarlos confunde.

### 8. Los favoritos guardados no se borran

La clave `wishlist` del `localStorage` se deja intacta: sin el script no tiene efecto, ocupa poco y permite que la futura solución la lea para migrar los favoritos del visitante. Alternativa descartada: un script de limpieza, que obligaría a mantener código de favoritos para borrar datos inofensivos.

### 9. `/pages/favoritos` redirige a la portada

En el admin se elimina la página "Favoritos" y se crea la redirección `/pages/favoritos` → `/` (Shopify solo aplica redirecciones a rutas que ya no existen). Alternativa descartada: dejar la página con la plantilla por defecto, que mostraría un título sin contenido.

### 10. Orden respecto de `improve-product-card-ui`

Ese cambio agrega a `product-catalog` tres requirements que mencionan favoritos. El delta de este cambio los modifica o reemplaza, así que `improve-product-card-ui` debe estar archivado antes (`openspec validate` ya advierte que el archivado fallaría si no). Alternativa descartada: editar el delta del otro cambio desde este; mezcla dos cambios y deja el historial confuso.

## Risks / Trade-offs

- [Queda una llamada a una función global eliminada (`toggleOfferWishlist`, `initProductWishlistState`) y lanza error en consola] → `grep` de todos los identificadores de favoritos como criterio de cierre, y revisión de consola en portada, colección y producto.
- [Se borra por error una regla CSS compartida y se rompe "Vista rápida" o la tarjeta] → Las reglas a conservar están listadas en la decisión 4; revisión visual de la tarjeta de oferta y de producto en escritorio y móvil.
- [El theme se publica antes de eliminar la página en el admin y `/pages/favoritos` muestra una página vacía] → Hacer los pasos del admin justo después del push; el impacto es una página sin contenido, no un error.
- [Shopify reescribe `settings_data.json` y reintroduce las claves] → Inofensivo sin esquema; se vuelve a limpiar si aparece en un commit "Update from Shopify".
- [Un menú del admin sigue enlazando a favoritos] → Tarea manual de revisión de menús; no se encontraron enlaces en los archivos del theme.
- [Los visitantes pierden su lista sin aviso] → Aceptado: la lista no era visible para la tienda y los datos siguen en su navegador para una eventual migración.

## Migration Plan

1. Archivar `improve-product-card-ui`.
2. Aplicar este cambio en `develop`, verificar con `shopify theme check` y prueba manual, commit y push.
3. En el admin de Shopify: eliminar la página "Favoritos", crear la redirección y revisar menús.
4. **Rollback**: `git revert` del commit de eliminación restaura todo el theme; en el admin, borrar la redirección y recrear la página "Favoritos" con handle `favoritos` y plantilla `wishlist`.
