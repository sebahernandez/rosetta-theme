# Tasks

## 1. Marcado de la tarjeta (`snippets/card-product.liquid`)

- [x] 1.1 Quitar el `<link>` de Font Awesome y el bloque `<style>` en línea de `.card__information-title`; verificar con `grep -c "font-awesome\|<style>" snippets/card-product.liquid` que devuelve 0 y que los íconos de corazón siguen viéndose en portada
- [ ] 1.2 Mover el porcentaje de descuento dentro del `.card__badge` de `.card__inner`, junto a la insignia de oferta/agotado, y eliminar las otras dos copias (la mal formada `-%N%` y la del contenido inferior); verificar que `grep -c "discount-percentage-text" snippets/card-product.liquid` devuelve 1 y que un producto en oferta muestra `-N%` una sola vez
- [ ] 1.3 Reemplazar los estilos en línea de las etiquetas de envío por las clases `card-shipping card-shipping--fast` / `card-shipping--standard` y quitar los `div` envoltorio sin clase; verificar que un producto con etiqueta `envio-rapido` y otro sin ella muestran su etiqueta correspondiente
- [x] 1.4 Quitar el atributo `style` en línea de todos los botones `.quick-add__submit` (estándar, selección de opciones, por cantidad y agotado) sin cambiar sus `id`, `class`, `name` ni atributos `aria-*`/`data-*`; verificar que `grep -c 'style="background-color' snippets/card-product.liquid` devuelve 0
- [ ] 1.5 Eliminar el `<span>` de `block.settings.description` y, en la tarjeta de ejemplo, sacar `.quick-add` de `.product-info-buttons-container` para igualar la estructura de la tarjeta real; verificar en el editor de temas que una colección destacada sin colección asignada muestra las tarjetas de ejemplo con el botón a todo el ancho
- [x] 1.6 Ejecutar `shopify theme check` y verificar que no aparecen ofensas nuevas en `snippets/card-product.liquid` respecto al estado previo

## 2. Estilos de la tarjeta (`assets/card-product-flexbox.css`)

- [x] 2.1 Reescribir el archivo con todas las reglas acotadas a `.product-card-wrapper`: contenido en columna flex (excluyendo `.card--horizontal`), `.card__information` con `flex: 1` y compra rápida con `margin-top: auto`; verificar en portada que los botones de una fila quedan en la misma línea con títulos de una y dos líneas
- [ ] 2.2 Añadir el ajuste de imagen `object-fit: contain` centrado (imagen principal y secundaria) con el fondo del esquema de la tarjeta; verificar que una foto no cuadrada se ve completa y que el efecto de imagen secundaria al pasar el cursor sigue funcionando
- [ ] 2.3 Definir la pila de insignias (`.card__badge` de la imagen en columna flex) con el estilo del porcentaje de descuento sin posición absoluta propia, y el contenedor `.favorito` con `top`/`right` de 0.8 rem en todos los anchos; verificar a 375 px y a 1280 px que insignias y corazón no se solapan
- [x] 2.4 Aplicar el título a dos líneas (`line-clamp: 2` con alto mínimo de dos líneas) y la escala de tamaños de `design.md` (título, precio, precio anterior, equivalente Bs, etiquetas de 11 px, relleno); verificar que el precio queda a la misma altura en tarjetas vecinas y que ningún texto baja de 11 px en el inspector
- [ ] 2.5 Definir tamaños de controles: botón de compra rápida con `min-height: 44px` y ancho 100 %, selector de cantidad (`quick-add-bulk`) al mismo ancho, corazón de 40 px en escritorio y 36 px en móvil con área táctil de 44 px; verificar las medidas en el inspector a 375 px
- [ ] 2.6 Añadir estilos de las etiquetas de envío (`.card-shipping--fast`, `.card-shipping--standard`) con los colores actuales y foco visible (`:focus-visible`) en el corazón; verificar recorriendo una tarjeta con el tabulador que enlace, corazón y botón muestran el indicador de foco
- [x] 2.7 Retirar de `assets/circular-add-to-cart.css` las reglas `.discount-percentage-text`, `.discount-placeholder`, `.favorito`, sus media queries y `@keyframes fadeInSlide`, conservando las de `.quick-add__submit`; verificar con `grep -rn "discount-percentage-text\|\.favorito" assets/` que solo aparecen en `card-product-flexbox.css`

## 3. Sección `featured-collection` y portada

- [ ] 3.1 En `sections/featured-collection.liquid`, pasar `extend_height: true` a los dos render de `card-product` y cambiar el valor por defecto de `image_ratio` a `square`; verificar en el editor de temas que una sección nueva "Colección destacada" nace con proporción cuadrada y que las tarjetas llenan el alto de la fila
- [x] 3.2 En `templates/index.json`, cambiar `image_ratio` de "Ofertas Destacadas" (`featured_collection_4eGYqL`) de `adapt` a `square`; verificar en portada que las tres colecciones destacadas muestran imágenes a la misma altura

## 4. Verificación integral

- [x] 4.1 Ejecutar `shopify theme check` sobre el theme completo y verificar que no hay ofensas nuevas en los archivos modificados
- [ ] 4.2 Prueba manual con `shopify theme dev` en portada a 375 px, 768 px y 1280 px: imagen uniforme, insignias, corazón, orden de la información y botones alineados en las tres colecciones destacadas
- [ ] 4.3 Prueba manual de comportamiento en una tarjeta de portada: agregar al carrito un producto de una variante, abrir el selector en uno con varias variantes, ver el botón deshabilitado en un agotado, marcar y desmarcar favorito, y comprobar que el equivalente en bolívares carga
- [ ] 4.4 Prueba manual en el editor de temas de la sección "Colección destacada": alternar proporción (adaptar, vertical, cuadrado), compra rápida (ninguna, estándar, por cantidad), proveedor, valoración, imagen secundaria, columnas de escritorio y móvil, y deslizamiento en móvil; verificar que la tarjeta no se descuadra en ninguna combinación
- [ ] 4.5 Revisión visual de los otros listados que usan la tarjeta: página de colección, resultados de búsqueda, productos relacionados, collage y bloque de producto en la página de producto; verificar que ninguno se descuadra
- [x] 4.6 Hacer commit en `develop` con los archivos del theme y la carpeta `openspec/changes/improve-product-card-ui/`, y hacer push a `origin/develop`; verificar con `git status -sb` que la rama no queda por delante del remoto
