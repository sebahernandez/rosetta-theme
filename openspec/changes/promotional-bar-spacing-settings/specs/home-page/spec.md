# Spec Delta

## ADDED Requirements

### Requirement: Espaciado del banner promocional por dispositivo

El banner promocional SHALL permitir al comerciante configurar desde el editor de temas su margen superior e inferior y su padding superior, inferior y lateral, con valores independientes para móvil y para escritorio. Cada banner de la página SHALL conservar sus propios valores de espaciado.

#### Scenario: Espaciado en escritorio

- **WHEN** el comerciante define márgenes y paddings de escritorio y un visitante abre la página en una pantalla de 750px de ancho o más
- **THEN** el banner se muestra con los márgenes y paddings configurados para escritorio

#### Scenario: Espaciado en móvil

- **WHEN** el comerciante define márgenes y paddings de móvil distintos a los de escritorio y un visitante abre la página en una pantalla de menos de 750px de ancho
- **THEN** el banner se muestra con los márgenes y paddings configurados para móvil y no con los de escritorio

#### Scenario: Varios banners en la misma página

- **WHEN** la página tiene dos banners promocionales con valores de espaciado distintos
- **THEN** cada banner muestra su propio espaciado sin afectar al otro

### Requirement: Compatibilidad del espaciado del banner promocional

Un banner promocional cuyos ajustes de espaciado no han sido modificados SHALL mostrarse con la misma separación que tenía antes de existir dichos ajustes.

#### Scenario: Banner ya publicado

- **WHEN** un banner promocional existente no tiene valores de espaciado guardados
- **THEN** se muestra igual que antes, sin márgenes ni padding vertical añadidos y con la misma separación lateral en móvil y en escritorio
