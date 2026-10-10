# Tasks

## 1. Preparación

- [x] 1.1 Confirmar que `improve-product-card-ui` está archivado (su delta agrega a `product-catalog` los requirements que este cambio modifica); verificar con `openspec validate remove-localstorage-wishlist --strict`, que no debe mostrar el aviso "Archive would refuse this delta"
- [x] 1.2 Confirmar que el commit de referencia de la guía sigue conteniendo la funcionalidad completa: `git show 835f931:assets/wishlist-refactored.js | head -5` devuelve el encabezado del script; si hubo commits posteriores que la modificaron, actualizar el SHA en `reimplementacion.md`

## 2. Retirar los favoritos de las tarjetas

- [x] 2.1 En `snippets/card-product.liquid`, eliminar el bloque `<!-- Favorito -->` con su `<div class="favorito">` y el `<script>` final que llama a `initProductWishlistState`; verificar con `grep -nE "favorito|wishlist|Wishlist" snippets/card-product.liquid` sin resultados
- [x] 2.2 En `snippets/offer-product.liquid`, eliminar el botón de favoritos (ramas `if`/`else` de `settings.enable-wishlist`) dentro de `.custom-buttons` y el `<script>` en línea de inicialización y del evento `storage`, conservando la carga de `product-offer-timer.js` y el botón "Vista rápida"; verificar con `grep -nE "wishlist|Wishlist|fa-heart" snippets/offer-product.liquid` sin resultados
- [x] 2.3 En `assets/card-product-flexbox.css`, eliminar las reglas `.favorito` (incluidas las del media query móvil y el pseudo-elemento de área táctil) y la regla `.card__badge.top.right` que reserva 4,8 rem para el corazón; verificar con `grep -nE "favorito|wishlist" assets/card-product-flexbox.css` sin resultados
- [x] 2.4 Con `shopify theme dev`, revisar en escritorio y móvil una tarjeta de producto (portada y colección) y la tarjeta de oferta: sin corazón, sin hueco donde estaba, insignias pegadas a su esquina y botones "Agregar" y "Vista rápida" de la oferta bien distribuidos; si `.custom-buttons` queda descompensado, ajustar su distribución en `offer-product.liquid`

## 3. Retirar el botón flotante, la página y el script

- [x] 3.1 En `layout/theme.liquid`, eliminar la carga de `wishlist-refactored.js` y el bloque `{% if settings.wishlist-floating-button-position %}` del botón flotante; verificar que la portada no pide `wishlist-refactored.js` (pestaña Red) ni muestra el botón flotante
- [x] 3.2 En el bloque `{% style %}` de `layout/theme.liquid`, eliminar las reglas `.wishlist_button`, `.heart-filled`, `.button-floating` (con el `assign button_position` y su `if/elsif`), `.wishlist_text`, `.wishlist-floating-counter` y sus `@keyframes`, y las de estado de favorito de `.custom-btn-icon` (`i.fa-solid`, `.active`), conservando las reglas base, hover y móvil de `.custom-btn-icon`; verificar con `grep -nE "wishlist|button-floating|heart-filled" layout/theme.liquid` sin resultados y que el botón "Vista rápida" de la tarjeta de oferta se ve igual que antes
- [x] 3.3 En `assets/base.css`, eliminar el bloque `/* ===== WISHLIST STYLES ===== */` completo hasta la regla `.wishlist-floating-counter:empty`, sin tocar `.mega-menu__link--level-2` que le sigue; verificar con `grep -nE "wishlist|button-floating" assets/base.css` sin resultados
- [x] 3.4 Eliminar `assets/wishlist-refactored.js`, `assets/wishlist.js`, `assets/wishlist-utils.js`, `snippets/wishlist.liquid` y `templates/page.wishlist.liquid`; verificar con `ls` que no existen
- [x] 3.5 Confirmar con `grep -rnE "product-card'|section_id=product-card|view=card|wishlist-card" --include='*.liquid' --include='*.js' --include='*.json' .` (excluyendo `openspec/`) que nada más usa `sections/product-card.liquid` ni `templates/product.card.liquid`, y eliminarlos; verificar con `ls` que no existen

