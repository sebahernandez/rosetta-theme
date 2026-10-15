# beneficios-section Specification
## Purpose

Define la sección "Beneficios": una franja responsive de beneficios de la tienda (envío, pago, atención, devoluciones) compuesta por bloques editables desde el editor de temas, con ícono, textos, colores, márgenes y rellenos configurables.

## Requirements

### Requirement: Beneficios como bloques

La sección SHALL mostrar un beneficio por cada bloque, con ícono, título y descripción. Los bloques SHALL poder añadirse, eliminarse y reordenarse sin cambios de código, hasta un máximo de 6.

#### Scenario: Cuatro beneficios por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** se muestran cuatro beneficios: "Envío gratuito", "Pago seguro", "Atención 24/7" y "Devolución garantizada", cada uno con su ícono y descripción

#### Scenario: Bloque sin texto

- **WHEN** un bloque no tiene título ni descripción
- **THEN** ese bloque no se renderiza y los demás beneficios se mantienen

#### Scenario: Descripción vacía

- **WHEN** el comerciante deja vacía solo la descripción de un bloque
- **THEN** el beneficio se muestra con su ícono y título, sin espacio vacío para la descripción

### Requirement: Ícono configurable

Cada bloque SHALL permitir elegir su ícono entre un conjunto de íconos integrados, o usar una imagen propia que reemplace al ícono integrado cuando está cargada.

#### Scenario: Ícono integrado

- **WHEN** el comerciante elige un ícono del conjunto integrado y no carga imagen
- **THEN** el beneficio muestra ese ícono dentro de su círculo de fondo

#### Scenario: Imagen propia

- **WHEN** el comerciante carga una imagen en el bloque
- **THEN** el beneficio muestra la imagen en lugar del ícono integrado

### Requirement: Colores configurables

La sección SHALL permitir configurar el color de fondo de la sección y el color de los separadores. Cada bloque SHALL permitir configurar el color del ícono, el color del círculo de fondo del ícono, el color del título y el color de la descripción.

#### Scenario: Cambio de colores de un bloque

- **WHEN** el comerciante cambia el color del círculo de fondo y del ícono de un bloque
- **THEN** solo ese bloque refleja los nuevos colores y los demás conservan los suyos

#### Scenario: Separadores ocultos

- **WHEN** el comerciante desactiva los separadores
- **THEN** no se muestran líneas entre beneficios

### Requirement: Márgenes y rellenos configurables

La sección SHALL permitir configurar el margen superior, inferior y lateral, y el relleno superior, inferior y lateral del contenedor.

#### Scenario: Relleno vertical aumentado

- **WHEN** el comerciante aumenta el relleno superior e inferior
- **THEN** la franja gana altura y los beneficios permanecen centrados verticalmente

### Requirement: Diseño responsive

La sección SHALL distribuir los beneficios en una fila con separadores verticales en escritorio, en dos columnas en tablet y en una sola columna en móvil, sin provocar desplazamiento horizontal de la página.

#### Scenario: Escritorio

- **WHEN** la pantalla es de escritorio y hay cuatro bloques
- **THEN** los cuatro beneficios se muestran en una sola fila con el ícono a la izquierda del texto

#### Scenario: Móvil

- **WHEN** la pantalla es de móvil
- **THEN** los beneficios se apilan en una columna, sin desbordar el ancho y sin textos cortados

#### Scenario: Texto largo

- **WHEN** el título o la descripción de un bloque es muy largo
- **THEN** el texto se ajusta en varias líneas dentro de su celda sin romper el diseño
