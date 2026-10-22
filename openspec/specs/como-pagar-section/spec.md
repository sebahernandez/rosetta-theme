# como-pagar-section Specification

## Purpose
Sección que presenta los métodos de pago aceptados en una fila de tarjetas, con encabezado propio, compuesta por bloques configurables.

## Requirements

### Requirement: Composición por bloques independientes
La sección SHALL estar compuesta por bloques Etiqueta, Título, Subtítulo y Método de pago, cada uno con su propia configuración, que el comerciante puede añadir, reordenar y eliminar.

#### Scenario: Configuración aislada
- **WHEN** el comerciante cambia el color, tamaño o texto de un bloque
- **THEN** solo ese bloque cambia y los demás permanecen iguales

#### Scenario: Reordenar métodos
- **WHEN** el comerciante añade, elimina o reordena bloques Método de pago
- **THEN** las tarjetas se muestran en ese orden

### Requirement: Encabezado
Los bloques Etiqueta, Título y Subtítulo SHALL renderizarse sobre las tarjetas, alineados a la izquierda, con fuente, tamaños móvil/escritorio, colores y espaciado propios. Un bloque sin texto no SHALL renderizarse.

#### Scenario: Encabezado completo
- **WHEN** hay etiqueta, título y subtítulo
- **THEN** se muestran en ese orden encima de las tarjetas

### Requirement: Bloque Método de pago
Cada Método de pago SHALL mostrar una tarjeta con ícono en círculo (ícono integrado o imagen propia), insignia opcional alineada a la derecha, título, descripción y una fila de chips separada por una línea. Los chips SHALL definirse en un único campo de texto separado por comas; sin chips no se renderiza la línea ni la fila. Colores, radio y tamaños SHALL ser propios de cada tarjeta.

#### Scenario: Tarjeta completa
- **WHEN** un Método tiene ícono, insignia, título, descripción y chips "Pago Móvil, Transferencia"
- **THEN** se muestran el ícono, la insignia "Bolívares", el título, la descripción y dos chips bajo la línea divisoria

#### Scenario: Sin insignia ni chips
- **WHEN** un Método no tiene insignia ni chips
- **THEN** la tarjeta muestra solo ícono, título y descripción

#### Scenario: Alturas iguales
- **WHEN** las tarjetas de una fila tienen descripciones de distinta longitud
- **THEN** todas tienen la misma altura y los chips quedan alineados abajo

### Requirement: Fondo opcional sin valor por defecto
La sección SHALL tener un color de fondo sin valor predeterminado; sin valor, el fondo SHALL ser transparente.

#### Scenario: Sin fondo definido
- **WHEN** el comerciante no define color de fondo
- **THEN** la sección no aplica `background-color`

### Requirement: Tipografía por defecto Poppins
Los bloques SHALL usar Poppins por defecto y permitir otra fuente por bloque.

#### Scenario: Fuente propia
- **WHEN** el comerciante cambia la fuente de un bloque
- **THEN** solo ese bloque usa la nueva fuente

### Requirement: Diseño responsive
Las tarjetas SHALL mostrarse en 1 columna en móvil, 2 desde 750px y el número de columnas configurado (2 a 4) desde 990px, sin scroll horizontal desde 320px.

#### Scenario: Móvil
- **WHEN** el ancho es 320px
- **THEN** las tarjetas se apilan y no hay overflow horizontal

#### Scenario: Escritorio
- **WHEN** el ancho es 990px o más y hay 3 métodos con 3 columnas
- **THEN** las tres tarjetas se muestran en una fila de igual ancho
