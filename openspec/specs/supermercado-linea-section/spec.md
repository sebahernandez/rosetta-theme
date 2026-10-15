# supermercado-linea-section Specification

## Purpose

Define el espaciado de la sección "Supermercado en línea": márgenes y rellenos externos e internos configurables desde el editor de temas, con valores independientes para móvil y escritorio, sobre el contenedor, el panel de contenido y la tarjeta promocional.

## Requirements

### Requirement: Márgenes y rellenos externos por dispositivo

La sección SHALL permitir configurar desde el editor de temas el margen superior, inferior y lateral, y el relleno superior, inferior y lateral del contenedor externo, en píxeles, por separado para móvil (menos de 750 px) y para escritorio (750 px o más).

#### Scenario: Valores independientes por dispositivo

- **WHEN** el comerciante configura un margen superior distinto para móvil y para escritorio
- **THEN** en pantallas de menos de 750 px se aplica el valor de móvil y desde 750 px el de escritorio

#### Scenario: Valores existentes conservados

- **WHEN** la sección ya tenía guardados márgenes y rellenos superior e inferior
- **THEN** esos valores se siguen aplicando en escritorio sin que el comerciante tenga que volver a configurarlos

#### Scenario: Margen lateral

- **WHEN** el comerciante aumenta el margen lateral
- **THEN** la tarjeta de la sección se separa más de los bordes de la pantalla en ese dispositivo

### Requirement: Relleno interno del panel de contenido por dispositivo

La sección SHALL permitir configurar el relleno superior, inferior y lateral del panel de contenido (etiqueta, título, descripción, botones y beneficios), en píxeles, por separado para móvil y escritorio.

#### Scenario: Más aire en el panel

- **WHEN** el comerciante aumenta el relleno lateral del panel en escritorio
- **THEN** el texto se separa más de los bordes laterales del panel en escritorio y la versión móvil no cambia

#### Scenario: Relleno en cero

- **WHEN** el comerciante establece en 0 el relleno de un dispositivo
- **THEN** el contenido del panel llega hasta el borde de la tarjeta en ese dispositivo, sin espacio adicional

### Requirement: Separación entre elementos del panel por dispositivo

La sección SHALL permitir configurar la separación vertical entre los elementos del panel de contenido, en píxeles, por separado para móvil y escritorio.

#### Scenario: Separación reducida en móvil

- **WHEN** el comerciante reduce la separación de móvil
- **THEN** en pantallas de menos de 750 px los elementos del panel quedan más juntos y en escritorio la separación no cambia

### Requirement: Espaciado de la tarjeta promocional por dispositivo

La sección SHALL permitir configurar el relleno interno de la tarjeta promocional y su distancia a los bordes izquierdo e inferior de la imagen, en píxeles, por separado para móvil y escritorio.

#### Scenario: Tarjeta promocional más separada del borde

- **WHEN** el comerciante aumenta la distancia de la tarjeta promocional a los bordes en móvil
- **THEN** la tarjeta se aleja de los bordes de la imagen en móvil y sin desbordar su ancho

### Requirement: Valores por defecto equivalentes al diseño actual

Los valores por defecto de los controles de espaciado interno SHALL reproducir el espaciado actual de la sección en móvil y escritorio, de modo que añadir la sección sin configuración adicional no cambie su aspecto.

#### Scenario: Sección nueva sin configurar

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** el panel, la separación entre elementos y la tarjeta promocional se ven con el mismo espaciado que antes de existir los controles
