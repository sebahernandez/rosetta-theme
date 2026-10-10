# Proposal

## Why

La sección de categorías de la portada (`sections/category-slide.liquid`) es hoy un slider de Splide. El comerciante necesita en su lugar un bloque fijo de cuatro cajas de imagen del mismo tamaño, visibles a la vez, con imágenes propias para móvil y para escritorio, y que en móvil se acomoden dos arriba y dos abajo (como la cara del 4 en un dado).

## What Changes

- **BREAKING** La sección deja de ser un slider: se eliminan el carrusel, el autoplay, las flechas, la paginación, el arrastre y el ajuste "Imágenes por página".
- La sección pasa a mostrar hasta **4 cajas de categoría fijas del mismo tamaño**: en escritorio las cuatro en una fila; en móvil en cuadrícula de 2 × 2.
- **BREAKING** El máximo de bloques pasa a ser 4 (hoy no hay límite y la portada tiene 7 categorías cargadas: tres dejan de mostrarse).
- Cada caja añade una **imagen para móvil** opcional; si falta, se usa la imagen actual (escritorio).
- Se añade la proporción de las cajas, independiente para escritorio y móvil y por defecto adaptada a la imagen (sin recorte), en lugar de las alturas fijas de 300px/280px.
- Se conservan sin cambios: el título opcional sobre la imagen, la colección de destino, el texto alternativo y el ajuste de espacio entre imágenes.
- La sección cambia de nombre en el editor de temas ("Category Image Slider" → "Cuadrícula de categorías"); el archivo y el tipo de sección (`category-slide`) se conservan para no romper la plantilla de la portada.

Supuestos asumidos (no indicados explícitamente en la solicitud):

- En escritorio las cuatro cajas van en una sola fila (la solicitud solo fija el 2 × 2 para móvil).
- El punto de corte móvil/escritorio es 750px, el mismo que usa el banner promocional.
- El espacio entre cajas sigue siendo un único valor para ambos dispositivos (el ajuste existente).

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `home-page`: el requirement "Navegación por categorías" deja de describir un slider y pasa a describir una cuadrícula fija de cuatro cajas, y se añaden requirements de tamaño, disposición e imágenes por dispositivo; el requirement "Portada componible por secciones" deja de enumerar un slider de categorías.

## Impact

- `sections/category-slide.liquid`: reescritura de marcado, estilos y schema; se elimina el script de inicialización de Splide y las reglas globales `.splide__*` que este archivo aplicaba a todos los sliders de la página.
- `templates/index.json`: la instancia `category_slide_cQbWcm` guarda dos ajustes que dejan de existir (`slides_per_page`, `autoplay`) y 7 bloques; hay que dejar 4.
- Splide (`assets/splide.min.*`, cargado en `layout/theme.liquid`) se mantiene: lo sigue usando `sections/home-slider.liquid`.
- Sin cambios en dependencias, locales ni otras secciones.
