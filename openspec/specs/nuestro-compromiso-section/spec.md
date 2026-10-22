# nuestro-compromiso-section Specification

## Purpose
Sección de inicio que presenta el compromiso de la marca en un panel con texto, lista de garantías, botón e imagen, seguido de una fila de tarjetas de categorías, todo compuesto por bloques configurables.

## Requirements

### Requirement: Composición por bloques independientes
La sección SHALL estar compuesta por bloques Etiqueta, Título, Texto, Ítem de lista, Botón, Imagen y Tarjeta de categoría, cada uno con su propia configuración, que el comerciante puede añadir, reordenar y eliminar.

#### Scenario: Configuración aislada
- **WHEN** el comerciante cambia el color, tamaño o texto de un bloque
- **THEN** solo ese bloque cambia y los demás permanecen iguales

#### Scenario: Reordenar
- **WHEN** el comerciante reordena bloques de texto del panel o tarjetas
- **THEN** se renderizan en ese orden dentro de su zona

### Requirement: Panel principal
Los bloques Etiqueta, Título, Texto, Ítem de lista y Botón SHALL renderizarse en el panel izquierdo con fondo propio configurable (rosa claro por defecto) y esquinas redondeadas. El bloque Imagen SHALL ocupar el lado derecho del panel a sangre. Los Ítems de lista SHALL mostrar un ícono de check circular con color propio. El Botón SHALL omitirse si no tiene texto o enlace.

#### Scenario: Panel completo
- **WHEN** hay etiqueta, título con acento, texto, tres ítems, botón e imagen
- **THEN** en escritorio el texto se ve a la izquierda sobre el fondo del panel y la imagen ocupa el lado derecho hasta los bordes del panel

#### Scenario: Sin imagen
- **WHEN** no hay bloque Imagen
- **THEN** el panel ocupa todo el ancho

### Requirement: Tarjetas de categoría
Cada bloque Tarjeta SHALL mostrar una imagen de fondo con degradado oscuro inferior, una etiqueta pequeña, un título y un botón circular con flecha. Toda la tarjeta SHALL ser un enlace si tiene URL. Las tarjetas SHALL mostrarse en una fila de columnas iguales en escritorio.

#### Scenario: Tarjeta con enlace
- **WHEN** una Tarjeta tiene título, imagen y URL
- **THEN** se muestra la imagen con el texto sobre el degradado y al hacer clic navega a la URL

#### Scenario: Tarjeta sin imagen
- **WHEN** una Tarjeta no tiene imagen
- **THEN** se muestra un marcador de posición y el texto sigue legible

### Requirement: Fondo opcional sin valor por defecto
La sección SHALL tener un color de fondo sin valor predeterminado; sin valor, el fondo SHALL ser transparente.

#### Scenario: Sin fondo definido
- **WHEN** el comerciante no define color de fondo
- **THEN** la sección no aplica `background-color`

### Requirement: Tipografía por defecto Poppins
Los bloques de texto SHALL usar Poppins por defecto y permitir otra fuente por bloque.

#### Scenario: Fuente propia
- **WHEN** el comerciante cambia la fuente de un bloque
- **THEN** solo ese bloque usa la nueva fuente

### Requirement: Diseño responsive
La sección SHALL mostrar el panel en dos columnas desde 990px y una columna debajo; las tarjetas SHALL apilarse en móvil, sin scroll horizontal desde 320px.

#### Scenario: Móvil
- **WHEN** el ancho es 320px
- **THEN** el texto, la imagen y las tarjetas se apilan sin overflow horizontal
