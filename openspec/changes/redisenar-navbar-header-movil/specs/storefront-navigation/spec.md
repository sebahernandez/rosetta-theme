# Spec Delta

## ADDED Requirements

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