## 4. Retirar los ajustes

- [x] 4.1 En `config/settings_schema.json`, eliminar el grupo `"name": "Wishlist"` completo; verificar que el archivo sigue siendo JSON válido (`python3 -m json.tool config/settings_schema.json > /dev/null`) y que el editor de temas no muestra el grupo "Wishlist"
- [x] 4.2 En `config/settings_data.json`, eliminar las claves `enable-wishlist` y `wishlist-floating-button-position` (y `floating_button-position` si aparece); verificar con `grep -n "wishlist\|floating_button" config/settings_data.json` sin resultados

## 5. Guía de reimplementación

- [x] 5.1 Mover `openspec/changes/remove-localstorage-wishlist/reimplementacion.md` a `openspec/specs/wishlist/reimplementacion.md`; verificar que el archivo existe en su ubicación final y que `openspec validate --specs` sigue pasando
- [x] 5.2 Contrastar la guía con el código que se elimina (`git diff` del cambio): cada fragmento de las secciones 4.1 a 4.6 debe corresponder a algo realmente retirado; corregir cualquier diferencia
- [x] 5.3 Actualizar el `## Purpose` de `openspec/specs/wishlist/spec.md` para indicar que los favoritos están retirados y que la solución anterior está documentada en `reimplementacion.md`; verificar leyendo el archivo

## 6. Verificación de integración

- [x] 6.1 Ejecutar `grep -rnE "wishlist|Wishlist|favorito|button-floating|heart-filled" --include='*.liquid' --include='*.js' --include='*.css' --include='*.json' layout sections snippets templates assets config`; el único resultado admitido es la coincidencia ajena `favoritikon` de `locales/` si se incluye esa carpeta
- [x] 6.2 Ejecutar `shopify theme check` y confirmar que no aparecen errores nuevos respecto de `develop` (en particular, ningún asset, snippet o ajuste faltante)
- [x] 6.3 Prueba manual con `shopify theme dev` en portada, una colección, una página de producto, resultados de búsqueda y el carrito: sin corazones, sin botón flotante y sin errores en la consola del navegador (en especial `toggleOfferWishlist is not defined` o `initProductWishlistState is not defined`)
- [x] 6.4 Prueba manual de regresión en la tarjeta: agregar al carrito con el control de cantidad, abrir el selector en un producto con variantes, ver un producto agotado y comprobar que el equivalente en bolívares carga
- [x] 6.5 Prueba con un navegador que tenga la clave `wishlist` en `localStorage` (crearla a mano si hace falta): la tienda carga con normalidad, sin errores, y la clave sigue ahí
- [x] 6.6 Prueba manual en el editor de temas: no existe el grupo de ajustes "Wishlist", y las secciones "Colección destacada" y de ofertas con temporizador se renderizan y se pueden editar sin errores

## 7. Entrega

- [x] 7.1 Completar en `openspec/specs/wishlist/reimplementacion.md` el campo "Commit que la eliminó" y los dos comandos que lo usan: como el SHA no existe hasta hacer el commit, dejar la instrucción `git log --oneline -1 -- assets/wishlist-refactored.js` como forma de obtenerlo y, tras el commit, reemplazar el marcador por el SHA real en un commit de seguimiento
- [x] 7.2 Hacer commit en `develop` con el código del theme, la guía y la carpeta del cambio bajo `openspec/changes/`, y push a `origin/develop`; verificar con `git status` limpio y `git log origin/develop -1` mostrando el commit

## Workflow follow-up

- En el admin de Shopify, justo después del push: eliminar la página "Favoritos" (handle `favoritos`), crear la redirección `/pages/favoritos` → `/` y comprobar que la URL lleva a la portada.
- En el admin de Shopify: revisar los menús de navegación (principal, pie y móvil) y quitar cualquier enlace a favoritos.
- En el admin de Shopify: confirmar que ningún producto tiene asignada la plantilla `card`.
- Archivar el cambio (`/opsx:archive`) una vez verificado en la tienda.
