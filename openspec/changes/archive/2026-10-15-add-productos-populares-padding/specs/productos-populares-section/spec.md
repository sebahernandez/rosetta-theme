# Spec Delta

## Purpose

Define el espaciado de la sección "Productos populares": un relleno interno configurable, con valores independientes para móvil y escritorio, que separa el contenido del borde de su fondo.

## ADDED Requirements

### Requirement: Relleno interno entre el fondo y el contenido

La sección SHALL aplicar un relleno superior, inferior y lateral entre el borde de su fondo y su contenido (encabezado, filtros y productos), de modo que el contenido no quede pegado al borde del fondo.

#### Scenario: Aire por defecto

- **WHEN** el comerciante añade la sección con su configuración inicial
- **THEN** hay espacio visible entre el borde superior e inferior del fondo y el contenido de la sección

#### Scenario: Fondo envuelve el contenido

- **WHEN** el comerciante aumenta el relleno superior
- **THEN** el fondo de la sección crece hacia arriba y el contenido se separa más del borde del fondo

### Requirement: Relleno configurable para móvil y escritorio

La sección SHALL permitir configurar desde el editor de temas el relleno superior, inferior y lateral, en píxeles, por separado para móvil (menos de 750 px) y para escritorio (750 px o más).

#### Scenario: Valores independientes por dispositivo

- **WHEN** el comerciante configura un relleno superior distinto para móvil y para escritorio
- **THEN** en pantallas de menos de 750 px se aplica el valor de móvil y desde 750 px el de escritorio

#### Scenario: Relleno en cero

- **WHEN** el comerciante establece en 0 el relleno de un dispositivo
- **THEN** el contenido llega hasta el borde del fondo en ese dispositivo, sin espacio adicional

### Requirement: Margen exterior independiente del relleno

La sección SHALL mantener los márgenes superior, inferior y lateral como separación respecto a las secciones vecinas, independientes del relleno interno.

#### Scenario: Cambiar el margen

- **WHEN** el comerciante aumenta el margen inferior
- **THEN** aumenta el espacio entre la sección y la siguiente sin cambiar el aire entre el fondo y el contenido
