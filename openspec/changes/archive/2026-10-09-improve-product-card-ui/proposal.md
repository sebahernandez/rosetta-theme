# Proposal

## Why

La tarjeta de producto que muestra la sección `featured-collection` (portada: "Productos Populares", "Ofertas Destacadas", "Productos Destacados") se ve desordenada y es incómoda de usar: las imágenes quedan a distinta altura dentro de una misma fila, el porcentaje de descuento se ubica con un desplazamiento fijo (`bottom: 195px`) que se descuadra según el largo del título, los títulos de una o dos líneas desalinean precio y botón entre tarjetas vecinas, y en móvil el botón de favoritos (30 px) y las etiquetas (9 px) quedan por debajo de un tamaño cómodo para tocar y leer. Se pide un rediseño profesional y centrado en la usabilidad que conserve todos los componentes actuales.

## What Changes

- **Imagen**: todas las tarjetas de una misma cuadrícula muestran la imagen con la misma altura; el producto se ve completo, sin recorte. La sección `featured-collection` pasa a usar proporción cuadrada por defecto.
- **Insignias sobre la imagen**: el porcentaje de descuento deja de flotar con una posición fija y se agrupa con la insignia de oferta/agotado en la esquina de la imagen. Se elimina el duplicado que imprimía el texto mal formado (`-%20%`).
- **Favoritos**: el botón queda anclado a la esquina superior derecha de la imagen, con el mismo margen en todos los anchos y un área táctil cómoda en móvil.
- **Jerarquía de la información**: orden fijo y alineado entre tarjetas — etiqueta de envío, título (máximo 2 líneas con alto reservado), proveedor, valoración, precio, equivalente en bolívares y botón.
- **Botón de compra rápida**: ocupa todo el ancho de la tarjeta, con alto táctil consistente, y queda alineado al borde inferior en todas las tarjetas de la fila, sin importar el largo del contenido.
- **Legibilidad**: tamaños mínimos de texto para etiquetas, precio destacado frente al precio anterior, y espaciado interno uniforme en escritorio y móvil.
- **Limpieza**: los estilos escritos en línea dentro de la tarjeta (botón, etiquetas de envío, bloque `<style>` repetido por tarjeta) pasan a la hoja de estilos de la tarjeta; se deja de cargar Font Awesome una vez por cada tarjeta (ya se carga en `layout/theme.liquid`).
- **Se conservan todos los componentes**: imagen e imagen secundaria, favoritos, insignias de oferta/agotado, porcentaje de descuento, etiqueta de envío (rápido / normal), título, proveedor, valoración, precio, equivalente en bolívares, precios por volumen y las tres modalidades de compra rápida (ninguna, estándar, por cantidad). No cambia ningún comportamiento de carrito, favoritos ni conversión de precio.

Supuesto registrado: la tarjeta es un snippet compartido (`snippets/card-product.liquid`), por lo que la mejora se verá también en la página de colección, el buscador, los productos relacionados y el collage. Es coherente con el requirement vigente "Tarjeta de producto unificada" y se verifica en esos listados; las tarjetas de ofertas con temporizador (`snippets/offer-product.liquid`) no se tocan.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `product-catalog`: se agregan requirements sobre la presentación de la tarjeta de producto unificada (altura uniforme de imagen, ubicación de insignias y favoritos, orden de la información, alineación y tamaño del botón de compra rápida, y tamaños mínimos táctiles y de lectura). El requirement existente "Tarjeta de producto unificada" no cambia.

## Impact

- `snippets/card-product.liquid`: reordenar el marcado de la tarjeta, mover el porcentaje de descuento al grupo de insignias de la imagen, quitar estilos en línea y el `<link>` de Font Awesome repetido.
- `assets/card-product-flexbox.css`: pasa a contener el diseño de la tarjeta (se carga desde el snippet).
- `assets/circular-add-to-cart.css` (carga global en `layout/theme.liquid`): se retiran las reglas de `.discount-percentage-text`, `.favorito` y `.discount-placeholder`, que solo usa la tarjeta; se mantienen las del botón.
- `sections/featured-collection.liquid`: valor por defecto de `image_ratio` pasa de `adapt` a `square`.
- `templates/index.json`: la instancia "Ofertas Destacadas" pasa de `adapt` a `square`.
- Sin cambios en JavaScript, locales, esquema de ajustes del theme ni dependencias. Secciones que también muestran la tarjeta y deben revisarse visualmente: `main-collection-product-grid`, `main-search`, `related-products`, `collage`, `main-product`, `product-card`.
