# Spec Delta

## MODIFIED Requirements

### Requirement: Menú adaptable

El menú principal SHALL ofrecer en escritorio los tipos desplegable, mega menú, cajón o categorías según la configuración de la sección, y en móvil SHALL presentarse como cajón lateral. En escritorio, cuando hay un menú secundario configurado y el tipo no es categorías, sus enlaces SHALL mostrarse a continuación del menú principal separados por un divisor vertical.

#### Scenario: Navegación en móvil

- **WHEN** un visitante en móvil toca el icono de menú
- **THEN** se abre un cajón con los enlaces del menú principal y sus submenús

#### Scenario: Menú secundario configurado

- **WHEN** el comerciante asigna un menú secundario en el encabezado, el tipo de menú no es categorías y el visitante está en escritorio
- **THEN** los enlaces del menú secundario aparecen en la segunda fila, después de un divisor vertical y de los enlaces principales

#### Scenario: Sin menú secundario

- **WHEN** no hay menú secundario asignado
- **THEN** la segunda fila muestra solo los enlaces del menú principal, sin divisor

#### Scenario: Tipo categorías seleccionado

- **WHEN** el comerciante elige el tipo de menú "Categorías" en el encabezado
- **THEN** la segunda fila en escritorio muestra los botones píldora configurados ("Categorías", "Ofertas", etc.) en lugar de la lista horizontal de enlaces

## ADDED Requirements

### Requirement: Panel de categorías en escritorio
Con el tipo "Categorías", el botón "Categorías" SHALL abrir un panel con los enlaces de primer nivel del menú configurado en una columna izquierda y, a la derecha, el contenido de la categoría seleccionada. Los enlaces SHALL ser los del menú configurado, en su mismo orden y con sus mismos destinos, salvo los de primer nivel que el comerciante excluya en el encabezado (por defecto: Inicio, Ofertas, Más vendidos, Nosotros, Contacto).

#### Scenario: Abrir el panel
- **WHEN** un visitante en escritorio pulsa "Categorías"
- **THEN** se abre el panel con todas las categorías del menú en la columna izquierda y la primera categoría seleccionada

#### Scenario: Enlaces excluidos
- **WHEN** el menú contiene "Inicio", "Ofertas", "Más vendidos", "Nosotros" y "Contacto" además de las 9 categorías, y la lista de exclusión tiene su valor por defecto
- **THEN** el panel muestra solo las 9 categorías y el cajón móvil sigue mostrando todo el menú

#### Scenario: Cambiar de categoría
- **WHEN** el visitante pasa el puntero o enfoca otra categoría de la columna izquierda
- **THEN** esa categoría se resalta con el color de selección y el panel derecho muestra su contenido

#### Scenario: Cerrar el panel
- **WHEN** el panel está abierto y el visitante pulsa Escape, hace clic fuera del panel o vuelve a pulsar "Categorías"
- **THEN** el panel se cierra y el foco vuelve al botón "Categorías"

### Requirement: Contenido de la categoría seleccionada
El panel derecho SHALL mostrar el título de la categoría con un enlace "Mostrar todo" a su destino y sus subenlaces en columnas. Cada subenlace con enlaces de tercer nivel SHALL mostrarse como encabezado de columna con esos enlaces debajo y un "Mostrar todo" a su destino.

#### Scenario: Categoría con subenlaces
- **WHEN** se selecciona "Bebidas sin alcohol" y tiene seis subenlaces
- **THEN** el panel muestra el título "Bebidas sin alcohol", su "Mostrar todo" y los seis subenlaces enlazando a sus destinos

#### Scenario: Subenlace con tercer nivel
- **WHEN** un subenlace tiene enlaces hijos
- **THEN** aparece como encabezado de columna, con sus hijos listados debajo y un "Mostrar todo" que lleva al destino del subenlace

#### Scenario: Categoría sin subenlaces
- **WHEN** se selecciona una categoría sin subenlaces (p. ej. "Panadería y pastelería")
- **THEN** el panel muestra su título y "Mostrar todo", sin columnas vacías

