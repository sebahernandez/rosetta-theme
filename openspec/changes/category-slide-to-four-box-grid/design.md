# Design

## Context

Motivación en `proposal.md`; comportamiento esperado en `specs/home-page/spec.md`.

Estado actual observado en `sections/category-slide.liquid`:

- Slider de Splide con `id="image-slider"` fijo, inicializado con un `<script>` inline; `perPage` configurable (1–6) y cortes en 640/768/1024px. Sin `max_blocks`.
- Bloque `category_image` con `category_title`, `category_image`, `target_collection` e `image_alt`. La imagen se renderiza con el filtro obsoleto `img_url` y sin `width`/`height` (dos avisos de `shopify theme check`).
- Altura fija: 300px (280px en ≤768px).
- El `<style>` incluye reglas globales (`.splide__arrow`, `.splide__pagination`, `.splide__pagination__page` con `transform: none !important`, y `.splide__slide { position: relative }`) que afectan a cualquier otro slider de la página.

Uso: una única instancia, `category_slide_cQbWcm` en `templates/index.json`, con **7 bloques** (Belleza y salud, Carnes y pescados, Panadería, Bebidas, Snacks, Cervezas, Vinos), todos sin título y sin colección de destino. `templates/index.json` se sincroniza desde el editor de Shopify.

Splide se carga globalmente en `layout/theme.liquid` y también lo usa `sections/home-slider.liquid`.

## Goals / Non-Goals

**Goals:**

- Cuadrícula CSS sin JavaScript: 4 columnas en ≥750px, 2 columnas en <750px.
- Una sola imagen descargada por caja y dispositivo.
- No romper la referencia de `templates/index.json` a la sección ni a sus bloques.
- Conservar lo que ya ofrece la caja: título sobre la imagen, enlace a colección, texto alternativo, zoom al pasar el cursor.

**Non-Goals:**

- Cambiar `sections/home-slider.liquid` o retirar Splide del theme.
- Crear los artes de móvil (los carga el comerciante).
- Separación distinta por dispositivo.

## Decisions

### 1. Conservar archivo, tipo de sección, tipo de bloque e ids

Se mantiene `sections/category-slide.liquid` (tipo `category-slide`), el bloque `category_image` y sus cuatro ajustes. Solo cambia el `name` del schema y del preset a "Cuadrícula de categorías".

- *Por qué*: `templates/index.json` referencia ese tipo y esos bloques; un tipo inexistente invalida la plantilla, y los valores guardados (imágenes y alt) se conservan.
- Los ids nuevos siguen el idioma que ya usa este archivo (inglés): `category_image_mobile`, `aspect_ratio_desktop`, `aspect_ratio_mobile`.

### 2. Cuadrícula con CSS Grid y proporción fija

Contenedor `display: grid` con `grid-template-columns: repeat(2, minmax(0, 1fr))` como base (móvil) y `repeat(4, minmax(0, 1fr))` en `@media screen and (min-width: 750px)`. Cada caja usa `aspect-ratio`; imagen y marcador de posición a `width/height: 100%`, la imagen con `object-fit: cover`.

- *Por qué*: columnas iguales + `aspect-ratio` garantizan cajas idénticas sin depender de la imagen. Con la altura fija actual (280px) dos columnas en móvil darían cajas muy estrechas y altas.
- Con menos de 4 bloques las columnas siguen fijas, así que las cajas no se estiran.

### 3. Valores de los ajustes por variables CSS

El contenedor recibe en `style` las variables `--category-gap`, `--category-ratio-desktop` y `--category-ratio-mobile`; el `<style>` estático las consume.

- *Por qué*: evita un bloque de estilos por instancia y el `id` fijo actual; el archivo ya usa un `<style>` plano.

### 4. `<picture>` para la imagen por dispositivo

Cada caja renderiza un `<picture>` con `<source media="(max-width: 749px)">` solo cuando existe `category_image_mobile`, y la imagen de escritorio con `image_url | image_tag` (`srcset`, `sizes`, `width`, `height`, `loading="lazy"`). El `alt` sigue siendo `image_alt`, con el título como respaldo.

- *Por qué*: el navegador descarga solo la variante que corresponde, el fallback sale gratis y se resuelven los dos avisos actuales de `theme check`.

### 5. Schema

Ajustes de sección: `gap_size` (se conserva tal cual), `aspect_ratio_desktop` y `aspect_ratio_mobile` (select: `auto` por defecto, `1/1`, `4/3`, `3/4`, `16/9`). Con `auto` todas las cajas usan la proporción de la primera imagen (en móvil, la de su imagen de móvil si existe), de modo que un juego de imágenes de igual proporción se muestra sin recorte y las cajas siguen siendo idénticas. Se eliminan `slides_per_page` y `autoplay`.

Bloque `category_image`: se añade `category_image_mobile` (image_picker, opcional). `max_blocks: 4`.

### 6. Eliminar las reglas globales de Splide

Se eliminan del `<style>` las reglas `.splide__*` y el `<script>`.

- *Por qué*: la sección ya no contiene ningún slider.
- *Efecto colateral*: el slider principal (`home-slider.liquid`) deja de recibir esos `transform: none !important`, por lo que sus flechas y su paginación pasan a comportarse como define su propio CSS. Hoy esa instancia tiene flechas y paginación desactivadas, así que no hay cambio visible.

### 7. Reducir la instancia de la portada a 4 bloques

En `templates/index.json` se eliminan `slides_per_page` y `autoplay`, y se dejan 4 de los 7 bloques.

- *Por qué*: con `max_blocks: 4` una plantilla con 7 bloques no es válida.
- Qué cuatro categorías se quedan es una decisión del comerciante (ver Open Questions).

## Risks / Trade-offs

- [Tres categorías dejan de mostrarse en la portada] → Decisión explícita del comerciante sobre cuáles se quedan antes de tocar la plantilla.
- [`templates/index.json` puede ser sobrescrito por una sincronización desde Shopify con los 7 bloques] → Hacer `git pull` antes de editarlo y subir sección y plantilla en el mismo commit.
- [Con `auto`, una imagen de proporción distinta a la primera se recorta para igualar las cajas] → Usar un juego de imágenes de la misma proporción; revisar en la prueba manual.
- [`aspect-ratio` no existe en navegadores muy antiguos] → Aceptado; el theme base (Refresh 15.2) ya lo usa.

## Migration Plan

1. Implementar la sección.
2. Dejar 4 bloques en `templates/index.json` y limpiar los ajustes obsoletos.
3. Probar en un theme de desarrollo; cargar las imágenes de móvil si se desean.
4. Commit y push a `develop`.

Rollback: revertir el commit restaura el slider y los 7 bloques.

## Open Questions

- ¿Qué cuatro de las siete categorías actuales se quedan en la portada? Bloquea solo la tarea de la plantilla (4.1).
