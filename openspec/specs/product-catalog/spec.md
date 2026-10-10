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

### Requirement: Control de cantidad en la tarjeta de producto

Cuando la compra rápida estándar está habilitada y el producto tiene una sola variante disponible sin reglas de cantidad, la tarjeta SHALL mostrar un botón "Agregar" que, al pulsarse, agrega una unidad al carrito y se reemplaza en el mismo lugar por un control con botón de disminuir, cantidad actual y botón de aumentar. Cada pulsación de aumentar o disminuir SHALL actualizar la cantidad de ese producto en el carrito sin ninguna confirmación adicional y sin recargar la página.

#### Scenario: Primer clic en Agregar

- **WHEN** un visitante pulsa "Agregar" en la tarjeta de un producto que no está en su carrito
- **THEN** el carrito pasa a tener una unidad del producto, el contador del encabezado aumenta y la tarjeta muestra el control con la cantidad 1

#### Scenario: Aumentar la cantidad

- **WHEN** un visitante pulsa el botón de aumentar en una tarjeta que muestra la cantidad 1
- **THEN** la tarjeta muestra la cantidad 2 y el carrito contiene dos unidades del producto

#### Scenario: Varias pulsaciones seguidas

- **WHEN** un visitante pulsa cuatro veces seguidas el botón de aumentar
- **THEN** la cantidad mostrada sube de inmediato con cada pulsación y el carrito termina con la misma cantidad que muestra la tarjeta

#### Scenario: Disminuir hasta cero

- **WHEN** un visitante pulsa el botón de disminuir en una tarjeta que muestra la cantidad 1
- **THEN** el producto se elimina del carrito, el contador del encabezado disminuye y la tarjeta vuelve a mostrar el botón "Agregar"

#### Scenario: Producto con varias variantes

- **WHEN** un visitante usa la compra rápida en la tarjeta de un producto con más de una variante
- **THEN** se abre la selección de variantes y la tarjeta no muestra el control de cantidad

#### Scenario: Producto agotado

- **WHEN** el producto no tiene variantes disponibles
- **THEN** la tarjeta muestra el botón deshabilitado con el texto de agotado y no muestra el control de cantidad

### Requirement: La tarjeta refleja la cantidad del carrito

El control de cantidad de la tarjeta SHALL mostrar siempre la cantidad que el carrito contiene de ese producto, tanto al cargar la página como cuando la cantidad cambia desde otro punto de la tienda.

#### Scenario: Producto ya presente en el carrito al cargar

- **WHEN** un visitante con tres unidades de un producto en el carrito abre una página que muestra la tarjeta de ese producto
- **THEN** la tarjeta muestra el control con la cantidad 3 en lugar del botón "Agregar"

#### Scenario: Cambio desde el cajón del carrito

- **WHEN** un visitante cambia la cantidad de un producto o lo elimina desde el cajón del carrito
- **THEN** la tarjeta de ese producto visible en la página muestra la nueva cantidad, o el botón "Agregar" si se eliminó

#### Scenario: Mismo producto en dos listados de la página

- **WHEN** el mismo producto aparece en dos colecciones destacadas de la portada y el visitante cambia la cantidad en una de las tarjetas
- **THEN** la otra tarjeta muestra la misma cantidad

#### Scenario: Volver atrás en el navegador

- **WHEN** un visitante cambia cantidades en otra página y vuelve con el botón atrás del navegador
- **THEN** las tarjetas muestran las cantidades actuales del carrito

### Requirement: Límite de cantidad en la tarjeta

Cuando la cantidad solicitada desde la tarjeta no puede cumplirse, la tarjeta SHALL mostrar la cantidad que el carrito realmente contiene y SHALL informar al visitante del motivo.

#### Scenario: Se supera el inventario disponible

- **WHEN** un visitante pulsa aumentar y la cantidad resultante supera el inventario disponible del producto
- **THEN** la tarjeta muestra un aviso breve de cantidad máxima y la cantidad queda en la que el carrito aceptó

#### Scenario: Error de red al actualizar

- **WHEN** la actualización del carrito falla por un problema de conexión
- **THEN** la tarjeta vuelve a mostrar la última cantidad confirmada por el carrito y un aviso de que no se pudo actualizar

### Requirement: Accesibilidad y tamaño del control de cantidad

El control de cantidad SHALL ocupar el mismo lugar y ancho que el botón "Agregar", sus botones de aumentar y disminuir SHALL tener un área táctil de al menos 44 px, SHALL poder usarse con teclado y SHALL anunciar la cantidad actual a los lectores de pantalla.

#### Scenario: Paso de botón a control sin saltos

- **WHEN** una tarjeta pasa de mostrar "Agregar" a mostrar el control de cantidad
- **THEN** la altura de la tarjeta y la posición de las tarjetas vecinas no cambian

#### Scenario: Uso con teclado

- **WHEN** un visitante navega con el tabulador hasta el control y activa aumentar o disminuir con Enter o Espacio
- **THEN** la cantidad cambia, el foco permanece dentro del control y el lector de pantalla anuncia la nueva cantidad

#### Scenario: Tarjeta en móvil a dos columnas

- **WHEN** la tarjeta se muestra a 375 px de ancho en una cuadrícula de dos columnas
- **THEN** los botones de aumentar y disminuir y la cantidad se ven completos, sin desbordar la tarjeta
