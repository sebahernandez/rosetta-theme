# storefront-navigation Specification

## Purpose

Describe cómo los visitantes se orientan y se mueven por la tienda: encabezado, menús, búsqueda y pie de página.

## Requirements

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

### Requirement: Logo diferenciado entre inicio y resto de páginas

El encabezado SHALL permitir configurar un logo (y su ancho) para la página de inicio y otro distinto para las demás páginas, tanto en escritorio como en móvil.

#### Scenario: Logo alternativo configurado

- **WHEN** el comerciante define un logo para "otras páginas" y un visitante navega a una página que no es el inicio
- **THEN** el encabezado muestra el logo alternativo

#### Scenario: Sin logo alternativo

- **WHEN** no hay logo alternativo configurado
- **THEN** el encabezado muestra el logo principal en todas las páginas

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

### Requirement: Pie de página global

El pie de página SHALL mostrarse en todas las páginas y SHALL poder incluir bloques de enlaces, imagen o marca, suscripción al boletín, redes sociales y medios de pago, configurables desde el editor de temas.

#### Scenario: Suscripción desde el pie

- **WHEN** un visitante ingresa su correo en el formulario de boletín del pie y lo envía
- **THEN** queda registrado como suscriptor y ve un mensaje de confirmación

### Requirement: Encabezado móvil en una fila

En móvil y tablet (menos de 990px) el encabezado SHALL mostrarse en una sola fila con, de izquierda a derecha, el icono de menú, el logo con su eslogan, el icono de búsqueda y el carrito como píldora destacada con el contador de artículos, incluido el valor 0. Los elementos SHALL tener un espaciado uniforme, SHALL NOT superponerse ni provocar desplazamiento horizontal de la página en anchos desde 320px, y los controles táctiles SHALL medir al menos 44px.

#### Scenario: Composición de la fila

- **WHEN** un visitante carga una página en un móvil
- **THEN** ve en una sola fila el icono de menú, el logo con eslogan, el icono de búsqueda y la píldora del carrito con su contador

#### Scenario: Carrito vacío en móvil

- **WHEN** el carrito no contiene productos y el visitante está en móvil
- **THEN** la píldora del carrito muestra el contador en 0

#### Scenario: Pantalla angosta

- **WHEN** el visitante usa una pantalla de 320px de ancho
- **THEN** el logo se reduce para ceder espacio, ningún elemento del encabezado se superpone a otro y la página no se desplaza horizontalmente

#### Scenario: Contador de varios dígitos

- **WHEN** el carrito contiene 10 o más artículos en móvil
- **THEN** la píldora crece lo necesario sin tapar el icono de búsqueda ni salirse de la pantalla

#### Scenario: Búsqueda en móvil

- **WHEN** el visitante toca el icono de búsqueda en móvil
- **THEN** se abre el buscador en modal con el mismo comportamiento previo

#### Scenario: Menú en móvil

- **WHEN** el visitante toca el icono de menú
- **THEN** se abre el cajón lateral con los enlaces del menú principal, igual que antes del cambio

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

### Requirement: Encabezado sin destello de contenido sin estilos
El encabezado y el menú principal SHALL mostrarse con su estilo final desde el primer render, tanto en la carga inicial como al navegar a otra página, sin pasar por un estado sin estilos. Los indicadores de carga del buscador del encabezado (spinner de sugerencias) SHALL permanecer ocultos mientras no haya una búsqueda en curso, incluso antes de que terminen de descargarse los estilos diferidos.

#### Scenario: Carga inicial de la página
- **WHEN** un visitante abre cualquier página de la tienda
- **THEN** el header, el buscador y el menú principal aparecen con su diseño final, sin enlaces en azul por defecto ni elementos estirados

#### Scenario: Navegación a otro enlace
- **WHEN** el visitante hace clic en un enlace del menú y se carga la nueva página
- **THEN** el header de la nueva página se muestra con el mismo diseño, sin cambios visibles de tamaño ni de color durante la carga

#### Scenario: Conexión lenta
- **WHEN** la hoja de estilos de un componente no esencial del header (drawer móvil, notificación de carrito) aún no se ha descargado
- **THEN** el header visible sigue mostrándose correctamente y no cambia de forma al terminar la descarga

#### Scenario: Altura reservada
- **WHEN** el header se pinta antes de que carguen sus imágenes
- **THEN** su altura ya está reservada y el contenido inferior no se desplaza al cargar el logo

#### Scenario: Sin loader a pantalla completa al cargar una categoría
- **WHEN** un visitante abre una categoría (collection) con una conexión lenta, en móvil o en escritorio
- **THEN** no se muestra ningún círculo de carga sobre la página ni sobre el header mientras se descargan los estilos y la página

#### Scenario: Spinner del buscador con búsqueda en curso
- **WHEN** el visitante escribe en el buscador y las sugerencias están cargando
- **THEN** se muestra el spinner de carga con su tamaño normal dentro del panel de sugerencias y desaparece al mostrar los resultados

### Requirement: Contenido de producto contiguo al encabezado

En la página de producto, el contenido principal SHALL comenzar inmediatamente debajo del encabezado, sin dejar visible una franja del color de fondo del sitio entre el encabezado y el contenedor del producto, tanto en móvil como en escritorio. El margen inferior configurado para el encabezado SHALL seguir aplicándose en las demás páginas.

#### Scenario: Producto en escritorio

- **WHEN** un visitante abre una página de producto en escritorio
- **THEN** el contenedor del producto empieza justo debajo del encabezado y no se ve una franja del fondo del sitio entre ambos

#### Scenario: Producto en móvil

- **WHEN** un visitante abre una página de producto en móvil
- **THEN** el contenedor del producto empieza justo debajo del encabezado, sin franja visible entre ambos

#### Scenario: Otras páginas sin cambios

- **WHEN** un visitante abre una página que no es de producto (por ejemplo una colección)
- **THEN** el encabezado mantiene el margen inferior configurado en el editor de temas

#### Scenario: Encabezado fijo al desplazarse

- **WHEN** el visitante se desplaza por la página de producto con el encabezado fijo
- **THEN** el encabezado se sigue comportando igual y no aparece ningún hueco entre él y el contenido

### Requirement: Contenido de colección contiguo al encabezado

En la página de colección, el contenido principal SHALL comenzar inmediatamente debajo del encabezado, sin dejar visible una franja del color de fondo del sitio entre el encabezado y el contenedor de la colección, tanto en móvil como en escritorio. El margen inferior configurado para el encabezado SHALL seguir aplicándose en las páginas que no sean de producto ni de colección.

#### Scenario: Colección en escritorio

- **WHEN** un visitante abre una colección en escritorio
- **THEN** el contenedor con el título y los productos empieza justo debajo del encabezado y no se ve una franja del fondo del sitio entre ambos

#### Scenario: Colección en móvil

- **WHEN** un visitante abre una colección en móvil
- **THEN** el contenedor de la colección empieza justo debajo del encabezado, sin franja visible entre ambos

#### Scenario: Otras páginas sin cambios

- **WHEN** un visitante abre una página que no es de producto ni de colección (por ejemplo la lista de colecciones o una página de contenido)
- **THEN** el encabezado mantiene el margen inferior configurado en el editor de temas

#### Scenario: Filtros y orden

- **WHEN** el visitante aplica filtros u ordena los productos de la colección
- **THEN** el contenedor sigue contiguo al encabezado y el diseño no se desplaza
