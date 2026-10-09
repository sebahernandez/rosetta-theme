# product-catalog Specification

## Purpose

Describe cómo se presentan los productos: listados de colecciones, tarjetas de producto y página de detalle de producto (PDP).

## Requirements

### Requirement: Página de colección con filtros y orden

La página de colección SHALL mostrar un banner de la colección y una cuadrícula paginada de productos, con filtros (facetas) y opciones de ordenamiento.

#### Scenario: Aplicar un filtro

- **WHEN** un visitante selecciona un filtro en una colección
- **THEN** la cuadrícula se actualiza mostrando solo los productos que cumplen el filtro

#### Scenario: Colección vacía tras filtrar

- **WHEN** ningún producto cumple los filtros seleccionados
- **THEN** se muestra un mensaje de sin resultados con la opción de limpiar filtros

### Requirement: Listado de colecciones

La tienda SHALL ofrecer una página que lista las colecciones disponibles con su imagen y título.

#### Scenario: Visitante explora colecciones

- **WHEN** un visitante abre el listado de colecciones y selecciona una
- **THEN** es llevado a la página de esa colección

### Requirement: Tarjeta de producto unificada

Los productos SHALL mostrarse en listados mediante una tarjeta común que incluye imagen, título, precio, equivalente en bolívares, insignias (oferta, agotado) y, según configuración, compra rápida y botón de favoritos.

#### Scenario: Producto en oferta

- **WHEN** un producto tiene precio de comparación mayor a su precio
- **THEN** la tarjeta muestra el precio rebajado, el precio anterior y la insignia de oferta

#### Scenario: Producto agotado

- **WHEN** un producto no tiene variantes disponibles
- **THEN** la tarjeta muestra la insignia de agotado

#### Scenario: Compra rápida

- **WHEN** la compra rápida está habilitada en la sección y el visitante la usa en una tarjeta
- **THEN** el producto se agrega al carrito, o se abre la selección de variantes si el producto tiene más de una

### Requirement: Página de detalle de producto

La PDP SHALL mostrar la galería de medios, título, precio, equivalente en bolívares, selector de variantes, selector de cantidad, botones de compra, descripción y opción de compartir, organizados como bloques configurables.

#### Scenario: Cambio de variante

- **WHEN** un visitante selecciona otra variante
- **THEN** se actualizan precio, disponibilidad, imagen destacada y la URL de la página

#### Scenario: Variante no disponible

- **WHEN** la variante seleccionada está agotada
- **THEN** el botón de compra se deshabilita e indica que está agotada

### Requirement: Reseñas de producto

La PDP SHALL integrar las reseñas de Judge.me mediante bloques de app: la insignia de valoración junto a la información del producto y el widget de reseñas en la página.

#### Scenario: Producto con reseñas

- **WHEN** un producto tiene reseñas publicadas
- **THEN** la PDP muestra su valoración promedio y el listado de reseñas

### Requirement: Productos relacionados

La PDP SHALL mostrar una sección de productos relacionados basada en las recomendaciones de Shopify.

#### Scenario: Recomendaciones disponibles

- **WHEN** Shopify devuelve recomendaciones para el producto
- **THEN** se muestran como tarjetas de producto debajo del contenido principal
