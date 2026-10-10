# Spec Delta

## MODIFIED Requirements

### Requirement: Tarjeta de producto unificada

Los productos SHALL mostrarse en listados mediante una tarjeta común que incluye imagen, título, precio, equivalente en bolívares, insignias (oferta, agotado) y, según configuración, compra rápida.

#### Scenario: Producto en oferta

- **WHEN** un producto tiene precio de comparación mayor a su precio
- **THEN** la tarjeta muestra el precio rebajado, el precio anterior y la insignia de oferta

#### Scenario: Producto agotado

- **WHEN** un producto no tiene variantes disponibles
- **THEN** la tarjeta muestra la insignia de agotado

#### Scenario: Compra rápida

- **WHEN** la compra rápida está habilitada en la sección y el visitante la usa en una tarjeta
- **THEN** el producto se agrega al carrito, o se abre la selección de variantes si el producto tiene más de una

### Requirement: Tamaños táctiles y de lectura en la tarjeta

Los controles interactivos de la tarjeta (compra rápida) SHALL tener un área táctil de al menos 44 px de alto, y ningún texto de la tarjeta SHALL mostrarse con un tamaño menor a 11 px, en cualquier ancho de pantalla.

#### Scenario: Tarjeta en móvil a dos columnas

- **WHEN** un visitante ve la colección destacada en un teléfono con dos columnas
- **THEN** el botón de compra rápida tiene un área táctil de al menos 44 px de alto y las etiquetas de envío y descuento son legibles

#### Scenario: Navegación por teclado

- **WHEN** un visitante recorre la tarjeta con el teclado
- **THEN** el enlace del producto y el botón de compra rápida reciben el foco con un indicador visible

## ADDED Requirements

### Requirement: Insignias ancladas a la imagen

El porcentaje de descuento y la insignia de oferta o agotado SHALL mostrarse agrupados en una esquina de la imagen, sin cambiar de posición según el largo del título o del contenido de la tarjeta.

#### Scenario: Producto en oferta con título largo

- **WHEN** un producto en oferta tiene un título de dos líneas
- **THEN** el porcentaje de descuento aparece sobre la imagen junto a la insignia de oferta, en la misma posición que en una tarjeta con título de una línea

#### Scenario: Descuento mostrado una sola vez

- **WHEN** un producto tiene precio de comparación mayor a su precio
- **THEN** la tarjeta muestra el porcentaje de descuento una única vez, con el formato `-N%`

#### Scenario: Insignias en la esquina superior derecha

- **WHEN** las insignias están configuradas en la posición superior derecha
- **THEN** se muestran pegadas a esa esquina de la imagen, sin dejar un hueco reservado encima

### Requirement: Componentes de la tarjeta conservados

El rediseño de la tarjeta SHALL conservar todos sus componentes y comportamientos: imagen e imagen secundaria al pasar el cursor, insignias de oferta y agotado, porcentaje de descuento, etiqueta de envío, título, proveedor, valoración, precio, equivalente en bolívares, nota de precios por volumen y las modalidades de compra rápida.

#### Scenario: Agregar al carrito desde la tarjeta

- **WHEN** un visitante usa la compra rápida en una tarjeta de la colección destacada
- **THEN** el producto se agrega al carrito, o se abre la selección de variantes si el producto tiene más de una, igual que antes del rediseño

#### Scenario: Etiqueta de envío

- **WHEN** un producto tiene la etiqueta `envio-rapido`
- **THEN** la tarjeta muestra la etiqueta de envío rápido 24/48h, y en caso contrario la de envío normal

## REMOVED Requirements

### Requirement: Insignias y favoritos anclados a la imagen

**Reason**: La tarjeta ya no tiene botón de favoritos, así que la regla de ubicación del corazón y de no solaparse con las insignias deja de aplicar.

**Migration**: La ubicación de las insignias pasa al requirement "Insignias ancladas a la imagen".

### Requirement: Componentes de la tarjeta preservados

**Reason**: Incluía los favoritos entre los componentes que la tarjeta debía conservar, y ese componente se retira.

**Migration**: El resto de los componentes queda cubierto por el requirement "Componentes de la tarjeta conservados".
