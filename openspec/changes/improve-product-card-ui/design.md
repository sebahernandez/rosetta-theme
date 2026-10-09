# Design

## Context

Motivación en `proposal.md` (Why). Estado observado en el código:

- `sections/featured-collection.liquid` renderiza `snippets/card-product.liquid` dentro de `ul.grid.product-grid`. En portada hay tres instancias (`templates/index.json`): dos con `image_ratio: square` y "Ofertas Destacadas" con `adapt`, las tres con `quick_add: standard`, 4 columnas en escritorio y 2 en móvil.
- Ajustes del theme activos: `card_style: card`, `card_image_padding: 0`, `card_corner_radius: 0`, borde de 1 px, `badge_position: top left`, `card_text_alignment: left`.
- Con `card_style: card`, `component-card.css` oculta el bloque de información interno de `.card__inner` y muestra solo la insignia de `.card__inner` (sobre la imagen) y el contenido de `.card > .card__content`.
- La tarjeta arrastra estilos en tres lugares: `assets/card-product-flexbox.css` (cargado por el snippet), `assets/circular-add-to-cart.css` (cargado global en `layout/theme.liquid:557`) y estilos en línea en el propio snippet.
- Problemas concretos:
  - `.discount-percentage-text` usa `position: absolute; bottom: 195px` (210 px bajo 370 px), un número que depende del alto del contenido.
  - El porcentaje se imprime dos veces; la primera copia (`-%{{ n }}%`) queda oculta por CSS con el estilo `card`.
  - `.favorito` usa `right: 35px` en escritorio y `10px` en móvil; el botón mide 45 px en escritorio y 30 px en móvil (`.custom-btn-icon` en `layout/theme.liquid`).
  - `.card__information-title { min-height: 30px }` se emite en un `<style>` por cada tarjeta y no evita el desalineado con títulos de dos líneas.
  - El `<link>` de Font Awesome está fuera de `unless skip_styles`, así que se repite en cada tarjeta, aunque ya se carga en `layout/theme.liquid:8`.
  - Botones de compra rápida con `style="... !important"` en línea, duplicando lo que ya define `circular-add-to-cart.css`.
  - Etiquetas de envío con estilos en línea y texto de 9 px.
  - `.card__media .media img` usa `object-fit: cover`, que recorta fotos no cuadradas.
  - En la tarjeta real, `.quick-add` queda fuera de `.product-info-buttons-container`; en la tarjeta de ejemplo (placeholder) queda dentro, con reparto 70 % / auto.
  - `{{ block.settings.description }}` imprime un `<span>` vacío: `block` no existe en el contexto del snippet.

Restricción: sin build step; solo Liquid y CSS. `snippets/card-product.liquid` es compartido por siete secciones.

## Goals / Non-Goals

**Goals:**

- Cumplir los requirements del delta de `product-catalog` solo con cambios de marcado y CSS.
- Dejar una única fuente de estilos para la tarjeta, sin estilos en línea ni números de posición dependientes del contenido.
- No alterar los `id`, `class` y atributos que usan `product-form.js`, `quick-add.js`, `quick-add-bulk.js` y la lógica de favoritos (`.wishlist_button`, `data-product-id`, `data-product-title`, `.quick-add__submit`, `.sold-out-message`, `.loading__spinner`).

**Non-Goals:**

- Cambiar la paleta de marca (rosa `#ff71db` del botón) o la tipografía.
- Tocar `snippets/offer-product.liquid`, `snippets/bs-price.liquid`, `snippets/price.liquid` ni la lógica de favoritos.
- Agregar ajustes nuevos al editor de temas.
- Refactorizar `component-card.css` heredado de Refresh.

## Decisions

### 1. Los estilos nuevos viven en `assets/card-product-flexbox.css`, acotados a `.product-card-wrapper`

Ya lo carga el snippet y solo lo usa la tarjeta. Se reescribe su contenido y todas las reglas nuevas cuelgan de `.product-card-wrapper` para ganar especificidad sobre `component-card.css` sin `!important` y sin afectar tarjetas de colección o de artículo.

