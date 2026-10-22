# pasos-nosotros-section Specification

## Purpose
Sección de inicio que explica el proceso de compra en pasos numerados junto a una imagen, compuesta enteramente por bloques configurables.

## Requirements

### Requirement: Composición por bloques independientes
La sección SHALL estar compuesta por bloques Beneficio, Etiqueta, Título, Subtítulo, Imagen y Paso, cada uno con su propia configuración, que el comerciante puede añadir, reordenar y eliminar. Cada bloque SHALL tener un selector de columna (izquierda/derecha).

#### Scenario: Configuración aislada
- **WHEN** el comerciante cambia el color o tamaño de un bloque
- **THEN** solo ese bloque cambia y los demás permanecen iguales

#### Scenario: Reordenar y añadir pasos
- **WHEN** el comerciante añade, elimina o reordena bloques Paso
- **THEN** la lista se renderiza en ese orden y la línea conectora une solo los pasos presentes, sin línea tras el último

#### Scenario: Columna vacía
- **WHEN** una columna no tiene bloques
- **THEN** no se renderiza y la otra ocupa todo el ancho

### Requirement: Bloque Paso
Cada Paso SHALL mostrar un número en un círculo, un título y una descripción dentro de una tarjeta, con colores, tamaños de fuente y radio propios. Un paso sin título no SHALL renderizarse.

#### Scenario: Paso completo
- **WHEN** un Paso tiene número, título y descripción
- **THEN** se muestra el círculo numerado a la izquierda y la tarjeta con título y descripción a la derecha

#### Scenario: Descripción vacía
- **WHEN** un Paso no tiene descripción
- **THEN** la tarjeta muestra solo el título

### Requirement: Fondo opcional sin valor por defecto
La sección SHALL tener un ajuste de color de fondo sin valor predeterminado; sin valor, el fondo SHALL ser transparente.

#### Scenario: Sin fondo definido
- **WHEN** el comerciante no define color de fondo
- **THEN** la sección no aplica `background-color` y se ve el fondo de la página

#### Scenario: Fondo definido
- **WHEN** el comerciante elige un color de fondo
- **THEN** la sección lo aplica en todo su ancho

### Requirement: Tipografía por defecto Poppins
Los bloques de texto SHALL usar Poppins por defecto y permitir elegir otra fuente por bloque.

#### Scenario: Valor inicial
- **WHEN** se añade la sección con su preset
- **THEN** todo el texto se muestra en Poppins

#### Scenario: Fuente propia
- **WHEN** el comerciante cambia la fuente de un bloque
- **THEN** solo ese bloque usa la nueva fuente

### Requirement: Diseño responsive
La sección SHALL mostrar dos columnas desde 990px y una columna debajo, sin scroll horizontal desde 320px de ancho.

#### Scenario: Móvil
- **WHEN** el ancho es 320px
- **THEN** las columnas se apilan en el orden de los bloques y no hay overflow horizontal

#### Scenario: Escritorio
- **WHEN** el ancho es 990px o más
- **THEN** la imagen y los pasos se muestran lado a lado con la proporción elegida

### Requirement: Barra de beneficios superior
La sección SHALL mostrar sobre las dos columnas una barra con los bloques Beneficio (título, descripción), cada uno con fuente, tamaños, colores y divisor propios. La barra SHALL poder configurarse (fondo, borde, radio, espaciados) y SHALL omitirse si no hay bloques Beneficio con título. Los bloques Beneficio no SHALL ocupar ninguna de las dos columnas.

#### Scenario: Tres beneficios
- **WHEN** hay tres bloques Beneficio con título
- **THEN** en escritorio se muestran en una fila de igual ancho dentro de una tarjeta, con divisor entre los que lo tengan activo; en móvil se apilan

#### Scenario: Sin beneficios
- **WHEN** no hay bloques Beneficio con título
- **THEN** la barra no se renderiza y las columnas funcionan igual

#### Scenario: Cambio aislado
- **WHEN** el comerciante cambia el color o el texto de un Beneficio
- **THEN** solo ese Beneficio cambia
