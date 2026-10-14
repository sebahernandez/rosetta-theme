# Spec Delta

## MODIFIED Requirements

### Requirement: Encabezado global

El encabezado SHALL mostrarse en todas las páginas con el logo, el menú principal, el acceso a búsqueda, el acceso a la cuenta de cliente y el icono del carrito con su contador. Opcionalmente SHALL mostrar una barra de anuncios sobre el encabezado. En escritorio SHALL organizarse en dos filas: logo, buscador y acciones en la primera; menú de categorías en la segunda.

#### Scenario: Visitante en cualquier página

- **WHEN** un visitante carga una página de la tienda
- **THEN** ve el logo, el menú, la búsqueda, el acceso a cuenta y el carrito en el encabezado

#### Scenario: Contador del carrito

- **WHEN** el carrito contiene productos
- **THEN** el icono del carrito muestra la cantidad de artículos

#### Scenario: Disposición en escritorio

- **WHEN** un visitante carga una página en una pantalla de escritorio
- **THEN** la primera fila muestra el logo, el buscador y las acciones de cuenta y carrito, y la segunda fila muestra el menú de categorías

#### Scenario: Barra de anuncios sin cambios

- **WHEN** la barra de anuncios está configurada
- **THEN** se muestra sobre el encabezado con el mismo contenido y comportamiento que antes del rediseño

### Requirement: Menú adaptable

El menú principal SHALL ofrecer en escritorio los tipos desplegable, mega menú o cajón según la configuración de la sección, y en móvil SHALL presentarse como cajón lateral. En escritorio, cuando hay un menú secundario configurado, sus enlaces SHALL mostrarse a continuación del menú principal separados por un divisor vertical.

#### Scenario: Navegación en móvil

- **WHEN** un visitante en móvil toca el icono de menú
- **THEN** se abre un cajón con los enlaces del menú principal y sus submenús

#### Scenario: Menú secundario configurado

- **WHEN** el comerciante asigna un menú secundario en el encabezado y el visitante está en escritorio
- **THEN** los enlaces del menú secundario aparecen en la segunda fila, después de un divisor vertical y de los enlaces principales

#### Scenario: Sin menú secundario

- **WHEN** no hay menú secundario asignado
- **THEN** la segunda fila muestra solo los enlaces del menú principal, sin divisor

### Requirement: Búsqueda con sugerencias predictivas

La tienda SHALL ofrecer búsqueda desde el encabezado y una página de resultados. Cuando la búsqueda predictiva está habilitada en los ajustes del theme, el campo de búsqueda SHALL mostrar sugerencias mientras el visitante escribe. En escritorio el campo de búsqueda SHALL estar visible en el encabezado sin abrir un modal; en móvil se mantiene el acceso mediante icono.

#### Scenario: Sugerencias al escribir

- **WHEN** la búsqueda predictiva está habilitada y el visitante escribe un término en el buscador
- **THEN** se muestran sugerencias de resultados sin abandonar la página

#### Scenario: Envío de la búsqueda

- **WHEN** el visitante envía el formulario de búsqueda
- **THEN** es llevado a la página de resultados con el término consultado

#### Scenario: Buscador visible en escritorio

- **WHEN** un visitante carga una página en una pantalla de escritorio
- **THEN** el campo "¿Qué estás buscando?" y el botón "Buscar" están visibles en el encabezado sin interacción previa

#### Scenario: Búsqueda en móvil

- **WHEN** un visitante en móvil toca el icono de búsqueda
- **THEN** se abre el buscador en modal como antes del rediseño

## ADDED Requirements

### Requirement: Acceso a seguimiento de pedido en el encabezado

El encabezado SHALL mostrar en escritorio un enlace "Seguir mi pedido" con icono, junto a los accesos de cuenta y carrito, cuyo destino y texto SHALL ser configurables y que SHALL poder ocultarse.

#### Scenario: Enlace visible

- **WHEN** el enlace de seguimiento está habilitado y un visitante carga una página en escritorio
- **THEN** ve "Seguir mi pedido" en la primera fila y al activarlo llega a la página de seguimiento configurada

#### Scenario: Enlace oculto

- **WHEN** el comerciante deshabilita el enlace de seguimiento en el encabezado
- **THEN** el encabezado no muestra "Seguir mi pedido"

### Requirement: Carrito destacado con contador siempre visible

El acceso al carrito en el encabezado SHALL presentarse como una píldora destacada que muestra la cantidad de artículos, incluido el valor 0 cuando el carrito está vacío, y SHALL actualizar la cantidad al agregar o quitar productos sin recargar la página.

#### Scenario: Carrito vacío

- **WHEN** el carrito no contiene productos
- **THEN** la píldora del carrito muestra el contador en 0

#### Scenario: Agregar un producto

- **WHEN** el visitante agrega un producto al carrito
- **THEN** el contador de la píldora refleja la nueva cantidad sin recargar la página