- Alternativa: editar `component-card.css`. Descartada: es código heredado de Refresh compartido con otras tarjetas y complica futuras actualizaciones del theme.
- Alternativa: archivo nuevo. Descartada: dejaría un tercer archivo con estilos de la misma tarjeta.

De `circular-add-to-cart.css` se retiran `.discount-percentage-text`, `.discount-placeholder`, `.favorito` y `@keyframes fadeInSlide` (verificado: solo los usa `card-product.liquid`). Las reglas de `.quick-add__submit` se quedan ahí porque son globales (también aplican a la compra rápida de otras vistas); la tarjeta solo añade alto mínimo y ancho.

### 2. Imagen: caja de proporción fija + `object-fit: contain`

La caja ya la da `.ratio` con `--ratio-percent` (100 % en cuadrada, 125 % en vertical). Se cambia el ajuste de la imagen a `contain` dentro de `.product-card-wrapper`, con el fondo del esquema de color de la tarjeta, para que ninguna foto se recorte. La imagen secundaria al pasar el cursor usa el mismo ajuste.

Para que las tres instancias de portada queden uniformes, el valor por defecto de `image_ratio` en `featured-collection` pasa a `square` y "Ofertas Destacadas" en `templates/index.json` pasa a `square`.

- Alternativa: forzar proporción cuadrada cuando el ajuste es `adapt`. Descartada: cambia el significado de una opción que el comerciante elige a propósito y que usan `collage` y `product-card` de forma fija.
- Alternativa: mantener `cover`. Descartada: recorta el producto, que es justo lo que no se quiere en fotos de catálogo.

### 3. Insignias en una pila única sobre la imagen

El porcentaje de descuento se mueve dentro del `.card__badge` de `.card__inner`, junto a la insignia de oferta/agotado. Ese contenedor pasa a ser una pila flex (columna, separación de 0.4 rem) anclada a la esquina que define `settings.badge_position`. Así desaparece el `bottom: 195px` y no hay solape posible entre insignia y porcentaje. Se elimina la copia mal formada (`-%N%`) y la copia del contenido inferior.

El contenedor de favoritos (`.favorito`) queda en la esquina superior derecha con `top` y `right` iguales (0.8 rem) en todos los anchos. Si `badge_position` es una posición derecha, la pila de insignias baja para no chocar con el corazón.

- Alternativa: dejar el porcentaje junto al precio. Descartada: la zona de precio ya lleva precio rebajado, precio anterior y equivalente en bolívares; en móvil a dos columnas no cabe sin partir línea.

### 4. Contenido como columna flex con el botón empujado al fondo

`.card > .card__content` hoy es una grilla de tres filas pensada para centrar. Dentro de `.product-card-wrapper` se redefine como columna flex: `.card__information` crece (`flex: 1`) y es a su vez columna flex; `.quick-add` / `quick-add-bulk` lleva `margin-top: auto`. Con `card--extend-height` todas las tarjetas de la fila ya comparten alto, así que los botones quedan en la misma línea.

`featured-collection` no pasa `extend_height`; se añade `extend_height: true` al render de esa sección (el propio snippet documenta que ese es su valor por defecto esperado) y se comprueba que la tarjeta llene el alto del `li`.

Orden del marcado bajo la imagen: etiqueta de envío → título → proveedor → valoración → precio → equivalente Bs → nota de volumen → compra rápida. Es el orden que ya tiene el snippet; solo se quitan los `div` envoltorio sin clase y el `<span>` vacío de `block.settings.description`. En la tarjeta de ejemplo, `.quick-add` sale de `.product-info-buttons-container` para igualar la estructura de la tarjeta real.

### 5. Título a dos líneas con alto reservado

`-webkit-line-clamp: 2` sobre el enlace del título, con `min-height` igual a dos líneas (`calc(2 * line-height)`). Reemplaza el `<style>` en línea con `min-height: 30px`. El texto completo sigue en el DOM, así que lectores de pantalla y `aria-labelledby` no cambian.

### 6. Tamaños

