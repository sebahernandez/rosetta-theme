# seleccionado-section Specification

## Purpose

Define la sección "Seleccionado": un encabezado y tarjetas de colección con imagen, textos y productos de compra rápida, compuestos por bloques editables desde el editor de temas.

## Requirements

### Requirement: Encabezado editable por bloques

La sección SHALL permitir componer su encabezado con bloques de etiqueta superior, título y subtítulo. Cada bloque SHALL exponer su texto y color, y SHALL NOT renderizar su elemento si no tiene contenido.

#### Scenario: Título con acento

- **WHEN** el comerciante escribe un título y un texto de acento
- **THEN** el título se muestra con el texto de acento en cursiva y color de acento distinto

#### Scenario: Bloque sin texto

- **WHEN** el comerciante deja vacío el texto del subtítulo
- **THEN** el subtítulo no se muestra y el resto del encabezado se mantiene

### Requirement: Tarjetas de colección editables

La sección SHALL mostrar una tarjeta por cada bloque de colección, con imagen, etiqueta, título, descripción y color de fondo editables. Las tarjetas SHALL poder añadirse, eliminarse y reordenarse sin cambios de código.

#### Scenario: Dos tarjetas en escritorio

- **WHEN** el comerciante define dos bloques de colección
- **THEN** en escritorio se muestran lado a lado y en móvil una debajo de la otra

#### Scenario: Tarjeta sin imagen

- **WHEN** una tarjeta no tiene imagen cargada
- **THEN** se muestra una imagen de marcador de posición en el editor y la tarjeta conserva su estructura

### Requirement: Productos como bloques

Cada bloque de producto SHALL mostrarse como una fila dentro de la tarjeta de colección que lo precede en el orden de bloques, con miniatura, nombre y precio del producto elegido. La fila SHALL enlazar a la página del producto.

#### Scenario: Asociar productos a una tarjeta

- **WHEN** el comerciante añade tres bloques de producto después de una tarjeta de colección
- **THEN** las tres filas aparecen dentro de esa tarjeta en el orden definido

#### Scenario: Producto sin seleccionar

- **WHEN** un bloque de producto no tiene producto elegido
- **THEN** no se muestra al visitante

#### Scenario: Producto agotado

- **WHEN** el producto elegido no tiene variantes disponibles
- **THEN** la fila indica que está agotado y su botón de agregar está deshabilitado

### Requirement: Agregar al carrito sin abrir el cajón

El botón de agregar de cada fila SHALL añadir una unidad del producto al carrito sin abrir el cajón lateral ni salir de la página, y SHALL actualizar el contador del encabezado y el contenido del cajón.

#### Scenario: Agregar un producto

- **WHEN** el visitante pulsa el botón "+" de una fila
- **THEN** se agrega una unidad al carrito, el contador del encabezado aumenta y el cajón permanece cerrado

#### Scenario: Cantidad no disponible

- **WHEN** el carrito ya tiene todo el inventario disponible del producto y el visitante pulsa "+"
- **THEN** se muestra un mensaje de error en la fila y el carrito no cambia

#### Scenario: Envío en curso

- **WHEN** el visitante pulsa "+" mientras la solicitud anterior de esa fila sigue en curso
- **THEN** el botón no envía una segunda solicitud hasta que la primera termine

### Requirement: Valores de diseño editables

La sección SHALL exponer ajustes de color de fondo, márgenes y relleno del contenedor. Una sección sin bloques SHALL renderizarse sin errores.

#### Scenario: Cambiar el color de una tarjeta

- **WHEN** el comerciante cambia el color de fondo de una tarjeta
- **THEN** solo esa tarjeta cambia de color

#### Scenario: Sección vacía

- **WHEN** la sección se añade sin bloques
- **THEN** el editor la muestra sin errores y la tienda no renderiza contenido roto
