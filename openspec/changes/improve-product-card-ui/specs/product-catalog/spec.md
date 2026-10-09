# Spec Delta

## ADDED Requirements

### Requirement: Altura uniforme de la imagen en la tarjeta

Las tarjetas de producto de una misma cuadrícula SHALL mostrar el área de imagen con la misma altura cuando la sección usa proporción cuadrada o vertical, y la imagen del producto SHALL verse completa, sin recorte, dentro de esa área.

#### Scenario: Imágenes con proporciones distintas

- **WHEN** una colección destacada con proporción cuadrada muestra productos cuyas fotos tienen proporciones distintas
- **THEN** todas las tarjetas de la fila tienen el área de imagen a la misma altura y cada foto se ve completa y centrada

#### Scenario: Producto sin imagen

- **WHEN** un producto de la cuadrícula no tiene imagen
- **THEN** su tarjeta conserva la misma altura total que las demás tarjetas de la fila

### Requirement: Insignias y favoritos anclados a la imagen

El porcentaje de descuento y la insignia de oferta o agotado SHALL mostrarse agrupados en una esquina de la imagen, y el botón de favoritos SHALL mostrarse en la esquina superior derecha de la imagen, sin superponerse entre sí ni cambiar de posición según el largo del título o del contenido de la tarjeta.

#### Scenario: Producto en oferta con título largo

- **WHEN** un producto en oferta tiene un título de dos líneas
- **THEN** el porcentaje de descuento aparece sobre la imagen junto a la insignia de oferta, en la misma posición que en una tarjeta con título de una línea

#### Scenario: Descuento mostrado una sola vez

- **WHEN** un producto tiene precio de comparación mayor a su precio
- **THEN** la tarjeta muestra el porcentaje de descuento una única vez, con el formato `-N%`

#### Scenario: Favoritos e insignias en tarjeta angosta

- **WHEN** la tarjeta se muestra en una cuadrícula de dos columnas en móvil
- **THEN** el botón de favoritos y las insignias no se solapan

### Requirement: Jerarquía de la información en la tarjeta

Bajo la imagen, la tarjeta SHALL presentar la información siempre en este orden: etiqueta de envío, título, proveedor (si está habilitado), valoración (si está habilitada), precio, equivalente en bolívares y compra rápida (si está habilitada). El título SHALL ocupar como máximo dos líneas y reservar siempre el alto de dos líneas.

#### Scenario: Títulos de distinto largo en la misma fila

- **WHEN** una fila tiene una tarjeta con título de una línea y otra con título de dos líneas
- **THEN** el precio de ambas tarjetas queda a la misma altura

#### Scenario: Título muy largo

- **WHEN** el título de un producto no cabe en dos líneas
- **THEN** se corta en la segunda línea con puntos suspensivos y el título completo sigue disponible para lectores de pantalla y al entrar al producto

#### Scenario: Precio en oferta

- **WHEN** un producto tiene precio de comparación mayor a su precio
- **THEN** el precio rebajado se muestra con mayor énfasis que el precio anterior, y el equivalente en bolívares aparece debajo del precio

### Requirement: Botón de compra rápida alineado y de ancho completo

Cuando la compra rápida está habilitada, su control SHALL ocupar todo el ancho útil de la tarjeta y SHALL quedar alineado al borde inferior de la tarjeta, a la misma altura en todas las tarjetas de una fila.

#### Scenario: Tarjetas con contenido de distinta altura

- **WHEN** una fila combina tarjetas con y sin valoración o con títulos de distinto largo
- **THEN** los botones de compra rápida de toda la fila quedan alineados en la misma línea horizontal

#### Scenario: Producto agotado

- **WHEN** el producto no tiene variantes disponibles
- **THEN** el botón se muestra deshabilitado con el texto de agotado, con el mismo tamaño y posición que un botón activo

#### Scenario: Compra por cantidad

- **WHEN** la sección usa la modalidad de compra rápida por cantidad
- **THEN** el selector de cantidad ocupa el mismo lugar y ancho que el botón de compra rápida

### Requirement: Tamaños táctiles y de lectura en la tarjeta

Los controles interactivos de la tarjeta (compra rápida y favoritos) SHALL tener un área táctil de al menos 44 px de alto, y ningún texto de la tarjeta SHALL mostrarse con un tamaño menor a 11 px, en cualquier ancho de pantalla.

#### Scenario: Tarjeta en móvil a dos columnas

- **WHEN** un visitante ve la colección destacada en un teléfono con dos columnas
- **THEN** el botón de compra rápida y el botón de favoritos tienen un área táctil de al menos 44 px de alto y las etiquetas de envío y descuento son legibles

#### Scenario: Navegación por teclado

- **WHEN** un visitante recorre la tarjeta con el teclado
- **THEN** el enlace del producto, el botón de favoritos y el botón de compra rápida reciben el foco con un indicador visible

### Requirement: Componentes de la tarjeta preservados

El rediseño de la tarjeta SHALL conservar todos sus componentes y comportamientos: imagen e imagen secundaria al pasar el cursor, favoritos, insignias de oferta y agotado, porcentaje de descuento, etiqueta de envío, título, proveedor, valoración, precio, equivalente en bolívares, nota de precios por volumen y las modalidades de compra rápida.

#### Scenario: Agregar al carrito desde la tarjeta

- **WHEN** un visitante usa la compra rápida en una tarjeta de la colección destacada
- **THEN** el producto se agrega al carrito, o se abre la selección de variantes si el producto tiene más de una, igual que antes del rediseño

#### Scenario: Marcar como favorito

- **WHEN** la lista de favoritos está activada y el visitante pulsa el corazón de una tarjeta
- **THEN** el producto se agrega o se quita de favoritos y el ícono refleja el estado, igual que antes del rediseño

#### Scenario: Etiqueta de envío

- **WHEN** un producto tiene la etiqueta `envio-rapido`
- **THEN** la tarjeta muestra la etiqueta de envío rápido 24/48h, y en caso contrario la de envío normal
