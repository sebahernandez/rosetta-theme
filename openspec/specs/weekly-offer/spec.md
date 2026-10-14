# weekly-offer Specification

## Purpose

Define la sección "Oferta semanal": una tarjeta promocional con imagen y contenido compuesto por bloques, cuyo espaciado y colores administra el comerciante desde el editor de temas.

## Requirements

### Requirement: Contenido compuesto por bloques

La sección SHALL permitir al comerciante componer el panel de contenido con bloques independientes de los tipos: etiqueta superior, título, texto, cifra destacada y botón. Los bloques SHALL mostrarse en el orden definido en el editor y SHALL poder añadirse, eliminarse y reordenarse sin cambios de código.

#### Scenario: Añadir un bloque

- **WHEN** el comerciante añade un bloque de texto en el editor de temas
- **THEN** el texto aparece en el panel de contenido en la posición elegida

#### Scenario: Eliminar un bloque

- **WHEN** el comerciante elimina el bloque de cifra destacada
- **THEN** la cifra deja de mostrarse y el resto del contenido se mantiene

#### Scenario: Reordenar bloques

- **WHEN** el comerciante mueve el bloque de botón antes del bloque de texto
- **THEN** la tienda muestra el botón antes del texto

### Requirement: Bloques con valores propios

Cada bloque SHALL exponer sus propios ajustes: la etiqueta, el título, el texto y la cifra permiten editar su contenido y color; el título permite marcar una segunda línea en cursiva con color de acento; el botón permite definir texto y enlace. Un bloque con contenido vacío SHALL NOT renderizar su elemento.

#### Scenario: Título con línea de acento

- **WHEN** el comerciante rellena la línea de acento del bloque de título
- **THEN** esa línea se muestra debajo del título principal, en cursiva y con el color de acento

#### Scenario: Botón sin enlace

- **WHEN** el bloque de botón no tiene enlace configurado
- **THEN** el botón no se muestra en la tienda

#### Scenario: Bloque vacío

- **WHEN** el bloque de texto no tiene contenido
- **THEN** no se muestra ningún elemento vacío en su lugar

### Requirement: Imagen definida desde la configuración

La imagen de la tarjeta SHALL seleccionarse desde un ajuste de imagen de la sección. Si no hay imagen, la sección SHALL mostrar una imagen de marcador de posición en el editor y SHALL conservar el resto del layout.

#### Scenario: Imagen seleccionada

- **WHEN** el comerciante elige una imagen en los ajustes de la sección
- **THEN** la tarjeta muestra esa imagen cubriendo su columna sin deformarse

#### Scenario: Sin imagen

- **WHEN** la sección no tiene imagen seleccionada
- **THEN** se muestra un marcador de posición y el contenido sigue visible

### Requirement: Espaciado de la tarjeta configurable

La tarjeta principal SHALL permitir configurar el margen y el relleno desde el editor de temas, tanto superior como inferior y lateral, con valores en píxeles.

#### Scenario: Aumentar el margen superior

- **WHEN** el comerciante aumenta el margen superior de la tarjeta
- **THEN** aumenta la separación entre la tarjeta y el contenido que la precede

#### Scenario: Aumentar el relleno

- **WHEN** el comerciante aumenta el relleno de la tarjeta
- **THEN** aumenta el espacio interno entre el borde de la tarjeta y su contenido

### Requirement: Colores de fondo configurables

El color de fondo de toda la sección SHALL ser configurable. El color de fondo del panel de contenido SHALL ser configurable de forma independiente.

#### Scenario: Cambiar el fondo de la sección

- **WHEN** el comerciante cambia el color de fondo de la sección
- **THEN** el área completa que rodea a la tarjeta, a todo el ancho de la página, adopta ese color

#### Scenario: Cambiar el fondo del panel

- **WHEN** el comerciante cambia el color de fondo del panel de contenido
- **THEN** solo el panel de contenido de la tarjeta adopta ese color

### Requirement: Diseño responsive

En escritorio, la imagen SHALL mostrarse a la izquierda del contenido, en dos columnas. En móvil, la imagen SHALL mostrarse arriba del contenido, en una sola columna. No SHALL haber desbordamiento horizontal en ningún ancho de pantalla.

#### Scenario: Visita desde escritorio

- **WHEN** un visitante abre la portada en una pantalla de escritorio
- **THEN** la imagen aparece a la izquierda y el contenido a la derecha

#### Scenario: Visita desde móvil

- **WHEN** un visitante abre la portada en un móvil
- **THEN** la imagen aparece arriba y el contenido debajo, con ancho completo

### Requirement: Sección disponible en el editor de temas

La sección SHALL poder añadirse a las plantillas desde el editor de temas y SHALL incluir un preajuste con el contenido de ejemplo de la oferta (etiqueta, título, texto, cifra y botón).

#### Scenario: Añadir la sección

- **WHEN** el comerciante añade "Oferta semanal" a la portada
- **THEN** la sección aparece con el contenido de ejemplo editable