| Elemento | Escritorio (≥750 px) | Móvil |
| --- | --- | --- |
| Botón compra rápida | alto mínimo 44 px, ancho 100 %, texto 14 px | alto mínimo 44 px, ancho 100 %, texto 13 px |
| Botón favoritos | 40 px | 36 px visibles, área táctil 44 px (pseudo-elemento) |
| Etiquetas envío / descuento | 11 px | 11 px |
| Título | 14 px, peso 500 | 13 px |
| Precio | 16 px, peso 700 | 15 px |
| Precio anterior | 12 px, tachado, atenuado | 12 px |
| Equivalente Bs | 12 px (lo define `bs-price`, 14 px hoy; se ajusta solo dentro de la tarjeta) | 12 px |
| Relleno del contenido | 1.2 rem | 1 rem |

El tamaño del corazón se sobrescribe con `.product-card-wrapper .favorito .custom-btn-icon`, sin tocar la regla global de `layout/theme.liquid`, que también usa la página de producto.

El relleno y alto del botón dejan de venir de `style` en línea; como `circular-add-to-cart.css` ya fija `padding: 12px 20px !important`, la tarjeta solo declara `min-height` y, en móvil, un relleno horizontal menor con la misma especificidad más `.product-card-wrapper`.

### 7. Etiquetas de envío con clases

Los estilos en línea pasan a dos modificadores: `badge card-shipping card-shipping--fast` y `badge card-shipping card-shipping--standard`, con los mismos colores actuales.

### 8. Font Awesome

Se elimina el `<link>` del snippet: `layout/theme.liquid:8` ya lo carga en todas las páginas. Los íconos `fa-heart` y `fa-ban` siguen funcionando.

### 9. Refinamiento visual posterior

Tras la primera entrega se ajustó la tarjeta con un criterio: el precio es el único elemento con peso, y todo lo demás baja de volumen.

- Precio a 18 px (16 px en móvil) con cifras tabulares; el equivalente en bolívares también usa cifras tabulares.
- Esquinas de la tarjeta a 12 px mediante el ajuste del theme `card_corner_radius` (antes 0), para acompañar los banners y las cajas de categorías, que ya son redondeados.
- La etiqueta "Envío normal" pasa a texto atenuado sin caja, porque aparece en casi todas las tarjetas; solo "Rápido 24/48h" conserva la píldora, que es la que aporta información.
- Corazón de favoritos blanco con borde fino, sin sombra.
- Porcentaje de descuento sin borde, a 12 px.
- Botón agotado en gris claro con texto gris oscuro, legible (antes texto blanco sobre gris).
- Texto del botón de la tarjeta de ejemplo igual al de la tarjeta real ("Agregar").

Descartado: atenuar la imagen de los productos agotados. Mientras el catálogo completo figure sin disponibilidad, apagaría toda la tienda.

## Risks / Trade-offs

- [El snippet es compartido: el cambio se ve en colección, buscador, relacionados, collage y página de producto] → Reglas acotadas a `.product-card-wrapper`; verificación visual explícita de cada listado en `tasks.md`. `collage` usa `.collage-card.product-card-wrapper` con tarjeta horizontal en algunos casos: las reglas de columna flex excluyen `.card--horizontal`.
- [`contain` deja bandas vacías en fotos muy alargadas] → Fondo del esquema de color de la tarjeta y centrado; es preferible a recortar el producto.
- [`templates/index.json` lo reescribe Shopify al guardar desde el editor ("Update from Shopify")] → El cambio de `adapt` a `square` es de una sola clave; si se pisa, se vuelve a elegir "Cuadrado" en el editor. El valor por defecto de la sección cubre instancias nuevas.
- [Los `!important` globales de `circular-add-to-cart.css` pueden ganar a las reglas nuevas del botón] → Mantener la misma cadena de selectores con el prefijo `.product-card-wrapper` y, solo donde haga falta, `!important` en la misma propiedad.
- [Contraste del texto blanco sobre rosa `#ff71db` es bajo] → Fuera de alcance (paleta de marca); se deja anotado para una decisión de marca posterior.
- [Reordenar el marcado puede romper selectores de JS] → No se renombra ni se mueve ningún nodo con `id` o clase usada por los scripts; prueba manual de compra rápida (una variante, varias variantes, agotado) y de favoritos.

## Migration Plan

Despliegue por commit en `develop` (el theme se sincroniza desde el repositorio). Rollback: revertir el commit; no hay datos ni ajustes migrados.
