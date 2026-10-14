# Spec Delta

## Purpose

Define la sección "Destacados home": un encabezado y una tarjeta promocional compuestos por bloques, junto a 4 productos de una colección elegida por el comerciante, con espaciado y colores editables desde el editor de temas.

## ADDED Requirements

### Requirement: Productos de la colección configurada

La sección SHALL mostrar hasta 4 productos de la colección seleccionada en los ajustes de la sección, usando la tarjeta de producto existente del tema. El orden SHALL ser el de la colección.

#### Scenario: Colección con 4 o más productos

- **WHEN** el comerciante selecciona una colección con 6 productos
- **THEN** la sección muestra exactamente los 4 primeros productos con la tarjeta de producto del tema

#### Scenario: Colección con menos de 4 productos

- **WHEN** la colección seleccionada tiene 2 productos
- **THEN** la sección muestra esos 2 productos sin romper el layout

#### Scenario: Sin colección seleccionada

- **WHEN** la sección no tiene colección seleccionada
- **THEN** se muestran 4 tarjetas de marcador de posición en el editor y el resto de la sección se mantiene

### Requirement: Contenido compuesto por bloques

La sección SHALL permitir componer el encabezado y la tarjeta promocional con bloques de los tipos: etiqueta superior, título y tarjeta promocional. Los bloques SHALL mostrarse en el orden definido en el editor y SHALL poder añadirse, eliminarse y reordenarse sin cambios de código.

#### Scenario: Añadir un bloque

- **WHEN** el comerciante añade un bloque de título en el editor de temas
- **THEN** el título aparece en el encabezado en la posición elegida

#### Scenario: Eliminar el bloque de tarjeta promocional

- **WHEN** el comerciante elimina el bloque de tarjeta promocional
- **THEN** la tarjeta deja de mostrarse y los productos ocupan el ancho de la fila

#### Scenario: Reordenar bloques

- **WHEN** el comerciante mueve la etiqueta superior después del título
- **THEN** la tienda muestra el título antes de la etiqueta

### Requirement: Bloques con valores propios

Cada bloque SHALL exponer sus propios ajustes. La etiqueta y el título permiten editar texto y color. La tarjeta promocional permite editar icono, título, texto, nota con enlace opcional, y los colores de fondo y de texto. Un bloque sin contenido SHALL NOT renderizar su elemento.

#### Scenario: Título en dos líneas

- **WHEN** el comerciante escribe un título con un salto de línea en el bloque de título
- **THEN** el título se muestra en dos líneas

#### Scenario: Tarjeta promocional con colores propios

- **WHEN** el comerciante cambia el color de fondo de la tarjeta promocional
- **THEN** la tarjeta se muestra con ese fondo y el texto mantiene el color configurado

#### Scenario: Nota sin texto

- **WHEN** el bloque de tarjeta promocional no tiene texto de nota
- **THEN** no se muestra el recuadro de la nota

#### Scenario: Bloque vacío

- **WHEN** el bloque de etiqueta superior no tiene texto
- **THEN** no se muestra ningún elemento vacío en su lugar

### Requirement: Espaciado de los contenedores configurable

La sección SHALL permitir configurar desde el editor de temas el margen y el relleno, superior, inferior y lateral, con valores en píxeles, aplicados al contenedor principal de la sección.

#### Scenario: Cambiar el relleno

- **WHEN** el comerciante aumenta el relleno superior de la sección
- **THEN** el contenido se separa más del borde superior de la sección

#### Scenario: Cambiar el margen

- **WHEN** el comerciante aumenta el margen inferior
- **THEN** aumenta el espacio entre la sección y la siguiente

### Requirement: Color de fondo de la sección

La sección SHALL permitir elegir el color de fondo de toda la sección desde los ajustes. El fondo SHALL cubrir el ancho completo de la sección, incluidos sus márgenes laterales.

#### Scenario: Cambiar el color de fondo

- **WHEN** el comerciante elige un color de fondo en los ajustes
- **THEN** toda la sección se muestra con ese color

### Requirement: Diseño responsive

En pantallas anchas la sección SHALL mostrar la tarjeta promocional y los productos en una misma fila. En pantallas estrechas SHALL apilarlos sin scroll horizontal, con la tarjeta promocional primero y los productos en dos columnas.

#### Scenario: Escritorio

- **WHEN** el ancho de pantalla es de 990 px o más
- **THEN** la tarjeta promocional y los 4 productos se muestran en una sola fila

#### Scenario: Móvil

- **WHEN** el ancho de pantalla es de 390 px
- **THEN** la tarjeta promocional ocupa todo el ancho, los productos se muestran en dos columnas y no hay scroll horizontal
