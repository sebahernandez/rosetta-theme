# Tasks

## 1. Schema de la sección

- [x] 1.1 En `sections/category-slide.liquid`, cambiar el `name` del schema y del preset a "Cuadrícula de categorías", añadir `max_blocks: 4`, eliminar `slides_per_page` y `autoplay`, conservar `gap_size` y añadir `aspect_ratio_desktop` y `aspect_ratio_mobile` (select: `auto` —proporción de la primera imagen—, `1/1`, `4/3`, `3/4`, `16/9`; default `auto`) con etiquetas en español; verificar que el panel de la sección en el editor muestra solo esos tres ajustes
- [x] 1.2 En el bloque `category_image`, añadir `category_image_mobile` (image_picker, opcional, con `info` indicando el fallback a la imagen de escritorio) después de `category_image`; verificar en el editor que la caja muestra el nuevo selector y que no se puede añadir una quinta caja

## 2. Marcado

- [x] 2.1 Reemplazar el marcado de Splide por un contenedor `category-grid` dentro de `.page-width` con las variables `--category-gap`, `--category-ratio-desktop` y `--category-ratio-mobile` en `style`, y una caja `category-grid__item` por bloque con `{{ block.shopify_attributes }}`, conservando el enlace a la colección, el marcador de posición y el título superpuesto; verificar en el HTML renderizado que no queda ninguna clase `splide` ni el id `image-slider`
- [x] 2.2 Renderizar la imagen con un `<picture>` que incluya `<source media="(max-width: 749px)">` solo cuando exista `category_image_mobile`, y la imagen de escritorio con `image_url | image_tag` (`srcset`, `sizes`, `width`, `height`, `loading="lazy"`, `alt` desde `image_alt` o el título); verificar en la pestaña Network que en móvil se descarga solo la imagen de móvil y en escritorio solo la de escritorio
- [x] 2.3 Eliminar el bloque `<script>` de inicialización de Splide; verificar que la consola del navegador no muestra errores en la portada y que el slider principal sigue funcionando

## 3. Estilos

- [x] 3.1 Sustituir los estilos de slider por los de la cuadrícula: grid de 2 columnas `minmax(0, 1fr)` como base y 4 columnas en `@media screen and (min-width: 750px)`, `gap` y `aspect-ratio` desde las variables, `overflow: hidden` y `border-radius` en la caja, imagen y marcador a `width/height: 100%` con `object-fit: cover`, y eliminar las reglas globales `.splide__*`; verificar que a 320px, 749px, 750px y 1440px las cajas miden lo mismo entre sí y no hay scroll horizontal
- [x] 3.2 Ejecutar `shopify theme check` y verificar que no hay avisos nuevos en `sections/category-slide.liquid` respecto al estado previo (había dos: `ImgWidthAndHeight` y `DeprecatedFilter`)

## 4. Plantilla de la portada

- [x] 4.1 Tras `git pull`, eliminar de la instancia `category_slide_cQbWcm` en `templates/index.json` los ajustes `slides_per_page` y `autoplay` y dejar solo los 4 bloques que indique el comerciante (en `blocks` y en `block_order`); verificar que el archivo sigue siendo JSON válido y que `shopify theme check` no reporta problemas en esa instancia

## 5. Verificación integrada

- [ ] 5.1 Con `shopify theme dev`, comprobar en la portada: una fila de cuatro en ≥750px; dos arriba y dos abajo en <750px, en el orden configurado; y, tras cargar una imagen de móvil en una caja, que solo esa caja cambia de imagen en <750px mientras las demás usan la de escritorio
- [ ] 5.2 En el editor de temas, comprobar que la proporción de móvil no altera el escritorio (y viceversa), que el espacio entre imágenes se aplica, que una caja con colección de destino navega a ella y una sin colección no es clicable, que el título se muestra sobre la imagen cuando se rellena, y que con 2 o 3 cajas estas conservan su tamaño

## 6. Entrega

- [x] 6.1 Hacer commit en `develop` con `sections/category-slide.liquid`, `templates/index.json` y la carpeta `openspec/changes/category-slide-to-four-box-grid/`, y push a `origin/develop`; verificar con `git status` que la rama local no va por delante del remoto