### Requirement: Botones píldora configurables
La segunda fila SHALL mostrar el botón "Categorías" y botones píldora adicionales definidos como bloques del encabezado. Cada bloque SHALL tener texto, enlace, icono opcional y colores de fondo y texto propios, y SHALL poder añadirse, reordenarse y eliminarse desde el editor de temas.

#### Scenario: Botón Ofertas
- **WHEN** el comerciante añade un bloque de botón con texto "Ofertas" y enlace a la colección Ofertas
- **THEN** aparece a la derecha de "Categorías" como píldora con los colores elegidos y lleva a esa colección

#### Scenario: Reordenar y eliminar botones
- **WHEN** el comerciante reordena o elimina bloques de botón en el editor de temas
- **THEN** la segunda fila refleja el nuevo orden o la ausencia del botón sin recargar el editor

#### Scenario: Configurar el botón Categorías
- **WHEN** el comerciante cambia el texto o los colores del botón "Categorías" en el encabezado
- **THEN** el botón muestra el texto y los colores nuevos

### Requirement: Iconos de categoría configurables
Cada categoría de primer nivel SHALL poder mostrar un icono definido por un bloque del encabezado que indica el título del enlace al que aplica y el icono. Una categoría sin bloque de icono SHALL mostrarse sin icono y alineada con las demás.

#### Scenario: Asignar icono
- **WHEN** el comerciante añade un bloque de icono para "Lácteos y refrigerados" con un icono elegido
- **THEN** ese icono aparece junto a la categoría en el panel de escritorio y en el cajón móvil

#### Scenario: Categoría sin icono
- **WHEN** una categoría no tiene bloque de icono
- **THEN** se muestra solo con su texto, alineada con las demás

#### Scenario: Reordenar o eliminar bloques de icono
- **WHEN** el comerciante reordena o elimina un bloque de icono
- **THEN** el orden de las categorías no cambia (sigue el del menú) y la categoría afectada pierde su icono si se eliminó

### Requirement: Colores del design system en el menú de categorías
El menú de categorías SHALL usar por defecto la paleta de Rosetta: botón "Categorías" rosa, botón "Ofertas" menta, categoría seleccionada con fondo rosa claro y acento rosa, "Mostrar todo" en rosa oscuro y fondos crema y blanco. Todos estos colores SHALL poder cambiarse desde el editor de temas.

#### Scenario: Valores por defecto
- **WHEN** el comerciante activa el tipo "Categorías" sin cambiar colores
- **THEN** el menú se ve con la paleta rosa, menta y crema de Rosetta, sin verdes ni amarillos

### Requirement: Menú de categorías en móvil y tablet
En anchos menores a 990px, el cajón lateral SHALL mostrar las categorías con sus iconos y permitir navegar por niveles: al tocar una categoría se muestran sus subenlaces con un "Mostrar todo", y al tocar un subenlace con hijos se muestran sus enlaces de tercer nivel; cada nivel SHALL tener un botón para volver.

#### Scenario: Navegar a una subcategoría en móvil
- **WHEN** un visitante en móvil abre el menú, toca "Licores y cervezas" y luego "Ron"
- **THEN** ve primero los subenlaces de "Licores y cervezas" con "Mostrar todo" y luego llega a la colección "Ron"

#### Scenario: Sin desplazamiento horizontal
- **WHEN** el cajón está abierto en un ancho de 320px
- **THEN** ningún texto se corta ni provoca desplazamiento horizontal de la página

### Requirement: Accesibilidad del menú de categorías
El botón "Categorías" SHALL indicar su estado abierto o cerrado a los lectores de pantalla, la columna de categorías SHALL poder recorrerse con teclado (Tab y flechas arriba/abajo) y los objetivos táctiles SHALL medir al menos 44px.

#### Scenario: Uso con teclado
- **WHEN** un visitante abre el panel con Enter y navega con flechas por las categorías
- **THEN** cada categoría enfocada actualiza el panel derecho y Enter sigue su enlace
