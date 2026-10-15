# Spec Delta

## Purpose

Define la sección "Suscríbete Rosetta": una tarjeta responsive de captación de correos con textos, fondos y botón editables desde el editor de temas, cuyo formulario registra al suscriptor mediante el motor nativo de Shopify.

## ADDED Requirements

### Requirement: Textos editables

La sección SHALL permitir editar desde el editor de temas el texto superior (eyebrow), el título, la descripción, el placeholder del campo de correo, el texto del botón y el mensaje de éxito. Un texto vacío SHALL no renderizar su elemento.

#### Scenario: Textos por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** se muestran "SUSCRÍBETE A NUESTRAS OFERTAS", "Recetas, promociones y novedades fresquitas.", "Directo en tu bandeja de entrada. Conéctate con el sabor local.", el placeholder "tu@correo.com" y el botón "Suscribirme"

#### Scenario: Texto vacío

- **WHEN** el comerciante deja vacío el eyebrow o la descripción
- **THEN** ese elemento no se muestra y no deja espacio vacío

### Requirement: Fondos y colores editables

La sección SHALL permitir configurar el color de fondo de la franja exterior, el color de fondo de la tarjeta, el radio de las esquinas de la tarjeta y los colores del eyebrow, el título, la descripción y el campo de correo (fondo y texto).

#### Scenario: Cambio de fondo de la tarjeta

- **WHEN** el comerciante cambia el color de fondo de la tarjeta
- **THEN** la tarjeta refleja el nuevo color y la franja exterior conserva el suyo

#### Scenario: Colores por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** la tarjeta se muestra en rosa sobre una franja crema, con textos oscuros y el campo de correo en blanco

### Requirement: Botón configurable

La sección SHALL permitir configurar el texto, el color de fondo, el color del texto y el color de fondo en hover del botón de suscripción, y mostrar u ocultar la flecha que lo acompaña.

#### Scenario: Botón por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** el botón se muestra en verde, con texto oscuro, el texto "Suscribirme" y una flecha a la derecha

#### Scenario: Flecha oculta

- **WHEN** el comerciante desactiva la flecha
- **THEN** el botón muestra solo el texto

#### Scenario: Hover del botón

- **WHEN** el visitante pasa el cursor sobre el botón
- **THEN** el botón cambia al color de hover configurado

### Requirement: Márgenes y rellenos configurables

La sección SHALL permitir configurar el margen superior, inferior y lateral de la franja y el relleno interior superior, inferior y lateral de la tarjeta.

#### Scenario: Relleno de la tarjeta aumentado

- **WHEN** el comerciante aumenta el relleno de la tarjeta
- **THEN** la tarjeta gana espacio interior y su contenido permanece alineado

### Requirement: Suscripción con el motor nativo de Shopify

El formulario SHALL registrar el correo ingresado mediante el formulario nativo de clientes de Shopify, marcándolo con la etiqueta `newsletter` y con consentimiento de marketing por correo, sin depender de scripts ni servicios externos.

#### Scenario: Suscripción exitosa

- **WHEN** el visitante ingresa un correo válido y presiona el botón
- **THEN** Shopify registra el correo como cliente suscrito con la etiqueta `newsletter`, la página se recarga en la misma sección y se muestra el mensaje de éxito configurado

#### Scenario: Correo inválido

- **WHEN** el visitante envía un correo con formato inválido
- **THEN** la sección muestra el mensaje de error devuelto por Shopify y conserva el valor ingresado en el campo

#### Scenario: Campo vacío

- **WHEN** el visitante intenta enviar el formulario sin correo
- **THEN** el navegador bloquea el envío indicando que el campo es obligatorio

#### Scenario: Correo ya suscrito

- **WHEN** el visitante ingresa un correo que ya está registrado
- **THEN** el formulario no muestra error y presenta el mismo mensaje de éxito

### Requirement: Accesibilidad del formulario

El campo de correo SHALL tener una etiqueta accesible asociada, el mensaje de éxito o error SHALL anunciarse a tecnologías de asistencia y el botón y el campo SHALL mostrar un indicador de foco visible.

#### Scenario: Etiqueta del campo

- **WHEN** un lector de pantalla enfoca el campo de correo
- **THEN** anuncia una etiqueta de correo electrónico aunque la etiqueta no sea visible

#### Scenario: Mensaje anunciado

- **WHEN** la página recarga con el resultado del envío
- **THEN** el mensaje de éxito o error está asociado al campo o marcado como región de estado

### Requirement: Diseño responsive

La sección SHALL mostrar el texto a la izquierda y el formulario a la derecha en escritorio, y apilar texto y formulario en tablet y móvil. En pantallas pequeñas el campo y el botón SHALL ocupar todo el ancho disponible en columna, sin provocar desplazamiento horizontal de la página.

#### Scenario: Escritorio

- **WHEN** la pantalla es de escritorio
- **THEN** el texto se muestra a la izquierda y el campo con el botón alineados a la derecha en una sola fila

#### Scenario: Móvil

- **WHEN** la pantalla es de móvil
- **THEN** el texto y el formulario se apilan, el campo y el botón ocupan el ancho completo en columna y no hay desborde horizontal

#### Scenario: Título largo

- **WHEN** el título o la descripción son muy largos
- **THEN** el texto se ajusta en varias líneas dentro de la tarjeta sin romper el diseño
